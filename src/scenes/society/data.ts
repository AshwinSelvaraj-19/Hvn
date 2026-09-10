/**
 * Layout data for The Society district.
 *
 * Single source of truth for object positions, matching colliders and visuals.
 */

/** Trees in the district: [x, z, scale] */
export const TREES: Array<[number, number, number]> = [
  // Plaza ring
  [-8, 3, 1.1],
  [8, 3, 1.05],
  [-8, -3, 1.0],
  [8, -3, 1.1],
  [-5, 8, 1.15],
  [5, 8, 1.0],
  [-5, -8, 1.05],
  [5, -8, 1.1],
  // Approach
  [-4, 18, 1.0],
  [4, 18, 1.1],
  [-4, 24, 1.05],
  [4, 24, 1.0],
  // Member area
  [-18, -16, 0.95],
  [-14, -22, 1.0],
  [-20, -20, 0.9],
  // Activity areas
  [14, -10, 1.05],
  [18, 5, 1.0],
  [16, -18, 0.95],
]

/** Lamps: [x, z] */
export const LAMPS: Array<[number, number]> = [
  // Approach
  [-2.2, 26],
  [2.2, 26],
  [-2.2, 22],
  [2.2, 22],
  [-2.2, 18],
  [2.2, 18],
  // Plaza ring
  [-7, 6],
  [7, 6],
  [-7, -6],
  [7, -6],
  [0, 9],
  [0, -9],
  // Member area
  [-16, -14],
  [-12, -18],
  // Activity areas
  [12, -6],
  [16, 2],
]

/** Bushes: [x, z, scale] */
export const BUSHES: Array<[number, number, number]> = [
  [-3, 25, 0.8],
  [3, 25, 0.8],
  [-3, 21, 0.75],
  [3, 21, 0.8],
  [-9, 5, 0.7],
  [9, 5, 0.75],
  [-9, -5, 0.7],
  [9, -5, 0.7],
  [-12, -15, 0.75],
  [-10, -22, 0.8],
  [12, -8, 0.7],
  [14, 4, 0.75],
  [10, -16, 0.7],
  [-6, -12, 0.65],
  [6, -12, 0.7],
]

/** Flower clusters: [centerX, centerZ, count] */
const FLOWER_CLUSTERS: Array<[number, number, number]> = [
  [-6, 6, 8],
  [6, 6, 8],
  [-6, -6, 6],
  [6, -6, 6],
  [-3, 10, 6],
  [3, 10, 6],
  [-15, -18, 6],
  [14, -14, 6],
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
  [-5, 4, Math.PI / 2],
  [5, 4, -Math.PI / 2],
  [-5, -4, Math.PI / 2],
  [5, -4, -Math.PI / 2],
  // Conversation garden
  [16, 6, 0],
  [18, 4, Math.PI / 2],
  [18, 8, -Math.PI / 2],
  // Member area
  [-14, -16, 0],
  [-16, -20, Math.PI],
]

/** Tables: [x, z, rotationY] */
export const TABLES: Array<[number, number, number]> = [
  // Plaza gathering
  [3, 2, 0],
  [-3, 2, Math.PI / 4],
  [3, -2, -Math.PI / 4],
  // Community hall area
  [-2, -12, 0],
  [2, -12, Math.PI],
]

/** The Society interaction positions. */
export const SOCIETY_POSITIONS = {
  noticeBoard: { x: 6, z: 8 },
  communityHall: { x: 0, z: -14 },
  memberWall: { x: 0, z: 14 },
  eventStage: { x: 16, z: -12 },
} as const

/** Community data model — future-ready structures. */
export interface Member {
  id: string
  displayName: string
  role: 'member' | 'staff' | 'founding-member' | 'community'
  joinedAt: string
}

export interface CommunityEvent {
  id: string
  title: string
  date: string
  description: string
}

export interface Announcement {
  id: string
  title: string
  message: string
}

/** Placeholder data for the notice board. */
export const NOTICE_BOARD_DATA: { events: CommunityEvent[]; announcements: Announcement[] } = {
  events: [
    { id: 'e1', title: 'Community Gathering', date: 'Weekly', description: 'Come together with fellow members.' },
    { id: 'e2', title: 'Garden Day', date: 'Monthly', description: 'Help tend the community gardens.' },
  ],
  announcements: [
    { id: 'a1', title: 'Welcome', message: 'Heaven Society welcomes all who seek peace and belonging.' },
    { id: 'a2', title: 'New Spaces', message: 'The community hall is now open for gatherings.' },
  ],
}

/** Placeholder member plaques for the Wall of Souls. */
export const MEMBER_PLAQUES: Array<{ label: string; role: Member['role'] }> = [
  { label: 'MEMBER', role: 'member' },
  { label: 'MEMBER', role: 'member' },
  { label: 'STAFF', role: 'staff' },
  { label: 'MEMBER', role: 'member' },
  { label: 'FOUNDING MEMBER', role: 'founding-member' },
  { label: 'MEMBER', role: 'member' },
  { label: 'COMMUNITY', role: 'community' },
  { label: 'MEMBER', role: 'member' },
  { label: 'MEMBER', role: 'member' },
  { label: 'STAFF', role: 'staff' },
  { label: 'MEMBER', role: 'member' },
  { label: 'FOUNDING MEMBER', role: 'founding-member' },
]
