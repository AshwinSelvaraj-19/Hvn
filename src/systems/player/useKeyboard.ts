import { useEffect, useRef } from 'react'

/**
 * Tracks pressed keys in a ref (no re-renders) so it can be polled
 * inside useFrame. Keyed by KeyboardEvent.code, which is layout
 * independent ("KeyW", "ShiftLeft", ...).
 */
export function useKeyboard() {
  const keys = useRef<Record<string, boolean>>({})

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      keys.current[event.code] = true
    }
    const onKeyUp = (event: KeyboardEvent) => {
      keys.current[event.code] = false
    }
    const onBlur = () => {
      keys.current = {}
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', onBlur)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', onBlur)
    }
  }, [])

  return keys
}