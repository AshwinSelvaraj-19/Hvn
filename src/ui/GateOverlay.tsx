import { useEffect, useRef, useSyncExternalStore, useCallback } from 'react'
import gsap from 'gsap'

import {
  subscribeGateCinematic,
  getGateCinematicActive,
  completeGateCinematic,
} from '@/systems/cinematic/gateCinematicStore'
import { GATE_MESSAGE, DISCORD_INVITE_URL } from '@/scenes/gate/data'

/**
 * Final join presentation overlay.
 *
 * Shows when the Gate cinematic activates:
 * 1. "HEAVEN SOCIETY" fades in
 * 2. "JOIN HEAVEN" fades in
 * 3. Description text fades in
 * 4. "JOIN DISCORD" button appears
 *
 * Player can dismiss with Escape or click outside to return to exploration.
 */
export function GateOverlay() {
  const active = useSyncExternalStore(subscribeGateCinematic, getGateCinematicActive)
  const rootRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  const dismissOverlay = useCallback(() => {
    if (!rootRef.current) {
      completeGateCinematic()
      return
    }
    const tl = gsap.timeline({
      onComplete: () => completeGateCinematic(),
    })
    tl.to(rootRef.current, { autoAlpha: 0, duration: 0.5, ease: 'power2.in' })
  }, [])

  useEffect(() => {
    if (!active || !rootRef.current) return

    // Kill any existing timeline
    timelineRef.current?.kill()

    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
    })

    // Show the overlay container
    tl.fromTo(rootRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 })

    // Title: "HEAVEN SOCIETY"
    tl.fromTo(
      titleRef.current,
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 1.0 },
      1.5,
    )

    // Subtitle: "JOIN HEAVEN"
    tl.fromTo(
      subtitleRef.current,
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 0.9 },
      3.0,
    )

    // Description
    tl.fromTo(
      descRef.current,
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.8 },
      4.5,
    )

    // CTA button
    tl.fromTo(
      ctaRef.current,
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.7 },
      6.0,
    )

    timelineRef.current = tl

    return () => {
      tl.kill()
    }
  }, [active])

  // Escape key dismisses the overlay
  useEffect(() => {
    if (!active) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        dismissOverlay()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active, dismissOverlay])

  if (!active) return null

  return (
    <div className="gate-overlay" ref={rootRef}>
      <div className="gate-overlay-content">
        <div className="gate-title" ref={titleRef}>
          {GATE_MESSAGE.title}
        </div>
        <div className="gate-subtitle" ref={subtitleRef}>
          {GATE_MESSAGE.subtitle}
        </div>
        <div className="gate-description" ref={descRef}>
          {GATE_MESSAGE.description}
        </div>
        <a
          className="gate-cta"
          ref={ctaRef}
          href={DISCORD_INVITE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          JOIN DISCORD
        </a>
        <div className="gate-dismiss">Press Escape to continue exploring</div>
      </div>
    </div>
  )
}
