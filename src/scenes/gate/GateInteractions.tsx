import { useEffect } from 'react'

import { GATE_POSITIONS } from './data'
import { registerInteraction } from '@/systems/interaction/interactionStore'
import { showNotice } from '@/systems/ui/noticeStore'
import { triggerGateCinematic } from '@/systems/cinematic/gateCinematicStore'

/**
 * Gate interactables:
 * - Join Heaven Pedestal (triggers final cinematic)
 * - Gate Monument (explains the Gate)
 * - Final Viewpoint (environmental message)
 */
export function GateInteractions() {
  useEffect(() => {
    const unregisterJoin = registerInteraction({
      id: 'gate-join-pedestal',
      prompt: 'Join Heaven',
      position: GATE_POSITIONS.joinPedestal,
      radius: 2.5,
      onInteract: () => {
        showNotice('Activating the Gate...')
        // Brief delay then trigger the cinematic
        setTimeout(() => triggerGateCinematic(), 600)
      },
    })

    const unregisterMonument = registerInteraction({
      id: 'gate-monument',
      prompt: 'Read the inscription',
      position: GATE_POSITIONS.gateMonument,
      radius: 3.0,
      onInteract: () =>
        showNotice(
          'The Celestial Gate — where exploration becomes belonging. Every journey through Heaven Society leads here.',
        ),
    })

    const unregisterViewpoint = registerInteraction({
      id: 'gate-viewpoint',
      prompt: 'Look out over Heaven',
      position: GATE_POSITIONS.viewpoint,
      radius: 2.5,
      onInteract: () =>
        showNotice(
          'The world stretches before you — every path, every connection, every moment. This is Heaven.',
        ),
    })

    return () => {
      unregisterJoin()
      unregisterMonument()
      unregisterViewpoint()
    }
  }, [])

  return <group />
}
