import { Instances, Instance } from '@react-three/drei'

import { marble, marbleDark, stoneTrim, stonePaving } from './materials'

/**
 * The approach path leading from the Arrival to The Worlds.
 *
 * A welcoming stone walkway flanked by lamps and vegetation,
 * communicating the energetic nature of the activity district.
 */
export function WorldsApproach() {
  return (
    <group>
      {/* Main walkway */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.02, 24]} receiveShadow material={marble}>
        <planeGeometry args={[3.6, 14]} />
      </mesh>

      {/* Path edge stones */}
      <Instances limit={12} receiveShadow material={stoneTrim}>
        <boxGeometry args={[0.3, 0.06, 0.3]} />
        {Array.from({ length: 6 }, (_, i) => (
          <Instance key={`l${i}`} position={[-1.85, 0.035, 19 + i * 2.5]} />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <Instance key={`r${i}`} position={[1.85, 0.035, 19 + i * 2.5]} />
        ))}
      </Instances>

      {/* Subtle center line */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.025, 24]} material={marbleDark}>
        <planeGeometry args={[0.12, 14]} />
      </mesh>

      {/* Approach entrance — activity gateway */}
      <ApproachGateway />

      {/* Transition to plaza paving */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.015, 16]} receiveShadow material={stonePaving}>
        <planeGeometry args={[8, 4]} />
      </mesh>
    </group>
  )
}

/** Activity-themed entrance gateway to The Worlds. */
function ApproachGateway() {
  return (
    <group position={[0, 0, 17]}>
      {/* Left pillar */}
      <mesh position={[-2.2, 1.5, 0]} castShadow material={marble}>
        <boxGeometry args={[0.6, 3.0, 0.6]} />
      </mesh>
      <mesh position={[-2.2, 3.05, 0]} material={marble}>
        <boxGeometry args={[0.72, 0.15, 0.72]} />
      </mesh>

      {/* Right pillar */}
      <mesh position={[2.2, 1.5, 0]} castShadow material={marble}>
        <boxGeometry args={[0.6, 3.0, 0.6]} />
      </mesh>
      <mesh position={[2.2, 3.05, 0]} material={marble}>
        <boxGeometry args={[0.72, 0.15, 0.72]} />
      </mesh>

      {/* Arch beam */}
      <mesh position={[0, 3.15, 0]} castShadow material={marble}>
        <boxGeometry args={[5.0, 0.4, 0.6]} />
      </mesh>

      {/* Activity banners */}
      <mesh position={[-1.5, 2.4, 0.32]}>
        <planeGeometry args={[0.6, 1.2]} />
        <meshStandardMaterial color="#5a8fb4" roughness={0.4} metalness={0.6} side={2} />
      </mesh>
      <mesh position={[1.5, 2.4, 0.32]}>
        <planeGeometry args={[0.6, 1.2]} />
        <meshStandardMaterial color="#5a9a6a" roughness={0.4} metalness={0.5} side={2} />
      </mesh>

      {/* Floor threshold */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.03, 0]} material={stonePaving}>
        <planeGeometry args={[4.8, 0.6]} />
      </mesh>
    </group>
  )
}
