import { useEffect, useRef } from 'react'
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

  useEffect(() => {
    completeRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    const timeline = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onComplete: () => completeRef.current(),
    })
    timeline
      .fromTo(titleRef.current, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 1.1 }, 1.2)
      .to(titleRef.current, { autoAlpha: 0, y: -12, duration: 0.7 }, 4.4)
      .fromTo(subRef.current, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 5.4)
      .to(subRef.current, { autoAlpha: 0, y: -12, duration: 0.7 }, 8.4)
      .to(rootRef.current, { autoAlpha: 0, duration: 0.8 }, 9.2)
    return () => {
      timeline.kill()
    }
  }, [])

  return (
    <div className="cinema-overlay" ref={rootRef}>
      <div className="cinema-title" ref={titleRef}>
        HEAVEN SOCIETY
      </div>
      <div className="cinema-sub" ref={subRef}>
        THE ARRIVAL
      </div>
    </div>
  )
}