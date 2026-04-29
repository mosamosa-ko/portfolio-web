type ObjectProps = {
  intensity: number;
};

const points = [
  [-0.2, -0.1, 0],
  [0.1, 0.18, 0.14],
  [0.25, -0.12, -0.12],
  [-0.02, 0.3, -0.14],
];

export function GraphResearchObject({ intensity }: ObjectProps) {
  return (
    <group position={[0.16, 0.08, 0]}>
      {points.map((point, index) => (
        <mesh key={index} position={point as [number, number, number]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#dffcff" transparent opacity={0.42 + intensity * 0.52} />
        </mesh>
      ))}
      <mesh position={[0, 0.06, 0]} rotation={[0.5, 0.45, 0.2]}>
        <torusKnotGeometry args={[0.18, 0.016, 80, 12]} />
        <meshBasicMaterial color="#7ae8f5" wireframe transparent opacity={0.18 + intensity * 0.35} />
      </mesh>
    </group>
  );
}
