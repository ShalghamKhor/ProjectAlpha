import Image from "next/image";

import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-3xl font-semibold">OpenBazar</h1>
      <p>Offer items for free or rent them out.</p>

      <div className="flex gap-3">
        <Link className="underline" href="/listings">
          Browse listings
        </Link>
        <Link className="underline" href="/new">
          Create listing
        </Link>
      </div>
    </main>

  );
}

