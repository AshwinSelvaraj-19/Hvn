import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

import { BENCHES, TABLES } from './data'
import { gold, marble, marbleDark, stonePaving, stoneTrim, wood, woodDark } from './materials'

/**
 * The Central Activity Plaza — the main hub of The Worlds.
 *
 * A large circular gathering space with monument, seating, tables,
 * and paths to each activity area.
 */
export function WorldsPlaza() {
  return (
    <group>
      {/* Plaza paving — large circular area */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.01, 0]} receiveShadow material={stonePaving}>
        <circleGeometry args={[9, 44]} />
      </mesh>
      {/* Inner ring */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.015, 0]} material={marbleDark}>
        <circleGeometry args={[7, 44]} />
      </mesh>
      {/* Gold accent ring */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.02, 0]}>
        <ringGeometry args={[6.9, 7.05, 44]} />
        <meshStandardMaterial color="#d9b45c" roughness={0.45} metalness={0.7} />
      </mesh>
      {/* Border stones */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.012, 0]} material={stoneTrim}>
        <ringGeometry args={[8.8, 9.0, 44]} />
      </mesh>

      <ActivityMonument />
      <PlazaFurniture />
    </group>
  )
}

/** Central activity monument — symbolic focal point. */
function ActivityMonument() {
  const groupRef = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.15
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Base */}
      <mesh position={[0, 0.08, 0]} receiveShadow material={stoneTrim}>
        <cylinderGeometry args={[2.2, 2.4, 0.16, 28]} />
      </mesh>
      <mesh position={[0, 0.28, 0]} castShadow material={marble}>
        <cylinderGeometry args={[1.8, 2.0, 0.24, 28]} />
      </mesh>

      {/* Central pillar */}
      <mesh position={[0, 1.2, 0]} castShadow material={marble}>
        <cylinderGeometry args={[0.35, 0.45, 1.6, 10]} />
      </mesh>

      {/* Rotating symbol */}
      <group ref={groupRef} position={[0, 2.2, 0]}>
        <mesh material={gold}>
          <octahedronGeometry args={[0.4, 0]} />
        </mesh>
        {/* Orbital rings */}
        <mesh rotation-x={Math.PI / 2}>
          <torusGeometry args={[0.6, 0.03, 8, 24]} />
          <meshStandardMaterial color="#5a8fb4" roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh rotation-y={Math.PI / 3}>
          <torusGeometry args={[0.6, 0.03, 8, 24]} />
          <meshStandardMaterial color="#5a9a6a" roughness={0.4} metalness={0.5} />
        </mesh>
      </group>

      {/* Gold ring at base */}
      <mesh position={[0, 0.18, 0]} material={gold}>
        <torusGeometry args={[1.7, 0.03, 8, 28]} />
      </mesh>
    </group>
  )
}

/** Benches and tables around the plaza. */
function PlazaFurniture() {
  return (
    <group>
      {/* Benches */}
      {BENCHES.slice(0, 4).map(([x, z, rotY], i) => (
        <group key={`b${i}`} position={[x, 0, z]} rotation-y={rotY}>
          <mesh position={[0, 0.42, 0]} castShadow material={wood}>
            <boxGeometry args={[1.3, 0.07, 0.48]} />
          </mesh>
          <mesh position={[0, 0.72, 0.2]} castShadow material={wood}>
            <boxGeometry args={[1.3, 0.44, 0.07]} />
          </mesh>
          <mesh position={[-0.52, 0.2, 0]} castShadow material={stoneTrim}>
            <boxGeometry args={[0.1, 0.4, 0.4]} />
          </mesh>
          <mesh position={[0.52, 0.2, 0]} castShadow material={stoneTrim}>
            <boxGeometry args={[0.1, 0.4, 0.4]} />
          </mesh>
        </group>
      ))}

      {/* Tables */}
      {TABLES.slice(0, 3).map(([x, z, rotY], i) => (
        <group key={`t${i}`} position={[x, 0, z]} rotation-y={rotY}>
          <mesh position={[0, 0.55, 0]} castShadow material={wood}>
            <cylinderGeometry args={[0.5, 0.5, 0.06, 12]} />
          </mesh>
          <mesh position={[0, 0.27, 0]} castShadow material={woodDark}>
            <cylinderGeometry args={[0.06, 0.08, 0.54, 8]} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
