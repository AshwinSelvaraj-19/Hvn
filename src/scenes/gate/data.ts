/**
 * Layout data and configuration for The Gate.
 *
 * Centralized data module — all Gate content in one place.
 */

// ─── Discord Configuration ───────────────────────────────────────────────────

/**
 * Discord invite URL.
 *
 * Replace this value with the real invite link when available.
 * This is the single source of truth — all components import from here.
 */
export const DISCORD_INVITE_URL = 'https://discord.com/invite/YOUR_INVITE'

// ─── Layout Data ─────────────────────────────────────────────────────────────

/** Trees: [x, z, scale] */
export const TREES: Array<[number, number, number]> = [
  // Approach
  [-5, 18, 1.1],
  [5, 18, 1.05],
  [-5, 12, 1.0],
  [5, 12, 1.1],
  [-6, 6, 0.95],
  [6, 6, 1.0],
  // Plaza ring
  [-10, -2, 1.05],
  [10, -2, 1.0],
  [-8, -8, 0.95],
  [8, -8, 1.0],
  // Viewpoint
  [-4, -18, 1.1],
  [4, -18, 1.05],
]

/** Lamps: [x, z] */
export const LAMPS: Array<[number, number]> = [
  // Approach
  [-2.5, 20],
  [2.5, 20],
  [-2.5, 16],
  [2.5, 16],
  [-2.5, 12],
  [2.5, 12],
  [-2.5, 8],
  [2.5, 8],
  // Plaza
  [-8, -2],
  [8, -2],
  [-6, -6],
  [6, -6],
]

/** Bushes: [x, z, scale] */
export const BUSHES: Array<[number, number, number]> = [
  [-4, 19, 0.8],
  [4, 19, 0.75],
  [-4, 15, 0.7],
  [4, 15, 0.8],
  [-7, 4, 0.75],
  [7, 4, 0.7],
  [-9, -4, 0.7],
  [9, -4, 0.75],
  [-6, -10, 0.65],
  [6, -10, 0.7],
]

/** Flower clusters: [centerX, centerZ, count] */
const FLOWER_CLUSTERS: Array<[number, number, number]> = [
  [-4, 10, 6],
  [4, 10, 6],
  [-6, 0, 6],
  [6, 0, 6],
  [-3, -6, 5],
  [3, -6, 5],
]

/** Flower positions: [x, z, color] */
export const FLOWERS: Array<[number, number, number]> = FLOWER_CLUSTERS.flatMap(
  ([cx, cz, count]) =>
    Array.from({ length: count }, (_, i) => [
      cx + (i % 4) * 0.5 - 0.75,
      cz + Math.floor(i / 4) * 0.5 - 0.25,
      (i * 7 + count) % 4,
    ] as [number, number, number]),
)

/** Benches: [x, z, rotationY] */
export const BENCHES: Array<[number, number, number]> = [
  [-6, -4, Math.PI / 2],
  [6, -4, -Math.PI / 2],
  [-4, -8, 0],
  [4, -8, 0],
]

// ─── Interaction Positions ────────────────────────────────────────────────────

export const GATE_POSITIONS = {
  joinPedestal: { x: 0, z: -10 },
  gateMonument: { x: 0, z: -14 },
  viewpoint: { x: 0, z: -20 },
} as const

// ─── Data Model ──────────────────────────────────────────────────────────────

export interface GateMessage {
  title: string
  subtitle: string
  description: string
}

/** Default Gate content. Replace with real content when available. */
export const GATE_MESSAGE: GateMessage = {
  title: 'HEAVEN SOCIETY',
  subtitle: 'JOIN HEAVEN',
  description:
    'This is the entrance to the community. Heaven Society is a place where members connect, create, and explore together.',
}
