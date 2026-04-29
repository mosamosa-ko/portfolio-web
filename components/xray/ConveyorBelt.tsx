export function ConveyorBelt() {
  return (
    <group position={[0.1, -1.88, -0.26]}>
      <mesh>
        <boxGeometry args={[13.6, 1.02, 1.92]} />
        <meshBasicMaterial color="#090909" transparent opacity={0.96} />
      </mesh>
      <mesh position={[0, 0.14, 0]}>
        <boxGeometry args={[13.3, 0.12, 1.66]} />
        <meshBasicMaterial color="#1a1a1a" transparent opacity={0.34} />
      </mesh>
      {Array.from({ length: 18 }).map((_, index) => {
        const x = -6.5 + index * 0.76;
        return (
          <group key={x} position={[x, -0.12, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.19, 0.19, 1.72, 24]} />
              <meshBasicMaterial color="#d7d7d7" transparent opacity={0.16} wireframe />
            </mesh>
            <mesh position={[0, 0.25, 0]}>
              <boxGeometry args={[0.54, 0.03, 1.44]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.04} />
            </mesh>
          </group>
        );
      })}
      {[-1.08, -0.36, 0.36, 1.08].map((z) => (
        <mesh key={z} position={[0, 0.2, z]}>
          <boxGeometry args={[13.2, 0.016, 0.02]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.06} />
        </mesh>
      ))}
    </group>
  );
}
