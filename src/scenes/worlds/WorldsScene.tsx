import { useEffect } from 'react'

import { setWorldColliders } from '@/systems/collision/CollisionWorld'
import { TransitionTrigger } from '@/systems/transitions/TransitionTrigger'
import { WORLDS_COLLIDERS, WORLDS_BOUNDARY } from './colliders'
import { WorldsApproach } from './WorldsApproach'
import { WorldsAtmosphere } from './WorldsAtmosphere'
import { WorldsCelestialElements } from './WorldsCelestialElements'
import { WorldsEventArena } from './WorldsEventArena'
import { WorldsGamingHall } from './WorldsGamingHall'
import { WorldsGarden } from './WorldsGarden'
import { WorldsInteractions } from './WorldsInteractions'
import { WorldsLighting } from './WorldsLighting'
import { WorldsPlaza } from './WorldsPlaza'
import { WorldsProps } from './WorldsProps'
import { WorldsTerrain } from './WorldsTerrain'
import { WorldsTrophyGallery } from './WorldsTrophyGallery'
import { WorldsVoiceLounge } from './WorldsVoiceLounge'

/**
 * THE WORLDS — the activity district of Heaven Society.
 *
 * A compact district representing the experiences and things members do:
 * gaming, events, voice/social, competitions. Each area has physical
 * architecture that communicates its purpose. Data-ready — structures
 * support future dynamic content.
 *
 * Layout: Approach from east → Central Plaza → four areas radiating outward.
 */
export function WorldsScene() {
  useEffect(() => {
    setWorldColliders(WORLDS_COLLIDERS, WORLDS_BOUNDARY)
    return () => setWorldColliders([], null)
  }, [])

  return (
    <group>
      <WorldsTerrain />
      <WorldsApproach />
      <WorldsPlaza />
      <WorldsGamingHall />
      <WorldsEventArena />
      <WorldsVoiceLounge />
      <WorldsTrophyGallery />
      <WorldsGarden />
      <WorldsProps />
      <WorldsCelestialElements />
      <WorldsInteractions />
      <WorldsAtmosphere />
      <WorldsLighting />
      {/* Transition trigger at the west edge — walk here to reach The Gate. */}
      <TransitionTrigger
        position={{ x: -38, z: 0 }}
        radius={3}
        target="gate"
      />
    </group>
  )
}
