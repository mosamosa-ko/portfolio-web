export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f8f6f1] text-black">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-between px-6 py-8 sm:px-10">
        <header className="flex items-center justify-between">
          <a href="/" className="inline-flex items-center gap-3" aria-label="Return to Ko Yamasaki portfolio home">
            <img src="/name_logo_transparent.png" alt="Ko Yamasaki" className="h-10 w-20 object-contain" />
            <span className="font-mono text-[0.64rem] uppercase tracking-[0.28em] text-black/54">Portfolio baggage</span>
          </a>
          <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#2f718a]">404 room</span>
        </header>

        <div className="grid items-center gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#2f718a]">Museum map error</p>
            <h1 className="mt-5 max-w-xl text-6xl font-semibold tracking-[-0.08em] sm:text-7xl">
              This room is not on the map.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-black/62">
              The requested page does not exist. Return to the entrance and keep inspecting the portfolio.
            </p>
            <a
              href="/"
              className="mt-8 inline-flex rounded-full border border-[#8fc7dd]/70 bg-white px-5 py-3 font-mono text-xs uppercase tracking-[0.22em] text-[#2f718a] shadow-[0_18px_50px_rgba(95,159,186,0.14)] transition hover:-translate-y-0.5"
            >
              Return to lobby
            </a>
          </div>

          <div className="border border-[#8fc7dd]/50 bg-[#fbfdfe] p-4 shadow-[8px_8px_0_rgba(95,159,186,0.12)]">
            <div className="flex items-center justify-between border-b border-[#8fc7dd]/40 pb-3 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-black/50">
              <span>Lost gallery</span>
              <span>room 404</span>
            </div>
            <div className="grid min-h-[360px] place-items-center bg-[linear-gradient(90deg,rgba(143,199,221,0.14)_1px,transparent_1px),linear-gradient(rgba(143,199,221,0.14)_1px,transparent_1px)] bg-[length:28px_28px] p-8">
              <pre className="overflow-hidden text-center font-mono text-[0.68rem] leading-[0.9rem] text-black/70" aria-hidden="true">
{`+------------------------------+
|                              |
|        [ missing frame ]      |
|                              |
|             404              |
|                              |
|   corridor -> lobby -> home   |
|                              |
+------------------------------+`}
              </pre>
            </div>
          </div>
        </div>

        <footer className="border-t border-[#8fc7dd]/40 pt-5 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-black/45">
          © 2026 Ko Yamasaki
        </footer>
      </section>
    </main>
  );
}
