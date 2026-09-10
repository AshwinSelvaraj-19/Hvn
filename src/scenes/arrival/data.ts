/**
 * Layout data for The Arrival district.
 *
 * Single source of truth for where repeated objects go, so the gardens,
 * props and colliders never drift apart.
 */

/** [x, z, scale] */
export const TREES: Array<[number, number, number]> = [
  // Ring around the central plaza
  [-5.5, 8.5, 1.1],
  [5.5, 8.5, 1.05],
  [-8.5, 4, 1.2],
  [8.5, 4, 1.15],
  [-8.5, -4, 1.1],
  [8.5, -4, 1.2],
  [-5.5, -7, 1.05],
  [5.5, -7, 1.1],
  // Along the arrival path
  [-3, 12, 1.0],
  [3, 12, 0.95],
  [-3, 16.5, 1.1],
  [3, 16.5, 1.05],
  [-3, 21, 1.0],
  [3, 21, 1.15],
  // Near the flanking buildings
  [-13, 4.5, 1.15],
  [13, 4.5, 1.1],
  [-13, -6.5, 1.05],
  [13, -6.5, 1.15],
  [-17.5, -8, 1.2],
  [17.5, -8, 1.1],
  [-17, 6, 1.0],
  [17, 6, 1.05],
]

/** [x, z] */
export const LAMPS: Array<[number, number]> = [
  // Arrival path
  [-1.9, 11],
  [1.9, 11],
  [-1.9, 15],
  [1.9, 15],
  [-1.9, 19],
  [1.9, 19],
  [-1.9, 23],
  [1.9, 23],
  // Plaza ring
  [0, 6.9],
  [6.9, 0],
  [0, -6.9],
  [-6.9, 0],
  // Spawn pad
  [-1.6, 27.8],
  [1.6, 27.8],
]

/** [x, z, scale] */
export const BUSHES: Array<[number, number, number]> = [
  [3.4, 8.6, 1.0],
  [-3.4, 8.6, 0.9],
  [8.2, 5.8, 0.9],
  [-8.2, 5.8, 1.0],
  [8.2, -5.8, 1.0],
  [-8.2, -5.8, 0.9],
  [3.4, -8.2, 0.9],
  [-3.4, -8.2, 1.0],
  [2.4, 10, 0.8],
  [-2.4, 10, 0.8],
  [2.4, 13.5, 0.8],
  [-2.4, 13.5, 0.8],
  [2.4, 17.5, 0.8],
  [-2.4, 17.5, 0.8],
  [2.4, 22, 0.8],
  [-2.4, 22, 0.8],
  [-12.6, 2.4, 0.9],
  [-12.6, -4.4, 0.9],
  [12.6, 2.4, 0.9],
  [12.6, -4.4, 0.9],
  [-9.2, 1.5, 0.8],
  [9.2, 1.5, 0.8],
  [-4.5, -11.6, 0.9],
  [4.5, -11.6, 0.9],
  [-16.5, 9.8, 0.8],
  [16.5, 9.8, 0.8],
]

/** Flower clusters: [centerX, centerZ, count] */
const FLOWER_CLUSTERS: Array<[number, number, number]> = [
  [2.6, 7.6, 10],
  [-2.6, 7.6, 10],
  [6.4, 4.6, 8],
  [-6.4, 4.6, 8],
  [2.4, 11.4, 8],
  [-2.4, 11.4, 8],
  [4.2, -6.4, 8],
  [-4.2, -6.4, 8],
  [3.2, -8.6, 6],
  [-3.2, -8.6, 6],
  [1.4, 19.2, 8],
  [-1.4, 19.2, 8],
]

/**
 * Flower positions with a color index: [x, z, color].
 * Generated deterministically from the clusters.
 */
export const FLOWERS: Array<[number, number, number]> = FLOWER_CLUSTERS.flatMap(
  ([cx, cz, count]) =>
    Array.from({ length: count }, (_, i) => [
      cx + (i % 5) * 0.55 - 1.1,
      cz + Math.floor(i / 5) * 0.5 - 0.5,
      (i * 7 + count) % 4,
    ] as [number, number, number]),
)

/** [x, z, scale] — scattered rocks near the district edges. */
export const ROCKS: Array<[number, number, number]> = [
  [12, 14, 1.1],
  [-12, 14, 0.9],
  [18, -10, 1.3],
  [-18, -10, 1.0],
  [22, 4, 0.8],
  [-22, 4, 1.2],
  [8, 24, 0.9],
  [-8, 24, 1.0],
  [14, -18, 1.1],
  [-14, -18, 0.9],
  [0, 27.5, 1.2],
  [20, -16, 0.7],
  [-20, -16, 1.0],
  [6, -24, 1.1],
]

/** Benches: [x, z, rotationY] */
export const BENCHES: Array<[number, number, number]> = [
  [0, 6.3, 0],
  [0, -6.7, Math.PI],
  [6.5, 2.2, -Math.PI / 2],
  [-6.5, 2.2, Math.PI / 2],
  [6.5, -2.2, -Math.PI / 2],
  [-6.5, -2.2, Math.PI / 2],
]

/** Planters: [x, z] */
export const PLANTERS: Array<[number, number]> = [
  [2.6, 8.9],
  [-2.6, 8.9],
  [3.9, -6.9],
  [-3.9, -6.9],
]

/** Statues: [x, z, rotationY] */
export const STATUES: Array<[number, number, number]> = [
  [3.9, 4.9, -Math.PI / 4],
  [-3.9, -4.9, Math.PI / 4],
]

/** The arrival marker stele (interactable). */
export const ARRIVAL_MARKER = { x: 1.7, z: 23 } as const