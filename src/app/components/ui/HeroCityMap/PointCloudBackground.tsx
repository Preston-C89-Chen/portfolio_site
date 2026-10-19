'use client';

import { useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { PointCloudScene } from './PointCloudScene';
import { FlyingDrone } from './FlyingDrone';
import { CloudPoints } from './CloudPoints';
import { CITY_DESCENT_SECONDS } from './scanTiming';

type CityData = {
  name: string;
  polygons: number[][][];
};

const CITY_FILE_MAP: Record<string, string> = {
  Portland: 'portland',
  'New York': 'new-york',
  Sacramento: 'sacramento',
  Irvine: 'irvine',
  Paris: 'paris',
  Dubai: 'dubai',
  Rome: 'rome',
  Tunis: 'tunis',
  Osaka: 'osaka',
  'San Francisco': 'san-francisco',
  Atlanta: 'atlanta',
  Boston: 'boston',
};

const cityCache = new Map<string, CityData>();

async function loadCity(name: string): Promise<CityData | null> {
  const slug = CITY_FILE_MAP[name];
  if (!slug) return null;
  if (cityCache.has(slug)) return cityCache.get(slug)!;

  try {
    const res = await fetch(`/cities/${slug}.json`);
    if (!res.ok) return null;
    const data = await res.json();
    cityCache.set(slug, data);
    return data;
  } catch {
    return null;
  }
}

function useFinePointer() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return enabled;
}

function DescentCamera({ reducedMotion }: { reducedMotion: boolean }) {
  const elapsed = useRef(0);
  const target = useRef(new THREE.Vector3()).current;
  useFrame(({ camera, size }, delta) => {
    elapsed.current += Math.min(delta, 0.05);
    const p = reducedMotion ? 1 : Math.min(1, elapsed.current / CITY_DESCENT_SECONDS);
    const ease = p * p * (3 - 2 * p);
    camera.up.set(0, 0, 1);
    camera.position.set(0.4, -3.0 - ease * 2.5, 12 - ease * 4.2);
    target.set(size.width > size.height ? -0.65 : 0, 0, 0);
    camera.lookAt(target);
  });
  return null;
}

const PointCloudBackground = ({ cityName, reducedMotion = false }: { cityName: string; reducedMotion?: boolean }) => {
  const [data, setData] = useState<CityData | null>(null);
  const hasFinePointer = useFinePointer();
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const hero = document.querySelector('[data-hero-section]');
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let current = true;
    setData(null);
    loadCity(cityName).then(next => { if (current) setData(next); });
    return () => { current = false; };
  }, [cityName]);

  return (
    <Canvas
      camera={{
        position: [0.4, -3, 12],
        fov: 48,
        near: 0.1,
        far: 100,
      }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      frameloop={visible && !reducedMotion ? 'always' : 'demand'}
      style={{ background: 'transparent' }}
    >
      {/* Lighting for drone */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={2.0} color="#ffffff" />
      <directionalLight position={[-3, 4, -2]} intensity={0.8} color="#ccddee" />
      <directionalLight position={[0, -5, 3]} intensity={0.5} color="#ffffff" />

      {data && <group key={cityName}>
        <DescentCamera reducedMotion={reducedMotion} />
        <PointCloudScene cityData={data} reducedMotion={reducedMotion} />
        <CloudPoints reducedMotion={reducedMotion} />
        <FlyingDrone interactive={hasFinePointer && !reducedMotion} reducedMotion={reducedMotion} scale={hasFinePointer ? 0.85 : 0.55} />
      </group>}
    </Canvas>
  );
};

export default PointCloudBackground;
