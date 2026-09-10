import { gold, marble, marbleDark, roof, stoneTrim, windowWarm, woodDark } from './materials'

/** A warm window glow on a building face. */
function Window({ x, y, z, rotY = 0 }: { x: number; y: number; z: number; rotY?: number }) {
  return (
    <mesh position={[x, y, z]} rotation-y={rotY} material={windowWarm}>
      <boxGeometry args={[0.7, 1.0, 0.05]} />
    </mesh>
  )
}

/** A refined column. */
function Column({ x, z, h = 3.2, r = 0.2 }: { x: number; z: number; h?: number; r?: number }) {
  return (
    <mesh position={[x, h / 2, z]} castShadow material={marble}>
      <cylinderGeometry args={[r * 0.8, r, h, 10]} />
    </mesh>
  )
}

/**
 * The Founder's Sanctum main building — elegant white stone with
 * restrained gold accents, arches, columns, and human-scale proportions.
 */
export function FounderArchitecture() {
  return (
    <group>
      {/* Main building shell */}
      <group position={[0, 0, -10]}>
        {/* Walls */}
        <mesh position={[0, 2.2, 0]} castShadow material={marble}>
          <boxGeometry args={[10.4, 4.4, 8.4]} />
        </mesh>

        {/* Roof — gentle hipped form */}
        <mesh position={[0, 4.8, 0]} castShadow material={roof}>
          <coneGeometry args={[6.2, 1.6, 4]} />
        </mesh>

        {/* Gold trim at roofline */}
        <mesh position={[0, 4.05, 0]} material={gold}>
          <boxGeometry args={[10.6, 0.1, 8.6]} />
        </mesh>

        {/* Entrance portico */}
        <Column x={-3} z={4.6} h={3.8} r={0.22} />
        <Column x={-1.5} z={4.6} h={3.8} r={0.22} />
        <Column x={1.5} z={4.6} h={3.8} r={0.22} />
        <Column x={3} z={4.6} h={3.8} r={0.22} />

        {/* Portico entablature */}
        <mesh position={[0, 4.2, 4.6]} castShadow material={marble}>
          <boxGeometry args={[7.2, 0.7, 0.9]} />
        </mesh>
        <mesh position={[0, 4.58, 4.6]} material={gold}>
          <boxGeometry args={[7.2, 0.08, 0.96]} />
        </mesh>

        {/* Front door */}
        <mesh position={[0, 1.6, 4.22]} material={woodDark}>
          <boxGeometry args={[2.0, 2.8, 0.12]} />
        </mesh>
        {/* Door frame */}
        <mesh position={[0, 3.1, 4.22]} material={marbleDark}>
          <boxGeometry args={[2.4, 0.2, 0.14]} />
        </mesh>

        {/* Windows — front */}
        <Window x={-3.8} y={2.2} z={4.23} />
        <Window x={3.8} y={2.2} z={4.23} />

        {/* Windows — sides */}
        <Window x={-5.22} y={2.2} z={-2} rotY={Math.PI / 2} />
        <Window x={5.22} y={2.2} z={-2} rotY={Math.PI / 2} />
        <Window x={-5.22} y={2.2} z={-6} rotY={Math.PI / 2} />
        <Window x={5.22} y={2.2} z={-6} rotY={Math.PI / 2} />

        {/* Windows — back */}
        <Window x={-3} y={2.2} z={-4.22} rotY={Math.PI} />
        <Window x={3} y={2.2} z={-4.22} rotY={Math.PI} />

        {/* Foundation line */}
        <mesh position={[0, 0.08, 0]} material={stoneTrim}>
          <boxGeometry args={[10.6, 0.16, 8.6]} />
        </mesh>

        {/* Interior visible through entrance — floor */}
        <mesh position={[0, 0.02, 0]} receiveShadow material={marbleDark}>
          <planeGeometry args={[9.6, 7.6]} />
        </mesh>
      </group>

      {/* Steps leading to entrance */}
      <mesh position={[0, 0.06, 5.2]} receiveShadow material={stoneTrim}>
        <boxGeometry args={[4.5, 0.12, 1.2]} />
      </mesh>
      <mesh position={[0, 0.18, 5.6]} receiveShadow material={stoneTrim}>
        <boxGeometry args={[4.5, 0.12, 0.8]} />
      </mesh>
    </group>
  )
}
