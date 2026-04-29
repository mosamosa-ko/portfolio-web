const links = [
  { label: "GitHub", href: "https://github.com/mosamosa-ko", icon: "github" },
  { label: "Email", href: "mailto:hello@example.com" },
];

export function ContactSection() {
  return (
    <section className="bg-[#0b0f12] px-6 py-24 text-[#f5f5f0] sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="border border-white/18 bg-[radial-gradient(circle_at_80%_20%,rgba(143,199,221,0.16),transparent_28%),linear-gradient(135deg,#111820_0%,#080b0d_100%)] p-6 shadow-[rgba(0,0,0,0.24)_3px_5px_30px_0px] sm:p-8">
          <div className="mb-14 flex items-center justify-between border-b border-white/14 pb-4 font-mono text-xs uppercase tracking-[0.22em] text-white/42">
            <span>Portfolio Macintosh / shutdown</span>
            <span>© 2026 Ko Yamasaki</span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.28em] text-[#8fc7dd]">Contact</p>
              <h2 className="max-w-4xl font-display text-6xl font-semibold leading-[0.94] tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
                Let&apos;s build something interesting.
              </h2>
            </div>

            <div className="lg:justify-self-end">
              <div className="mb-6 border border-white/18 bg-black/24 p-4 font-mono text-sm leading-7 text-white/58">
                <p>{">"} status: available for ideas</p>
                <p>{">"} focus: location / graph / app / web</p>
                <p>{">"} route: Hiroshima → internet</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    aria-label={link.label}
                    className="inline-flex items-center gap-2 border border-white/24 bg-white px-5 py-3 font-mono text-sm font-bold text-black shadow-[4px_4px_0_rgba(143,199,221,0.28)] transition hover:-translate-y-0.5 hover:bg-[#d9f7ff]"
                  >
                    {link.icon === "github" ? (
                      <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.35 6.84 9.71.5.09.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.51.47-3.16-.63-3.36-1.21-.11-.3-.6-1.22-1.03-1.47-.35-.19-.85-.66-.01-.67.79-.01 1.35.74 1.54 1.05.9 1.55 2.34 1.11 2.91.85.09-.67.35-1.11.64-1.37-2.22-.26-4.55-1.14-4.55-5.05 0-1.11.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.28 9.28 0 0 1 12 6.96c.85 0 1.7.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.79-4.57 5.05.36.32.68.93.68 1.89 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.08 10.08 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : null}
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap justify-between gap-4 border-t border-white/14 pt-4 font-mono text-xs uppercase tracking-[0.18em] text-white/34">
            <span>soft x-ray baggage / desktop portfolio</span>
            <span>built with Next.js / Three.js</span>
          </div>
        </div>
      </div>
    </section>
  );
}
