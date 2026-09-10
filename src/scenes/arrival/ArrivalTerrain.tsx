import { useMemo } from 'react'
import * as THREE from 'three'

/**
 * The Arrival landmass — premium celestial settlement terrain.
 *
 * Vertex-colored terrain with natural elevation, smooth zone transitions,
 * and organic ground detail. Paths, plazas, vegetation zones, and cliff
 * edges blend naturally rather than having hard boundaries.
 */
export function ArrivalTerrain() {
  const { geometry, material } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(170, 170, 140, 140)
    geo.rotateX(-Math.PI / 2)
    const pos = geo.attributes.position as THREE.BufferAttribute
    const count = pos.count

    const colors = new Float32Array(count * 3)

    // Natural color palette — earthy celestial tones
    const cGrass1 = new THREE.Color('#6a9458')
    const cGrass2 = new THREE.Color('#7aa468')
    const cPath = new THREE.Color('#c4b8a4')
    const cPathEdge = new THREE.Color('#a89c88')
    const cPlaza = new THREE.Color('#d0c8b4')
    const cPlazaDetail = new THREE.Color('#c8c0ac')
    const cEdge = new THREE.Color('#8a9a78')
    const cCliff = new THREE.Color('#9a9488')
    const cCliffDeep = new THREE.Color('#8a8478')
    const cFoundation = new THREE.Color('#b8b0a0')

    const tmpColor = new THREE.Color()

    // Noise functions for natural variation
    const noise2D = (x: number, z: number, freq: number) =>
      Math.sin(x * freq * 0.7 + z * freq * 0.3) * 0.5 +
      Math.cos(x * freq * 0.3 - z * freq * 0.7) * 0.5

    for (let i = 0; i < count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)
      const d = Math.hypot(x, z)

      // Natural elevation — gentle rolling terrain
      let h = 0
      // Base drop-off at edges
      if (d > 28) {
        h = -Math.min(10, (d - 28) * 0.6)
      }
      // Rolling hills — multiple octaves
      h += noise2D(x, z, 0.08) * 0.25
      h += noise2D(x, z, 0.15) * 0.12
      h += noise2D(x, z, 0.3) * 0.06
      // Subtle ridges near edges
      if (d > 24) {
        h += noise2D(x, z, 0.2) * (d - 24) * 0.04
      }
      // Path depression — natural worn path
      const pathDist = Math.abs(x)
      if (pathDist < 2.5 && z > -35 && z < 30) {
        h -= Math.max(0, 0.04 - pathDist * 0.015)
      }
      pos.setY(i, h)

      // Distance-based zone calculation
      const isMainPath = pathDist < 2.5 && z > -35 && z < 30
      const isCrossPath = Math.abs(z) < 2.5 && x > -35 && x < 35
      const isPlaza = d < 9
      const isPlazaDetail = d < 6
      const isEdge = d > 26 && d < 36
      const isCliff = d > 34
      const isCliffDeep = d > 38

      // Building proximity
      const nearWestHall = Math.hypot(x + 11, z + 1) < 5
      const nearEastHall = Math.hypot(x - 11, z + 1) < 5
      const nearCommunity = Math.hypot(x, z + 14) < 6
      const isNearBuilding = nearWestHall || nearEastHall || nearCommunity

      // Natural color blending
      if (isCliffDeep) {
        tmpColor.copy(cCliffDeep)
      } else if (isCliff) {
        const t = (d - 34) / 4
        tmpColor.lerpColors(cCliff, cCliffDeep, t)
      } else if (isEdge) {
        const t = (d - 26) / 8
        tmpColor.lerpColors(cEdge, cCliff, t)
      } else if (isPlazaDetail) {
        // Plaza center — detailed paving
        const detailNoise = noise2D(x, z, 0.5) * 0.05
        tmpColor.copy(cPlazaDetail)
        tmpColor.r += detailNoise
        tmpColor.g += detailNoise
      } else if (isPlaza) {
        const t = (d - 6) / 3
        tmpColor.lerpColors(cPlaza, cPlazaDetail, t)
      } else if (isMainPath || isCrossPath) {
        // Path with natural edges
        const edgeBlend = isMainPath
          ? Math.max(0, 1 - pathDist / 2.5)
          : Math.max(0, 1 - Math.abs(z) / 2.5)
        tmpColor.lerpColors(cGrass1, cPath, edgeBlend * 0.8)
        // Path edge softening
        if (edgeBlend < 0.8) {
          tmpColor.lerp(cPathEdge, (1 - edgeBlend) * 0.3)
        }
      } else if (isNearBuilding) {
        // Foundation area — subtle transition
        const dist = nearWestHall
          ? Math.hypot(x + 11, z + 1)
          : nearEastHall
          ? Math.hypot(x - 11, z + 1)
          : Math.hypot(x, z + 14)
        const t = Math.min(1, dist / 5)
        tmpColor.lerpColors(cFoundation, cGrass1, t)
      } else {
        // Natural grass with variation
        const grassVar = noise2D(x, z, 0.25) * 0.15
        tmpColor.copy(cGrass1)
        tmpColor.lerp(cGrass2, 0.5 + grassVar)
      }

      // Organic noise variation — breaks up uniform areas
      const noise = noise2D(x, z, 1.5) * 0.04 + noise2D(x, z, 3.0) * 0.02
      tmpColor.r = Math.max(0, Math.min(1, tmpColor.r + noise))
      tmpColor.g = Math.max(0, Math.min(1, tmpColor.g + noise))
      tmpColor.b = Math.max(0, Math.min(1, tmpColor.b + noise))

      colors[i * 3] = tmpColor.r
      colors[i * 3 + 1] = tmpColor.g
      colors[i * 3 + 2] = tmpColor.b
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.computeVertexNormals()

    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.92,
      metalness: 0,
      flatShading: false,
    })

    return { geometry: geo, material: mat }
  }, [])

  return <mesh geometry={geometry} material={material} receiveShadow />
}
