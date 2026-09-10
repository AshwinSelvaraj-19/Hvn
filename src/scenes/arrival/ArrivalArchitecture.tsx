import { gold, marble, roof, stoneStep, stoneTrim, stoneWall, windowWarm, woodDark } from './materials'

/** Warm window glow with recessed frame, arch top, and ledge. */
function Window({ x, y, z, rotY = 0, scale = 1 }: { x: number; y: number; z: number; rotY?: number; scale?: number }) {
  return (
    <group position={[x, y, z]} rotation-y={rotY} scale={scale}>
      {/* Recess (dark interior) */}
      <mesh position={[0, 0, -0.04]} material={woodDark}>
        <boxGeometry args={[0.7, 0.95, 0.14]} />
      </mesh>
      {/* Glass surface */}
      <mesh position={[0, 0, 0.02]} material={windowWarm}>
        <boxGeometry args={[0.6, 0.85, 0.04]} />
      </mesh>
      {/* Arch top */}
      <mesh position={[0, 0.42, 0.02]} material={stoneTrim}>
        <cylinderGeometry args={[0.32, 0.32, 0.04, 12, 1, false, 0, Math.PI]} />
      </mesh>
      {/* Frame trim — vertical sides */}
      <mesh position={[-0.34, 0, 0.04]} material={stoneTrim}>
        <boxGeometry args={[0.06, 0.95, 0.06]} />
      </mesh>
      <mesh position={[0.34, 0, 0.04]} material={stoneTrim}>
        <boxGeometry args={[0.06, 0.95, 0.06]} />
      </mesh>
      {/* Frame trim — horizontal bars */}
      <mesh position={[0, 0.47, 0.04]} material={stoneTrim}>
        <boxGeometry args={[0.74, 0.05, 0.06]} />
      </mesh>
      <mesh position={[0, -0.47, 0.04]} material={stoneTrim}>
        <boxGeometry args={[0.74, 0.05, 0.06]} />
      </mesh>
      {/* Ledge */}
      <mesh position={[0, -0.5, 0.08]} material={stoneTrim}>
        <boxGeometry args={[0.82, 0.06, 0.12]} />
      </mesh>
      {/* Sill detail */}
      <mesh position={[0, -0.54, 0.06]} material={stoneStep}>
        <boxGeometry args={[0.86, 0.04, 0.08]} />
      </mesh>
    </group>
  )
}

/** Elegant column with base, fluted shaft, and ornate capital. */
function Column({ x, z, h = 3.4, r = 0.22 }: { x: number; z: number; h?: number; r?: number }) {
  return (
    <group position={[x, 0, z]}>
      {/* Base plinth */}
      <mesh position={[0, 0.08, 0]} castShadow material={stoneTrim}>
        <boxGeometry args={[r * 2.8, 0.16, r * 2.8]} />
      </mesh>
      {/* Base torus */}
      <mesh position={[0, 0.2, 0]} castShadow material={stoneTrim}>
        <cylinderGeometry args={[r * 1.15, r * 1.2, 0.12, 12]} />
      </mesh>
      {/* Shaft — tapered cylinder with slight entasis */}
      <mesh position={[0, h / 2 + 0.2, 0]} castShadow material={marble}>
        <cylinderGeometry args={[r * 0.82, r, h, 12]} />
      </mesh>
      {/* Capital — echinus + abacus */}
      <mesh position={[0, h + 0.2, 0]} castShadow material={stoneTrim}>
        <cylinderGeometry args={[r * 1.1, r * 0.85, 0.1, 12]} />
      </mesh>
      <mesh position={[0, h + 0.3, 0]} castShadow material={stoneTrim}>
        <boxGeometry args={[r * 2.4, 0.08, r * 2.4]} />
      </mesh>
    </group>
  )
}

/** Stone arch — curved opening between two piers. */
function Arch({ x, y, z, width = 3, height = 4, depth = 1, rotY = 0 }: {
  x: number; y: number; z: number; width?: number; height?: number; depth?: number; rotY?: number
}) {
  const pierH = height - width * 0.4
  return (
    <group position={[x, y, z]} rotation-y={rotY}>
      {/* Left pier */}
      <mesh position={[-width / 2 + 0.3, pierH / 2, 0]} castShadow material={marble}>
        <boxGeometry args={[0.6, pierH, depth]} />
      </mesh>
      {/* Right pier */}
      <mesh position={[width / 2 - 0.3, pierH / 2, 0]} castShadow material={marble}>
        <boxGeometry args={[0.6, pierH, depth]} />
      </mesh>
      {/* Arch curve — approximated with box segments */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 4) * Math.PI
        const ax = Math.cos(angle) * (width / 2 - 0.3)
        const ay = pierH + Math.sin(angle) * width * 0.35
        return (
          <mesh key={i} position={[ax, ay, 0]} castShadow material={stoneTrim}>
            <boxGeometry args={[0.3, 0.25, depth * 0.9]} />
          </mesh>
        )
      })}
      {/* Keystone */}
      <mesh position={[0, pierH + width * 0.35, 0]} castShadow material={gold}>
        <boxGeometry args={[0.35, 0.3, depth * 0.85]} />
      </mesh>
    </group>
  )
}

/**
 * The Arrival's architecture — premium celestial settlement.
 *
 * Entrance arch, guild halls, community hall, houses, and landmarks.
 * All buildings use proper proportions, arches, columns, and trim.
 */
export function ArrivalArchitecture() {
  return (
    <group>
      {/* ─── Entrance Gateway — monumental arch ─── */}
      <group position={[0, 0, 6.5]}>
        {/* Foundation platform */}
        <mesh position={[0, 0.08, 0]} receiveShadow material={stoneStep}>
          <boxGeometry args={[6.5, 0.16, 2.2]} />
        </mesh>
        {/* Piers with stepped bases */}
        <mesh position={[-2.4, 2.4, 0]} castShadow material={marble}>
          <boxGeometry args={[0.85, 4.8, 0.85]} />
        </mesh>
        <mesh position={[-2.4, 0.15, 0]} castShadow material={stoneTrim}>
          <boxGeometry args={[1.0, 0.3, 1.0]} />
        </mesh>
        <mesh position={[2.4, 2.4, 0]} castShadow material={marble}>
          <boxGeometry args={[0.85, 4.8, 0.85]} />
        </mesh>
        <mesh position={[2.4, 0.15, 0]} castShadow material={stoneTrim}>
          <boxGeometry args={[1.0, 0.3, 1.0]} />
        </mesh>
        {/* Arch beam with cornice */}
        <mesh position={[0, 5.0, 0]} castShadow material={marble}>
          <boxGeometry args={[6.0, 0.6, 1.0]} />
        </mesh>
        {/* Cornice detail */}
        <mesh position={[0, 5.35, 0]} castShadow material={stoneTrim}>
          <boxGeometry args={[6.2, 0.12, 1.1]} />
        </mesh>
        {/* Roof cap */}
        <mesh position={[0, 5.55, 0]} castShadow material={roof}>
          <boxGeometry args={[6.4, 0.2, 1.2]} />
        </mesh>
        {/* Gold band */}
        <mesh position={[0, 5.15, 0]} material={gold}>
          <boxGeometry args={[6.0, 0.06, 1.06]} />
        </mesh>
        {/* Finials */}
        <mesh position={[-2.4, 5.45, 0]} material={gold}>
          <cylinderGeometry args={[0.06, 0.08, 0.3, 8]} />
        </mesh>
        <mesh position={[2.4, 5.45, 0]} material={gold}>
          <cylinderGeometry args={[0.06, 0.08, 0.3, 8]} />
        </mesh>
        <mesh position={[0, 5.65, 0]} material={gold}>
          <octahedronGeometry args={[0.12, 0]} />
        </mesh>
        {/* Side columns */}
        <Column x={-2.4} z={0.6} h={4.2} r={0.18} />
        <Column x={2.4} z={0.6} h={4.2} r={0.18} />
        <Column x={-2.4} z={-0.6} h={4.2} r={0.18} />
        <Column x={2.4} z={-0.6} h={4.2} r={0.18} />
      </group>

      {/* ─── West guild hall ─── */}
      <GuildHall position={[-11, 0, -1]} />

      {/* ─── East guild hall (mirrored) ─── */}
      <GuildHall position={[11, 0, -1]} />

      {/* ─── Community hall (north) — largest building ─── */}
      <group position={[0, 0, -14]}>
        {/* Foundation */}
        <mesh position={[0, 0.1, 0]} receiveShadow material={stoneStep}>
          <boxGeometry args={[11.2, 0.2, 7.2]} />
        </mesh>
        {/* Steps */}
        <mesh position={[0, 0.04, 3.8]} receiveShadow material={stoneStep}>
          <boxGeometry args={[6.0, 0.08, 1.2]} />
        </mesh>
        <mesh position={[0, 0.08, 4.2]} receiveShadow material={stoneStep}>
          <boxGeometry args={[5.6, 0.08, 0.8]} />
        </mesh>
        {/* Walls with subtle quoining */}
        <mesh position={[0, 2.8, 0]} castShadow material={stoneWall}>
          <boxGeometry args={[10.8, 5.4, 6.8]} />
        </mesh>
        {/* Wall trim lines */}
        <mesh position={[0, 0.4, 0]} material={stoneTrim}>
          <boxGeometry args={[11.0, 0.12, 7.0]} />
        </mesh>
        <mesh position={[0, 5.45, 0]} material={stoneTrim}>
          <boxGeometry args={[11.0, 0.12, 7.0]} />
        </mesh>
        {/* Cornice */}
        <mesh position={[0, 5.65, 0]} castShadow material={stoneTrim}>
          <boxGeometry args={[11.2, 0.2, 7.2]} />
        </mesh>
        {/* Roof */}
        <mesh position={[0, 6.1, 0]} castShadow material={roof}>
          <coneGeometry args={[7.0, 2.0, 4]} />
        </mesh>
        <mesh position={[0, 5.35, 0]} material={roof}>
          <boxGeometry args={[7.6, 0.12, 7.6]} />
        </mesh>
        {/* Portico */}
        <Column x={-3.6} z={3.9} h={4.4} r={0.26} />
        <Column x={-2.0} z={3.9} h={4.4} r={0.26} />
        <Column x={2.0} z={3.9} h={4.4} r={0.26} />
        <Column x={3.6} z={3.9} h={4.4} r={0.26} />
        {/* Portico entablature */}
        <mesh position={[0, 4.8, 3.9]} castShadow material={marble}>
          <boxGeometry args={[8.0, 0.6, 0.9]} />
        </mesh>
        <mesh position={[0, 5.12, 3.9]} material={gold}>
          <boxGeometry args={[8.0, 0.06, 0.96]} />
        </mesh>
        {/* Door */}
        <mesh position={[0, 2.3, 3.42]} material={woodDark}>
          <boxGeometry args={[2.2, 3.2, 0.14]} />
        </mesh>
        <mesh position={[0, 3.95, 3.44]} material={stoneTrim}>
          <boxGeometry args={[2.5, 0.1, 0.08]} />
        </mesh>
        {/* Windows */}
        <Window x={-4.2} y={2.7} z={3.43} />
        <Window x={4.2} y={2.7} z={3.43} />
        <Window x={-5.42} y={2.7} z={0} rotY={Math.PI / 2} />
        <Window x={5.42} y={2.7} z={0} rotY={Math.PI / 2} />
        {/* Foundation gold trim */}
        <mesh position={[0, 0.36, 0]} material={gold}>
          <boxGeometry args={[11.0, 0.06, 7.0]} />
        </mesh>
      </group>

      {/* ─── Small houses with varied designs ─── */}
      <House x={-14.5} z={8.5} rotY={0} variant={0} />
      <House x={14.5} z={8.5} rotY={0} variant={1} />
      <House x={-15} z={-10} rotY={0} variant={1} />
      <House x={15} z={-10} rotY={0} variant={0} />
      <House x={16.5} z={2.5} rotY={Math.PI / 2} variant={2} />
      <House x={-16.5} z={2.5} rotY={Math.PI / 2} variant={2} />

      {/* ─── Decorative arches along main avenue ─── */}
      <Arch x={-3.5} y={0} z={0} width={2.5} height={3.5} depth={0.6} />
      <Arch x={3.5} y={0} z={0} width={2.5} height={3.5} depth={0.6} />

      {/* ─── Distant destination hints ─── */}
      <DistantLandmarks />
    </group>
  )
}

/** Guild hall with improved depth, arches, and proportions. */
function GuildHall({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Foundation */}
      <mesh position={[0, 0.08, 0]} receiveShadow material={stoneStep}>
        <boxGeometry args={[8.0, 0.16, 6.0]} />
      </mesh>
      {/* Steps */}
      <mesh position={[0, 0.04, 3.2]} receiveShadow material={stoneStep}>
        <boxGeometry args={[4.0, 0.08, 0.8]} />
      </mesh>
      {/* Walls */}
      <mesh position={[0, 2.2, 0]} castShadow material={stoneWall}>
        <boxGeometry args={[7.6, 4.4, 5.6]} />
      </mesh>
      {/* Wall trim */}
      <mesh position={[0, 0.32, 0]} material={stoneTrim}>
        <boxGeometry args={[7.8, 0.1, 5.8]} />
      </mesh>
      <mesh position={[0, 4.35, 0]} material={stoneTrim}>
        <boxGeometry args={[7.8, 0.1, 5.8]} />
      </mesh>
      {/* Cornice */}
      <mesh position={[0, 4.55, 0]} castShadow material={stoneTrim}>
        <boxGeometry args={[8.0, 0.15, 6.0]} />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 4.75, 0]} material={roof}>
        <boxGeometry args={[5.2, 0.1, 5.2]} />
      </mesh>
      <mesh position={[0, 5.1, 0]} castShadow material={roof}>
        <coneGeometry args={[4.6, 1.6, 4]} />
      </mesh>
      {/* Door */}
      <mesh position={[0, 1.5, 2.82]} material={woodDark}>
        <boxGeometry args={[1.3, 2.3, 0.12]} />
      </mesh>
      <mesh position={[0, 2.72, 2.84]} material={stoneTrim}>
        <boxGeometry args={[1.5, 0.08, 0.08]} />
      </mesh>
      {/* Columns */}
      <Column x={-2.6} z={3.0} />
      <Column x={2.6} z={3.0} />
      {/* Windows */}
      <Window x={-2.8} y={2.2} z={2.83} />
      <Window x={2.8} y={2.2} z={2.83} />
      <Window x={-3.82} y={2.2} z={0} rotY={Math.PI / 2} />
      <Window x={3.82} y={2.2} z={0} rotY={Math.PI / 2} />
      {/* Gold trim */}
      <mesh position={[0, 0.37, 0]} material={gold}>
        <boxGeometry args={[7.8, 0.06, 5.8]} />
      </mesh>
    </group>
  )
}

/** Residential building with varied designs per variant. */
function House({ x, z, rotY, variant = 0 }: { x: number; z: number; rotY: number; variant?: number }) {
  const roofType = variant % 3
  return (
    <group position={[x, 0, z]} rotation-y={rotY}>
      {/* Foundation */}
      <mesh position={[0, 0.06, 0]} receiveShadow material={stoneStep}>
        <boxGeometry args={[5.0, 0.12, 4.4]} />
      </mesh>
      {/* Walls */}
      <mesh position={[0, 1.7, 0]} castShadow material={stoneWall}>
        <boxGeometry args={[4.6, 3.4, 4.0]} />
      </mesh>
      {/* Wall trim */}
      <mesh position={[0, 0.3, 0]} material={stoneTrim}>
        <boxGeometry args={[4.8, 0.08, 4.2]} />
      </mesh>
      <mesh position={[0, 3.35, 0]} material={stoneTrim}>
        <boxGeometry args={[4.8, 0.08, 4.2]} />
      </mesh>
      {/* Roof variants */}
      {roofType === 0 && (
        <>
          <mesh position={[0, 3.5, 0]} material={roof}>
            <boxGeometry args={[3.8, 0.1, 3.8]} />
          </mesh>
          <mesh position={[0, 3.85, 0]} castShadow material={roof}>
            <coneGeometry args={[3.5, 1.3, 4]} />
          </mesh>
        </>
      )}
      {roofType === 1 && (
        <mesh position={[0, 3.9, 0]} castShadow material={roof}>
          <coneGeometry args={[3.8, 1.8, 6]} />
        </mesh>
      )}
      {roofType === 2 && (
        <>
          <mesh position={[0, 3.5, 0]} material={roof}>
            <boxGeometry args={[4.0, 0.1, 3.0]} />
          </mesh>
          <mesh position={[0, 4.0, 0]} castShadow material={roof}>
            <boxGeometry args={[3.8, 0.8, 2.8]} />
          </mesh>
        </>
      )}
      {/* Door */}
      <mesh position={[0, 1.15, 2.02]} material={woodDark}>
        <boxGeometry args={[1.0, 1.8, 0.1]} />
      </mesh>
      {/* Windows */}
      <Window x={-1.5} y={1.9} z={2.02} />
      <Window x={1.5} y={1.9} z={2.02} />
      {/* Gold trim */}
      <mesh position={[0, 0.34, 0]} material={gold}>
        <boxGeometry args={[4.8, 0.05, 4.2]} />
      </mesh>
    </group>
  )
}

/** Distant silhouettes hinting at the four destinations. */
function DistantLandmarks() {
  return (
    <group>
      {/* The Society — domed hall */}
      <group position={[30, -7, -44]}>
        <mesh position={[0, 3, 0]} castShadow material={stoneWall}>
          <cylinderGeometry args={[5.2, 5.8, 6, 16]} />
        </mesh>
        <mesh position={[0, 7.6, 0]} castShadow material={marble}>
          <sphereGeometry args={[5.6, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
        <mesh position={[0, 13.4, 0]} material={gold}>
          <sphereGeometry args={[0.5, 8, 8]} />
        </mesh>
      </group>

      {/* The Worlds — twin spires */}
      <group position={[4, -8, -54]}>
        <mesh position={[-1.4, 10, 0]} castShadow material={marble}>
          <cylinderGeometry args={[0.7, 1, 20, 8]} />
        </mesh>
        <mesh position={[1.4, 12.5, 0]} castShadow material={marble}>
          <cylinderGeometry args={[0.8, 1.1, 25, 8]} />
        </mesh>
        <mesh position={[-1.4, 21, 0]} material={gold}>
          <coneGeometry args={[0.9, 2.6, 8]} />
        </mesh>
        <mesh position={[1.4, 26, 0]} material={gold}>
          <coneGeometry args={[1, 3, 8]} />
        </mesh>
      </group>

      {/* The Gate — monumental arch */}
      <group position={[-16, -8, -52]}>
        <mesh position={[-2.6, 5, 0]} castShadow material={stoneWall}>
          <boxGeometry args={[1.2, 10, 1.2]} />
        </mesh>
        <mesh position={[2.6, 5, 0]} castShadow material={stoneWall}>
          <boxGeometry args={[1.2, 10, 1.2]} />
        </mesh>
        <mesh position={[0, 10.4, 0]} castShadow material={marble}>
          <boxGeometry args={[6.8, 1.4, 1.4]} />
        </mesh>
        <mesh position={[0, 11.2, 0]} material={gold}>
          <boxGeometry args={[6.8, 0.12, 1.5]} />
        </mesh>
      </group>
    </group>
  )
}
