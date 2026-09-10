import { gold, marble, marbleDark, stoneTrim, wood } from './materials'

/**
 * The Event Arena — the largest open space in The Worlds.
 *
 * Represents competitions, celebrations, community events,
 * and tournaments. Includes stage, audience seating, banners.
 */
export function WorldsEventArena() {
  return (
    <group position={[0, 0, -16]}>
      {/* Arena floor */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.01, 0]} receiveShadow material={stoneTrim}>
        <circleGeometry args={[8, 36]} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.015, 0]} material={marbleDark}>
        <circleGeometry args={[6, 36]} />
      </mesh>

      {/* Stage */}
      <Stage />

      {/* Audience seating */}
      <AudienceSeating />

      {/* Banners */}
      <ArenaBanners />
    </group>
  )
}

/** The main stage for events and competitions. */
function Stage() {
  return (
    <group position={[0, 0, -4]}>
      {/* Stage platform */}
      <mesh position={[0, 0.4, 0]} castShadow material={stoneTrim}>
        <boxGeometry args={[8, 0.8, 4]} />
      </mesh>
      {/* Stage front edge */}
      <mesh position={[0, 0.4, 2.02]} material={gold}>
        <boxGeometry args={[8, 0.8, 0.04]} />
      </mesh>
      {/* Stage backdrop */}
      <mesh position={[0, 2.4, -1.9]} castShadow material={stoneTrim}>
        <boxGeometry args={[8, 4.0, 0.3]} />
      </mesh>
      {/* Backdrop gold trim */}
      <mesh position={[0, 4.45, -1.9]} material={gold}>
        <boxGeometry args={[8.2, 0.1, 0.36]} />
      </mesh>
      {/* Backdrop accent */}
      <mesh position={[0, 2.4, -1.72]}>
        <planeGeometry args={[7.5, 3.5]} />
        <meshStandardMaterial color="#2a3a4a" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Side columns */}
      <mesh position={[-3.8, 2.4, -1.9]} castShadow material={marble}>
        <cylinderGeometry args={[0.18, 0.22, 4.0, 8]} />
      </mesh>
      <mesh position={[3.8, 2.4, -1.9]} castShadow material={marble}>
        <cylinderGeometry args={[0.18, 0.22, 4.0, 8]} />
      </mesh>

      {/* Podium */}
      <mesh position={[0, 1.2, 0.5]} castShadow material={marble}>
        <boxGeometry args={[0.8, 1.2, 0.6]} />
      </mesh>
      <mesh position={[0, 1.82, 0.5]} material={gold}>
        <boxGeometry args={[0.84, 0.06, 0.64]} />
      </mesh>

      {/* Steps */}
      <mesh position={[-2, 0.06, 2.4]} receiveShadow material={stoneTrim}>
        <boxGeometry args={[2.0, 0.12, 0.8]} />
      </mesh>
      <mesh position={[2, 0.06, 2.4]} receiveShadow material={stoneTrim}>
        <boxGeometry args={[2.0, 0.12, 0.8]} />
      </mesh>
    </group>
  )
}

/** Audience seating around the stage. */
function AudienceSeating() {
  return (
    <group>
      {/* Left seating rows */}
      {[-6, -4.5, -3].map((z, i) => (
        <group key={`l${i}`}>
          <mesh position={[-4, 0.15 + i * 0.2, z]} castShadow material={stoneTrim}>
            <boxGeometry args={[3, 0.12, 1.2]} />
          </mesh>
        </group>
      ))}
      {/* Right seating rows */}
      {[-6, -4.5, -3].map((z, i) => (
        <group key={`r${i}`}>
          <mesh position={[4, 0.15 + i * 0.2, z]} castShadow material={stoneTrim}>
            <boxGeometry args={[3, 0.12, 1.2]} />
          </mesh>
        </group>
      ))}

      {/* Benches */}
      <mesh position={[-4, 0.5, -5.5]} castShadow material={wood}>
        <boxGeometry args={[2.5, 0.08, 0.5]} />
      </mesh>
      <mesh position={[4, 0.5, -5.5]} castShadow material={wood}>
        <boxGeometry args={[2.5, 0.08, 0.5]} />
      </mesh>
    </group>
  )
}

/** Arena banners. */
function ArenaBanners() {
  return (
    <group>
      {/* Left banners */}
      <mesh position={[-7, 2.5, 0]}>
        <planeGeometry args={[0.5, 1.5]} />
        <meshStandardMaterial color="#5a8fb4" roughness={0.4} metalness={0.6} side={2} />
      </mesh>
      <mesh position={[-7, 2.5, -4]}>
        <planeGeometry args={[0.5, 1.5]} />
        <meshStandardMaterial color="#5a9a6a" roughness={0.4} metalness={0.5} side={2} />
      </mesh>

      {/* Right banners */}
      <mesh position={[7, 2.5, 0]}>
        <planeGeometry args={[0.5, 1.5]} />
        <meshStandardMaterial color="#8a6aaa" roughness={0.4} metalness={0.5} side={2} />
      </mesh>
      <mesh position={[7, 2.5, -4]}>
        <planeGeometry args={[0.5, 1.5]} />
        <meshStandardMaterial color="#5a8fb4" roughness={0.4} metalness={0.6} side={2} />
      </mesh>
    </group>
  )
}
