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
 * Celestial elements for The Society.
 * Beautiful communal garden with large symbolic monument.
 */
export function SocietyCelestialElements() {
  return (
    <group>
      <SocietyMonument />
      <LightShaftCluster position={[-6, 0, -10]} count={2} spread={2.5} height={18} />
      <LightShaftCluster position={[6, 0, -10]} count={2} spread={2.5} height={16} />
      <FloatingRing position={[0, 5.5, -12]} radius={0.9} />
      <FloatingCrystal position={[-4, 4, -8]} scale={0.2} />
      <FloatingCrystal position={[4, 4.5, -10]} scale={0.18} />
      <CelestialParticles position={[0, 2, 0]} width={28} height={10} depth={28} count={45} speed={0.2} />
      <DistantSilhouettes />
    </group>
  )
}

/** Society's communal monument — welcoming, symbolic. */
function SocietyMonument() {
  const ringRef = useRef<Group>(null)
  useOrbitalMotion(ringRef, { speed: 0.22 })

  usePulse((t) => {
    if (!ringRef.current) return
    ringRef.current.children.forEach((child) => {
      if (child instanceof THREE.Mesh && child.material && 'emissiveIntensity' in child.material) {
        ;(child.material as { emissiveIntensity: number }).emissiveIntensity = 0.14 + t * 0.09
      }
    })
  }, { speed: 0.55 })

  return (
    <group position={[0, 0, -12]}>
      {/* Base */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow material={marble}>
        <cylinderGeometry args={[1.3, 1.5, 0.5, 18]} />
      </mesh>
      {/* Central obelisk */}
      <mesh position={[0, 3.0, 0]} castShadow material={marbleGlow}>
        <cylinderGeometry args={[0.16, 0.3, 5.2, 8]} />
      </mesh>
      {/* Gold bands */}
      <mesh position={[0, 2.0, 0]} material={gold}>
        <torusGeometry args={[0.28, 0.025, 8, 16]} />
      </mesh>
      <mesh position={[0, 4.0, 0]} material={gold}>
        <torusGeometry args={[0.2, 0.02, 8, 14]} />
      </mesh>
      {/* Crown */}
      <mesh position={[0, 5.7, 0]} material={gold}>
        <octahedronGeometry args={[0.2, 0]} />
      </mesh>
      {/* Orbital ring */}
      <group ref={ringRef} position={[0, 5.7, 0]}>
        <mesh>
          <torusGeometry args={[0.45, 0.018, 8, 22]} />
          <meshStandardMaterial
            color="#c9a84c"
            roughness={0.3}
            metalness={0.85}
            emissive="#c9a84c"
            emissiveIntensity={0.14}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>
      {/* Base ring */}
      <mesh position={[0, 0.12, 0]} material={gold}>
        <torusGeometry args={[1.1, 0.025, 8, 18]} />
      </mesh>
    </group>
  )
}
