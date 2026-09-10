import { Instances, Instance } from '@react-three/drei'

import { marble, marbleDark, stoneTrim } from './materials'

/** Path edge stones, one pair every 2.5 units. */
const EDGE_STONES: Array<[number, number]> = []
for (let z = 9; z <= 25; z += 2.5) {
  EDGE_STONES.push([-1.95, z], [1.95, z])
}

/**
 * Paving: spawn pad → arrival path → central plaza.
 *
 * Improved with slab segmentation, darker border stones, and
 * better material transitions. Composition guides the visitor.
 */
export function ArrivalRoads() {
  return (
    <group>
      {/* ─── Spawn pad ─── */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.02, 26]} receiveShadow material={marble}>
        <circleGeometry args={[2.5, 28]} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.025, 26]} material={stoneTrim}>
        <ringGeometry args={[2.35, 2.55, 28]} />
      </mesh>

      {/* ─── Arrival path ─── */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.015, 16.5]} receiveShadow material={marble}>
        <planeGeometry args={[3.4, 20]} />
      </mesh>

      {/* Path slab lines — subtle segmentation */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh
          key={`slab${i}`}
          rotation-x={-Math.PI / 2}
          position={[0, 0.018, 9 + i * 2.5]}
          material={stoneTrim}
        >
          <planeGeometry args={[3.2, 0.03]} />
        </mesh>
      ))}

      {/* Path edge stones */}
      <Instances limit={EDGE_STONES.length} receiveShadow material={stoneTrim}>
        <boxGeometry args={[0.3, 0.06, 0.3]} />
        {EDGE_STONES.map(([x, z], i) => (
          <Instance key={i} position={[x, 0.035, z]} />
        ))}
      </Instances>

      {/* ─── Central plaza ─── */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.015, 0]} receiveShadow material={marble}>
        <circleGeometry args={[7.4, 40]} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.02, 0]} material={marbleDark}>
        <circleGeometry args={[5.8, 40]} />
      </mesh>
      {/* Gold accent ring */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.025, 0]}>
        <ringGeometry args={[5.86, 5.98, 40]} />
        <meshStandardMaterial color="#c9a84c" roughness={0.4} metalness={0.7} />
      </mesh>
      {/* Plaza border stones */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.022, 0]} material={stoneTrim}>
        <ringGeometry args={[7.32, 7.5, 40]} />
      </mesh>

      {/* ─── North path — leads to Founder's Sanctum ─── */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.015, -24]} receiveShadow material={marble}>
        <planeGeometry args={[3.4, 22]} />
      </mesh>
      {/* Slab lines */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh
          key={`nslab${i}`}
          rotation-x={-Math.PI / 2}
          position={[0, 0.018, -14 - i * 2.5]}
          material={stoneTrim}
        >
          <planeGeometry args={[3.2, 0.03]} />
        </mesh>
      ))}
      {/* North path edge stones */}
      <Instances limit={18} receiveShadow material={stoneTrim}>
        <boxGeometry args={[0.3, 0.06, 0.3]} />
        {Array.from({ length: 9 }, (_, i) => (
          <Instance key={`nl${i}`} position={[-1.95, 0.035, -14 - i * 2.5]} />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <Instance key={`nr${i}`} position={[1.95, 0.035, -14 - i * 2.5]} />
        ))}
      </Instances>
    </group>
  )
}
