import { useEffect, useRef } from 'react'

import { useAudio } from './AudioProvider'

const SAMPLE_RATE = 22050
const LOOP_SECONDS = 4

/** Generate a loop of filtered noise shaped to sound like soft wind. */
function makeWindBuffer(ctx: AudioContext): AudioBuffer {
  const length = LOOP_SECONDS * SAMPLE_RATE
  const buffer = ctx.createBuffer(1, length, SAMPLE_RATE)
  const data = buffer.getChannelData(0)

  let last = 0
  const alpha = 0.035 // heavy low-pass -> deep, smooth wind body
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1
    last = last + alpha * (white - last)
    // Slow gust envelope over the loop.
    const gust = 0.55 + 0.45 * Math.sin((i / SAMPLE_RATE) * Math.PI * 2 * 0.18)
    data[i] = last * gust * 0.6
  }
  return buffer
}

/** Generate a brighter, shimmering loop that reads as distant water. */
function makeWaterBuffer(ctx: AudioContext): AudioBuffer {
  const length = LOOP_SECONDS * SAMPLE_RATE
  const buffer = ctx.createBuffer(1, length, SAMPLE_RATE)
  const data = buffer.getChannelData(0)

  let last = 0
  const alpha = 0.25 // lighter filtering -> soft ripple texture
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1
    last = last + alpha * (white - last)
    const shimmer = 0.7 + 0.3 * Math.sin((i / SAMPLE_RATE) * Math.PI * 2 * 0.7)
    data[i] = (last - white * 0.08) * shimmer * 0.35
  }
  return buffer
}

/**
 * Minimal procedural ambient bed: soft wind + distant water.
 *
 * Starts after the first user gesture (browser autoplay policy).
 * Phase 7 can replace these loops with recorded ambience through the
 * same registerBuffer/play API — this component is just the fallback.
 */
export function AmbientLayer() {
  const { getContext, registerBuffer, play } = useAudio()
  const startedRef = useRef(false)

  useEffect(() => {
    const start = () => {
      if (startedRef.current) return
      startedRef.current = true
      const ctx = getContext()
      if (!ctx) return
      registerBuffer('ambient-wind', makeWindBuffer(ctx))
      registerBuffer('ambient-water', makeWaterBuffer(ctx))
      play('ambient-wind', { loop: true, volume: 0.16 })
      play('ambient-water', { loop: true, volume: 0.05 })
    }

    window.addEventListener('pointerdown', start)
    return () => window.removeEventListener('pointerdown', start)
  }, [getContext, play, registerBuffer])

  return null
}