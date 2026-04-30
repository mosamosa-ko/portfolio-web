"use client";

import { Component, Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
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

function GarageBackgroundModels() {
  return (
    <group rotation={[0.02, -0.08, 0]}>
      <GarageModel
        path="/models/Alternator.glb"
        color="#a8bdc7"
        emissive="#6f97a8"
        targetSize={6.6}
        position={[1.75, 0.05, -0.25]}
        rotation={[0.2, -0.48, -0.08]}
        opacity={0.62}
      />
    </group>
  );
}

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [shouldLoadGarage, setShouldLoadGarage] = useState(false);

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
      { root: null, rootMargin: "700px 0px", threshold: 0.01 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [shouldLoadGarage]);

  return (
    <>
      <section ref={sectionRef} className="relative min-h-[760px] overflow-hidden bg-white px-6 py-28 text-[#1d1d1f] sm:px-10 lg:px-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_68%_42%,rgba(159,211,230,0.2),transparent_36%),linear-gradient(135deg,#ffffff_0%,#f7fbfc_58%,#ffffff_100%)]" />

        <div className="pointer-events-none absolute -right-28 top-1/2 h-[620px] w-[620px] -translate-y-1/2 rounded-full border border-[#8fc7dd]/20 bg-[radial-gradient(circle,rgba(159,211,230,0.18)_0%,rgba(159,211,230,0.08)_36%,transparent_64%)]">
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
              <Canvas camera={{ position: [0, 0.15, 7.2], fov: 34 }} dpr={[0.75, 1.25]} gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}>
                <ambientLight intensity={1.55} />
                <directionalLight position={[3, 4, 5]} intensity={1.12} />
                <directionalLight position={[-4, 2, 3]} intensity={0.42} color="#e8f6ff" />
                <Suspense fallback={null}>
                  <GarageBackgroundModels />
                </Suspense>
                <OrbitControls enablePan={false} enableDamping dampingFactor={0.08} rotateSpeed={0.58} minDistance={5.2} maxDistance={9.4} />
              </Canvas>
            </GarageErrorBoundary>
          ) : null}
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.8)_28%,rgba(255,255,255,0.18)_72%,rgba(255,255,255,0.58)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-[1320px] items-center">
          <div className="pointer-events-none max-w-xl">
            <p className="text-sm font-medium tracking-[-0.01em] text-black/42">Garage object</p>
            <h2 className="mt-3 font-display text-5xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-7xl">
              Power for things that move.
            </h2>
            <p className="mt-7 text-[17px] leading-7 text-black/58 sm:text-lg">
              A closing garage scene for the portfolio: generation, ignition, and small systems that turn ideas into motion. Drag the background and inspect the parts.
            </p>
            <div className="mt-9 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-[0.16em] text-black/38">
              <span className="rounded-full border border-black/12 bg-white/78 px-4 py-2">Generation</span>
              <span className="rounded-full border border-black/12 bg-white/78 px-4 py-2">Systems</span>
              <span className="rounded-full border border-[#5f9fba]/20 bg-white/78 px-4 py-2 text-[#2f718a]">
                {shouldLoadGarage ? "Drag to inspect" : "Loading near view"}
              </span>
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
