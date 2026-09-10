import type { Boundary, Collider } from '@/systems/collision/CollisionWorld'

import { GAMING_TABLES, TROPHY_PEDESTALS, TREES } from './data'

/**
 * Static colliders for The Worlds district.
 */
export const WORLDS_COLLIDERS: Collider[] = [
  // Gaming Hall
  { kind: 'box', x: -15, z: 8, w: 8, d: 8 },

  // Event Arena
  { kind: 'box', x: 0, z: -16, w: 12, d: 8 },

  // Voice Lounge
  { kind: 'box', x: 16, z: -8, w: 6, d: 6 },

  // Trophy Gallery
  { kind: 'box', x: -16, z: -14, w: 6, d: 5 },

  // Activity Monument (center)
  { kind: 'circle', x: 0, z: 0, r: 2.5 },

  // Gaming tables
  ...GAMING_TABLES.map(([x, z]) => ({ kind: 'box' as const, x, z, w: 1.8, d: 1.2 })),

  // Trophy pedestals
  ...TROPHY_PEDESTALS.map(([x, z]) => ({ kind: 'box' as const, x, z, w: 0.8, d: 0.8 })),

  // Trees
  ...TREES.map(([x, z]) => ({ kind: 'circle' as const, x, z, r: 0.55 })),
]

/** The playable area for The Worlds. */
export const WORLDS_BOUNDARY: Boundary = {
  x: 0,
  z: 0,
  radius: 42,
}
