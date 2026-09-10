import { Instances, Instance } from '@react-three/drei'

import { marble, marbleDark, stoneTrim, stonePaving } from './materials'

/**
 * The approach path leading from the Arrival to The Society.
 *
 * A welcoming stone walkway flanked by lamps and vegetation,
 * gradually communicating the communal nature of the district.
 */
export function SocietyApproach() {
  return (
    <group>
      {/* Main walkway */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.02, 22]} receiveShadow material={marble}>
        <planeGeometry args={[3.6, 18]} />
      </mesh>

      {/* Path edge stones */}
      <Instances limit={16} receiveShadow material={stoneTrim}>
        <boxGeometry args={[0.3, 0.06, 0.3]} />
        {Array.from({ length: 8 }, (_, i) => (
          <Instance key={`l${i}`} position={[-1.85, 0.035, 15 + i * 2.5]} />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <Instance key={`r${i}`} position={[1.85, 0.035, 15 + i * 2.5]} />
        ))}
      </Instances>

      {/* Subtle center line */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.025, 22]} material={marbleDark}>
        <planeGeometry args={[0.12, 18]} />
      </mesh>

      {/* Approach entrance — welcoming gateway */}
      <ApproachGateway />

      {/* Transition to plaza paving */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.015, 12]} receiveShadow material={stonePaving}>
        <planeGeometry args={[8, 4]} />
      </mesh>
    </group>
  )
}

/** Welcoming entrance gateway to The Society. */
function ApproachGateway() {
  return (
    <group position={[0, 0, 13]}>
      {/* Left pillar */}
      <mesh position={[-2.2, 1.4, 0]} castShadow material={marble}>
        <boxGeometry args={[0.6, 2.8, 0.6]} />
      </mesh>
      <mesh position={[-2.2, 2.85, 0]} material={marble}>
        <boxGeometry args={[0.72, 0.15, 0.72]} />
      </mesh>

      {/* Right pillar */}
      <mesh position={[2.2, 1.4, 0]} castShadow material={marble}>
        <boxGeometry args={[0.6, 2.8, 0.6]} />
      </mesh>
      <mesh position={[2.2, 2.85, 0]} material={marble}>
        <boxGeometry args={[0.72, 0.15, 0.72]} />
      </mesh>

      {/* Arch beam */}
      <mesh position={[0, 2.95, 0]} castShadow material={marble}>
        <boxGeometry args={[5.0, 0.4, 0.6]} />
      </mesh>

      {/* Banner left */}
      <mesh position={[-1.5, 2.2, 0.32]}>
        <planeGeometry args={[0.6, 1.2]} />
        <meshStandardMaterial color="#c45c5c" roughness={0.8} side={2} />
      </mesh>

      {/* Banner right */}
      <mesh position={[1.5, 2.2, 0.32]}>
        <planeGeometry args={[0.6, 1.2]} />
        <meshStandardMaterial color="#c45c5c" roughness={0.8} side={2} />
      </mesh>

      {/* Floor threshold */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.03, 0]} material={stonePaving}>
        <planeGeometry args={[4.8, 0.6]} />
      </mesh>
    </group>
  )
}
