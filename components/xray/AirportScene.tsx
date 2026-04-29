"use client";

import { Component, ReactNode, Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { MathUtils, Vector3 } from "three";
import { ConveyorBelt } from "./ConveyorBelt";
import { ScanLineEffect } from "./ScanLineEffect";
import { SuitcaseModel } from "./SuitcaseModel";
import { XrayScanner } from "./XrayScanner";

type AirportSceneProps = {
  scanProgress: number;
  activeIndex: number;
};

type PointerRigProps = {
  pointerX: number;
  pointerY: number;
};

class SceneErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

function SceneFallback() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(143,244,255,0.06),transparent_28%),linear-gradient(180deg,#0a1319_0%,#071016_45%,#04080b_100%)]">
      <div className="absolute inset-x-[12%] bottom-[16%] h-6 rounded-full bg-[#111a1f]" />
      <div className="absolute left-[22%] top-[44%] h-28 w-[48%] rounded-[2rem] border border-white/10 bg-[#3f4852]" />
      <div className="absolute left-[58%] top-[33%] h-44 w-36 rounded-[1.75rem] border border-white/10 bg-[#8d989f]" />
      <div className="absolute left-[61%] top-[38%] h-28 w-20 rounded-[1rem] bg-[#0c1418]" />
    </div>
  );
}

function CameraRig({ pointerX, pointerY }: PointerRigProps) {
  const { camera } = useThree();
  const target = useRef(new Vector3());

  useFrame((_, delta) => {
    target.current.set(pointerX * 0.35, 2.3 + pointerY * 0.16, 8.3);
    camera.position.lerp(target.current, delta * 2.4);
    camera.lookAt(0.2 + pointerX * 0.18, 0.1 + pointerY * 0.08, 0);
  });

  return null;
}

function SceneContent({
  scanProgress,
  activeIndex,
  pointerX,
  pointerY,
}: AirportSceneProps & PointerRigProps) {
  return (
    <>
      <color attach="background" args={["#071016"]} />
      <fog attach="fog" args={["#071016", 8, 22]} />
      <ambientLight intensity={0.7} color="#9ca8b4" />
      <directionalLight position={[4, 8, 3]} intensity={1.2} color="#dbe8f2" />
      <spotLight
        position={[-2, 7, 5]}
        angle={0.48}
        intensity={18}
        penumbra={0.6}
        color="#d2e6ef"
      />
      <PerspectiveCamera makeDefault position={[0, 2.3, 8.3]} fov={36} />
      <CameraRig pointerX={pointerX} pointerY={pointerY} />
      <group position={[0, -1.4, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.15, 0]}>
          <planeGeometry args={[40, 26]} />
          <meshStandardMaterial color="#0e171d" roughness={0.92} metalness={0.12} />
        </mesh>
        <ConveyorBelt />
        <XrayScanner scanProgress={scanProgress} />
        <SuitcaseModel scanProgress={scanProgress} activeIndex={activeIndex} />
        <ScanLineEffect scanProgress={scanProgress} />
      </group>
    </>
  );
}

export function AirportScene({ scanProgress, activeIndex }: AirportSceneProps) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const dpr = useMemo(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return [0.65, 0.9] as [number, number];
    }

    return [0.8, 1] as [number, number];
  }, []);

  return (
    <div
      className="absolute inset-0"
      onPointerMove={(event) => {
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = (event.clientY / window.innerHeight) * 2 - 1;
        setPointer({
          x: MathUtils.clamp(x, -1, 1),
          y: MathUtils.clamp(-y, -1, 1),
        });
      }}
      onPointerLeave={() => setPointer({ x: 0, y: 0 })}
    >
      <SceneErrorBoundary fallback={<SceneFallback />}>
        <Suspense fallback={<SceneFallback />}>
          <Canvas
            dpr={dpr}
            gl={{ antialias: false, alpha: false, powerPreference: "low-power" }}
          >
            <SceneContent
              scanProgress={scanProgress}
              activeIndex={activeIndex}
              pointerX={pointer.x}
              pointerY={pointer.y}
            />
          </Canvas>
        </Suspense>
      </SceneErrorBoundary>
    </div>
  );
}
