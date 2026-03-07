"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import { hasCompletedProfile } from "@/lib/profile";
import { supabase } from "@/lib/supabaseClient";

type ListingType = "free" | "rental";
const LISTING_IMAGE_BUCKET = "listing-images";
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function getImageValidationError(file: File): string | null {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return "Image must be JPG, PNG, or WEBP.";
  }

  if (file.size > MAX_IMAGE_BYTES) {
    return "Image size must be 5 MB or smaller.";
  }

  return null;
}

function getFileExtension(file: File): string {
  const fromName = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (fromName && /^[a-z0-9]+$/.test(fromName)) return fromName;

  if (file.type === "image/jpeg") return "jpg";
  if (file.type === "image/png") return "png";
  if (file.type === "image/webp") return "webp";
  return "bin";
}

export default function NewListingPage() {
  const router = useRouter();
  const [authLoading, setAuthLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<ListingType>("free");
  const [pricePerDay, setPricePerDay] = useState("");
  const [deposit, setDeposit] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function checkUser() {
      if (!supabase) {
        if (mounted) {
          setError(
            "Missing Supabase env. Create .env.local with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
          );
          setAuthLoading(false);
        }
        return;
      }

      const { data, error: userError } = await supabase.auth.getUser();
      if (!mounted) return;

      if (userError) {
        router.replace("/login");
        return;
      }

      const user = data.user;
      if (!user) {
        router.replace("/login");
        return;
      }

      if (!hasCompletedProfile(user)) {
        router.replace("/onboarding");
        return;
      }

      setAuthLoading(false);
    }

    checkUser();
    return () => {
      mounted = false;
    };
  }, [router]);

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    };
  }, [imagePreviewUrl]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    if (!supabase) {
      setSaving(false);
      setError(
        "Missing Supabase env. Create .env.local with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
      );
      return;
    }

    const cleanTitle = title.trim();
    const cleanDescription = description.trim();
    const cleanCategory = category.trim();
    const cleanPricePerDay = pricePerDay.trim();
    const cleanDeposit = deposit.trim();

    if (!cleanTitle) {
      setSaving(false);
      setError("Title is required.");
      return;
    }

    let parsedPricePerDay: number | null = null;
    let parsedDeposit: number | null = null;

    if (type === "rental") {
      if (!cleanPricePerDay) {
        setSaving(false);
        setError("Price per day is required for rental listings.");
        return;
      }

      const nextPrice = Number(cleanPricePerDay);
      if (!Number.isFinite(nextPrice) || nextPrice <= 0) {
        setSaving(false);
        setError("Price per day must be a number greater than 0.");
        return;
      }
      parsedPricePerDay = nextPrice;

      if (cleanDeposit) {
        const nextDeposit = Number(cleanDeposit);
        if (!Number.isFinite(nextDeposit) || nextDeposit < 0) {
          setSaving(false);
          setError("Deposit must be a valid number (0 or greater).");
          return;
        }
        parsedDeposit = nextDeposit;
      }
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      setSaving(false);
      router.replace("/login");
      return;
    }

    const userMeta = (userData.user.user_metadata ?? {}) as Record<string, unknown>;
    const cityFromProfile =
      typeof userMeta.city === "string" ? userMeta.city.trim() : "";
    const postcodeFromProfile =
      typeof userMeta.postcode === "string" ? userMeta.postcode.trim() : "";

    if (!cityFromProfile || !postcodeFromProfile) {
      setSaving(false);
      setError("Please complete your profile city and postcode before publishing.");
      router.replace("/profile");
      return;
    }

    let imagePath: string | null = null;
    let imageUrl: string | null = null;

    if (imageFile) {
      const imageError = getImageValidationError(imageFile);
      if (imageError) {
        setSaving(false);
        setError(imageError);
        return;
      }

      const ext = getFileExtension(imageFile);
      const filePath = `${userData.user.id}/${Date.now()}-${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(LISTING_IMAGE_BUCKET)
        .upload(filePath, imageFile, {
          cacheControl: "3600",
          upsert: false,
          contentType: imageFile.type,
        });

      if (uploadError) {
        setSaving(false);
        setError(uploadError.message);
        return;
      }

      imagePath = filePath;
      const { data: publicUrlData } = supabase.storage
        .from(LISTING_IMAGE_BUCKET)
        .getPublicUrl(filePath);
      imageUrl = publicUrlData.publicUrl;
    }

    const payload: Record<string, unknown> = {
      owner_id: userData.user.id,
      title: cleanTitle,
      description: cleanDescription || null,
      category: cleanCategory || "Other",
      city: cityFromProfile,
      postcode: postcodeFromProfile,
      type,
      price_per_day: parsedPricePerDay,
      deposit: parsedDeposit,
      status: "active",
    };

    if (imagePath && imageUrl) {
      payload.image_path = imagePath;
      payload.image_url = imageUrl;
    }

    const { error: insertError } = await supabase.from("listings").insert(payload);
    setSaving(false);

    if (insertError) {
      if (imagePath) {
        await supabase.storage.from(LISTING_IMAGE_BUCKET).remove([imagePath]);
      }

      if (
        insertError.message.toLowerCase().includes("column") &&
        insertError.message.toLowerCase().includes("image_")
      ) {
        setError(
          "Listing image columns are missing in Supabase table. Add image_url and image_path columns in listings, then try again."
        );
        return;
      }

      setError(insertError.message);
      return;
    }

    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    setImageFile(null);
    setImagePreviewUrl(null);
    router.push("/listings");
    router.refresh();
  }

  if (authLoading) {
    return (
      <main className="min-h-screen bg-[#fbf5ef] grid place-items-center px-6">
        <div className="rounded-xl border border-black/10 bg-white px-6 py-4 text-sm text-zinc-600">
          Loading account...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fbf5ef] px-6 py-12">
      <div className="mx-auto w-full max-w-2xl rounded-2xl border border-black/10 bg-white p-8 shadow-[0_18px_45px_rgba(0,0,0,0.12)]">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-extrabold text-zinc-900">Create Listing</h1>
          <Button href="/listings" variant="outline">
            Back to listings
          </Button>
        </div>

        <p className="mt-2 text-sm text-zinc-500">
          Share an item with your community.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-800">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-xl border border-black/10 bg-[#fbf7f2] px-4 py-3 text-sm outline-none focus:border-[#f0842f] focus:ring-2 focus:ring-[#f0842f]/20"
              placeholder="Cordless drill set"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-800">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-black/10 bg-[#fbf7f2] px-4 py-3 text-sm outline-none focus:border-[#f0842f] focus:ring-2 focus:ring-[#f0842f]/20"
              placeholder="Condition, pickup details, notes..."
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-800">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-[#fbf7f2] px-4 py-3 text-sm outline-none focus:border-[#f0842f] focus:ring-2 focus:ring-[#f0842f]/20"
                placeholder="Tools"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-800">Type</label>
              <select
                value={type}
                onChange={(e) => {
                  if (e.target.value === "free" || e.target.value === "rental") {
                    setType(e.target.value);
                    if (e.target.value === "free") {
                      setPricePerDay("");
                      setDeposit("");
                    }
                  }
                }}
                className="w-full rounded-xl border border-black/10 bg-[#fbf7f2] px-4 py-3 text-sm outline-none focus:border-[#f0842f] focus:ring-2 focus:ring-[#f0842f]/20"
              >
                <option value="free">Free</option>
                <option value="rental">Rental</option>
              </select>
            </div>
          </div>

          {type === "rental" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-800">
                  Price per day
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0.01"
                  step="0.01"
                  value={pricePerDay}
                  onChange={(e) => setPricePerDay(e.target.value)}
                  required
                  className="w-full rounded-xl border border-black/10 bg-[#fbf7f2] px-4 py-3 text-sm outline-none focus:border-[#f0842f] focus:ring-2 focus:ring-[#f0842f]/20"
                  placeholder="10.00"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-800">
                  Deposit (optional)
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-[#fbf7f2] px-4 py-3 text-sm outline-none focus:border-[#f0842f] focus:ring-2 focus:ring-[#f0842f]/20"
                  placeholder="50.00"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-800">
              Listing image (optional)
            </label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                if (!file) {
                  setImageFile(null);
                  if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
                  setImagePreviewUrl(null);
                  return;
                }

                const imageError = getImageValidationError(file);
                if (imageError) {
                  setError(imageError);
                  e.currentTarget.value = "";
                  return;
                }

                setError(null);
                const nextPreviewUrl = URL.createObjectURL(file);
                if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
                setImageFile(file);
                setImagePreviewUrl(nextPreviewUrl);
              }}
              className="w-full rounded-xl border border-black/10 bg-[#fbf7f2] px-3 py-2 text-sm text-zinc-900 file:mr-4 file:rounded-full file:border-0 file:bg-[#f0842f] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#ea7a25]"
            />
            <p className="text-xs text-zinc-500">
              JPG, PNG, or WEBP up to 5 MB.
            </p>
            {imagePreviewUrl && (
              <div className="overflow-hidden rounded-xl border border-black/10">
                <img
                  src={imagePreviewUrl}
                  alt="Selected listing preview"
                  className="h-44 w-full object-cover"
                />
              </div>
            )}
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-[#f0842f] py-3.5 text-sm font-semibold text-white hover:bg-[#ea7a25] disabled:opacity-60"
          >
            {saving ? "Publishing..." : "Publish listing"}
          </button>
        </form>
      </div>
    </main>
  );
}
