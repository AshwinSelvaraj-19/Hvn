import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

import { LAMPS } from './data'
import { gold, lampWarm, stoneTrim } from './materials'

/** One lantern on a stone post. */
function Lamp({ x, z, glowRef }: { x: number; z: number; glowRef?: React.RefObject<Group | null> }) {
  return (
    <group position={[x, 0, z]} ref={glowRef}>
      <mesh position={[0, 1.2, 0]} castShadow material={stoneTrim}>
        <cylinderGeometry args={[0.06, 0.1, 2.4, 8]} />
      </mesh>
      <mesh position={[0, 2.52, 0]} material={gold}>
        <sphereGeometry args={[0.08, 8, 8]} />
      </mesh>
      <mesh position={[0, 2.38, 0]} material={lampWarm}>
        <boxGeometry args={[0.22, 0.28, 0.22]} />
      </mesh>
    </group>
  )
}

/**
 * Gate furniture — lanterns with animated glow.
 */
export function GateProps() {
  const lampA = useRef<Group>(null)
  const lampB = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (lampA.current) lampA.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 1.8) * 0.04)
    if (lampB.current) lampB.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 1.4) * 0.04)
  })

  return (
    <group>
      {LAMPS.map(([x, z], i) => (
        <Lamp
          key={i}
          x={x}
          z={z}
          glowRef={i === 8 ? lampA : i === 9 ? lampB : undefined}
        />
      ))}
    </group>
  )
}
