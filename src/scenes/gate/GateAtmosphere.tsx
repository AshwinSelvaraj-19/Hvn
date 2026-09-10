import { useMemo } from 'react'
import * as THREE from 'three'

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
  void main() {
    float h = normalize(vDir).y;
    vec3 color = mix(uHorizon, uTop, pow(max(h, 0.0), 0.5));
    gl_FragColor = vec4(color, 1.0);
  }
`

/**
 * Atmosphere for The Gate — luminous, conclusive celestial sky with fog.
 */
export function GateAtmosphere() {
  const skyMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        fog: false,
        uniforms: {
          uTop: { value: new THREE.Color('#6aadde') },
          uHorizon: { value: new THREE.Color('#fff4e0') },
        },
        vertexShader: SKY_VERTEX,
        fragmentShader: SKY_FRAGMENT,
      }),
    [],
  )

  return (
    <group>
      <mesh material={skyMaterial} scale={400}>
        <sphereGeometry args={[1, 24, 16]} />
      </mesh>
      <fog attach="fog" args={['#d0d8e0', 60, 180]} />
    </group>
  )
}
