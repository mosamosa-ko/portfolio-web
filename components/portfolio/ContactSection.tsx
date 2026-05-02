"use client";

import { Component, Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

const links = [
  { label: "GitHub", href: "https://github.com/mosamosa-ko", icon: "github" },
  { label: "Email", href: "mailto:byt3craft3r.dev@gmail.com" },
];

const receiptLetterMap: Record<string, string[]> = {
  A: [" @@@ ", "@   @", "@@@@@", "@   @", "@   @"],
  B: ["@@@@ ", "@   @", "@@@@ ", "@   @", "@@@@ "],
  C: [" @@@@", "@    ", "@    ", "@    ", " @@@@"],
  D: ["@@@@ ", "@   @", "@   @", "@   @", "@@@@ "],
  E: ["@@@@@", "@    ", "@@@@ ", "@    ", "@@@@@"],
  F: ["@@@@@", "@    ", "@@@@ ", "@    ", "@    "],
  G: [" @@@@", "@    ", "@ @@@", "@   @", " @@@@"],
  H: ["@   @", "@   @", "@@@@@", "@   @", "@   @"],
  I: ["@@@@@", "  @  ", "  @  ", "  @  ", "@@@@@"],
  J: ["@@@@@", "   @ ", "   @ ", "@  @ ", " @@  "],
  K: ["@   @", "@  @ ", "@@@  ", "@  @ ", "@   @"],
  L: ["@    ", "@    ", "@    ", "@    ", "@@@@@"],
  M: ["@   @", "@@ @@", "@ @ @", "@   @", "@   @"],
  N: ["@   @", "@@  @", "@ @ @", "@  @@", "@   @"],
  O: [" @@@ ", "@   @", "@   @", "@   @", " @@@ "],
  P: ["@@@@ ", "@   @", "@@@@ ", "@    ", "@    "],
  Q: [" @@@ ", "@   @", "@ @ @", "@  @ ", " @@ @"],
  R: ["@@@@ ", "@   @", "@@@@ ", "@  @ ", "@   @"],
  S: [" @@@@", "@    ", " @@@ ", "    @", "@@@@ "],
  T: ["@@@@@", "  @  ", "  @  ", "  @  ", "  @  "],
  U: ["@   @", "@   @", "@   @", "@   @", " @@@ "],
  V: ["@   @", "@   @", "@   @", " @ @ ", "  @  "],
  W: ["@   @", "@   @", "@ @ @", "@@ @@", "@   @"],
  X: ["@   @", " @ @ ", "  @  ", " @ @ ", "@   @"],
  Y: ["@   @", " @ @ ", "  @  ", "  @  ", "  @  "],
  Z: ["@@@@@", "   @ ", "  @  ", " @   ", "@@@@@"],
  "0": [" @@@ ", "@  @@", "@ @ @", "@@  @", " @@@ "],
  "1": ["  @  ", " @@  ", "  @  ", "  @  ", "@@@@@"],
  "2": [" @@@ ", "@   @", "   @ ", "  @  ", "@@@@@"],
  "3": ["@@@@ ", "    @", " @@@ ", "    @", "@@@@ "],
  "4": ["@   @", "@   @", "@@@@@", "    @", "    @"],
  "5": ["@@@@@", "@    ", "@@@@ ", "    @", "@@@@ "],
  "6": [" @@@ ", "@    ", "@@@@ ", "@   @", " @@@ "],
  "7": ["@@@@@", "   @ ", "  @  ", " @   ", "@    "],
  "8": [" @@@ ", "@   @", " @@@ ", "@   @", " @@@ "],
  "9": [" @@@ ", "@   @", " @@@@", "    @", " @@@ "],
  "@": [" @@@ ", "@ @ @", "@ @@@", "@    ", " @@@@"],
  "_": ["     ", "     ", "     ", "     ", "@@@@@"],
  ",": ["     ", "     ", "     ", " @@  ", " @   "],
  ".": ["     ", "     ", "     ", " @@  ", " @@  "],
  " ": ["     ", "     ", "     ", "     ", "     "],
};

function renderReceiptNameAscii(name: string) {
  const safeName = (name || "GUEST").toUpperCase().replace(/[^A-Z0-9@_,. ]/g, "").slice(0, 10) || "GUEST";
  const rows = ["", "", "", "", ""];

  for (const character of safeName) {
    const glyph = receiptLetterMap[character] ?? receiptLetterMap[" "];
    glyph.forEach((line, index) => {
      rows[index] += `${line}  `;
    });
  }

  return rows.join("\n");
}

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

type MuseumArtwork = {
  id: string;
  title: string;
  type: string;
  description: string;
  link: string;
  image: string;
  size: [number, number];
  position: [number, number, number];
  rotation: [number, number, number];
  accent: string;
};

const museumExhibits = [
  {
    id: "terraplot",
    title: "TerraPlot",
    type: "GPS Territory Game",
    description: "Movement becomes territory. A map product about walking, play, and place.",
    link: "https://terraplot-chi.vercel.app/en",
    image: "/Terraplot_logo.png",
    size: [1.58, 1.58],
    position: [-4.6, 2.2, -6.82],
    rotation: [0, 0, 0],
    accent: "#8fc7dd",
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    type: "Web / Design",
    description: "A scroll-based interface with baggage, terminal play, desktop UI, and small interactive scenes.",
    link: "https://github.com/mosamosa-ko/portfolio-web",
    image: "/portfolio.png",
    size: [2.28, 1.52],
    position: [0, 2.2, -6.82],
    rotation: [0, 0, 0],
    accent: "#d8edf6",
  },
  {
    id: "graph",
    title: "Graph / AI Research",
    type: "Research",
    description: "Nodes, edges, queries, and machine learning as a research direction.",
    link: "https://github.com/mosamosa-ko",
    image: "/graph.png",
    size: [2.28, 1.52],
    position: [4.6, 2.2, -6.82],
    rotation: [0, 0, 0],
    accent: "#b8d6e6",
  },
  {
    id: "app",
    title: "App Development",
    type: "iOS / Web",
    description: "Small product systems across iOS, web, maps, and interaction.",
    link: "https://github.com/mosamosa-ko",
    image: "/app_dev.png",
    size: [2.28, 1.52],
    position: [-6.82, 2.2, -1.2],
    rotation: [0, Math.PI / 2, 0],
    accent: "#9fd3e6",
  },
] satisfies MuseumArtwork[];

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

function RawGarageModel({
  path,
  targetSize,
  position,
  rotation,
}: {
  path: string;
  targetSize: number;
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  const { scene } = useGLTF(path);

  const normalized = useMemo(() => {
    const model = scene.clone(true);

    model.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      child.geometry.computeVertexNormals();
      child.castShadow = false;
      child.receiveShadow = false;
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
  }, [path, scene, targetSize]);

  return (
    <group position={position} rotation={rotation} scale={normalized.scale}>
      <primitive object={normalized.model} position={[normalized.offset.x, normalized.offset.y, normalized.offset.z]} />
    </group>
  );
}

function RawDeliveryModel({ path, targetSize }: { path: string; targetSize: number }) {
  const { scene } = useGLTF(path);

  const normalized = useMemo(() => {
    const model = scene.clone(true);
    const fullBox = new THREE.Box3().setFromObject(model);
    const fullSize = fullBox.getSize(new THREE.Vector3());
    const visibleBox = new THREE.Box3();

    model.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const meshBox = new THREE.Box3().setFromObject(child);
      const meshSize = meshBox.getSize(new THREE.Vector3());
      const center = meshBox.getCenter(new THREE.Vector3());
      const isLargeFloor =
        meshSize.x > fullSize.x * 0.55 &&
        meshSize.z > fullSize.z * 0.55 &&
        meshSize.y < Math.max(0.08, fullSize.y * 0.08);
      const isFloatingCargo =
        meshSize.x > fullSize.x * 0.12 &&
        meshSize.y > fullSize.y * 0.1 &&
        meshSize.z > fullSize.z * 0.1 &&
        center.y > fullBox.min.y + fullSize.y * 0.42;
      const isLargePanel =
        (meshSize.x > fullSize.x * 0.3 || meshSize.z > fullSize.z * 0.3) &&
        meshSize.y > fullSize.y * 0.16;

      if (isLargeFloor || isFloatingCargo || isLargePanel) {
        child.visible = false;
        return;
      }

      child.castShadow = false;
      child.receiveShadow = false;
      visibleBox.union(meshBox);
    });

    const box = visibleBox.isEmpty() ? new THREE.Box3().setFromObject(model) : visibleBox;
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z) || 1;

    return {
      model,
      scale: targetSize / maxDimension,
      offset: center.multiplyScalar(-1),
    };
  }, [path, scene, targetSize]);

  return (
    <group scale={normalized.scale}>
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
      <RawGarageModel
        path="/models/Alternator.glb"
        targetSize={6.6}
        position={[1.75 + pointer.x * 0.22, 0.05 + pointer.y * 0.12, -0.25]}
        rotation={[
          0.2 + pointer.y * 0.22 + drag.y * 0.26,
          -0.48 + pointer.x * 0.28 + drag.x * 0.3,
          -0.08 + pointer.x * 0.08 + drag.x * 0.1,
        ]}
      />
      <RawGarageModel
        path="/models/bic.glb"
        targetSize={3.2}
        position={[-2.85 - pointer.x * 0.2, -0.95 - pointer.y * 0.1, 0.2]}
        rotation={[
          0.05 - pointer.y * 0.14 - drag.y * 0.22,
          0.22 - pointer.x * 0.22 - drag.x * 0.26,
          -0.4 + pointer.x * 0.12 + drag.x * 0.1,
        ]}
      />
    </group>
  );
}

function DeliveryTrolleyScene() {
  const trolleyRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (trolleyRef.current) {
      const loop = (time * 0.105) % 1;
      trolleyRef.current.position.x = THREE.MathUtils.lerp(-8.2, 8.4, loop);
      trolleyRef.current.position.y = -0.72 + Math.sin(time * 2.1) * 0.02;
      trolleyRef.current.position.z = 0.4 + Math.sin(time * 0.6) * 0.08;
      trolleyRef.current.rotation.y = -0.2 + Math.sin(time * 0.7) * 0.035;
    }
  });

  return (
    <group>
      <group ref={trolleyRef} position={[-8.2, -0.72, 0.4]} rotation={[0, -0.2, 0]}>
        <RawDeliveryModel path="/models/trolley.glb" targetSize={7.4} />
      </group>
    </group>
  );
}

function DeliveryShowcase({ shouldLoadModels }: { shouldLoadModels: boolean }) {
  return (
    <section className="relative min-h-[760px] overflow-hidden bg-[radial-gradient(circle_at_74%_48%,rgba(143,199,221,0.22),transparent_36%),linear-gradient(135deg,#ffffff_0%,#f4fbfd_100%)] px-5 py-16 sm:px-10 lg:px-16">
      <div className="absolute inset-0">
        <Canvas
          className="pointer-events-none"
          camera={{ position: [0, 0.42, 9.2], fov: 34 }}
          dpr={[0.75, 1.25]}
          gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        >
          <ambientLight intensity={1.2} />
          <directionalLight position={[3, 4, 5]} intensity={0.82} />
          <directionalLight position={[-3, 2, 3]} intensity={0.28} color="#d8edf6" />
          {shouldLoadModels ? (
            <GarageErrorBoundary>
              <Suspense fallback={null}>
                <DeliveryTrolleyScene />
              </Suspense>
            </GarageErrorBoundary>
          ) : null}
        </Canvas>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.8)_36%,rgba(255,255,255,0.08)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-[620px] max-w-[1480px] flex-col justify-center">
        <div className="max-w-xl">
        <p className="text-sm font-medium tracking-[-0.01em] text-black/42">Delivery system</p>
        <h3 className="mt-3 font-display text-4xl font-semibold leading-[1.03] tracking-[-0.055em] sm:text-6xl">
          Systems delivered, not just displayed.
        </h3>
        <p className="mt-6 text-[17px] leading-7 text-black/56 sm:text-lg">
          A small trolley moves the packed ideas across the floor: project files, interfaces, and experiments arriving as one system.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-[0.16em] text-[#2f718a]">
          <span className="rounded-full border border-[#8fc7dd]/42 bg-white/76 px-4 py-2">auto delivery</span>
          <span className="rounded-full border border-[#8fc7dd]/42 bg-white/76 px-4 py-2">project cargo</span>
          <span className="rounded-full border border-[#8fc7dd]/42 bg-white/76 px-4 py-2">system in motion</span>
        </div>
        </div>
      </div>
    </section>
  );
}

function ArtworkFrame({ artwork }: { artwork: MuseumArtwork }) {
  const texture = useTexture(artwork.image);
  const [imageWidth, imageHeight] = artwork.size;
  const frameWidth = imageWidth + 0.34;
  const frameHeight = imageHeight + 0.34;

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
  }, [texture]);

  return (
    <group position={artwork.position} rotation={artwork.rotation}>
      <mesh position={[0, 0, -0.045]}>
        <boxGeometry args={[frameWidth + 0.26, frameHeight + 0.26, 0.1]} />
        <meshStandardMaterial color="#d8edf6" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[frameWidth, frameHeight, 0.08]} />
        <meshStandardMaterial color="#ffffff" roughness={0.45} />
      </mesh>
      <mesh position={[0, 0, 0.065]}>
        <planeGeometry args={[imageWidth, imageHeight]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      <mesh position={[0, -frameHeight / 2 - 0.36, 0.08]}>
        <boxGeometry args={[1.42, 0.42, 0.04]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <Text
        position={[0, -frameHeight / 2 - 0.36, 0.12]}
        fontSize={0.12}
        maxWidth={1.18}
        textAlign="center"
        color="#2f718a"
        anchorX="center"
        anchorY="middle"
      >
        {artwork.title.toUpperCase()}
      </Text>
    </group>
  );
}

function MuseumRoom({
  keysRef,
  yawRef,
  avatarYawRef,
  onActiveArtworkChange,
}: {
  keysRef: React.MutableRefObject<Record<string, boolean>>;
  yawRef: React.MutableRefObject<number>;
  avatarYawRef: React.MutableRefObject<number>;
  onActiveArtworkChange: (artwork: MuseumArtwork | null) => void;
}) {
  const playerRef = useRef<THREE.Group>(null);
  const activeIdRef = useRef<string | null>(null);
  const velocity = useMemo(() => new THREE.Vector3(), []);
  const direction = useMemo(() => new THREE.Vector3(), []);
  const forward = useMemo(() => new THREE.Vector3(), []);
  const right = useMemo(() => new THREE.Vector3(), []);
  const targetCamera = useMemo(() => new THREE.Vector3(), []);
  const targetLookAt = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ camera }, delta) => {
    const player = playerRef.current;
    if (!player) return;

    if (keysRef.current.q) yawRef.current += delta * 1.65;
    if (keysRef.current.e) yawRef.current -= delta * 1.65;
    if (keysRef.current.q || keysRef.current.e) avatarYawRef.current = -yawRef.current;

    const yaw = yawRef.current;

    forward.set(Math.sin(yaw), 0, -Math.cos(yaw));
    right.set(Math.cos(yaw), 0, Math.sin(yaw));
    direction.set(0, 0, 0);

    if (keysRef.current.w || keysRef.current.arrowup) direction.add(forward);
    if (keysRef.current.s || keysRef.current.arrowdown) direction.sub(forward);
    if (keysRef.current.a || keysRef.current.arrowleft) direction.sub(right);
    if (keysRef.current.d || keysRef.current.arrowright) direction.add(right);

    if (direction.lengthSq() > 0) {
      direction.normalize();
      avatarYawRef.current = Math.atan2(-direction.x, -direction.z);
      velocity.lerp(direction.multiplyScalar(4.2), 0.18);
    } else {
      velocity.lerp(new THREE.Vector3(0, 0, 0), 0.16);
    }

    player.position.x = THREE.MathUtils.clamp(player.position.x + velocity.x * delta, -5.8, 5.8);
    player.position.z = THREE.MathUtils.clamp(player.position.z + velocity.z * delta, -5.25, 4.2);
    player.rotation.y = THREE.MathUtils.lerp(player.rotation.y, avatarYawRef.current, 0.18);

    targetCamera.set(
      player.position.x - forward.x * 6.1,
      3.75,
      player.position.z - forward.z * 6.1,
    );
    targetLookAt.set(player.position.x + forward.x * 1.6, 1.45, player.position.z + forward.z * 1.6);
    camera.position.lerp(targetCamera, 0.08);
    camera.lookAt(targetLookAt);

    const activeArtwork =
      museumExhibits.find((artwork) => {
        const artworkPosition = new THREE.Vector3(...artwork.position);
        return artworkPosition.distanceTo(player.position) < 3.15;
      }) ?? null;

    if (activeIdRef.current !== (activeArtwork?.id ?? null)) {
      activeIdRef.current = activeArtwork?.id ?? null;
      onActiveArtworkChange(activeArtwork);
    }
  });

  return (
    <>
      <color attach="background" args={["#f8fcfd"]} />
      <ambientLight intensity={1.4} />
      <directionalLight position={[2, 7, 4]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[-5, 3, 2]} intensity={0.22} color="#d8edf6" />
      <pointLight position={[-4, 3.2, -4.8]} intensity={0.95} color="#ffffff" distance={7} />
      <pointLight position={[0, 3.2, -4.8]} intensity={0.75} color="#e8f7fb" distance={7} />
      <pointLight position={[4, 3.2, -4.8]} intensity={0.95} color="#ffffff" distance={7} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -0.6]} receiveShadow>
        <planeGeometry args={[14.5, 13]} />
        <meshStandardMaterial color="#fbfeff" roughness={0.78} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, -1.35]}>
        <planeGeometry args={[9.4, 7.8]} />
        <meshBasicMaterial color="#eef7fa" transparent opacity={0.58} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.035, -1.35]}>
        <ringGeometry args={[2.05, 2.1, 96]} />
        <meshBasicMaterial color="#8fc7dd" transparent opacity={0.28} />
      </mesh>

      <mesh position={[0, 2.15, -7.05]}>
        <boxGeometry args={[14.5, 4.3, 0.18]} />
        <meshStandardMaterial color="#f7fbfc" roughness={0.8} />
      </mesh>
      <mesh position={[-7.15, 2.15, -0.6]}>
        <boxGeometry args={[0.18, 4.3, 13]} />
        <meshStandardMaterial color="#f8fbfc" roughness={0.8} />
      </mesh>
      <mesh position={[7.15, 2.15, -0.6]}>
        <boxGeometry args={[0.18, 4.3, 13]} />
        <meshStandardMaterial color="#f8fbfc" roughness={0.8} />
      </mesh>

      <gridHelper args={[14, 14, "#d8edf6", "#eef7fa"]} position={[0, 0.01, -0.6]} />

      {[-4.6, 0, 4.6].map((x) => (
        <group key={x} position={[x, 4.08, -5.35]}>
          <mesh>
            <boxGeometry args={[1.4, 0.12, 0.5]} />
            <meshStandardMaterial color="#ffffff" roughness={0.45} />
          </mesh>
          <mesh position={[0, -0.1, 0]}>
            <coneGeometry args={[0.62, 0.36, 32, 1, true]} />
            <meshBasicMaterial color="#d8edf6" transparent opacity={0.36} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}

      <group position={[0, 0.22, -2.1]}>
        <mesh>
          <boxGeometry args={[2.75, 0.25, 0.72]} />
          <meshStandardMaterial color="#ffffff" roughness={0.62} />
        </mesh>
        <mesh position={[-1.08, -0.24, -0.18]}>
          <boxGeometry args={[0.16, 0.48, 0.16]} />
          <meshStandardMaterial color="#d8edf6" roughness={0.6} />
        </mesh>
        <mesh position={[1.08, -0.24, 0.18]}>
          <boxGeometry args={[0.16, 0.48, 0.16]} />
          <meshStandardMaterial color="#d8edf6" roughness={0.6} />
        </mesh>
      </group>

      <group position={[3.75, 0.72, -1.1]}>
        <mesh>
          <cylinderGeometry args={[0.52, 0.62, 0.92, 32]} />
          <meshStandardMaterial color="#ffffff" roughness={0.56} />
        </mesh>
        <mesh position={[0, 0.54, 0]}>
          <sphereGeometry args={[0.36, 32, 16]} />
          <meshBasicMaterial color="#9fd3e6" transparent opacity={0.52} />
        </mesh>
        <Text
          position={[0, -0.03, 0.54]}
          fontSize={0.1}
          color="#2f718a"
          anchorX="center"
          anchorY="middle"
        >
          OBJECT
        </Text>
      </group>

      <Suspense fallback={null}>
        {museumExhibits.map((artwork) => (
          <ArtworkFrame key={artwork.id} artwork={artwork} />
        ))}
      </Suspense>

      <group ref={playerRef} position={[0, 0.05, 2.5]}>
        <GarageErrorBoundary>
          <Suspense fallback={null}>
            <RawGarageModel
              path="/models/human.glb"
              targetSize={1.72}
              position={[0, 0.88, 0]}
              rotation={[0, Math.PI, 0]}
            />
          </Suspense>
        </GarageErrorBoundary>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
          <ringGeometry args={[0.42, 0.52, 32]} />
          <meshBasicMaterial color="#8fc7dd" transparent opacity={0.34} />
        </mesh>
      </group>
    </>
  );
}

function MiniMuseum() {
  const museumRef = useRef<HTMLDivElement>(null);
  const keysRef = useRef<Record<string, boolean>>({});
  const yawRef = useRef(0);
  const avatarYawRef = useRef(0);
  const viewDragRef = useRef({ active: false, x: 0 });
  const [activeArtwork, setActiveArtwork] = useState<MuseumArtwork | null>(null);

  const setKey = (key: string, isPressed: boolean) => {
    const normalized = key.toLowerCase();
    if (!["w", "a", "s", "d", "q", "e", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(normalized)) return;
    keysRef.current[normalized] = isPressed;
  };

  const pressControl = (key: string) => (event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    museumRef.current?.focus();
    event.currentTarget.setPointerCapture(event.pointerId);
    setKey(key, true);
  };

  const releaseControl = (key: string) => (event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setKey(key, false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  useEffect(() => {
    const stopMovement = (event: KeyboardEvent) => {
      setKey(event.key, false);
    };
    const clearMovement = () => {
      keysRef.current = {};
      viewDragRef.current.active = false;
    };

    window.addEventListener("keyup", stopMovement);
    window.addEventListener("blur", clearMovement);
    return () => {
      window.removeEventListener("keyup", stopMovement);
      window.removeEventListener("blur", clearMovement);
    };
  }, []);

  return (
    <div
      ref={museumRef}
      role="application"
      tabIndex={0}
      aria-label="Third-person portfolio museum"
      onKeyDown={(event) => {
        setKey(event.key, true);
        const normalized = event.key.toLowerCase();
        if (["w", "a", "s", "d", "q", "e", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(normalized)) {
          event.preventDefault();
        }
      }}
      onKeyUp={(event) => {
        setKey(event.key, false);
      }}
      onBlur={() => {
        keysRef.current = {};
        viewDragRef.current.active = false;
      }}
      className="relative h-[100svh] min-h-[760px] select-none overflow-hidden border-y border-[#8fc7dd]/34 bg-[#f8fcfd] shadow-[0_24px_80px_rgba(95,159,186,0.12)] outline-none"
    >
      <Canvas
        camera={{ position: [0, 3.7, 8.6], fov: 46 }}
        dpr={[0.75, 1.4]}
        gl={{ antialias: true, alpha: false, powerPreference: "low-power" }}
      >
        <MuseumRoom
          keysRef={keysRef}
          yawRef={yawRef}
          avatarYawRef={avatarYawRef}
          onActiveArtworkChange={setActiveArtwork}
        />
      </Canvas>

      <div
        className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
        onPointerDown={(event) => {
          event.preventDefault();
          museumRef.current?.focus();
          keysRef.current = {};
          event.currentTarget.setPointerCapture(event.pointerId);
          viewDragRef.current = { active: true, x: event.clientX };
        }}
        onPointerMove={(event) => {
          if (!viewDragRef.current.active) return;
          event.preventDefault();
          const deltaX = event.clientX - viewDragRef.current.x;
          viewDragRef.current = { active: true, x: event.clientX };
          yawRef.current -= deltaX * 0.0075;
          avatarYawRef.current = -yawRef.current;
        }}
        onPointerUp={(event) => {
          viewDragRef.current.active = false;
          event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={() => {
          viewDragRef.current.active = false;
        }}
      />

      <div className="pointer-events-none absolute left-4 top-4 z-20 rounded-full border border-[#8fc7dd]/34 bg-white/78 px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-black/46 backdrop-blur-sm sm:left-5 sm:top-5 sm:px-4 sm:text-[0.64rem] sm:tracking-[0.18em]">
        <span className="sm:hidden">Drag to look / buttons to walk</span>
        <span className="hidden sm:inline">WASD to walk / drag or Q E to turn camera</span>
      </div>

      <div className="absolute bottom-4 left-4 z-30 grid grid-cols-3 gap-2 sm:hidden">
        <span />
        <button
          type="button"
          aria-label="Move forward"
          onPointerDown={pressControl("w")}
          onPointerUp={releaseControl("w")}
          onPointerCancel={releaseControl("w")}
          className="h-12 w-12 rounded-full border border-[#8fc7dd]/46 bg-white/82 font-mono text-xs uppercase tracking-[0.12em] text-[#2f718a] shadow-[0_12px_30px_rgba(95,159,186,0.16)] backdrop-blur-sm"
        >
          W
        </button>
        <span />
        <button
          type="button"
          aria-label="Move left"
          onPointerDown={pressControl("a")}
          onPointerUp={releaseControl("a")}
          onPointerCancel={releaseControl("a")}
          className="h-12 w-12 rounded-full border border-[#8fc7dd]/46 bg-white/82 font-mono text-xs uppercase tracking-[0.12em] text-[#2f718a] shadow-[0_12px_30px_rgba(95,159,186,0.16)] backdrop-blur-sm"
        >
          A
        </button>
        <button
          type="button"
          aria-label="Move backward"
          onPointerDown={pressControl("s")}
          onPointerUp={releaseControl("s")}
          onPointerCancel={releaseControl("s")}
          className="h-12 w-12 rounded-full border border-[#8fc7dd]/46 bg-white/82 font-mono text-xs uppercase tracking-[0.12em] text-[#2f718a] shadow-[0_12px_30px_rgba(95,159,186,0.16)] backdrop-blur-sm"
        >
          S
        </button>
        <button
          type="button"
          aria-label="Move right"
          onPointerDown={pressControl("d")}
          onPointerUp={releaseControl("d")}
          onPointerCancel={releaseControl("d")}
          className="h-12 w-12 rounded-full border border-[#8fc7dd]/46 bg-white/82 font-mono text-xs uppercase tracking-[0.12em] text-[#2f718a] shadow-[0_12px_30px_rgba(95,159,186,0.16)] backdrop-blur-sm"
        >
          D
        </button>
      </div>

      <div className="pointer-events-none absolute left-4 right-4 top-[4.6rem] z-20 grid gap-3 sm:bottom-5 sm:left-auto sm:right-5 sm:top-auto sm:w-[390px]">
        {activeArtwork ? (
          <div className="border border-[#8fc7dd]/38 bg-white/88 p-4 shadow-[0_18px_60px_rgba(95,159,186,0.14)] backdrop-blur-sm sm:p-5">
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[#2f718a]">near artwork</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.055em] sm:text-3xl">{activeArtwork.title}</h3>
            <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-black/38">{activeArtwork.type}</p>
            <p className="mt-3 text-sm leading-5 text-black/58 sm:mt-4 sm:leading-6">{activeArtwork.description}</p>
            <a
              href={activeArtwork.link}
              target="_blank"
              rel="noreferrer"
              className="pointer-events-auto mt-4 inline-flex rounded-full border border-[#8fc7dd]/54 bg-white px-4 py-2 text-sm font-medium text-[#2f718a] transition hover:border-[#2f718a]/60 hover:text-[#164d61] sm:mt-5"
            >
              Open project
            </a>
          </div>
        ) : (
          <div className="border border-[#8fc7dd]/28 bg-white/72 p-4 font-mono text-xs uppercase tracking-[0.14em] text-black/42 backdrop-blur-sm">
            Walk close to an artwork to inspect it.
          </div>
        )}
      </div>
    </div>
  );
}

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const dragRef = useRef({ active: false, x: 0, y: 0 });
  const [shouldLoadGarage, setShouldLoadGarage] = useState(false);
  const [pointer, setPointer] = useState<PointerState>({ x: 0, y: 0 });
  const [drag, setDrag] = useState<DragState>({ x: 0, y: 0 });
  const [receiptMeta, setReceiptMeta] = useState({ date: "loading...", order: "#----" });
  const [receiptName, setReceiptName] = useState("");
  const [receiptPrinted, setReceiptPrinted] = useState(false);
  const [printProgress, setPrintProgress] = useState(0);
  const displayReceiptName = receiptName.trim() || "GUEST";
  const receiptNameAscii = useMemo(() => renderReceiptNameAscii(displayReceiptName), [displayReceiptName]);

  const printReceipt = () => {
    setReceiptPrinted(false);
    setPrintProgress(0);
    window.setTimeout(() => {
      setReceiptPrinted(true);
    }, 80);
  };

  useEffect(() => {
    const openedAt = new Date();
    const date = new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(openedAt);
    const order = `#${String(openedAt.getMonth() + 1).padStart(2, "0")}${String(openedAt.getDate()).padStart(2, "0")}${String(openedAt.getHours()).padStart(2, "0")}${String(openedAt.getMinutes()).padStart(2, "0")}`;

    setReceiptMeta({ date, order });
  }, []);

  useEffect(() => {
    if (!receiptPrinted) return undefined;

    let animationFrame = 0;
    const startedAt = performance.now();
    const duration = 9800;

    const tick = (now: number) => {
      const nextProgress = Math.min((now - startedAt) / duration, 1);
      setPrintProgress(nextProgress);
      if (nextProgress < 1) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    };

    setPrintProgress(0);
    animationFrame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [receiptPrinted]);

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
        <div className="mx-auto max-w-[1480px] border-t border-[#8fc7dd]/28 pt-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
            <div>
              <p className="text-sm font-medium tracking-[-0.01em] text-black/42">Portfolio museum</p>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-6xl">
                Walk through the projects.
              </h2>
              <p className="mt-6 max-w-md text-[17px] leading-7 text-black/56">
                A small third-person room where each artwork acts like a project exhibit. Move close to inspect the work.
              </p>
            </div>
          </div>

          <div className="mx-[calc(50%-50vw)] mt-10">
            <MiniMuseum />
          </div>

          <div className="mx-[calc(50%-50vw)] mt-20">
            <DeliveryShowcase shouldLoadModels={shouldLoadGarage} />
          </div>

          <div className="mt-20 grid gap-8 lg:grid-cols-[1fr_390px] lg:items-start">
            <div>
              <p className="text-sm font-medium tracking-[-0.01em] text-black/42">Museum shop</p>
              <h3 className="mt-3 font-display text-4xl font-semibold leading-[1.06] tracking-[-0.055em] sm:text-5xl">
                Take the receipt on the way out.
              </h3>
              <p className="mt-5 max-w-md text-[17px] leading-7 text-black/54">
                The final counter turns the visit into a small checkout slip, like buying a print from the museum shop.
              </p>
              <label className="mt-8 block max-w-sm">
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-black/36">
                  Add your name to the receipt
                </span>
                <input
                  value={receiptName}
                  onChange={(event) => {
                    setReceiptName(event.target.value.replace(/[^a-zA-Z0-9@_,. ]/g, "").slice(0, 14));
                  }}
                  placeholder="TYPE YOUR NAME"
                  className="mt-3 w-full border border-[#8fc7dd]/42 bg-white px-4 py-3 font-mono text-xs uppercase tracking-[0.14em] text-black/72 shadow-[0_16px_40px_rgba(95,159,186,0.08)] outline-none transition placeholder:text-black/24 focus:border-[#2f718a]/58"
                />
                <p className="mt-2 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-black/30">
                  A-Z / 0-9 / @ _ , . / printed as receipt ASCII.
                </p>
              </label>

              <button
                type="button"
                onClick={printReceipt}
                className="mt-8 inline-flex rounded-full border border-[#8fc7dd]/46 bg-white px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-[#2f718a] shadow-[0_16px_42px_rgba(95,159,186,0.1)] transition hover:border-[#2f718a]/58"
              >
                Print receipt
              </button>
            </div>

            <div className="mx-auto w-full max-w-[390px] border border-[#8fc7dd]/30 bg-[#f8fcfd] p-3 shadow-[0_22px_70px_rgba(95,159,186,0.16)]">
              {!receiptPrinted ? (
                <div className="mx-auto grid min-h-[360px] w-full max-w-[390px] place-items-center border border-dashed border-[#8fc7dd]/36 bg-white/64 p-8 text-center font-mono text-[0.62rem] uppercase tracking-[0.18em] text-black/34">
                  <span>
                    receipt not printed
                    <br />
                    press print receipt
                  </span>
                </div>
              ) : null}
              <div
                className="mx-auto w-full max-w-[390px] origin-top overflow-hidden"
                style={{
                  height: receiptPrinted ? `${Math.max(24, Math.round(printProgress * 970))}px` : 0,
                  opacity: receiptPrinted ? 1 : 0,
                  transition: receiptPrinted ? "none" : "opacity 200ms ease",
                }}
              >
            <div className="relative bg-white px-5 py-7 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-black/62 shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
              <div
                className={`pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#8fc7dd]/18 to-transparent transition-opacity delay-300 duration-500 ${
                  receiptPrinted ? "opacity-100" : "opacity-0"
                }`}
              />
              <div className="-mx-5 -mt-7 mb-6 flex h-4 overflow-hidden">
                {Array.from({ length: 18 }).map((_, index) => (
                  <span key={index} className="h-4 flex-1 rounded-b-full bg-white" />
                ))}
              </div>

              <div className="text-center">
                <p className="text-[0.95rem] tracking-[0.24em] text-[#2f718a]">PORTFOLIO RECEIPT</p>
                <p className="mt-2 text-[0.62rem] tracking-[0.16em] text-black/42">museum shop / checkout 01</p>
                <p className="mt-1 text-[0.62rem] tracking-[0.16em] text-black/34">koyamasaki.com</p>
              </div>

              <div className="my-5 flex justify-center border-y border-dashed border-black/18 py-4" translate="no">
                <img
                  src="/name_logo_transparent.png"
                  alt="Ko Yamasaki"
                  className="h-16 w-auto object-contain opacity-70"
                />
              </div>

              <div className="my-5 border-y border-dashed border-black/18 py-4 text-center" translate="no">
                <p className="text-[0.58rem] tracking-[0.2em] text-black/34">issued to</p>
                <pre className="mx-auto mt-2 max-w-full overflow-hidden whitespace-pre text-center font-mono text-[0.26rem] leading-[0.34rem] tracking-[-0.055em] text-[#2f718a]/78">
                  {receiptNameAscii}
                </pre>
              </div>

              <div className="my-5 border-y border-dashed border-black/22 py-3 text-[0.64rem] leading-5 text-black/44">
                <div className="flex justify-between">
                  <span>date</span>
                  <span className="text-right">{receiptMeta.date}</span>
                </div>
                <div className="flex justify-between">
                  <span>souvenir</span>
                  <span>Portfolio System</span>
                </div>
                <div className="flex justify-between">
                  <span>cashier</span>
                  <span>ko yamasaki</span>
                </div>
                <div className="flex justify-between">
                  <span>order</span>
                  <span>{receiptMeta.order}</span>
                </div>
              </div>

              {[
                ["01", "Terraplot", "GPS territory game", "¥ 000"],
                ["02", "App Dev", "iOS / web products", "¥ 000"],
                ["03", "Graph AI", "nodes / queries", "¥ 000"],
                ["04", "3D Interface", "x-ray suitcase", "¥ 000"],
                ["05", "Human Side", "curiosity + humor", "¥ 000"],
              ].map(([id, item, description, price]) => (
                <div key={id} className="grid grid-cols-[2.2rem_1fr_auto] gap-3 border-b border-dashed border-black/18 py-3">
                  <span className="text-black/34">{id}</span>
                  <span>
                    <span className="block text-black/74">{item}</span>
                    <span className="mt-1 block text-[0.58rem] tracking-[0.14em] text-black/34">{description}</span>
                  </span>
                  <span className="text-right text-black/42">{price}</span>
                </div>
              ))}

              <div className="mt-6 space-y-2 border-y border-dashed border-black/22 py-4">
                <div className="flex justify-between text-black/46">
                  <span>subtotal</span>
                  <span>¥ 000</span>
                </div>
                <div className="flex justify-between text-black/46">
                  <span>tax</span>
                  <span>curiosity</span>
                </div>
                <div className="flex justify-between pt-2 text-base tracking-[0.16em] text-[#2f718a]">
                  <span>total</span>
                  <span>thank you</span>
                </div>
              </div>

              <p className="mt-6 text-center text-[0.62rem] leading-5 tracking-[0.16em] text-black/38">
                no refund needed. please keep building.
              </p>
              <div className="mt-6 h-10 bg-[repeating-linear-gradient(90deg,#111_0,#111_1px,transparent_1px,transparent_4px,#111_4px,#111_6px,transparent_6px,transparent_9px)] opacity-22" />
              <p className="mt-3 text-center text-[0.56rem] tracking-[0.22em] text-black/30">THANK YOU FOR VISITING</p>

              <div className="-mx-5 -mb-7 mt-7 flex h-4 rotate-180 overflow-hidden">
                {Array.from({ length: 18 }).map((_, index) => (
                  <span key={index} className="h-4 flex-1 rounded-b-full bg-white" />
                ))}
              </div>
            </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-[76vh] overflow-hidden bg-[#111] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/woman.jpg')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.18)_42%,rgba(0,0,0,0.54)_100%)]" />
        <div className="relative z-10 flex min-h-[76vh] items-end px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
          <div className="max-w-2xl">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-white/54">Final frame</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-[-0.055em] text-white sm:text-6xl">
              Small happiness, found in ordinary days.
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-white/72 sm:text-lg">
              Life, time, and the quiet moments I do not want to miss.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-white px-6 py-10 text-[#1d1d1f] sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1440px] border-t border-black/12 pt-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-3">
              <div className="inline-flex w-fit">
                <img src="/name_logo_transparent.png" alt="Ko Yamasaki" className="h-10 w-auto object-contain" />
              </div>
              <span className="text-xs uppercase tracking-[0.16em] text-black/36">© 2026 Ko Yamasaki</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <p className="w-full text-sm leading-6 text-black/46 md:w-auto md:pr-2">
                For work, collaboration, or inquiries.
              </p>
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
