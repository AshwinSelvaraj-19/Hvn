import { MEMBER_PLAQUES } from './data'
import { gold, marble, marbleDark, stoneTrim, woodDark } from './materials'

/**
 * The Member Area — small neighborhood with houses and the Wall of Souls.
 *
 * Environmental storytelling: evidence that people live and belong here.
 */
export function SocietyMemberArea() {
  return (
    <group>
      {/* Member area pathways */}
      <mesh rotation-x={-Math.PI / 2} position={[-15, 0.01, -18]} receiveShadow material={stoneTrim}>
        <planeGeometry args={[1.5, 12]} />
      </mesh>

      {/* Garden plots */}
      <GardenPlot x={-14} z={-14} />
      <GardenPlot x={-20} z={-18} />

      {/* The Wall of Souls — community memorial */}
      <WallOfSouls />
    </group>
  )
}

/** A small garden plot near a member house. */
function GardenPlot({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      {/* Plot border */}
      <mesh position={[0, 0.04, 0]} material={stoneTrim}>
        <boxGeometry args={[2.2, 0.08, 1.8]} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.06, 0]} material={woodDark}>
        <boxGeometry args={[2.0, 0.04, 1.6]} />
      </mesh>
      {/* Plants */}
      <mesh position={[-0.4, 0.25, 0]} castShadow>
        <icosahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial color="#5c8f5e" roughness={0.95} flatShading />
      </mesh>
      <mesh position={[0.2, 0.3, 0.3]} castShadow>
        <icosahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial color="#3f6b4a" roughness={0.95} flatShading />
      </mesh>
      <mesh position={[0.5, 0.2, -0.2]} castShadow>
        <icosahedronGeometry args={[0.18, 0]} />
        <meshStandardMaterial color="#5c8f5e" roughness={0.95} flatShading />
      </mesh>
    </group>
  )
}

/**
 * The Wall of Souls — a beautiful architectural wall containing
 * symbolic member plaques. Represents the people of Heaven Society.
 */
function WallOfSouls() {
  return (
    <group position={[0, 0, 14]}>
      {/* Main wall structure */}
      <mesh position={[0, 1.8, 0]} castShadow material={marble}>
        <boxGeometry args={[6, 3.6, 0.5]} />
      </mesh>

      {/* Wall cap */}
      <mesh position={[0, 3.65, 0]} material={gold}>
        <boxGeometry args={[6.2, 0.12, 0.6]} />
      </mesh>

      {/* Wall base */}
      <mesh position={[0, 0.08, 0]} material={stoneTrim}>
        <boxGeometry args={[6.2, 0.16, 0.7]} />
      </mesh>

      {/* Central inscription panel */}
      <mesh position={[0, 2.8, 0.26]} material={marbleDark}>
        <boxGeometry args={[3.0, 0.6, 0.02]} />
      </mesh>
      <mesh position={[0, 2.8, 0.28]} material={gold}>
        <boxGeometry args={[2.8, 0.06, 0.01]} />
      </mesh>

      {/* Member plaques — arranged in two rows */}
      {MEMBER_PLAQUES.map((plaque, i) => {
        const row = i < 6 ? 0 : 1
        const col = i % 6
        const x = -2.25 + col * 0.9
        const y = row === 0 ? 1.8 : 1.0
        return (
          <group key={i} position={[x, y, 0.26]}>
            {/* Plaque background */}
            <mesh material={plaque.role === 'founding-member' ? gold : plaque.role === 'staff' ? marbleDark : marble}>
              <boxGeometry args={[0.7, 0.6, 0.04]} />
            </mesh>
            {/* Plaque border */}
            <mesh position={[0, 0, 0.01]} material={gold}>
              <boxGeometry args={[0.72, 0.04, 0.01]} />
            </mesh>
            <mesh position={[0, -0.28, 0.01]} material={gold}>
              <boxGeometry args={[0.72, 0.04, 0.01]} />
            </mesh>
          </group>
        )
      })}

      {/* Flanking columns */}
      <mesh position={[-3.2, 1.8, 0]} castShadow material={marble}>
        <cylinderGeometry args={[0.15, 0.18, 3.6, 8]} />
      </mesh>
      <mesh position={[3.2, 1.8, 0]} castShadow material={marble}>
        <cylinderGeometry args={[0.15, 0.18, 3.6, 8]} />
      </mesh>
      {/* Column capitals */}
      <mesh position={[-3.2, 3.65, 0]} material={gold}>
        <sphereGeometry args={[0.12, 8, 8]} />
      </mesh>
      <mesh position={[3.2, 3.65, 0]} material={gold}>
        <sphereGeometry args={[0.12, 8, 8]} />
      </mesh>
    </group>
  )
}
