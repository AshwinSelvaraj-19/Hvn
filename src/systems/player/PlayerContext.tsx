import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import type { MutableRefObject } from 'react'
import { Vector3 } from 'three'

import { SPAWN } from '@/core/config/world'
import { PLAYER } from './constants'

/**
 * Mutable player state shared between systems.
 *
 * It lives in a ref (no React re-renders) because it is written every
 * frame by the controller and read every frame by the camera rig and
 * character rig. Consumers access `stateRef.current` inside useFrame /
 * effects, never during render.
 */
export interface PlayerState {
  /** World position of the player's feet. */
  position: Vector3
  /** Horizontal camera orbit angle (radians). */
  yaw: number
  /** Vertical camera orbit elevation (radians), clamped to pitch limits. */
  pitch: number
  /** Character heading (radians) — faces movement direction. */
  facing: number
  /** Current horizontal speed — useful for footsteps/animation later. */
  speed: number
  /** Whether the sprint key is held this frame. */
  sprinting: boolean
}

export interface PlayerContextValue {
  stateRef: MutableRefObject<PlayerState>
  /** Move the player to a world position (used by scene transitions). */
  teleport: (x: number, z: number) => void
}

const PlayerContext = createContext<PlayerContextValue | null>(null)

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const stateRef = useRef<PlayerState>({
    position: new Vector3(SPAWN.x, 0, SPAWN.z),
    yaw: 0,
    pitch: PLAYER.defaultPitch,
    facing: 0,
    speed: 0,
    sprinting: false,
  })

  const teleport = useCallback(
    (x: number, z: number) => {
      stateRef.current.position.set(x, 0, z)
      stateRef.current.speed = 0
    },
    [stateRef],
  )

  // Dev/testing hook so the player can be moved from the console:
  // window.__HEAVEN__.player.teleport(x, z)
  useEffect(() => {
    const w = window as unknown as { __HEAVEN__?: Record<string, unknown> }
    w.__HEAVEN__ = {
      ...(w.__HEAVEN__ ?? {}),
      player: {
        teleport,
        getState: () => {
          const s = stateRef.current
          return {
            x: s.position.x,
            y: s.position.y,
            z: s.position.z,
            yaw: s.yaw,
            pitch: s.pitch,
            facing: s.facing,
            speed: s.speed,
          }
        },
      },
    }
  }, [stateRef, teleport])

  const value = useMemo<PlayerContextValue>(
    () => ({ stateRef, teleport }),
    [stateRef, teleport],
  )

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePlayer(): PlayerContextValue {
  const ctx = useContext(PlayerContext)
  if (!ctx) {
    throw new Error('usePlayer must be used inside <PlayerProvider> (within the Canvas)')
  }
  return ctx
}