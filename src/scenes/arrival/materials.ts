/**
 * Re-export all shared materials from the global material system.
 *
 * This file preserves backward compatibility — existing imports like
 * `import { marble, gold } from './materials'` continue to work,
 * but now resolve to the centralized definitions.
 */
export {
  stoneWall,
  stoneTrim,
  stoneStep,
  marble,
  marbleDark,
  marbleGlow,
  plaster,
  gold,
  goldBright,
  wood,
  woodDark,
  roof,
  trunk,
  foliageDark,
  foliageLight,
  foliageAutumn,
  flowerWhite,
  flowerPink,
  flowerBlue,
  flowerLilac,
  flowerColors,
  terrain,
  terrainPath,
  rock,
  water,
  lampWarm,
  windowWarm,
  portal,
  skin,
  hair,
} from '@/core/materials/materials'
