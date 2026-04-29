type XrayScannerProps = {
  scanProgress: number;
};

export function XrayScanner({ scanProgress }: XrayScannerProps) {
  const active = scanProgress > 0.28 && scanProgress < 0.74;

  return (
    <group position={[-1.95, -0.02, -0.16]}>
      <mesh position={[0, 0, -0.3]}>
        <boxGeometry args={[2.64, 3.42, 1.28]} />
        <meshBasicMaterial color="#080808" transparent opacity={0.96} />
      </mesh>
      <mesh>
        <boxGeometry args={[2.78, 3.56, 1.42]} />
        <meshBasicMaterial color="#d8d8d8" transparent opacity={0.24} wireframe />
      </mesh>
      <mesh position={[0, 0, -0.14]}>
        <boxGeometry args={[1.82, 2.4, 0.82]} />
        <meshBasicMaterial color="#040404" transparent opacity={0.94} />
      </mesh>
      <mesh position={[0, 0, -0.08]}>
        <boxGeometry args={[1.86, 2.44, 0.86]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.08} wireframe />
      </mesh>
      <mesh position={[0.96, 1.16, 0.34]}>
        <boxGeometry args={[0.34, 0.22, 0.02]} />
        <meshBasicMaterial color="#cba67a" transparent opacity={0.18} />
      </mesh>
      <mesh position={[0.96, 1.16, 0.35]}>
        <boxGeometry args={[0.34, 0.22, 0.02]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.12} wireframe />
      </mesh>
      {active ? (
        <>
          <mesh position={[1.14, -0.08, 0.26]}>
            <planeGeometry args={[0.04, 2.98]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.92} />
          </mesh>
          <mesh position={[1.14, -0.08, 0.2]}>
            <planeGeometry args={[0.42, 3.12]} />
            <meshBasicMaterial color="#d9e0d8" transparent opacity={0.1} />
          </mesh>
        </>
      ) : null}
    </group>
  );
}
