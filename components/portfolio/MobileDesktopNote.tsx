"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "ko-portfolio-desktop-note-dismissed";

export function MobileDesktopNote() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isSmallScreen = window.matchMedia("(max-width: 767px)").matches;
    const dismissed = window.localStorage.getItem(STORAGE_KEY) === "true";

    if (!isSmallScreen || dismissed) return;

    const timer = window.setTimeout(() => setVisible(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    window.localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-3 bottom-3 z-[60] md:hidden">
      <div className="rounded-2xl border border-[#8fc7dd]/42 bg-white/94 p-4 text-[#111111] shadow-[0_18px_60px_rgba(95,159,186,0.18)] backdrop-blur">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[#2f718a]">
              Best experienced on desktop
            </p>
            <p className="mt-2 text-sm leading-6 text-black/62">
              This portfolio works on mobile, but the full experience includes 3D scenes, draggable windows, and keyboard controls.
            </p>
          </div>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss desktop recommendation"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-black/10 text-sm text-black/44 transition hover:border-black/24 hover:text-black"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
