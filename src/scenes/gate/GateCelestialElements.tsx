import { CelestialParticles } from '@/systems/particles/CelestialParticles'
import { LightShaftCluster } from '@/systems/atmosphere/LightShaft'
import { FloatingRing, FloatingCrystal } from '@/systems/atmosphere/FloatingElements'
import { DistantSilhouettes } from '@/systems/atmosphere/DistantSilhouettes'

/**
 * Celestial elements for The Gate.
 * The strongest architectural landmark — quiet, monumental, luminous.
 */
export function GateCelestialElements() {
  return (
    <group>
      <LightShaftCluster position={[0, 0, -14]} count={3} spread={2.5} height={24} color="#fff8ee" />
      <FloatingRing position={[0, 8, -14]} radius={1.5} color="#c9a84c" opacity={0.55} />
      <FloatingCrystal position={[-2, 6, -12]} scale={0.3} />
      <FloatingCrystal position={[2, 6.5, -16]} scale={0.25} />
      <FloatingCrystal position={[0, 7, -14]} scale={0.15} />
      <CelestialParticles position={[0, 2, -14]} width={20} height={12} depth={20} count={70} speed={0.15} color="#fff8ee" opacity={0.4} />
      <DistantSilhouettes />
    </group>
  )
}
