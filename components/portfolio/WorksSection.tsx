"use client";

import Image from "next/image";
import type { PointerEvent } from "react";
import { useState } from "react";

const projects = [
  {
    code: "01",
    title: "Terraplot",
    category: "GPS territory game",
    description:
      "A location-based territory game where walking through real places captures cells on the map and turns movement into play.",
    tags: ["iOS", "SwiftUI", "Firebase", "Mapbox", "GPS"],
    href: "https://terraplot-chi.vercel.app/en",
    image: "/models/ad.png",
  },
  {
    code: "02",
    title: "Mappi",
    category: "Location system",
    description: "A system currently under development related to maps and location-based interaction.",
    tags: ["Web", "Map", "Product Development"],
  },
  {
    code: "03",
    title: "Portfolio Website",
    category: "Web / Design",
    description: "An interactive portfolio site using 3D and scroll-based storytelling.",
    tags: ["Next.js", "TypeScript", "Three.js", "Tailwind CSS"],
  },
  {
    code: "04",
    title: "Graph / AI Research",
    category: "Research",
    description: "Exploring graph algorithms, graph databases, GNNs, and query optimization.",
    tags: ["Python", "Graph", "GNN", "Research"],
  },
];

const desktopApps = [
  { id: "projects", label: "Projects", title: "Projects", x: 188, y: 60, width: 560, color: "#edf3f6" },
  { id: "terraplot", label: "TerraPlot", title: "TerraPlot", x: 260, y: 112, width: 640, color: "#9fd3e6" },
  { id: "about", label: "About", title: "About Ko", x: 340, y: 86, width: 470, color: "#eef7fa" },
  { id: "skills", label: "Skills", title: "Skills", x: 430, y: 150, width: 470, color: "#e8f4f8" },
  { id: "contact", label: "Contact", title: "Contact", x: 520, y: 108, width: 420, color: "#f2fafc" },
  { id: "profiler", label: "System Profiler", title: "About This Portfolio", x: 632, y: 62, width: 520, color: "#dceff7" },
  { id: "search", label: "Finder Search", title: "Find Projects", x: 664, y: 178, width: 540, color: "#eef4f6" },
  { id: "floppy", label: "Save Contact", title: "Contact Card Saved", x: 704, y: 282, width: 440, color: "#e6f5fa" },
  { id: "startup", label: "Startup Disk", title: "Startup Disk", x: 250, y: 334, width: 500, color: "#edf7fa" },
  { id: "trash", label: "Trash", title: "discarded ideas.txt", x: 70, y: 608, width: 520, color: "#f6fbfd" },
];

type DesktopApp = (typeof desktopApps)[number];
type WindowState = DesktopApp & {
  open: boolean;
  z: number;
  expanded: boolean;
};
type DragState = {
  id: string;
  offsetX: number;
  offsetY: number;
};

type WindowContentProps = {
  id: string;
  openWindow: (id: string) => void;
};

function FolderIcon({ active = false, color = "#ffffff" }: { active?: boolean; color?: string }) {
  return (
    <span className="relative mx-auto block h-12 w-16">
      <span className="absolute left-1 top-1 h-3 w-7 border border-black" style={{ backgroundColor: active ? "#000000" : color }} />
      <span className="absolute bottom-0 left-0 h-9 w-16 border border-black" style={{ backgroundColor: active ? "#000000" : color }} />
    </span>
  );
}

function DesktopIcon({ app, active = false }: { app: DesktopApp; active?: boolean }) {
  if (app.id === "trash") {
    return (
      <span className="mx-auto block h-14 w-14 border border-black bg-[#f6f6f6] p-1 shadow-[2px_2px_0_rgba(0,0,0,0.14)]">
        <span className="block h-2 border-b border-black bg-white" />
        <span className="mt-1 grid h-9 grid-cols-4 gap-px">
          {Array.from({ length: 16 }).map((_, index) => (
            <span key={index} className={index % 2 === 0 ? "bg-black/12" : "bg-black/4"} />
          ))}
        </span>
      </span>
    );
  }

  if (app.id === "floppy" || app.id === "startup") {
    return (
      <span className="mx-auto block h-14 w-14 border border-black p-1 shadow-[2px_2px_0_rgba(0,0,0,0.14)]" style={{ backgroundColor: active ? "#000000" : app.color }}>
        <span className="block h-4 border border-black bg-white" />
        <span className="mt-2 block h-5 border border-black bg-white/80" />
      </span>
    );
  }

  return <FolderIcon active={active} color={app.color} />;
}

function FinderSearchContent({ openWindow }: { openWindow: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const results = projects.filter((project) => {
    if (!normalizedQuery) return true;
    return `${project.title} ${project.category} ${project.description} ${project.tags.join(" ")}`.toLowerCase().includes(normalizedQuery);
  });

  return (
    <div className="font-mono text-sm text-black">
      <label htmlFor="finder-search" className="text-xs uppercase tracking-[0.16em] text-black/46">
        Search portfolio files
      </label>
      <input
        id="finder-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="try: gps, graph, web, ios"
        className="mt-2 w-full border border-black bg-white px-3 py-2 outline-none"
      />
      <div className="mt-4 space-y-2">
        {results.map((project) => (
          <button
            key={project.title}
            type="button"
            onClick={() => (project.title === "Terraplot" ? openWindow("terraplot") : undefined)}
            className="grid w-full grid-cols-[34px_1fr] gap-3 border border-black bg-white p-3 text-left hover:bg-black hover:text-white"
          >
            <span>{project.code}</span>
            <span>
              <span className="block font-bold">{project.title}</span>
              <span className="block text-xs opacity-70">{project.category}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProjectSignalVisual({ project }: { project: (typeof projects)[number] }) {
  if (project.title === "Terraplot") {
    return (
      <div className="border border-[#8fc7dd]/42 bg-[#f8fcfd] p-3">
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 35 }).map((_, index) => {
            const captured = [2, 3, 9, 10, 11, 16, 17, 18, 24, 25].includes(index);
            const current = index === 17;
            return (
              <span
                key={index}
                className={`aspect-square border border-[#8fc7dd]/28 ${current ? "bg-[#2f718a]" : captured ? "bg-[#9fd3e6]" : "bg-white"}`}
              />
            );
          })}
        </div>
        <div className="mt-3 flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.12em] text-black/50">
          <span>gps cells</span>
          <span>territory +42</span>
        </div>
      </div>
    );
  }

  if (project.title === "Mappi") {
    return (
      <div className="relative h-36 overflow-hidden border border-[#8fc7dd]/42 bg-[#f8fcfd]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.08)_1px,transparent_1px)] bg-[length:28px_28px]" />
        <div className="absolute left-8 top-9 h-14 w-24 rounded-full border border-[#5f9fba]/42" />
        <div className="absolute left-20 top-12 h-20 w-28 rounded-full border border-[#5f9fba]/30" />
        <div className="absolute left-[46%] top-[42%] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#5f9fba]/60 bg-[#9fd3e6]" />
        <div className="absolute bottom-3 left-3 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-black/50">location layer</div>
      </div>
    );
  }

  if (project.title === "Portfolio Website") {
    return (
      <div className="border border-[#8fc7dd]/42 bg-[#f8fcfd] p-3">
        <div className="border border-[#8fc7dd]/42 bg-white">
          <div className="flex h-6 items-center gap-1 border-b border-[#8fc7dd]/36 px-2">
            <span className="h-2 w-2 rounded-full bg-[#8fc7dd]" />
            <span className="h-2 w-2 rounded-full bg-[#b7d6e2]" />
            <span className="h-2 w-2 rounded-full bg-[#dceff7]" />
          </div>
          <div className="grid gap-2 p-3">
            <span className="h-7 w-3/4 bg-[#dcebf1]" />
            <span className="h-3 w-full bg-black/10" />
            <span className="h-3 w-2/3 bg-black/10" />
            <div className="mt-2 grid grid-cols-3 gap-2">
              <span className="h-10 bg-[#eef4f6]" />
              <span className="h-10 bg-[#eef4f6]" />
              <span className="h-10 bg-[#eef4f6]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-36 overflow-hidden border border-[#8fc7dd]/42 bg-[#f8fcfd]">
      {[
        [28, 42],
        [78, 28],
        [118, 74],
        [54, 102],
        [144, 112],
      ].map(([left, top], index) => (
        <span key={`${left}-${top}`} className="absolute h-5 w-5 rounded-full border border-[#5f9fba]/42 bg-[#dcebf1]" style={{ left, top }} />
      ))}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 190 144" aria-hidden="true">
        <path d="M38 52 88 38 128 84 64 112 154 122 128 84 88 38" fill="none" stroke="rgba(0,0,0,0.45)" strokeWidth="1" />
      </svg>
      <div className="absolute bottom-3 left-3 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-black/50">node / edge field</div>
    </div>
  );
}

function WindowContent({ id, openWindow }: WindowContentProps) {
  if (id === "projects") {
    const mainProject = projects[0];

    return (
      <div className="grid gap-5 font-mono text-black lg:grid-cols-[1fr_0.95fr]">
        <div className="border border-[#8fc7dd]/42 bg-white">
          <div className="grid grid-cols-[44px_1.2fr_1fr] border-b border-[#8fc7dd]/32 bg-[#f4fbfd] px-3 py-2 text-[0.64rem] uppercase tracking-[0.14em] text-black/42">
            <span>ID</span>
            <span>Project</span>
            <span>Signal</span>
          </div>
          {projects.map((project) => (
            <button
              key={project.title}
              type="button"
              onClick={() => (project.title === "Terraplot" ? openWindow("terraplot") : undefined)}
              className="grid w-full grid-cols-[44px_1.2fr_1fr] items-start border-b border-[#8fc7dd]/22 px-3 py-4 text-left transition last:border-b-0 hover:bg-[#f4fbfd]"
            >
              <span className="text-xs text-black/38">{project.code}</span>
              <span>
                <span className="block text-base font-bold tracking-[-0.04em]">{project.title}</span>
                <span className="mt-1 block text-[0.66rem] uppercase tracking-[0.12em] text-black/42">{project.category}</span>
              </span>
              <span className="text-xs leading-5 text-black/56">{project.tags.join(" / ")}</span>
            </button>
          ))}
        </div>

        <div className="border border-[#8fc7dd]/42 bg-[#f8fcfd] p-4">
          <div className="grid gap-4 sm:grid-cols-[0.85fr_1fr] lg:grid-cols-1">
            <ProjectSignalVisual project={mainProject} />
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-black/42">Selected file</p>
              <h3 className="mt-2 text-3xl font-bold tracking-[-0.07em]">{mainProject.title}</h3>
              <p className="mt-3 text-sm leading-6 text-black/62">{mainProject.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {mainProject.tags.map((tag) => (
                  <span key={tag} className="border border-[#8fc7dd]/36 bg-white px-2.5 py-1 text-[0.66rem] uppercase tracking-[0.1em] text-black/46">
                    {tag}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => openWindow("terraplot")}
                className="mt-5 border border-[#5f9fba]/45 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#2f718a] transition hover:bg-[#eef7fa]"
              >
                Open Terraplot file
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (id === "terraplot") {
    const terraplot = projects[0];

    return (
      <div className="grid gap-4 lg:grid-cols-[0.88fr_1.12fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-black/48">{terraplot.category}</p>
          <h3 className="mt-3 font-mono text-3xl font-bold tracking-[-0.06em] text-black">{terraplot.title}</h3>
          <p className="mt-4 font-mono text-sm leading-6 text-black/68">{terraplot.description}</p>
          <a
            href={terraplot.href}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex border border-black bg-white px-4 py-2 font-mono text-sm font-bold text-black shadow-[2px_2px_0_rgba(0,0,0,0.18)] hover:bg-black hover:text-white"
          >
            Open TerraPlot
          </a>
        </div>
        <div className="border border-black bg-white p-2">
          <Image src="/models/ad.png" alt="Terraplot app preview" width={900} height={540} className="h-auto w-full" />
          <p className="mt-2 text-right font-mono text-[10px] uppercase tracking-[0.18em] text-black/35">
            Concept visual
          </p>
        </div>
      </div>
    );
  }

  if (id === "about") {
    return (
      <div className="font-mono text-sm leading-7 text-black/72">
        <p className="font-bold text-black">Ko Yamasaki</p>
        <p>Computer Science student interested in AI, graph data, app development, and location-based products.</p>
        <p className="mt-4">Base: Hiroshima</p>
        <p>Focus: AI / Graph / App Development</p>
      </div>
    );
  }

  if (id === "skills") {
    return (
      <div className="flex flex-wrap gap-2">
        {["TypeScript", "Next.js", "React Three Fiber", "SwiftUI", "Firebase", "Python", "Graph / GNN", "Mapbox"].map((skill) => (
          <span key={skill} className="border border-black bg-white px-3 py-2 font-mono text-sm text-black shadow-[2px_2px_0_rgba(0,0,0,0.14)]">
            {skill}
          </span>
        ))}
      </div>
    );
  }

  if (id === "profiler") {
    return (
      <div className="font-mono text-sm text-black">
        <div className="grid gap-3 border border-black bg-white p-4 shadow-[2px_2px_0_rgba(0,0,0,0.14)] sm:grid-cols-[130px_1fr]">
          <div className="mx-auto grid h-24 w-24 place-items-center border border-black bg-[#d6e8ff] text-4xl">●</div>
          <div className="space-y-1">
            <p className="font-bold">Ko Yamasaki Portfolio</p>
            <p>System: Computer Science / AI / App Development</p>
            <p>Memory: maps, graph data, interactive systems</p>
            <p>Location: Hiroshima</p>
            <p>Status: Building products</p>
          </div>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {["Next.js", "TypeScript", "SwiftUI", "Firebase", "Python", "Graph / GNN"].map((item) => (
            <span key={item} className="border border-black bg-white px-3 py-2">
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (id === "search") {
    return <FinderSearchContent openWindow={openWindow} />;
  }

  if (id === "floppy") {
    return (
      <div className="font-mono text-sm text-black">
        <div className="mx-auto max-w-sm border border-black bg-white p-5 shadow-[4px_4px_0_rgba(0,0,0,0.16)]">
          <p className="text-xs uppercase tracking-[0.18em] text-black/42">saved contact card</p>
          <p className="mt-4 text-2xl font-bold tracking-[-0.05em]">Ko Yamasaki</p>
          <p className="mt-2 text-black/62">Computer Science / AI / App Development</p>
          <div className="mt-5 space-y-2 border-t border-black pt-4">
            <a href="https://github.com/mosamosa-ko" target="_blank" rel="noreferrer" className="block hover:underline">
              github.com/mosamosa-ko
            </a>
            <a href="mailto:hello@example.com" className="block hover:underline">
              hello@example.com
            </a>
          </div>
        </div>
        <p className="mt-4 text-center text-xs uppercase tracking-[0.16em] text-black/42">contact.vcf saved to desktop</p>
      </div>
    );
  }

  if (id === "startup") {
    return (
      <div className="grid min-h-[260px] place-items-center bg-white p-6 font-mono text-black">
        <div className="text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center border border-black bg-[#e8eef4] text-4xl shadow-[3px_3px_0_rgba(0,0,0,0.16)]">☺</div>
          <p className="mt-6 text-xl font-bold tracking-[-0.04em]">Thanks for visiting.</p>
          <p className="mt-2 text-sm text-black/58">Restart anytime. New projects will be added here.</p>
        </div>
      </div>
    );
  }

  if (id === "trash") {
    return (
      <div className="space-y-3 font-mono text-sm leading-6 text-black">
        <p className="font-bold">discarded ideas.txt</p>
        <p>01. overcomplicated scanner dashboard - deleted</p>
        <p>02. too much neon - deleted</p>
        <p>03. flight ticket section - archived</p>
        <p>04. making every section interactive - maybe later</p>
        <p className="border-t border-black pt-3 text-black/58">
          The current rule: keep the playful parts useful, readable, and easy to ignore.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 font-mono text-sm text-black">
      <a href="https://github.com/mosamosa-ko" target="_blank" rel="noreferrer" className="block border border-black bg-white p-3 hover:bg-black hover:text-white">
        GitHub / mosamosa-ko
      </a>
      <p className="text-black/60">Contact links can be added here.</p>
    </div>
  );
}

function MobileRetroMacDesktop() {
  const [activeApp, setActiveApp] = useState("projects");
  const [bootVisible, setBootVisible] = useState(true);
  const selectedApp = desktopApps.find((app) => app.id === activeApp) ?? desktopApps[0];

  return (
    <div className="mb-16 overflow-hidden border border-[#8fc7dd]/42 bg-[#eef7fa] p-1.5 shadow-[rgba(95,159,186,0.12)_3px_5px_26px_0px] md:hidden">
      <div className="flex h-8 items-center justify-between border border-[#8fc7dd]/36 bg-white px-2 font-mono text-[0.66rem] text-black">
        <span className="font-bold">● File</span>
        <span>Portfolio Macintosh</span>
      </div>

      <div className="relative border-x border-b border-[#8fc7dd]/36 bg-[#f4fbfd] bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.82),transparent_28%),radial-gradient(circle_at_86%_22%,rgba(159,211,230,0.32),transparent_28%),radial-gradient(circle_at_70%_88%,rgba(221,239,246,0.56),transparent_30%)] p-4">
        {bootVisible ? (
          <button
            type="button"
            onClick={() => setBootVisible(false)}
            className="absolute inset-0 z-30 grid place-items-center bg-[#f4fbfd]/96 p-6 font-mono text-black"
            aria-label="Dismiss portfolio desktop boot screen"
          >
            <span className="w-full border border-[#8fc7dd]/42 bg-white p-5 text-center shadow-[4px_4px_0_rgba(95,159,186,0.14)]">
              <span className="mx-auto grid h-16 w-16 place-items-center border border-[#8fc7dd]/42 bg-[#eef7fa] text-3xl">⌘</span>
              <span className="mt-5 block text-lg font-bold tracking-[-0.05em]">Portfolio OS</span>
              <span className="mt-3 block text-xs uppercase leading-5 tracking-[0.12em] text-black/58">
                projects folder ready
                <br />
                tap to open desktop
              </span>
            </span>
          </button>
        ) : null}

        <div className="grid grid-cols-3 gap-x-3 gap-y-5">
          {desktopApps.map((app) => (
            <button key={app.id} type="button" onClick={() => setActiveApp(app.id)} className="text-center font-mono text-[0.68rem] text-black">
              <DesktopIcon app={app} active={activeApp === app.id} />
              <span className={`mt-2 block px-1 ${activeApp === app.id ? "bg-black text-white" : ""}`}>{app.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 border border-[#8fc7dd]/42 bg-[#fbfdfe] shadow-[4px_4px_0_rgba(95,159,186,0.14)]">
          <div className="flex h-8 items-center border-b border-[#8fc7dd]/36" style={{ backgroundColor: selectedApp.color }}>
            <span className="mx-2 h-4 w-4 border border-[#8fc7dd]/42 bg-white" />
            <div className="h-[13px] flex-1 bg-[repeating-linear-gradient(to_bottom,#000_0,#000_1px,transparent_1px,transparent_3px)] opacity-70" />
            <span className="mx-3 font-mono text-xs">{selectedApp.title}</span>
            <div className="h-[13px] flex-1 bg-[repeating-linear-gradient(to_bottom,#000_0,#000_1px,transparent_1px,transparent_3px)] opacity-70" />
          </div>
          <div className="max-h-[72vh] overflow-y-auto p-4">
            <WindowContent id={activeApp} openWindow={setActiveApp} />
          </div>
        </div>
      </div>
    </div>
  );
}

function RetroMacDesktop() {
  const [bootVisible, setBootVisible] = useState(true);
  const [windows, setWindows] = useState<WindowState[]>(() =>
    desktopApps.map((app, index) => ({
      ...app,
      open: app.id === "projects",
      z: index + 1,
      expanded: false,
    })),
  );
  const [dragging, setDragging] = useState<DragState | null>(null);

  const focusWindow = (id: string) => {
    setWindows((current) => {
      const maxZ = Math.max(...current.map((windowItem) => windowItem.z));

      return current.map((windowItem) => (windowItem.id === id ? { ...windowItem, z: maxZ + 1 } : windowItem));
    });
  };

  const openWindow = (id: string) => {
    setWindows((current) => {
      const maxZ = Math.max(...current.map((windowItem) => windowItem.z));

      return current.map((windowItem) => (windowItem.id === id ? { ...windowItem, open: true, z: maxZ + 1 } : windowItem));
    });
  };

  const closeWindow = (id: string) => {
    setWindows((current) => current.map((windowItem) => (windowItem.id === id ? { ...windowItem, open: false } : windowItem)));
  };

  const toggleExpandWindow = (id: string) => {
    setWindows((current) => {
      const maxZ = Math.max(...current.map((windowItem) => windowItem.z));

      return current.map((windowItem) =>
        windowItem.id === id
          ? {
              ...windowItem,
              expanded: !windowItem.expanded,
              z: maxZ + 1,
            }
          : windowItem,
      );
    });
  };

  const startDrag = (event: PointerEvent<HTMLDivElement>, windowItem: WindowState) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    focusWindow(windowItem.id);
    setDragging({
      id: windowItem.id,
      offsetX: event.clientX - windowItem.x,
      offsetY: event.clientY - windowItem.y,
    });
  };

  const dragWindow = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;

    setWindows((current) =>
      current.map((windowItem) =>
        windowItem.id === dragging.id
          ? {
              ...windowItem,
              x: Math.max(148, Math.min(760, event.clientX - dragging.offsetX)),
              y: Math.max(42, Math.min(360, event.clientY - dragging.offsetY)),
            }
          : windowItem,
      ),
    );
  };

  return (
    <div className="mb-20 hidden cursor-default overflow-hidden border border-[#8fc7dd]/42 bg-[#eef7fa] p-2 shadow-[rgba(95,159,186,0.14)_3px_5px_30px_0px] md:block">
      <div className="flex h-8 items-center justify-between border border-[#8fc7dd]/36 bg-white px-3 font-mono text-[0.72rem] text-black">
        <div className="flex items-center gap-4">
          <span className="font-bold">●</span>
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Special</span>
        </div>
        <span>Portfolio Macintosh</span>
      </div>

      <div
        onPointerMove={dragWindow}
        onPointerUp={() => setDragging(null)}
        onPointerCancel={() => setDragging(null)}
        className="relative min-h-[780px] overflow-hidden border-x border-b border-[#8fc7dd]/36 bg-[#f4fbfd] bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.82),transparent_22%),radial-gradient(circle_at_82%_24%,rgba(159,211,230,0.34),transparent_24%),radial-gradient(circle_at_68%_84%,rgba(221,239,246,0.58),transparent_25%),linear-gradient(45deg,rgba(143,199,221,0.1)_25%,transparent_25%,transparent_75%,rgba(143,199,221,0.1)_75%),linear-gradient(45deg,rgba(143,199,221,0.1)_25%,transparent_25%,transparent_75%,rgba(143,199,221,0.1)_75%)] bg-[length:auto,auto,auto,4px_4px,4px_4px] bg-[position:center,center,center,0_0,2px_2px] p-6"
      >
        {bootVisible ? (
          <button
            type="button"
            onClick={() => setBootVisible(false)}
            className="absolute inset-0 z-[9999] grid cursor-pointer place-items-center bg-[#f4fbfd]/96 font-mono text-black backdrop-blur-[1px]"
            aria-label="Dismiss portfolio desktop boot screen"
          >
            <span className="w-[420px] max-w-[80%] border border-[#8fc7dd]/42 bg-white p-6 text-center shadow-[6px_6px_0_rgba(95,159,186,0.14)]">
              <span className="mx-auto grid h-20 w-20 place-items-center border border-[#8fc7dd]/42 bg-[#eef7fa] text-4xl shadow-[3px_3px_0_rgba(95,159,186,0.14)]">⌘</span>
              <span className="mt-6 block text-xl font-bold tracking-[-0.05em]">Welcome to Portfolio OS</span>
              <span className="mt-4 block text-left text-xs uppercase leading-6 tracking-[0.12em] text-black/58">
                loading desktop files...
                <br />
                mounting projects folder...
                <br />
                ready for inspection.
              </span>
              <span className="mt-5 block border border-[#8fc7dd]/42 bg-[#f8fcfd] px-4 py-2 text-xs uppercase tracking-[0.16em]">
                click to continue
              </span>
            </span>
          </button>
        ) : null}

        <div className="grid w-32 gap-6">
          {desktopApps.map((app) => {
            return (
              <button
                key={app.id}
                type="button"
                onClick={() => openWindow(app.id)}
                onDoubleClick={() => openWindow(app.id)}
                className="group text-center font-mono text-xs text-black"
              >
                <DesktopIcon app={app} />
                <span className="mt-2 block px-1 group-hover:bg-black group-hover:text-white">{app.label}</span>
              </button>
            );
          })}
        </div>

        {windows
          .filter((windowItem) => windowItem.open)
          .map((windowItem) => (
            <div
              key={windowItem.id}
              onPointerDown={() => focusWindow(windowItem.id)}
            className={`absolute border border-[#8fc7dd]/42 bg-[#fbfdfe] shadow-[5px_5px_0_rgba(95,159,186,0.16)] ${
                windowItem.expanded ? "overflow-hidden" : "resize overflow-auto"
              }`}
              style={{
                left: windowItem.expanded ? 170 : windowItem.x,
                top: windowItem.expanded ? 36 : windowItem.y,
                width: windowItem.expanded ? "calc(100% - 190px)" : windowItem.width,
                minWidth: windowItem.expanded ? undefined : 320,
                minHeight: windowItem.expanded ? undefined : 220,
                maxWidth: "calc(100% - 180px)",
                maxHeight: "660px",
                zIndex: windowItem.z,
              }}
            >
              <div
                onPointerDown={(event) => startDrag(event, windowItem)}
                className="flex h-8 touch-none cursor-move items-center border-b border-[#8fc7dd]/36"
                style={{ backgroundColor: windowItem.color }}
              >
                <button
                  type="button"
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={(event) => {
                    event.stopPropagation();
                    closeWindow(windowItem.id);
                  }}
                  className="mx-2 h-4 w-4 border border-[#8fc7dd]/42 bg-white text-[0.55rem] leading-none hover:bg-[#8fc7dd]/18"
                  aria-label={`Close ${windowItem.title}`}
                >
                  ×
                </button>
                <div className="h-[13px] flex-1 bg-[repeating-linear-gradient(to_bottom,#000_0,#000_1px,transparent_1px,transparent_3px)] opacity-70" />
                <span className="mx-3 font-mono text-xs">{windowItem.title}</span>
                <div className="h-[13px] flex-1 bg-[repeating-linear-gradient(to_bottom,#000_0,#000_1px,transparent_1px,transparent_3px)] opacity-70" />
                <button
                  type="button"
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleExpandWindow(windowItem.id);
                  }}
                  className="mx-2 h-4 w-4 border border-[#8fc7dd]/42 bg-white text-[0.55rem] leading-none hover:bg-[#8fc7dd]/18"
                  aria-label={`${windowItem.expanded ? "Restore" : "Expand"} ${windowItem.title}`}
                >
                  {windowItem.expanded ? "□" : "+"}
                </button>
              </div>
              <div className={windowItem.expanded ? "min-h-[560px] p-6" : "min-h-[250px] p-5"}>
                <WindowContent id={windowItem.id} openWindow={openWindow} />
              </div>
              {!windowItem.expanded ? (
                <div className="pointer-events-none absolute bottom-1 right-1 grid h-4 w-4 grid-cols-3 gap-px opacity-60">
                  {Array.from({ length: 9 }).map((_, index) => (
                    <span key={index} className={index >= 2 && index % 3 <= 2 ? "bg-black/45" : ""} />
                  ))}
                </div>
              ) : null}
            </div>
          ))}

      </div>
    </div>
  );
}

export function WorksSection() {
  return (
    <section id="works" className="overflow-x-hidden bg-white px-5 py-24 text-[#1d1d1f] sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="mx-auto mb-12 max-w-[760px] text-center sm:mb-16">
          <p className="mb-4 text-sm font-medium tracking-[-0.01em] text-black/48">Works</p>
          <h2 className="font-display text-4xl font-semibold leading-[1.07] tracking-[-0.045em] text-[#1d1d1f] sm:text-6xl">
            Selected Projects
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-[1.47] tracking-[-0.022em] text-black/58">
            Product experiments across location, maps, 3D interfaces, and graph-oriented research.
          </p>
        </div>

        <MobileRetroMacDesktop />
        <RetroMacDesktop />
      </div>
    </section>
  );
}
