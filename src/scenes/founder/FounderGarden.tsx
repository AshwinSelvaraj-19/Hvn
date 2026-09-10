import { useMemo } from 'react'
import { Instances, Instance } from '@react-three/drei'

import { APPROACH_TREES, BUSHES, FLOWERS } from './data'
import { flowerColors, foliageDark } from './materials'
import { ProceduralTree } from '@/systems/vegetation/ProceduralTree'

/**
 * Vegetation for the Founder's Sanctum — realistic procedural trees,
 * natural bushes, and flowers along the approach and courtyard.
 */
export function FounderGarden() {
  const treePositions = useMemo(
    () => APPROACH_TREES.map(([x, z, s]) => ({ x, z, s })),
    [],
  )

  return (
    <group>
      {/* Realistic procedural trees */}
      {treePositions.map((t, i) => (
        <ProceduralTree
          key={i}
          position={[t.x, 0, t.z]}
          scale={t.s}
          trunkHeight={2.2 + (i % 3) * 0.3}
          canopyRadius={1.3 + (i % 3) * 0.2}
          variant={i % 3}
          seed={i * 137 + 500}
        />
      ))}

      {/* Bushes — natural rounded shapes */}
      <Instances limit={BUSHES.length} castShadow material={foliageDark}>
        <sphereGeometry args={[0.45, 10, 8]} />
        {BUSHES.map(([x, z, s], i) => (
          <Instance
            key={i}
            position={[x, 0.3 * s, z]}
            scale={[s * 1.1, s * 0.7, s * 1.1]}
          />
        ))}
      </Instances>

      {/* Flowers — small clusters */}
      <Instances limit={FLOWERS.length} material={flowerColors[0]}>
        <icosahedronGeometry args={[0.06, 0]} />
        {FLOWERS.map(([x, z, color], i) => (
          <Instance
            key={i}
            position={[x, 0.06, z]}
            color={flowerColors[color].color}
          />
        ))}
      </Instances>
    </group>
  )
}
