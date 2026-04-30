"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera, useProgress } from "@react-three/drei";
import { motion } from "framer-motion";
import { SuitcaseModel } from "./SuitcaseModel";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function LoadingScreen({ ready, visible, onDismiss }: { ready: boolean; visible: boolean; onDismiss: () => void }) {
  const { progress } = useProgress();
  const displayProgress = ready ? 100 : Math.min(98, Math.round(progress));
  const progressBlocks = Math.max(1, Math.round(displayProgress / 5));

  return (
    <motion.div
      onClick={() => {
        if (ready) onDismiss();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#050708] px-6 text-[#d9f7ff]"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:100%_4px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(143,199,221,0.14),transparent_42%)]" />

      <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/14 bg-[#0b0f12] font-mono shadow-[0_30px_90px_rgba(0,0,0,0.42)]">
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
          <span className="h-3 w-3 rounded-full border border-white/18 bg-white/34" />
          <span className="h-3 w-3 rounded-full border border-white/18 bg-white/24" />
          <span className="h-3 w-3 rounded-full border border-white/18 bg-white/14" />
          <span className="ml-3 text-xs tracking-[-0.01em] text-white/34">portfolio-loader — zsh</span>
        </div>

        <div className="p-5 sm:p-7">
          <div className="mb-5 text-sm text-white/48">
            <span className="text-[#6fb6d3]">ko@portfolio</span>
            <span className="text-white/30"> ~/baggage </span>
            <span className="text-white/70">$ ./boot_xray_portfolio</span>
          </div>

          <pre className="overflow-x-auto text-[0.48rem] font-semibold leading-[1.02] tracking-[-0.06em] text-[#8fc7dd] drop-shadow-[0_0_14px_rgba(143,199,221,0.22)] sm:text-[0.72rem] lg:text-[0.92rem]">
{String.raw`
@@@        @@@@@@    @@@@@@   @@@@@@@   @@@  @@@  @@@   @@@@@@
@@@       @@@@@@@@  @@@@@@@@  @@@@@@@@  @@@  @@@@ @@@  @@@@@@@
@@!       @@!  @@@  @@!  @@@  @@!  @@@  @@!  @@!@!@@@  !@@
!@!       !@!  @!@  !@!  @!@  !@!  @!@  !@!  !@!!@!@!  !@!
@!!       @!@  !@!  @!@!@!@!  @!@  !@!  !!@  @!@ !!@!  !!@@!!
!!!       !@!  !!!  !!!@!!!!  !@!  !!!  !!!  !@!  !!!   !!@!!!
!!:       !!:  !!!  !!:  !!!  !!:  !!!  !!:  !!:  !!!       !:!
:!:       :!:  !:!  :!:  !:!  :!:  !:!  :!:  :!:  !:!      !:!
 :: ::::  ::::: ::  ::   :::   :::: ::   ::   ::   ::   :::: ::
: :: : :   : :  :    :   : :  :: :  :   :    ::    :    :: : :

        .---------------------------------------------------------------.
       /  .----------------------------------------------------------.  /|
      /  /                                                          /  / |
     /  /      KO YAMASAKI / PORTFOLIO BAGGAGE                    /  /  |
    /  /      XRAY MATERIAL PASS                                  /  /   |
   /  /__________________________________________________________/  /    |
  |   |                                                          |   |   |
  |   |   [ CPU ] [ GRAPH ] [ APP ] [ MAP ] [ SYSTEMS ]          |   |   |
  |   |                                                          |   |  /
  |   |__________________________________________________________|   | /
  |  /____________________________________________________________\  |/
  '---------------------------------------------------------------'
`}
          </pre>

          <div className="mt-7 space-y-2 text-xs uppercase tracking-[0.18em] text-white/42">
            <p><span className="text-[#8fc7dd]">[01]</span> loading /models/new_suitcase.glb</p>
            <p><span className="text-[#8fc7dd]">[02]</span> applying transparent x-ray material</p>
            <p><span className="text-[#8fc7dd]">[03]</span> preparing desktop portfolio</p>
          </div>

          <div className="mt-7 grid gap-3 border border-white/12 bg-white/[0.03] p-4 text-xs uppercase tracking-[0.18em] text-white/42 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <div className="mb-2 flex justify-between gap-4">
                <span>LOADING BAGGAGE</span>
                <span>{displayProgress}%</span>
              </div>
              <div className="h-3 border border-[#8fc7dd]/42 p-[2px]">
                <div className="h-full bg-[#8fc7dd] transition-all duration-300" style={{ width: `${displayProgress}%` }} />
              </div>
            </div>
            <div className="whitespace-nowrap text-[#8fc7dd]">
              {"█".repeat(progressBlocks)}
              <span className="text-white/18">{"░".repeat(20 - progressBlocks)}</span>
            </div>
          </div>

          <div className="mt-5 flex items-center text-sm text-white/52">
            <span className="text-[#6fb6d3]">ko@portfolio</span>
            <span className="mx-2 text-white/30">~/baggage $</span>
            <span className="text-white/72">{ready ? "scroll or tap to enter" : "waiting for scan"}</span>
            <span className="ml-1 animate-pulse text-[#8fc7dd]">_</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SceneContent({ progress, onModelReady }: { progress: number; onModelReady: () => void }) {
  const zoom = 104 + progress * 8;

  return (
    <>
      <color attach="background" args={["#ffffff"]} />
      <OrthographicCamera makeDefault position={[0.2, -0.08, 8]} zoom={zoom} near={0.1} far={100} />
      <ambientLight intensity={0.65} color="#ffffff" />
      <directionalLight position={[3, 4, 5]} intensity={0.35} color="#ffffff" />
      <directionalLight position={[-3, 2, 3]} intensity={0.18} color="#f3fbff" />
      <pointLight position={[1.1, 0.2, 3.4]} intensity={0.22} color="#ffffff" distance={6} />
      <SuitcaseModel scanProgress={progress} activeIndex={progress < 0.42 ? 0 : progress < 0.72 ? 1 : 2} onReady={onModelReady} />
    </>
  );
}

export function XrayPortfolioHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [modelReady, setModelReady] = useState(false);
  const [introElapsed, setIntroElapsed] = useState(false);
  const [introDismissed, setIntroDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      const viewport = window.innerHeight || 1;

      if (!section) {
        setScrollProgress(clamp(window.scrollY / (viewport * 1.4), 0, 1));
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollableDistance = Math.max(section.offsetHeight - viewport, 1);
      const rawProgress = clamp(-rect.top / scrollableDistance, 0, 1);
      setScrollProgress(clamp(rawProgress / 0.7, 0, 1));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroElapsed(true), 3200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!modelReady) return undefined;

    const dismissIntro = () => setIntroDismissed(true);

    window.addEventListener("wheel", dismissIntro, { passive: true });
    window.addEventListener("touchmove", dismissIntro, { passive: true });
    window.addEventListener("keydown", dismissIntro);

    return () => {
      window.removeEventListener("wheel", dismissIntro);
      window.removeEventListener("touchmove", dismissIntro);
      window.removeEventListener("keydown", dismissIntro);
    };
  }, [modelReady]);

  const progress = useMemo(() => clamp(scrollProgress, 0, 1), [scrollProgress]);
  const showLoadingScreen = !modelReady || (!introElapsed && !introDismissed);

  useEffect(() => {
    if (!showLoadingScreen) return undefined;

    const originalOverflow = document.body.style.overflow;
    const originalOverscrollBehavior = document.documentElement.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overscrollBehavior = originalOverscrollBehavior;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      setScrollProgress(0);
    };
  }, [showLoadingScreen]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[300vh] bg-[radial-gradient(circle_at_72%_45%,rgba(70,150,185,0.12),transparent_32%),linear-gradient(135deg,#ffffff_0%,#f6fbfd_60%,#ffffff_100%)] text-[#111111]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Canvas dpr={[0.6, 0.9]} frameloop="demand" gl={{ antialias: false, alpha: false, powerPreference: "low-power" }}>
            <SceneContent progress={progress} onModelReady={() => setModelReady(true)} />
          </Canvas>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_68%_50%,rgba(93,168,198,0.09)_0%,rgba(93,168,198,0.035)_35%,transparent_70%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.46)_44%,rgba(237,245,248,0.18)_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(rgba(17,17,17,0.42)_0.7px,transparent_0.7px)] [background-size:7px_7px]" />

        <div className="absolute left-6 top-6 z-10 text-[0.54rem] uppercase tracking-[0.32em] text-black/34 sm:left-10 sm:top-8">
          Portfolio Baggage
        </div>

        <div className="absolute left-6 top-[17%] z-10 max-w-3xl sm:left-10 lg:left-16">
          <motion.p
            className="mb-6 text-[0.6rem] uppercase tracking-[0.3em] text-black/46"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Computer Science / AI / App Development
          </motion.p>
          <motion.h1
            className="font-display text-6xl font-semibold uppercase leading-[0.92] tracking-[-0.045em] text-[#111111] sm:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Ko Yamasaki
          </motion.h1>
          <motion.p
            className="mt-7 max-w-xl text-base leading-8 text-black/58 sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Building products around location, graph data, and interactive systems.
          </motion.p>
          <motion.a
            href="#works"
            className="mt-10 inline-flex border-b border-black/24 pb-2 text-[0.64rem] uppercase tracking-[0.24em] text-black/64 transition duration-300 hover:border-black/70 hover:text-black"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            View Works
          </motion.a>
        </div>

        <div className="absolute inset-x-6 bottom-7 z-10 flex items-center justify-between text-[0.5rem] uppercase tracking-[0.24em] text-black/28 sm:inset-x-10">
          <span>Portfolio Baggage</span>
          <span>{String(Math.round(progress * 100)).padStart(2, "0")}%</span>
        </div>
      </div>
      <LoadingScreen ready={modelReady} visible={showLoadingScreen} onDismiss={() => setIntroDismissed(true)} />
    </section>
  );
}
