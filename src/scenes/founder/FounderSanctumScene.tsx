import { useEffect } from 'react'

import { setWorldColliders } from '@/systems/collision/CollisionWorld'
import { showNotice } from '@/systems/ui/noticeStore'
import { FounderArchitecture } from './FounderArchitecture'
import { FounderAtmosphere } from './FounderAtmosphere'
import { FounderApproach } from './FounderApproach'
import { FounderCelestialElements } from './FounderCelestialElements'
import { FounderCourtyard } from './FounderCourtyard'
import { FounderGarden } from './FounderGarden'
import { FounderInteractions } from './FounderInteractions'
import { FounderInterior } from './FounderInterior'
import { FounderLighting } from './FounderLighting'
import { FounderProps } from './FounderProps'
import { FounderTerrain } from './FounderTerrain'
import { FOUNDER_COLLIDERS, FOUNDER_BOUNDARY } from './colliders'

/**
 * THE FOUNDER'S SANCTUM — the origin of Heaven Society.
 *
 * A compact, prestigious sanctuary: approach path -> courtyard ->
 * main building with interior rooms. Registers its colliders on
 * mount so the player and camera systems resolve against them.
 */
export function FounderSanctumScene() {
  useEffect(() => {
    setWorldColliders(FOUNDER_COLLIDERS, FOUNDER_BOUNDARY)
    showNotice('THE FOUNDER\'S SANCTUM')
    return () => setWorldColliders([], null)
  }, [])

  return (
    <group>
      <FounderTerrain />
      <FounderApproach />
      <FounderCourtyard />
      <FounderArchitecture />
      <FounderInterior />
      <FounderGarden />
      <FounderProps />
      <FounderCelestialElements />
      <FounderInteractions />
      <FounderAtmosphere />
      <FounderLighting />
    </group>
  )
}
