"use client";

export type ScanSection = {
  id: string;
  label: string;
  status: string;
  summary: string;
  detected: string[];
  logs: string[];
};

type SectionOverlayProps = {
  sections: ScanSection[];
  activeIndex: number;
  scanProgress: number;
};

function panelClassName() {
  return "border border-white/12 bg-white/[0.02] px-4 py-4";
}

function badgeClassName(isActive: boolean) {
  return isActive
    ? "border border-[#8e9f8e]/40 bg-[#8e9f8e]/10 text-[#b9c9b8]"
    : "border border-[#9f8d73]/34 bg-[#9f8d73]/8 text-[#b89c7a]";
}

export function SectionOverlay({
  sections,
  activeIndex,
  scanProgress,
}: SectionOverlayProps) {
  const activeSection = sections[activeIndex] ?? sections[0];
  const now = new Date();
  const timeLabel = now.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const labels = [
    {
      title: "TERRAPLOT / GPS TERRITORY GAME",
      body: "Routes, loops, captured cells",
      style: "left-[35%] top-[24%]",
      line: "left-[47%] top-[31%] w-[8%]",
      active: scanProgress > 0.24,
    },
    {
      title: "GRAPH AI / RESEARCH INTEREST",
      body: "GNN, query systems, data",
      style: "left-[60%] top-[23%]",
      line: "left-[56%] top-[31%] w-[8%]",
      active: scanProgress > 0.4,
    },
    {
      title: "APP DEV / IOS & WEB",
      body: "Interface, code, shipping",
      style: "left-[38%] top-[60%]",
      line: "left-[46%] top-[58%] w-[7%]",
      active: scanProgress > 0.52,
    },
    {
      title: "CS STUDENT / HIROSHIMA",
      body: "AI, graph, app focus",
      style: "left-[64%] top-[55%]",
      line: "left-[61%] top-[52%] w-[8%]",
      active: scanProgress > 0.68,
    },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 font-body uppercase tracking-[0.3em] text-white/72">
      <div className="absolute inset-x-[3.8%] top-[4.4%] flex items-center justify-between border-b border-white/16 pb-4 text-[0.58rem]">
        <div className="flex gap-4">
          <span>Security Checkpoint 01</span>
          <span className="text-white/42">Baggage Scan</span>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-2 py-1 text-[0.46rem] ${badgeClassName(activeSection.status === "PORTFOLIO IDENTIFIED")}`}>
            {activeSection.status}
          </span>
          <span className="text-white/38">{timeLabel}</span>
          <span className="text-white/38">Monitor 01</span>
        </div>
      </div>

      {labels.map((label) => (
        <div key={label.title}>
          <div className={`absolute ${label.line} h-px bg-white/18 ${label.active ? "opacity-100" : "opacity-0"}`} />
          <div
            className={`absolute ${label.style} w-[16%] min-w-[190px] border border-white/12 bg-black/60 px-3 py-2 text-[0.44rem] leading-[1.9] transition-opacity ${
              label.active ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="text-white/82">{label.title}</div>
            <div className="text-white/46">{label.body}</div>
          </div>
        </div>
      ))}

      <div className="absolute left-[3.8%] top-[13%] flex w-[22%] max-w-[280px] flex-col gap-3 text-[0.5rem] leading-[2.05]">
        <div className={panelClassName()}>
          <div className="mb-2 text-white/86">Portfolio Status</div>
          <div>Name: Ko Yamasaki</div>
          <div>Field: Computer Science</div>
          <div>Focus: AI / Graph Data</div>
          <div>Mode: Building</div>
        </div>
        <div className={panelClassName()}>
          <div className="mb-2 text-white/86">Project Scan</div>
          <div>Terraplot</div>
          <div>Mappi</div>
          <div>Web Landing Page</div>
          <div>Research Ideas</div>
        </div>
        <div className={panelClassName()}>
          <div className="mb-2 text-white/86">Object Count</div>
          <div>Total: 17</div>
          <div>Visible: {scanProgress > 0.3 ? "13" : "03"}</div>
          <div className="mt-2 text-[#b89c7a]">Badge: Low Risk</div>
        </div>
      </div>

      <div className="absolute right-[3.8%] top-[13%] flex w-[22%] max-w-[290px] flex-col gap-3 text-[0.5rem] leading-[2.05]">
        <div className={panelClassName()}>
          <div className="mb-2 text-white/86">Detected Skills</div>
          {["TYPE SCRIPT", "NEXT.JS", "IOS APP", "FIREBASE", "PYTHON", "GRAPH / GNN"].map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>
        <div className={panelClassName()}>
          <div className="mb-2 text-white/86">Research Interest</div>
          {["GRAPH DATABASE", "QUERY OPTIMIZATION", "MACHINE LEARNING", "COMPUTER VISION"].map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>
        <div className={panelClassName()}>
          <div className="mb-2 text-white/86">Density Map</div>
          <div className="relative mx-auto h-16 w-32 border border-white/26">
            <div className="absolute inset-y-0 left-[28%] w-px bg-white/22" />
            <div className="absolute inset-y-0 right-[28%] w-px bg-white/18" />
            <div className="absolute left-[18%] top-[26%] h-3 w-4 border border-white/42" />
            <div className="absolute left-[44%] top-[18%] h-4 w-6 border border-white/42" />
            <div className="absolute right-[14%] top-[48%] h-3 w-5 border border-white/42" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-[14.5%] left-[3.8%] w-[54%] max-w-[720px] border border-white/12 bg-white/[0.02] px-4 py-4 text-[0.48rem] leading-[2] text-white/58">
        <div className="mb-2 text-white/82">{activeSection.label}</div>
        <div>{activeSection.summary}</div>
      </div>

      <div className="absolute bottom-[14.5%] right-[3.8%] w-[22%] max-w-[290px] border border-white/12 bg-white/[0.02] px-4 py-4 text-[0.48rem] leading-[2]">
        <div className="mb-2 text-white/86">System Log</div>
        {activeSection.logs.map((log) => (
          <div key={log}>{log}</div>
        ))}
      </div>

      <div className="absolute inset-x-[3.8%] bottom-[7%]">
        <div className="mb-3 flex items-center justify-between text-[0.5rem]">
          <span>Scan Progress</span>
          <span>{String(Math.round(scanProgress * 100)).padStart(2, "0")}%</span>
        </div>
        <div className="h-3 border border-white/16 bg-white/[0.03] p-[2px]">
          <div
            className="h-full bg-white/78 shadow-[0_0_10px_rgba(255,255,255,0.15)]"
            style={{ width: `${Math.max(4, scanProgress * 100)}%` }}
          />
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2 text-[0.44rem] text-white/42">
          <div className="border border-white/12 px-3 py-2">01 App Development</div>
          <div className="border border-white/12 px-3 py-2">02 Location Systems</div>
          <div className="border border-white/12 px-3 py-2">03 Graph Research</div>
          <div className="border border-white/12 px-3 py-2">04 Portfolio Design</div>
        </div>
        <div className="mt-3 flex items-center justify-between text-[0.44rem] text-white/42">
          <span>Please Wait. Do Not Remove Baggage.</span>
          <span>Checkpoint 01</span>
        </div>
      </div>
    </div>
  );
}
