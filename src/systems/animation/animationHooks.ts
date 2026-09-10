import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/**
 * Subtle wind sway for vegetation — trees, bushes, flowers.
 *
 * Uses a shared clock-based sine wave so multiple instances
 * animate coherently without individual timers.
 */
export function useWindAnimation(
  ref: React.RefObject<Group | null>,
  options: { strength?: number; speed?: number; phase?: number } = {},
) {
  const { strength = 0.015, speed = 1.2, phase = 0 } = options

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime
    ref.current.rotation.z = Math.sin(t * speed + phase) * strength
    ref.current.rotation.x = Math.cos(t * speed * 0.7 + phase) * strength * 0.6
  })
}

/**
 * Gentle floating motion — for celestial objects, lanterns, crystals.
 */
export function useFloatingMotion(
  ref: React.RefObject<Group | null>,
  options: { amplitude?: number; speed?: number; phase?: number } = {},
) {
  const { amplitude = 0.15, speed = 0.8, phase = 0 } = options
  const baseY = useRef<number | null>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    if (baseY.current === null) baseY.current = ref.current.position.y
    const t = clock.elapsedTime
    ref.current.position.y = baseY.current + Math.sin(t * speed + phase) * amplitude
  })
}

/**
 * Slow orbital rotation — for decorative rings, celestial symbols.
 */
export function useOrbitalMotion(
  ref: React.RefObject<Group | null>,
  options: { speed?: number; axis?: 'y' | 'x' | 'z' } = {},
) {
  const { speed = 0.3, axis = 'y' } = options

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime * speed
    if (axis === 'y') ref.current.rotation.y = t
    else if (axis === 'x') ref.current.rotation.x = t
    else ref.current.rotation.z = t
  })
}

/**
 * Gentle pulse — for emissive materials, lights, crystals.
 */
export function usePulse(
  callback: (t: number) => void,
  options: { speed?: number; phase?: number } = {},
) {
  const { speed = 1.0, phase = 0 } = options

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    callback(Math.sin(t * speed + phase) * 0.5 + 0.5)
  })
}

/**
 * Water surface animation — gentle vertical oscillation.
 */
export function useWaterMotion(
  ref: React.RefObject<Group | null>,
  options: { amplitude?: number; speed?: number } = {},
) {
  const { amplitude = 0.012, speed = 1.1 } = options
  const baseY = useRef<number | null>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    if (baseY.current === null) baseY.current = ref.current.position.y
    const t = clock.elapsedTime
    ref.current.position.y = baseY.current + Math.sin(t * speed) * amplitude
    ref.current.rotation.z = Math.sin(t * 0.4) * 0.008
  })
}

/**
 * Banner / flag wave — gentle cloth-like oscillation.
 */
export function useBannerWave(
  ref: React.RefObject<Group | null>,
  options: { strength?: number; speed?: number } = {},
) {
  const { strength = 0.04, speed = 1.5 } = options

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime
    ref.current.rotation.y = Math.sin(t * speed) * strength
    ref.current.rotation.z = Math.cos(t * speed * 0.8) * strength * 0.5
  })
}
