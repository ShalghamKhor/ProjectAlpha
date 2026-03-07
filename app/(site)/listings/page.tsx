"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Listing = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  image_url?: string | null;
  image_path?: string | null;
  type: "free" | "rental";
  status: "active" | "reserved" | "closed";
  created_at: string;
};

function colorFromId(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  const hue = hash % 360;
  return `hsl(${hue} 70% 78%)`;
}

export default function ListingsPage() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";
  const initialType = searchParams.get("type");
  const initialCategory = searchParams.get("category") ?? "All Categories";

  const [items, setItems] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [q, setQ] = useState(initialQ);
  const [typeFilter, setTypeFilter] = useState<"all" | "free" | "rental">(
    initialType === "free" || initialType === "rental" ? initialType : "all"
  );
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);

      if (!supabase) {
        setItems([]);
        setError(
          "Missing Supabase env. Create .env.local with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
        );
        setLoading(false);
        return;
      }

      const res = await supabase
        .from("listings")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(50);

      if (res.error) {
        setError(res.error.message);
        setItems([]);
      } else {
        setItems((res.data as Listing[]) ?? []);
      }

      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();

    return items.filter((x) => {
      const matchesText =
        needle.length === 0 ||
        x.title.toLowerCase().includes(needle) ||
        (x.description ?? "").toLowerCase().includes(needle) ||
        (x.category ?? "").toLowerCase().includes(needle);

      const matchesType = typeFilter === "all" ? true : x.type === typeFilter;
      const matchesCategory =
        categoryFilter === "All Categories" ||
        (x.category ?? "").toLowerCase() === categoryFilter.toLowerCase();

      return matchesText && matchesType && matchesCategory;
    });
  }, [items, q, typeFilter, categoryFilter]);

  return (
    <main className="min-h-screen bg-[#fbf5ef] px-6 py-12">
      <div className="mx-auto max-w-6xl space-y-5">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-zinc-900">Browse Listings</h1>
          <p className="text-zinc-600">Free giveaways and rentals from your community.</p>
        </div>

        <Link
          href="/new"
          className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
        >
          + Create listing
        </Link>
      </header>

      <section className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search (title, category, description)…"
          className="w-full rounded-xl border border-black/10 bg-[#fbf7f2] px-3 py-2 text-sm text-zinc-900 outline-none focus:border-[#f0842f] focus:ring-2 focus:ring-[#f0842f]/20"
        />

        <select
          value={typeFilter}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "all" || value === "free" || value === "rental") {
              setTypeFilter(value);
            }
          }}
          className="w-full rounded-xl border border-black/10 bg-[#fbf7f2] px-3 py-2 text-sm text-zinc-900 outline-none focus:border-[#f0842f] focus:ring-2 focus:ring-[#f0842f]/20 sm:w-48"
        >
          <option value="all">All</option>
          <option value="free">Free</option>
          <option value="rental">Rental</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full rounded-xl border border-black/10 bg-[#fbf7f2] px-3 py-2 text-sm text-zinc-900 outline-none focus:border-[#f0842f] focus:ring-2 focus:ring-[#f0842f]/20 sm:w-56"
        >
          <option value="All Categories">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Tools">Tools</option>
          <option value="Kids">Kids</option>
          <option value="Sports">Sports</option>
          <option value="Home">Home</option>
        </select>
      </section>

      {loading && (
        <div className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-600">
          Loading…
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Error: {error}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="rounded-xl border border-black/10 bg-white/60 px-4 py-3 text-sm text-zinc-600">
          No listings found.
        </div>
      )}

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((x) => (
          <li key={x.id} className="rounded-2xl border border-black/10 bg-white/80 p-4 shadow-sm">
            <div className="mb-3 h-44 overflow-hidden rounded-xl">
              {x.image_url ? (
                <img
                  src={x.image_url}
                  alt={x.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  className="h-full w-full border border-black/10"
                  style={{ backgroundColor: colorFromId(x.id) }}
                  aria-hidden="true"
                />
              )}
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="text-lg font-semibold text-zinc-900">{x.title}</div>

              <span className="rounded-full border border-black/10 bg-white px-2 py-1 text-xs text-zinc-700">
                {x.type === "free" ? "Free" : "Rental"}
              </span>
            </div>

            <div className="mt-1 text-sm text-zinc-600">{x.category ?? "Uncategorized"}</div>

            {x.description && (
              <p className="mt-3 line-clamp-3 text-sm text-zinc-700/90">{x.description}</p>
            )}

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs opacity-60">
                {new Date(x.created_at).toLocaleDateString()}
              </span>

              <span
                aria-disabled="true"
                title=""
                className="cursor-not-allowed text-sm text-zinc-500"
              >
                View (coming soon)
              </span>
            </div>
          </li>
        ))}
      </ul>
      </div>
    </main>
  );
}
