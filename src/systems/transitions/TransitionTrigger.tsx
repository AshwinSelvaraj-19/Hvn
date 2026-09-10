import { useFrame } from '@react-three/fiber'

import { usePlayer } from '@/systems/player/PlayerContext'
import type { LocationId } from '@/core/types/world'

interface TransitionTriggerProps {
  /** World position of the trigger center. */
  position: { x: number; z: number }
  /** Activation radius. */
  radius: number
  /** Target location to transition to. */
  target: LocationId
}

/**
 * Automatic transition trigger — fires when the player walks into
 * the trigger zone, no E key required. Uses the window.__HEAVEN__
 * bridge to call transitionTo from the canvas root.
 */
export function TransitionTrigger({ position, radius, target }: TransitionTriggerProps) {
  const { stateRef } = usePlayer()

  useFrame(() => {
    const pos = stateRef.current.position
    const dx = pos.x - position.x
    const dz = pos.z - position.z
    const dist = Math.hypot(dx, dz)
    if (dist < radius) {
      const w = window as unknown as { __HEAVEN__?: { transitionTo?: (id: LocationId) => void } }
      w.__HEAVEN__?.transitionTo?.(target)
    }
  })

  return null
}
