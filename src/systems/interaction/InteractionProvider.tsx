import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from 'react'

import {
  getActiveInteraction,
  registerInteraction,
  subscribeInteractions,
} from './interactionStore'
import type { InteractionTarget } from './interactionStore'

export interface InteractionContextValue {
  /** The currently active interaction prompt (null = none). */
  active: InteractionTarget | null
  /** Register an interactable; returns an unregister function. */
  register: (target: InteractionTarget) => () => void
}

const InteractionContext = createContext<InteractionContextValue | null>(null)

/**
 * DOM-side interaction provider.
 *
 * The registry + active prompt live in `interactionStore` (shared with
 * the canvas root). This provider exposes them through context for DOM
 * components and owns the global interaction key (E), which only fires
 * while the pointer is locked.
 */
export function InteractionProvider({ children }: { children: React.ReactNode }) {
  const active = useSyncExternalStore(subscribeInteractions, getActiveInteraction)

  const register = useCallback((target: InteractionTarget) => registerInteraction(target), [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code !== 'KeyE') return
      if (!document.pointerLockElement) return
      getActiveInteraction()?.onInteract()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const value = useMemo<InteractionContextValue>(() => ({ active, register }), [active, register])

  return <InteractionContext.Provider value={value}>{children}</InteractionContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useInteraction(): InteractionContextValue {
  const ctx = useContext(InteractionContext)
  if (!ctx) {
    throw new Error('useInteraction must be used inside <InteractionProvider>')
  }
  return ctx
}