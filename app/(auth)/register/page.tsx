"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMsg(null);

    if (!supabase) {
      setLoading(false);
      setError(
        "Missing Supabase env. Create .env.local with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
      );
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) return setError(error.message);

    setMsg("Account created! Check your email to confirm, then sign in.");
  }

  return (
    <main className="min-h-screen bg-[#fbf5ef] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-[0_18px_45px_rgba(0,0,0,0.12)]">
          {/* Icon */}
          <div className="mx-auto h-14 w-14 rounded-2xl bg-[#f0842f] grid place-items-center">
            <span className="text-white text-2xl font-extrabold">⬢</span>
          </div>

          <h1 className="mt-6 text-center text-3xl font-extrabold text-zinc-900">
            Create Account
          </h1>
          <p className="mt-1 text-center text-sm text-zinc-500">
            Sign up to ShareLocal
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-800">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-black/10 bg-[#fbf7f2] px-4 py-3 text-sm text-zinc-900 outline-none focus:border-[#f0842f] focus:ring-2 focus:ring-[#f0842f]/20"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-800">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-black/10 bg-[#fbf7f2] px-4 py-3 text-sm text-zinc-900 outline-none focus:border-[#f0842f] focus:ring-2 focus:ring-[#f0842f]/20"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="text-xs text-zinc-500">
                Use at least 8 characters.
              </p>
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {msg && (
              <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                {msg}
              </div>
            )}

            <button
              disabled={loading}
              className="w-full rounded-xl bg-[#f0842f] py-3.5 text-sm font-semibold text-white hover:bg-[#ea7a25] disabled:opacity-60"
            >
              {loading ? "Creating..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#f0842f] hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
