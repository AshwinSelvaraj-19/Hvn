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
  stoneStep,
} from '@/core/materials/materials'

import * as THREE from 'three'

/** Stone paving — shared but defined here for Worlds specificity. */
export const stonePaving = new THREE.MeshStandardMaterial({
  color: '#bfb8a8',
  roughness: 0.78,
  metalness: 0.02,
})

/** Energetic accent colors for The Worlds. */
export const accentBlue = new THREE.MeshStandardMaterial({
  color: '#4a7fa8',
  roughness: 0.4,
  metalness: 0.55,
  emissive: '#0e2840',
  emissiveIntensity: 0.12,
})

export const accentGreen = new THREE.MeshStandardMaterial({
  color: '#4a8a5a',
  roughness: 0.4,
  metalness: 0.45,
  emissive: '#0e3820',
  emissiveIntensity: 0.12,
})

export const accentPurple = new THREE.MeshStandardMaterial({
  color: '#7a5a9a',
  roughness: 0.4,
  metalness: 0.45,
  emissive: '#28104a',
  emissiveIntensity: 0.12,
})

/** Banner fabric. */
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

/** Trophy metal. */
export const trophy = new THREE.MeshStandardMaterial({
  color: '#c9a84c',
  roughness: 0.25,
  metalness: 0.88,
  emissive: '#2a1a06',
  emissiveIntensity: 0.2,
})

/** Display screen. */
export const screen = new THREE.MeshStandardMaterial({
  color: '#1e2e3e',
  roughness: 0.3,
  metalness: 0.35,
  emissive: '#0e1e2e',
  emissiveIntensity: 0.3,
})
