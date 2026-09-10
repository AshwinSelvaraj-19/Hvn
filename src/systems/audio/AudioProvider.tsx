import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react'

export interface AudioApi {
  /** Create/resume the AudioContext (browsers require a user gesture). */
  unlock: () => void
  /** Access the raw context (used by the procedural ambient layer). */
  getContext: () => AudioContext | null
  /** Register a decoded buffer so `play` can find it by name. */
  registerBuffer: (name: string, buffer: AudioBuffer) => void
  /** Play a named sound. No-op until a buffer is registered for it. */
  play: (name: string, options?: { loop?: boolean; volume?: number }) => void
  /** Stop a currently playing named sound. */
  stop: (name: string) => void
  /** Master volume, 0..1. */
  setMasterVolume: (volume: number) => void
}

const AudioContextValue = createContext<AudioApi | null>(null)

type AudioCtor = typeof AudioContext

/**
 * Thin Web Audio wrapper.
 *
 * Keeps one lazily created AudioContext + master gain. Real sound files
 * (loaded in later phases) register their buffers via `registerBuffer`
 * and play by name; the procedural ambient layer uses `getContext` to
 * build its own loops. Nothing here needs to change when audio ships.
 */
export function AudioProvider({ children }: { children: React.ReactNode }) {
  const ctxRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const buffersRef = useRef(new Map<string, AudioBuffer>())
  const sourcesRef = useRef(new Map<string, AudioBufferSourceNode>())

  const ensure = useCallback((): AudioContext | null => {
    if (!ctxRef.current) {
      const Ctor: AudioCtor | undefined =
        window.AudioContext ?? (window as { webkitAudioContext?: AudioCtor }).webkitAudioContext
      if (!Ctor) return null
      const ctx = new Ctor()
      const master = ctx.createGain()
      master.gain.value = 0.8
      master.connect(ctx.destination)
      ctxRef.current = ctx
      masterRef.current = master
    }
    if (ctxRef.current.state === 'suspended') {
      void ctxRef.current.resume()
    }
    return ctxRef.current
  }, [])

  const unlock = useCallback(() => {
    ensure()
  }, [ensure])

  const getContext = useCallback(() => ctxRef.current, [])

  // Browsers block audio until a user gesture; unlock on first click.
  useEffect(() => {
    const onGesture = () => unlock()
    window.addEventListener('pointerdown', onGesture)
    return () => window.removeEventListener('pointerdown', onGesture)
  }, [unlock])

  const registerBuffer = useCallback((name: string, buffer: AudioBuffer) => {
    buffersRef.current.set(name, buffer)
  }, [])

  const play = useCallback(
    (name: string, options?: { loop?: boolean; volume?: number }) => {
      const ctx = ensure()
      const master = masterRef.current
      const buffer = buffersRef.current.get(name)
      if (!ctx || !master || !buffer) return // no buffer registered yet
      const source = ctx.createBufferSource()
      source.buffer = buffer
      source.loop = options?.loop ?? false
      const gain = ctx.createGain()
      gain.gain.value = options?.volume ?? 1
      source.connect(gain).connect(master)
      source.start()
      sourcesRef.current.set(name, source)
    },
    [ensure],
  )

  const stop = useCallback((name: string) => {
    sourcesRef.current.get(name)?.stop()
    sourcesRef.current.delete(name)
  }, [])

  const setMasterVolume = useCallback((volume: number) => {
    if (masterRef.current) {
      masterRef.current.gain.value = volume
    }
  }, [])

  const value = useMemo<AudioApi>(
    () => ({ unlock, getContext, registerBuffer, play, stop, setMasterVolume }),
    [unlock, getContext, registerBuffer, play, stop, setMasterVolume],
  )

  return <AudioContextValue.Provider value={value}>{children}</AudioContextValue.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAudio(): AudioApi {
  const ctx = useContext(AudioContextValue)
  if (!ctx) {
    throw new Error('useAudio must be used inside <AudioProvider>')
  }
  return ctx
}