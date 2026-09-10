import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { CatmullRomCurve3, Vector3 } from 'three'

// Camera flight path: high over the approach, down the path, ending at
// the third-person follow position behind the spawn point.
const CAMERA_POINTS = [
  [0, 17, 62],
  [0, 13.5, 46],
  [0, 8, 30],
  [0, 5, 14],
  [0, 3.1, 31.5],
] as const

// What the camera looks at along the way: plaza first, then the player.
const LOOK_POINTS = [
  [0, 3, 0],
  [0, 3, 0],
  [0, 2, 0],
  [0, 1.5, 8],
  [0, 1.5, 26],
] as const

const DURATION = 9

interface CinematicCameraProps {
  active: boolean
}

/**
 * In-canvas cinematic camera. While active it owns the main camera,
 * flying along a curve with GSAP while the player/camera systems are
 * disabled. Ends exactly at the third-person follow position so the
 * handoff to CameraRig is seamless.
 */
export function CinematicCamera({ active }: CinematicCameraProps) {
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
    const tween = gsap.fromTo(
      progress.current,
      { t: 0 },
      { t: 1, duration: DURATION, ease: 'power1.inOut' },
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