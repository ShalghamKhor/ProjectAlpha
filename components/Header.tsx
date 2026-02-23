"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import { hasCompletedProfile } from "@/lib/profile";
import { supabase } from "@/lib/supabaseClient";

type MiniUser = {
  email?: string | null;
  name?: string | null;
  profileComplete: boolean;
};

function hashToHsl(str: string) {
  // stable random hue from a string
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;

  const hue = h % 360;

  // Keep saturation high, and lightness in a safe range (not too light)
  const sat = 75;
  const light = 42; // <= this keeps backgrounds darker so text shows

  return { hue, sat, light };
}

function hslToCss(h: number, s: number, l: number) {
  return `hsl(${h} ${s}% ${l}%)`;
}

// Decide black or white text based on lightness
function textColorForLightness(l: number) {
  return l >= 60 ? "#111827" : "#ffffff";
}

function Avatar({ name, seed }: { name: string; seed: string }) {
  const letter = (name.trim()[0] || "?").toUpperCase();

  const { hue, sat, light } = useMemo(() => hashToHsl(seed), [seed]);
  const bg = hslToCss(hue, sat, light);
  const fg = textColorForLightness(light);

  return (
    <div
      className="h-10 w-10 rounded-full grid place-items-center font-extrabold shadow-sm border border-black/10"
      style={{ background: bg, color: fg }}
      aria-label="Profile"
      title={name}
    >
      {letter}
    </div>
  );
}


export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<MiniUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      if (!supabase) {
        if (mounted) setUser(null);
        return;
      }
      const { data } = await supabase.auth.getUser();
      const u = data.user;

      if (!mounted) return;

      if (!u) setUser(null);
      else {
        // try name from metadata, fallback to email
        const metaName =
          (u.user_metadata?.display_name as string | undefined) ||
          (u.user_metadata?.full_name as string | undefined) ||
          (u.user_metadata?.name as string | undefined) ||
          null;

        setUser({
          email: u.email,
          name: metaName,
          profileComplete: hasCompletedProfile(u),
        });
      }
    }

    load();

    if (!supabase) return;

    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      load();
      router.refresh(); // updates server components too if needed
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [router]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }

    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  async function logout() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setMenuOpen(false);
    setUser(null);
    router.push("/"); // or "/home" if you prefer
    router.refresh();
  }

  const displayName = user?.name || user?.email || "User";
  const seed = user?.email || displayName;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-black/5">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-orange-500/10 border border-orange-500/20 grid place-items-center">
            <span className="text-orange-600 font-bold">⬢</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">ShareLocal</span>
        </Link>

        {/* Nav */}
        <nav className="hidden sm:flex flex-row gap-4 text-zinc-800">
          <Link href="/home" className="hover:underline hover:text-orange-600 transition-colors">HomePage</Link>
          <Link href="/contact" className="hover:underline hover:text-orange-600 transition-colors">Contact</Link>
          <Link href="/#" className="hover:underline hover:text-orange-600 transition-colors">About Us</Link>
          <Link href="/##" className="hover:underline hover:text-orange-600 transition-colors">Terms &amp; Rules</Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Button href="/login" variant="outline">
                Sign In
              </Button>
              <Button href="/register" variant="primary">
                Sign Up
              </Button>
            </>
          ) : (
            <>
              {user.profileComplete ? (
                <div className="relative" ref={menuRef}>
                  <button
                    type="button"
                    onClick={() => setMenuOpen((v) => !v)}
                    className="group flex items-center gap-2 rounded-full border border-black/10 bg-white px-2 py-1 text-zinc-900 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 transition-colors"
                    aria-haspopup="menu"
                    aria-expanded={menuOpen}
                  >
                    <Avatar name={displayName} seed={seed} />
                    <span className="text-sm font-semibold pr-1">Account</span>
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl border border-black/10 bg-white p-1 shadow-lg">
                      <Link
                        href="/profile"
                        onClick={() => setMenuOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-600"
                      >
                        Profile
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMenuOpen(false)}
                        className="block w-full rounded-lg px-3 py-2 text-left text-sm opacity-60 cursor-not-allowed"
                        disabled
                      >
                        Settings (coming soon)
                      </button>
                      <button
                        type="button"
                        onClick={logout}
                        className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/onboarding"
                  className="rounded-full border border-orange-500 px-4 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50"
                >
                  Complete profile
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
