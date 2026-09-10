/**
 * Founder's Sanctum lighting — warm, intimate, prestigious.
 * Cinematic directional sun with soft accent lights.
 */
export function FounderLighting() {
  return (
    <group>
      {/* Primary sun — warm, strong */}
      <directionalLight
        position={[28, 42, -20]}
        intensity={1.5}
        color="#fff0cc"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={35}
        shadow-camera-bottom={-20}
        shadow-camera-near={10}
        shadow-camera-far={90}
        shadow-bias={-0.0004}
      />

      {/* Hemisphere fill */}
      <hemisphereLight args={['#d0d8e4', '#8a7a5c', 0.45]} />

      {/* Ambient base */}
      <ambientLight intensity={0.15} color="#e8e0d4" />

      {/* Accent lights — architectural highlights */}
      <pointLight position={[-3, 3, 6]} intensity={0.5} color="#ffe0a0" distance={16} decay={2} />
      <pointLight position={[3, 3, 6]} intensity={0.5} color="#ffe0a0" distance={16} decay={2} />
      <pointLight position={[0, 4, -10]} intensity={0.6} color="#fff0dd" distance={18} decay={2} />

      {/* Ground bounce */}
      <pointLight position={[0, -1, 0]} intensity={0.12} color="#c8b898" distance={20} decay={2} />
    </group>
  )
}
