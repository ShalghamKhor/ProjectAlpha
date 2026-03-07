export default function ContactPage() {
  return (
    <main className="container mx-auto px-5 md:px-8 lg:px-12 max-w-7xl">
      {/* Hero – massive, commanding, slashes in */}
      <section className="hero relative overflow-hidden min-h-[70vh] flex flex-col justify-center py-20 md:py-32">
        {/* Background Logo (transparent) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img
            src="/openbazar-logo.svg"
            alt=""
            className="w-[2200px] opacity-[0.09] select-none"
          />
        </div>

        <h1
          className="relative z-10 text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-none tracking-tighter animate-[reveal_1.4s_cubic-bezier(0.16,1,0.3,1)_forwards] opacity-0"
        >
          Prata med oss nu.
        </h1>

        <div className="relative z-10 mt-10 md:mt-14 max-w-4xl opacity-0 animate-[fadeUp_1.2s_0.4s_ease-out_forwards] translate-y-8">
          <p className="text-xl md:text-3xl lg:text-4xl font-medium">
            Frågor, idéer eller funderingar?
          </p>
          <p className="text-xl md:text-3xl lg:text-4xl font-medium mt-4">
            Kontakta oss via mejl, chatt eller sociala medier.
          </p>
          <p className="text-xl md:text-3xl lg:text-4xl font-medium mt-2">
            Vi hjälper dig vidare.
          </p>
        </div>
      </section>

      {/* Contact Methods – bold cards with stagger */}
      <section className="py-20 md:py-32 border-t border-gray-800/40">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-12 md:mb-20 opacity-0 animate-[fadeUp_1s_0.2s_ease-out_forwards] translate-y-6">
          Hur når du oss
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {/* Email Card */}
          <div className="card bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 md:p-10 opacity-0 translate-y-12 animate-[cardIn_1.1s_cubic-bezier(0.16,1,0.3,1)_forwards] hover:scale-[1.04] hover:shadow-2xl hover:shadow-[var(--primary)]/30 transition-all duration-400 group">
            <h3 className="text-3xl md:text-4xl font-black mb-6 group-hover:text-[var(--primary)] transition-colors">
              Maila oss
            </h3>
            <p className="text-lg md:text-xl leading-relaxed mb-6">
              Snabbaste vägen. Vi lovar svar inom 24 h (oftast snabbare).
            </p>
            <a
              href="mailto:hej@minplattform.se"
              className="inline-block text-2xl md:text-3xl font-bold text-[var(--primary)] hover:underline underline-offset-8 decoration-4 group-hover:scale-105 transition-transform"
            >
              Openbazar@gmail.se
            </a>
          </div>

          {/* Chat / Quick message */}
          <div className="card bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 md:p-10 opacity-0 translate-y-12 animate-[cardIn_1.1s_0.15s_cubic-bezier(0.16,1,0.3,1)_forwards] hover:scale-[1.04] hover:shadow-2xl hover:shadow-[var(--primary)]/30 transition-all duration-400 group">
            <h3 className="text-3xl md:text-4xl font-black mb-6 group-hover:text-[var(--primary)] transition-colors">
              Chatt direkt
            </h3>
            <p className="text-lg md:text-xl leading-relaxed mb-6">
              Öppet vardagar 09–21. Perfekt för snabba frågor om lån, uthyrning
              eller buggar.
            </p>
            <button className="bg-[var(--primary)] text-white text-xl md:text-2xl font-bold px-10 py-5 rounded-xl shadow-lg shadow-[var(--primary)]/30 hover:shadow-2xl hover:shadow-[var(--primary)]/50 hover:scale-105 active:scale-95 transition-all duration-300">
              Öppna chatt
            </button>
          </div>

          {/* Social / Other */}
          <div className="card bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 md:p-10 opacity-0 translate-y-12 animate-[cardIn_1.1s_0.3s_cubic-bezier(0.16,1,0.3,1)_forwards] hover:scale-[1.04] hover:shadow-2xl hover:shadow-[var(--primary)]/30 transition-all duration-400 group">
            <h3 className="text-3xl md:text-4xl font-black mb-6 group-hover:text-[var(--primary)] transition-colors">
              Socialt
            </h3>
            <p className="text-lg md:text-xl leading-relaxed mb-6">
              Följ oss, DM:a oss, tagga oss – vi är där.
            </p>
            <div className="flex flex-wrap gap-6 text-2xl md:text-3xl font-bold">
              <a href="#" className="hover:text-[var(--primary)] transition-colors">
                X / Twitter
              </a>
              <a href="#" className="hover:text-[var(--primary)] transition-colors">
                Instagram
              </a>
              <a href="#" className="hover:text-[var(--primary)] transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form – big, bold inputs, aggressive submit */}
      <section className="py-20 md:py-32">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-12 md:mb-16 text-center opacity-0 animate-[fadeUp_1s_0.2s_ease-out_forwards] translate-y-6">
          Skicka meddelande
        </h2>

        <form className="max-w-3xl mx-auto space-y-10 md:space-y-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="opacity-0 translate-y-10 animate-[fadeUp_1s_0.4s_ease-out_forwards]">
              <label htmlFor="name" className="block text-xl md:text-2xl font-bold mb-4">
                Namn
              </label>
              <input
                type="text"
                id="name"
                className="w-full bg-transparent border-b-4 border-gray-600 focus:border-[var(--primary)] text-2xl md:text-3xl py-4 focus:outline-none transition-colors duration-300 placeholder-gray-500"
                placeholder="Namn"
                required
              />
            </div>

            <div className="opacity-0 translate-y-10 animate-[fadeUp_1s_0.5s_ease-out_forwards]">
              <label htmlFor="email" className="block text-xl md:text-2xl font-bold mb-4">
                E-post
              </label>
              <input
                type="email"
                id="email"
                className="w-full bg-transparent border-b-4 border-gray-600 focus:border-[var(--primary)] text-2xl md:text-3xl py-4 focus:outline-none transition-colors duration-300 placeholder-gray-500"
                placeholder="Mejl"
                required
              />
            </div>
          </div>

          <div className="opacity-0 translate-y-10 animate-[fadeUp_1s_0.6s_ease-out_forwards]">
            <label htmlFor="message" className="block text-xl md:text-2xl font-bold mb-4">
              Meddelande
            </label>
            <textarea
              id="message"
              rows={6}
              className="w-full bg-transparent border-b-4 border-gray-600 focus:border-[var(--primary)] text-2xl md:text-3xl py-4 focus:outline-none transition-colors duration-300 placeholder-gray-500 resize-none"
              placeholder="Berätta vad du behöver hjälp med."
              required
            />
          </div>

          <div className="text-black text-center pt-8">
            <button
              type="submit"
              className="bg-[var(--primary)] text-black text-2xl md:text-4xl font-black px-16 py-8 rounded-2xl shadow-2xl shadow-[var(--primary)]/40 hover:shadow-[var(--primary)]/60 hover:scale-105 active:scale-95 transition-all duration-400 opacity-0 animate-[fadeUp_1s_0.8s_ease-out_forwards] translate-y-8"
            >
              SKICKA IVÄG
            </button>
          </div>
        </form>
      </section>

      {/* Final punchy CTA */}
      <section className="py-28 md:py-40 text-center border-t border-gray-800/40">
        <p className="text-2xl md:text-4xl font-bold opacity-0 animate-[fadeUp_1s_0.2s_ease-out_forwards] translate-y-8">
          Vi är redo. Är du?
        </p>
      </section>
    </main>
  );
}