import { useMemo } from 'react'
/**
 * Distant background silhouettes — creates the impression of a vast
 * celestial civilization beyond the explorable area.
 *
 * Low-detail geometry placed far away, fading into atmospheric haze.
 */
export function DistantSilhouettes() {
  const silhouettes = useMemo(() => [
    // Towers
    { x: -45, y: 4, z: -60, sx: 1.5, sy: 12, sz: 1.5, color: '#c8c0b4' },
    { x: -38, y: 3, z: -65, sx: 1.2, sy: 8, sz: 1.2, color: '#c8c0b4' },
    { x: 50, y: 5, z: -55, sx: 1.8, sy: 14, sz: 1.8, color: '#c8c0b4' },
    { x: 42, y: 3, z: -62, sx: 1.0, sy: 7, sz: 1.0, color: '#c8c0b4' },
    // Elevated platforms
    { x: -55, y: 6, z: -45, sx: 12, sy: 2, sz: 8, color: '#d0c8bc' },
    { x: 55, y: 8, z: -50, sx: 10, sy: 2.5, sz: 10, color: '#d0c8bc' },
    // Bridges
    { x: -30, y: 10, z: -70, sx: 20, sy: 1, sz: 2, color: '#c0b8a8' },
    { x: 35, y: 12, z: -68, sx: 16, sy: 1, sz: 1.5, color: '#c0b8a8' },
    // Domes
    { x: -50, y: 5, z: -55, sx: 6, sy: 4, sz: 6, color: '#d8d0c4' },
    { x: 48, y: 6, z: -58, sx: 5, sy: 3.5, sz: 5, color: '#d8d0c4' },
    // Monuments
    { x: 0, y: 8, z: -75, sx: 2, sy: 16, sz: 2, color: '#e0d8cc' },
    { x: -20, y: 6, z: -72, sx: 1.5, sy: 10, sz: 1.5, color: '#d0c8bc' },
    { x: 20, y: 7, z: -70, sx: 1.8, sy: 12, sz: 1.8, color: '#d0c8bc' },
  ], [])

  return (
    <group>
      {silhouettes.map((s, i) => (
        <mesh key={i} position={[s.x, s.y, s.z]} material={undefined}>
          <boxGeometry args={[s.sx, s.sy, s.sz]} />
          <meshStandardMaterial
            color={s.color}
            roughness={0.95}
            metalness={0.01}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  )
}
