/**
 * Lighting for The Worlds — cinematic, energetic, activity-focused.
 * Soft key light with balanced fill and controlled shadow falloff.
 */
export function WorldsLighting() {
  return (
    <group>
      <directionalLight
        position={[32, 48, -22]}
        intensity={1.8}
        color="#fff4e0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-42}
        shadow-camera-right={42}
        shadow-camera-top={42}
        shadow-camera-bottom={-38}
        shadow-camera-near={8}
        shadow-camera-far={130}
        shadow-bias={-0.0003}
        shadow-normalBias={0.04}
        shadow-radius={3}
      />
      <hemisphereLight args={['#d0e4f5', '#8a7a5a', 0.5]} />
      <pointLight position={[-6, 2.6, 5]} intensity={5} distance={10} color="#ffe0a0" decay={2} />
      <pointLight position={[6, 2.6, 5]} intensity={5} distance={10} color="#ffe0a0" decay={2} />
      <pointLight position={[-6, 2.6, -5]} intensity={4.5} distance={9} color="#ffe0a0" decay={2} />
      <pointLight position={[6, 2.6, -5]} intensity={4.5} distance={9} color="#ffe0a0" decay={2} />
      <pointLight position={[-2, 2.4, 24]} intensity={3.5} distance={8} color="#ffe0a0" decay={2} />
      <pointLight position={[2, 2.4, 24]} intensity={3.5} distance={8} color="#ffe0a0" decay={2} />
      <pointLight position={[-15, 3.0, 8]} intensity={6} distance={10} color="#ffe8c0" decay={2} />
      <pointLight position={[0, 4.0, -18]} intensity={8} distance={14} color="#ffffff" decay={2} />
      <pointLight position={[-3, 3.5, -14]} intensity={4} distance={8} color="#4a7fa8" decay={2} />
      <pointLight position={[3, 3.5, -14]} intensity={4} distance={8} color="#4a8a5a" decay={2} />
      <pointLight position={[16, 2.0, -8]} intensity={3.5} distance={7} color="#ffe0a0" decay={2} />
      <pointLight position={[-16, 2.5, -14]} intensity={5} distance={8} color="#c9a84c" decay={2} />
    </group>
  )
}
