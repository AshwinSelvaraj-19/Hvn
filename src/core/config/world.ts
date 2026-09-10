import type { LocationDefinition, LocationId } from '@/core/types/world'

/** Atmosphere (scene background + fog) per location. */
export interface LocationAtmosphere {
  background: string
  fog: [color: string, near: number, far: number]
}

/** Dark fallback; The Arrival overrides with its bright celestial sky. */
export const LOCATION_ATMOSPHERE: Record<LocationId, LocationAtmosphere> = {
  arrival: { background: '#cfe2f2', fog: ['#dbe9f5', 30, 135] },
  'founders-sanctum': { background: '#d8dfd0', fog: ['#e0ddd2', 30, 120] },
  society: { background: '#d4e0ee', fog: ['#dde6f0', 30, 130] },
  worlds: { background: '#e8f0f8', fog: ['#d6e8f2', 30, 140] },
  gate: { background: '#e8f0ff', fog: ['#d8e8f4', 30, 150] },
}

/**
 * World registry — the single source of truth for locations.
 *
 * Scene components are intentionally NOT referenced here so this file
 * stays pure data. Scene mapping lives in `scenes/LocationRenderer.tsx`.
 */
export const LOCATIONS: LocationDefinition[] = [
  {
    id: 'arrival',
    name: 'The Arrival',
    description: 'Server introduction — where every visitor starts.',
    // South end of the arrival path, facing the central plaza.
    spawn: { x: 0, z: 26 },
  },
  {
    id: 'founders-sanctum',
    name: "The Founder's Sanctum",
    description: 'The founder and the heart of Heaven.',
    spawn: { x: 0, z: 30 },
  },
  {
    id: 'society',
    name: 'The Society',
    description: 'The community that makes Heaven what it is.',
    spawn: { x: 0, z: 28 },
  },
  {
    id: 'worlds',
    name: 'The Worlds',
    description: 'The experiences and things you do here.',
    spawn: { x: 30, z: 0 },
  },
  {
    id: 'gate',
    name: 'The Gate',
    description: 'Join Heaven — the entrance to membership.',
    spawn: { x: 0, z: 22 },
  },
] as const

/** Fallback spawn used when a location has no explicit spawn. */
export const SPAWN = {
  x: 0,
  z: 26,
} as const

/** The location the player starts in. */
export const DEFAULT_LOCATION: LocationId = 'arrival'

export function getLocationDefinition(id: LocationId): LocationDefinition {
  const def = LOCATIONS.find((l) => l.id === id)
  if (!def) {
    throw new Error(`Unknown location id: "${id}"`)
  }
  return def
}