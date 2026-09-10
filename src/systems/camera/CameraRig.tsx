import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Raycaster, Vector3 } from 'three'

import { getCameraBoxes } from '@/systems/collision/CollisionWorld'
import { PLAYER } from '@/systems/player/constants'
import { usePlayer } from '@/systems/player/PlayerContext'

// Scratch objects reused every frame to avoid allocations.
const _head = new Vector3()
const _desired = new Vector3()
const _dir = new Vector3()
const _raycaster = new Raycaster()
const _hit = new Vector3()

interface CameraRigProps {
  /** Disabled while the opening cinematic camera is in control. */
  enabled?: boolean
}

/**
 * Third-person orbit camera.
 *
 * Follows the player smoothly at PLAYER.cameraDistance, orbit angles
 * driven by the player's yaw/pitch (mouse). Raycasts against the
 * location's colliders to keep the lens out of walls.
 */
export function CameraRig({ enabled = true }: CameraRigProps) {
  const { stateRef } = usePlayer()
  const current = useRef<Vector3 | null>(null)

  useFrame(({ camera }, delta) => {
    if (!enabled) return
    const s = stateRef.current

    _head.set(s.position.x, s.position.y + PLAYER.eyeHeight, s.position.z)

    // Orbit offset: behind the player, raised by pitch.
    const cp = Math.cos(s.pitch)
    _desired.set(
      _head.x + Math.sin(s.yaw) * cp * PLAYER.cameraDistance,
      _head.y + Math.sin(s.pitch) * PLAYER.cameraDistance,
      _head.z + Math.cos(s.yaw) * cp * PLAYER.cameraDistance,
    )

    // Keep the camera above the ground.
    _desired.y = Math.max(_desired.y, s.position.y + 0.35)

    // Slide the camera forward when a wall is between it and the player.
    _dir.subVectors(_desired, _head)
    const dist = _dir.length()
    if (dist > 1e-5) {
      _dir.normalize()
      _raycaster.set(_head, _dir)
      _raycaster.far = dist
      let blocked = dist
      for (const box of getCameraBoxes()) {
        if (_raycaster.ray.intersectBox(box, _hit)) {
          blocked = Math.min(blocked, _hit.distanceTo(_head))
        }
      }
      if (blocked < dist) {
        _desired.copy(_head).addScaledVector(_dir, Math.max(blocked - 0.25, 0.4))
      }
    }

    // Smooth follow.
    if (current.current) {
      const blend = 1 - Math.exp(-PLAYER.cameraSmoothing * delta)
      current.current.lerp(_desired, blend)
    } else {
      current.current = _desired.clone()
    }

    camera.position.copy(current.current)
    camera.lookAt(_head)
  })

  return null
}