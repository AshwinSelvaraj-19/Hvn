/**
 * Re-export shared materials from the global material system.
 * Scene-specific materials remain local.
 */
export {
  marble,
  marbleDark,
  gold,
  stoneWall,
  stoneTrim,
  stoneStep,
  wood,
  woodDark,
  trunk,
  foliageDark,
  foliageLight,
  terrain,
  rock,
  water,
  lampWarm,
  windowWarm,
  roof,
  flowerColors,
  plaster,
  goldBright,
  marbleGlow,
} from '@/core/materials/materials'

import * as THREE from 'three'

/** Stone paving — shared but defined here for Founder specificity. */
export const stonePaving = new THREE.MeshStandardMaterial({
  color: '#c0b8a8',
  roughness: 0.78,
  metalness: 0.02,
})
