import { gold, marble, marbleDark, stoneTrim, wood, woodDark } from './materials'

/**
 * The Founder's Sanctum interior — compact rooms with environmental
 * storytelling. Entrance hall, Founder's study, and reflection room.
 */
export function FounderInterior() {
  return (
    <group position={[0, 0, -10]}>
      {/* Interior partitions */}
      {/* Study walls (left alcove) */}
      <mesh position={[-3.5, 1.6, -1.1]} castShadow material={marble}>
        <boxGeometry args={[0.25, 3.2, 4.2]} />
      </mesh>
      {/* Study wall (back) */}
      <mesh position={[-1.2, 1.6, -3.2]} castShadow material={marble}>
        <boxGeometry args={[4.6, 3.2, 0.25]} />
      </mesh>

      {/* Founder's Study furniture */}
      <FounderDesk />

      {/* Reflection room marker — archway */}
      <mesh position={[0, 2.8, -3.8]} material={marbleDark}>
        <boxGeometry args={[3.2, 0.2, 0.25]} />
      </mesh>

      {/* Memory Monument in reflection room */}
      <MemoryMonument />

      {/* Bookshelves along the back wall */}
      <Bookshelf x={-4} z={-3.8} />
      <Bookshelf x={4} z={-3.8} />

      {/* Artwork frames on walls */}
      <ArtFrame x={-5.08} z={-1} rotY={Math.PI / 2} />
      <ArtFrame x={5.08} z={-1} rotY={-Math.PI / 2} />
    </group>
  )
}

/** The Founder's desk with personal objects. */
function FounderDesk() {
  return (
    <group position={[2.5, 0, -0.5]}>
      {/* Desk */}
      <mesh position={[0, 0.72, 0]} castShadow material={wood}>
        <boxGeometry args={[1.8, 0.08, 1.0]} />
      </mesh>
      {/* Desk legs */}
      <mesh position={[-0.75, 0.36, 0]} castShadow material={woodDark}>
        <boxGeometry args={[0.08, 0.72, 0.08]} />
      </mesh>
      <mesh position={[0.75, 0.36, 0]} castShadow material={woodDark}>
        <boxGeometry args={[0.08, 0.72, 0.08]} />
      </mesh>
      <mesh position={[-0.75, 0.36, -0.4]} castShadow material={woodDark}>
        <boxGeometry args={[0.08, 0.72, 0.08]} />
      </mesh>
      <mesh position={[0.75, 0.36, -0.4]} castShadow material={woodDark}>
        <boxGeometry args={[0.08, 0.72, 0.08]} />
      </mesh>

      {/* Chair */}
      <mesh position={[0, 0.45, 0.7]} castShadow material={wood}>
        <boxGeometry args={[0.5, 0.06, 0.5]} />
      </mesh>
      <mesh position={[0, 0.75, 0.92]} castShadow material={wood}>
        <boxGeometry args={[0.5, 0.55, 0.06]} />
      </mesh>
      <mesh position={[-0.2, 0.22, 0.7]} castShadow material={woodDark}>
        <boxGeometry args={[0.06, 0.44, 0.06]} />
      </mesh>
      <mesh position={[0.2, 0.22, 0.7]} castShadow material={woodDark}>
        <boxGeometry args={[0.06, 0.44, 0.06]} />
      </mesh>

      {/* Objects on desk */}
      {/* Document/book */}
      <mesh position={[-0.3, 0.77, -0.1]} castShadow material={marbleDark}>
        <boxGeometry args={[0.4, 0.04, 0.3]} />
      </mesh>
      {/* Inkwell */}
      <mesh position={[0.4, 0.78, 0.1]} castShadow material={gold}>
        <cylinderGeometry args={[0.06, 0.06, 0.08, 8]} />
      </mesh>
      {/* Quill/pen */}
      <mesh position={[0.5, 0.79, -0.15]} rotation-z={0.3} material={woodDark}>
        <boxGeometry args={[0.02, 0.25, 0.02]} />
      </mesh>
    </group>
  )
}

/** The Memory Monument — a stone stele with inscriptions. */
function MemoryMonument() {
  return (
    <group position={[0, 0, -2.5]}>
      {/* Base */}
      <mesh position={[0, 0.15, 0]} castShadow material={stoneTrim}>
        <boxGeometry args={[1.4, 0.3, 0.8]} />
      </mesh>
      {/* Stele */}
      <mesh position={[0, 1.2, 0]} castShadow material={marble}>
        <boxGeometry args={[0.8, 1.8, 0.15]} />
      </mesh>
      {/* Gold band */}
      <mesh position={[0, 1.2, 0.08]} material={gold}>
        <boxGeometry args={[0.82, 0.08, 0.01]} />
      </mesh>
      {/* Gold finial */}
      <mesh position={[0, 2.18, 0]} material={gold}>
        <sphereGeometry args={[0.07, 8, 8]} />
      </mesh>
    </group>
  )
}

/** A bookshelf against the wall. */
function Bookshelf({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      {/* Shelf frame */}
      <mesh position={[0, 1.2, 0]} castShadow material={woodDark}>
        <boxGeometry args={[1.0, 2.4, 0.35]} />
      </mesh>
      {/* Shelf dividers */}
      <mesh position={[0, 0.6, 0]} material={wood}>
        <boxGeometry args={[0.96, 0.04, 0.33]} />
      </mesh>
      <mesh position={[0, 1.2, 0]} material={wood}>
        <boxGeometry args={[0.96, 0.04, 0.33]} />
      </mesh>
      <mesh position={[0, 1.8, 0]} material={wood}>
        <boxGeometry args={[0.96, 0.04, 0.33]} />
      </mesh>
      {/* Book blocks (varied colors) */}
      {[-0.3, 0, 0.3].map((dy, i) => (
        <mesh key={i} position={[-0.2, 0.35 + dy, 0]} material={i === 0 ? marbleDark : i === 1 ? gold : wood}>
          <boxGeometry args={[0.15, 0.22, 0.2]} />
        </mesh>
      ))}
      {[-0.3, 0, 0.3].map((dy, i) => (
        <mesh key={`r${i}`} position={[0.2, 0.35 + dy, 0]} material={i === 0 ? wood : i === 1 ? marbleDark : gold}>
          <boxGeometry args={[0.12, 0.2, 0.18]} />
        </mesh>
      ))}
    </group>
  )
}

/** An artwork frame on the wall. */
function ArtFrame({ x, z, rotY }: { x: number; z: number; rotY: number }) {
  return (
    <group position={[x, 2.0, z]} rotation-y={rotY}>
      {/* Frame */}
      <mesh material={gold}>
        <boxGeometry args={[1.2, 0.9, 0.06]} />
      </mesh>
      {/* Canvas */}
      <mesh position={[0, 0, 0.02]} material={marbleDark}>
        <boxGeometry args={[1.0, 0.7, 0.02]} />
      </mesh>
    </group>
  )
}
