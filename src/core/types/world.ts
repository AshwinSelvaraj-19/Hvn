/**
 * Location identifiers for the explorable world.
 *
 * Phase 0 registers all five planned locations as data only.
 * Phase 1+ attaches a real scene component to each one.
 */
export type LocationId =
  | 'arrival'
  | 'founders-sanctum'
  | 'society'
  | 'worlds'
  | 'gate'

export interface LocationSpawn {
  x: number
  z: number
}

export interface LocationDefinition {
  id: LocationId
  /** Display name shown in the HUD. */
  name: string
  /** Short description of what this location represents. */
  description: string
  /** Where the player appears when entering this location. */
  spawn?: LocationSpawn
}