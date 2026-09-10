import type { Boundary, Collider } from '@/systems/collision/CollisionWorld'

import { BENCHES, TREES } from './data'

/**
 * Static colliders for The Gate.
 */
export const GATE_COLLIDERS: Collider[] = [
  // Celestial Gate structure
  { kind: 'box', x: 0, z: -14, w: 6, d: 2.5 },

  // Gate pillars (left and right)
  { kind: 'box', x: -3, z: -14, w: 1.2, d: 1.2 },
  { kind: 'box', x: 3, z: -14, w: 1.2, d: 1.2 },

  // Stairs
  { kind: 'box', x: 0, z: -12.5, w: 5, d: 1.5 },

  // Viewpoint wall
  { kind: 'box', x: 0, z: -22, w: 8, d: 0.6 },

  // Benches
  ...BENCHES.map(([x, z]) => ({ kind: 'box' as const, x, z, w: 1.3, d: 0.5 })),

  // Trees
  ...TREES.map(([x, z]) => ({ kind: 'circle' as const, x, z, r: 0.55 })),
]

/** The playable area for The Gate. */
export const GATE_BOUNDARY: Boundary = {
  x: 0,
  z: -6,
  radius: 38,
}
