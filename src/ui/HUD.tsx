import { useEffect, useState } from 'react'

import { useInteraction } from '@/systems/interaction/InteractionProvider'
import { useTransition } from '@/systems/transitions/TransitionProvider'

interface HUDProps {
  /** Hidden while the opening cinematic is playing. */
  hidden?: boolean
}

/**
 * Minimal heads-up display for third-person exploration: a small
 * location label, a first-session control hint, and the active
 * interaction prompt. No website UI.
 */
export function HUD({ hidden = false }: HUDProps) {
  const { definition } = useTransition()
  const { active } = useInteraction()
  const [locked, setLocked] = useState(false)

  useEffect(() => {
    const onChange = () => setLocked(document.pointerLockElement !== null)
    document.addEventListener('pointerlockchange', onChange)
    return () => document.removeEventListener('pointerlockchange', onChange)
  }, [])

  if (hidden) return null

  return (
    <div className="hud">
      <div className="hud-location">{definition.name}</div>

      {!locked && <div className="hud-hint">Click to explore · WASD to move · Mouse to look · Shift to sprint</div>}

      {active && (
        <div className="hud-prompt">
          <span className="hud-prompt-key">E</span>
          {active.prompt}
        </div>
      )}
    </div>
  )
}