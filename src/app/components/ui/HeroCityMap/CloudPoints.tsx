'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { droneVelocity } from './dronePosition';

// Deliberately separate from ground returns: soft, layered atmospheric returns.
export function CloudPoints({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const elapsed = useRef(0);
  const data = useMemo(() => {
    let seed = 733;
    const random = () => { seed = seed * 16807 % 2147483647; return (seed - 1) / 2147483646; };
    const gaussian = () => Math.sqrt(-2 * Math.log(Math.max(0.0001, random()))) * Math.cos(2 * Math.PI * random());
    const positions = [], sizes = [], tones = [];
    const clusters = [[-2.8, 2.6, 3.9], [2.8, 1.3, 4.7], [3.4, -2.7, 3.3], [-3.6, -1.8, 4.9], [0.3, 3.8, 4.3], [1.5, -3.5, 3.8]];
    for (const [x, y, z] of clusters) {
      for (let i = 0; i < 700; i++) {
        positions.push(x + gaussian() * 1.1, y + gaussian() * 0.6, z + gaussian() * 0.24);
        sizes.push(4 + random() * 8);
        tones.push(random());
      }
    }
    return { positions: new Float32Array(positions), sizes: new Float32Array(sizes), tones: new Float32Array(tones) };
  }, []);
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uVelocity: { value: new THREE.Vector3() } }), []);
  useFrame((_, delta) => {
    if (!material.current || reducedMotion) return;
    elapsed.current += Math.min(delta, 0.05);
    uniforms.uTime.value = elapsed.current;
    uniforms.uVelocity.value.copy(droneVelocity);
  });
  return <points frustumCulled={false} renderOrder={2}>
    <bufferGeometry>
      <bufferAttribute attach="attributes-position" array={data.positions} count={data.sizes.length} itemSize={3} />
      <bufferAttribute attach="attributes-size" array={data.sizes} count={data.sizes.length} itemSize={1} />
      <bufferAttribute attach="attributes-tone" array={data.tones} count={data.sizes.length} itemSize={1} />
    </bufferGeometry>
    <shaderMaterial ref={material} uniforms={uniforms} transparent depthWrite={false}
      vertexShader={`
        uniform float uTime; uniform vec3 uVelocity; attribute float size; attribute float tone; varying float vFade; varying float vTone;
        void main() {
          vTone = tone;
          vec3 p = position;
          float life = fract(uTime * 0.045 + tone);
          p.z += life * 2.0;
          p.xy += clamp(uVelocity.xy, vec2(-1.4), vec2(1.4)) * life * 0.08;
          vec4 view = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * view;
          gl_PointSize = clamp(size * (8.0 + life * 6.0) / max(1.0, -view.z), 2.5, 20.0);
          vFade = (1.0 - smoothstep(4.0, 6.0, length(position.xy))) * smoothstep(0.0, 0.1, life) * (1.0 - smoothstep(0.75, 1.0, life));
        }
      `}
      fragmentShader={`
        varying float vFade; varying float vTone;
        void main() {
          float r = length(gl_PointCoord - 0.5) * 2.0;
          if (r > 1.0) discard;
          float alpha = pow(1.0 - r * r, 2.0) * mix(0.22, 0.4, vTone) * vFade;
          vec3 slate = vec3(0.20, 0.30, 0.42);
          vec3 mist = vec3(0.48, 0.66, 0.73);
          vec3 warm = vec3(0.77, 0.70, 0.59);
          vec3 color = vTone < 0.6 ? mix(slate, mist, vTone / 0.6) : mix(mist, warm, (vTone - 0.6) / 0.4);
          gl_FragColor = vec4(color, alpha);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `}
    />
  </points>;
}
