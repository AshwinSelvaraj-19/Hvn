import { useFrame } from '@react-three/fiber'

import { usePlayer } from '@/systems/player/PlayerContext'
import {
  getInteractions,
  setActiveInteraction,
} from './interactionStore'
import type { InteractionTarget } from './interactionStore'

/**
 * Canvas-side proximity manager.
 *
 * Each frame, picks the nearest registered interactable within its
 * radius and publishes it to the store as the active prompt. The DOM
 * HUD subscribes to the store, so proximity and rendering stay
 * decoupled across the two React roots.
 */
export function InteractionManager() {
  const { stateRef } = usePlayer()

  useFrame(() => {
    const pos = stateRef.current.position
    let best: InteractionTarget | null = null
    let bestDist = Infinity
    for (const target of getInteractions()) {
      if (!target.position) continue
      const dx = pos.x - target.position.x
      const dz = pos.z - target.position.z
      const dist = Math.hypot(dx, dz)
      if (dist <= (target.radius ?? 1.5) && dist < bestDist) {
        best = target
        bestDist = dist
      }
    }
    setActiveInteraction(best)
  })

  return null
}