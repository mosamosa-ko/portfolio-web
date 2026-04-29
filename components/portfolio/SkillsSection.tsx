const skills = [
  "TypeScript",
  "Next.js",
  "React",
  "Tailwind CSS",
  "Three.js",
  "SwiftUI",
  "Firebase",
  "Python",
  "PyTorch",
  "Graph / GNN",
];

const interests = [
  "Graph database",
  "Query optimization",
  "Machine learning",
  "Computer vision",
  "Graph neural networks",
  "Location systems",
];

export function SkillsSection() {
  return (
    <section className="bg-[#f5f5f7] px-6 py-32 text-[#1d1d1f] sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-[1180px] gap-5 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-8 shadow-[rgba(0,0,0,0.08)_3px_5px_30px_0px] sm:p-10">
          <p className="mb-4 text-sm font-medium tracking-[-0.01em] text-black/48">Skills</p>
          <h2 className="font-display text-5xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-6xl">
            Build Stack
          </h2>
          <div className="mt-10 flex flex-wrap gap-x-5 gap-y-3">
            {skills.map((skill) => (
              <span key={skill} className="rounded-full bg-[#f5f5f7] px-4 py-2 text-sm tracking-[-0.01em] text-black/64">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-white p-8 shadow-[rgba(0,0,0,0.08)_3px_5px_30px_0px] sm:p-10">
          <p className="mb-4 text-sm font-medium tracking-[-0.01em] text-black/48">Research Interests</p>
          <div className="divide-y divide-black/10">
            {interests.map((interest, index) => (
              <div key={interest} className="flex items-center justify-between py-5">
                <span className="text-[17px] leading-[1.47] tracking-[-0.022em] text-black/68">{interest}</span>
                <span className="text-xs text-black/30">{String(index + 1).padStart(2, "0")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
