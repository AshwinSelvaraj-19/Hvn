import { useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'

import { resolvePlayerCollision } from '@/systems/collision/CollisionWorld'
import { PLAYER } from './constants'
import { usePlayer } from './PlayerContext'
import { useKeyboard } from './useKeyboard'
import { usePointerLock } from './usePointerLock'

// Scratch objects reused every frame to avoid allocations.
const _targetDir = new Vector3()
const _targetVel = new Vector3()
const _velocity = new Vector3()

interface PlayerControllerProps {
  /** Disabled while the opening cinematic is running. */
  enabled?: boolean
}

/**
 * Third-person player controller — logic only, renders nothing.
 *
 * - WASD / arrows to move relative to the camera orbit yaw
 * - Shift to sprint
 * - Mouse (while pointer-locked) to orbit the camera
 *
 * Writes player state every frame (position, yaw, pitch, facing, speed);
 * the CameraRig and CharacterRig consume it. Movement is resolved
 * against the current location's colliders and world boundary.
 */
export function PlayerController({ enabled = true }: PlayerControllerProps) {
  const { stateRef } = usePlayer()
  const keys = useKeyboard()
  const locked = usePointerLock()

  // Camera orbit — applied only while pointer-locked.
  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (!enabled || !locked.current) return
      const s = stateRef.current
      s.yaw -= event.movementX * PLAYER.mouseSensitivity
      s.pitch = Math.min(
        PLAYER.pitchMax,
        Math.max(PLAYER.pitchMin, s.pitch - event.movementY * PLAYER.mouseSensitivity),
      )
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [enabled, locked, stateRef])

  useFrame((_, delta) => {
    const s = stateRef.current

    // Collision + boundary are enforced every frame (even while input
    // is disabled) so teleports and spawns can never embed the player
    // inside architecture.
    s.position.y = 0
    resolvePlayerCollision(s.position, PLAYER.radius)

    // Input is gated on pointer lock + cinematic so the world stays
    // still until the visitor is in control.
    if (!enabled || !locked.current) {
      s.speed = 0
      s.sprinting = false
      return
    }

    const k = keys.current
    const forward = (k.KeyW || k.ArrowUp ? 1 : 0) - (k.KeyS || k.ArrowDown ? 1 : 0)
    const right = (k.KeyD || k.ArrowRight ? 1 : 0) - (k.KeyA || k.ArrowLeft ? 1 : 0)
    const sprinting = Boolean(k.ShiftLeft || k.ShiftRight)
    const maxSpeed = sprinting ? PLAYER.sprintSpeed : PLAYER.walkSpeed

    // Build the desired direction from the camera orbit basis.
    const sin = Math.sin(s.yaw)
    const cos = Math.cos(s.yaw)
    // forward = (-sin, 0, -cos), right = (cos, 0, -sin)
    _targetDir.set(-sin * forward + cos * right, 0, -cos * forward - sin * right)
    if (_targetDir.lengthSq() > 0) {
      _targetDir.normalize()
    }
    _targetVel.copy(_targetDir).multiplyScalar(maxSpeed)

    // Smoothly approach the target velocity for a grounded feel.
    const blend = 1 - Math.exp(-PLAYER.acceleration * delta)
    _velocity.lerp(_targetVel, blend)
    s.position.addScaledVector(_velocity, delta)

    // Ground clamp + collision against architecture and world boundary.
    s.position.y = 0
    resolvePlayerCollision(s.position, PLAYER.radius)

    s.speed = _velocity.length()
    s.sprinting = sprinting

    // Character faces movement direction (with angular smoothing).
    if (s.speed > 0.15) {
      const targetFacing = Math.atan2(_targetDir.x, _targetDir.z)
      let diff = targetFacing - s.facing
      while (diff > Math.PI) diff -= Math.PI * 2
      while (diff < -Math.PI) diff += Math.PI * 2
      s.facing += diff * Math.min(1, delta * 12)
    }
  })

  return null
}