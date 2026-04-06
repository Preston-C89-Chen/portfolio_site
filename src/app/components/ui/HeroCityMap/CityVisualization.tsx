'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { PointCloudScene } from './PointCloudScene';

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

/* ─── 2D Figure-Ground Drawing ─── */

function drawFigureGround(
  ctx: CanvasRenderingContext2D,
  polygons: number[][][],
  w: number,
  h: number,
) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = '#000000';
  for (const poly of polygons) {
    if (poly.length < 3) continue;
    ctx.beginPath();
    ctx.moveTo(poly[0][0] * w, poly[0][1] * h);
    for (let i = 1; i < poly.length; i++) {
      ctx.lineTo(poly[i][0] * w, poly[i][1] * h);
    }
    ctx.closePath();
    ctx.fill();
  }
}

/* ─── Point Cloud Background (full bleed) ─── */

export const PointCloudBackground = ({ cityName }: { cityName: string }) => {
  const [data, setData] = useState<CityData | null>(null);

  useEffect(() => {
    loadCity(cityName).then(setData);
  }, [cityName]);

  return (
    <Canvas
      camera={{
        position: [0, -2.5, 8],
        fov: 50,
        near: 0.1,
        far: 100,
      }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ background: 'transparent' }}
    >
      <PointCloudScene cityData={data} />
    </Canvas>
  );
};

/* ─── Figure-Ground Panel (right half) ─── */

export const FigureGroundPanel = ({ cityName }: { cityName: string }) => {
  const canvasARef = useRef<HTMLCanvasElement>(null);
  const canvasBRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef<'A' | 'B'>('A');
  const [visible, setVisible] = useState<'A' | 'B'>('A');
  const prevCityRef = useRef(cityName);

  const setupAndDraw = useCallback(
    (canvas: HTMLCanvasElement, polygons: number[][][]) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      drawFigureGround(ctx, polygons, rect.width, rect.height);
    },
    [],
  );

  // Initial load
  useEffect(() => {
    loadCity(cityName).then((data) => {
      if (!data || !canvasARef.current) return;
      setupAndDraw(canvasARef.current, data.polygons);
      setVisible('A');
      activeRef.current = 'A';
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // City change: draw on back canvas, crossfade
  useEffect(() => {
    if (cityName === prevCityRef.current) return;
    prevCityRef.current = cityName;

    loadCity(cityName).then((data) => {
      if (!data) return;
      const backId = activeRef.current === 'A' ? 'B' : 'A';
      const backCanvas =
        backId === 'A' ? canvasARef.current : canvasBRef.current;
      if (backCanvas) setupAndDraw(backCanvas, data.polygons);
      setVisible(backId);
      activeRef.current = backId;
    });
  }, [cityName, setupAndDraw]);

  // Resize
  useEffect(() => {
    const handleResize = () => {
      loadCity(cityName).then((data) => {
        if (!data) return;
        const canvas =
          activeRef.current === 'A'
            ? canvasARef.current
            : canvasBRef.current;
        if (canvas) setupAndDraw(canvas, data.polygons);
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [cityName, setupAndDraw]);

  const cls = 'absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out';

  return (
    <>
      <canvas
        ref={canvasARef}
        className={cls}
        style={{ opacity: visible === 'A' ? 1 : 0 }}
      />
      <canvas
        ref={canvasBRef}
        className={cls}
        style={{ opacity: visible === 'B' ? 1 : 0 }}
      />
    </>
  );
};
