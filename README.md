# Heaven Society

An immersive, fully 3D, explorable web experience. Visitors walk through
locations representing parts of the Heaven Society server: the Arrival
(introduction), the Founder's Sanctum, the Society (community), the Worlds
(what you do here), and the Gate (joining).

**Status: Phase 1 — The Arrival is playable.** Spawn on the arrival path,
walk through the celestial settlement, read the arrival marker. The other
four locations remain architectural placeholders for their phases.

## Stack

- [Vite](https://vitejs.dev/) + React 19 + TypeScript (strict)
- [Three.js](https://threejs.org/) via [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) and [@react-three/drei](https://github.com/pmndrs/drei)
- [GSAP](https://gsap.com/) for transitions, the cinematic and overlays

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # typecheck + production build
npm run lint      # eslint
npm run preview   # serve the production build
```

## Playing

- The opening cinematic (~10s) flies over the settlement, then hands
  control to the player.
- **Click** the canvas to capture the mouse (pointer lock)
- **WASD / arrows** — move (relative to where you look)
- **Mouse** — orbit the third-person camera
- **Shift** — sprint
- **Esc** — release the mouse
- **E** — interact (read the arrival marker / plaza inscription)

Dev console hooks: `window.__HEAVEN__` exposes `transitionTo(id)`,
`replayCinematic()`, `showNotice(text)` and `player.teleport(x, z)` /
`player.getState()`.

## Architecture

Systems are isolated so one can be changed without rewriting the project.

```
src/
├── core/
│   ├── config/world.ts        World registry, spawn points, atmosphere,
│   │                          LOCATION_ATMOSPHERE (background + fog)
│   ├── engine/
│   │   ├── GameCanvas.tsx     The single R3F <Canvas>
│   │   ├── Experience.tsx     Root of the 3D scene graph (per-location
│   │   │                      background/fog, scene error boundary)
│   │   └── SceneBoundary.tsx  Canvas-root error boundary (scene failures
│   │                          can't take down the DOM UI)
│   └── types/world.ts         LocationId + LocationDefinition types
├── scenes/
│   ├── arrival/               THE ARRIVAL district (see below)
│   ├── DevelopmentScaffold.tsx  Debug ground for unbuilt locations
│   └── LocationRenderer.tsx   Maps location id → scene component + spawn
├── systems/
│   ├── audio/AudioProvider.tsx   Lazy Web Audio context + named sounds API
│   ├── audio/AmbientLayer.tsx    Procedural wind + water ambience
│   ├── camera/CameraRig.tsx      Third-person orbit follow camera
│   │                              (smooth, wall-clip prevention)
│   ├── cinematic/
│   │   ├── CinematicOverlay.tsx  Title cards (DOM, GSAP timeline)
│   │   └── CinematicCamera.tsx   In-canvas camera flight along a curve
│   ├── collision/CollisionWorld.ts  Lightweight 2D colliders + boundary
│   ├── interaction/
│   │   ├── interactionStore.ts    Cross-root registry (canvas ↔ DOM)
│   │   ├── InteractionProvider.tsx  DOM provider + E key handling
│   │   └── InteractionManager.tsx   Canvas proximity activation
│   ├── loading/LoadingOverlay.tsx  Global loading state (drei useProgress)
│   ├── player/
│   │   ├── PlayerContext.tsx   Mutable player state + teleport
│   │   ├── PlayerController.tsx  WASD + camera-relative movement + sprint
│   │   ├── CharacterRig.tsx    Procedural humanoid + walk cycle
│   │   ├── useKeyboard.ts      Key state ref (polled in useFrame)
│   │   ├── usePointerLock.ts   Click-to-lock / Esc-to-release
│   │   └── constants.ts        Movement/camera/collision tuning
│   ├── transitions/TransitionProvider.tsx  GSAP fade + active location id
│   └── ui/noticeStore.ts       Cross-root notice messages (E interactions)
├── ui/
│   ├── ErrorBoundary.tsx       App-level fallback screen
│   ├── HUD.tsx                 Location label, hint, interaction prompt
│   └── NoticeOverlay.tsx       World-integrated messages ("WELCOME TO…")
└── assets/                     models/ textures/ audio/ fonts/
```

### The Arrival district (`src/scenes/arrival/`)

- `data.ts` — layout data (trees, lamps, bushes, flowers, benches, …)
- `materials.ts` — shared PBR materials (stone, marble, gold, water, …)
- `colliders.ts` — static colliders + world boundary for this district
- `ArrivalScene.tsx` — composition + collider registration
- `ArrivalTerrain.tsx` / `ArrivalRoads.tsx` / `ArrivalArchitecture.tsx`
- `ArrivalGardens.tsx` / `ArrivalProps.tsx` / `ArrivalSpawn.tsx`
- `ArrivalLighting.tsx` / `ArrivalAtmosphere.tsx` (sky + clouds,
  fully procedural — zero network assets)
- `ArrivalInteractions.tsx` — arrival marker + plaza inscription

### How data flows

- `TransitionProvider` (DOM side) owns the active `locationId`; cinematic
  state lives in the App shell.
- R3F's `<Canvas>` is a **separate React root**, so `locationId` and
  `cinematic` are passed in as **props**, not context.
- `PlayerContext` (canvas side) holds a mutable `PlayerState` ref written
  every frame by `PlayerController` and read by `CameraRig` /
  `CharacterRig`.
- The interaction and notice stores are module-level observables so the
  canvas root (register/proximity) and DOM root (HUD/prompts/messages)
  can share state without context.
- `LocationRenderer` teleports the player to the location's spawn and
  mounts its scene; scenes register their colliders on mount.

## Adding a location (Phase 2+)

1. Add spawn + atmosphere to `src/core/config/world.ts` (already has the
   five location ids).
2. Create `src/scenes/<Location>/` with a `Scene.tsx` that registers its
   colliders and composes its district.
3. Map the id in `SCENES` in `src/scenes/LocationRenderer.tsx`.
4. Move between locations with `transitionTo(id)`.

## Roadmap

- **Phase 1 — The Arrival** ✅ playable: third-person player, collision,
  cinematic intro, first interactions, procedural sky/clouds/ambience.
- **Phase 2 — Founder's Sanctum** and **The Society**.
- **Phase 3 — The Worlds** and **The Gate** (join flow).

## Notes

- All art is procedural geometry + shared materials; no external assets
  are fetched at runtime (works offline). A final GLB character can
  replace `CharacterRig` without touching the controller or camera.
- Known limitation: pointer lock requires a real user gesture, so the
  embedded preview webview can't exercise WASD; it works in any normal
  browser tab.