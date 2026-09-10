import { useEffect } from 'react'

import { SOCIETY_POSITIONS } from './data'
import { registerInteraction } from '@/systems/interaction/interactionStore'
import { showNotice } from '@/systems/ui/noticeStore'

/**
 * The Society interactables:
 * - Community Notice Board
 * - Community Hall
 * - Wall of Souls
 * - Event Stage
 *
 * Each uses the existing interaction + notice system.
 */
export function SocietyInteractions() {
  useEffect(() => {
    const unregisterNotice = registerInteraction({
      id: 'society-notice-board',
      prompt: 'Read the notice board',
      position: SOCIETY_POSITIONS.noticeBoard,
      radius: 2.0,
      onInteract: () =>
        showNotice(
          'Upcoming community activities will appear here. Events, gatherings, and celebrations — all happening in The Society.',
        ),
    })

    const unregisterHall = registerInteraction({
      id: 'society-community-hall',
      prompt: 'Enter the community hall',
      position: SOCIETY_POSITIONS.communityHall,
      radius: 2.5,
      onInteract: () =>
        showNotice(
          'This is where the Society comes together — meetings, celebrations, and shared moments.',
        ),
    })

    const unregisterWall = registerInteraction({
      id: 'society-member-wall',
      prompt: 'Read the Wall of Souls',
      position: SOCIETY_POSITIONS.memberWall,
      radius: 3.0,
      onInteract: () =>
        showNotice(
          'Every member contributes to the story of Heaven Society. The Wall of Souls honors those who belong.',
        ),
    })

    const unregisterStage = registerInteraction({
      id: 'society-event-stage',
      prompt: 'Examine the stage',
      position: SOCIETY_POSITIONS.eventStage,
      radius: 2.5,
      onInteract: () =>
        showNotice(
          'Events, celebrations, and community moments happen here. The stage awaits its next gathering.',
        ),
    })

    return () => {
      unregisterNotice()
      unregisterHall()
      unregisterWall()
      unregisterStage()
    }
  }, [])

  return <group />
}
