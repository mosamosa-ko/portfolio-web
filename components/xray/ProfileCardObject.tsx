type ObjectProps = {
  intensity: number;
};

export function ProfileCardObject({ intensity }: ObjectProps) {
  return (
    <group position={[0.02, -0.28, 0]}>
      <mesh>
        <boxGeometry args={[0.76, 0.42, 0.03]} />
        <meshBasicMaterial color="#d7fdff" transparent opacity={0.18 + intensity * 0.36} />
      </mesh>
      <mesh position={[-0.18, 0.05, 0.03]}>
        <boxGeometry args={[0.12, 0.12, 0.01]} />
        <meshBasicMaterial color="#9cf8ff" transparent opacity={0.28 + intensity * 0.45} />
      </mesh>
      {[-0.02, -0.08, -0.14, -0.2].map((y, index) => (
        <mesh key={index} position={[0.1, y, 0.03]}>
          <boxGeometry args={[0.34 - index * 0.03, 0.018, 0.01]} />
          <meshBasicMaterial color="#effcff" transparent opacity={0.2 + intensity * 0.42} />
        </mesh>
      ))}
    </group>
  );
}
