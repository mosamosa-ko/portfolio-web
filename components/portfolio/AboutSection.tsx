const focusItems = [
  "AI / Machine Learning",
  "Graph data / GNN",
  "iOS app development",
  "Web design / landing pages",
  "Location-based systems",
];

export function AboutSection() {
  return (
    <section className="bg-[#f5f5f7] px-6 py-32 text-[#1d1d1f] sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[980px]">
        <div className="text-center">
          <p className="mb-4 text-sm font-medium tracking-[-0.01em] text-black/48">About</p>
          <h2 className="font-display text-5xl font-semibold leading-[1.07] tracking-[-0.04em] sm:text-6xl">
            Ko Yamasaki
          </h2>
        </div>
        <div className="mx-auto mt-8 max-w-3xl text-center">
          <p className="text-xl leading-[1.45] tracking-[-0.02em] text-black/72 sm:text-2xl">
            Computer Science student interested in AI, graph data, app development, and location-based products.
          </p>
          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            {focusItems.map((item) => (
              <div key={item} className="rounded-xl bg-white px-5 py-4 text-sm font-medium tracking-[-0.01em] text-black/68 shadow-[rgba(0,0,0,0.08)_0_8px_30px]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
