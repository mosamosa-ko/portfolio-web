type ObjectProps = {
  intensity: number;
};

export function AppDevelopmentObject({ intensity }: ObjectProps) {
  return (
    <group position={[0.55, 0.03, 0]}>
      <mesh position={[0.02, 0.15, 0]}>
        <boxGeometry args={[0.28, 0.46, 0.05]} />
        <meshBasicMaterial color="#b5fbff" transparent opacity={0.26 + intensity * 0.45} />
      </mesh>
      <mesh position={[-0.2, -0.02, 0.06]}>
        <boxGeometry args={[0.32, 0.18, 0.03]} />
        <meshBasicMaterial color="#8ff4ff" wireframe transparent opacity={0.3 + intensity * 0.45} />
      </mesh>
      <mesh position={[0.22, -0.08, -0.08]}>
        <boxGeometry args={[0.24, 0.14, 0.03]} />
        <meshBasicMaterial color="#e9fdff" transparent opacity={0.18 + intensity * 0.45} />
      </mesh>
    </group>
  );
}
