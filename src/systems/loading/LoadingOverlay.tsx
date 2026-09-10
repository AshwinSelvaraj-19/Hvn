import { useEffect, useRef, useState } from 'react'
import { useProgress } from '@react-three/drei'
import gsap from 'gsap'

const MIN_VISIBLE_MS = 600

/**
 * Full-screen loading state that fades out once the asset pipeline is
 * idle. Uses drei's global progress store, so any future useLoader /
 * useGLTF / useTexture work is picked up automatically.
 */
export function LoadingOverlay() {
  const { active, progress, total } = useProgress()
  const [visible, setVisible] = useState(true)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // total === 0 covers Phase 0, where nothing is loading yet.
    if (active || (progress < 100 && total > 0)) return
    const timer = setTimeout(() => {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => setVisible(false),
      })
    }, MIN_VISIBLE_MS)
    return () => clearTimeout(timer)
  }, [active, progress, total])

  if (!visible) return null

  return (
    <div className="loading-overlay" ref={overlayRef} aria-hidden={false}>
      <div className="loading-spinner" />
      <div className="loading-label">Heaven Society</div>
      <div className="loading-sub">{total > 0 ? `Loading ${Math.round(progress)}%` : 'Entering…'}</div>
    </div>
  )
}