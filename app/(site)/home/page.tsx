"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Listing = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  type: "free" | "rental";
  status: "active" | "reserved" | "closed";
  created_at: string;
};

type DropdownProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  widthClass: string;
};

function Dropdown({ options, value, onChange, widthClass }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div className={`relative ${widthClass}`} ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-xl border border-black/10 bg-white px-4 py-3 text-left text-sm shadow-sm transition-colors hover:border-orange-300 hover:bg-orange-50"
      >
        <span>{value}</span>
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>⌄</span>
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-full rounded-xl border border-black/10 bg-white p-1 shadow-lg">
          {options.map((option) => {
            const selected = option === value;
            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  selected
                    ? "bg-orange-100 text-orange-700"
                    : "hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  const [items, setItems] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchValue, setSearchValue] = useState("");
  const [typeValue, setTypeValue] = useState("All Types");
  const [categoryValue, setCategoryValue] = useState("All Categories");

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
        .select("id,title,description,category,type,status,created_at")
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(100);

      if (res.error) {
        setItems([]);
        setError(res.error.message);
      } else {
        setItems((res.data as Listing[]) ?? []);
      }

      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    const needle = searchValue.trim().toLowerCase();
    return items.filter((x) => {
      const matchesText =
        needle.length === 0 ||
        x.title.toLowerCase().includes(needle) ||
        (x.description ?? "").toLowerCase().includes(needle) ||
        (x.category ?? "").toLowerCase().includes(needle);

      const matchesType =
        typeValue === "All Types" ||
        (typeValue === "Free" && x.type === "free") ||
        (typeValue === "Rental" && x.type === "rental");

      const matchesCategory =
        categoryValue === "All Categories" ||
        (x.category ?? "").toLowerCase() === categoryValue.toLowerCase();

      return matchesText && matchesType && matchesCategory;
    });
  }, [items, searchValue, typeValue, categoryValue]);

  return (
    <div className="bg-[#fbf5ef]">
      <div>
        <section className="relative">
          <div className="absolute inset-x-0 top-[55%] h-52 bg-[#eaf5f3]" />

          <div className="relative mx-auto max-w-4xl px-6 pb-14 pt-20 space-y-6 text-center">
            <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl">
              Share & Rent <span className="text-orange-500">Locally</span>
            </h1>

            <p className="mx-auto max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
              Give away items you no longer need or rent them out to your
              neighbors. Community sharing made easy.
            </p>

            <div className="mx-auto mt-8 max-w-2xl space-y-4">
              <div className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 shadow-sm transition-colors hover:border-orange-300 focus-within:border-orange-400">
                <span className="opacity-50">🔎</span>
                <input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full text-sm outline-none placeholder:text-zinc-400 sm:text-base"
                  placeholder="Search items..."
                />
              </div>

              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Dropdown
                  options={["All Types", "Free", "Rental"]}
                  value={typeValue}
                  onChange={setTypeValue}
                  widthClass="w-full sm:w-44"
                />
                <Dropdown
                  options={[
                    "All Categories",
                    "Electronics",
                    "Furniture",
                    "Tools",
                    "Kids",
                    "Sports",
                    "Home",
                  ]}
                  value={categoryValue}
                  onChange={setCategoryValue}
                  widthClass="w-full sm:w-52"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24">
          {loading && (
            <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-black/10 bg-white px-6 py-10 text-center text-zinc-600">
              Loading listings...
            </div>
          )}

          {error && (
            <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center text-red-700">
              Error: {error}
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-black/10 bg-white/40 px-6 py-14 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-black/10 bg-white shadow-sm">
                <span className="text-xl opacity-70">📦</span>
              </div>

              <h2 className="mt-5 text-lg font-semibold text-zinc-900">
                No listings yet
              </h2>
              <p className="mt-1 text-sm text-zinc-600">
                Be the first to share something with your community!
              </p>

              <div className="mt-6 flex justify-center">
                <Link
                  href="/new"
                  className="rounded-full border border-black/10 bg-white px-5 py-2 text-sm font-semibold transition-colors hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
                >
                  Create listing
                </Link>
              </div>
            </div>
          )}

          {!loading && !error && filtered.length > 0 && (
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.slice(0, 12).map((x) => (
                <li key={x.id} className="rounded-2xl border p-4 shadow-sm bg-white/80">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-lg font-semibold">{x.title}</div>
                    <span className="rounded-full border px-2 py-1 text-xs">
                      {x.type === "free" ? "Free" : "Rental"}
                    </span>
                  </div>

                  <div className="mt-1 text-sm opacity-70">
                    {x.category ?? "Uncategorized"}
                  </div>

                  {x.description && (
                    <p className="mt-3 line-clamp-3 text-sm opacity-80">
                      {x.description}
                    </p>
                  )}

                  <div className="mt-4 text-xs opacity-60">
                    {new Date(x.created_at).toLocaleDateString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
