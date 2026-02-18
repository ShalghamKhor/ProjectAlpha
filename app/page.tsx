import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-[#fbf5ef]">

      {/* Hero */}
      <main>
        <section className="relative">
          {/* soft band like the screenshot */}
          <div className="absolute inset-x-0 top-[55%] h-52 bg-[#eaf5f3]" />

          <div className="relative mx-auto max-w-4xl px-6 pt-20 pb-14 text-center space-y-6">
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-zinc-900">
              Share & Rent{" "}
              <span className="text-orange-500">Locally</span>
            </h1>

            <p className="mx-auto max-w-2xl text-base sm:text-lg text-zinc-600 leading-relaxed">
              Give away items you no longer need or rent them out to your
              neighbors. Community sharing made easy.
            </p>

            {/* Search */}
            <div className="mx-auto mt-8 max-w-2xl space-y-4">
              <div className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 shadow-sm">
                <span className="opacity-50">🔎</span>
                <input
                  className="w-full outline-none text-sm sm:text-base placeholder:text-zinc-400"
                  placeholder="Search items..."
                />
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <select className="w-full sm:w-44 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm shadow-sm">
                  <option>All Types</option>
                  <option>Free</option>
                  <option>Rental</option>
                </select>

                <select className="w-full sm:w-52 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm shadow-sm">
                  <option>All Categories</option>
                  <option>Electronics</option>
                  <option>Furniture</option>
                  <option>Tools</option>
                  <option>Kids</option>
                  <option>Sports</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Empty state */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="mx-auto mt-12 max-w-xl text-center rounded-2xl border border-black/10 bg-white/40 py-14 px-6">
            <div className="mx-auto h-12 w-12 rounded-2xl border border-black/10 bg-white grid place-items-center shadow-sm">
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
                className="rounded-full border border-black/10 bg-white px-5 py-2 text-sm font-semibold hover:bg-black/5"
              >
                Create listing
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
