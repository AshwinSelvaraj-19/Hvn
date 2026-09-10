import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Instances, Instance } from '@react-three/drei'
import * as THREE from 'three'
import type { Group } from 'three'

const SKY_VERTEX = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const SKY_FRAGMENT = /* glsl */ `
  varying vec3 vDir;
  uniform vec3 uTop;
  uniform vec3 uHorizon;
  uniform vec3 uGround;
  void main() {
    float h = normalize(vDir).y;
    vec3 color;
    if (h > 0.0) {
      color = mix(uHorizon, uTop, pow(h, 0.45));
    } else {
      color = mix(uHorizon, uGround, pow(-h, 0.6));
    }
    gl_FragColor = vec4(color, 1.0);
  }
`

interface CloudBankProps {
  position: [number, number, number]
  scale: [number, number, number]
  count: number
  opacity: number
  drift: number
  seed?: number
}

/**
 * Realistic cloud bank — soft, volumetric puffs with natural formation.
 */
function CloudBank({ position, scale, count, opacity, drift, seed = 0 }: CloudBankProps) {
  const group = useRef<Group>(null)

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#f0ece6',
        roughness: 1,
        metalness: 0,
        transparent: true,
        opacity,
        depthWrite: false,
      }),
    [opacity],
  )

  const puffs = useMemo(() => {
    const list: Array<{ x: number; y: number; z: number; sx: number; sy: number; sz: number }> = []
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + seed
      const radius = 0.4 + (((i * 37 + seed * 11) % 100) / 100) * 1.4
      list.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius * 0.55,
        y: (((i * 53 + seed * 7) % 100) / 100) * 0.3,
        sx: 0.6 + (((i * 29 + seed * 13) % 100) / 100) * 1.0,
        sy: 0.2 + (((i * 41 + seed * 9) % 100) / 100) * 0.15,
        sz: 0.5 + (((i * 17 + seed * 5) % 100) / 100) * 0.8,
      })
    }
    return list
  }, [count, seed])

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * drift
      // Gentle lateral drift for natural cloud motion
      group.current.position.x += delta * drift * 0.6
      // Wrap position
      if (group.current.position.x > position[0] + 6) {
        group.current.position.x = position[0] - 6
      }
    }
  })

  return (
    <group ref={group} position={position} scale={scale}>
      <Instances limit={puffs.length} material={material}>
        <sphereGeometry args={[1, 10, 8]} />
        {puffs.map((p, i) => (
          <Instance
            key={i}
            position={[p.x, p.y, p.z]}
            scale={[p.sx, p.sy, p.sz]}
          />
        ))}
      </Instances>
    </group>
  )
}

/**
 * Premium celestial sky — layered gradient dome with realistic clouds.
 *
 * Sky gradient transitions from deep blue at zenith to warm horizon.
 * Cloud layers provide depth and atmosphere without obscuring the world.
 */
export function ArrivalAtmosphere() {
  const skyMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        fog: false,
        uniforms: {
          uTop: { value: new THREE.Color('#4a80b0') },
          uHorizon: { value: new THREE.Color('#d0dce8') },
          uGround: { value: new THREE.Color('#8a9080') },
        },
        vertexShader: SKY_VERTEX,
        fragmentShader: SKY_FRAGMENT,
      }),
    [],
  )

  useEffect(() => () => skyMaterial.dispose(), [skyMaterial])

  return (
    <group>
      {/* Sky dome */}
      <mesh material={skyMaterial} scale={420}>
        <sphereGeometry args={[1, 28, 18]} />
      </mesh>

      {/* Cloud sea — distant, atmospheric */}
      <CloudBank position={[-44, -8, -36]} scale={[24, 5, 14]} count={14} opacity={0.5} drift={0.012} seed={1} />
      <CloudBank position={[36, -9, -42]} scale={[28, 5, 16]} count={16} opacity={0.45} drift={0.01} seed={2} />
      <CloudBank position={[-26, -8, 46]} scale={[22, 5, 13]} count={12} opacity={0.5} drift={0.014} seed={3} />
      <CloudBank position={[48, -10, 12]} scale={[20, 4, 12]} count={12} opacity={0.45} drift={0.012} seed={4} />
      <CloudBank position={[14, -8, 52]} scale={[22, 5, 13]} count={13} opacity={0.42} drift={0.011} seed={5} />

      {/* Mid-level clouds — subtle depth layer */}
      <CloudBank position={[-18, 8, -28]} scale={[12, 3, 7]} count={8} opacity={0.28} drift={0.018} seed={9} />
      <CloudBank position={[22, 10, -32]} scale={[14, 3, 8]} count={9} opacity={0.25} drift={0.015} seed={10} />

      {/* High cirrus — very sparse, very high */}
      <CloudBank position={[-30, 32, -46]} scale={[16, 3, 9]} count={8} opacity={0.22} drift={0.022} seed={6} />
      <CloudBank position={[40, 38, 16]} scale={[18, 3, 10]} count={9} opacity={0.2} drift={0.018} seed={7} />
      <CloudBank position={[-14, 44, 36]} scale={[20, 3, 11]} count={10} opacity={0.18} drift={0.016} seed={8} />

      {/* Atmospheric fog — subtle distance haze */}
      <fog attach="fog" args={['#d0d8e0', 60, 180]} />
    </group>
  )
}
