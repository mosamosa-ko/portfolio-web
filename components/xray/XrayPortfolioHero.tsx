"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { motion, useReducedMotion } from "framer-motion";
import { SuitcaseModel } from "./SuitcaseModel";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function SceneContent({ progress }: { progress: number }) {
  const zoom = 104 + progress * 8;

  return (
    <>
      <color attach="background" args={["#f7f5f0"]} />
      <OrthographicCamera makeDefault position={[0.2, -0.08, 8]} zoom={zoom} near={0.1} far={100} />
      <ambientLight intensity={0.65} color="#ffffff" />
      <directionalLight position={[3, 4, 5]} intensity={0.35} color="#ffffff" />
      <directionalLight position={[-3, 2, 3]} intensity={0.18} color="#f3fbff" />
      <pointLight position={[1.1, 0.2, 3.4]} intensity={0.22} color="#ffffff" distance={6} />
      <SuitcaseModel scanProgress={progress} activeIndex={progress < 0.42 ? 0 : progress < 0.72 ? 1 : 2} />
    </>
  );
}

export function XrayPortfolioHero() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setScrollProgress(0.54);
      return;
    }

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
  }, [reducedMotion]);

  const progress = useMemo(() => clamp(scrollProgress, 0, 1), [scrollProgress]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[300vh] bg-[radial-gradient(circle_at_72%_45%,rgba(70,150,185,0.16),transparent_32%),linear-gradient(135deg,#f7f5f0_0%,#f2f8fa_60%,#ffffff_100%)] text-[#111111]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Canvas dpr={[0.85, 1.15]} gl={{ antialias: true, alpha: false, powerPreference: "low-power" }}>
            <SceneContent progress={progress} />
          </Canvas>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_68%_50%,rgba(93,168,198,0.09)_0%,rgba(93,168,198,0.035)_35%,transparent_70%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(248,246,241,0.88)_0%,rgba(248,246,241,0.42)_44%,rgba(237,245,248,0.22)_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(rgba(17,17,17,0.42)_0.7px,transparent_0.7px)] [background-size:7px_7px]" />

        <div className="absolute left-6 top-6 z-10 text-[0.54rem] uppercase tracking-[0.32em] text-black/34 sm:left-10 sm:top-8">
          Soft X-ray Portfolio
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
    </section>
  );
}
