import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'

import { DEFAULT_LOCATION, getLocationDefinition } from '@/core/config/world'
import type { LocationDefinition, LocationId } from '@/core/types/world'

export interface TransitionContextValue {
  /** The location currently being visited. */
  locationId: LocationId
  /** Metadata for the current location. */
  definition: LocationDefinition
  /** True while the fade overlay is animating. */
  isTransitioning: boolean
  /** Fade out, swap the location, fade back in. */
  transitionTo: (next: LocationId) => void
}

const TransitionContext = createContext<TransitionContextValue | null>(null)

const FADE_DURATION = 0.45

/**
 * Scene-transition system. Holds the active location id and animates a
 * full-screen fade (GSAP) around swaps. The 3D side reacts to
 * `locationId` via the LocationRenderer, which teleports the player and
 * mounts the new location's scene.
 */
export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [locationId, setLocationId] = useState<LocationId>(DEFAULT_LOCATION)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const transitioningRef = useRef(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  const transitionTo = useCallback(
    (next: LocationId) => {
      if (next === locationId || transitioningRef.current) return
      transitioningRef.current = true
      setIsTransitioning(true)
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: FADE_DURATION,
        ease: 'power2.inOut',
        onComplete: () => {
          setLocationId(next)
          gsap.to(overlayRef.current, {
            opacity: 0,
            duration: FADE_DURATION,
            delay: 0.05,
            ease: 'power2.inOut',
            onComplete: () => {
              transitioningRef.current = false
              setIsTransitioning(false)
            },
          })
        },
      })
    },
    [locationId],
  )

  const definition = useMemo(() => getLocationDefinition(locationId), [locationId])

  const value = useMemo<TransitionContextValue>(
    () => ({ locationId, definition, isTransitioning, transitionTo }),
    [locationId, definition, isTransitioning, transitionTo],
  )

  return (
    <TransitionContext.Provider value={value}>
      {children}
      {/* Fade layer lives on top of everything (HUD included). */}
      <div
        className="transition-overlay"
        ref={overlayRef}
        aria-hidden="true"
        data-transitioning={isTransitioning}
      />
    </TransitionContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTransition(): TransitionContextValue {
  const ctx = useContext(TransitionContext)
  if (!ctx) {
    throw new Error('useTransition must be used inside <TransitionProvider>')
  }
  return ctx
}