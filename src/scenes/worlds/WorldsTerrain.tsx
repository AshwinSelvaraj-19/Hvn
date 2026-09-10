import { useMemo } from 'react'
import * as THREE from 'three'

function noise2D(x: number, y: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
  return (n - Math.floor(n)) * 2 - 1
}

function smoothNoise(x: number, y: number, scale: number): number {
  const sx = x / scale
  const sy = y / scale
  const ix = Math.floor(sx)
  const iy = Math.floor(sy)
  const fx = sx - ix
  const fy = sy - iy
  const ux = fx * fx * (3 - 2 * fx)
  const uy = fy * fy * (3 - 2 * fy)

  const a = noise2D(ix, iy)
  const b = noise2D(ix + 1, iy)
  const c = noise2D(ix, iy + 1)
  const d = noise2D(ix + 1, iy + 1)

  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy
}

function fbm(x: number, y: number, octaves: number = 4): number {
  let value = 0
  let amplitude = 1
  let frequency = 1
  let maxValue = 0
  for (let i = 0; i < octaves; i++) {
    value += amplitude * smoothNoise(x * frequency, y * frequency, 8)
    maxValue += amplitude
    amplitude *= 0.5
    frequency *= 2
  }
  return value / maxValue
}

/**
 * The Worlds terrain — activity plateau.
 * Vertex-colored with distinct zones for paths, plazas, and activity areas.
 */
export function WorldsTerrain() {
  const { geometry, material } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(130, 130, 100, 100)
    geo.rotateX(-Math.PI / 2)
    const pos = geo.attributes.position as THREE.BufferAttribute
    const count = pos.count
    const colors = new Float32Array(count * 3)

    const cGrass = new THREE.Color('#7a9e6e')
    const cPath = new THREE.Color('#b8ad9c')
    const cPlaza = new THREE.Color('#c8bfa8')
    const cEdge = new THREE.Color('#6a8a5e')
    const cCliff = new THREE.Color('#8a8478')
    const tmpColor = new THREE.Color()

    for (let i = 0; i < count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)
      const d = Math.hypot(x, z)

      let h = 0
      if (d > 30) h = -Math.min(8, (d - 30) * 0.5)
      h += fbm(x * 0.05, z * 0.05, 3) * 0.6
      h += Math.sin(x * 0.15) * Math.cos(z * 0.12) * 0.15
      if (d > 26) h += Math.sin(x * 0.22) * Math.cos(z * 0.18) * (d - 26) * 0.04
      pos.setY(i, h)

      const isPath = Math.abs(x) < 2.2 && z > 14 && z < 32
      const isPlaza = d < 10
      const isEdge = d > 26 && d < 34
      const isCliff = d > 32

      if (isCliff) tmpColor.copy(cCliff)
      else if (isEdge) tmpColor.lerpColors(cEdge, cCliff, (d - 26) / 8)
      else if (isPlaza) tmpColor.copy(cPlaza)
      else if (isPath) tmpColor.copy(cPath)
      else tmpColor.copy(cGrass)

      const noise = Math.sin(x * 3.7 + z * 2.3) * 0.025
      tmpColor.r = Math.max(0, Math.min(1, tmpColor.r + noise))
      tmpColor.g = Math.max(0, Math.min(1, tmpColor.g + noise))
      tmpColor.b = Math.max(0, Math.min(1, tmpColor.b + noise))

      colors[i * 3] = tmpColor.r
      colors[i * 3 + 1] = tmpColor.g
      colors[i * 3 + 2] = tmpColor.b
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.computeVertexNormals()
    const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95, metalness: 0, flatShading: false })
    return { geometry: geo, material: mat }
  }, [])

  return <mesh geometry={geometry} material={material} receiveShadow />
}
