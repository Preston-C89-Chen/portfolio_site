'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { dronePosition, droneVelocity } from './dronePosition';
import { buildLidarSurface } from './lidarGeometry';
import { RooftopFlow } from './RooftopFlow';

type Props = { cityData: { polygons: number[][][] } | null; reducedMotion?: boolean };

export const PointCloudScene = ({ cityData, reducedMotion = false }: Props) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const elapsed = useRef(0);
  const surface = useMemo(() => buildLidarSurface(cityData?.polygons ?? []), [cityData]);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 }, uReveal: { value: reducedMotion ? 1 : 0 },
    uDrone: { value: new THREE.Vector3() }, uVelocity: { value: new THREE.Vector3() }, uMotion: { value: reducedMotion ? 0 : 1 },
  }), [reducedMotion]);
  useFrame((_, delta) => {
    if (!materialRef.current) return;
    elapsed.current += Math.min(delta, 0.05);
    uniforms.uTime.value = reducedMotion ? 0 : elapsed.current;
    uniforms.uReveal.value = reducedMotion ? 1 : Math.min(1, elapsed.current / 0.65);
    uniforms.uDrone.value.copy(dronePosition);
    uniforms.uVelocity.value.copy(droneVelocity);
  });
  return <><points frustumCulled={false}>
    <bufferGeometry>
      <bufferAttribute attach="attributes-position" array={surface.positions} count={surface.count} itemSize={3} />
      <bufferAttribute attach="attributes-intensity" array={surface.intensities} count={surface.count} itemSize={1} />
    </bufferGeometry>
    <shaderMaterial ref={materialRef} uniforms={uniforms} transparent depthWrite={false}
      vertexShader={`
        attribute float intensity;
        varying float vIntensity;
        varying vec3 vPosition;
        void main() {
          vIntensity = intensity;
          vPosition = position;
          vec3 p = position;
          vec4 view = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * view;
          gl_PointSize = clamp(32.0 / max(1.0, -view.z), 1.3, 3.8);
        }
      `}
      fragmentShader={`
        uniform float uTime; uniform float uReveal; uniform float uMotion;
        uniform vec3 uDrone;
        varying float vIntensity; varying vec3 vPosition;
        void main() {
          float radius = length(gl_PointCoord - 0.5);
          if (radius > 0.5) discard;
          float proximity = 1.0 - smoothstep(0.0, 3.2, distance(vPosition.xy, uDrone.xy));
          float elevation = clamp(vPosition.z, 0.0, 1.0);
          // Keep roof and street hues steady; warm variation lives in airborne returns.
          vec3 navy = vec3(0.035, 0.10, 0.19);
          vec3 blue = vec3(0.13, 0.35, 0.53);
          vec3 color = mix(navy, blue, (vIntensity - 0.65) / 0.35);
          float edge = 1.0 - smoothstep(4.0, 5.0, max(abs(vPosition.x), abs(vPosition.y)));
          float alpha = (0.65 + elevation * 0.25 + proximity * 0.1) * vIntensity;
          gl_FragColor = vec4(color, alpha * edge * uReveal * (1.0 - smoothstep(0.3, 0.5, radius)));
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `}
    />
  </points>
    <RooftopFlow roofs={surface.roofPositions} uniforms={uniforms} />
  </>;
};
