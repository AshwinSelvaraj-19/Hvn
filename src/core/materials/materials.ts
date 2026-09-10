import * as THREE from 'three'

/**
 * Premium material system — physically based, natural, celestial.
 *
 * Materials use realistic roughness/metalness values and subtle
 * color variation to create a believable celestial civilization.
 * No glossy surfaces, no uniform white — everything has natural depth.
 */

// ─── Architecture ─────────────────────────────────────────────────────────────

export const stoneWall = new THREE.MeshStandardMaterial({
  color: '#d8d2c6',
  roughness: 0.9,
  metalness: 0.02,
})

export const stoneTrim = new THREE.MeshStandardMaterial({
  color: '#c0b8a8',
  roughness: 0.82,
  metalness: 0.03,
})

export const stoneStep = new THREE.MeshStandardMaterial({
  color: '#b5ae9e',
  roughness: 0.86,
  metalness: 0.02,
})

export const marble = new THREE.MeshStandardMaterial({
  color: '#ece6da',
  roughness: 0.42,
  metalness: 0.06,
})

export const marbleDark = new THREE.MeshStandardMaterial({
  color: '#cec8bc',
  roughness: 0.5,
  metalness: 0.05,
})

export const marbleGlow = new THREE.MeshStandardMaterial({
  color: '#f2ece2',
  roughness: 0.32,
  metalness: 0.07,
  emissive: '#ede5d6',
  emissiveIntensity: 0.06,
})

export const plaster = new THREE.MeshStandardMaterial({
  color: '#e4ded2',
  roughness: 0.94,
  metalness: 0.01,
})

// ─── Metal ────────────────────────────────────────────────────────────────────

export const gold = new THREE.MeshStandardMaterial({
  color: '#c4a248',
  roughness: 0.3,
  metalness: 0.9,
  emissive: '#18100a',
  emissiveIntensity: 0.12,
})

export const goldBright = new THREE.MeshStandardMaterial({
  color: '#d4b458',
  roughness: 0.25,
  metalness: 0.92,
  emissive: '#281a0a',
  emissiveIntensity: 0.2,
})

// ─── Wood ─────────────────────────────────────────────────────────────────────

export const wood = new THREE.MeshStandardMaterial({
  color: '#7a5c3c',
  roughness: 0.86,
  metalness: 0.02,
})

export const woodDark = new THREE.MeshStandardMaterial({
  color: '#503820',
  roughness: 0.9,
  metalness: 0.02,
})

// ─── Roof ─────────────────────────────────────────────────────────────────────

export const roof = new THREE.MeshStandardMaterial({
  color: '#728898',
  roughness: 0.8,
  metalness: 0.04,
})

// ─── Vegetation ───────────────────────────────────────────────────────────────

export const trunk = new THREE.MeshStandardMaterial({
  color: '#5a442c',
  roughness: 0.92,
  metalness: 0,
})

export const foliageDark = new THREE.MeshStandardMaterial({
  color: '#386038',
  roughness: 0.88,
  metalness: 0,
})

export const foliageLight = new THREE.MeshStandardMaterial({
  color: '#4e8448',
  roughness: 0.88,
  metalness: 0,
})

export const foliageAutumn = new THREE.MeshStandardMaterial({
  color: '#9a7434',
  roughness: 0.9,
  metalness: 0,
})

export const flowerWhite = new THREE.MeshStandardMaterial({
  color: '#ede8e0',
  roughness: 0.78,
})
export const flowerPink = new THREE.MeshStandardMaterial({
  color: '#e4c4b0',
  roughness: 0.78,
})
export const flowerBlue = new THREE.MeshStandardMaterial({
  color: '#b4c4d4',
  roughness: 0.78,
})
export const flowerLilac = new THREE.MeshStandardMaterial({
  color: '#ccb4d4',
  roughness: 0.78,
})
export const flowerColors = [flowerWhite, flowerPink, flowerBlue, flowerLilac]

// ─── Terrain ──────────────────────────────────────────────────────────────────

export const terrain = new THREE.MeshStandardMaterial({
  color: '#86a67e',
  roughness: 1,
  metalness: 0,
})

export const terrainPath = new THREE.MeshStandardMaterial({
  color: '#aca494',
  roughness: 0.94,
  metalness: 0.01,
})

// ─── Rock ─────────────────────────────────────────────────────────────────────

export const rock = new THREE.MeshStandardMaterial({
  color: '#86827c',
  roughness: 0.96,
  metalness: 0.02,
})

// ─── Water ────────────────────────────────────────────────────────────────────

export const water = new THREE.MeshStandardMaterial({
  color: '#6aa8c4',
  roughness: 0.18,
  metalness: 0.1,
  transparent: true,
  opacity: 0.86,
  emissive: '#164458',
  emissiveIntensity: 0.15,
})

// ─── Lighting props ───────────────────────────────────────────────────────────

export const lampWarm = new THREE.MeshStandardMaterial({
  color: '#ffdca4',
  emissive: '#e49c3c',
  emissiveIntensity: 1.2,
})

export const windowWarm = new THREE.MeshStandardMaterial({
  color: '#e4c484',
  emissive: '#9c6c2c',
  emissiveIntensity: 0.4,
})

// ─── Celestial / portal ──────────────────────────────────────────────────────

export const portal = new THREE.MeshStandardMaterial({
  color: '#f2ece0',
  roughness: 0.12,
  metalness: 0.1,
  emissive: '#e4d8c0',
  emissiveIntensity: 0.35,
  transparent: true,
  opacity: 0.9,
})

// ─── Character ────────────────────────────────────────────────────────────────

export const skin = new THREE.MeshStandardMaterial({
  color: '#d4a574',
  roughness: 0.68,
  metalness: 0.02,
})

export const hair = new THREE.MeshStandardMaterial({
  color: '#4a3828',
  roughness: 0.9,
  metalness: 0,
})

// Note: these are app-lifetime singletons. Do not dispose them on
// unmount — StrictMode's double-mount would dispose a material that
// the second mount reuses.
