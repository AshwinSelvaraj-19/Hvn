import { Grid } from '@react-three/drei'

/**
 * Phase 0 scaffold: neutral ground + lights so the player controller
 * and camera can be verified. This is NOT an environment — Phase 1
 * replaces it with The Arrival and each real location scene.
 */
export function DevelopmentScaffold() {
  return (
    <group>
      <ambientLight intensity={0.45} />
      <directionalLight
        position={[12, 24, 8]}
        intensity={1.4}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Ground plane — the world floor every location stands on. */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#121218" roughness={0.95} metalness={0} />
      </mesh>

      {/* Reference grid — helps verify movement until real geometry lands. */}
      <Grid
        position={[0, 0.01, 0]}
        cellSize={1}
        cellThickness={0.6}
        cellColor="#2a2a33"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#3d3d4a"
        fadeDistance={45}
        fadeStrength={1.5}
        infiniteGrid
      />
    </group>
  )
}