'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type Props = { position?: [number, number, number]; scale?: number; reducedMotion?: boolean };
const angles = [Math.PI / 4, 3 * Math.PI / 4, 5 * Math.PI / 4, 7 * Math.PI / 4];
const shell = { color: '#872f38', roughness: 0.42, metalness: 0.3 };
const graphite = { color: '#202a33', roughness: 0.6, metalness: 0.45 };

function Rotor({ position, direction, reducedMotion }: { position: [number, number, number]; direction: number; reducedMotion: boolean }) {
  const blades = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if (blades.current && !reducedMotion) blades.current.rotation.y += Math.min(delta, 0.05) * 55 * direction; });
  return <group position={position}>
    <mesh><cylinderGeometry args={[0.033, 0.039, 0.065, 16]} /><meshStandardMaterial {...graphite} /></mesh>
    <mesh position={[0, 0.036, 0]}><cylinderGeometry args={[0.022, 0.03, 0.016, 16]} /><meshStandardMaterial color="#9ca8b2" metalness={0.7} roughness={0.3} /></mesh>
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.052, 0]}><circleGeometry args={[0.165, 32]} /><meshBasicMaterial color="#52616e" transparent opacity={reducedMotion ? 0 : 0.08} depthWrite={false} side={THREE.DoubleSide} /></mesh>
    <group ref={blades} position={[0, 0.055, 0]}>
      {[0, Math.PI].map(a => <mesh key={a} rotation={[0, a, 0]} position={[Math.cos(a) * 0.075, 0, 0]} scale={[1, 0.1, 0.24]}><sphereGeometry args={[0.09, 12, 6]} /><meshStandardMaterial {...graphite} /></mesh>)}
    </group>
    <mesh position={[0, 0.058, 0]}><sphereGeometry args={[0.024, 12, 8]} /><meshStandardMaterial {...shell} /></mesh>
  </group>;
}

export const DroneModel = ({ position = [0, 0, 0], scale = 1, reducedMotion = false }: Props) => {
  const body = useRef<THREE.Group>(null);
  const time = useRef(0);
  useFrame((_, delta) => {
    if (!body.current || reducedMotion) return;
    time.current += Math.min(delta, 0.05);
    body.current.position.y = position[1] + Math.sin(time.current * 2) * 0.012;
    body.current.rotation.x = Math.sin(time.current * 0.7) * 0.035;
    body.current.rotation.z = Math.cos(time.current * 0.8) * 0.025;
  });
  return <group ref={body} position={position} scale={scale}>
    {/* Rounded survey-aircraft shell and lower chassis. Local Y is up. */}
    <mesh scale={[0.18, 0.065, 0.115]}><sphereGeometry args={[1, 24, 16]} /><meshStandardMaterial {...shell} /></mesh>
    <mesh position={[0, -0.027, 0]} scale={[0.16, 0.047, 0.105]}><sphereGeometry args={[1, 20, 12]} /><meshStandardMaterial {...graphite} /></mesh>
    <mesh position={[-0.015, 0.054, 0]} scale={[0.115, 0.021, 0.068]}><sphereGeometry args={[1, 16, 10]} /><meshStandardMaterial color="#b45256" roughness={0.4} metalness={0.3} /></mesh>
    {[-1, 1].map(side => <group key={side}>
      {[0, 1, 2].map(i => <mesh key={i} position={[-0.055 + i * 0.035, 0.057, side * 0.062]} rotation={[0, 0, -0.15]}><boxGeometry args={[0.018, 0.006, 0.022]} /><meshStandardMaterial {...graphite} /></mesh>)}
      <mesh position={[0.13, 0.008, side * 0.07]}><sphereGeometry args={[0.013, 10, 8]} /><meshStandardMaterial color="#111d28" metalness={0.4} roughness={0.15} /></mesh>
    </group>)}
    {/* Suspended gimbal and forward-facing camera lens. */}
    <mesh position={[0.115, -0.067, 0]}><boxGeometry args={[0.025, 0.07, 0.07]} /><meshStandardMaterial color="#85939e" metalness={0.7} roughness={0.35} /></mesh>
    <group position={[0.145, -0.1, 0]}>
      <mesh scale={[1, 0.8, 1]}><sphereGeometry args={[0.05, 16, 12]} /><meshStandardMaterial {...graphite} /></mesh>
      <mesh position={[0.04, 0, 0]} rotation={[0, 0, -Math.PI / 2]}><cylinderGeometry args={[0.028, 0.031, 0.025, 20]} /><meshStandardMaterial color="#788a98" metalness={0.8} roughness={0.2} /></mesh>
      <mesh position={[0.054, 0, 0]} rotation={[0, Math.PI / 2, 0]}><circleGeometry args={[0.023, 20]} /><meshStandardMaterial color="#12364c" metalness={0.7} roughness={0.08} /></mesh>
    </group>
    {/* Compact mapping sensor on the top deck. */}
    <mesh position={[-0.07, 0.085, 0]}><cylinderGeometry args={[0.028, 0.034, 0.038, 16]} /><meshStandardMaterial {...graphite} /></mesh>
    <mesh position={[-0.07, 0.098, 0]}><cylinderGeometry args={[0.029, 0.029, 0.012, 16]} /><meshStandardMaterial color="#4a8293" metalness={0.5} roughness={0.2} /></mesh>
    {angles.map((angle, i) => {
      const x = Math.cos(angle) * 0.38, z = Math.sin(angle) * 0.38;
      return <group key={angle}>
        <mesh position={[x / 2, -0.005, z / 2]} rotation={[0, -angle, Math.PI / 2]}><capsuleGeometry args={[0.019, 0.34, 4, 8]} /><meshStandardMaterial {...graphite} /></mesh>
        <mesh position={[x * 0.65, 0.012, z * 0.65]} rotation={[0, -angle, 0]}><boxGeometry args={[0.12, 0.009, 0.033]} /><meshStandardMaterial {...shell} /></mesh>
        <Rotor position={[x, 0.008, z]} direction={i % 2 ? 1 : -1} reducedMotion={reducedMotion} />
        <mesh position={[x, -0.035, z]}><sphereGeometry args={[0.012, 8, 6]} /><meshBasicMaterial color={x > 0 ? '#7ed2b4' : '#d65a5c'} /></mesh>
        <mesh position={[x * 0.76, -0.075, z * 0.76]} rotation={[0, -angle, 0.15]}><capsuleGeometry args={[0.008, 0.09, 3, 6]} /><meshStandardMaterial {...graphite} /></mesh>
      </group>;
    })}
  </group>;
};
