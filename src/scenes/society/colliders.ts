import type { Boundary, Collider } from '@/systems/collision/CollisionWorld'

import { TREES } from './data'

/**
 * Static colliders for The Society district.
 */
export const SOCIETY_COLLIDERS: Collider[] = [
  // Community hall
  { kind: 'box', x: 0, z: -16, w: 10, d: 6 },

  // Member houses
  { kind: 'box', x: -16, z: -18, w: 4.5, d: 3.8 },
  { kind: 'box', x: -12, z: -22, w: 4, d: 3.5 },
  { kind: 'box', x: -18, z: -24, w: 4.2, d: 3.6 },

  // Event stage
  { kind: 'box', x: 16, z: -14, w: 5, d: 3 },

  // Notice board
  { kind: 'box', x: 6, z: 8, w: 1.2, d: 0.4 },

  // Wall of Souls
  { kind: 'box', x: 0, z: 14, w: 6, d: 0.6 },

  // Gathering pavilion
  { kind: 'box', x: -8, z: -10, w: 4, d: 3 },

  // Trees
  ...TREES.map(([x, z]) => ({ kind: 'circle' as const, x, z, r: 0.55 })),
]

/** The playable area for The Society. */
export const SOCIETY_BOUNDARY: Boundary = {
  x: 0,
  z: 0,
  radius: 40,
}
