import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, Mesh } from 'three'

import { gold, goldBright, marble, marbleDark, marbleGlow, portal, stoneStep, stoneTrim } from './materials'

/**
 * The Celestial Gate — visual centerpiece of the final destination.
 *
 * Monumental architectural gateway: large stone/marble pillars,
 * geometric arch, gold detailing, luminous inner portal.
 *
 * Design: ancient monumental architecture + refined celestial materials.
 * NOT a sci-fi portal — a real architectural entrance with celestial quality.
 */
export function GateArchitecture() {
  return (
    <group position={[0, 0, -14]}>
      {/* Platform / threshold */}
      <Threshold />
      {/* Pillars */}
      <Pillars />
      {/* Arch */}
      <Arch />
      {/* Inner portal / sky opening */}
      <InnerPortal />
      {/* Gold detailing */}
      <GoldDetails />
      {/* Stairs */}
      <Stairs />
    </group>
  )
}

/** The raised threshold platform. */
function Threshold() {
  return (
    <group>
      {/* Main platform */}
      <mesh position={[0, 0.2, 0]} receiveShadow material={marble}>
        <boxGeometry args={[7, 0.4, 4]} />
      </mesh>
      {/* Platform edge */}
      <mesh position={[0, 0.42, 0]} material={stoneTrim}>
        <boxGeometry args={[7.1, 0.04, 4.1]} />
      </mesh>
      {/* Gold inlay on platform */}
      <mesh position={[0, 0.425, 0]} material={gold}>
        <boxGeometry args={[5.5, 0.01, 0.08]} />
      </mesh>
      <mesh position={[0, 0.425, 0]} material={gold}>
        <boxGeometry args={[0.08, 0.01, 3.2]} />
      </mesh>
    </group>
  )
}

/** The main pillars — symmetrical, monumental. */
function Pillars() {
  return (
    <group>
      {/* Left pillar */}
      <group position={[-2.8, 0, 0]}>
        {/* Base */}
        <mesh position={[0, 0.6, 0]} castShadow material={marbleDark}>
          <boxGeometry args={[1.0, 0.8, 1.0]} />
        </mesh>
        {/* Shaft */}
        <mesh position={[0, 3.2, 0]} castShadow material={marble}>
          <cylinderGeometry args={[0.32, 0.38, 4.4, 12]} />
        </mesh>
        {/* Capital */}
        <mesh position={[0, 5.5, 0]} castShadow material={marble}>
          <boxGeometry args={[0.9, 0.3, 0.9]} />
        </mesh>
        {/* Gold ring */}
        <mesh position={[0, 5.68, 0]} material={gold}>
          <torusGeometry args={[0.36, 0.03, 8, 16]} />
        </mesh>
      </group>

      {/* Right pillar */}
      <group position={[2.8, 0, 0]}>
        <mesh position={[0, 0.6, 0]} castShadow material={marbleDark}>
          <boxGeometry args={[1.0, 0.8, 1.0]} />
        </mesh>
        <mesh position={[0, 3.2, 0]} castShadow material={marble}>
          <cylinderGeometry args={[0.32, 0.38, 4.4, 12]} />
        </mesh>
        <mesh position={[0, 5.5, 0]} castShadow material={marble}>
          <boxGeometry args={[0.9, 0.3, 0.9]} />
        </mesh>
        <mesh position={[0, 5.68, 0]} material={gold}>
          <torusGeometry args={[0.36, 0.03, 8, 16]} />
        </mesh>
      </group>

      {/* Inner pillars (thinner, behind main) */}
      <group position={[-1.5, 0, -0.6]}>
        <mesh position={[0, 0.5, 0]} castShadow material={marbleDark}>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
        </mesh>
        <mesh position={[0, 2.8, 0]} castShadow material={marble}>
          <cylinderGeometry args={[0.2, 0.24, 4.0, 8]} />
        </mesh>
        <mesh position={[0, 4.85, 0]} castShadow material={marble}>
          <boxGeometry args={[0.5, 0.2, 0.5]} />
        </mesh>
      </group>
      <group position={[1.5, 0, -0.6]}>
        <mesh position={[0, 0.5, 0]} castShadow material={marbleDark}>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
        </mesh>
        <mesh position={[0, 2.8, 0]} castShadow material={marble}>
          <cylinderGeometry args={[0.2, 0.24, 4.0, 8]} />
        </mesh>
        <mesh position={[0, 4.85, 0]} castShadow material={marble}>
          <boxGeometry args={[0.5, 0.2, 0.5]} />
        </mesh>
      </group>
    </group>
  )
}

/** The arch connecting the pillars. */
function Arch() {
  return (
    <group position={[0, 5.8, 0]}>
      {/* Main arch beam */}
      <mesh castShadow material={marble}>
        <boxGeometry args={[6.2, 0.5, 0.8]} />
      </mesh>
      {/* Arch underside */}
      <mesh position={[0, -0.28, 0]} material={marbleGlow}>
        <boxGeometry args={[5.4, 0.08, 0.65]} />
      </mesh>
      {/* Gold trim on arch */}
      <mesh position={[0, 0.28, 0]} material={gold}>
        <boxGeometry args={[6.3, 0.06, 0.86]} />
      </mesh>
      {/* Decorative gold elements on arch face */}
      <mesh position={[-2, 0, 0.42]} material={gold}>
        <boxGeometry args={[0.4, 0.35, 0.04]} />
      </mesh>
      <mesh position={[0, 0, 0.42]} material={gold}>
        <boxGeometry args={[0.4, 0.35, 0.04]} />
      </mesh>
      <mesh position={[2, 0, 0.42]} material={gold}>
        <boxGeometry args={[0.4, 0.35, 0.04]} />
      </mesh>
    </group>
  )
}

/** Inner luminous portal — the sky opening beyond the Gate. */
function InnerPortal() {
  const portalRef = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (!portalRef.current) return
    const t = clock.elapsedTime
    portalRef.current.children.forEach((child, i) => {
      const mesh = child as Mesh
      if (mesh.material && 'emissiveIntensity' in mesh.material) {
        ;(mesh.material as { emissiveIntensity: number }).emissiveIntensity =
          0.4 + Math.sin(t * 0.8 + i * 0.5) * 0.15
      }
    })
  })

  return (
    <group ref={portalRef} position={[0, 3.0, -0.8]}>
      {/* Portal opening — recessed behind the arch */}
      <mesh material={portal}>
        <planeGeometry args={[4.8, 5.2]} />
      </mesh>
      {/* Subtle inner glow frame */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[5.2, 5.6]} />
        <meshStandardMaterial
          color="#fff8ee"
          emissive="#fff4e0"
          emissiveIntensity={0.25}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  )
}

/** Gold detailing — symbols, trim, accents. */
function GoldDetails() {
  return (
    <group>
      {/* Pillar base gold trim */}
      <mesh position={[-2.8, 0.02, 0]} material={gold}>
        <boxGeometry args={[1.1, 0.04, 1.1]} />
      </mesh>
      <mesh position={[2.8, 0.02, 0]} material={gold}>
        <boxGeometry args={[1.1, 0.04, 1.1]} />
      </mesh>

      {/* Floor threshold gold line */}
      <mesh position={[0, 0.42, 2.01]} material={gold}>
        <boxGeometry args={[6.0, 0.06, 0.04]} />
      </mesh>

      {/* Center keystone */}
      <mesh position={[0, 6.35, 0]} material={goldBright}>
        <octahedronGeometry args={[0.2, 0]} />
      </mesh>
    </group>
  )
}

/** Stairs leading up to the Gate. */
function Stairs() {
  return (
    <group position={[0, 0, 2]}>
      {Array.from({ length: 4 }, (_, i) => (
        <mesh key={i} position={[0, 0.05 + i * 0.1, i * 0.45]} receiveShadow material={stoneStep}>
          <boxGeometry args={[5.5 - i * 0.15, 0.1, 0.45]} />
        </mesh>
      ))}
    </group>
  )
}
