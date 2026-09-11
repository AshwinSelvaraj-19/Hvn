import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface CinematicOverlayProps {
  /** Called when the sequence ends and control passes to the player. */
  onComplete: () => void
}

/**
 * Opening cinematic: title cards over the cinematic camera flight.
 *
 * Sequence (~10s total):
 *   1.2s  "HEAVEN SOCIETY" fades in
 *   4.4s  fades out
 *   5.4s  "THE ARRIVAL" fades in
 *   8.4s  fades out
 *   9.2s  overlay fades away -> onComplete hands control to the player
 */
export function CinematicOverlay({ onComplete }: CinematicOverlayProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const completeRef = useRef(onComplete)
  const completedGuardRef = useRef(false)
  const [showSkip, setShowSkip] = useState(false)

  useEffect(() => {
    completeRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    completedGuardRef.current = false

    const showTimer = setTimeout(() => setShowSkip(true), 2000)
    const hideTimer = setTimeout(() => setShowSkip(false), 8500)

    const timeline = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onComplete: () => {
        if (completedGuardRef.current) return
        completedGuardRef.current = true
        completeRef.current()
      },
    })
    timeline
      .fromTo(titleRef.current, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 1.1 }, 1.2)
      .to(titleRef.current, { autoAlpha: 0, y: -12, duration: 0.7 }, 4.4)
      .fromTo(subRef.current, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 5.4)
      .to(subRef.current, { autoAlpha: 0, y: -12, duration: 0.7 }, 8.4)
      .to(rootRef.current, { autoAlpha: 0, duration: 0.8 }, 9.2)
    return () => {
      timeline.kill()
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  const handleSkip = useCallback(() => {
    if (completedGuardRef.current) return
    completedGuardRef.current = true
    gsap.killTweensOf(rootRef.current)
    gsap.killTweensOf(titleRef.current)
    gsap.killTweensOf(subRef.current)
    gsap.set([rootRef.current, titleRef.current, subRef.current], { autoAlpha: 0 })
    completeRef.current()
  }, [])

  return (
    <div className="cinema-overlay" ref={rootRef} style={{ pointerEvents: showSkip ? 'auto' : 'none' }}>
      <div className="cinema-title" ref={titleRef}>
        HEAVEN SOCIETY
      </div>
      <div className="cinema-sub" ref={subRef}>
        THE ARRIVAL
      </div>
      {showSkip && (
        <button
          onClick={handleSkip}
          style={{
            position: 'absolute',
            bottom: '5vh',
            right: '5vw',
            background: 'none',
            border: '1px solid rgba(255,255,255,0.3)',
            color: 'rgba(255,255,255,0.6)',
            padding: '8px 20px',
            fontSize: '12px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            borderRadius: '4px',
            transition: 'border-color 0.3s, color 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'
            e.currentTarget.style.color = 'rgba(255,255,255,0.9)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
            e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
          }}
        >
          Skip Intro
        </button>
      )}
    </div>
  )
}