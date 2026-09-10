import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

interface TreeProps {
  position: [number, number, number]
  scale?: number
  trunkHeight?: number
  canopyRadius?: number
  variant?: number
  seed?: number
}

/** Deterministic pseudo-random from seed. */
function seeded(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

/**
 * Realistic procedural tree — natural trunk, branches, and layered canopy.
 *
 * Uses tapered cylinders for trunks/branches and clustered spheres for foliage.
 * Each tree gets unique variation from seed for natural appearance.
 */
export function ProceduralTree({
  position,
  scale = 1,
  trunkHeight = 2.5,
  canopyRadius = 1.8,
  variant = 0,
  seed = 0,
}: TreeProps) {
  const groupRef = useRef<Group>(null)

  // Wind animation
  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.elapsedTime
    groupRef.current.rotation.z = Math.sin(t * 1.1 + seed) * 0.012
    groupRef.current.rotation.x = Math.cos(t * 0.8 + seed * 0.7) * 0.008
  })

  const treeData = useMemo(() => {
    const r = (i: number) => seeded(seed * 100 + i)
    const trunkR = 0.12 + r(0) * 0.06
    const branchCount = 3 + Math.floor(r(2) * 3)

    // Generate branch positions
    const branches: Array<{
      angle: number
      height: number
      length: number
      thickness: number
    }> = []
    for (let i = 0; i < branchCount; i++) {
      branches.push({
        angle: (i / branchCount) * Math.PI * 2 + r(10 + i) * 0.5,
        height: trunkHeight * (0.5 + r(20 + i) * 0.4),
        length: 0.6 + r(30 + i) * 0.8,
        thickness: 0.03 + r(40 + i) * 0.02,
      })
    }

    // Generate foliage clusters
    const clusters: Array<{
      x: number
      y: number
      z: number
      radius: number
      shade: number
    }> = []
    const clusterCount = 5 + Math.floor(r(3) * 4)
    for (let i = 0; i < clusterCount; i++) {
      const angle = r(50 + i) * Math.PI * 2
      const dist = r(60 + i) * canopyRadius * 0.6
      clusters.push({
        x: Math.cos(angle) * dist,
        y: trunkHeight + (r(70 + i) - 0.3) * canopyRadius * 0.5,
        z: Math.sin(angle) * dist,
        radius: canopyRadius * (0.35 + r(80 + i) * 0.3),
        shade: r(90 + i) * 2, // 0=dark, 1=light, 2=accent
      })
    }

    return { trunkR, branches, clusters }
  }, [trunkHeight, canopyRadius, seed])

  // Material colors
  const barkColor = variant === 1 ? '#6b5a4a' : '#7a6855'
  const barkDark = variant === 1 ? '#5a4a3a' : '#6a5845'
  const leafDark = '#4a6a3a'
  const leafLight = '#6a8a4a'
  const leafAccent = variant === 2 ? '#8a7a4a' : '#5a7a4a'

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Main trunk — tapered cylinder */}
      <mesh position={[0, trunkHeight / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[treeData.trunkR * 0.6, treeData.trunkR, trunkHeight, 8]} />
        <meshStandardMaterial color={barkColor} roughness={0.92} metalness={0.02} />
      </mesh>

      {/* Trunk base flare */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[treeData.trunkR * 1.3, treeData.trunkR * 1.6, 0.3, 8]} />
        <meshStandardMaterial color={barkDark} roughness={0.95} metalness={0.02} />
      </mesh>

      {/* Branches */}
      {treeData.branches.map((b, i) => (
        <group key={i} position={[0, b.height, 0]} rotation-y={b.angle}>
          <mesh
            position={[Math.cos(b.angle) * b.length * 0.5, 0, Math.sin(b.angle) * b.length * 0.5]}
            rotation={[0, 0, -b.angle * 0.4]}
            castShadow
          >
            <cylinderGeometry args={[b.thickness * 0.5, b.thickness, b.length, 6]} />
            <meshStandardMaterial color={barkDark} roughness={0.92} metalness={0.02} />
          </mesh>
        </group>
      ))}

      {/* Foliage clusters */}
      {treeData.clusters.map((c, i) => {
        const color = c.shade < 0.7 ? leafDark : c.shade < 1.4 ? leafLight : leafAccent
        return (
          <mesh key={i} position={[c.x, c.y, c.z]} castShadow receiveShadow>
            <sphereGeometry args={[c.radius, 10, 8]} />
            <meshStandardMaterial
              color={color}
              roughness={0.85}
              metalness={0.01}
              transparent
              opacity={0.92}
            />
          </mesh>
        )
      })}

      {/* Root flare — visible ground contact */}
      {[0, 1.2, 2.4, 3.6, 4.8, 5.2].map((angle, i) => (
        <mesh
          key={i}
          position={[Math.cos(angle) * treeData.trunkR * 0.8, 0.05, Math.sin(angle) * treeData.trunkR * 0.8]}
          rotation={[0, angle, Math.PI * 0.4]}
          castShadow
        >
          <cylinderGeometry args={[0.02, 0.04, 0.2, 4]} />
          <meshStandardMaterial color={barkDark} roughness={0.95} metalness={0.02} />
        </mesh>
      ))}
    </group>
  )
}

interface TreeClusterProps {
  position: [number, number, number]
  count?: number
  spread?: number
  baseScale?: number
}

/**
 * A natural cluster of trees with species variation.
 */
export function TreeCluster({
  position,
  count = 5,
  spread = 4,
  baseScale = 1,
}: TreeClusterProps) {
  const trees = useMemo(() => {
    const result: Array<{
      x: number
      z: number
      s: number
      h: number
      r: number
      v: number
      seed: number
    }> = []
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + seeded(i * 71) * 0.8
      const dist = 0.5 + seeded(i * 37) * spread * 0.5
      result.push({
        x: Math.cos(angle) * dist,
        z: Math.sin(angle) * dist,
        s: baseScale * (0.7 + seeded(i * 53) * 0.6),
        h: 2.0 + seeded(i * 97) * 1.5,
        r: 1.2 + seeded(i * 61) * 1.0,
        v: Math.floor(seeded(i * 43) * 3),
        seed: i * 100 + Math.floor(seeded(i * 29) * 1000),
      })
    }
    return result
  }, [count, spread, baseScale])

  return (
    <group position={position}>
      {trees.map((t, i) => (
        <ProceduralTree
          key={i}
          position={[t.x, 0, t.z]}
          scale={t.s}
          trunkHeight={t.h}
          canopyRadius={t.r}
          variant={t.v}
          seed={t.seed}
        />
      ))}
    </group>
  )
}
