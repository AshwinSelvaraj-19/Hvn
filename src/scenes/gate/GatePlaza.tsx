import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

import { BENCHES } from './data'
import { gold, marble, marbleDark, marbleGlow, stonePaving, stoneTrim, water, wood } from './materials'

/**
 * Gate Plaza — a calm open space before the final structure.
 *
 * Circular plaza with subtle water feature, seating, and
 * restrained landscaping. Creates a sense of pause.
 */
export function GatePlaza() {
  return (
    <group>
      {/* Plaza floor */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.01, -2]} receiveShadow material={stonePaving}>
        <circleGeometry args={[9, 40]} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.015, -2]} material={marbleDark}>
        <circleGeometry args={[7, 40]} />
      </mesh>
      {/* Gold accent ring */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.02, -2]}>
        <ringGeometry args={[6.9, 7.05, 40]} />
        <meshStandardMaterial color="#d9b45c" roughness={0.45} metalness={0.7} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.012, -2]} material={stoneTrim}>
        <ringGeometry args={[8.8, 9.0, 40]} />
      </mesh>

      <WaterFeature />
      <PlazaBenches />
      <PlazaMonument />
    </group>
  )
}

/** Subtle water feature — small reflecting pool. */
function WaterFeature() {
  const waterRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (!waterRef.current) return
    waterRef.current.position.y = 0.1 + Math.sin(clock.elapsedTime * 1.1) * 0.008
  })

  return (
    <group position={[0, 0, -2]}>
      {/* Basin */}
      <mesh position={[0, 0.04, 0]} receiveShadow material={marbleDark}>
        <cylinderGeometry args={[1.0, 1.0, 0.08, 20]} />
      </mesh>
      <mesh position={[0, 0.12, 0]} castShadow material={stoneTrim}>
        <torusGeometry args={[0.95, 0.1, 8, 20]} />
      </mesh>
      {/* Water surface */}
      <mesh ref={waterRef} position={[0, 0.1, 0]} material={water}>
        <cylinderGeometry args={[0.85, 0.85, 0.03, 20]} />
      </mesh>
      {/* Central stone */}
      <mesh position={[0, 0.2, 0]} castShadow material={marble}>
        <sphereGeometry args={[0.12, 10, 10]} />
      </mesh>
    </group>
  )
}

/** Benches around the plaza. */
function PlazaBenches() {
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

/** Central plaza monument — symbolic, restrained. */
function PlazaMonument() {
  return (
    <group position={[0, 0, -2]}>
      {/* Base */}
      <mesh position={[0, 0.08, 0]} receiveShadow material={stoneTrim}>
        <cylinderGeometry args={[1.4, 1.6, 0.16, 24]} />
      </mesh>
      <mesh position={[0, 0.28, 0]} castShadow material={marble}>
        <cylinderGeometry args={[1.0, 1.2, 0.24, 24]} />
      </mesh>

      {/* Central obelisk */}
      <mesh position={[0, 1.1, 0]} castShadow material={marbleGlow}>
        <cylinderGeometry args={[0.18, 0.24, 1.6, 8]} />
      </mesh>

      {/* Gold cap */}
      <mesh position={[0, 1.98, 0]} material={gold}>
        <octahedronGeometry args={[0.15, 0]} />
      </mesh>

      {/* Gold ring at base */}
      <mesh position={[0, 0.18, 0]} material={gold}>
        <torusGeometry args={[1.1, 0.025, 8, 24]} />
      </mesh>
    </group>
  )
}
