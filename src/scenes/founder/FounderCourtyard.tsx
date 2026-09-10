import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

import { BENCHES, COURTYARD_TREES } from './data'
import { gold, marble, marbleDark, stonePaving, stoneTrim, water, wood } from './materials'

/**
 * The Founder's Courtyard — a private, memorable space before the
 * main building. Central tree, fountain, seating, symmetrical composition.
 */
export function FounderCourtyard() {
  return (
    <group>
      {/* Courtyard paving */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.01, 2.5]} receiveShadow material={stonePaving}>
        <planeGeometry args={[10, 14]} />
      </mesh>
      {/* Gold accent ring */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.015, 2.5]}>
        <ringGeometry args={[4.8, 4.92, 36]} />
        <meshStandardMaterial color="#d9b45c" roughness={0.45} metalness={0.7} />
      </mesh>
      {/* Border stones */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.012, 2.5]} material={stoneTrim}>
        <ringGeometry args={[6.8, 7, 36]} />
      </mesh>

      <CourtyardFountain />
      <CourtyardTrees />
      <CourtyardBenches />
    </group>
  )
}

/** Central fountain with a gentle water animation. */
function CourtyardFountain() {
  const waterRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (!waterRef.current) return
    waterRef.current.position.y = 0.18 + Math.sin(clock.elapsedTime * 1.1) * 0.012
  })

  return (
    <group position={[0, 0, 1]}>
      {/* Basin */}
      <mesh position={[0, 0.06, 0]} receiveShadow material={marbleDark}>
        <cylinderGeometry args={[2.0, 2.0, 0.12, 24]} />
      </mesh>
      <mesh position={[0, 0.22, 0]} castShadow material={stoneTrim}>
        <torusGeometry args={[1.95, 0.22, 8, 24]} />
      </mesh>
      {/* Water */}
      <mesh ref={waterRef} position={[0, 0.16, 0]} material={water}>
        <cylinderGeometry args={[1.75, 1.75, 0.05, 24]} />
      </mesh>
      {/* Central pedestal */}
      <mesh position={[0, 0.7, 0]} castShadow material={marble}>
        <cylinderGeometry args={[0.35, 0.45, 0.8, 10]} />
      </mesh>
      <mesh position={[0, 1.3, 0]} castShadow material={marble}>
        <cylinderGeometry args={[0.18, 0.25, 0.6, 8]} />
      </mesh>
      <mesh position={[0, 1.72, 0]} material={gold}>
        <coneGeometry args={[0.2, 0.5, 8]} />
      </mesh>
      {/* Gold ring at waterline */}
      <mesh position={[0, 0.19, 0]} material={gold}>
        <torusGeometry args={[1.6, 0.03, 8, 24]} />
      </mesh>
    </group>
  )
}

/** Central tree and flanking courtyard trees. */
function CourtyardTrees() {
  return (
    <group>
      {COURTYARD_TREES.map(([x, z, s], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 1.1 * s, 0]} castShadow material={wood}>
            <cylinderGeometry args={[0.14 * s, 0.2 * s, 2.2 * s, 6]} />
          </mesh>
          <mesh position={[0, (2.4 + (i % 2) * 0.2) * s, 0]} castShadow>
            <icosahedronGeometry args={[1.2 * s, 0]} />
            <meshStandardMaterial
              color={i === 0 ? '#3f6b4a' : '#4a7a55'}
              roughness={0.95}
              flatShading
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/** Benches around the courtyard. */
function CourtyardBenches() {
  return (
    <group>
      {BENCHES.map(([x, z, rotY], i) => (
        <group key={i} position={[x, 0, z]} rotation-y={rotY}>
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
    </group>
  )
}
