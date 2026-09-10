import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

import { PLAYER } from './constants'
import { usePlayer } from './PlayerContext'

interface CharacterRigProps {
  visible?: boolean
}

/**
 * Premium procedural humanoid — realistic proportions, natural animation.
 *
 * Uses cylindrical limbs, tapered shapes, proper joints, and layered
 * materials for a believable celestial traveler appearance.
 * 8-head-height proportions for natural human silhouette.
 */
export function CharacterRig({ visible = true }: CharacterRigProps) {
  const { stateRef } = usePlayer()
  const groupRef = useRef<Group>(null)
  const leftLegRef = useRef<Group>(null)
  const rightLegRef = useRef<Group>(null)
  const leftArmRef = useRef<Group>(null)
  const rightArmRef = useRef<Group>(null)
  const torsoRef = useRef<Group>(null)
  const headRef = useRef<Group>(null)
  const walkPhase = useRef(0)
  const prevSpeed = useRef(0)

  useFrame((_, delta) => {
    const s = stateRef.current
    if (!groupRef.current) return

    const moving = s.speed > 0.15
    const speedRatio = Math.min(1, s.speed / PLAYER.walkSpeed)

    // Smooth speed transitions
    prevSpeed.current += (speedRatio - prevSpeed.current) * Math.min(1, delta * 8)
    const smoothSpeed = prevSpeed.current

    // Walk phase — faster when running
    walkPhase.current += delta * (moving ? 4.5 + smoothSpeed * 2.5 : 1.5)
    const phase = walkPhase.current

    // Leg swing — natural gait with hip rotation
    const legSwing = moving
      ? Math.sin(phase) * 0.65 * smoothSpeed
      : Math.sin(phase * 0.8) * 0.02

    if (leftLegRef.current) {
      leftLegRef.current.rotation.x = legSwing
      leftLegRef.current.position.z = Math.sin(phase) * 0.02 * smoothSpeed
    }
    if (rightLegRef.current) {
      rightLegRef.current.rotation.x = -legSwing
      rightLegRef.current.position.z = -Math.sin(phase) * 0.02 * smoothSpeed
    }

    // Arm swing — opposite to legs, natural pendulum
    const armSwing = moving
      ? Math.sin(phase) * 0.45 * smoothSpeed
      : Math.sin(phase * 0.6) * 0.015

    if (leftArmRef.current) {
      leftArmRef.current.rotation.x = -armSwing
      leftArmRef.current.rotation.z = 0.08 + Math.cos(phase * 0.5) * 0.02 * smoothSpeed
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.x = armSwing
      rightArmRef.current.rotation.z = -0.08 - Math.cos(phase * 0.5) * 0.02 * smoothSpeed
    }

    // Torso — subtle bob and lean
    if (torsoRef.current) {
      const bob = moving
        ? Math.abs(Math.cos(phase)) * 0.025 * smoothSpeed
        : Math.sin(phase * 1.5) * 0.004
      const lean = moving ? Math.sin(phase * 0.5) * 0.015 * smoothSpeed : 0
      torsoRef.current.position.y = 0.95 + bob
      torsoRef.current.rotation.z = lean
    }

    // Head — subtle nod and stabilization
    if (headRef.current) {
      const nod = moving ? Math.sin(phase * 2) * 0.02 * smoothSpeed : 0
      headRef.current.rotation.x = nod
    }

    groupRef.current.position.set(s.position.x, s.position.y, s.position.z)
    groupRef.current.rotation.y = s.facing
  })

  // Material colors — celestial traveler palette
  const skinColor = '#d4a574'
  const tunicColor = '#e8e0d4'
  const tunicDark = '#c8bfb0'
  const pantsColor = '#4a4e54'
  const bootColor = '#3a3632'
  const hairColor = '#4a3828'
  const sashColor = '#c9a84c'
  const capeColor = '#d8d0c4'

  return (
    <group ref={groupRef} visible={visible}>
      <group ref={torsoRef} position={[0, 0.95, 0]}>
        {/* Main torso — tapered cylinder */}
        <mesh castShadow>
          <cylinderGeometry args={[0.18, 0.22, 0.55, 12]} />
          <meshStandardMaterial color={tunicColor} roughness={0.78} metalness={0.02} />
        </mesh>

        {/* Chest detail — subtle V-shape */}
        <mesh position={[0, 0.08, 0.12]} castShadow>
          <boxGeometry args={[0.22, 0.15, 0.04]} />
          <meshStandardMaterial color={tunicDark} roughness={0.75} metalness={0.02} />
        </mesh>

        {/* Gold sash — diagonal accent */}
        <mesh position={[0, 0.02, 0.11]} rotation={[0, 0, 0.3]} castShadow>
          <boxGeometry args={[0.04, 0.35, 0.02]} />
          <meshStandardMaterial color={sashColor} roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Belt */}
        <mesh position={[0, -0.15, 0]} rotation-x={Math.PI / 2} castShadow>
          <torusGeometry args={[0.2, 0.025, 8, 16]} />
          <meshStandardMaterial color={sashColor} roughness={0.35} metalness={0.75} />
        </mesh>

        {/* Belt buckle */}
        <mesh position={[0, -0.15, 0.2]} castShadow>
          <boxGeometry args={[0.06, 0.06, 0.02]} />
          <meshStandardMaterial color={sashColor} roughness={0.25} metalness={0.85} />
        </mesh>

        {/* Neck */}
        <mesh position={[0, 0.32, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.08, 0.1, 8]} />
          <meshStandardMaterial color={skinColor} roughness={0.65} metalness={0.02} />
        </mesh>

        {/* Shoulders */}
        <mesh position={[-0.2, 0.22, 0]} castShadow>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshStandardMaterial color={tunicColor} roughness={0.78} metalness={0.02} />
        </mesh>
        <mesh position={[0.2, 0.22, 0]} castShadow>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshStandardMaterial color={tunicColor} roughness={0.78} metalness={0.02} />
        </mesh>

        {/* Head */}
        <group ref={headRef} position={[0, 0.42, 0]}>
          {/* Skull */}
          <mesh position={[0, 0.08, 0]} castShadow>
            <sphereGeometry args={[0.13, 14, 14]} />
            <meshStandardMaterial color={skinColor} roughness={0.62} metalness={0.02} />
          </mesh>
          {/* Face — subtle forward projection */}
          <mesh position={[0, 0.04, 0.08]} castShadow>
            <sphereGeometry args={[0.08, 10, 10]} />
            <meshStandardMaterial color={skinColor} roughness={0.6} metalness={0.02} />
          </mesh>
          {/* Hair — layered cap */}
          <mesh position={[0, 0.14, -0.02]} castShadow>
            <sphereGeometry args={[0.135, 12, 12, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
            <meshStandardMaterial color={hairColor} roughness={0.88} metalness={0} />
          </mesh>
          {/* Hair back */}
          <mesh position={[0, 0.1, -0.08]} castShadow>
            <sphereGeometry args={[0.1, 10, 10, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
            <meshStandardMaterial color={hairColor} roughness={0.88} metalness={0} />
          </mesh>
          {/* Eyes — subtle indentations */}
          <mesh position={[-0.04, 0.06, 0.11]}>
            <sphereGeometry args={[0.015, 6, 6]} />
            <meshStandardMaterial color="#2a2420" roughness={0.3} metalness={0.1} />
          </mesh>
          <mesh position={[0.04, 0.06, 0.11]}>
            <sphereGeometry args={[0.015, 6, 6]} />
            <meshStandardMaterial color="#2a2420" roughness={0.3} metalness={0.1} />
          </mesh>
        </group>

        {/* Cape — flowing back panel */}
        <mesh position={[0, 0.05, -0.2]} castShadow>
          <boxGeometry args={[0.3, 0.45, 0.03]} />
          <meshStandardMaterial color={capeColor} roughness={0.82} metalness={0.01} side={2} />
        </mesh>
      </group>

      {/* Left leg — upper + lower + boot */}
      <group position={[-0.1, 0.68, 0]}>
        <group ref={leftLegRef} position={[0, -0.02, 0]}>
          {/* Upper leg */}
          <mesh position={[0, -0.12, 0]} castShadow>
            <cylinderGeometry args={[0.065, 0.075, 0.28, 8]} />
            <meshStandardMaterial color={pantsColor} roughness={0.82} metalness={0.02} />
          </mesh>
          {/* Knee joint */}
          <mesh position={[0, -0.26, 0]} castShadow>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color={pantsColor} roughness={0.82} metalness={0.02} />
          </mesh>
          {/* Lower leg */}
          <mesh position={[0, -0.38, 0]} castShadow>
            <cylinderGeometry args={[0.055, 0.065, 0.24, 8]} />
            <meshStandardMaterial color={pantsColor} roughness={0.82} metalness={0.02} />
          </mesh>
          {/* Boot */}
          <mesh position={[0, -0.52, 0.02]} castShadow>
            <boxGeometry args={[0.1, 0.08, 0.16]} />
            <meshStandardMaterial color={bootColor} roughness={0.9} metalness={0.02} />
          </mesh>
        </group>
      </group>

      {/* Right leg — mirror of left */}
      <group position={[0.1, 0.68, 0]}>
        <group ref={rightLegRef} position={[0, -0.02, 0]}>
          <mesh position={[0, -0.12, 0]} castShadow>
            <cylinderGeometry args={[0.065, 0.075, 0.28, 8]} />
            <meshStandardMaterial color={pantsColor} roughness={0.82} metalness={0.02} />
          </mesh>
          <mesh position={[0, -0.26, 0]} castShadow>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color={pantsColor} roughness={0.82} metalness={0.02} />
          </mesh>
          <mesh position={[0, -0.38, 0]} castShadow>
            <cylinderGeometry args={[0.055, 0.065, 0.24, 8]} />
            <meshStandardMaterial color={pantsColor} roughness={0.82} metalness={0.02} />
          </mesh>
          <mesh position={[0, -0.52, 0.02]} castShadow>
            <boxGeometry args={[0.1, 0.08, 0.16]} />
            <meshStandardMaterial color={bootColor} roughness={0.9} metalness={0.02} />
          </mesh>
        </group>
      </group>

      {/* Left arm — shoulder + upper + forearm + hand */}
      <group position={[-0.24, 1.15, 0]}>
        <group ref={leftArmRef}>
          {/* Upper arm */}
          <mesh position={[0, -0.1, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.05, 0.22, 8]} />
            <meshStandardMaterial color={tunicColor} roughness={0.78} metalness={0.02} />
          </mesh>
          {/* Elbow */}
          <mesh position={[0, -0.22, 0]} castShadow>
            <sphereGeometry args={[0.04, 6, 6]} />
            <meshStandardMaterial color={tunicColor} roughness={0.78} metalness={0.02} />
          </mesh>
          {/* Forearm */}
          <mesh position={[0, -0.32, 0]} castShadow>
            <cylinderGeometry args={[0.035, 0.04, 0.2, 8]} />
            <meshStandardMaterial color={skinColor} roughness={0.65} metalness={0.02} />
          </mesh>
          {/* Hand */}
          <mesh position={[0, -0.44, 0]} castShadow>
            <sphereGeometry args={[0.035, 6, 6]} />
            <meshStandardMaterial color={skinColor} roughness={0.62} metalness={0.02} />
          </mesh>
        </group>
      </group>

      {/* Right arm — mirror of left */}
      <group position={[0.24, 1.15, 0]}>
        <group ref={rightArmRef}>
          <mesh position={[0, -0.1, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.05, 0.22, 8]} />
            <meshStandardMaterial color={tunicColor} roughness={0.78} metalness={0.02} />
          </mesh>
          <mesh position={[0, -0.22, 0]} castShadow>
            <sphereGeometry args={[0.04, 6, 6]} />
            <meshStandardMaterial color={tunicColor} roughness={0.78} metalness={0.02} />
          </mesh>
          <mesh position={[0, -0.32, 0]} castShadow>
            <cylinderGeometry args={[0.035, 0.04, 0.2, 8]} />
            <meshStandardMaterial color={skinColor} roughness={0.65} metalness={0.02} />
          </mesh>
          <mesh position={[0, -0.44, 0]} castShadow>
            <sphereGeometry args={[0.035, 6, 6]} />
            <meshStandardMaterial color={skinColor} roughness={0.62} metalness={0.02} />
          </mesh>
        </group>
      </group>

      {/* Shadow blob — grounded contact */}
      <mesh position={[0, 0.01, 0]} rotation-x={-Math.PI / 2} receiveShadow>
        <circleGeometry args={[0.25, 16]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.15} depthWrite={false} />
      </mesh>
    </group>
  )
}
