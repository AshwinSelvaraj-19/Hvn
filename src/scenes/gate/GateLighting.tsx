/**
 * Lighting for The Gate — cinematic, warm, luminous.
 * Soft key light with balanced fill and controlled shadow falloff.
 */
export function GateLighting() {
  return (
    <group>
      <directionalLight
        position={[28, 40, -28]}
        intensity={1.8}
        color="#fff4e0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-38}
        shadow-camera-right={38}
        shadow-camera-top={38}
        shadow-camera-bottom={-35}
        shadow-camera-near={8}
        shadow-camera-far={110}
        shadow-bias={-0.0003}
        shadow-normalBias={0.04}
        shadow-radius={3}
      />
      <hemisphereLight args={['#d8e8f8', '#8a7a5a', 0.5]} />
      <pointLight position={[-2.8, 5.0, -14]} intensity={5} distance={10} color="#ffe0a0" decay={2} />
      <pointLight position={[2.8, 5.0, -14]} intensity={5} distance={10} color="#ffe0a0" decay={2} />
      <pointLight position={[0, 3.5, -14.5]} intensity={8} distance={12} color="#f5f0e6" decay={2} />
      <pointLight position={[-5, 2.4, -4]} intensity={4} distance={8} color="#ffe0a0" decay={2} />
      <pointLight position={[5, 2.4, -4]} intensity={4} distance={8} color="#ffe0a0" decay={2} />
      <pointLight position={[-2, 2.2, 16]} intensity={3} distance={7} color="#ffe0a0" decay={2} />
      <pointLight position={[2, 2.2, 16]} intensity={3} distance={7} color="#ffe0a0" decay={2} />
      <pointLight position={[-2, 2.2, 10]} intensity={2.5} distance={6} color="#ffe0a0" decay={2} />
      <pointLight position={[2, 2.2, 10]} intensity={2.5} distance={6} color="#ffe0a0" decay={2} />
      <pointLight position={[0, 2.0, -20]} intensity={3.5} distance={7} color="#d0e0f0" decay={2} />
      <pointLight position={[0, 2.5, -2]} intensity={4} distance={7} color="#c9a84c" decay={2} />
    </group>
  )
}
