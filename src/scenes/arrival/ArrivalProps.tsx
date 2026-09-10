import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Instances, Instance } from '@react-three/drei'
import type { Group, Mesh } from 'three'

import { BENCHES, LAMPS, PLANTERS, ROCKS, STATUES } from './data'
import {
  gold,
  lampWarm,
  marble,
  marbleDark,
  rock,
  stoneTrim,
  water,
  wood,
  woodDark,
} from './materials'

/** One lantern on a stone post. */
function Lamp({ x, z, glowRef }: { x: number; z: number; glowRef?: React.RefObject<Group | null> }) {
  return (
    <group position={[x, 0, z]} ref={glowRef}>
      <mesh position={[0, 1.3, 0]} castShadow material={stoneTrim}>
        <cylinderGeometry args={[0.07, 0.11, 2.6, 8]} />
      </mesh>
      <mesh position={[0, 2.78, 0]} material={gold}>
        <sphereGeometry args={[0.12, 8, 8]} />
      </mesh>
      <mesh position={[0, 2.62, 0]} material={lampWarm}>
        <boxGeometry args={[0.3, 0.34, 0.3]} />
      </mesh>
    </group>
  )
}

/**
 * District furniture and details — benches, lanterns, rocks, statues and
 * planters, all instanced or small enough to stay cheap.
 */
export function ArrivalProps() {
  return (
    <group>
      <Fountain />
      <Furniture />
    </group>
  )
}

/** The central plaza fountain: water feature + celestial monument. */
function Fountain() {
  const waterRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (!waterRef.current) return
    waterRef.current.position.y = 0.21 + Math.sin(clock.elapsedTime * 1.1) * 0.014
    waterRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.4) * 0.012
  })

  return (
    <group>
      {/* Basin floor + rim */}
      <mesh position={[0, 0.08, 0]} receiveShadow material={marbleDark}>
        <cylinderGeometry args={[3.3, 3.3, 0.16, 28]} />
      </mesh>
      <mesh position={[0, 0.32, 0]} castShadow material={stoneTrim}>
        <torusGeometry args={[3.25, 0.3, 10, 28]} />
      </mesh>
      {/* Water (gently animated) */}
      <mesh ref={waterRef} position={[0, 0.21, 0]} material={water}>
        <cylinderGeometry args={[3.05, 3.05, 0.06, 28]} />
      </mesh>
      {/* Central pedestal + obelisk */}
      <mesh position={[0, 1.1, 0]} castShadow material={marble}>
        <cylinderGeometry args={[0.55, 0.7, 1.5, 12]} />
      </mesh>
      <mesh position={[0, 2.6, 0]} castShadow material={marble}>
        <cylinderGeometry args={[0.22, 0.34, 1.7, 8]} />
      </mesh>
      <mesh position={[0, 3.72, 0]} material={gold}>
        <coneGeometry args={[0.26, 0.85, 8]} />
      </mesh>
      {/* Gold ring at the waterline */}
      <mesh position={[0, 0.24, 0]} material={gold}>
        <torusGeometry args={[2.8, 0.035, 8, 28]} />
      </mesh>
    </group>
  )
}

/** Benches, lanterns, rocks, statues and planters. */
function Furniture() {
  // A couple of warm point lights near the plaza; every other lamp is
  // just an emissive head so we don't pay for dozens of real lights.
  const lampA = useRef<Group>(null)
  const lampB = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (lampA.current) lampA.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 2.1) * 0.04)
    if (lampB.current) lampB.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 1.7) * 0.04)
  })

  return (
    <group>
      {/* Benches */}
      {BENCHES.map(([x, z, rotY], i) => (
        <group key={i} position={[x, 0, z]} rotation-y={rotY}>
          <mesh position={[0, 0.46, 0]} castShadow material={wood}>
            <boxGeometry args={[1.5, 0.08, 0.52]} />
          </mesh>
          <mesh position={[0, 0.78, 0.22]} castShadow material={wood}>
            <boxGeometry args={[1.5, 0.5, 0.08]} />
          </mesh>
          <mesh position={[-0.6, 0.22, 0]} castShadow material={stoneTrim}>
            <boxGeometry args={[0.12, 0.44, 0.44]} />
          </mesh>
          <mesh position={[0.6, 0.22, 0]} castShadow material={stoneTrim}>
            <boxGeometry args={[0.12, 0.44, 0.44]} />
          </mesh>
        </group>
      ))}

      {/* Lanterns */}
      {LAMPS.map(([x, z], i) => (
        <Lamp
          key={i}
          x={x}
          z={z}
          glowRef={i === 7 ? lampA : i === 9 ? lampB : undefined}
        />
      ))}

      {/* Rocks */}
      <Instances limit={ROCKS.length} castShadow receiveShadow material={rock}>
        <dodecahedronGeometry args={[0.6, 0]} />
        {ROCKS.map(([x, z, s], i) => (
          <Instance
            key={i}
            position={[x, 0.22 * s, z]}
            scale={[s, s * (0.55 + (i % 3) * 0.12), s]}
            rotation={[(i * 37) % 90, (i * 71) % 180, 0]}
          />
        ))}
      </Instances>

      {/* Statues */}
      {STATUES.map(([x, z, rotY], i) => (
        <group key={i} position={[x, 0, z]} rotation-y={rotY}>
          <mesh position={[0, 0.55, 0]} castShadow material={marble}>
            <boxGeometry args={[0.9, 1.1, 0.9]} />
          </mesh>
          <mesh position={[0, 1.45, 0]} castShadow material={marble}>
            <capsuleGeometry args={[0.16, 0.5, 4, 8]} />
          </mesh>
          <mesh position={[0, 2.0, 0]} castShadow material={marble}>
            <sphereGeometry args={[0.13, 10, 10]} />
          </mesh>
          <mesh position={[0, 2.2, 0]} material={gold}>
            <sphereGeometry args={[0.05, 6, 6]} />
          </mesh>
        </group>
      ))}

      {/* Stone planters with trimmed bushes */}
      {PLANTERS.map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 0.3, 0]} castShadow material={stoneTrim}>
            <boxGeometry args={[1.2, 0.6, 1.2]} />
          </mesh>
          <mesh position={[0, 0.78, 0]} castShadow material={woodDark}>
            <icosahedronGeometry args={[0.42, 0]} />
          </mesh>
          <mesh position={[0, 0.78, 0]} material={gold}>
            <boxGeometry args={[1.26, 0.06, 1.26]} />
          </mesh>
        </group>
      ))}
    </group>
  )
}