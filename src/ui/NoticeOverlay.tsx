import { useEffect, useRef, useSyncExternalStore } from 'react'
import gsap from 'gsap'

import { clearNotice, getNotice, subscribeNotice } from '@/systems/ui/noticeStore'

const NOTICE_DURATION_MS = 4200

/**
 * Displays world-integrated messages (e.g. "WELCOME TO HEAVEN
 * SOCIETY") triggered by interactions. Subscribes to the notice store
 * so interactables inside the canvas root can trigger it.
 */
export function NoticeOverlay() {
  const notice = useSyncExternalStore(subscribeNotice, getNotice)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    if (notice) {
      gsap.to(ref.current, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' })
      const timer = setTimeout(clearNotice, NOTICE_DURATION_MS)
      return () => clearTimeout(timer)
    }
    gsap.to(ref.current, { autoAlpha: 0, y: 10, duration: 0.4, ease: 'power2.in' })
  }, [notice])

  return (
    <div className="notice-overlay" ref={ref} aria-hidden={notice === null}>
      {notice}
    </div>
  )
}