import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Group } from 'three'

import { useFloatingMotion, useOrbitalMotion } from '@/systems/animation/animationHooks'

/** Deterministic pseudo-random from position for stable phase offsets. */
function posToPhase(pos: [number, number, number]): number {
  return (Math.sin(pos[0] * 127.1 + pos[1] * 311.7 + pos[2] * 74.7) * 0.5 + 0.5) * Math.PI * 2
}

interface FloatingRingProps {
  position: [number, number, number]
  radius?: number
  color?: string
  opacity?: number
}

/** A slowly rotating celestial ring. */
export function FloatingRing({ position, radius = 0.6, color = '#c9a84c', opacity = 0.5 }: FloatingRingProps) {
  const ref = useRef<Group>(null)
  useOrbitalMotion(ref, { speed: 0.2 })
  useFloatingMotion(ref, { amplitude: 0.08, speed: 0.6 })

  return (
    <group ref={ref} position={position}>
      <mesh>
        <torusGeometry args={[radius, 0.025, 8, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.8}
          transparent
          opacity={opacity}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </group>
  )
}

interface FloatingCrystalProps {
  position: [number, number, number]
  scale?: number
  color?: string
}

/** A small luminous crystal that floats and rotates. */
export function FloatingCrystal({ position, scale = 0.3, color = '#e8dcc4' }: FloatingCrystalProps) {
  const ref = useRef<Group>(null)
  const phase = useMemo(() => posToPhase(position), [position])
  useFloatingMotion(ref, { amplitude: 0.12, speed: 0.5, phase })
  useOrbitalMotion(ref, { speed: 0.15 })

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime
    ref.current.children.forEach((child) => {
      if (child instanceof THREE.Mesh && child.material && 'emissiveIntensity' in child.material) {
        ;(child.material as { emissiveIntensity: number }).emissiveIntensity =
          0.2 + Math.sin(t * 0.8) * 0.1
      }
    })
  })

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh castShadow>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.15}
          emissive={color}
          emissiveIntensity={0.2}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  )
}

interface FloatingStoneProps {
  position: [number, number, number]
  scale?: number
}

/** A small floating stone — rare, elegant, intentional. */
export function FloatingStone({ position, scale = 0.4 }: FloatingStoneProps) {
  const ref = useRef<Group>(null)
  const phase = useMemo(() => posToPhase(position), [position])
  useFloatingMotion(ref, { amplitude: 0.1, speed: 0.4, phase })

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh castShadow>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#c8c0b4" roughness={0.9} metalness={0.02} />
      </mesh>
    </group>
  )
}
