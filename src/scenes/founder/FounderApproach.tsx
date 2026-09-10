import { Instances, Instance } from '@react-three/drei'

import { gold, marble, marbleDark, stoneTrim, stonePaving } from './materials'

/**
 * The approach path leading from the Arrival to the Founder's Sanctum.
 *
 * An elevated stone walkway flanked by walls, trees and lamps,
 * gradually communicating that the player is entering a more
 * important location.
 */
export function FounderApproach() {
  return (
    <group>
      {/* Main walkway */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.02, 20]} receiveShadow material={marble}>
        <planeGeometry args={[3.6, 22]} />
      </mesh>

      {/* Path edge stones */}
      <Instances limit={18} receiveShadow material={stoneTrim}>
        <boxGeometry args={[0.3, 0.06, 0.3]} />
        {Array.from({ length: 9 }, (_, i) => (
          <Instance key={`l${i}`} position={[-1.85, 0.035, 12 + i * 2.5]} />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <Instance key={`r${i}`} position={[1.85, 0.035, 12 + i * 2.5]} />
        ))}
      </Instances>

      {/* Subtle center line */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.025, 20]} material={marbleDark}>
        <planeGeometry args={[0.15, 22]} />
      </mesh>

      {/* Low stone walls flanking the approach */}
      {/* Left wall */}
      <mesh position={[-3.8, 0.6, 20]} castShadow receiveShadow material={stoneTrim}>
        <boxGeometry args={[0.4, 1.2, 22]} />
      </mesh>
      <mesh position={[-3.8, 1.22, 20]} material={marble}>
        <boxGeometry args={[0.5, 0.08, 22.2]} />
      </mesh>

      {/* Right wall */}
      <mesh position={[3.8, 0.6, 20]} castShadow receiveShadow material={stoneTrim}>
        <boxGeometry args={[0.4, 1.2, 22]} />
      </mesh>
      <mesh position={[3.8, 1.22, 20]} material={marble}>
        <boxGeometry args={[0.5, 0.08, 22.2]} />
      </mesh>

      {/* Entrance gate */}
      <EntranceGate />

      {/* Approach paving transition to courtyard */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.015, 10]} receiveShadow material={stonePaving}>
        <planeGeometry args={[10, 4]} />
      </mesh>
    </group>
  )
}

/** Elegant entrance gate marking the transition to the Sanctum. */
function EntranceGate() {
  return (
    <group position={[0, 0, 9.5]}>
      {/* Left pillar */}
      <mesh position={[-2.5, 1.5, 0]} castShadow material={marble}>
        <boxGeometry args={[0.7, 3.0, 0.7]} />
      </mesh>
      <mesh position={[-2.5, 3.1, 0]} material={marble}>
        <boxGeometry args={[0.82, 0.2, 0.82]} />
      </mesh>
      <mesh position={[-2.5, 3.28, 0]} material={gold}>
        <sphereGeometry args={[0.1, 8, 8]} />
      </mesh>

      {/* Right pillar */}
      <mesh position={[2.5, 1.5, 0]} castShadow material={marble}>
        <boxGeometry args={[0.7, 3.0, 0.7]} />
      </mesh>
      <mesh position={[2.5, 3.1, 0]} material={marble}>
        <boxGeometry args={[0.82, 0.2, 0.82]} />
      </mesh>
      <mesh position={[2.5, 3.28, 0]} material={gold}>
        <sphereGeometry args={[0.1, 8, 8]} />
      </mesh>

      {/* Arch connecting pillars */}
      <mesh position={[0, 3.2, 0]} castShadow material={marble}>
        <boxGeometry args={[5.7, 0.5, 0.7]} />
      </mesh>
      {/* Gold band on arch */}
      <mesh position={[0, 3.48, 0]} material={gold}>
        <boxGeometry args={[5.7, 0.08, 0.76]} />
      </mesh>

      {/* Floor threshold */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.03, 0]} material={marbleDark}>
        <planeGeometry args={[5.4, 0.8]} />
      </mesh>
    </group>
  )
}


