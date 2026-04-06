'use client';

import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PointCloudScene } from './PointCloudScene';
import { FlyingDrone } from './FlyingDrone';

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

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => {
      // Desktop: width >= 1024 and landscape orientation, and not a touch-primary device
      const wide = window.innerWidth >= 1024;
      const landscape = window.innerWidth > window.innerHeight;
      const noTouch = !window.matchMedia('(pointer: coarse)').matches;
      setIsDesktop(wide && landscape && noTouch);
    };

    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isDesktop;
}

const PointCloudBackground = ({ cityName }: { cityName: string }) => {
  const [data, setData] = useState<CityData | null>(null);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    loadCity(cityName).then(setData);
  }, [cityName]);

  return (
    <Canvas
      camera={{
        position: [0, -4, 9],
        fov: 40,
        near: 0.1,
        far: 100,
      }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      frameloop="always"
      style={{ background: 'transparent' }}
    >
      {/* Lighting for drone */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={2.0} color="#ffffff" />
      <directionalLight position={[-3, 4, -2]} intensity={0.8} color="#ccddee" />
      <directionalLight position={[0, -5, 3]} intensity={0.5} color="#ffffff" />

      <PointCloudScene cityData={data} />
      <FlyingDrone interactive={isDesktop} scale={isDesktop ? 1.2 : 0.75} />
    </Canvas>
  );
};

export default PointCloudBackground;
