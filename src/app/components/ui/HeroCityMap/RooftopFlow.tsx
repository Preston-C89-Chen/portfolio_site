'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

type Uniforms = {
  uTime: { value: number }; uMotion: { value: number };
  uDrone: { value: THREE.Vector3 }; uVelocity: { value: THREE.Vector3 };
};

// Keep the measured footprint silhouette in the surface layer. These separate
// stylized returns rise from its roofs to provide continuous descent parallax.
export function RooftopFlow({ roofs, uniforms }: { roofs: Float32Array; uniforms: Uniforms }) {
  const data = useMemo(() => {
    const count = Math.min(3600, roofs.length / 3);
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const source = Math.floor(i * (roofs.length / 3) / count) * 3;
      positions.set(roofs.subarray(source, source + 3), i * 3);
      phases[i] = ((i * 16807 + 733) % 65521) / 65521;
    }
    return { positions, phases, count };
  }, [roofs]);

  return <points frustumCulled={false} renderOrder={1}>
    <bufferGeometry>
      <bufferAttribute attach="attributes-position" array={data.positions} count={data.count} itemSize={3} />
      <bufferAttribute attach="attributes-phase" array={data.phases} count={data.count} itemSize={1} />
    </bufferGeometry>
    <shaderMaterial uniforms={uniforms} transparent depthWrite={false}
      vertexShader={`
        uniform float uTime; uniform float uMotion; uniform vec3 uVelocity;
        attribute float phase;
        varying float vLife; varying float vFade; varying float vTone; varying vec2 vOrigin;
        void main() {
          float life = fract(uTime * mix(0.07, 0.12, phase) + phase);
          float rise = life * mix(3.0, 5.0, phase);
          vec3 p = position;
          p.z += rise;
          // Rise vertically, with only a light bias in the actual travel direction.
          p.xy += clamp(uVelocity.xy, vec2(-1.4), vec2(1.4)) * rise * 0.055;
          vec4 view = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * view;
          // Growing sprites and perspective together suggest passing the sensor.
          gl_PointSize = clamp((18.0 + life * life * 85.0) / max(1.5, -view.z), 1.3, 17.0);
          float envelope = smoothstep(0.0, 0.06, life) * (1.0 - smoothstep(0.65, 1.0, life));
          float edge = 1.0 - smoothstep(4.0, 5.0, max(abs(position.x), abs(position.y)));
          vLife = life; vTone = phase; vOrigin = position.xy;
          vFade = envelope * edge * uMotion;
        }
      `}
      fragmentShader={`
        uniform vec3 uDrone;
        varying float vLife; varying float vFade; varying float vTone; varying vec2 vOrigin;
        void main() {
          float r = length(gl_PointCoord - 0.5) * 2.0;
          if (r > 1.0) discard;
          float nearDrone = 1.0 - smoothstep(0.0, 3.2, distance(vOrigin, uDrone.xy));
          float tone = vTone;
          vec3 blue = vec3(0.08, 0.24, 0.43);
          vec3 teal = vec3(0.35, 0.63, 0.73);
          vec3 amber = vec3(0.8, 0.58, 0.28);
          vec3 color = tone < 0.55 ? mix(blue, teal, tone / 0.55) : mix(teal, amber, (tone - 0.55) / 0.45);
          float softEdge = 1.0 - smoothstep(0.25, 1.0, r);
          gl_FragColor = vec4(color, vFade * softEdge * mix(0.65, 0.3, vLife));
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `}
    />
  </points>;
}
