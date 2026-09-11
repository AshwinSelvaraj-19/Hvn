import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useAnimations, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import type { Group } from 'three'
import soldierUrl from '@/assets/models/characters/Soldier.glb'
import { PLAYER } from './constants'
import { usePlayer } from './PlayerContext'

/** Preloaded once — Soldier.glb is stored locally in src/assets. */
useGLTF.preload(soldierUrl)

/** The Soldier model's rest pose faces +Z; the controller faces +Z too. */
const MODEL_YAW_OFFSET = 0

/**
 * The player character — a real animated human (locally stored GLB).
 *
 * Animation state machine driven purely by the shared player speed:
 *   idle  <-> walk <-> run, cross-faded over ~0.25s for natural
 *   transitions. The group tracks the player state (position + facing)
 *   every frame, so movement/collision stay exactly as the controller
 *   computes them.
 */
export function CharacterRig({ visible = true }: { visible?: boolean }) {
  const { stateRef } = usePlayer()
  const groupRef = useRef<Group>(null)
  const { scene, animations } = useGLTF(soldierUrl)

  const { actions, names } = useAnimations(animations, groupRef)

  // Clip discovery by name with graceful fallbacks.
  const clipNames = useMemo(() => {
    const find = (...candidates: string[]) =>
      candidates.find((c) => names.includes(c)) ?? names[0]
    return {
      idle: find('Idle', 'idle'),
      walk: find('Walk', 'walk'),
      run: find('Run', 'run'),
    }
  }, [names])

  const current = useRef<string>(clipNames.idle)

  // Play the idle loop from the start (subtle breathing) and stop
  // everything on unmount so fading back in works on re-mounts.
  useEffect(() => {
    actions[clipNames.idle]?.play()
    return () => {
      Object.values(actions).forEach((a) => a?.stop())
    }
  }, [actions, clipNames])

  useEffect(() => {
    scene.traverse((obj: THREE.Object3D) => {
      if (obj instanceof THREE.Mesh) {
        obj.castShadow = true
        obj.frustumCulled = true
        const mat = obj.material as THREE.MeshStandardMaterial | undefined
        if (mat) mat.depthWrite = true
      }
    })
  }, [scene])

  useFrame(() => {
    const s = stateRef.current
    if (!groupRef.current) return

    groupRef.current.position.set(s.position.x, s.position.y, s.position.z)
    groupRef.current.rotation.y = s.facing + MODEL_YAW_OFFSET

    // Skip animation blending while the cinematic owns the frame.
    if (!visible) return

    const speed = s.speed
    const walking = speed > 0.2
    const running = speed > PLAYER.walkSpeed + 0.4

    let target = clipNames.idle
    if (running) target = clipNames.run
    else if (walking) target = clipNames.walk

    if (current.current !== target) {
      const from = actions[current.current]
      const to = actions[target]
      if (from && to) {
        to.reset().fadeIn(0.25).play()
        from.fadeOut(0.25)
        current.current = target
      }
    }
  })

  return (
    <group ref={groupRef} visible={visible}>
      {scene ? <primitive object={scene} /> : null}
    </group>
  )
}
