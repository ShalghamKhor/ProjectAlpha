"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) return setError(error.message);

    router.push("/");
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
            Welcome Back
          </h1>
          <p className="mt-1 text-center text-sm text-zinc-500">
            Sign in to ShareLocal
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
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              disabled={loading}
              className="w-full rounded-xl bg-[#f0842f] py-3.5 text-sm font-semibold text-white hover:bg-[#ea7a25] disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#f0842f] hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
