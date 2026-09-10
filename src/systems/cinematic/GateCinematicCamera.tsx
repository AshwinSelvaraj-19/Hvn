import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { CatmullRomCurve3, Vector3 } from 'three'

import { completeGateCinematic } from './gateCinematicStore'

/**
 * Camera flight path for the Gate cinematic.
 *
 * Phase A — approach from plaza, looking at the Gate
 * Phase B — rise and orbit to frame the Gate architecture
 * Phase C — settle into a view that reveals the Gate and the world beyond
 */
const CAMERA_POINTS = [
  // Start: behind the player in the plaza, looking toward the Gate
  [0, 3.5, -6],
  // Rise and approach
  [0, 5.5, -10],
  // Orbit left to show the Gate architecture
  [-4, 6.5, -13],
  // Rise higher, looking at the Gate head-on
  [-2, 8, -15],
  // Final: elevated view showing Gate + viewpoint + world
  [0, 6, -10],
] as const

/** What the camera looks at along the path. */
const LOOK_POINTS = [
  // Looking at the Gate
  [0, 3.5, -14],
  // Focusing on the arch
  [0, 4.5, -14],
  // Gate from the side
  [0, 4, -14],
  // Head-on
  [0, 4, -14],
  // Final: Gate + world view
  [0, 3, -18],
] as const

const DURATION = 10

interface GateCinematicCameraProps {
  active: boolean
}

/**
 * In-canvas cinematic camera for the Gate.
 *
 * When activated by the gateCinematicStore, it takes over the main camera,
 * flying along a GSAP-animated curve. Disables player input and camera rig
 * via the Experience props.
 */
export function GateCinematicCamera({ active }: GateCinematicCameraProps) {
  const camera = useThree((s) => s.camera)
  const progress = useRef({ t: 0 })

  const cameraCurve = useMemo(
    () => new CatmullRomCurve3(CAMERA_POINTS.map((p) => new Vector3(p[0], p[1], p[2]))),
    [],
  )
  const lookCurve = useMemo(
    () => new CatmullRomCurve3(LOOK_POINTS.map((p) => new Vector3(p[0], p[1], p[2]))),
    [],
  )
  const camPos = useMemo(() => new Vector3(), [])
  const lookPos = useMemo(() => new Vector3(), [])

  useEffect(() => {
    if (!active) return
    progress.current.t = 0
    const tween = gsap.fromTo(
      progress.current,
      { t: 0 },
      {
        t: 1,
        duration: DURATION,
        ease: 'power1.inOut',
        onComplete: () => completeGateCinematic(),
      },
    )
    return () => {
      tween.kill()
    }
  }, [active])

  useFrame(() => {
    if (!active) return
    const t = progress.current.t
    cameraCurve.getPoint(t, camPos)
    lookCurve.getPoint(t, lookPos)
    camera.position.copy(camPos)
    camera.lookAt(lookPos)
  })

  return null
}
