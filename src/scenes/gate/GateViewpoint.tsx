import { Instances, Instance } from '@react-three/drei'

import { gold, marble, marbleDark, stoneTrim } from './materials'

/**
 * Final Viewpoint — an overlook beyond the Gate.
 *
 * The player sees a beautiful view of the Heaven Society environment.
 * Distant settlement silhouettes, clouds, atmospheric depth.
 * Communicates: "This is Heaven."
 */
export function GateViewpoint() {
  return (
    <group position={[0, 0, -20]}>
      {/* Viewpoint platform */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.02, 0]} receiveShadow material={stoneTrim}>
        <circleGeometry args={[5, 32]} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.025, 0]} material={marbleDark}>
        <circleGeometry args={[3.5, 32]} />
      </mesh>

      {/* Railing / overlook wall */}
      <ViewpointWall />

      {/* Distant silhouettes (far plane decoration) */}
      <DistantSettlements />
    </group>
  )
}

/** Low wall around the viewpoint edge. */
function ViewpointWall() {
  return (
    <group>
      {/* Back wall */}
      <mesh position={[0, 0.6, -2.5]} castShadow material={marble}>
        <boxGeometry args={[8, 1.2, 0.4]} />
      </mesh>
      <mesh position={[0, 1.22, -2.5]} material={gold}>
        <boxGeometry args={[8.1, 0.06, 0.46]} />
      </mesh>

      {/* Side walls */}
      <mesh position={[-4, 0.5, -1]} castShadow material={marble} rotation-y={0.3}>
        <boxGeometry args={[3, 1.0, 0.3]} />
      </mesh>
      <mesh position={[4, 0.5, -1]} castShadow material={marble} rotation-y={-0.3}>
        <boxGeometry args={[3, 1.0, 0.3]} />
      </mesh>
    </group>
  )
}

/**
 * Distant settlement silhouettes — far beyond the viewpoint.
 * Simple geometric shapes that suggest a vast world.
 */
function DistantSettlements() {
  const silhouettes: Array<[number, number, number, number]> = [
    [-18, 8, -55, 4],
    [-10, 6, -60, 3.5],
    [0, 10, -65, 5],
    [12, 7, -58, 3.8],
    [20, 5, -62, 3],
    [-6, 4, -50, 2.5],
    [8, 3, -48, 2],
  ]

  return (
    <Instances limit={silhouettes.length} material={marbleDark}>
      <boxGeometry args={[1, 1, 1]} />
      {silhouettes.map(([x, h, z, s], i) => (
        <Instance key={i} position={[x, h * 0.5, z]} scale={[s, h, s * 0.6]} />
      ))}
    </Instances>
  )
}
