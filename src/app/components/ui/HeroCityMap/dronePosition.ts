import * as THREE from 'three';

// Shared mutable drone position — FlyingDrone writes, PointCloudScene reads
export const dronePosition = new THREE.Vector3(0, 0, 4);

// Smoothed actual travel velocity drives a shared directional flow field.
export const droneVelocity = new THREE.Vector3();
