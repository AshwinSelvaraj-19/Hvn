import { useRef } from 'react'
import * as THREE from 'three'
import type { Group } from 'three'

import { useOrbitalMotion, usePulse } from '@/systems/animation/animationHooks'
import { CelestialParticles } from '@/systems/particles/CelestialParticles'
import { LightShaftCluster } from '@/systems/atmosphere/LightShaft'
import { FloatingRing, FloatingCrystal } from '@/systems/atmosphere/FloatingElements'
import { DistantSilhouettes } from '@/systems/atmosphere/DistantSilhouettes'
import { gold, marble, marbleGlow } from './materials'

/**
 * Celestial elements for The Arrival — the first impression.
 *
 * Monument, light shafts, floating elements, particles, distant world.
 * Everything the player sees when they first arrive.
 */
export function ArrivalCelestialElements() {
  return (
    <group>
      <ArrivalMonument />
      <LightShaftCluster position={[-8, 0, -14]} count={2} spread={3} height={20} />
      <LightShaftCluster position={[8, 0, -14]} count={2} spread={3} height={18} />
      <FloatingRing position={[0, 6, -14]} radius={1.2} />
      <FloatingCrystal position={[-3, 4.5, -10]} scale={0.25} />
      <FloatingCrystal position={[3, 5, -12]} scale={0.2} />
      <CelestialParticles position={[0, 2, 0]} width={30} height={10} depth={30} count={50} speed={0.2} />
      <DistantSilhouettes />
    </group>
  )
}

/** The Arrival monument — tall celestial obelisk visible from far away. */
function ArrivalMonument() {
  const ringRef = useRef<Group>(null)
  useOrbitalMotion(ringRef, { speed: 0.25 })

  usePulse((t) => {
    if (!ringRef.current) return
    ringRef.current.children.forEach((child) => {
      if (child instanceof THREE.Mesh && child.material && 'emissiveIntensity' in child.material) {
        ;(child.material as { emissiveIntensity: number }).emissiveIntensity = 0.15 + t * 0.1
      }
    })
  }, { speed: 0.6 })

  return (
    <group position={[0, 0, -14]}>
      {/* Tall pedestal base */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow material={marble}>
        <cylinderGeometry args={[1.2, 1.4, 0.6, 16]} />
      </mesh>
      <mesh position={[0, 0.65, 0]} castShadow material={marble}>
        <cylinderGeometry args={[0.8, 1.0, 0.4, 16]} />
      </mesh>

      {/* Main obelisk shaft */}
      <mesh position={[0, 3.2, 0]} castShadow material={marbleGlow}>
        <cylinderGeometry args={[0.2, 0.35, 5.0, 8]} />
      </mesh>

      {/* Gold band at mid-height */}
      <mesh position={[0, 3.0, 0]} material={gold}>
        <torusGeometry args={[0.32, 0.035, 8, 16]} />
      </mesh>

      {/* Crown */}
      <mesh position={[0, 5.85, 0]} material={gold}>
        <octahedronGeometry args={[0.22, 0]} />
      </mesh>

      {/* Orbital ring around crown */}
      <group ref={ringRef} position={[0, 5.85, 0]}>
        <mesh>
          <torusGeometry args={[0.5, 0.02, 8, 24]} />
          <meshStandardMaterial
            color="#c9a84c"
            roughness={0.3}
            metalness={0.85}
            emissive="#c9a84c"
            emissiveIntensity={0.15}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>

      {/* Base gold ring */}
      <mesh position={[0, 0.15, 0]} material={gold}>
        <torusGeometry args={[1.1, 0.03, 8, 20]} />
      </mesh>
    </group>
  )
}
