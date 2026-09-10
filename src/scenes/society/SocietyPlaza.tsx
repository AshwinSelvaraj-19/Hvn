import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

import { BENCHES, TABLES } from './data'
import { gold, marble, marbleDark, stonePaving, stoneTrim, water, wood, woodDark } from './materials'

/**
 * The Central Community Plaza — the visual centerpiece of The Society.
 *
 * A circular gathering space with fountain, seating, tables, and
 * a small stage area. Communicates "people gather here."
 */
export function SocietyPlaza() {
  return (
    <group>
      {/* Plaza paving — large circular area */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.01, 0]} receiveShadow material={stonePaving}>
        <circleGeometry args={[8, 40]} />
      </mesh>
      {/* Inner ring */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.015, 0]} material={marbleDark}>
        <circleGeometry args={[6, 40]} />
      </mesh>
      {/* Gold accent ring */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.02, 0]}>
        <ringGeometry args={[5.9, 6.05, 40]} />
        <meshStandardMaterial color="#d9b45c" roughness={0.45} metalness={0.7} />
      </mesh>
      {/* Border stones */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.012, 0]} material={stoneTrim}>
        <ringGeometry args={[7.8, 8.0, 40]} />
      </mesh>

      <PlazaFountain />
      <PlazaFurniture />
    </group>
  )
}

/** Central fountain with gentle water animation. */
function PlazaFountain() {
  const waterRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (!waterRef.current) return
    waterRef.current.position.y = 0.18 + Math.sin(clock.elapsedTime * 1.1) * 0.012
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Basin */}
      <mesh position={[0, 0.06, 0]} receiveShadow material={marbleDark}>
        <cylinderGeometry args={[2.2, 2.2, 0.12, 28]} />
      </mesh>
      <mesh position={[0, 0.24, 0]} castShadow material={stoneTrim}>
        <torusGeometry args={[2.15, 0.22, 8, 28]} />
      </mesh>
      {/* Water */}
      <mesh ref={waterRef} position={[0, 0.18, 0]} material={water}>
        <cylinderGeometry args={[1.9, 1.9, 0.05, 28]} />
      </mesh>
      {/* Central pedestal */}
      <mesh position={[0, 0.75, 0]} castShadow material={marble}>
        <cylinderGeometry args={[0.4, 0.5, 0.9, 10]} />
      </mesh>
      <mesh position={[0, 1.4, 0]} castShadow material={marble}>
        <cylinderGeometry args={[0.2, 0.3, 0.6, 8]} />
      </mesh>
      <mesh position={[0, 1.85, 0]} material={gold}>
        <sphereGeometry args={[0.18, 10, 10]} />
      </mesh>
      {/* Gold ring at waterline */}
      <mesh position={[0, 0.2, 0]} material={gold}>
        <torusGeometry args={[1.75, 0.03, 8, 28]} />
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
