/**
 * Cross-root interaction store.
 *
 * R3F's <Canvas> is a separate React root, so the 3D scene (which
 * registers interactables and computes proximity) and the DOM HUD (which
 * renders the prompt) share state through this tiny observable module
 * instead of React context.
 */

export interface InteractionTarget {
  /** Unique id so late-registering systems can overwrite cleanly. */
  id: string
  /** Short label shown in the HUD, e.g. "Read the arrival marker". */
  prompt: string
  /** Called when the player presses the interaction key (E). */
  onInteract: () => void
  /** World position + radius for proximity activation. Targets without
   *  a position are considered always active once registered. */
  position?: { x: number; z: number }
  radius?: number
}

type Listener = () => void

const registry = new Map<string, InteractionTarget>()
const listeners = new Set<Listener>()
let active: InteractionTarget | null = null

function emit(): void {
  for (const listener of listeners) listener()
}

/** Register an interactable; returns an unregister function. */
export function registerInteraction(target: InteractionTarget): () => void {
  registry.set(target.id, target)
  if (!target.position) setActiveInteraction(target)
  return () => {
    registry.delete(target.id)
    if (active?.id === target.id) setActiveInteraction(null)
  }
}

/** Set the active prompt (used by the canvas-side proximity manager). */
export function setActiveInteraction(target: InteractionTarget | null): void {
  if (active !== target) {
    active = target
    emit()
  }
}

export function getActiveInteraction(): InteractionTarget | null {
  return active
}

export function getInteractions(): Iterable<InteractionTarget> {
  return registry.values()
}

export function subscribeInteractions(listener: Listener): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}