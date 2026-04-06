'use client';

import { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { dronePosition } from './dronePosition';

type CityData = {
  name: string;
  polygons: number[][][];
};

type PointCloudSceneProps = {
  cityData: CityData | null;
};

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

type PointData = {
  basePositions: Float32Array; // x, y per point
  heights: Float32Array;      // base height (building = elevated, street = 0)
  phases: Float32Array;
  speeds: Float32Array;
  count: number;
};

function addPoint(
  baseX: number[], baseY: number[], heights: number[],
  phases: number[], speeds: number[], rand: () => number,
  px: number, py: number, height: number,
) {
  baseX.push(px);
  baseY.push(py);
  heights.push(height);
  phases.push(rand() * Math.PI * 2);
  speeds.push(0.2 + rand() * 0.6);
}

function generatePointData(polygons: number[][][]): PointData {
  const baseX: number[] = [];
  const baseY: number[] = [];
  const heights: number[] = [];
  const phases: number[] = [];
  const speeds: number[] = [];
  const rand = seededRandom(42);
  const edgeSpacing = 0.003;

  for (const poly of polygons) {
    if (poly.length < 2) continue;

    // Consistent building height per polygon
    const buildingHeight = 0.3 + rand() * 1.2;

    // Edge points
    for (let i = 0; i < poly.length - 1; i++) {
      const x0 = poly[i][0], y0 = poly[i][1];
      const x1 = poly[i + 1][0], y1 = poly[i + 1][1];
      const dx = x1 - x0, dy = y1 - y0;
      const len = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.max(1, Math.floor(len / edgeSpacing));

      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const px = (x0 + dx * t - 0.5) * 10 + (rand() - 0.5) * 0.01;
        const py = -(y0 + dy * t - 0.5) * 7 + (rand() - 0.5) * 0.01;
        addPoint(baseX, baseY, heights, phases, speeds, rand, px, py, buildingHeight);
      }
    }

    // Fill interior
    if (poly.length < 3) continue;
    let minX = Infinity, maxX2 = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const pt of poly) {
      if (pt[0] < minX) minX = pt[0];
      if (pt[0] > maxX2) maxX2 = pt[0];
      if (pt[1] < minY) minY = pt[1];
      if (pt[1] > maxY) maxY = pt[1];
    }
    const fillSpacing = 0.005;
    for (let fx = minX; fx <= maxX2; fx += fillSpacing) {
      for (let fy = minY; fy <= maxY; fy += fillSpacing) {
        let inside = false;
        for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
          const xi = poly[i][0], yi = poly[i][1];
          const xj = poly[j][0], yj = poly[j][1];
          if ((yi > fy) !== (yj > fy) && fx < (xj - xi) * (fy - yi) / (yj - yi) + xi) {
            inside = !inside;
          }
        }
        if (inside) {
          const px = (fx - 0.5) * 10 + (rand() - 0.5) * 0.015;
          const py = -(fy - 0.5) * 7 + (rand() - 0.5) * 0.015;
          addPoint(baseX, baseY, heights, phases, speeds, rand, px, py, buildingHeight);
        }
      }
    }
  }

  const count = baseX.length;
  const bp = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    bp[i * 2] = baseX[i];
    bp[i * 2 + 1] = baseY[i];
  }

  return {
    basePositions: bp,
    heights: new Float32Array(heights),
    phases: new Float32Array(phases),
    speeds: new Float32Array(speeds),
    count,
  };
}

// DEM-style color ramp: full spectrum from near-black to near-white
function heightToColor(h: number, maxH: number): [number, number, number] {
  const t = Math.min(h / maxH, 1);
  // Near-black → mid-gray → light silver
  const r = 0.02 + t * 0.88;
  const g = 0.02 + t * 0.86;
  const b = 0.02 + t * 0.82;
  return [r, g, b];
}

export const PointCloudScene: React.FC<PointCloudSceneProps> = ({ cityData }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const geoRef = useRef<THREE.BufferGeometry>(null);
  const dataRef = useRef<PointData | null>(null);
  const posAttrRef = useRef<THREE.Float32BufferAttribute | null>(null);
  const colAttrRef = useRef<THREE.Float32BufferAttribute | null>(null);
  // Per-point accumulated time so speed changes don't cause position jumps
  const accTimeRef = useRef<Float32Array | null>(null);

  const pointData = useMemo(() => {
    if (!cityData) return null;
    return generatePointData(cityData.polygons);
  }, [cityData]);

  useEffect(() => {
    if (!geoRef.current || !pointData) return;
    dataRef.current = pointData;

    const positions = new Float32Array(pointData.count * 3);
    const colors = new Float32Array(pointData.count * 3);

    const posAttr = new THREE.Float32BufferAttribute(positions, 3);
    const colAttr = new THREE.Float32BufferAttribute(colors, 3);

    geoRef.current.setAttribute('position', posAttr);
    geoRef.current.setAttribute('color', colAttr);
    posAttrRef.current = posAttr;
    colAttrRef.current = colAttr;
    accTimeRef.current = new Float32Array(pointData.count);

    geoRef.current.computeBoundingSphere();
  }, [pointData]);

  useFrame(({ clock }, delta) => {
    const d = dataRef.current;
    const posAttr = posAttrRef.current;
    const colAttr = colAttrRef.current;
    const acc = accTimeRef.current;
    if (!d || !posAttr || !colAttr || !acc) return;

    const time = clock.elapsedTime;
    const pos = posAttr.array as Float32Array;
    const col = colAttr.array as Float32Array;

    // Drone position in scene space
    const dx = dronePosition.x;
    const dy = dronePosition.y;
    const INFLUENCE_RADIUS = 4.0;
    const MAX_BOOST = 4.0; // near the drone, animate 4x faster

    for (let i = 0; i < d.count; i++) {
      const bx = d.basePositions[i * 2];
      const by = d.basePositions[i * 2 + 1];
      const baseH = d.heights[i];
      const phase = d.phases[i];
      const speed = d.speeds[i];

      // Distance from point to drone (xy plane)
      const ddx = bx - dx;
      const ddy = by - dy;
      const dist = Math.sqrt(ddx * ddx + ddy * ddy);
      // Proximity factor: 1 at drone, 0 at radius edge
      const proximity = Math.max(0, 1 - dist / INFLUENCE_RADIUS);
      // Smooth falloff
      const smooth = proximity * proximity * (3 - 2 * proximity);
      const boost = 1 + smooth * (MAX_BOOST - 1);

      // Accumulate per-point time — smooth even when boost changes
      acc[i] += delta * speed * boost;

      // Particles rise upward from building footprint, recycle back down
      const maxRise = 1.5 + baseH;
      const localTime = acc[i] + phase;
      const rise = localTime - Math.floor(localTime / maxRise) * maxRise;
      const z = rise;

      // Drift outward as particles climb
      const drift = Math.sin(time * 0.4 + phase) * rise * 0.03;
      const sway = Math.cos(time * 0.3 + phase * 1.5) * rise * 0.02;

      pos[i * 3] = bx + drift;
      pos[i * 3 + 1] = by + sway;
      pos[i * 3 + 2] = z;

      // Dark at base, fades lighter as particles rise
      const t = rise / maxRise;
      const base = 0.03;
      const brightness = base + t * 0.35;
      col[i * 3] = brightness;
      col[i * 3 + 1] = brightness;
      col[i * 3 + 2] = brightness;
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;

    // Very slow rotation
    if (pointsRef.current) {
      pointsRef.current.rotation.z = Math.sin(time * 0.06) * 0.02;
    }
  });

  if (!pointData) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geoRef} />
      <pointsMaterial
        size={0.5}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  );
};
