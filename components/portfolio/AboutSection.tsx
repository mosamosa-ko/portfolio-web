"use client";

import { FormEvent, useState } from "react";

const focusItems = [
  { label: "AI / Machine Learning", code: "ml.pipeline.train()" },
  { label: "Graph data / GNN", code: "graph.query(nodes, edges)" },
  { label: "iOS app development", code: "swiftui.render(app)" },
  { label: "Web design / landing pages", code: "next.deploy()" },
  { label: "Location-based systems", code: "gps.capture(cells)" },
];

const nameAscii = String.raw`
@@@  @@@   @@@@@@       @@@ @@@   @@@@@@   @@@@@@@@@@    @@@@@@    @@@@@@    @@@@@@   @@@  @@@  @@@
@@@ @@@   @@@@@@@@      @@@ @@@  @@@@@@@@  @@@@@@@@@@@  @@@@@@@@  @@@@@@@   @@@@@@@@  @@@ @@@   @@@
@@!@@!    @@!  @@@      @@! !@@  @@!  @@@  @@! @@! @@!  @@!  @@@  !@@       @@!  @@@  @@! !@@   @@!
!@!!@!    !@!  @!@      !@! @!!  !@!  @!@  !@! !@! !@!  !@!  @!@  !@!       !@!  @!@  !@! @!!   !@!
@!@!@!    @!@  !@!       !@!@!   @!@!@!@!  @!! !!@ @!@  @!@!@!@!  !!@@!!    @!@!@!@!  @!@@!@!   !!@
!!!@!!!   !@!  !!!        @!!!   !!!@!!!!  !@!   ! !@!  !!!@!!!!   !!@!!!   !!!@!!!!  !!@!!!    !!!
!!: :!!   !!:  !!!        !!:    !!:  !!!  !!:     !!:  !!:  !!!       !:!  !!:  !!!  !!: :!!   !!:
:!:  !:!  :!:  !:!        :!:    :!:  !:!  :!:     :!:  :!:  !:!      !:!   :!:  !:!  :!:  !:!  :!:
 ::  :::  ::::: ::         ::    ::   :::  :::     ::   ::   :::  :::: ::   ::   :::   ::  :::   ::
 :   :::   : :  :          :      :   : :   :      :     :   : :  :: : :     :   : :   :   :::  :
`;

const idCardAscii = String.raw`
+------------------------------------------------+
| ID: KO-YAMASAKI                                |
| FIELD: COMPUTER SCIENCE                        |
| FOCUS: AI / GRAPH / APP DEV                    |
| BASE: HIROSHIMA                                |
|                                                |
| ||| || |||| ||| || ||||| || ||| |||| |||       |
+------------------------------------------------+`;

const initialLines = [
  "boot portfolio terminal...",
  "click a command below, or type naturally: help / ls / cd 01",
  "available folders: 01-terraplot  02-mappi  03-portfolio  04-research",
  "hidden: profiler / find / save / trash / startup",
];

const quickCommands = ["ls", "01", "map", "manifest", "stack", "profiler", "find", "trash", "github", "clear"];

function normalizeCommand(rawCommand: string) {
  const command = rawCommand.trim().toLowerCase();

  if (command.startsWith("type ")) return command.replace(/^type\s+/, "");
  if (command === "dir") return "ls";
  if (command === "cd" || command === "cd ." || command === "cd .." || command === "pwd") return "home";
  if (command === "cd 01" || command === "cd 01-terraplot" || command === "open 01") return "terraplot";
  if (command === "cd 02" || command === "cd 02-mappi" || command === "02") return "mappi";
  if (command === "cd 03" || command === "cd 03-portfolio" || command === "03") return "portfolio";
  if (command === "cd 04" || command === "cd 04-research" || command === "04") return "research";
  if (command === "01") return "terraplot";
  if (command === "cd terraplot" || command === "open terraplot") return "terraplot";
  if (command === "open github") return "github";
  if (command === "projects" || command === "cd projects") return "ls";
  if (command === "system" || command === "system profiler" || command === "about this mac") return "profiler";
  if (command === "finder" || command === "search") return "find";
  if (command === "floppy" || command === "save contact" || command === "contact.vcf") return "save";
  if (command === "guestbook" || command === "discarded ideas" || command === "discarded ideas.txt") return "trash";
  if (command === "startup disk" || command === "thanks") return "startup";

  return command;
}

function getCommandOutput(rawCommand: string) {
  const command = normalizeCommand(rawCommand);

  if (!command) return [];

  if (command === "help") {
    return [
      "you can click command chips below, or type:",
      "  ls              list projects",
      "  01              open Terraplot",
      "  cd 01           same as Terraplot",
      "  cd / cd ..      return to baggage home",
      "  map             show Terraplot map cells",
      "  manifest        show suitcase contents",
      "  scan            show full manifest",
      "  stack           list skills",
      "  github          show GitHub profile",
      "  profiler        open system profile",
      "  find            search project signals",
      "  save            save contact card",
      "  trash           open discarded ideas",
      "  startup         final startup note",
    ];
  }

  if (command === "home") {
    return [
      "directory: ~/baggage",
      "folders: 01-terraplot  02-mappi  03-portfolio  04-research",
      "hint: type `ls`, `01`, or click a command chip.",
    ];
  }

  if (command === "ls" || command === "scan") {
    return [
      "01-terraplot      gps territory game / movement as play",
      "02-mappi          location system / maps / interaction",
      "03-portfolio      web design / 3d / scroll storytelling",
      "04-research       graph data / gnn / query optimization",
      "hint: type `01` or `cd 01` to open Terraplot.",
    ];
  }

  if (command === "terraplot") {
    return [
      "project: Terraplot",
      "url: https://terraplot-chi.vercel.app/en",
      "concept: walk through real places, capture territory cells.",
      "signal: GPS / Mapbox / Firebase / iOS product thinking",
    ];
  }

  if (command === "map") {
    return [
      "+-------------------+",
      "| . . # # . . . . . |",
      "| . # # @ # . . . . |",
      "| . . # # # . . . . |",
      "| . . . . # # . . . |",
      "+-------------------+",
      "@ = current position / # = captured cells",
    ];
  }

  if (command === "manifest") {
    return [
      "+---------------- BAGGAGE MANIFEST ----------------+",
      "| CPU      -> AI / backend computation              |",
      "| PIN      -> Terraplot / GPS territory             |",
      "| CABLE    -> systems / connection                  |",
      "| WRENCH   -> engineering / problem solving         |",
      "| HEADSET  -> UX / production                       |",
      "+--------------------------------------------------+",
    ];
  }

  if (command === "mappi") {
    return ["project: Mappi", "concept: map and location-based interaction system.", "status: in development"];
  }

  if (command === "portfolio") {
    return ["project: Portfolio Website", "stack: Next.js / TypeScript / React Three Fiber", "concept: X-ray suitcase + interactive terminal storytelling"];
  }

  if (command === "graph" || command === "research") {
    return [
      "research field:",
      "  nodes -> edges -> queries -> learning",
      "  interests: graph database, GNN, query optimization",
      "  direction: systems that understand connected data",
    ];
  }

  if (command === "stack") {
    return focusItems.map((item, index) => `${String(index + 1).padStart(2, "0")} ${item.code}  // ${item.label}`);
  }

  if (command === "github") {
    return ["github: https://github.com/mosamosa-ko", "status: public profile linked"];
  }

  if (command === "profiler") {
    return [
      "About This Portfolio",
      "System: Ko Yamasaki / Computer Science",
      "Memory: location systems, graph data, app development",
      "Extensions: Next.js, SwiftUI, Firebase, Python, React Three Fiber",
      "Status: building products around movement + data",
    ];
  }

  if (command === "find") {
    return [
      "Finder Search:",
      "  gps      -> Terraplot",
      "  graph    -> Graph / AI Research",
      "  ios      -> App Development",
      "  web      -> Portfolio Website",
      "hint: open the Finder Search folder below for the interactive version.",
    ];
  }

  if (command === "save") {
    return [
      "saving contact.vcf...",
      "name: Ko Yamasaki",
      "github: https://github.com/mosamosa-ko",
      "status: saved to desktop as contact card",
    ];
  }

  if (command === "trash") {
    return [
      "discarded ideas.txt",
      "01. overcomplicated scanner dashboard - deleted",
      "02. too much neon - deleted",
      "03. flight ticket section - archived",
      "04. making every section interactive - maybe later",
      "rule: playful, but never confusing.",
    ];
  }

  if (command === "startup") {
    return ["Startup Disk selected.", "Thanks for visiting.", "New projects will be added here."];
  }

  return [`command not found: ${rawCommand}`, "try `help`"];
}

type TerminalEntry = {
  command?: string;
  output: string[];
};

export function AboutSection() {
  const [input, setInput] = useState("");
  const [entries, setEntries] = useState<TerminalEntry[]>([{ output: initialLines }]);

  const runCommand = (command: string) => {
    const normalizedCommand = normalizeCommand(command);

    if (normalizedCommand === "clear") {
      setEntries([{ output: initialLines }]);
      setInput("");
      return;
    }

    if (command.toLowerCase() === "open terraplot") {
      window.open("https://terraplot-chi.vercel.app/en", "_blank", "noopener,noreferrer");
    }

    if (command.toLowerCase() === "open github") {
      window.open("https://github.com/mosamosa-ko", "_blank", "noopener,noreferrer");
    }

    setEntries((current) => [...current, { command, output: getCommandOutput(command) }]);
    setInput("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const command = input.trim();
    if (!command) return;

    runCommand(command);
  };

  return (
    <section className="overflow-x-hidden bg-white px-5 py-24 text-[#1d1d1f] sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto grid max-w-[1380px] gap-10 lg:grid-cols-[0.92fr_1.18fr] lg:items-center">
        <div className="min-w-0">
          <p className="mb-4 text-sm font-medium tracking-[-0.01em] text-black/48">About</p>
          <pre className="max-w-full overflow-x-auto font-mono text-[0.42rem] font-semibold leading-[1.05] tracking-[-0.08em] text-[#1d1d1f] sm:text-[0.7rem] lg:text-[0.82rem]">
            {nameAscii}
          </pre>
          <pre className="mt-8 max-w-full overflow-x-auto font-mono text-[0.68rem] leading-[1.35] text-black/46 sm:max-w-2xl sm:text-[0.8rem]">
            {idCardAscii}
          </pre>
          <p className="mt-7 max-w-2xl text-[1.65rem] leading-[1.25] tracking-[-0.04em] text-black/68 sm:text-3xl sm:leading-[1.35]">
            Computer Science student interested in AI, graph data, app development, and location-based products.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <a
              href="https://terraplot-chi.vercel.app/en"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-white px-4 py-4 text-sm font-medium tracking-[-0.01em] text-black/70 shadow-[rgba(0,0,0,0.08)_3px_5px_30px_0px] transition hover:-translate-y-0.5 hover:text-[#0066cc]"
            >
              View Terraplot
              <span className="mt-1 block text-xs text-black/38">GPS territory game</span>
            </a>
            <button
              type="button"
              onClick={() => runCommand("manifest")}
              className="rounded-xl bg-white px-4 py-4 text-left text-sm font-medium tracking-[-0.01em] text-black/70 shadow-[rgba(0,0,0,0.08)_3px_5px_30px_0px] transition hover:-translate-y-0.5 hover:text-[#0066cc]"
            >
              Scan Manifest
              <span className="mt-1 block text-xs text-black/38">what is inside</span>
            </button>
            <a
              href="https://github.com/mosamosa-ko"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-white px-4 py-4 text-sm font-medium tracking-[-0.01em] text-black/70 shadow-[rgba(0,0,0,0.08)_3px_5px_30px_0px] transition hover:-translate-y-0.5 hover:text-[#0066cc]"
            >
              GitHub
              <span className="mt-1 block text-xs text-black/38">source profile</span>
            </a>
          </div>
        </div>

        <div className="min-w-0 overflow-hidden rounded-[1.3rem] bg-[#0b0f12] shadow-[rgba(0,0,0,0.2)_3px_5px_30px_0px] sm:rounded-[1.6rem]">
          <div className="flex items-center gap-2 border-b border-white/10 px-6 py-5">
            <span className="h-3.5 w-3.5 rounded-full bg-[#ff5f57]" />
            <span className="h-3.5 w-3.5 rounded-full bg-[#febc2e]" />
            <span className="h-3.5 w-3.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-sm tracking-[-0.01em] text-white/38">portfolio-scan — interactive</span>
          </div>

          <div className="min-h-[480px] px-4 py-6 font-mono text-xs leading-6 text-[#b7e5d1] sm:min-h-[560px] sm:px-8 sm:py-8 sm:text-base sm:leading-7">
            <div className="mb-6 flex flex-wrap gap-2.5">
              {quickCommands.map((command) => (
                <button
                  key={command}
                  type="button"
                  onClick={() => runCommand(command)}
                  className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/52 transition hover:border-[#6fb6d3]/50 hover:text-[#b7e5d1] sm:px-3.5 sm:text-sm"
                >
                  {command}
                </button>
              ))}
            </div>
            <div className="max-h-[430px] space-y-5 overflow-y-auto pr-2">
              {entries.map((entry, index) => (
                <div key={`${entry.command ?? "init"}-${index}`}>
                  {entry.command ? (
                    <p>
                      <span className="text-[#6fb6d3]">ko@portfolio</span>
                      <span className="text-white/34"> ~/baggage </span>
                      <span className="text-[#f5f5f7]">$ {entry.command}</span>
                    </p>
                  ) : null}
                  <div className={entry.command ? "mt-2" : ""}>
                    {entry.output.map((line) => (
                      <p key={line} className={line.startsWith("  ") ? "pl-4 text-white/48" : "text-[#b7e5d1]"}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-7 flex min-w-0 items-center border-t border-white/10 pt-5">
              <label htmlFor="portfolio-terminal" className="sr-only">
                Portfolio terminal command
              </label>
              <span className="hidden text-[#6fb6d3] sm:inline">ko@portfolio</span>
              <span className="mx-2 shrink-0 text-white/34">~/baggage $</span>
              <input
                id="portfolio-terminal"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="min-w-0 flex-1 bg-transparent text-[#f5f5f7] caret-[#b7e5d1] outline-none placeholder:text-white/24"
                placeholder="type help"
                spellCheck={false}
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
