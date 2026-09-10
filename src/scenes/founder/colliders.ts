import type { Boundary, Collider } from '@/systems/collision/CollisionWorld'

import { APPROACH_TREES, COURTYARD_TREES } from './data'

/**
 * Static colliders for the Founder's Sanctum.
 */
export const FOUNDER_COLLIDERS: Collider[] = [
  // Approach walls (left)
  { kind: 'box', x: -3.8, z: 20, w: 0.4, d: 22 },
  // Approach walls (right)
  { kind: 'box', x: 3.8, z: 20, w: 0.4, d: 22 },

  // Entrance gate pillars
  { kind: 'circle', x: -2.5, z: 9.5, r: 0.35 },
  { kind: 'circle', x: 2.5, z: 9.5, r: 0.35 },

  // Courtyard fountain
  { kind: 'circle', x: 0, z: 1, r: 2.2 },

  // Main building walls
  { kind: 'box', x: 0, z: -6, w: 10.4, d: 0.5 },
  { kind: 'box', x: -5.2, z: -10, w: 0.5, d: 8.4 },
  { kind: 'box', x: 5.2, z: -10, w: 0.5, d: 8.4 },
  { kind: 'box', x: 0, z: -14.2, w: 10.4, d: 0.5 },

  // Interior partition walls
  { kind: 'box', x: -3.5, z: -8.2, w: 0.3, d: 4.4 },
  { kind: 'box', x: 3.5, z: -8.2, w: 0.3, d: 4.4 },

  // Founder desk
  { kind: 'box', x: 2.5, z: -10.5, w: 1.8, d: 1 },

  // Approach trees
  ...APPROACH_TREES.map(([x, z]) => ({ kind: 'circle' as const, x, z, r: 0.55 })),

  // Courtyard trees
  ...COURTYARD_TREES.map(([x, z]) => ({ kind: 'circle' as const, x, z, r: 0.55 })),
]

/** The playable area for the Founder's Sanctum. */
export const FOUNDER_BOUNDARY: Boundary = {
  x: 0,
  z: 8,
  radius: 38,
}
