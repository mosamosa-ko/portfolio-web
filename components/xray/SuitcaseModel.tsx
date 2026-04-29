"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import {
  Box3,
  DoubleSide,
  EdgesGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  Vector3,
} from "three";

type SuitcaseModelProps = {
  scanProgress: number;
  activeIndex: number;
};

const XRAY_COLORS = {
  shell: "#eef8fb",
  shellEdge: "#8ab8ca",
  inner: "#91bacb",
  innerHighlight: "#b7d6e2",
};

const XRAY_OPACITY = {
  shell: 0.012,
  shellEdge: 0.24,
  inner: 0.52,
};

function isShellMesh(mesh: Mesh) {
  const parentName = mesh.parent?.name ?? "";
  const name = `${mesh.name} ${parentName}`.toLowerCase();

  return /(bindedtrim|suitcase|case|shell|trim|wheel|handle|cube\.001|cube\.031|cylinder\.001)/i.test(name);
}

function isUnwantedSceneMesh(mesh: Mesh) {
  const name = mesh.name.toLowerCase();
  if (/(plane|background|floor|adapter|scene)/i.test(name)) return true;

  const bounds = new Box3().setFromObject(mesh);
  const size = bounds.getSize(new Vector3());
  const dimensions = [size.x, size.y, size.z].sort((a, b) => a - b);
  const isLargeFlatPlane = dimensions[0] < 0.035 && dimensions[1] > 2.2 && dimensions[2] > 2.2;

  return isLargeFlatPlane && !isShellMesh(mesh);
}

function disposeMaterial(mesh: Mesh) {
  const material = mesh.material;

  if (Array.isArray(material)) {
    material.forEach((item) => item.dispose?.());
    return;
  }

  material?.dispose?.();
}

function overrideXrayMaterials(root: Object3D) {
  root.updateMatrixWorld(true);

  root.traverse((child) => {
    if (!(child instanceof Mesh)) return;

    const mesh = child as Mesh;

    if (isUnwantedSceneMesh(mesh)) {
      mesh.visible = false;
      return;
    }

    disposeMaterial(mesh);
    mesh.children
      .filter((item) => item.name.endsWith("-soft-edge"))
      .forEach((item) => {
        if (item instanceof LineSegments) {
          item.geometry.dispose();
          if (Array.isArray(item.material)) {
            item.material.forEach((material) => material.dispose());
          } else {
            item.material.dispose();
          }
        }
        mesh.remove(item);
      });

    if (isShellMesh(mesh)) {
      mesh.material = new MeshBasicMaterial({
        color: XRAY_COLORS.shell,
        transparent: true,
        opacity: XRAY_OPACITY.shell,
        depthWrite: false,
        side: DoubleSide,
      });
      mesh.renderOrder = 1;

      const edgeLines = new LineSegments(
        new EdgesGeometry(mesh.geometry, 20),
        new LineBasicMaterial({
          color: XRAY_COLORS.shellEdge,
          transparent: true,
          opacity: XRAY_OPACITY.shellEdge,
          depthWrite: false,
        }),
      );
      edgeLines.name = `${mesh.name}-soft-edge`;
      edgeLines.renderOrder = 3;
      mesh.add(edgeLines);
    } else {
      mesh.material = new MeshStandardMaterial({
        color: XRAY_COLORS.inner,
        transparent: true,
        opacity: XRAY_OPACITY.inner,
        roughness: 0.5,
        metalness: 0.02,
        emissive: XRAY_COLORS.innerHighlight,
        emissiveIntensity: 0.08,
        depthWrite: false,
        side: DoubleSide,
      });
      mesh.renderOrder = 2;
    }

    mesh.castShadow = false;
    mesh.receiveShadow = false;
  });
}

function normalizeScene(root: Object3D) {
  root.updateMatrixWorld(true);

  const bounds = new Box3().setFromObject(root);
  const size = new Vector3();
  const center = new Vector3();
  bounds.getSize(size);
  bounds.getCenter(center);

  const maxDimension = Math.max(size.x, size.y, size.z, 0.001);

  return {
    offset: center.multiplyScalar(-1),
    scale: 6.0 / maxDimension,
  };
}

function GlbSuitcase({ scanProgress }: SuitcaseModelProps) {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF("/models/new_suitcase.glb");
  const model = useMemo(() => scene.clone(true), [scene]);
  const normalized = useMemo(() => normalizeScene(model), [model]);

  useEffect(() => {
    overrideXrayMaterials(model);
  }, [model]);

  useFrame((state) => {
    if (!groupRef.current) return;

    groupRef.current.position.x = MathUtils.lerp(-6, 6, scanProgress);
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 4.4) * 0.01 - 0.2;
  });

  return (
    <group ref={groupRef}>
      <group rotation={[0, -Math.PI / 2, 0]} scale={normalized.scale}>
        <primitive object={model} position={[normalized.offset.x, normalized.offset.y, normalized.offset.z]} />
      </group>
    </group>
  );
}

export function SuitcaseModel(props: SuitcaseModelProps) {
  return (
    <Suspense fallback={null}>
      <GlbSuitcase {...props} />
    </Suspense>
  );
}

useGLTF.preload("/models/new_suitcase.glb");
