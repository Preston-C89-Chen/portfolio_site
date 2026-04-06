'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

type CityData = {
  name: string;
  polygons: number[][][];
};

type FigureGroundCanvasProps = {
  cityName: string;
  cityIndex: number;
  opacity?: number;
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

// Cache loaded city data
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

/* ─── Drawing modes ─── */

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

// Seeded random for consistent jitter per frame
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function drawPointCloud(
  ctx: CanvasRenderingContext2D,
  polygons: number[][][],
  w: number,
  h: number,
) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = '#000000';
  const rand = seededRandom(42);
  const spacing = 3; // pixels between points

  for (const poly of polygons) {
    if (poly.length < 2) continue;
    for (let i = 0; i < poly.length - 1; i++) {
      const x0 = poly[i][0] * w;
      const y0 = poly[i][1] * h;
      const x1 = poly[i + 1][0] * w;
      const y1 = poly[i + 1][1] * h;

      const dx = x1 - x0;
      const dy = y1 - y0;
      const len = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.max(1, Math.floor(len / spacing));

      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const px = x0 + dx * t + (rand() - 0.5) * 1.0;
        const py = y0 + dy * t + (rand() - 0.5) * 1.0;
        const radius = 0.6 + rand() * 0.8;

        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

/* ─── Component ─── */

export const FigureGroundCanvas = ({
  cityName,
  cityIndex,
  opacity = 0.18,
}: FigureGroundCanvasProps) => {
  const canvasARef = useRef<HTMLCanvasElement>(null);
  const canvasBRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef<'A' | 'B'>('A');
  const [visibleCanvas, setVisibleCanvas] = useState<'A' | 'B'>('A');
  const prevCityRef = useRef(cityName);

  const setupCanvas = (canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);
    return { ctx, w: rect.width, h: rect.height };
  };

  const drawToCanvas = useCallback(
    (canvas: HTMLCanvasElement, data: CityData, index: number) => {
      const { ctx, w, h } = setupCanvas(canvas);
      if (!ctx) return;
      // Alternate mode based on city index
      if (index % 2 === 0) {
        drawFigureGround(ctx, data.polygons, w, h);
      } else {
        drawPointCloud(ctx, data.polygons, w, h);
      }
    },
    [],
  );

  // Initial load
  useEffect(() => {
    loadCity(cityName).then((data) => {
      if (!data) return;
      const canvasA = canvasARef.current;
      if (canvasA) {
        drawToCanvas(canvasA, data, cityIndex);
        setVisibleCanvas('A');
        activeRef.current = 'A';
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // City transition: draw on back canvas, then crossfade
  useEffect(() => {
    if (cityName === prevCityRef.current) return;
    prevCityRef.current = cityName;

    loadCity(cityName).then((data) => {
      if (!data) return;

      // Draw on the inactive (back) canvas
      const backId = activeRef.current === 'A' ? 'B' : 'A';
      const backCanvas =
        backId === 'A' ? canvasARef.current : canvasBRef.current;
      if (backCanvas) {
        drawToCanvas(backCanvas, data, cityIndex);
      }

      // Crossfade: show back, hide front
      setVisibleCanvas(backId);
      activeRef.current = backId;
    });
  }, [cityName, cityIndex, drawToCanvas]);

  // Redraw on resize
  useEffect(() => {
    const handleResize = () => {
      loadCity(cityName).then((data) => {
        if (!data) return;
        const canvas =
          activeRef.current === 'A'
            ? canvasARef.current
            : canvasBRef.current;
        if (canvas) drawToCanvas(canvas, data, cityIndex);
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [cityName, cityIndex, drawToCanvas]);

  const sharedClass = 'absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out';

  return (
    <>
      <canvas
        ref={canvasARef}
        className={sharedClass}
        style={{ opacity: visibleCanvas === 'A' ? opacity : 0 }}
      />
      <canvas
        ref={canvasBRef}
        className={sharedClass}
        style={{ opacity: visibleCanvas === 'B' ? opacity : 0 }}
      />
    </>
  );
};
