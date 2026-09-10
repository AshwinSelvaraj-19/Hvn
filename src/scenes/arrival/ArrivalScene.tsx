import { useEffect } from 'react'

import { setWorldColliders } from '@/systems/collision/CollisionWorld'
import { TransitionTrigger } from '@/systems/transitions/TransitionTrigger'
import { ArrivalArchitecture } from './ArrivalArchitecture'
import { ArrivalAtmosphere } from './ArrivalAtmosphere'
import { ArrivalCelestialElements } from './ArrivalCelestialElements'
import { ArrivalGardens } from './ArrivalGardens'
import { ArrivalInteractions } from './ArrivalInteractions'
import { ArrivalLighting } from './ArrivalLighting'
import { ArrivalProps } from './ArrivalProps'
import { ArrivalRoads } from './ArrivalRoads'
import { ArrivalSpawn } from './ArrivalSpawn'
import { ArrivalTerrain } from './ArrivalTerrain'
import { ARRIVAL_BOUNDARY, ARRIVAL_COLLIDERS } from './colliders'

/**
 * THE ARRIVAL — the entrance district of Heaven Society.
 *
 * A compact celestial settlement: spawn -> path -> central plaza, with
 * architecture, gardens and distant destination hints beyond the
 * district edge. Registers its colliders + boundary on mount so the
 * player and camera systems resolve against them.
 */
export function ArrivalScene() {
  // Register collision data for the player/camera systems.
  useEffect(() => {
    setWorldColliders(ARRIVAL_COLLIDERS, ARRIVAL_BOUNDARY)
    return () => setWorldColliders([], null)
  }, [])

  return (
    <group>
      <ArrivalTerrain />
      <ArrivalRoads />
      <ArrivalArchitecture />
      <ArrivalGardens />
      <ArrivalProps />
      <ArrivalCelestialElements />
      <ArrivalSpawn />
      <ArrivalInteractions />
      <ArrivalAtmosphere />
      <ArrivalLighting />
      {/* Transition trigger at the north edge — walk here to reach the Founder's Sanctum. */}
      <TransitionTrigger
        position={{ x: 0, z: -38 }}
        radius={3}
        target="founders-sanctum"
      />
      {/* Transition trigger at the east edge — walk here to reach The Society. */}
      <TransitionTrigger
        position={{ x: 38, z: 0 }}
        radius={3}
        target="society"
      />
      {/* Transition trigger at the west edge — walk here to reach The Worlds. */}
      <TransitionTrigger
        position={{ x: -38, z: 0 }}
        radius={3}
        target="worlds"
      />
    </group>
  )
}