import { useEffect } from 'react'

import { WORLDS_POSITIONS } from './data'
import { registerInteraction } from '@/systems/interaction/interactionStore'
import { showNotice } from '@/systems/ui/noticeStore'

/**
 * The Worlds interactables:
 * - Gaming Hall
 * - Event Arena
 * - Voice / Social Lounge
 * - Trophy Gallery
 * - Activity Monument
 *
 * Each uses the existing interaction + notice system.
 */
export function WorldsInteractions() {
  useEffect(() => {
    const unregisterGaming = registerInteraction({
      id: 'worlds-gaming-hall',
      prompt: 'Enter the Gaming Hall',
      position: WORLDS_POSITIONS.gamingHall,
      radius: 3.0,
      onInteract: () =>
        showNotice(
          'The Gaming Hall — where friendly competitions bring members together. Every game is an opportunity to connect.',
        ),
    })

    const unregisterArena = registerInteraction({
      id: 'worlds-event-arena',
      prompt: 'Enter the Event Arena',
      position: WORLDS_POSITIONS.eventArena,
      radius: 3.5,
      onInteract: () =>
        showNotice(
          'The Event Arena — the largest space for celebrations, tournaments, and community moments. The stage awaits its next gathering.',
        ),
    })

    const unregisterVoice = registerInteraction({
      id: 'worlds-voice-lounge',
      prompt: 'Enter the Voice Lounge',
      position: WORLDS_POSITIONS.voiceLounge,
      radius: 2.5,
      onInteract: () =>
        showNotice(
          'The Voice Lounge — a calmer space for conversation and real-time connections. Sit, talk, and build bonds.',
        ),
    })

    const unregisterTrophy = registerInteraction({
      id: 'worlds-trophy-gallery',
      prompt: 'Visit the Trophy Gallery',
      position: WORLDS_POSITIONS.trophyGallery,
      radius: 2.5,
      onInteract: () =>
        showNotice(
          'The Trophy Gallery — honoring achievement and competition. Every trophy tells a story of dedication and skill.',
        ),
    })

    const unregisterMonument = registerInteraction({
      id: 'worlds-activity-monument',
      prompt: 'Examine the monument',
      position: WORLDS_POSITIONS.activityMonument,
      radius: 2.0,
      onInteract: () =>
        showNotice(
          'The central monument — a symbol of the activity and connection that defines The Worlds. Gaming, events, voice, and competition all meet here.',
        ),
    })

    return () => {
      unregisterGaming()
      unregisterArena()
      unregisterVoice()
      unregisterTrophy()
      unregisterMonument()
    }
  }, [])

  return <group />
}
