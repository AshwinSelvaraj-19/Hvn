import { useEffect } from 'react'

import { FOUNDER_POSITIONS } from './data'
import { gold, marble, marbleDark, stoneTrim } from './materials'
import { registerInteraction } from '@/systems/interaction/interactionStore'
import { showNotice } from '@/systems/ui/noticeStore'

/**
 * The Founder's Sanctum interactables:
 * - Founder Portrait
 * - Founder Desk
 * - Memory Monument
 *
 * Each uses the existing interaction + notice system.
 */
export function FounderInteractions() {
  useEffect(() => {
    const unregisterPortrait = registerInteraction({
      id: 'founder-portrait',
      prompt: 'Examine the portrait',
      position: FOUNDER_POSITIONS.portrait,
      radius: 2.5,
      onInteract: () =>
        showNotice(
          'The founder of Heaven Society — a visionary who envisioned a community where every soul finds peace and belonging.',
        ),
    })

    const unregisterDesk = registerInteraction({
      id: 'founder-desk',
      prompt: 'Read the documents',
      position: FOUNDER_POSITIONS.desk,
      radius: 2.0,
      onInteract: () =>
        showNotice(
          'Where it all began. The founder\'s vision for Heaven Society took shape at this very desk.',
        ),
    })

    const unregisterMonument = registerInteraction({
      id: 'founder-monument',
      prompt: 'Read the inscription',
      position: FOUNDER_POSITIONS.monument,
      radius: 2.0,
      onInteract: () =>
        showNotice(
          '"Heaven Society was founded on the principle that every soul deserves a place of peace and belonging."',
        ),
    })

    return () => {
      unregisterPortrait()
      unregisterDesk()
      unregisterMonument()
    }
  }, [])

  return (
    <group>
      {/* Founder Portrait — framed on the back wall */}
      <FounderPortrait />

      {/* Memory Monument — stone stele in reflection room */}
      <MemoryMonumentVisual />
    </group>
  )
}

/** A framed portrait on the wall. */
function FounderPortrait() {
  return (
    <group position={[0, 2.0, -5.88]}>
      {/* Frame */}
      <mesh material={gold}>
        <boxGeometry args={[1.4, 1.1, 0.08]} />
      </mesh>
      {/* Canvas/face area */}
      <mesh position={[0, 0, 0.03]} material={marbleDark}>
        <boxGeometry args={[1.15, 0.85, 0.02]} />
      </mesh>
      {/* Simple abstract representation — a light shape */}
      <mesh position={[0, 0.05, 0.05]}>
        <sphereGeometry args={[0.2, 10, 10]} />
        <meshStandardMaterial color="#e8ddd0" roughness={0.7} />
      </mesh>
    </group>
  )
}

/** The Memory Monument — stone stele with gold band. */
function MemoryMonumentVisual() {
  return (
    <group position={[0, 0, -12.5]}>
      {/* Base */}
      <mesh position={[0, 0.15, 0]} castShadow material={stoneTrim}>
        <boxGeometry args={[1.4, 0.3, 0.8]} />
      </mesh>
      {/* Stele */}
      <mesh position={[0, 1.2, 0]} castShadow material={marble}>
        <boxGeometry args={[0.8, 1.8, 0.15]} />
      </mesh>
      {/* Gold band */}
      <mesh position={[0, 1.2, 0.08]} material={gold}>
        <boxGeometry args={[0.82, 0.08, 0.01]} />
      </mesh>
      {/* Gold finial */}
      <mesh position={[0, 2.18, 0]} material={gold}>
        <sphereGeometry args={[0.07, 8, 8]} />
      </mesh>
    </group>
  )
}
