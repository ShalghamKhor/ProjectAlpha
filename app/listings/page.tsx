"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ListingsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [debug, setDebug] = useState<any>({ loading: true });

  console.log("LISTINGS COMPONENT RENDERED"); // should show immediately

  useEffect(() => {
    console.log("LISTINGS useEffect RUN"); // should show on load

    (async () => {
      const res = await supabase
        .from("listings")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
      console.log("SUPABASE DATA:", res.data);
      console.log("SUPABASE ERROR:", res.error);

      setDebug({
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        count: res.data?.length ?? 0,
        error: res.error,
        firstRow: res.data?.[0] ?? null,
      });

      setItems(res.data ?? []);
    })();
  }, []);

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Listings</h1>

      {/* This box proves the code is running even if console is hiding logs */}
      <pre className="rounded border p-3 text-xs whitespace-pre-wrap">
        {JSON.stringify(debug, null, 2)}
      </pre>

      <ul className="space-y-2">
        {items.map((x) => (
          <li key={x.id} className="rounded border p-3">
            <div className="font-medium">{x.title}</div>
            <div className="text-sm opacity-70">
              {x.type} • {x.city} • {x.delivery}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
