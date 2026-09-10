import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

import { marble, marbleDark, stoneTrim, water, wood } from './materials'

/**
 * The Voice / Social Lounge — a calmer area for conversation.
 *
 * Comfortable seating, circular conversation areas, tables,
 * soft lighting, small water feature. Feels like a place to talk.
 */
export function WorldsVoiceLounge() {
  return (
    <group position={[16, 0, -8]}>
      {/* Lounge floor */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.01, 0]} receiveShadow material={stoneTrim}>
        <circleGeometry args={[5, 32]} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.015, 0]} material={marbleDark}>
        <circleGeometry args={[3.5, 32]} />
      </mesh>

      {/* Water feature */}
      <WaterFeature />

      {/* Conversation areas */}
      <ConversationArea x={-2} z={-1} />
      <ConversationArea x={2} z={1} />

      {/* Comfortable seating */}
      <ComfortableSeating />
    </group>
  )
}

/** Small water feature for ambient sound. */
function WaterFeature() {
  const waterRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (!waterRef.current) return
    waterRef.current.position.y = 0.12 + Math.sin(clock.elapsedTime * 1.3) * 0.01
  })

  return (
    <group position={[0, 0, -2.5]}>
      {/* Basin */}
      <mesh position={[0, 0.05, 0]} receiveShadow material={marbleDark}>
        <cylinderGeometry args={[1.2, 1.2, 0.1, 20]} />
      </mesh>
      <mesh position={[0, 0.15, 0]} castShadow material={stoneTrim}>
        <torusGeometry args={[1.15, 0.12, 8, 20]} />
      </mesh>
      {/* Water */}
      <mesh ref={waterRef} position={[0, 0.12, 0]} material={water}>
        <cylinderGeometry args={[1.0, 1.0, 0.04, 20]} />
      </mesh>
      {/* Central stone */}
      <mesh position={[0, 0.25, 0]} castShadow material={marble}>
        <sphereGeometry args={[0.15, 10, 10]} />
      </mesh>
    </group>
  )
}

/** A conversation area with seating. */
function ConversationArea({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      {/* Circular table */}
      <mesh position={[0, 0.45, 0]} castShadow material={wood}>
        <cylinderGeometry args={[0.5, 0.5, 0.05, 12]} />
      </mesh>
      <mesh position={[0, 0.22, 0]} castShadow material={wood}>
        <cylinderGeometry args={[0.05, 0.06, 0.44, 8]} />
      </mesh>

      {/* Chairs */}
      {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((rotY, i) => (
        <group key={i} position={[Math.sin(rotY) * 1.0, 0, Math.cos(rotY) * 1.0]} rotation-y={rotY}>
          <mesh position={[0, 0.35, 0]} castShadow material={wood}>
            <boxGeometry args={[0.4, 0.06, 0.4]} />
          </mesh>
          <mesh position={[0, 0.55, 0.18]} castShadow material={wood}>
            <boxGeometry args={[0.4, 0.35, 0.06]} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/** Comfortable seating around the lounge. */
function ComfortableSeating() {
  return (
    <group>
      {/* Benches from data */}
      {([ [16, -8, 0], [18, -6, Math.PI / 2], [18, -10, -Math.PI / 2] ] as const).map(([x, z, rotY], i) => (
        <group key={i} position={[x - 16, 0, z + 8]} rotation-y={rotY}>
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

      {/* Soft accent light */}
      <pointLight position={[0, 1.5, 0]} intensity={4} distance={6} color="#ffd9a8" />
    </group>
  )
}
