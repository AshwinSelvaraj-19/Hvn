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

interface ExperienceProps {
  locationId: LocationId
  /** True while the opening cinematic owns the camera and input. */
  cinematic: boolean
  /** True while the Gate final cinematic owns the camera and input. */
  gateCinematic?: boolean
}

/**
 * Root of the 3D scene graph.
 *
 * Background + fog are attached here (direct children of the scene
 * root), driven per location from the world config. NOTE: `attach` on
 * nested elements targets their nearest parent object, so scenes must
 * not try to set scene-level state themselves.
 *
 * The scene-level ErrorBoundary keeps a location failure from taking
 * down the DOM UI (loading, HUD, transitions all keep working).
 */
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
          <CharacterRig />
          <InteractionManager />
          <CinematicCamera active={cinematic} />
          <GateCinematicCamera active={gateCinematic} />
          <LocationRenderer locationId={locationId} />
        </SceneBoundary>
      </PlayerProvider>
    </>
  )
}