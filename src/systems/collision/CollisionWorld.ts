import { Box3, Vector3 } from 'three'

/**
 * Lightweight collision world — no physics engine.
 *
 * Locations register their static colliders (2D footprints at ground
 * level) and an optional circular world boundary. The player controller
 * resolves against them each frame; the camera rig raycasts against the
 * same data to avoid clipping through walls.
 */

export type Collider =
  | { kind: 'box'; x: number; z: number; w: number; d: number }
  | { kind: 'circle'; x: number; z: number; r: number }

export interface Boundary {
  x: number
  z: number
  radius: number
}

const colliders: Collider[] = []
const cameraBoxes: Box3[] = []
let boundary: Boundary | null = null

const WALL_HEIGHT = 8

function rebuildCameraBoxes(): void {
  cameraBoxes.length = 0
  for (const c of colliders) {
    if (c.kind === 'box') {
      cameraBoxes.push(
        new Box3(
          new Vector3(c.x - c.w / 2, 0, c.z - c.d / 2),
          new Vector3(c.x + c.w / 2, WALL_HEIGHT, c.z + c.d / 2),
        ),
      )
    } else {
      cameraBoxes.push(
        new Box3(
          new Vector3(c.x - c.r, 0, c.z - c.r),
          new Vector3(c.x + c.r, WALL_HEIGHT, c.z + c.r),
        ),
      )
    }
  }
}

/** Replace the current location's colliders (called on scene mount). */
export function setWorldColliders(list: Collider[], worldBoundary: Boundary | null): void {
  colliders.length = 0
  colliders.push(...list)
  boundary = worldBoundary
  rebuildCameraBoxes()
}

/** AABB list used by the camera rig for clip prevention. */
export function getCameraBoxes(): readonly Box3[] {
  return cameraBoxes
}

/**
 * Push `position` out of any overlapping collider (player treated as a
 * circle of `radius` at ground level), then clamp to the world boundary.
 */
export function resolvePlayerCollision(position: Vector3, radius: number): void {
  for (const c of colliders) {
    if (c.kind === 'box') {
      const minX = c.x - c.w / 2
      const maxX = c.x + c.w / 2
      const minZ = c.z - c.d / 2
      const maxZ = c.z + c.d / 2
      const cx = Math.min(maxX, Math.max(minX, position.x))
      const cz = Math.min(maxZ, Math.max(minZ, position.z))
      const dx = position.x - cx
      const dz = position.z - cz
      const distSq = dx * dx + dz * dz
      if (distSq < radius * radius) {
        if (distSq > 1e-8) {
          const dist = Math.sqrt(distSq)
          const push = radius - dist
          position.x += (dx / dist) * push
          position.z += (dz / dist) * push
        } else {
          // Center inside the box: push out along the smallest axis.
          const left = position.x - minX
          const right = maxX - position.x
          const back = position.z - minZ
          const front = maxZ - position.z
          const m = Math.min(left, right, back, front)
          if (m === left) position.x = minX - radius
          else if (m === right) position.x = maxX + radius
          else if (m === back) position.z = minZ - radius
          else position.z = maxZ + radius
        }
      }
    } else {
      const dx = position.x - c.x
      const dz = position.z - c.z
      const dist = Math.hypot(dx, dz)
      const min = c.r + radius
      if (dist < min) {
        if (dist > 1e-6) {
          position.x = c.x + (dx / dist) * min
          position.z = c.z + (dz / dist) * min
        } else {
          position.x = c.x + min
        }
      }
    }
  }

  if (boundary) {
    const dx = position.x - boundary.x
    const dz = position.z - boundary.z
    const dist = Math.hypot(dx, dz)
    if (dist > boundary.radius) {
      position.x = boundary.x + (dx / dist) * boundary.radius
      position.z = boundary.z + (dz / dist) * boundary.radius
    }
  }
}