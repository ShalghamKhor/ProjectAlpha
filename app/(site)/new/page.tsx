"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hasCompletedProfile } from "@/lib/profile";
import { supabase } from "@/lib/supabaseClient";

type ListingType = "free" | "rental";

export default function NewListingPage() {
  const router = useRouter();
  const [authLoading, setAuthLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<ListingType>("free");

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
        setError(userError.message);
        setAuthLoading(false);
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

    if (!cleanTitle) {
      setSaving(false);
      setError("Title is required.");
      return;
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      setSaving(false);
      setError(userError?.message ?? "Please sign in again.");
      return;
    }

    const payload = {
      owner_id: userData.user.id,
      title: cleanTitle,
      description: cleanDescription || null,
      category: cleanCategory || null,
      type,
      status: "active",
    };

    const { error: insertError } = await supabase.from("listings").insert(payload);
    setSaving(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

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
          <Link href="/listings" className="text-sm underline">
            Back to listings
          </Link>
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
                  }
                }}
                className="w-full rounded-xl border border-black/10 bg-[#fbf7f2] px-4 py-3 text-sm outline-none focus:border-[#f0842f] focus:ring-2 focus:ring-[#f0842f]/20"
              >
                <option value="free">Free</option>
                <option value="rental">Rental</option>
              </select>
            </div>
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
