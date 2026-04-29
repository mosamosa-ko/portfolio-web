type ObjectProps = {
  intensity: number;
};

export function TerraplotObject({ intensity }: ObjectProps) {
  return (
    <group position={[-0.56, 0.1, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.75, 0.52, 4, 4]} />
        <meshBasicMaterial color="#9ef9ff" wireframe transparent opacity={0.3 + intensity * 0.45} />
      </mesh>
      <mesh position={[0.12, 0.18, 0.1]}>
        <coneGeometry args={[0.06, 0.16, 12]} />
        <meshBasicMaterial color="#effcff" transparent opacity={0.4 + intensity * 0.5} />
      </mesh>
      <mesh position={[-0.18, 0.08, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.15, 0.018, 8, 32, Math.PI * 1.3]} />
        <meshBasicMaterial color="#8ff4ff" transparent opacity={0.25 + intensity * 0.45} />
      </mesh>
    </group>
  );
}
