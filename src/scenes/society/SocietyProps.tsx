import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

import { LAMPS } from './data'
import { gold, lampWarm, noticeBoard, stoneTrim } from './materials'

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
 * District furniture — lanterns, notice board, community elements.
 */
export function SocietyProps() {
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

      {/* Community Notice Board */}
      <NoticeBoard />

      {/* Community banners on poles */}
      <BannerPole x={-4} z={12} />
      <BannerPole x={4} z={12} />
    </group>
  )
}

/** Physical in-world notice board. */
function NoticeBoard() {
  return (
    <group position={[6, 0, 8]}>
      {/* Post */}
      <mesh position={[0, 1.0, 0]} castShadow material={noticeBoard}>
        <cylinderGeometry args={[0.06, 0.08, 2.0, 8]} />
      </mesh>
      {/* Board */}
      <mesh position={[0, 1.8, 0]} castShadow material={noticeBoard}>
        <boxGeometry args={[1.0, 0.8, 0.08]} />
      </mesh>
      {/* Board frame */}
      <mesh position={[0, 1.8, 0.045]} material={gold}>
        <boxGeometry args={[1.06, 0.86, 0.02]} />
      </mesh>
      {/* Paper notices (abstract) */}
      <mesh position={[-0.2, 1.9, 0.05]}>
        <planeGeometry args={[0.3, 0.35]} />
        <meshStandardMaterial color="#f5f0e5" roughness={0.8} />
      </mesh>
      <mesh position={[0.2, 1.85, 0.05]}>
        <planeGeometry args={[0.28, 0.3]} />
        <meshStandardMaterial color="#f0ebe0" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.65, 0.05]}>
        <planeGeometry args={[0.32, 0.25]} />
        <meshStandardMaterial color="#f2ede2" roughness={0.8} />
      </mesh>
    </group>
  )
}

/** A banner on a pole. */
function BannerPole({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      {/* Pole */}
      <mesh position={[0, 1.5, 0]} castShadow material={stoneTrim}>
        <cylinderGeometry args={[0.04, 0.06, 3.0, 6]} />
      </mesh>
      {/* Banner */}
      <mesh position={[0.35, 1.8, 0]}>
        <planeGeometry args={[0.6, 1.0]} />
        <meshStandardMaterial color="#c45c5c" roughness={0.8} side={2} />
      </mesh>
      {/* Gold trim on banner */}
      <mesh position={[0.35, 2.35, 0.01]}>
        <planeGeometry args={[0.62, 0.06]} />
        <meshStandardMaterial color="#d9b45c" roughness={0.35} metalness={0.85} side={2} />
      </mesh>
    </group>
  )
}
