import * as THREE from 'three';

// Shared mutable drone position — FlyingDrone writes, PointCloudScene reads
export const dronePosition = new THREE.Vector3(0, 0, 4);
