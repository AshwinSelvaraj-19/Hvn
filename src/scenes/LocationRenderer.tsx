import { useEffect, useRef } from 'react'
import type { ComponentType } from 'react'

import { getLocationDefinition, SPAWN } from '@/core/config/world'
import type { LocationId } from '@/core/types/world'
import { usePlayer } from '@/systems/player/PlayerContext'
import { ArrivalScene } from './arrival/ArrivalScene'
import { FounderSanctumScene } from './founder/FounderSanctumScene'
import { SocietyScene } from './society/SocietyScene'
import { WorldsScene } from './worlds/WorldsScene'
import { GateScene } from './gate/GateScene'

/**
 * Scene map: location id -> scene component.
 *
 * Phase 1: The Arrival is real. The other four locations still use the
 * development scaffold until their phases land. Each location is one
 * isolated file, so they can be built and modified independently.
 */
const SCENES: Record<LocationId, ComponentType> = {
  arrival: ArrivalScene,
  'founders-sanctum': FounderSanctumScene,
  society: SocietyScene,
  worlds: WorldsScene,
  gate: GateScene,
}

interface LocationRendererProps {
  locationId: LocationId
}

/**
 * Mounts the scene for the active location and moves the player to the
 * location's spawn point whenever the location changes.
 */
export function LocationRenderer({ locationId }: LocationRendererProps) {
  const { teleport } = usePlayer()
  const previous = useRef(locationId)

  const spawn = getLocationDefinition(locationId).spawn ?? SPAWN

  useEffect(() => {
    if (previous.current !== locationId) {
      previous.current = locationId
      teleport(spawn.x, spawn.z)
    }
  }, [locationId, spawn.x, spawn.z, teleport])

  const Scene = SCENES[locationId]
  return <Scene />
}