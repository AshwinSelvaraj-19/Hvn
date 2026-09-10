import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

import type { LocationId } from '@/core/types/world'
import { Experience } from '@/core/engine/Experience'

interface GameCanvasProps {
  locationId: LocationId
  /** True while the opening cinematic owns the camera and input. */
  cinematic: boolean
  /** True while the Gate final cinematic owns the camera and input. */
  gateCinematic?: boolean
}

/**
 * The single 3D canvas for the whole experience.
 *
 * R3F's <Canvas> creates a separate React root, so cross-tree data
 * (like the active location and cinematic state) is passed in as props
 * rather than via context. Anything that lives in both worlds should be
 * prop-driven.
 */
export function GameCanvas({ locationId, cinematic, gateCinematic = false }: GameCanvasProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ fov: 65, near: 0.1, far: 500, position: [0, 2.2, 30.6] }}
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.9,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
    >
      <Suspense fallback={null}>
        <Experience locationId={locationId} cinematic={cinematic} gateCinematic={gateCinematic} />
      </Suspense>
    </Canvas>
  )
}