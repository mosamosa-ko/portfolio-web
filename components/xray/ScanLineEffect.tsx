type ScanLineEffectProps = {
  scanProgress: number;
};

export function ScanLineEffect({ scanProgress }: ScanLineEffectProps) {
  const suitcaseX = -4.6 + (2.3 - -4.6) * scanProgress;
  const alpha = scanProgress > 0.28 && scanProgress < 0.74 ? 0.9 : 0.36;

  return (
    <group position={[suitcaseX + 0.18, -0.24, 0.9]}>
      <mesh>
        <planeGeometry args={[0.04, 3.18]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={alpha} />
      </mesh>
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[0.38, 3.32]} />
        <meshBasicMaterial color="#dbe2db" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}
