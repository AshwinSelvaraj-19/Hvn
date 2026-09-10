/**
 * Gate cinematic observable — bridges canvas root and DOM root.
 *
 * When the player activates the Join Heaven pedestal, this store
 * triggers the cinematic sequence. The canvas-side GateCinematicCamera
 * and the DOM-side GateOverlay both subscribe to this.
 */

type Listener = () => void

const listeners = new Set<Listener>()
let active = false
let completed = false

function emit(): void {
  for (const listener of listeners) listener()
}

/** Trigger the Gate cinematic (called from canvas interaction). */
export function triggerGateCinematic(): void {
  if (active || completed) return
  active = true
  emit()
}

/** Mark the cinematic as complete (called from DOM overlay). */
export function completeGateCinematic(): void {
  active = false
  completed = true
  emit()
}

/** Reset the cinematic state (for replay/testing). */
export function resetGateCinematic(): void {
  active = false
  completed = false
  emit()
}

export function getGateCinematicActive(): boolean {
  return active
}

export function getGateCinematicCompleted(): boolean {
  return completed
}

export function subscribeGateCinematic(listener: Listener): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
