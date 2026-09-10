/**
 * Lighting for The Society — cinematic, warm, communal.
 * Soft key light with balanced fill and controlled shadow falloff.
 */
export function SocietyLighting() {
  return (
    <group>
      <directionalLight
        position={[30, 45, -20]}
        intensity={1.8}
        color="#fff4e0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-35}
        shadow-camera-near={8}
        shadow-camera-far={120}
        shadow-bias={-0.0003}
        shadow-normalBias={0.04}
        shadow-radius={3}
      />
      <hemisphereLight args={['#d0e4f5', '#8a7a5a', 0.5]} />
      <pointLight position={[-5, 2.4, 4]} intensity={5} distance={10} color="#ffe0a0" decay={2} />
      <pointLight position={[5, 2.4, 4]} intensity={5} distance={10} color="#ffe0a0" decay={2} />
      <pointLight position={[-5, 2.4, -4]} intensity={4.5} distance={9} color="#ffe0a0" decay={2} />
      <pointLight position={[5, 2.4, -4]} intensity={4.5} distance={9} color="#ffe0a0" decay={2} />
      <pointLight position={[-2, 2.2, 22]} intensity={3.5} distance={8} color="#ffe0a0" decay={2} />
      <pointLight position={[2, 2.2, 22]} intensity={3.5} distance={8} color="#ffe0a0" decay={2} />
      <pointLight position={[0, 2.5, -14]} intensity={6} distance={12} color="#ffe8c0" decay={2} />
      <pointLight position={[16, 2.2, 6]} intensity={4} distance={8} color="#ffe0a0" decay={2} />
      <pointLight position={[14, 2.2, -10]} intensity={3.5} distance={8} color="#ffe0a0" decay={2} />
      <pointLight position={[16, 2.5, -14]} intensity={5} distance={9} color="#ffe8c0" decay={2} />
    </group>
  )
}
