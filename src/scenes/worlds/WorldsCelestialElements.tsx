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
 * Celestial elements for The Worlds.
 * Dynamic, energetic celestial architecture.
 */
export function WorldsCelestialElements() {
  return (
    <group>
      <WorldsMonument />
      <LightShaftCluster position={[-12, 0, 6]} count={2} spread={2} height={16} />
      <LightShaftCluster position={[12, 0, 6]} count={2} spread={2} height={16} />
      <FloatingRing position={[-14, 5, 8]} radius={0.7} color="#4a7fa8" opacity={0.4} />
      <FloatingRing position={[14, 5, 8]} radius={0.7} color="#4a8a5a" opacity={0.4} />
      <FloatingCrystal position={[0, 6, 0]} scale={0.3} />
      <FloatingCrystal position={[-8, 4, -6]} scale={0.18} />
      <FloatingCrystal position={[8, 4.5, -6]} scale={0.18} />
      <CelestialParticles position={[0, 2, 0]} width={32} height={10} depth={32} count={55} speed={0.25} />
      <DistantSilhouettes />
    </group>
  )
}

/** Worlds activity monument — dynamic, expressive. */
function WorldsMonument() {
  const ringRef = useRef<Group>(null)
  useOrbitalMotion(ringRef, { speed: 0.3 })

  usePulse((t) => {
    if (!ringRef.current) return
    ringRef.current.children.forEach((child) => {
      if (child instanceof THREE.Mesh && child.material && 'emissiveIntensity' in child.material) {
        ;(child.material as { emissiveIntensity: number }).emissiveIntensity = 0.18 + t * 0.12
      }
    })
  }, { speed: 0.7 })

  return (
    <group position={[0, 0, 0]}>
      {/* Base */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow material={marble}>
        <cylinderGeometry args={[1.6, 1.8, 0.4, 20]} />
      </mesh>
      {/* Central pillar */}
      <mesh position={[0, 2.6, 0]} castShadow material={marbleGlow}>
        <cylinderGeometry args={[0.2, 0.32, 4.6, 8]} />
      </mesh>
      {/* Dynamic rings */}
      <group ref={ringRef} position={[0, 3.0, 0]}>
        <mesh>
          <torusGeometry args={[0.6, 0.025, 8, 24]} />
          <meshStandardMaterial
            color="#4a7fa8"
            roughness={0.3}
            metalness={0.7}
            emissive="#4a7fa8"
            emissiveIntensity={0.15}
            transparent
            opacity={0.6}
          />
        </mesh>
        <mesh rotation-x={Math.PI / 3}>
          <torusGeometry args={[0.6, 0.025, 8, 24]} />
          <meshStandardMaterial
            color="#4a8a5a"
            roughness={0.3}
            metalness={0.7}
            emissive="#4a8a5a"
            emissiveIntensity={0.15}
            transparent
            opacity={0.6}
          />
        </mesh>
      </group>
      {/* Crown */}
      <mesh position={[0, 5.05, 0]} material={gold}>
        <octahedronGeometry args={[0.22, 0]} />
      </mesh>
      {/* Base ring */}
      <mesh position={[0, 0.1, 0]} material={gold}>
        <torusGeometry args={[1.4, 0.025, 8, 20]} />
      </mesh>
    </group>
  )
}
