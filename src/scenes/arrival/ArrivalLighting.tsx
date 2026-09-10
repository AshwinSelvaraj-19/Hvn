/**
 * Arrival lighting — cinematic daylight composition.
 *
 * Strong directional sun with warm tone, soft hemisphere fill,
 * and carefully placed accent lights for architectural emphasis.
 * Shadows define depth and form.
 */
export function ArrivalLighting() {
  return (
    <group>
      {/* Primary sun — warm, strong, directional */}
      <directionalLight
        position={[30, 45, -25]}
        intensity={1.6}
        color="#fff0dd"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={120}
        shadow-camera-left={-45}
        shadow-camera-right={45}
        shadow-camera-top={45}
        shadow-camera-bottom={-45}
        shadow-bias={-0.0004}
      />

      {/* Hemisphere fill — soft sky/ground bounce */}
      <hemisphereLight
        args={['#c4d8ec', '#8a7a5c', 0.5]}
      />

      {/* Ambient — very subtle base illumination */}
      <ambientLight intensity={0.18} color="#e8e0d4" />

      {/* Accent lights — warm architectural highlights */}
      <pointLight position={[-8, 4, 6]} intensity={0.4} color="#ffe0a0" distance={18} decay={2} />
      <pointLight position={[8, 4, 6]} intensity={0.4} color="#ffe0a0" distance={18} decay={2} />
      <pointLight position={[0, 5, -14]} intensity={0.5} color="#fff0dd" distance={20} decay={2} />
      <pointLight position={[0, 3, 0]} intensity={0.3} color="#ffe8c0" distance={14} decay={2} />

      {/* Subtle fill from below — simulates ground bounce */}
      <pointLight position={[0, -2, 0]} intensity={0.15} color="#c8b898" distance={25} decay={2} />
    </group>
  )
}
