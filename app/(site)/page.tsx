// app/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="relative h-screen w-screen mt-0 overflow-hidden">
      {/* Background Image – make it a bit brighter so text stands out */}
      <Image
        src="/bg.png"
        alt="Hero background"
        fill
        className="object-cover object-center brightness-[0.55] scale-100 transition-transform duration-700"  // ↑ was 0.4 → now 0.55 (adjust 0.5–0.65)
        priority
        quality={80}
      />

      {/* Overlay – slightly less dark */}
      <div className="absolute inset-0 bg-black/45" />  // was /30 → /45 for better contrast balance

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-10 px-6 text-center text-white">
        <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          Welcome to
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            {" "}Your Thing
          </span>
        </h1>

        <p className="max-w-2xl text-xl md:text-2xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] mt-4">
          Something awesome is waiting for you.
        </p>

        {/* ─── Readable & cool list ─── */}
        <ul className="flex flex-col gap-6 mt-6 md:mt-8">
          {["Buy", "Sell", "Rent or Borrow", "Offer your help"].map((item, index) => (
            <li
              key={item}
              className={`
                group relative inline-block
                text-2xl md:text-3xl font-semibold tracking-wide
                text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.95)]
                transition-all duration-400 ease-out
                hover:text-cyan-300
                hover:scale-110 hover:-translate-y-1.5
                hover:drop-shadow-[0_10px_30px_rgba(34,211,238,0.7)]
                cursor-pointer
              `}
            >
              {/* Expanding glow bar on hover */}
              <span className="
                absolute -bottom-2 left-1/2 -translate-x-1/2 
                h-[4px] w-0 rounded-full 
                bg-gradient-to-r from-cyan-400 to-purple-500 
                group-hover:w-3/4 
                transition-all duration-500 ease-out
              "/>

              <span className="
                inline-block mr-4 text-purple-300 
                group-hover:text-cyan-200 group-hover:rotate-12 
                transition-all duration-400
              ">
                ➜
              </span>

              {item}
            </li>
          ))}
        </ul>

        {/* Explore Button – more visible glow */}
        <Link
          href="/Home"
          className="
            group relative inline-flex items-center justify-center
            overflow-hidden rounded-full 
            bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
            px-12 py-7 text-xl font-bold uppercase tracking-wider text-white
            shadow-xl shadow-purple-900/40
            transition-all duration-400 
            hover:scale-120 hover:shadow-[0_0_60px_25px_rgba(168,85,247,0.7)]
            focus:outline-none focus:ring-4 focus:ring-purple-400/60
            mt-10
          "
        >
          <span className="
            absolute inset-0 
            bg-gradient-to-r from-white/15 to-transparent 
            opacity-0 group-hover:opacity-100 
            transition-opacity duration-500
          "/>
          Explore Now
        </Link>
      </div>
    </main>
  );
}

