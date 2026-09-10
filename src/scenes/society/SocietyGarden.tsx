import { Instances, Instance } from '@react-three/drei'

import { ProceduralTree } from '@/systems/vegetation/ProceduralTree'
import { BUSHES, FLOWERS, TREES } from './data'
import { flowerColors } from './materials'

/**
 * Vegetation for The Society — procedural trees, sphere bushes, and flowers.
 */
export function SocietyGarden() {
  return (
    <group>
      {TREES.map(([x, z, s], i) => (
        <ProceduralTree
          key={i}
          position={[x, 0, z]}
          scale={s}
          trunkHeight={2.0 + (i % 3) * 0.3}
          canopyRadius={1.4 + (i % 4) * 0.2}
          variant={i % 3}
          seed={i * 137}
        />
      ))}

      {/* Bushes */}
      <Instances limit={BUSHES.length} castShadow receiveShadow>
        <sphereGeometry args={[0.45, 10, 8]} />
        <meshStandardMaterial color="#4a6a3a" roughness={0.88} metalness={0.01} />
        {BUSHES.map(([x, z, s], i) => (
          <Instance
            key={i}
            position={[x, 0.35 * s, z]}
            scale={[s, s * 0.7, s]}
            rotation={[0, (i * 47) % 180, 0]}
          />
        ))}
      </Instances>

      {/* Flowers */}
      <Instances limit={FLOWERS.length} material={flowerColors[0]}>
        <icosahedronGeometry args={[0.08, 0]} />
        {FLOWERS.map(([x, z, color], i) => (
          <Instance
            key={i}
            position={[x, 0.08, z]}
            rotation={[0, (i * 23) % 180, 0]}
            color={flowerColors[color].color}
          />
        ))}
      </Instances>
    </group>
  )
}
