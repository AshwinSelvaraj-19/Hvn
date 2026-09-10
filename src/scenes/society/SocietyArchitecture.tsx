import { gold, marble, marbleDark, roof, stoneTrim, windowWarm, wood, woodDark } from './materials'

/** A warm window glow. */
function Window({ x, y, z, rotY = 0 }: { x: number; y: number; z: number; rotY?: number }) {
  return (
    <mesh position={[x, y, z]} rotation-y={rotY} material={windowWarm}>
      <boxGeometry args={[0.7, 1.0, 0.05]} />
    </mesh>
  )
}

/** A column. */
function Column({ x, z, h = 3.0, r = 0.18 }: { x: number; z: number; h?: number; r?: number }) {
  return (
    <mesh position={[x, h / 2, z]} castShadow material={marble}>
      <cylinderGeometry args={[r * 0.8, r, h, 10]} />
    </mesh>
  )
}

/**
 * The Society architecture — community hall, gathering pavilion,
 * and member houses. Communal, welcoming, lived-in feel.
 */
export function SocietyArchitecture() {
  return (
    <group>
      {/* ---------- Community Hall ---------- */}
      <CommunityHall />

      {/* ---------- Gathering Pavilion ---------- */}
      <GatheringPavilion />

      {/* ---------- Member Houses ---------- */}
      <MemberHouse x={-16} z={-18} rotY={0} />
      <MemberHouse x={-12} z={-22} rotY={Math.PI / 6} />
      <MemberHouse x={-18} z={-24} rotY={-Math.PI / 8} />
    </group>
  )
}

/** The Community Hall — the shared gathering space. */
function CommunityHall() {
  return (
    <group position={[0, 0, -16]}>
      {/* Main structure */}
      <mesh position={[0, 2.0, 0]} castShadow material={stoneTrim}>
        <boxGeometry args={[10, 4.0, 6]} />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 4.4, 0]} castShadow material={roof}>
        <coneGeometry args={[6.2, 1.8, 4]} />
      </mesh>

      {/* Portico columns */}
      <Column x={-3} z={3.4} h={3.5} r={0.2} />
      <Column x={-1.5} z={3.4} h={3.5} r={0.2} />
      <Column x={1.5} z={3.4} h={3.5} r={0.2} />
      <Column x={3} z={3.4} h={3.5} r={0.2} />

      {/* Portico entablature */}
      <mesh position={[0, 3.8, 3.4]} castShadow material={marble}>
        <boxGeometry args={[7.2, 0.6, 0.8]} />
      </mesh>
      <mesh position={[0, 4.12, 3.4]} material={gold}>
        <boxGeometry args={[7.2, 0.08, 0.86]} />
      </mesh>

      {/* Front door */}
      <mesh position={[0, 1.5, 3.02]} material={woodDark}>
        <boxGeometry args={[1.8, 2.6, 0.1]} />
      </mesh>
      <mesh position={[0, 2.85, 3.02]} material={marbleDark}>
        <boxGeometry args={[2.2, 0.18, 0.12]} />
      </mesh>

      {/* Windows — front */}
      <Window x={-3.5} y={2.0} z={3.03} />
      <Window x={3.5} y={2.0} z={3.03} />

      {/* Windows — sides */}
      <Window x={-5.03} y={2.0} z={-1} rotY={Math.PI / 2} />
      <Window x={5.03} y={2.0} z={-1} rotY={Math.PI / 2} />
      <Window x={-5.03} y={2.0} z={-3} rotY={Math.PI / 2} />
      <Window x={5.03} y={2.0} z={-3} rotY={Math.PI / 2} />

      {/* Gold trim at base */}
      <mesh position={[0, 0.08, 0]} material={gold}>
        <boxGeometry args={[10.2, 0.12, 6.2]} />
      </mesh>

      {/* Interior floor visible through entrance */}
      <mesh position={[0, 0.02, 0]} receiveShadow material={marbleDark}>
        <planeGeometry args={[9.2, 5.2]} />
      </mesh>

      {/* Steps */}
      <mesh position={[0, 0.06, 3.6]} receiveShadow material={stoneTrim}>
        <boxGeometry args={[4.0, 0.12, 1.0]} />
      </mesh>
    </group>
  )
}

/** The Gathering Pavilion — covered communal seating. */
function GatheringPavilion() {
  return (
    <group position={[-8, 0, -10]}>
      {/* Floor */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.02, 0]} receiveShadow material={stoneTrim}>
        <circleGeometry args={[2.5, 24]} />
      </mesh>

      {/* Support columns */}
      <Column x={-1.8} z={-1.8} h={2.8} r={0.12} />
      <Column x={1.8} z={-1.8} h={2.8} r={0.12} />
      <Column x={-1.8} z={1.8} h={2.8} r={0.12} />
      <Column x={1.8} z={1.8} h={2.8} r={0.12} />

      {/* Roof */}
      <mesh position={[0, 3.0, 0]} castShadow material={roof}>
        <coneGeometry args={[2.8, 1.2, 6]} />
      </mesh>

      {/* Central table */}
      <mesh position={[0, 0.5, 0]} castShadow material={wood}>
        <cylinderGeometry args={[0.6, 0.6, 0.06, 12]} />
      </mesh>
      <mesh position={[0, 0.25, 0]} castShadow material={woodDark}>
        <cylinderGeometry args={[0.06, 0.08, 0.5, 8]} />
      </mesh>
    </group>
  )
}

/** A modest member house. */
function MemberHouse({ x, z, rotY }: { x: number; z: number; rotY: number }) {
  return (
    <group position={[x, 0, z]} rotation-y={rotY}>
      <mesh position={[0, 1.5, 0]} castShadow material={stoneTrim}>
        <boxGeometry args={[4.2, 3.0, 3.5]} />
      </mesh>
      <mesh position={[0, 3.3, 0]} castShadow material={roof}>
        <coneGeometry args={[3.0, 1.4, 4]} />
      </mesh>
      <mesh position={[0, 1.1, 1.76]} material={woodDark}>
        <boxGeometry args={[1.1, 1.6, 0.1]} />
      </mesh>
      <Window x={-1.4} y={1.6} z={1.77} />
      <Window x={1.4} y={1.6} z={1.77} />
      <mesh position={[0, 0.28, 0]} material={gold}>
        <boxGeometry args={[4.4, 0.08, 3.7]} />
      </mesh>
    </group>
  )
}
