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
        <sphereGeometry args={[0.1, 8, 8]} />
      </mesh>
      <mesh position={[0, 2.38, 0]} material={lampWarm}>
        <boxGeometry args={[0.26, 0.3, 0.26]} />
      </mesh>
    </group>
  )
}

/**
 * District furniture — lanterns with animated glow, banners.
 */
export function WorldsProps() {
  const lampA = useRef<Group>(null)
  const lampB = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (lampA.current) lampA.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 2.1) * 0.04)
    if (lampB.current) lampB.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 1.7) * 0.04)
  })

  return (
    <group>
      {/* Lamps */}
      {LAMPS.map(([x, z], i) => (
        <Lamp
          key={i}
          x={x}
          z={z}
          glowRef={i === 6 ? lampA : i === 7 ? lampB : undefined}
        />
      ))}

      {/* Banner poles */}
      <BannerPole x={-5} z={14} color="#5a8fb4" />
      <BannerPole x={5} z={14} color="#5a9a6a" />
      <BannerPole x={-10} z={-6} color="#8a6aaa" />
      <BannerPole x={10} z={-6} color="#5a8fb4" />
    </group>
  )
}

/** A banner on a pole. */
function BannerPole({ x, z, color }: { x: number; z: number; color: string }) {
  return (
    <group position={[x, 0, z]}>
      {/* Pole */}
      <mesh position={[0, 1.5, 0]} castShadow material={stoneTrim}>
        <cylinderGeometry args={[0.04, 0.06, 3.0, 6]} />
      </mesh>
      {/* Banner */}
      <mesh position={[0.35, 1.8, 0]}>
        <planeGeometry args={[0.6, 1.0]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.6} side={2} />
      </mesh>
      {/* Gold trim on banner */}
      <mesh position={[0.35, 2.35, 0.01]}>
        <planeGeometry args={[0.62, 0.06]} />
        <meshStandardMaterial color="#d9b45c" roughness={0.35} metalness={0.85} side={2} />
      </mesh>
    </group>
  )
}
