import Image from "next/image";


export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#fbf5ef]">
      <div className="container mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
        <section className="hero relative flex min-h-[70vh] flex-col justify-center overflow-hidden py-20 md:py-32">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <Image
              src="/openbazar-logo.svg"
              alt=""
              width={2200}
              height={700}
              className="w-[2200px] select-none opacity-[0.08]"
              priority
            />
          </div>

          <h1 className="relative z-10 text-5xl font-black leading-none tracking-tighter text-zinc-900 opacity-0 animate-[reveal_1.4s_cubic-bezier(0.16,1,0.3,1)_forwards] md:text-7xl lg:text-8xl xl:text-9xl">
            Prata med oss nu.
          </h1>

          <div className="relative z-10 mt-10 max-w-4xl translate-y-8 text-zinc-700 opacity-0 animate-[fadeUp_1.2s_0.4s_ease-out_forwards] md:mt-14">
            <p className="text-xl font-medium md:text-3xl lg:text-4xl">
              Frågor, idéer eller funderingar?
            </p>
            <p className="mt-4 text-xl font-medium md:text-3xl lg:text-4xl">
              Kontakta oss via mejl, chatt eller sociala medier.
            </p>
            <p className="mt-2 text-xl font-medium md:text-3xl lg:text-4xl">
              Vi hjälper dig vidare.
            </p>
          </div>
        </section>

        <section className="border-t border-black/10 py-20 md:py-32">
          <h2 className="mb-12 translate-y-6 text-4xl font-extrabold tracking-tight text-zinc-900 opacity-0 animate-[fadeUp_1s_0.2s_ease-out_forwards] md:mb-20 md:text-6xl lg:text-7xl">
            Hur når du oss
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12 lg:gap-16">
            <div className="group card translate-y-12 rounded-2xl border border-black/10 bg-white p-8 opacity-0 shadow-sm transition-all duration-400 hover:scale-[1.02] hover:border-orange-300 hover:shadow-xl animate-[cardIn_1.1s_cubic-bezier(0.16,1,0.3,1)_forwards] md:p-10">
              <h3 className="mb-6 text-3xl font-black text-zinc-900 transition-colors group-hover:text-orange-600 md:text-4xl">
                Maila oss
              </h3>
              <p className="mb-6 text-lg leading-relaxed text-zinc-600 md:text-xl">
                Snabbaste vägen. Vi lovar svar inom 24 h (oftast snabbare).
              </p>
              <a
                href="mailto:hej@minplattform.se"
                className="inline-block text-2xl font-bold text-[#f0842f] transition-transform hover:underline group-hover:scale-105 md:text-3xl"
              >
                Openbazar@gmail.se
              </a>
            </div>

            <div className="group card translate-y-12 rounded-2xl border border-black/10 bg-white p-8 opacity-0 shadow-sm transition-all duration-400 hover:scale-[1.02] hover:border-orange-300 hover:shadow-xl animate-[cardIn_1.1s_0.15s_cubic-bezier(0.16,1,0.3,1)_forwards] md:p-10">
              <h3 className="mb-6 text-3xl font-black text-zinc-900 transition-colors group-hover:text-orange-600 md:text-4xl">
                Chatt direkt
              </h3>
              <p className="mb-6 text-lg leading-relaxed text-zinc-600 md:text-xl">
                Öppet vardagar 09–21. Perfekt för snabba frågor om lån, uthyrning
                eller buggar.
              </p>
              <button className="rounded-xl bg-[#f0842f] px-10 py-5 text-xl font-bold text-white transition-all duration-300 hover:bg-[#ea7a25] hover:scale-105 active:scale-95 md:text-2xl">
                Öppna chatt
              </button>
            </div>

            <div className="group card translate-y-12 rounded-2xl border border-black/10 bg-white p-8 opacity-0 shadow-sm transition-all duration-400 hover:scale-[1.02] hover:border-orange-300 hover:shadow-xl animate-[cardIn_1.1s_0.3s_cubic-bezier(0.16,1,0.3,1)_forwards] md:p-10">
              <h3 className="mb-6 text-3xl font-black text-zinc-900 transition-colors group-hover:text-orange-600 md:text-4xl">
                Socialt
              </h3>
              <p className="mb-6 text-lg leading-relaxed text-zinc-600 md:text-xl">
                Följ oss, DM:a oss, tagga oss – vi är där.
              </p>
              <div className="flex flex-wrap gap-6 text-2xl font-bold md:text-3xl">
                <a href="#" className="transition-colors hover:text-orange-600">
                  X / Twitter
                </a>
                <a href="#" className="transition-colors hover:text-orange-600">
                  Instagram
                </a>
                <a href="#" className="transition-colors hover:text-orange-600">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32">
          <h2 className="mb-12 translate-y-6 text-center text-4xl font-extrabold tracking-tight text-zinc-900 opacity-0 animate-[fadeUp_1s_0.2s_ease-out_forwards] md:mb-16 md:text-6xl lg:text-7xl">
            Skicka meddelande
          </h2>

          <form className="mx-auto max-w-3xl space-y-10 rounded-3xl border border-black/10 bg-white p-8 shadow-[0_18px_45px_rgba(0,0,0,0.08)] md:space-y-14 md:p-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
              <div className="translate-y-10 opacity-0 animate-[fadeUp_1s_0.4s_ease-out_forwards]">
                <label htmlFor="name" className="mb-4 block text-xl font-bold text-zinc-800 md:text-2xl">
                  Namn
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full rounded-xl border border-black/10 bg-[#fbf7f2] px-4 py-4 text-xl text-zinc-900 outline-none transition-colors duration-300 placeholder:text-zinc-500 focus:border-[#f0842f] focus:ring-2 focus:ring-[#f0842f]/20 md:text-2xl"
                  placeholder="Namn"
                  required
                />
              </div>

              <div className="translate-y-10 opacity-0 animate-[fadeUp_1s_0.5s_ease-out_forwards]">
                <label htmlFor="email" className="mb-4 block text-xl font-bold text-zinc-800 md:text-2xl">
                  E-post
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-xl border border-black/10 bg-[#fbf7f2] px-4 py-4 text-xl text-zinc-900 outline-none transition-colors duration-300 placeholder:text-zinc-500 focus:border-[#f0842f] focus:ring-2 focus:ring-[#f0842f]/20 md:text-2xl"
                  placeholder="Mejl"
                  required
                />
              </div>
            </div>

            <div className="translate-y-10 opacity-0 animate-[fadeUp_1s_0.6s_ease-out_forwards]">
              <label htmlFor="message" className="mb-4 block text-xl font-bold text-zinc-800 md:text-2xl">
                Meddelande
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full resize-none rounded-xl border border-black/10 bg-[#fbf7f2] px-4 py-4 text-xl text-zinc-900 outline-none transition-colors duration-300 placeholder:text-zinc-500 focus:border-[#f0842f] focus:ring-2 focus:ring-[#f0842f]/20 md:text-2xl"
                placeholder="Berätta vad du behöver hjälp med."
                required
              />
            </div>

            <div className="pt-4 text-center">
              <button
                type="submit"
                className="translate-y-8 rounded-2xl bg-[#f0842f] px-14 py-6 text-2xl font-black text-white opacity-0 transition-all duration-400 hover:bg-[#ea7a25] hover:scale-105 active:scale-95 animate-[fadeUp_1s_0.8s_ease-out_forwards] md:text-3xl"
              >
                SKICKA IVÄG
              </button>
            </div>
          </form>
        </section>

        <section className="border-t border-black/10 py-28 text-center md:py-40">
          <p className="translate-y-8 text-2xl font-bold text-zinc-800 opacity-0 animate-[fadeUp_1s_0.2s_ease-out_forwards] md:text-4xl">
            Vi är redo. Är du?
          </p>
        </section>
      </div>
    </main>
  );
}
