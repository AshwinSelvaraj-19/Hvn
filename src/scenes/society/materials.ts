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

/** Stone paving — shared but defined here for Society specificity. */
export const stonePaving = new THREE.MeshStandardMaterial({
  color: '#bfb8a8',
  roughness: 0.78,
  metalness: 0.02,
})

/** Banner fabric — warm communal red. */
export const banner = new THREE.MeshStandardMaterial({
  color: '#b85050',
  roughness: 0.78,
  metalness: 0.04,
  side: THREE.DoubleSide,
})

/** Gold banner accent. */
export const bannerGold = new THREE.MeshStandardMaterial({
  color: '#c9a84c',
  roughness: 0.35,
  metalness: 0.85,
  side: THREE.DoubleSide,
})

/** Notice board surface. */
export const noticeBoard = new THREE.MeshStandardMaterial({
  color: '#5e4830',
  roughness: 0.85,
  metalness: 0.02,
})
