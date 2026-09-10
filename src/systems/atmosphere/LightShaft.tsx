import { useMemo } from 'react'
import * as THREE from 'three'

interface LightShaftProps {
  /** Position of the light shaft. */
  position?: [number, number, number]
  /** Height of the shaft. */
  height?: number
  /** Width of the shaft at the base. */
  width?: number
  /** Rotation in radians. */
  rotation?: number
  /** Color of the light shaft. */
  color?: string
  /** Opacity of the shaft. */
  opacity?: number
}

/**
 * Volumetric-looking light shaft — a transparent gradient cone
 * that simulates visible sunlight beams.
 *
 * No post-processing required. Uses a simple transparent material
 * with a cone geometry to create the illusion of light volume.
 */
export function LightShaft({
  position = [0, 0, 0],
  height = 15,
  width = 2.5,
  rotation = 0,
  color = '#fff8ee',
  opacity = 0.08,
}: LightShaftProps) {
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      }),
    [color, opacity],
  )

  return (
    <group position={position} rotation-y={rotation}>
      <mesh material={material} position={[0, height / 2, 0]}>
        <coneGeometry args={[width * 0.3, height, 6, 1, true]} />
      </mesh>
    </group>
  )
}

/**
 * Multiple light shafts arranged in a cluster.
 */
export function LightShaftCluster({
  position = [0, 0, 0],
  count = 3,
  spread = 4,
  height = 18,
  color = '#fff8ee',
}: {
  position?: [number, number, number]
  count?: number
  spread?: number
  height?: number
  color?: string
}) {
  return (
    <group position={position}>
      {Array.from({ length: count }, (_, i) => (
        <LightShaft
          key={i}
          position={[(i - (count - 1) / 2) * spread, 0, (i % 2) * 1.5]}
          height={height + (i % 3) * 2}
          width={1.8 + (i % 2) * 0.8}
          rotation={(i * 0.15) - 0.15}
          color={color}
          opacity={0.06 - i * 0.008}
        />
      ))}
    </group>
  )
}
