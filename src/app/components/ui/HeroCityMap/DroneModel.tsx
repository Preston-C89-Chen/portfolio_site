'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type DroneModelProps = {
  position?: [number, number, number];
  scale?: number;
};

const ARM_LENGTH = 0.38;
const ARM_ANGLE_OFFSETS = [
  Math.PI * 0.25,
  Math.PI * 0.75,
  Math.PI * 1.25,
  Math.PI * 1.75,
];

// Dark matte material — visible against white bg
const BODY_MAT = { color: '#8b0000' };
const ACCENT_MAT = { color: '#5c0000' };
const METAL_MAT = { color: '#1a1a1a' };

const Rotor = ({ position }: { position: [number, number, number] }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 30;
  });

  return (
    <group position={position}>
      <mesh position={[0, 0.015, 0]}>
        <torusGeometry args={[0.13, 0.006, 8, 24]} />
        <meshBasicMaterial {...METAL_MAT} />
      </mesh>
      <mesh ref={ref} position={[0, 0.025, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.003, 3]} />
        <meshBasicMaterial color="#333" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.028, 0.035, 0.05, 12]} />
        <meshBasicMaterial {...BODY_MAT} />
      </mesh>
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.015, 0.028, 0.01, 12]} />
        <meshBasicMaterial {...METAL_MAT} />
      </mesh>
    </group>
  );
};

export const DroneModel = ({ position = [0, 0, 0], scale = 1 }: DroneModelProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * 2.5) * 0.03;
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.4) * 0.08;
      groupRef.current.rotation.z = Math.cos(clock.elapsedTime * 0.3) * 0.06;
    }
  });

  const armPositions: [number, number, number][] = ARM_ANGLE_OFFSETS.map((angle) => [
    Math.cos(angle) * ARM_LENGTH,
    0,
    Math.sin(angle) * ARM_LENGTH,
  ]);

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Central body */}
      <mesh>
        <boxGeometry args={[0.2, 0.06, 0.16]} />
        <meshBasicMaterial {...BODY_MAT} />
      </mesh>
      <mesh position={[0, 0.032, 0]}>
        <boxGeometry args={[0.19, 0.005, 0.15]} />
        <meshBasicMaterial {...ACCENT_MAT} />
      </mesh>
      <mesh position={[0, -0.032, 0]}>
        <boxGeometry args={[0.19, 0.005, 0.15]} />
        <meshBasicMaterial {...ACCENT_MAT} />
      </mesh>

      {/* Camera */}
      <mesh position={[0.06, -0.04, 0]}>
        <boxGeometry args={[0.035, 0.015, 0.04]} />
        <meshBasicMaterial {...BODY_MAT} />
      </mesh>
      <mesh position={[0.06, -0.055, 0]}>
        <sphereGeometry args={[0.02, 12, 12]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh position={[0.06, -0.065, 0.005]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.012, 12]} />
        <meshBasicMaterial color="#0a1a2a" />
      </mesh>

      {/* LEDs */}
      <mesh position={[0.1, 0, 0.06]}>
        <sphereGeometry args={[0.006, 6, 6]} />
        <meshBasicMaterial color="#22cc22" />
      </mesh>
      <mesh position={[0.1, 0, -0.06]}>
        <sphereGeometry args={[0.006, 6, 6]} />
        <meshBasicMaterial color="#22cc22" />
      </mesh>
      <mesh position={[-0.1, 0, 0.06]}>
        <sphereGeometry args={[0.006, 6, 6]} />
        <meshBasicMaterial color="#cc2222" />
      </mesh>
      <mesh position={[-0.1, 0, -0.06]}>
        <sphereGeometry args={[0.006, 6, 6]} />
        <meshBasicMaterial color="#cc2222" />
      </mesh>

      {/* Battery */}
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[0.12, 0.025, 0.065]} />
        <meshBasicMaterial {...BODY_MAT} />
      </mesh>

      {/* Arms + rotors + landing gear */}
      {armPositions.map((armEnd, i) => (
        <group key={i}>
          <mesh
            position={[armEnd[0] / 2, 0, armEnd[2] / 2]}
            rotation={[0, -ARM_ANGLE_OFFSETS[i] + Math.PI / 2, 0]}
          >
            <boxGeometry args={[ARM_LENGTH, 0.025, 0.028]} />
            <meshBasicMaterial {...BODY_MAT} />
          </mesh>
          <mesh
            position={[armEnd[0] / 2, -0.015, armEnd[2] / 2]}
            rotation={[0, -ARM_ANGLE_OFFSETS[i] + Math.PI / 2, 0]}
          >
            <boxGeometry args={[ARM_LENGTH * 0.6, 0.005, 0.035]} />
            <meshBasicMaterial {...ACCENT_MAT} />
          </mesh>

          <Rotor position={armEnd} />

          <mesh position={[armEnd[0] * 0.65, -0.045, armEnd[2] * 0.65]}>
            <cylinderGeometry args={[0.006, 0.006, 0.045, 6]} />
            <meshBasicMaterial {...METAL_MAT} />
          </mesh>
          <mesh
            position={[armEnd[0] * 0.65, -0.068, armEnd[2] * 0.65]}
            rotation={[0, -ARM_ANGLE_OFFSETS[i] + Math.PI / 2, 0]}
          >
            <boxGeometry args={[0.06, 0.006, 0.01]} />
            <meshBasicMaterial {...METAL_MAT} />
          </mesh>
        </group>
      ))}
    </group>
  );
};
