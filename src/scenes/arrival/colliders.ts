import type { Boundary, Collider } from '@/systems/collision/CollisionWorld'

import { TREES } from './data'

/**
 * Static colliders for The Arrival. Kept in one file so architects can
 * tune the world without touching gameplay systems.
 */
export const ARRIVAL_COLLIDERS: Collider[] = [
  // Fountain basin (impassable ring) + central obelisk
  { kind: 'circle', x: 0, z: 0, r: 3.6 },

  // Entrance arch piers
  { kind: 'box', x: -2.2, z: 6.5, w: 0.95, d: 0.95 },
  { kind: 'box', x: 2.2, z: 6.5, w: 0.95, d: 0.95 },

  // West guild hall
  { kind: 'box', x: -11, z: -1, w: 7.4, d: 5.4 },
  // East guild hall
  { kind: 'box', x: 11, z: -1, w: 7.4, d: 5.4 },

  // Community hall + portico columns + porch step
  { kind: 'box', x: 0, z: -14, w: 10.4, d: 6.4 },
  { kind: 'circle', x: -3.3, z: -10.35, r: 0.32 },
  { kind: 'circle', x: -1.9, z: -10.35, r: 0.32 },
  { kind: 'circle', x: 1.9, z: -10.35, r: 0.32 },
  { kind: 'circle', x: 3.3, z: -10.35, r: 0.32 },
  { kind: 'box', x: 0, z: -9.7, w: 6.4, d: 1.1 },

  // Small houses
  { kind: 'box', x: -14.5, z: 8.5, w: 5, d: 4 },
  { kind: 'box', x: 14.5, z: 8.5, w: 5, d: 4 },
  { kind: 'box', x: -15, z: -10, w: 4.5, d: 4 },
  { kind: 'box', x: 15, z: -10, w: 4.5, d: 4 },
  { kind: 'box', x: 16.5, z: 2.5, w: 4, d: 3.5 },
  { kind: 'box', x: -16.5, z: 2.5, w: 4, d: 3.5 },

  // Trees (circle around each trunk)
  ...TREES.map(([x, z]) => ({ kind: 'circle' as const, x, z, r: 0.55 })),
]

/** The playable district: the settlement itself. */
export const ARRIVAL_BOUNDARY: Boundary = {
  x: 0,
  z: 0,
  radius: 42,
}