/**
 * Layout data for the Founder's Sanctum district.
 *
 * Single source of truth for object positions, matching colliders and visuals.
 */

/** Trees along the approach: [x, z, scale] */
export const APPROACH_TREES: Array<[number, number, number]> = [
  [-4.5, 26, 1.1],
  [4.5, 26, 1.05],
  [-5, 22, 1.0],
  [5, 22, 1.1],
  [-5.5, 18, 1.15],
  [5.5, 18, 1.0],
  [-5, 14, 1.05],
  [5, 14, 1.1],
  [-6, 11, 1.0],
  [6, 11, 1.05],
]

/** Courtyard trees: [x, z, scale] */
export const COURTYARD_TREES: Array<[number, number, number]> = [
  [0, 6, 1.3],
  [-4.5, 8, 0.9],
  [4.5, 8, 0.95],
  [-4.5, -2, 1.0],
  [4.5, -2, 1.05],
]

/** Lamps along the approach: [x, z] */
export const APPROACH_LAMPS: Array<[number, number]> = [
  [-2.2, 28],
  [2.2, 28],
  [-2.2, 24],
  [2.2, 24],
  [-2.2, 20],
  [2.2, 20],
  [-2.2, 16],
  [2.2, 16],
  [-2.2, 12],
  [2.2, 12],
]

/** Courtyard lamps: [x, z] */
export const COURTYARD_LAMPS: Array<[number, number]> = [
  [-5.5, 5],
  [5.5, 5],
  [-5.5, -1],
  [5.5, -1],
]

/** Bushes: [x, z, scale] */
export const BUSHES: Array<[number, number, number]> = [
  [-3.5, 27, 0.8],
  [3.5, 27, 0.8],
  [-3.5, 23, 0.75],
  [3.5, 23, 0.8],
  [-3.5, 19, 0.8],
  [3.5, 19, 0.75],
  [-3.5, 15, 0.8],
  [3.5, 15, 0.8],
  [-3.5, 11.5, 0.75],
  [3.5, 11.5, 0.8],
  [-6.5, 6, 0.7],
  [6.5, 6, 0.75],
  [-6.5, 0, 0.7],
  [6.5, 0, 0.7],
  [-3, -3, 0.75],
  [3, -3, 0.8],
]

/** Flower clusters: [centerX, centerZ, count] */
const FLOWER_CLUSTERS: Array<[number, number, number]> = [
  [-3, 25, 8],
  [3, 25, 8],
  [-3, 21, 6],
  [3, 21, 6],
  [-5, 7, 8],
  [5, 7, 8],
  [-3, -2, 6],
  [3, -2, 6],
]

/** Flower positions: [x, z, color] */
export const FLOWERS: Array<[number, number, number]> = FLOWER_CLUSTERS.flatMap(
  ([cx, cz, count]) =>
    Array.from({ length: count }, (_, i) => [
      cx + (i % 4) * 0.6 - 0.9,
      cz + Math.floor(i / 4) * 0.5 - 0.25,
      (i * 7 + count) % 4,
    ] as [number, number, number]),
)

/** Benches in the courtyard: [x, z, rotationY] */
export const BENCHES: Array<[number, number, number]> = [
  [-3, 5, Math.PI / 2],
  [3, 5, -Math.PI / 2],
  [-3, -1, Math.PI / 2],
  [3, -1, -Math.PI / 2],
]

/** The Founder's Sanctum interaction positions. */
export const FOUNDER_POSITIONS = {
  portrait: { x: 0, z: -8.5 },
  desk: { x: 2.5, z: -10.5 },
  monument: { x: 0, z: -12.5 },
} as const
