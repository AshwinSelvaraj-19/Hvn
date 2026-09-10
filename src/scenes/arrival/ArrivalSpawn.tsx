import { marble, stoneTrim } from './materials'

/**
 * Spawn area dressing: two low stone pillars flanking the start of the
 * path, framing the view down toward the plaza.
 */
export function ArrivalSpawn() {
  return (
    <group>
      <group position={[-2.4, 0, 26.5]}>
        <mesh position={[0, 0.7, 0]} castShadow material={stoneTrim}>
          <boxGeometry args={[0.7, 1.4, 0.7]} />
        </mesh>
        <mesh position={[0, 1.5, 0]} material={marble}>
          <boxGeometry args={[0.8, 0.22, 0.8]} />
        </mesh>
        <mesh position={[0, 1.68, 0]} material={stoneTrim}>
          <sphereGeometry args={[0.12, 8, 8]} />
        </mesh>
      </group>
      <group position={[2.4, 0, 26.5]}>
        <mesh position={[0, 0.7, 0]} castShadow material={stoneTrim}>
          <boxGeometry args={[0.7, 1.4, 0.7]} />
        </mesh>
        <mesh position={[0, 1.5, 0]} material={marble}>
          <boxGeometry args={[0.8, 0.22, 0.8]} />
        </mesh>
        <mesh position={[0, 1.68, 0]} material={stoneTrim}>
          <sphereGeometry args={[0.12, 8, 8]} />
        </mesh>
      </group>
    </group>
  )
}