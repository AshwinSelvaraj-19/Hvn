import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CelestialParticlesProps {
  position?: [number, number, number]
  width?: number
  height?: number
  depth?: number
  count?: number
  color?: string
  opacity?: number
  speed?: number
  size?: number
}

/** Deterministic pseudo-random based on index — no Math.random during render. */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

/**
 * Lightweight atmospheric particle system — dust motes, pollen, light sparkles.
 *
 * Small particles that drift slowly through a volume, creating a sense
 * of atmosphere and life. Uses Points geometry for performance.
 */
export function CelestialParticles({
  position = [0, 0, 0],
  width = 20,
  height = 12,
  depth = 20,
  count = 60,
  color = '#fff8ee',
  opacity = 0.35,
  speed = 0.3,
  size = 0.06,
}: CelestialParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      pos[i3] = (seededRandom(i * 3) - 0.5) * width
      pos[i3 + 1] = seededRandom(i * 3 + 1) * height
      pos[i3 + 2] = (seededRandom(i * 3 + 2) - 0.5) * depth
      vel[i3] = (seededRandom(i * 3 + 100) - 0.5) * 0.02 * speed
      vel[i3 + 1] = (seededRandom(i * 3 + 101) * 0.015 + 0.005) * speed
      vel[i3 + 2] = (seededRandom(i * 3 + 102) - 0.5) * 0.02 * speed
    }
    return { positions: pos, velocities: vel }
  }, [count, width, height, depth, speed])

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color,
        size,
        transparent: true,
        opacity,
        depthWrite: false,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
      }),
    [color, size, opacity],
  )

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    const pos = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    const halfW = width / 2
    const halfD = depth / 2

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      let x = pos.getX(i) + velocities[i3] * delta * 60
      let y = pos.getY(i) + velocities[i3 + 1] * delta * 60
      let z = pos.getZ(i) + velocities[i3 + 2] * delta * 60

      if (x > halfW) x -= width
      if (x < -halfW) x += width
      if (y > height) y -= height
      if (y < 0) y += height
      if (z > halfD) z -= depth
      if (z < -halfD) z += depth

      pos.setXYZ(i, x, y, z)
    }
    pos.needsUpdate = true
  })

  return (
    <group position={position}>
      <points ref={pointsRef} material={material}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
      </points>
    </group>
  )
}
