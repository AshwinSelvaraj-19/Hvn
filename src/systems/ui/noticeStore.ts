/**
 * Tiny observable for world-integrated notice messages (e.g. the
 * "WELCOME TO HEAVEN SOCIETY" text shown after the first interaction).
 *
 * Lives outside React so interactables inside the canvas root can
 * trigger a DOM overlay without context crossing.
 */

type Listener = () => void

const listeners = new Set<Listener>()
let notice: string | null = null

function emit(): void {
  for (const listener of listeners) listener()
}

export function showNotice(text: string): void {
  notice = text
  emit()
}

export function clearNotice(): void {
  if (notice !== null) {
    notice = null
    emit()
  }
}

export function getNotice(): string | null {
  return notice
}

export function subscribeNotice(listener: Listener): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}