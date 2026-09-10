import { Instances, Instance } from '@react-three/drei'

import { marble, marbleDark, stoneStep, stoneTrim } from './materials'

/**
 * Gate Approach — a long, compact stone pathway with subtle elevation.
 *
 * Trees, gardens, and celestial lamps guide the player toward the Gate.
 * The path rises gently, building anticipation.
 */
export function GateApproach() {
  return (
    <group>
      {/* Main walkway */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.02, 14]} receiveShadow material={marble}>
        <planeGeometry args={[3.6, 18]} />
      </mesh>

      {/* Path edge stones */}
      <Instances limit={12} receiveShadow material={stoneTrim}>
        <boxGeometry args={[0.3, 0.06, 0.3]} />
        {Array.from({ length: 5 }, (_, i) => (
          <Instance key={`l${i}`} position={[-1.85, 0.035, 7 + i * 3]} />
        ))}
        {Array.from({ length: 5 }, (_, i) => (
          <Instance key={`r${i}`} position={[1.85, 0.035, 7 + i * 3]} />
        ))}
      </Instances>

      {/* Center line */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.025, 14]} material={marbleDark}>
        <planeGeometry args={[0.1, 18]} />
      </mesh>

      {/* Elevation steps along the approach */}
      {[10, 6, 2].map((z, i) => (
        <mesh key={i} position={[0, 0.04 + i * 0.06, z]} receiveShadow material={stoneStep}>
          <boxGeometry args={[4.2, 0.08, 0.5]} />
        </mesh>
      ))}

      {/* Approach entrance marker */}
      <ApproachMarker />
    </group>
  )
}

/** Subtle entrance marker — not a full gateway, just a symbolic threshold. */
function ApproachMarker() {
  return (
    <group position={[0, 0, 21]}>
      {/* Low stone posts */}
      <mesh position={[-2, 0.35, 0]} castShadow material={stoneTrim}>
        <boxGeometry args={[0.3, 0.7, 0.3]} />
      </mesh>
      <mesh position={[2, 0.35, 0]} castShadow material={stoneTrim}>
        <boxGeometry args={[0.3, 0.7, 0.3]} />
      </mesh>
      {/* Connecting beam */}
      <mesh position={[0, 0.72, 0]} material={stoneTrim}>
        <boxGeometry args={[4.3, 0.12, 0.2]} />
      </mesh>
      {/* Gold accent */}
      <mesh position={[0, 0.78, 0]} material={marbleDark}>
        <boxGeometry args={[4.34, 0.04, 0.24]} />
      </mesh>
    </group>
  )
}
