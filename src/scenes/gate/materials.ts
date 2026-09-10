/**
 * Re-export shared materials from the global material system.
 * Scene-specific materials remain local.
 */
export {
  marble,
  marbleDark,
  marbleGlow,
  gold,
  goldBright,
  stoneWall,
  stoneTrim,
  stoneStep,
  wood,
  trunk,
  foliageDark,
  foliageLight,
  terrain,
  water,
  lampWarm,
  roof,
  flowerColors,
  portal,
  plaster,
} from '@/core/materials/materials'

import * as THREE from 'three'

/** Stone paving — shared but defined here for Gate specificity. */
export const stonePaving = new THREE.MeshStandardMaterial({
  color: '#c8c0b4',
  roughness: 0.75,
  metalness: 0.02,
})
