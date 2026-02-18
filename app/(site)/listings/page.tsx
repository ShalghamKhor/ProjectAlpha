"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Listing = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  type: "free" | "rental";
  price_amount: number | null;
  price_unit: "day" | "week" | null;
  status: "available" | "paused";
  created_at: string;
};

export default function ListingsPage() {
  const [items, setItems] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [q, setQ] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "free" | "rental">("all");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);

      // ✅ guard if env is missing
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
        .select("id,title,description,category,type,price_amount,price_unit,status,created_at")
        .eq("status", "available")
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

      return matchesText && matchesType;
    });
  }, [items, q, typeFilter]);

  return (
    <main className="p-6 space-y-5">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Browse Listings</h1>
          <p className="opacity-70">Free giveaways and rentals from your community.</p>
        </div>

        <Link href="/new" className="rounded-lg border px-4 py-2 hover:bg-black/5">
          + Create listing
        </Link>
      </header>

      <section className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search (title, category, description)…"
          className="w-full rounded-lg border px-3 py-2"
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as any)}
          className="w-full rounded-lg border px-3 py-2 sm:w-48"
        >
          <option value="all">All</option>
          <option value="free">Free</option>
          <option value="rental">Rental</option>
        </select>
      </section>

      {loading && <div className="rounded-lg border p-4 opacity-70">Loading…</div>}

      {error && <div className="rounded-lg border p-4 text-red-600">Error: {error}</div>}

      {!loading && !error && filtered.length === 0 && (
        <div className="rounded-lg border p-4 opacity-70">No listings found.</div>
      )}

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((x) => (
          <li key={x.id} className="rounded-2xl border p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="text-lg font-semibold">{x.title}</div>

              <span className="rounded-full border px-2 py-1 text-xs">
                {x.type === "free" ? "Free" : `${x.price_amount ?? "?"}/${x.price_unit ?? "?"}`}
              </span>
            </div>

            <div className="mt-1 text-sm opacity-70">{x.category ?? "Uncategorized"}</div>

            {x.description && (
              <p className="mt-3 line-clamp-3 text-sm opacity-80">{x.description}</p>
            )}

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs opacity-60">
                {new Date(x.created_at).toLocaleDateString()}
              </span>

              <Link href={`/listings/${x.id}`} className="text-sm underline">
                View
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

