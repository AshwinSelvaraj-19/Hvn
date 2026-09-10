import { useEffect } from 'react'

import { ARRIVAL_MARKER } from './data'
import { gold, marble, stoneTrim } from './materials'
import { registerInteraction } from '@/systems/interaction/interactionStore'
import { showNotice } from '@/systems/ui/noticeStore'

/**
 * The Arrival's interactables.
 *
 * - The arrival marker beside the path: "WELCOME TO HEAVEN SOCIETY."
 * - The plaza obelisk inscription: "THE HEART OF HEAVEN SOCIETY."
 *
 * Registration lives in the shared interaction store (canvas side);
 * proximity activation is handled by InteractionManager.
 */
export function ArrivalInteractions() {
  useEffect(() => {
    const unregisterMarker = registerInteraction({
      id: 'arrival-marker',
      prompt: 'Read the arrival marker',
      position: { x: ARRIVAL_MARKER.x, z: ARRIVAL_MARKER.z },
      radius: 2.4,
      onInteract: () => showNotice('WELCOME TO HEAVEN SOCIETY'),
    })
    const unregisterObelisk = registerInteraction({
      id: 'plaza-obelisk',
      prompt: 'Read the inscription',
      position: { x: 0, z: 0 },
      radius: 4.6,
      onInteract: () => showNotice('THE HEART OF HEAVEN SOCIETY'),
    })
    return () => {
      unregisterMarker()
      unregisterObelisk()
    }
  }, [])

  return (
    <group>
      {/* Arrival marker: stone stele with a gold band, beside the path. */}
      <group position={[ARRIVAL_MARKER.x, 0, ARRIVAL_MARKER.z]}>
        <mesh position={[0, 0.22, 0]} castShadow material={stoneTrim}>
          <boxGeometry args={[1.1, 0.44, 0.7]} />
        </mesh>
        <mesh position={[0, 1.42, 0]} castShadow material={marble}>
          <boxGeometry args={[0.62, 2.1, 0.26]} />
        </mesh>
        <mesh position={[0, 1.42, 0.135]} material={gold}>
          <boxGeometry args={[0.64, 0.16, 0.02]} />
        </mesh>
        <mesh position={[0, 2.42, 0]} material={gold}>
          <sphereGeometry args={[0.09, 8, 8]} />
        </mesh>
      </group>
    </group>
  )
}