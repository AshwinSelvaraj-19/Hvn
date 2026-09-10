import { useEffect } from 'react'

import { setWorldColliders } from '@/systems/collision/CollisionWorld'
import { GATE_COLLIDERS, GATE_BOUNDARY } from './colliders'
import { GateApproach } from './GateApproach'
import { GateArchitecture } from './GateArchitecture'
import { GateAtmosphere } from './GateAtmosphere'
import { GateCelestialElements } from './GateCelestialElements'
import { GateInteractions } from './GateInteractions'
import { GateLighting } from './GateLighting'
import { GatePlaza } from './GatePlaza'
import { GateProps } from './GateProps'
import { GateTerrain } from './GateTerrain'
import { GateViewpoint } from './GateViewpoint'

/**
 * THE GATE — the final destination of Heaven Society.
 *
 * A compact, monumental conclusion: approach → plaza → celestial gate → viewpoint.
 * The player physically walks to the end of their journey and experiences
 * a cinematic conclusion with the Join Heaven interaction.
 */
export function GateScene() {
  useEffect(() => {
    setWorldColliders(GATE_COLLIDERS, GATE_BOUNDARY)
    return () => setWorldColliders([], null)
  }, [])

  return (
    <group>
      <GateTerrain />
      <GateApproach />
      <GatePlaza />
      <GateArchitecture />
      <GateViewpoint />
      <GateProps />
      <GateCelestialElements />
      <GateInteractions />
      <GateAtmosphere />
      <GateLighting />
    </group>
  )
}
