import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

import { APPROACH_LAMPS, COURTYARD_LAMPS } from './data'
import { gold, lampWarm, stoneTrim } from './materials'

/** One lantern on a stone post. */
function Lamp({ x, z, glowRef }: { x: number; z: number; glowRef?: React.RefObject<Group | null> }) {
  return (
    <group position={[x, 0, z]} ref={glowRef}>
      <mesh position={[0, 1.2, 0]} castShadow material={stoneTrim}>
        <cylinderGeometry args={[0.06, 0.1, 2.4, 8]} />
      </mesh>
      <mesh position={[0, 2.52, 0]} material={gold}>
        <sphereGeometry args={[0.1, 8, 8]} />
      </mesh>
      <mesh position={[0, 2.38, 0]} material={lampWarm}>
        <boxGeometry args={[0.26, 0.3, 0.26]} />
      </mesh>
    </group>
  )
}

/**
 * District furniture — lanterns with animated glow.
 */
export function FounderProps() {
  const lampA = useRef<Group>(null)
  const lampB = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (lampA.current) lampA.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 2.1) * 0.04)
    if (lampB.current) lampB.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 1.7) * 0.04)
  })

  return (
    <group>
      {/* Approach lamps */}
      {APPROACH_LAMPS.map(([x, z], i) => (
        <Lamp key={`a${i}`} x={x} z={z} />
      ))}

      {/* Courtyard lamps */}
      {COURTYARD_LAMPS.map(([x, z], i) => (
        <Lamp
          key={`c${i}`}
          x={x}
          z={z}
          glowRef={i === 0 ? lampA : i === 1 ? lampB : undefined}
        />
      ))}
    </group>
  )
}
