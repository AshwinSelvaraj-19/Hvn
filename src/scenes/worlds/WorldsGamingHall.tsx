import { GAMING_TABLES } from './data'
import { gold, marble, marbleDark, screen, stoneTrim, wood, woodDark } from './materials'

/**
 * The Gaming Hall — dedicated physical gaming space.
 *
 * Represents gaming through architecture, tables, displays,
 * and competition symbols. No actual game logic.
 */
export function WorldsGamingHall() {
  return (
    <group position={[-15, 0, 8]}>
      {/* Hall structure */}
      <mesh position={[0, 2.2, 0]} castShadow material={stoneTrim}>
        <boxGeometry args={[8, 4.4, 8]} />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 4.8, 0]} castShadow>
        <coneGeometry args={[5.2, 1.6, 4]} />
        <meshStandardMaterial color="#5a8fb4" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Entrance */}
      <mesh position={[0, 1.6, 4.02]} material={wood}>
        <boxGeometry args={[2.0, 2.8, 0.1]} />
      </mesh>
      <mesh position={[0, 3.1, 4.02]} material={marbleDark}>
        <boxGeometry args={[2.4, 0.18, 0.12]} />
      </mesh>

      {/* Windows */}
      <mesh position={[-3.5, 2.2, 4.03]}>
        <boxGeometry args={[0.7, 1.0, 0.05]} />
        <meshStandardMaterial color="#ffd9a0" emissive="#c98a3a" emissiveIntensity={0.55} />
      </mesh>
      <mesh position={[3.5, 2.2, 4.03]}>
        <boxGeometry args={[0.7, 1.0, 0.05]} />
        <meshStandardMaterial color="#ffd9a0" emissive="#c98a3a" emissiveIntensity={0.55} />
      </mesh>

      {/* Side windows */}
      <mesh position={[-4.03, 2.2, 0]} rotation-y={Math.PI / 2}>
        <boxGeometry args={[0.7, 1.0, 0.05]} />
        <meshStandardMaterial color="#ffd9a0" emissive="#c98a3a" emissiveIntensity={0.55} />
      </mesh>
      <mesh position={[4.03, 2.2, 0]} rotation-y={Math.PI / 2}>
        <boxGeometry args={[0.7, 1.0, 0.05]} />
        <meshStandardMaterial color="#ffd9a0" emissive="#c98a3a" emissiveIntensity={0.55} />
      </mesh>

      {/* Gold trim at base */}
      <mesh position={[0, 0.08, 0]} material={gold}>
        <boxGeometry args={[8.2, 0.12, 8.2]} />
      </mesh>

      {/* Interior floor */}
      <mesh position={[0, 0.02, 0]} receiveShadow material={marbleDark}>
        <planeGeometry args={[7.2, 7.2]} />
      </mesh>

      {/* Gaming tables */}
      {GAMING_TABLES.map(([x, z, rotY], i) => (
        <GamingTable key={i} x={x + 15} z={z - 8} rotY={rotY} />
      ))}

      {/* Display screens */}
      <DisplayScreen x={-3} y={2.5} z={-3.8} />
      <DisplayScreen x={3} y={2.5} z={-3.8} />

      {/* Trophy display */}
      <mesh position={[0, 1.2, -3.8]} castShadow material={marble}>
        <boxGeometry args={[2.0, 0.08, 0.4]} />
      </mesh>
      <mesh position={[-0.6, 1.4, -3.8]} material={gold}>
        <coneGeometry args={[0.12, 0.25, 8]} />
      </mesh>
      <mesh position={[0, 1.4, -3.8]} material={gold}>
        <coneGeometry args={[0.12, 0.25, 8]} />
      </mesh>
      <mesh position={[0.6, 1.4, -3.8]} material={gold}>
        <coneGeometry args={[0.12, 0.25, 8]} />
      </mesh>

      {/* Steps */}
      <mesh position={[0, 0.06, 4.4]} receiveShadow material={stoneTrim}>
        <boxGeometry args={[3.0, 0.12, 0.8]} />
      </mesh>
    </group>
  )
}

/** A gaming table with abstract game board. */
function GamingTable({ x, z, rotY }: { x: number; z: number; rotY: number }) {
  return (
    <group position={[x, 0, z]} rotation-y={rotY}>
      {/* Table */}
      <mesh position={[0, 0.65, 0]} castShadow material={wood}>
        <boxGeometry args={[1.6, 0.06, 1.0]} />
      </mesh>
      <mesh position={[-0.65, 0.32, 0]} castShadow material={woodDark}>
        <boxGeometry args={[0.08, 0.64, 0.08]} />
      </mesh>
      <mesh position={[0.65, 0.32, 0]} castShadow material={woodDark}>
        <boxGeometry args={[0.08, 0.64, 0.08]} />
      </mesh>
      <mesh position={[-0.65, 0.32, -0.4]} castShadow material={woodDark}>
        <boxGeometry args={[0.08, 0.64, 0.08]} />
      </mesh>
      <mesh position={[0.65, 0.32, -0.4]} castShadow material={woodDark}>
        <boxGeometry args={[0.08, 0.64, 0.08]} />
      </mesh>

      {/* Game board surface */}
      <mesh position={[0, 0.69, 0]} material={marbleDark}>
        <boxGeometry args={[1.2, 0.02, 0.7]} />
      </mesh>

      {/* Game pieces (abstract) */}
      <mesh position={[-0.3, 0.73, -0.15]} material={marble}>
        <cylinderGeometry args={[0.06, 0.06, 0.08, 8]} />
      </mesh>
      <mesh position={[0.3, 0.73, 0.15]} material={gold}>
        <cylinderGeometry args={[0.06, 0.06, 0.08, 8]} />
      </mesh>
      <mesh position={[0.1, 0.73, -0.1]} material={marble}>
        <sphereGeometry args={[0.05, 8, 8]} />
      </mesh>
    </group>
  )
}

/** A display screen representing gaming/competition content. */
function DisplayScreen({ x, y, z }: { x: number; y: number; z: number }) {
  return (
    <group position={[x, y, z]}>
      {/* Screen frame */}
      <mesh material={screen}>
        <boxGeometry args={[1.2, 0.8, 0.08]} />
      </mesh>
      {/* Screen surface */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[1.0, 0.6]} />
        <meshStandardMaterial color="#1a2a3a" emissive="#2a4a6a" emissiveIntensity={0.3} />
      </mesh>
      {/* Stand */}
      <mesh position={[0, -0.5, -0.1]} material={screen}>
        <boxGeometry args={[0.08, 0.2, 0.08]} />
      </mesh>
    </group>
  )
}
