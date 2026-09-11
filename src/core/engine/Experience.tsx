import { Component, type ReactNode } from 'react'
import { type ErrorInfo } from 'react'
import { Object3D } from 'three'

import { LOCATION_ATMOSPHERE } from '@/core/config/world'
import type { LocationId } from '@/core/types/world'
import { LocationRenderer } from '@/scenes/LocationRenderer'
import { CameraRig } from '@/systems/camera/CameraRig'
import { CinematicCamera } from '@/systems/cinematic/CinematicCamera'
import { GateCinematicCamera } from '@/systems/cinematic/GateCinematicCamera'
import { InteractionManager } from '@/systems/interaction/InteractionManager'
import { CharacterRig } from '@/systems/player/CharacterRig'
import { PlayerController } from '@/systems/player/PlayerController'
import { PlayerProvider } from '@/systems/player/PlayerContext'
import { SceneBoundary } from './SceneBoundary'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const origAdd: any = Object3D.prototype.add
// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (!(Object3D.prototype as any).__patched) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(Object3D.prototype as any).__patched = true
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Object3D.prototype.add = function patchedAdd(this: Object3D, ...args: any[]) {
    for (let i = 0; i < args.length; i++) {
      if (args[i] === null || args[i] === undefined) {
        console.error(
          `[SceneDiag] null/undefined being added to "${this.type || this.constructor.name}" uuid=${this.uuid}`,
          { args, stack: new Error().stack?.split('\n').slice(1, 8).join('\n') }
        )
      }
    }
    return origAdd.apply(this, args)
  }
}

class CharacterBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[CharacterBoundary] CharacterRig failed:', error.message, info.componentStack)
  }
  render() { return this.state.hasError ? null : this.props.children }
}

interface ExperienceProps {
  locationId: LocationId
  cinematic: boolean
  gateCinematic?: boolean
}

export function Experience({ locationId, cinematic, gateCinematic = false }: ExperienceProps) {
  const atmosphere = LOCATION_ATMOSPHERE[locationId]
  const playerDisabled = cinematic || gateCinematic

  return (
    <>
      <color attach="background" args={[atmosphere.background]} />
      <fog attach="fog" args={atmosphere.fog} />

      <PlayerProvider>
        <SceneBoundary>
            <PlayerController enabled={!playerDisabled} />
            <CameraRig enabled={!playerDisabled} />
            <CharacterBoundary>
              <CharacterRig />
            </CharacterBoundary>
            <InteractionManager />
          <CinematicCamera active={cinematic} />
          <GateCinematicCamera active={gateCinematic} />
          <LocationRenderer locationId={locationId} />
        </SceneBoundary>
      </PlayerProvider>
    </>
  )
}
