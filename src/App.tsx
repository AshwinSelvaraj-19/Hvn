import { useEffect, useState, useSyncExternalStore } from 'react'

import { showNotice } from '@/systems/ui/noticeStore'

import { GameCanvas } from '@/core/engine/GameCanvas'
import { AmbientLayer } from '@/systems/audio/AmbientLayer'
import { AudioProvider } from '@/systems/audio/AudioProvider'
import { CinematicOverlay } from '@/systems/cinematic/CinematicOverlay'
import {
  subscribeGateCinematic,
  getGateCinematicActive,
} from '@/systems/cinematic/gateCinematicStore'
import { InteractionProvider } from '@/systems/interaction/InteractionProvider'
import { LoadingOverlay } from '@/systems/loading/LoadingOverlay'
import { TransitionProvider, useTransition } from '@/systems/transitions/TransitionProvider'
import { ErrorBoundary } from '@/ui/ErrorBoundary'
import { GateOverlay } from '@/ui/GateOverlay'
import { HUD } from '@/ui/HUD'
import { NoticeOverlay } from '@/ui/NoticeOverlay'

export default function App() {
  return (
    <ErrorBoundary>
      <AudioProvider>
        <InteractionProvider>
          <TransitionProvider>
            <ExperienceShell />
          </TransitionProvider>
        </InteractionProvider>
      </AudioProvider>
    </ErrorBoundary>
  )
}

/**
 * Reads the active location (DOM side) and feeds it into the canvas,
 * which is a separate React root and cannot receive context.
 */
function ExperienceShell() {
  const { locationId, transitionTo } = useTransition()
  const [cinematic, setCinematic] = useState(true)
  const gateCinematic = useSyncExternalStore(subscribeGateCinematic, getGateCinematicActive)
  const playerDisabled = cinematic || gateCinematic

  // Dev/testing hooks: transitionTo, replayCinematic and showNotice
  // exercise the scene transition, cinematic and interaction-notice
  // systems from the console.
  useEffect(() => {
    const w = window as unknown as { __HEAVEN__?: Record<string, unknown> }
    w.__HEAVEN__ = {
      ...(w.__HEAVEN__ ?? {}),
      transitionTo,
      replayCinematic: () => setCinematic(true),
      showNotice,
    }
  }, [transitionTo])

  return (
    <>
      <GameCanvas locationId={locationId} cinematic={cinematic} gateCinematic={gateCinematic} />
      <HUD hidden={playerDisabled} />
      <NoticeOverlay />
      {/* Keyed so replayCinematic() remounts and re-runs the sequence. */}
      <CinematicOverlay
        key={cinematic ? 'playing' : 'done'}
        onComplete={() => setCinematic(false)}
      />
      <GateOverlay />
      <LoadingOverlay />
      <AmbientLayer />
    </>
  )
}