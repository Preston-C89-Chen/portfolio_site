'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { DroneModel } from './DroneModel';

const PROXIMITY_THRESHOLD = 3.0;
const TRACKING_LERP = 0.03;
const PATROL_LERP = 0.015;

type FlyingDroneProps = {
  interactive?: boolean;
  scale?: number;
};

export const FlyingDrone = ({ interactive = true, scale = 1.2 }: FlyingDroneProps) => {
  const pivotRef = useRef<THREE.Group>(null);
  const mouseWorldRef = useRef(new THREE.Vector3(0, 0, 3));
  const isTrackingRef = useRef(false);
  const currentPosRef = useRef(new THREE.Vector3(0, 0, 3));

  const { camera, size } = useThree();

  // Project mouse screen coords to a world plane at drone altitude
  const updateMouseWorld = useCallback((clientX: number, clientY: number) => {
    const ndc = new THREE.Vector2(
      (clientX / size.width) * 2 - 1,
      -(clientY / size.height) * 2 + 1,
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(ndc, camera);
    // Intersect with a horizontal plane at z=3 (drone altitude)
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -4);
    const target = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, target);
    if (target) {
      mouseWorldRef.current.copy(target);
    }
  }, [camera, size]);

  // Mouse event handler — only attached when hero is in view AND interactive
  useEffect(() => {
    if (!interactive) return;
    const heroSection = document.querySelector('[data-hero-section]');
    if (!heroSection) return;

    let mouseActive = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!mouseActive) return;
      // Get position relative to the canvas container
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      updateMouseWorld(x, y);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        mouseActive = entry.isIntersecting;
        if (mouseActive) {
          window.addEventListener('mousemove', onMouseMove);
        } else {
          window.removeEventListener('mousemove', onMouseMove);
          isTrackingRef.current = false;
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(heroSection);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [updateMouseWorld, interactive]);

  useFrame(({ clock }) => {
    if (!pivotRef.current) return;
    const t = clock.elapsedTime * 0.15;

    // Patrol path (figure-8)
    const patrolX = Math.sin(t) * 3.5;
    const patrolY = Math.sin(t * 2) * 1.5;
    const patrolZ = 4.0 + Math.sin(t * 0.7) * 0.5;
    const patrolPos = new THREE.Vector3(patrolX, patrolY, patrolZ);

    // Check proximity to mouse (interactive only)
    if (interactive) {
      const mousePos = mouseWorldRef.current;
      const distToMouse = patrolPos.distanceTo(
        new THREE.Vector3(mousePos.x, mousePos.y, patrolZ),
      );

      if (distToMouse < PROXIMITY_THRESHOLD) {
        isTrackingRef.current = true;
      } else if (distToMouse > PROXIMITY_THRESHOLD * 2) {
        isTrackingRef.current = false;
      }
    } else {
      isTrackingRef.current = false;
    }

    const mousePos = mouseWorldRef.current;

    // Target position
    let targetX: number, targetY: number, targetZ: number;
    let lerp: number;

    if (isTrackingRef.current) {
      targetX = mousePos.x;
      targetY = mousePos.y;
      targetZ = 4.0;
      lerp = TRACKING_LERP;
    } else {
      targetX = patrolX;
      targetY = patrolY;
      targetZ = patrolZ;
      lerp = PATROL_LERP;
    }

    // Smooth interpolation
    const cur = currentPosRef.current;
    cur.x += (targetX - cur.x) * lerp;
    cur.y += (targetY - cur.y) * lerp;
    cur.z += (targetZ - cur.z) * lerp;

    pivotRef.current.position.copy(cur);

    // Face direction of movement
    const vel = new THREE.Vector3(
      targetX - cur.x,
      targetY - cur.y,
      0,
    );
    if (vel.length() > 0.01) {
      const heading = Math.atan2(vel.y, vel.x);
      pivotRef.current.rotation.z = heading + Math.PI / 2;
      // Bank proportional to turn speed
      pivotRef.current.rotation.x = vel.length() * 0.5;
    }
  });

  return (
    <group ref={pivotRef} renderOrder={10}>
      <DroneModel scale={scale} />
    </group>
  );
};
