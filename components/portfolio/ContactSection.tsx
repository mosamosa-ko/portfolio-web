"use client";

import { Component, Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const links = [
  { label: "GitHub", href: "https://github.com/mosamosa-ko", icon: "github" },
  { label: "Email", href: "mailto:hello@example.com" },
];

type GarageModelProps = {
  path: string;
  color: string;
  emissive: string;
  targetSize: number;
  position: [number, number, number];
  rotation: [number, number, number];
  opacity?: number;
};

type PointerState = {
  x: number;
  y: number;
};

type DragState = {
  x: number;
  y: number;
};

class GarageErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("Garage model failed to load", error);
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

function GarageModel({ path, color, emissive, targetSize, position, rotation, opacity = 0.58 }: GarageModelProps) {
  const { scene } = useGLTF(path);

  const normalized = useMemo(() => {
    const model = scene.clone(true);

    model.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      child.geometry.computeVertexNormals();
      child.material = new THREE.MeshStandardMaterial({
        color,
        transparent: true,
        opacity,
        roughness: 0.42,
        metalness: 0.22,
        emissive,
        emissiveIntensity: 0.035,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      child.castShadow = false;
      child.receiveShadow = false;
      child.renderOrder = 1;
    });

    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z) || 1;

    return {
      model,
      scale: targetSize / maxDimension,
      offset: center.multiplyScalar(-1),
    };
  }, [color, emissive, opacity, path, scene, targetSize]);

  useEffect(() => {
    return () => {
      normalized.model.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        if (Array.isArray(child.material)) {
          child.material.forEach((material) => material.dispose());
        } else {
          child.material.dispose();
        }
      });
    };
  }, [normalized.model]);

  return (
    <group position={position} rotation={rotation} scale={normalized.scale}>
      <primitive object={normalized.model} position={[normalized.offset.x, normalized.offset.y, normalized.offset.z]} />
    </group>
  );
}

function GarageBackgroundModels({ pointer, drag }: { pointer: PointerState; drag: DragState }) {
  return (
    <group
      position={[pointer.x * 0.3, pointer.y * 0.16, 0]}
      rotation={[
        0.04 + pointer.y * 0.34 + drag.y * 0.52,
        -0.08 + pointer.x * 0.58 + drag.x * 0.68,
        pointer.x * 0.12 + drag.x * 0.14,
      ]}
    >
      <GarageModel
        path="/models/Alternator.glb"
        color="#a8bdc7"
        emissive="#6f97a8"
        targetSize={6.6}
        position={[1.75 + pointer.x * 0.22, 0.05 + pointer.y * 0.12, -0.25]}
        rotation={[
          0.2 + pointer.y * 0.22 + drag.y * 0.26,
          -0.48 + pointer.x * 0.28 + drag.x * 0.3,
          -0.08 + pointer.x * 0.08 + drag.x * 0.1,
        ]}
        opacity={0.62}
      />
      <GarageModel
        path="/models/bic.glb"
        color="#c7d7df"
        emissive="#7ea8b8"
        targetSize={3.2}
        position={[-2.85 - pointer.x * 0.2, -0.95 - pointer.y * 0.1, 0.2]}
        rotation={[
          0.05 - pointer.y * 0.14 - drag.y * 0.22,
          0.22 - pointer.x * 0.22 - drag.x * 0.26,
          -0.4 + pointer.x * 0.12 + drag.x * 0.1,
        ]}
        opacity={0.46}
      />
    </group>
  );
}

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const dragRef = useRef({ active: false, x: 0, y: 0 });
  const [shouldLoadGarage, setShouldLoadGarage] = useState(false);
  const [pointer, setPointer] = useState<PointerState>({ x: 0, y: 0 });
  const [drag, setDrag] = useState<DragState>({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || shouldLoadGarage) return undefined;

    if (!("IntersectionObserver" in window)) {
      setShouldLoadGarage(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadGarage(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: "1800px 0px", threshold: 0.01 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [shouldLoadGarage]);

  return (
    <>
      <section
        id="garage"
        ref={sectionRef}
        onPointerMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          setPointer({
            x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
            y: ((event.clientY - rect.top) / rect.height - 0.5) * -2,
          });

          if (!dragRef.current.active) return;

          const deltaX = event.clientX - dragRef.current.x;
          const deltaY = event.clientY - dragRef.current.y;
          dragRef.current = { active: true, x: event.clientX, y: event.clientY };

          setDrag((current) => ({
            x: THREE.MathUtils.clamp(current.x + deltaX * 0.0038, -0.9, 0.9),
            y: THREE.MathUtils.clamp(current.y + deltaY * 0.0038, -0.6, 0.6),
          }));
        }}
        onPointerDown={(event) => {
          if (event.pointerType === "mouse" && event.button !== 0) return;
          event.currentTarget.setPointerCapture(event.pointerId);
          dragRef.current = { active: true, x: event.clientX, y: event.clientY };
        }}
        onPointerUp={(event) => {
          dragRef.current.active = false;
          event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={() => {
          dragRef.current.active = false;
        }}
        onPointerLeave={() => {
          if (!dragRef.current.active) setPointer({ x: 0, y: 0 });
        }}
        className="relative min-h-[720px] touch-pan-y select-none overflow-hidden bg-white px-5 py-24 text-[#1d1d1f] sm:min-h-[760px] sm:px-10 sm:py-28 lg:px-16"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_68%_42%,rgba(159,211,230,0.2),transparent_36%),linear-gradient(135deg,#ffffff_0%,#f7fbfc_58%,#ffffff_100%)]" />

        <div className="pointer-events-none absolute -right-48 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full border border-[#8fc7dd]/20 bg-[radial-gradient(circle,rgba(159,211,230,0.18)_0%,rgba(159,211,230,0.08)_36%,transparent_64%)] sm:-right-28 sm:h-[620px] sm:w-[620px]">
          <div className="absolute inset-20 rounded-full border border-[#8fc7dd]/24" />
          <div className="absolute inset-40 rounded-full border border-[#8fc7dd]/28" />
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#8fc7dd]/16" />
          <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#8fc7dd]/16" />
          <div className="absolute left-1/2 top-1/2 h-[112%] w-px -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#8fc7dd]/12" />
          <div className="absolute left-1/2 top-1/2 h-[112%] w-px -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-[#8fc7dd]/12" />
        </div>

        <div className="absolute inset-0">
          {shouldLoadGarage ? (
            <GarageErrorBoundary>
              <Canvas
                className="pointer-events-none"
                camera={{ position: [0, 0.15, 7.2], fov: 34 }}
                dpr={[0.75, 1.25]}
                gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
              >
                <ambientLight intensity={1.55} />
                <directionalLight position={[3, 4, 5]} intensity={1.12} />
                <directionalLight position={[-4, 2, 3]} intensity={0.42} color="#e8f6ff" />
                <Suspense fallback={null}>
                  <GarageBackgroundModels pointer={pointer} drag={drag} />
                </Suspense>
              </Canvas>
            </GarageErrorBoundary>
          ) : null}
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.8)_28%,rgba(255,255,255,0.18)_72%,rgba(255,255,255,0.58)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[520px] max-w-[1320px] items-center sm:min-h-[560px]">
          <div className="pointer-events-none max-w-[88vw] sm:max-w-xl">
            <p className="text-sm font-medium tracking-[-0.01em] text-black/42">Garage object</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-7xl">
              Power for things that move.
            </h2>
            <p className="mt-7 text-[17px] leading-7 text-black/58 sm:text-lg">
              A closing garage scene for the portfolio: generation, ignition, and small systems that turn ideas into motion. Move the cursor and the parts respond quietly in the background.
            </p>
            <div className="mt-9 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-[0.16em] text-black/38">
              <span className="rounded-full border border-black/12 bg-white/78 px-4 py-2">Generation</span>
              <span className="rounded-full border border-black/12 bg-white/78 px-4 py-2">Systems</span>
              <span className="rounded-full border border-[#5f9fba]/20 bg-white/78 px-4 py-2 text-[#2f718a]">
                {shouldLoadGarage ? "Move cursor" : "Loading near view"}
              </span>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-8 right-5 z-10 hidden w-[320px] border border-[#7fb6cc]/26 bg-white/72 p-5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-black/42 shadow-[0_18px_50px_rgba(95,159,186,0.12)] backdrop-blur-sm md:block lg:right-16">
          <div className="mb-4 flex items-center justify-between border-b border-black/10 pb-3">
            <span>parts note</span>
            <span className="text-[#2f718a]">garage bench</span>
          </div>
          <div className="space-y-3 leading-5">
            <p>
              alternator / converts motion into electrical output. a small symbol for systems that keep moving after launch.
            </p>
            <p>
              lighter / ignition object. the first spark before a product becomes real.
            </p>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-1">
            {Array.from({ length: 16 }).map((_, index) => (
              <span key={index} className={index % 3 === 0 ? "h-1 bg-[#7fb6cc]/45" : "h-1 bg-black/10"} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 pb-20 pt-8 text-[#1d1d1f] sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1320px] border-t border-[#8fc7dd]/28 pt-14">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-medium tracking-[-0.01em] text-black/42">Portfolio checkout</p>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-6xl">
                Thanks for inspecting the baggage.
              </h2>
              <p className="mt-6 max-w-md text-[17px] leading-7 text-black/56">
                A small closing counter for the projects, ideas, and experiments packed into this site.
              </p>
            </div>

            <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
              <div className="border border-[#8fc7dd]/38 bg-[#fbfdfe] p-5 font-mono text-xs uppercase tracking-[0.12em] text-black/58 shadow-[0_18px_60px_rgba(95,159,186,0.1)]">
                <div className="mb-5 border-b border-[#8fc7dd]/28 pb-4 text-center">
                  <p className="text-[#2f718a]">portfolio receipt</p>
                  <p className="mt-1 text-[0.62rem] text-black/34">ko-yamasaki.vercel.app</p>
                </div>
                {[
                  ["Terraplot", "GPS territory game"],
                  ["App development", "iOS / web products"],
                  ["Graph research", "nodes / queries / AI"],
                  ["3D interface", "x-ray suitcase hero"],
                  ["Human side", "curiosity + humor"],
                ].map(([name, detail]) => (
                  <div key={name} className="flex justify-between gap-4 border-b border-[#8fc7dd]/18 py-2">
                    <span>{name}</span>
                    <span className="text-right text-black/36">{detail}</span>
                  </div>
                ))}
                <div className="mt-5 flex justify-between border-t border-[#8fc7dd]/34 pt-4 text-[#2f718a]">
                  <span>Total</span>
                  <span>Thank you</span>
                </div>
                <div className="mt-5 h-8 bg-[repeating-linear-gradient(90deg,#111_0,#111_2px,transparent_2px,transparent_5px)] opacity-25" />
              </div>

              <div className="grid gap-5">
                <div className="border border-[#8fc7dd]/32 bg-[#f8fcfd] p-5">
                  <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-black/42">sticker sheet</p>
                  <div className="flex flex-wrap gap-2">
                    {["GPS", "AI", "GRAPH", "APP", "WEB", "MAP", "3D", "DESIGN", "RESEARCH", "HIROSHIMA"].map(
                      (label, index) => (
                        <span
                          key={label}
                          className="rounded-full border border-[#8fc7dd]/38 bg-white px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] text-[#2f718a] shadow-[2px_2px_0_rgba(143,199,221,0.12)]"
                          style={{ transform: `rotate(${index % 2 === 0 ? -1.5 : 1.5}deg)` }}
                        >
                          {label}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="border border-[#8fc7dd]/32 bg-white p-5">
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-black/42">museum label</p>
                    <p className="mt-4 text-2xl font-semibold tracking-[-0.05em]">TerraPlot</p>
                    <p className="mt-2 text-sm leading-6 text-black/54">
                      A small product about movement, maps, and making ordinary walks feel playable.
                    </p>
                  </div>

                  <div className="border border-[#8fc7dd]/32 bg-white p-5">
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-black/42">recipe card</p>
                    <ul className="mt-4 space-y-2 font-mono text-xs uppercase tracking-[0.1em] text-black/52">
                      <li>1 transparent suitcase</li>
                      <li>4 project files</li>
                      <li>many experiments</li>
                      <li>a little humor</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-[#8fc7dd]/32 bg-[#f8fcfd] p-5">
                  <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-black/42">inbox zero</p>
                  {[
                    ["read", "project files inspected"],
                    ["new", "next idea captured"],
                    ["sent", "thank you for visiting"],
                  ].map(([state, message]) => (
                    <div
                      key={message}
                      className="flex items-center justify-between gap-5 border-t border-[#8fc7dd]/18 py-3 first:border-t-0"
                    >
                      <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[#2f718a]">
                        {state}
                      </span>
                      <span className="text-right text-sm text-black/58">{message}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white px-6 py-10 text-[#1d1d1f] sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1440px] border-t border-black/12 pt-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <span className="text-xs uppercase tracking-[0.16em] text-black/36">© 2026 Ko Yamasaki</span>
            <div className="flex flex-wrap gap-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={link.label}
                  className="inline-flex items-center gap-2 rounded-full border border-black/14 px-5 py-2 text-sm font-medium tracking-[-0.01em] text-black/72 transition hover:border-black/40 hover:text-black"
                >
                  {link.icon === "github" ? (
                    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.35 6.84 9.71.5.09.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.51.47-3.16-.63-3.36-1.21-.11-.3-.6-1.22-1.03-1.47-.35-.19-.85-.66-.01-.67.79-.01 1.35.74 1.54 1.05.9 1.55 2.34 1.11 2.91.85.09-.67.35-1.11.64-1.37-2.22-.26-4.55-1.14-4.55-5.05 0-1.11.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.28 9.28 0 0 1 12 6.96c.85 0 1.7.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.79-4.57 5.05.36.32.68.93.68 1.89 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.08 10.08 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : null}
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
