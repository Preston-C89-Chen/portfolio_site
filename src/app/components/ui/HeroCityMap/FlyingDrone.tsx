'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { DroneModel } from './DroneModel';
import { dronePosition, droneVelocity } from './dronePosition';
import { CITY_DESCENT_SECONDS } from './scanTiming';

type Props = { interactive?: boolean; scale?: number; reducedMotion?: boolean };

export const FlyingDrone = ({ interactive = true, scale = 1.2, reducedMotion = false }: Props) => {
  const pivot = useRef<THREE.Group>(null);
  const pointer = useRef(new THREE.Vector2());
  const tracking = useRef(false);
  const current = useRef(new THREE.Vector3(0, 0, 5.2));
  const flightTime = useRef(0);
  const raycaster = useRef(new THREE.Raycaster());
  const plane = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), -2.5));
  const target = useRef(new THREE.Vector3());
  const { camera } = useThree();

  useEffect(() => {
    droneVelocity.set(0, 0, 0);
    tracking.current = false;
    if (!interactive || reducedMotion) return;
    const hero = document.querySelector<HTMLElement>('[data-hero-section]');
    if (!hero) return;
    const move = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const rect = hero.getBoundingClientRect();
      pointer.current.set(
        THREE.MathUtils.clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -0.9, 0.9),
        THREE.MathUtils.clamp(1 - ((event.clientY - rect.top) / rect.height) * 2, -0.85, 0.85),
      );
      tracking.current = true;
    };
    const leave = () => { tracking.current = false; };
    hero.addEventListener('pointermove', move);
    hero.addEventListener('pointerenter', move);
    hero.addEventListener('pointerleave', leave);
    window.addEventListener('blur', leave);
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) leave(); });
    observer.observe(hero);
    return () => {
      hero.removeEventListener('pointermove', move);
      hero.removeEventListener('pointerenter', move);
      hero.removeEventListener('pointerleave', leave);
      window.removeEventListener('blur', leave);
      observer.disconnect();
    };
  }, [interactive, reducedMotion]);

  useFrame((_, delta) => {
    if (!pivot.current) return;
    flightTime.current += Math.min(delta, 0.05);
    const seconds = reducedMotion ? CITY_DESCENT_SECONDS : flightTime.current;
    const progress = Math.min(1, seconds / CITY_DESCENT_SECONDS);
    const altitude = 5.2 - 2.7 * progress * progress * (3 - 2 * progress);
    const t = reducedMotion ? 0.5 : seconds * 0.15;
    const destination = target.current;
    destination.set(Math.sin(t) * 3.0, Math.sin(t * 2) * 1.7, altitude);
    let following = false;
    if (interactive && tracking.current && !reducedMotion) {
      // Reproject every frame: the camera and altitude both change on descent.
      plane.current.constant = -altitude;
      raycaster.current.setFromCamera(pointer.current, camera);
      following = raycaster.current.ray.intersectPlane(plane.current, destination) !== null;
    }
    const position = current.current;
    const dx = destination.x - position.x, dy = destination.y - position.y;
    const step = Math.min(delta, 0.05);
    let damping = reducedMotion ? 1 : 1 - Math.exp(-(following ? 1.15 : 1.5) * step);
    // Limit long pointer jumps as well as easing near the cursor.
    if (following) damping = Math.min(damping, 1.4 * step / Math.max(0.001, Math.hypot(dx, dy)));
    const velocityBlend = 1 - Math.exp(-3 * step);
    const vx = reducedMotion ? 0 : dx * damping / Math.max(step, 0.001);
    const vy = reducedMotion ? 0 : dy * damping / Math.max(step, 0.001);
    droneVelocity.x += (vx - droneVelocity.x) * velocityBlend;
    droneVelocity.y += (vy - droneVelocity.y) * velocityBlend;
    position.x += dx * damping;
    position.y += dy * damping;
    position.z = altitude;
    pivot.current.position.copy(position);
    dronePosition.copy(position);
    if (Math.hypot(dx, dy) > 0.02) {
      // Model nose is local +X. Smooth heading across the -pi/pi boundary.
      const desired = Math.atan2(dy, dx);
      const turn = Math.atan2(Math.sin(desired - pivot.current.rotation.z), Math.cos(desired - pivot.current.rotation.z));
      pivot.current.rotation.z += turn * Math.min(1, damping * 1.5);
    }
    const bank = reducedMotion ? 0 : THREE.MathUtils.clamp(dy * 0.04, -0.13, 0.13);
    pivot.current.rotation.x += (bank - pivot.current.rotation.x) * damping;
  });

  return <group ref={pivot} renderOrder={10}>
    <group rotation={[Math.PI / 2, 0, 0]}><DroneModel scale={scale} reducedMotion={reducedMotion} /></group>
  </group>;
};
