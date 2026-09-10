import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'

import { PLAYER } from './constants'

/**
 * Manages the browser pointer lock on the canvas: click to lock (hide
 * cursor + capture mouse), Esc to unlock. Returns a ref that is true
 * while the pointer is locked.
 */
export function usePointerLock() {
  const { gl } = useThree()
  const locked = useRef(false)

  useEffect(() => {
    const canvas = gl.domElement
    let lastExitAt = 0

    const requestLock = () => {
      // Browsers throw if re-locking too soon after an exit (e.g. Esc).
      if (document.pointerLockElement || Date.now() - lastExitAt < PLAYER.relockCooldownMs) {
        return
      }
      try {
        canvas.requestPointerLock()
      } catch {
        // Ignore transient lock failures; the user can click again.
      }
    }

    const onChange = () => {
      locked.current = document.pointerLockElement === canvas
      if (!locked.current) {
        lastExitAt = Date.now()
      }
    }

    canvas.addEventListener('click', requestLock)
    document.addEventListener('pointerlockchange', onChange)
    document.addEventListener('pointerlockerror', onChange)
    return () => {
      canvas.removeEventListener('click', requestLock)
      document.removeEventListener('pointerlockchange', onChange)
      document.removeEventListener('pointerlockerror', onChange)
    }
  }, [gl])

  return locked
}