const links = [
  { label: "GitHub", href: "https://github.com/mosamosa-ko", icon: "github" },
  { label: "Email", href: "mailto:hello@example.com" },
];

export function ContactSection() {
  return (
    <section className="bg-white px-6 py-32 text-[#1d1d1f] sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[980px] text-center">
        <p className="mb-4 text-sm font-medium tracking-[-0.01em] text-black/48">Contact</p>
        <div className="flex flex-col items-center gap-8">
          <h2 className="max-w-3xl font-display text-5xl font-semibold leading-[1.07] tracking-[-0.045em] sm:text-6xl">
            Let&apos;s build something interesting.
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={link.label}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-[17px] leading-none tracking-[-0.01em] transition ${
                  link.icon === "github"
                    ? "bg-[#1d1d1f] text-white hover:bg-black"
                    : "border border-[#0066cc] text-[#0066cc] hover:underline"
                }`}
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
    </section>
  );
}
