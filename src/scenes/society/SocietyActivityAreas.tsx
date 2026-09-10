import { gold, marble, stoneTrim, wood, woodDark } from './materials'

/**
 * Social / Activity Areas — spaces suggesting community activities.
 *
 * Conversation Garden, Games Area, Event Stage.
 */
export function SocietyActivityAreas() {
  return (
    <group>
      <ConversationGarden />
      <GamesArea />
      <EventStage />
    </group>
  )
}

/** Conversation Garden — quiet circular seating area. */
function ConversationGarden() {
  return (
    <group position={[16, 0, 6]}>
      {/* Circular paving */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.01, 0]} receiveShadow material={stoneTrim}>
        <circleGeometry args={[3, 24]} />
      </mesh>

      {/* Circular bench */}
      <mesh position={[0, 0.35, 0]} castShadow material={wood}>
        <torusGeometry args={[2.0, 0.2, 8, 24]} />
      </mesh>
      <mesh position={[0, 0.55, 0]} castShadow material={wood}>
        <torusGeometry args={[2.0, 0.08, 8, 24]} />
      </mesh>

      {/* Central small table */}
      <mesh position={[0, 0.45, 0]} castShadow material={wood}>
        <cylinderGeometry args={[0.35, 0.35, 0.05, 10]} />
      </mesh>
      <mesh position={[0, 0.22, 0]} castShadow material={woodDark}>
        <cylinderGeometry args={[0.05, 0.06, 0.44, 8]} />
      </mesh>

      {/* Flanking benches from data */}
      {([ [16, 6, 0], [18, 4, Math.PI / 2], [18, 8, -Math.PI / 2] ] as const).map(([x, z, rotY], i) => (
        <group key={i} position={[x - 16, 0, z - 6]} rotation-y={rotY}>
          <mesh position={[0, 0.42, 0]} castShadow material={wood}>
            <boxGeometry args={[1.3, 0.07, 0.48]} />
          </mesh>
          <mesh position={[0, 0.72, 0.2]} castShadow material={wood}>
            <boxGeometry args={[1.3, 0.44, 0.07]} />
          </mesh>
          <mesh position={[-0.52, 0.2, 0]} castShadow material={stoneTrim}>
            <boxGeometry args={[0.1, 0.4, 0.4]} />
          </mesh>
          <mesh position={[0.52, 0.2, 0]} castShadow material={stoneTrim}>
            <boxGeometry args={[0.1, 0.4, 0.4]} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/** Games Area — recreational space with a game table. */
function GamesArea() {
  return (
    <group position={[14, 0, -10]}>
      {/* Ground marking */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.01, 0]} receiveShadow material={stoneTrim}>
        <circleGeometry args={[2.5, 20]} />
      </mesh>

      {/* Game table */}
      <mesh position={[0, 0.65, 0]} castShadow material={wood}>
        <boxGeometry args={[1.4, 0.06, 1.0]} />
      </mesh>
      <mesh position={[-0.55, 0.32, 0]} castShadow material={woodDark}>
        <boxGeometry args={[0.08, 0.64, 0.08]} />
      </mesh>
      <mesh position={[0.55, 0.32, 0]} castShadow material={woodDark}>
        <boxGeometry args={[0.08, 0.64, 0.08]} />
      </mesh>
      <mesh position={[-0.55, 0.32, -0.4]} castShadow material={woodDark}>
        <boxGeometry args={[0.08, 0.64, 0.08]} />
      </mesh>
      <mesh position={[0.55, 0.32, -0.4]} castShadow material={woodDark}>
        <boxGeometry args={[0.08, 0.64, 0.08]} />
      </mesh>

      {/* Game pieces (abstract) */}
      <mesh position={[-0.3, 0.7, -0.2]} material={marble}>
        <cylinderGeometry args={[0.08, 0.08, 0.12, 8]} />
      </mesh>
      <mesh position={[0.3, 0.7, 0.2]} material={gold}>
        <cylinderGeometry args={[0.08, 0.08, 0.12, 8]} />
      </mesh>
      <mesh position={[0.1, 0.7, -0.1]} material={marble}>
        <sphereGeometry args={[0.07, 8, 8]} />
      </mesh>

      {/* Seating */}
      <mesh position={[0, 0.42, 1.2]} castShadow material={wood}>
        <boxGeometry args={[1.2, 0.07, 0.45]} />
      </mesh>
      <mesh position={[-0.45, 0.2, 1.2]} castShadow material={stoneTrim}>
        <boxGeometry args={[0.08, 0.4, 0.38]} />
      </mesh>
      <mesh position={[0.45, 0.2, 1.2]} castShadow material={stoneTrim}>
        <boxGeometry args={[0.08, 0.4, 0.38]} />
      </mesh>
    </group>
  )
}

/** Event Stage — small outdoor stage for future events. */
function EventStage() {
  return (
    <group position={[16, 0, -14]}>
      {/* Stage platform */}
      <mesh position={[0, 0.3, 0]} castShadow material={stoneTrim}>
        <boxGeometry args={[5, 0.6, 3]} />
      </mesh>
      {/* Stage front edge */}
      <mesh position={[0, 0.3, 1.52]} material={gold}>
        <boxGeometry args={[5, 0.6, 0.04]} />
      </mesh>
      {/* Stage backdrop */}
      <mesh position={[0, 1.8, -1.4]} castShadow material={stoneTrim}>
        <boxGeometry args={[5, 3.0, 0.3]} />
      </mesh>
      {/* Backdrop gold trim */}
      <mesh position={[0, 3.35, -1.4]} material={gold}>
        <boxGeometry args={[5.2, 0.1, 0.36]} />
      </mesh>
      {/* Side columns */}
      <mesh position={[-2.3, 1.8, -1.4]} castShadow material={marble}>
        <cylinderGeometry args={[0.15, 0.18, 3.0, 8]} />
      </mesh>
      <mesh position={[2.3, 1.8, -1.4]} castShadow material={marble}>
        <cylinderGeometry args={[0.15, 0.18, 3.0, 8]} />
      </mesh>
      {/* Steps */}
      <mesh position={[0, 0.06, 1.8]} receiveShadow material={stoneTrim}>
        <boxGeometry args={[3.0, 0.12, 0.6]} />
      </mesh>
    </group>
  )
}
