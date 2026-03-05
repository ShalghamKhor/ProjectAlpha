"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import { hasCompletedProfile } from "@/lib/profile";
import { supabase } from "@/lib/supabaseClient";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      if (!supabase) {
        if (mounted) {
          setError(
            "Missing Supabase env. Create .env.local with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
          );
          setLoading(false);
        }
        return;
      }

      const { data, error: userError } = await supabase.auth.getUser();
      if (!mounted) return;

      if (userError) {
        setError(userError.message);
        setLoading(false);
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

      const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
      setEmail(user.email ?? "");
      setFullName(typeof meta.full_name === "string" ? meta.full_name : "");
      setCity(typeof meta.city === "string" ? meta.city : "");
      setPhone(typeof meta.phone === "string" ? meta.phone : "");
      setLoading(false);
    }

    loadUser();
    return () => {
      mounted = false;
    };
  }, [router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setMsg(null);

    if (!supabase) {
      setSaving(false);
      setError(
        "Missing Supabase env. Create .env.local with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
      );
      return;
    }

    const cleanName = fullName.trim();
    const cleanCity = city.trim();
    const cleanPhone = phone.trim();

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      setSaving(false);
      setError(userError.message);
      return;
    }

    const currentMeta = (userData.user?.user_metadata ?? {}) as Record<string, unknown>;
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        ...currentMeta,
        full_name: cleanName,
        city: cleanCity,
        phone: cleanPhone,
        profile_completed: true,
      },
    });

    setSaving(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setMsg("Profile updated.");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fbf5ef] grid place-items-center px-6">
        <div className="rounded-xl border border-black/10 bg-white px-6 py-4 text-sm text-zinc-600">
          Loading profile...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fbf5ef] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-8 shadow-[0_18px_45px_rgba(0,0,0,0.12)]">
        <div className="mb-4">
          <Button href="/home" variant="outline" className="inline-flex items-center gap-1">
            ← Back
          </Button>
        </div>

        <h1 className="text-3xl font-extrabold text-zinc-900 text-center">
          Edit Profile
        </h1>
        <p className="mt-2 text-center text-sm text-zinc-500">
          Update your account details.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-800">
              Email
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full rounded-xl border border-black/10 bg-zinc-100 px-4 py-3 text-sm text-zinc-600"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-800">
              Full name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full rounded-xl border border-black/10 bg-[#fbf7f2] px-4 py-3 text-sm text-zinc-900 outline-none focus:border-[#f0842f] focus:ring-2 focus:ring-[#f0842f]/20"
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-800">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="w-full rounded-xl border border-black/10 bg-[#fbf7f2] px-4 py-3 text-sm text-zinc-900 outline-none focus:border-[#f0842f] focus:ring-2 focus:ring-[#f0842f]/20"
              placeholder="San Jose"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-800">
              Phone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full rounded-xl border border-black/10 bg-[#fbf7f2] px-4 py-3 text-sm text-zinc-900 outline-none focus:border-[#f0842f] focus:ring-2 focus:ring-[#f0842f]/20"
              placeholder="+1 555 123 4567"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {msg && (
            <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {msg}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-[#f0842f] py-3.5 text-sm font-semibold text-white hover:bg-[#ea7a25] disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </main>
  );
}
