import { useMemo } from 'react'
import * as THREE from 'three'

/**
 * The Founder's Sanctum terrain — intimate elevated plateau.
 * Natural elevation with smooth zone transitions.
 */
export function FounderTerrain() {
  const { geometry, material } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(120, 120, 100, 100)
    geo.rotateX(-Math.PI / 2)
    const pos = geo.attributes.position as THREE.BufferAttribute
    const count = pos.count
    const colors = new Float32Array(count * 3)

    const cGrass1 = new THREE.Color('#6a9458')
    const cGrass2 = new THREE.Color('#7aa468')
    const cPath = new THREE.Color('#c4b8a4')
    const cPlaza = new THREE.Color('#d0c8b4')
    const cEdge = new THREE.Color('#8a9a78')
    const cCliff = new THREE.Color('#9a9488')
    const tmpColor = new THREE.Color()

    const noise2D = (x: number, z: number, freq: number) =>
      Math.sin(x * freq * 0.7 + z * freq * 0.3) * 0.5 +
      Math.cos(x * freq * 0.3 - z * freq * 0.7) * 0.5

    for (let i = 0; i < count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)
      const d = Math.hypot(x, z - 8)

      let h = 0
      if (d > 26) h = -Math.min(9, (d - 26) * 0.55)
      h += noise2D(x, z, 0.1) * 0.2
      h += noise2D(x, z, 0.2) * 0.1
      if (d > 22) h += noise2D(x, z, 0.25) * (d - 22) * 0.03
      pos.setY(i, h)

      const isPath = Math.abs(x) < 2.5 && z > 10 && z < 32
      const isPlaza = d < 10
      const isEdge = d > 24 && d < 34
      const isCliff = d > 32

      if (isCliff) tmpColor.copy(cCliff)
      else if (isEdge) tmpColor.lerpColors(cEdge, cCliff, (d - 24) / 8)
      else if (isPlaza) tmpColor.copy(cPlaza)
      else if (isPath) tmpColor.copy(cPath)
      else {
        const grassVar = noise2D(x, z, 0.3) * 0.15
        tmpColor.copy(cGrass1)
        tmpColor.lerp(cGrass2, 0.5 + grassVar)
      }

      const noise = noise2D(x, z, 1.5) * 0.03 + noise2D(x, z, 3.0) * 0.015
      tmpColor.r = Math.max(0, Math.min(1, tmpColor.r + noise))
      tmpColor.g = Math.max(0, Math.min(1, tmpColor.g + noise))
      tmpColor.b = Math.max(0, Math.min(1, tmpColor.b + noise))

      colors[i * 3] = tmpColor.r
      colors[i * 3 + 1] = tmpColor.g
      colors[i * 3 + 2] = tmpColor.b
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.computeVertexNormals()
    const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.92, metalness: 0, flatShading: false })
    return { geometry: geo, material: mat }
  }, [])

  return <mesh geometry={geometry} material={material} receiveShadow />
}
