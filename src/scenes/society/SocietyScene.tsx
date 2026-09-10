import { useEffect } from 'react'

import { setWorldColliders } from '@/systems/collision/CollisionWorld'
import { showNotice } from '@/systems/ui/noticeStore'
import { TransitionTrigger } from '@/systems/transitions/TransitionTrigger'
import { SocietyArchitecture } from './SocietyArchitecture'
import { SocietyActivityAreas } from './SocietyActivityAreas'
import { SocietyApproach } from './SocietyApproach'
import { SocietyAtmosphere } from './SocietyAtmosphere'
import { SocietyCelestialElements } from './SocietyCelestialElements'
import { SocietyGarden } from './SocietyGarden'
import { SocietyInteractions } from './SocietyInteractions'
import { SocietyLighting } from './SocietyLighting'
import { SocietyMemberArea } from './SocietyMemberArea'
import { SocietyPlaza } from './SocietyPlaza'
import { SocietyProps } from './SocietyProps'
import { SocietyTerrain } from './SocietyTerrain'
import { SOCIETY_COLLIDERS, SOCIETY_BOUNDARY } from './colliders'

/**
 * THE SOCIETY — the community heart of Heaven Society.
 *
 * A compact community district: approach -> central plaza ->
 * community hall, member area, activity spaces. Registers its
 * colliders on mount so the player and camera systems resolve
 * against them.
 */
export function SocietyScene() {
  useEffect(() => {
    setWorldColliders(SOCIETY_COLLIDERS, SOCIETY_BOUNDARY)
    showNotice('THE SOCIETY')
    return () => setWorldColliders([], null)
  }, [])

  return (
    <group>
      <SocietyTerrain />
      <SocietyApproach />
      <SocietyPlaza />
      <SocietyArchitecture />
      <SocietyMemberArea />
      <SocietyActivityAreas />
      <SocietyGarden />
      <SocietyProps />
      <SocietyCelestialElements />
      <SocietyInteractions />
      <SocietyAtmosphere />
      <SocietyLighting />
      {/* Transition trigger at the south edge — walk here to reach The Gate. */}
      <TransitionTrigger
        position={{ x: 0, z: -38 }}
        radius={3}
        target="gate"
      />
    </group>
  )
}
