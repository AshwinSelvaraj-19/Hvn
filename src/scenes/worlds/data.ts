/**
 * Layout data for The Worlds district.
 *
 * Single source of truth for object positions, matching colliders and visuals.
 */

/** Trees in the district: [x, z, scale] */
export const TREES: Array<[number, number, number]> = [
  // Plaza ring
  [-9, 4, 1.1],
  [9, 4, 1.05],
  [-9, -4, 1.0],
  [9, -4, 1.1],
  // Approach
  [-4, 20, 1.0],
  [4, 20, 1.1],
  [-4, 26, 1.05],
  [4, 26, 1.0],
  // Gaming hall area
  [-18, 8, 0.95],
  [-16, 14, 1.0],
  // Event arena area
  [4, -18, 1.05],
  [-4, -18, 1.0],
  // Voice lounge area
  [18, -8, 0.95],
  [16, -14, 1.0],
  // Trophy gallery
  [-18, -12, 0.9],
]

/** Lamps: [x, z] */
export const LAMPS: Array<[number, number]> = [
  // Approach
  [-2.2, 28],
  [2.2, 28],
  [-2.2, 24],
  [2.2, 24],
  [-2.2, 20],
  [2.2, 20],
  // Plaza ring
  [-8, 7],
  [8, 7],
  [-8, -7],
  [8, -7],
  [0, 10],
  [0, -10],
  // Gaming hall
  [-14, 10],
  [-14, 6],
  // Event arena
  [6, -14],
  [-6, -14],
  // Voice lounge
  [14, -6],
  [14, -10],
]

/** Bushes: [x, z, scale] */
export const BUSHES: Array<[number, number, number]> = [
  [-3, 27, 0.8],
  [3, 27, 0.8],
  [-3, 23, 0.75],
  [3, 23, 0.8],
  [-10, 6, 0.7],
  [10, 6, 0.75],
  [-10, -6, 0.7],
  [10, -6, 0.7],
  [-14, 4, 0.75],
  [14, -4, 0.7],
  [-6, -12, 0.65],
  [6, -12, 0.7],
  [-16, -8, 0.7],
  [16, -12, 0.75],
  [10, 10, 0.65],
]

/** Flower clusters: [centerX, centerZ, count] */
const FLOWER_CLUSTERS: Array<[number, number, number]> = [
  [-6, 8, 8],
  [6, 8, 8],
  [-6, -8, 6],
  [6, -8, 6],
  [-3, 12, 6],
  [3, 12, 6],
  [-16, 2, 6],
  [16, -8, 6],
]

/** Flower positions: [x, z, color] */
export const FLOWERS: Array<[number, number, number]> = FLOWER_CLUSTERS.flatMap(
  ([cx, cz, count]) =>
    Array.from({ length: count }, (_, i) => [
      cx + (i % 4) * 0.55 - 0.825,
      cz + Math.floor(i / 4) * 0.5 - 0.25,
      (i * 7 + count) % 4,
    ] as [number, number, number]),
)

/** Benches: [x, z, rotationY] */
export const BENCHES: Array<[number, number, number]> = [
  // Plaza
  [-6, 5, Math.PI / 2],
  [6, 5, -Math.PI / 2],
  [-6, -5, Math.PI / 2],
  [6, -5, -Math.PI / 2],
  // Voice lounge
  [16, -8, 0],
  [18, -6, Math.PI / 2],
  [18, -10, -Math.PI / 2],
  // Gaming hall
  [-16, 8, 0],
  [-14, 12, Math.PI],
]

/** Tables: [x, z, rotationY] */
export const TABLES: Array<[number, number, number]> = [
  // Plaza gathering
  [3, 3, 0],
  [-3, 3, Math.PI / 4],
  [3, -3, -Math.PI / 4],
  // Voice lounge
  [16, -8, 0],
]

/** Gaming tables: [x, z, rotationY] */
export const GAMING_TABLES: Array<[number, number, number]> = [
  [-16, 6, 0],
  [-14, 8, Math.PI / 2],
  [-16, 10, Math.PI],
]

/** Trophy pedestals: [x, z] */
export const TROPHY_PEDESTALS: Array<[number, number]> = [
  [-16, -12],
  [-14, -14],
  [-18, -14],
  [-16, -16],
  [-14, -12],
  [-18, -12],
]

/** The Worlds interaction positions. */
export const WORLDS_POSITIONS = {
  gamingHall: { x: -15, z: 8 },
  eventArena: { x: 0, z: -16 },
  voiceLounge: { x: 16, z: -8 },
  trophyGallery: { x: -16, z: -14 },
  activityMonument: { x: 0, z: 0 },
} as const

/** Activity data model — future-ready structures. */
export interface Activity {
  id: string
  title: string
  category: 'gaming' | 'events' | 'voice' | 'competition' | 'general'
  description: string
}

export interface Competition {
  id: string
  title: string
  date: string
  status: 'upcoming' | 'active' | 'completed'
}

export interface Achievement {
  id: string
  title: string
  description: string
}

/** Placeholder activity data. */
export const ACTIVITIES: Activity[] = [
  { id: 'act1', title: 'Community Games', category: 'gaming', description: 'Friendly competitions bring members together.' },
  { id: 'act2', title: 'Voice Sessions', category: 'voice', description: 'Real-time conversations build connections.' },
  { id: 'act3', title: 'Community Events', category: 'events', description: 'Celebrations and gatherings for all members.' },
  { id: 'act4', title: 'Tournaments', category: 'competition', description: 'Competitive events test skill and strategy.' },
]

/** Placeholder competition data. */
export const COMPETITIONS: Competition[] = [
  { id: 'comp1', title: 'Weekly Tournament', date: 'Every Saturday', status: 'upcoming' },
  { id: 'comp2', title: 'Community Challenge', date: 'Monthly', status: 'active' },
]

/** Placeholder achievement data. */
export const ACHIEVEMENTS: Achievement[] = [
  { id: 'ach1', title: 'First Steps', description: 'Joined the first community event.' },
  { id: 'ach2', title: 'Community Spirit', description: 'Participated in 10 gatherings.' },
  { id: 'ach3', title: 'Champion', description: 'Won a community tournament.' },
]
