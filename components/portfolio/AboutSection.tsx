const focusItems = [
  { label: "AI / Machine Learning", code: "ml.pipeline.train()" },
  { label: "Graph data / GNN", code: "graph.query(nodes, edges)" },
  { label: "iOS app development", code: "swiftui.render(app)" },
  { label: "Web design / landing pages", code: "next.deploy()" },
  { label: "Location-based systems", code: "gps.capture(cells)" },
];

export function AboutSection() {
  return (
    <section className="bg-[#f5f5f7] px-6 py-32 text-[#1d1d1f] sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
        <div>
          <p className="mb-4 text-sm font-medium tracking-[-0.01em] text-black/48">About</p>
          <h2 className="font-display text-5xl font-semibold leading-[1.07] tracking-[-0.04em] sm:text-6xl">
            Ko Yamasaki
          </h2>
          <p className="mt-6 max-w-xl text-xl leading-[1.45] tracking-[-0.02em] text-black/68 sm:text-2xl">
            Computer Science student interested in AI, graph data, app development, and location-based products.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl bg-[#0b0f12] shadow-[rgba(0,0,0,0.2)_3px_5px_30px_0px]">
          <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs tracking-[-0.01em] text-white/38">portfolio-scan — zsh</span>
          </div>

          <div className="px-5 py-6 font-mono text-[0.78rem] leading-6 text-[#b7e5d1] sm:px-7 sm:py-7 sm:text-sm">
            <p>
              <span className="text-[#6fb6d3]">ko@portfolio</span>
              <span className="text-white/34"> ~/baggage </span>
              <span className="text-[#f5f5f7]">$ ./scan_identity</span>
            </p>
            <pre className="mt-5 overflow-x-auto text-[#8fc7dd]">
{`+------------------------------------------------+
| KO YAMASAKI                                    |
| COMPUTER SCIENCE / AI / APP DEVELOPMENT        |
+----------------------+-------------------------+
| location systems     | graph data              |
| product prototyping  | interactive interfaces  |
+----------------------+-------------------------+`}
            </pre>
            <div className="mt-6 space-y-2">
              {focusItems.map((item, index) => (
                <div key={item.label} className="grid gap-2 border-t border-white/8 pt-2 sm:grid-cols-[36px_1fr]">
                  <span className="text-white/28">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="text-[#f5f5f7]">{item.code}</p>
                    <p className="text-white/42">// {item.label}</p>
                  </div>
                </div>
              ))}
            </div>
            <pre className="mt-6 overflow-x-auto text-[#6fb6d3]">
{`route: Hiroshima -> web -> iOS -> graph AI
status: building products around movement + data`}
            </pre>
            <p className="mt-5 text-white/38">
              <span className="text-[#b7e5d1]">scan complete</span> _ cursor ready for next project
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
