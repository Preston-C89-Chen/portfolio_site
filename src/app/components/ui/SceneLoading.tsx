'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

type City = { polygons: number[][][] };

function CityAcquisition({ city, still }: { city: City | null; still: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const element = canvas.current;
    if (!element || !city) return;
    const ctx = element.getContext('2d');
    if (!ctx) return;
    let seed = 42;
    const random = () => { seed = seed * 16807 % 2147483647; return (seed - 1) / 2147483646; };
    const targets: { x: number; y: number; sx: number; sy: number; delay: number; warm: boolean }[] = [];
    for (const poly of city.polygons) {
      const height = 4 + random() * 16;
      for (let i = 0; i < poly.length; i++) {
        const a = poly[i], b = poly[(i + 1) % poly.length];
        const steps = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 0.009);
        for (let n = 0; n < steps; n++) {
          const x = a[0] + (b[0] - a[0]) * n / steps - 0.5;
          const y = a[1] + (b[1] - a[1]) * n / steps - 0.5;
          if (Math.abs(x) > 0.5 || Math.abs(y) > 0.5) continue;
          targets.push({x: (x - y) * 200, y: (x + y) * 94 - height, sx: (random() - 0.5) * 500, sy: (random() - 0.5) * 240, delay: random() * 0.3, warm: random() > 0.9});
        }
      }
    }
    let frame = 0;
    const start = performance.now();
    const draw = () => {
      const rect = element.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (element.width !== Math.round(rect.width * dpr) || element.height !== Math.round(rect.height * dpr)) {
        element.width = Math.round(rect.width * dpr); element.height = Math.round(rect.height * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, rect.width, rect.height);
      const time = (performance.now() - start) / 1000;
      const scale = Math.min(rect.width / 460, rect.height / 270);
      ctx.save(); ctx.translate(rect.width / 2, rect.height / 2 + 10); ctx.scale(scale, scale);
      const stride = Math.max(1, Math.ceil(targets.length / 6500));
      for (let index = 0; index < targets.length; index += stride) {
        const p = targets[index];
        const raw = still ? 1 : Math.min(1, Math.max(0, (time - p.delay) / 1.6));
        const t = raw * raw * (3 - 2 * raw);
        const x = p.sx + (p.x - p.sx) * t, y = p.sy + (p.y - p.sy) * t;
        const scan = still ? 0 : Math.exp(-Math.pow((p.x - ((time * 58) % 440 - 220)) / 18, 2));
        ctx.fillStyle = p.warm ? `rgba(175,126,72,${0.4 + scan * 0.3})` : `rgba(41,86,107,${0.28 + t * 0.25 + scan * 0.3})`;
        const size = 1.1 + scan * 0.55;
        ctx.fillRect(x, y, size, size);
      }
      ctx.restore();
      if (!still) frame = requestAnimationFrame(draw);
    };
    const resize = new ResizeObserver(() => { if (still) draw(); });
    resize.observe(element); draw();
    return () => { cancelAnimationFrame(frame); resize.disconnect(); };
  }, [city, still]);
  return <canvas ref={canvas} className="h-full w-full" aria-label="A sparse point cloud resolving into San Francisco building footprints" role="img" />;
}

export function SceneLoading({ onComplete }: { onComplete: () => void }) {
  const [city, setCity] = useState<City | null>(null);
  const [visible, setVisible] = useState(true);
  const [preview, setPreview] = useState(false);
  const [exiting, setExiting] = useState(false);
  const reduced = useReducedMotion();
  const began = useRef(0);
  useEffect(() => {
    const held = new URLSearchParams(window.location.search).get('loading') === 'preview';
    setPreview(held); began.current = performance.now();
    if (!held && (window.matchMedia('(prefers-reduced-motion: reduce)').matches || sessionStorage.getItem('portfolio-scene-seen'))) {
      setVisible(false); onComplete(); return;
    }
    const controller = new AbortController();
    let finishTimer: ReturnType<typeof setTimeout>;
    let fadeTimer: ReturnType<typeof setTimeout>;
    const finish = () => {
      if (held) return;
      finishTimer = setTimeout(() => {
        sessionStorage.setItem('portfolio-scene-seen', '1');
        onComplete(); setExiting(true);
        fadeTimer = setTimeout(() => setVisible(false), 550);
      }, Math.max(0, 1000 - (performance.now() - began.current)));
    };
    const fallback = setTimeout(finish, 3500);
    fetch('/cities/san-francisco.json', {signal: controller.signal}).then(r => {
      if (!r.ok) throw new Error('City unavailable');
      return r.json();
    }).then(data => { setCity(data); clearTimeout(fallback); finish(); }).catch(error => { if (error.name !== 'AbortError') { clearTimeout(fallback); finish(); } });
    return () => { controller.abort(); clearTimeout(fallback); clearTimeout(finishTimer); clearTimeout(fadeTimer); };
  }, [onComplete]);
  useEffect(() => {
    if (!visible) return;
    const prior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prior; };
  }, [visible]);
  if (!visible) return null;
  return <div role="status" aria-live="polite" aria-label="Preparing portfolio scene" className="fixed inset-0 z-[100] flex flex-col bg-[#fdfdfb] px-6 text-[#172126] transition-opacity duration-500 md:px-16 lg:px-24" style={{opacity: exiting ? 0 : 1}}>
    <header className="flex flex-wrap items-start justify-between gap-4 border-b border-[#172126]/10 py-8">
      <span className="text-lg font-bold tracking-tight">Preston Chen</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#172126]/45">Field engineering / Integrations</span>
    </header>
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center pb-6">
      <div className="relative h-[clamp(180px,34vh,320px)] w-full max-w-[500px]" aria-hidden="true">
        <span className="absolute left-3 top-5 h-3 w-3 border-l border-t border-[#172126]/20" />
        <span className="absolute right-3 bottom-5 h-3 w-3 border-b border-r border-[#172126]/20" />
        <CityAcquisition city={city} still={!!reduced} />
      </div>
      <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#172126]/45">A view from above</p>
      <h1 className="mt-4 text-center text-[clamp(2rem,5vw,3.5rem)] font-bold leading-none tracking-tight">Acquiring scene.</h1>
      <div className="mt-6 flex flex-wrap justify-center items-center gap-3 font-mono text-[11px] text-[#172126]/55"><span className="h-1.5 w-1.5 rounded-full bg-[#48838c]" /><span>Preparing city view</span><span className="text-[#172126]/25">/</span><span>San Francisco, California</span></div>
    </div>
    <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-[#172126]/10 py-6 font-mono text-[10px] uppercase tracking-wider text-[#172126]/40">
      <span>37.7749° N / 122.4194° W</span>
      {preview ? <button onClick={() => { setVisible(false); onComplete(); }} className="text-[#172126]/70 underline underline-offset-4 hover:text-black">View portfolio ↗</button> : <span>Software meets the physical world</span>}
    </footer>
  </div>;
}
