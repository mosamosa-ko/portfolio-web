import Image from "next/image";

const projects = [
  {
    title: "Terraplot",
    category: "GPS territory game",
    description:
      "A location-based territory game where walking through real places captures cells on the map and turns movement into play.",
    tags: ["iOS", "SwiftUI", "Firebase", "Mapbox", "GPS"],
    href: "https://terraplot-chi.vercel.app/en",
    image: "/models/ad.png",
  },
  {
    title: "Mappi",
    category: "Location system",
    description: "A system currently under development related to maps and location-based interaction.",
    tags: ["Web", "Map", "Product Development"],
  },
  {
    title: "Portfolio Website",
    category: "Web / Design",
    description: "An interactive portfolio site using 3D and scroll-based storytelling.",
    tags: ["Next.js", "TypeScript", "Three.js", "Tailwind CSS"],
  },
  {
    title: "Graph / AI Research",
    category: "Research",
    description: "Exploring graph algorithms, graph databases, GNNs, and query optimization.",
    tags: ["Python", "Graph", "GNN", "Research"],
  },
];

export function WorksSection() {
  return (
    <section id="works" className="bg-white px-6 py-32 text-[#1d1d1f] sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto mb-16 max-w-[760px] text-center">
          <p className="mb-4 text-sm font-medium tracking-[-0.01em] text-black/48">Works</p>
          <h2 className="font-display text-5xl font-semibold leading-[1.07] tracking-[-0.045em] text-[#1d1d1f] sm:text-6xl">
            Selected Projects
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-[1.47] tracking-[-0.022em] text-black/58">
            Product experiments across location, maps, 3D interfaces, and graph-oriented research.
          </p>
        </div>

        <div className="space-y-5">
          {projects.map((project, index) => {
            const isFeatured = Boolean(project.image);
            const projectImage = project.image ?? "";
            const projectHref = project.href ?? "#";

            return (
              <article
                key={project.title}
                className={
                  isFeatured
                    ? "group overflow-hidden rounded-xl bg-[#f5f5f7] p-6 text-center shadow-[rgba(0,0,0,0.12)_3px_5px_30px_0px] sm:p-10"
                    : "group rounded-xl bg-[#f5f5f7] p-7 sm:p-9"
                }
              >
                {isFeatured ? (
                  <>
                    <p className="mb-3 text-sm font-medium tracking-[-0.01em] text-black/48">
                      {String(index + 1).padStart(2, "0")} / {project.category}
                    </p>
                    <a href={projectHref} target="_blank" rel="noreferrer" className="inline-block">
                      <h3 className="font-display text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-[#1d1d1f] transition duration-300 group-hover:opacity-80 sm:text-6xl">
                        {project.title}
                      </h3>
                    </a>
                    <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-[1.47] tracking-[-0.022em] text-black/62">
                      {project.description}
                    </p>
                    <div className="mt-6 flex justify-center gap-3">
                      <a
                        href={projectHref}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-[#0071e3] px-5 py-2 text-[17px] leading-none tracking-[-0.01em] text-white transition hover:bg-[#0077ed]"
                      >
                        View Terraplot
                      </a>
                    </div>
                    <a
                      href={projectHref}
                      target="_blank"
                      rel="noreferrer"
                      className="mx-auto mt-9 block max-w-4xl overflow-hidden rounded-xl bg-white shadow-[rgba(0,0,0,0.14)_3px_5px_30px_0px]"
                    >
                    <Image
                      src={projectImage}
                      alt="Terraplot app preview"
                      width={1200}
                      height={720}
                      className="h-auto w-full transition duration-500 group-hover:scale-[1.015]"
                      priority={false}
                    />
                    </a>
                    <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-sm tracking-[-0.01em] text-black/44">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="grid gap-6 md:grid-cols-[80px_1fr_1.1fr] md:items-center">
                    <span className="text-sm font-medium tracking-[-0.01em] text-black/36">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-3xl font-semibold leading-[1.1] tracking-[-0.035em] text-[#1d1d1f] sm:text-4xl">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm tracking-[-0.01em] text-black/48">{project.category}</p>
                    </div>
                    <div>
                      <p className="text-[17px] leading-[1.47] tracking-[-0.022em] text-black/58">
                        {project.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-sm tracking-[-0.01em] text-black/42">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
