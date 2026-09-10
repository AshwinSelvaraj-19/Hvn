import { TROPHY_PEDESTALS } from './data'
import { gold, marble, marbleDark, stoneTrim, trophy } from './materials'

/**
 * The Trophy Gallery — competition/trophy area.
 *
 * Trophy pedestals, medals, achievement displays, competition symbols.
 * Abstract/procedural trophies. Data replaceable later.
 */
export function WorldsTrophyGallery() {
  return (
    <group position={[-16, 0, -14]}>
      {/* Gallery floor */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.01, 0]} receiveShadow material={stoneTrim}>
        <circleGeometry args={[4, 28]} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.015, 0]} material={marbleDark}>
        <circleGeometry args={[3, 28]} />
      </mesh>

      {/* Central monument */}
      <CentralMonument />

      {/* Trophy pedestals */}
      {TROPHY_PEDESTALS.map(([x, z], i) => (
        <TrophyPedestal key={i} x={x + 16} z={z + 14} index={i} />
      ))}

      {/* Achievement wall */}
      <AchievementWall />
    </group>
  )
}

/** Central trophy monument. */
function CentralMonument() {
  return (
    <group position={[0, 0, 0]}>
      {/* Base */}
      <mesh position={[0, 0.1, 0]} receiveShadow material={stoneTrim}>
        <cylinderGeometry args={[1.2, 1.4, 0.2, 20]} />
      </mesh>
      <mesh position={[0, 0.35, 0]} castShadow material={marble}>
        <cylinderGeometry args={[0.8, 1.0, 0.3, 20]} />
      </mesh>

      {/* Trophy column */}
      <mesh position={[0, 1.0, 0]} castShadow material={marble}>
        <cylinderGeometry args={[0.2, 0.25, 1.0, 8]} />
      </mesh>

      {/* Trophy top */}
      <mesh position={[0, 1.7, 0]} material={trophy}>
        <coneGeometry args={[0.3, 0.5, 8]} />
      </mesh>
      <mesh position={[0, 2.0, 0]} material={gold}>
        <sphereGeometry args={[0.12, 10, 10]} />
      </mesh>

      {/* Gold ring */}
      <mesh position={[0, 0.2, 0]} material={gold}>
        <torusGeometry args={[1.1, 0.03, 8, 20]} />
      </mesh>
    </group>
  )
}

/** A trophy pedestal with abstract trophy. */
function TrophyPedestal({ x, z, index }: { x: number; z: number; index: number }) {
  const isSmall = index % 2 === 0
  return (
    <group position={[x, 0, z]}>
      {/* Pedestal */}
      <mesh position={[0, 0.25, 0]} castShadow material={marble}>
        <boxGeometry args={[0.6, 0.5, 0.6]} />
      </mesh>
      <mesh position={[0, 0.52, 0]} material={gold}>
        <boxGeometry args={[0.64, 0.04, 0.64]} />
      </mesh>

      {/* Trophy */}
      <mesh position={[0, isSmall ? 0.7 : 0.8, 0]} material={trophy}>
        <coneGeometry args={[isSmall ? 0.1 : 0.12, isSmall ? 0.2 : 0.25, 8]} />
      </mesh>
      {!isSmall && (
        <mesh position={[0, 1.0, 0]} material={gold}>
          <sphereGeometry args={[0.06, 8, 8]} />
        </mesh>
      )}
    </group>
  )
}

/** Achievement wall with display cases. */
function AchievementWall() {
  return (
    <group position={[0, 0, -2.5]}>
      {/* Wall */}
      <mesh position={[0, 1.5, 0]} castShadow material={marble}>
        <boxGeometry args={[4.0, 3.0, 0.3]} />
      </mesh>
      {/* Wall cap */}
      <mesh position={[0, 3.05, 0]} material={gold}>
        <boxGeometry args={[4.2, 0.1, 0.36]} />
      </mesh>

      {/* Display cases */}
      {[-1.2, 0, 1.2].map((x, i) => (
        <group key={i} position={[x, 1.5, 0.16]}>
          <mesh material={marbleDark}>
            <boxGeometry args={[0.8, 0.8, 0.04]} />
          </mesh>
          <mesh position={[0, 0, 0.02]} material={gold}>
            <boxGeometry args={[0.82, 0.04, 0.01]} />
          </mesh>
          <mesh position={[0, -0.38, 0.02]} material={gold}>
            <boxGeometry args={[0.82, 0.04, 0.01]} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
