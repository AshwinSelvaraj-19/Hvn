import { useRef } from 'react'
import * as THREE from 'three'
import type { Group } from 'three'

import { useOrbitalMotion, usePulse } from '@/systems/animation/animationHooks'
import { CelestialParticles } from '@/systems/particles/CelestialParticles'
import { LightShaftCluster } from '@/systems/atmosphere/LightShaft'
import { FloatingRing } from '@/systems/atmosphere/FloatingElements'
import { DistantSilhouettes } from '@/systems/atmosphere/DistantSilhouettes'
import { gold, marble, marbleGlow } from './materials'

/**
 * Celestial elements for the Founder's Sanctum.
 * Elevated sanctuary with distinctive celestial silhouette.
 */
export function FounderCelestialElements() {
  return (
    <group>
      <FounderSanctumMonument />
      <LightShaftCluster position={[0, 0, -8]} count={2} spread={3} height={22} color="#fff4e0" />
      <FloatingRing position={[0, 7, -7]} radius={1.0} color="#c9a84c" />
      <CelestialParticles position={[0, 2, -7]} width={16} height={8} depth={16} count={35} speed={0.15} color="#fff4e0" />
      <DistantSilhouettes />
    </group>
  )
}

/** Founder's elevated sanctum monument — refined, prestigious. */
function FounderSanctumMonument() {
  const ringRef = useRef<Group>(null)
  useOrbitalMotion(ringRef, { speed: 0.2 })

  usePulse((t) => {
    if (!ringRef.current) return
    ringRef.current.children.forEach((child) => {
      if (child instanceof THREE.Mesh && child.material && 'emissiveIntensity' in child.material) {
        ;(child.material as { emissiveIntensity: number }).emissiveIntensity = 0.12 + t * 0.08
      }
    })
  }, { speed: 0.5 })

  return (
    <group position={[0, 0, -7]}>
      {/* Elevated platform */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow material={marble}>
        <cylinderGeometry args={[1.5, 1.8, 0.5, 20]} />
      </mesh>
      {/* Steps */}
      <mesh position={[0, 0.06, 1.2]} receiveShadow material={marble}>
        <boxGeometry args={[2.5, 0.12, 0.8]} />
      </mesh>
      {/* Central pillar */}
      <mesh position={[0, 2.8, 0]} castShadow material={marbleGlow}>
        <cylinderGeometry args={[0.18, 0.28, 4.6, 8]} />
      </mesh>
      {/* Gold band */}
      <mesh position={[0, 2.5, 0]} material={gold}>
        <torusGeometry args={[0.26, 0.03, 8, 16]} />
      </mesh>
      {/* Crown */}
      <mesh position={[0, 5.2, 0]} material={gold}>
        <octahedronGeometry args={[0.18, 0]} />
      </mesh>
      {/* Orbital ring */}
      <group ref={ringRef} position={[0, 5.2, 0]}>
        <mesh>
          <torusGeometry args={[0.4, 0.018, 8, 20]} />
          <meshStandardMaterial
            color="#c9a84c"
            roughness={0.3}
            metalness={0.85}
            emissive="#c9a84c"
            emissiveIntensity={0.12}
            transparent
            opacity={0.65}
          />
        </mesh>
      </group>
      {/* Base ring */}
      <mesh position={[0, 0.12, 0]} material={gold}>
        <torusGeometry args={[1.3, 0.025, 8, 20]} />
      </mesh>
    </group>
  )
}
