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
  { id: "projects", label: "Projects", title: "Projects", x: 188, y: 60, width: 560, color: "#ffe08a" },
  { id: "terraplot", label: "TerraPlot", title: "TerraPlot", x: 260, y: 112, width: 640, color: "#9fd3e6" },
  { id: "about", label: "About", title: "About Ko", x: 340, y: 86, width: 470, color: "#f7b6c2" },
  { id: "skills", label: "Skills", title: "Skills", x: 430, y: 150, width: 470, color: "#b9ddb3" },
  { id: "contact", label: "Contact", title: "Contact", x: 520, y: 108, width: 420, color: "#c7b8ea" },
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

function FolderIcon({ active = false, color = "#ffffff" }: { active?: boolean; color?: string }) {
  return (
    <span className="relative mx-auto block h-12 w-16">
      <span className="absolute left-1 top-1 h-3 w-7 border border-black" style={{ backgroundColor: active ? "#000000" : color }} />
      <span className="absolute bottom-0 left-0 h-9 w-16 border border-black" style={{ backgroundColor: active ? "#000000" : color }} />
    </span>
  );
}

function RetroMacDesktop() {
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

  const renderWindowContent = (id: string) => {
    if (id === "projects") {
      return (
        <div className="space-y-3">
          {projects.map((project) => (
            <button
              key={project.title}
              type="button"
              onClick={() => (project.title === "Terraplot" ? openWindow("terraplot") : undefined)}
              className="grid w-full grid-cols-[42px_1fr] gap-3 border border-black bg-white p-3 text-left font-mono text-sm text-black shadow-[2px_2px_0_rgba(0,0,0,0.14)] transition hover:bg-black hover:text-white"
            >
              <span>{project.code}</span>
              <span>
                <span className="block font-bold">{project.title}</span>
                <span className="block text-xs opacity-70">{project.category}</span>
              </span>
            </button>
          ))}
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

    return (
      <div className="space-y-3 font-mono text-sm text-black">
        <a href="https://github.com/mosamosa-ko" target="_blank" rel="noreferrer" className="block border border-black bg-white p-3 hover:bg-black hover:text-white">
          GitHub / mosamosa-ko
        </a>
        <p className="text-black/60">Contact links can be added here.</p>
      </div>
    );
  };

  return (
    <div className="mb-20 cursor-default overflow-hidden border border-black bg-[#aeb8c6] p-2 shadow-[rgba(0,0,0,0.16)_3px_5px_30px_0px]">
      <div className="flex h-8 items-center justify-between border border-black bg-[#f8f2d8] px-3 font-mono text-[0.72rem] text-black">
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
        className="relative min-h-[780px] overflow-hidden border-x border-b border-black bg-[#b9c7d8] bg-[radial-gradient(circle_at_18%_18%,rgba(255,224,138,0.55),transparent_22%),radial-gradient(circle_at_82%_24%,rgba(159,211,230,0.5),transparent_24%),radial-gradient(circle_at_68%_84%,rgba(247,182,194,0.46),transparent_25%),linear-gradient(45deg,rgba(255,255,255,0.22)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.22)_75%),linear-gradient(45deg,rgba(255,255,255,0.22)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.22)_75%)] bg-[length:auto,auto,auto,4px_4px,4px_4px] bg-[position:center,center,center,0_0,2px_2px] p-6"
      >
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
                <FolderIcon color={app.color} />
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
              className={`absolute border border-black bg-[#f2f2f2] shadow-[5px_5px_0_rgba(0,0,0,0.22)] ${
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
                className="flex h-8 cursor-move items-center border-b border-black"
                style={{ backgroundColor: windowItem.color }}
              >
                <button
                  type="button"
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={(event) => {
                    event.stopPropagation();
                    closeWindow(windowItem.id);
                  }}
                  className="mx-2 h-4 w-4 border border-black bg-white text-[0.55rem] leading-none hover:bg-black hover:text-white"
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
                  className="mx-2 h-4 w-4 border border-black bg-white text-[0.55rem] leading-none hover:bg-black hover:text-white"
                  aria-label={`${windowItem.expanded ? "Restore" : "Expand"} ${windowItem.title}`}
                >
                  {windowItem.expanded ? "□" : "+"}
                </button>
              </div>
              <div className={windowItem.expanded ? "min-h-[560px] p-6" : "min-h-[250px] p-5"}>{renderWindowContent(windowItem.id)}</div>
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
    <section id="works" className="bg-white px-6 py-32 text-[#1d1d1f] sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="mx-auto mb-16 max-w-[760px] text-center">
          <p className="mb-4 text-sm font-medium tracking-[-0.01em] text-black/48">Works</p>
          <h2 className="font-display text-5xl font-semibold leading-[1.07] tracking-[-0.045em] text-[#1d1d1f] sm:text-6xl">
            Selected Projects
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-[1.47] tracking-[-0.022em] text-black/58">
            Product experiments across location, maps, 3D interfaces, and graph-oriented research.
          </p>
        </div>

        <RetroMacDesktop />
      </div>
    </section>
  );
}
