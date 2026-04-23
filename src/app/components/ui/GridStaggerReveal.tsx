"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type GridStaggerRevealProps = { onComplete?: () => void };

/* ─── Palette (V-JEPA-inspired: bone paper + Meta blue + black) ─── */
const BONE = '#f5f2ec';
const BONE_DARK = '#e8e3d8';
const BLUE = '#4a90c9';
const BLACK = '#0a0a0a';
const INK = '#1a1a1a';

/* ─── Rotating wireframe cube ─── */

const WireCube = ({
  size,
  spinClass,
  duration,
  stroke = 'rgba(10,10,10,0.85)',
  fill = 'rgba(10,10,10,0.04)',
}: {
  size: number;
  spinClass: string;
  duration: number;
  stroke?: string;
  fill?: string;
}) => {
  const h = size / 2;
  const faces = [
    { t: `translateZ(${h}px)` },
    { t: `translateZ(-${h}px) rotateY(180deg)` },
    { t: `rotateY(90deg) translateZ(${h}px)` },
    { t: `rotateY(-90deg) translateZ(${h}px)` },
    { t: `rotateX(90deg) translateZ(${h}px)` },
    { t: `rotateX(-90deg) translateZ(${h}px)` },
  ];
  return (
    <div style={{ width: size, height: size, perspective: size * 3.5 }}>
      <div
        style={{
          width: size,
          height: size,
          position: 'relative',
          transformStyle: 'preserve-3d',
          animation: `${spinClass} ${duration}s linear infinite`,
        }}
      >
        {faces.map((f, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              border: `1.5px solid ${stroke}`,
              background: fill,
              transform: f.t,
            }}
          />
        ))}
      </div>
    </div>
  );
};

/* ─── Tile content components ─── */

const TileTitle = () => (
  <div className="h-full w-full flex flex-col justify-between p-4 md:p-5" style={{ background: BONE }}>
    <div>
      <div className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.25em]" style={{ color: INK }}>
        preston.chen · portfolio · v2
      </div>
      <div className="mt-3 md:mt-4 font-bold text-[15px] md:text-[18px] leading-[1.1]" style={{ color: INK }}>
        Robotics &amp; Data<br />Systems — Booting
      </div>
    </div>
    <div className="font-mono text-[8px] md:text-[9px] tracking-[0.15em]" style={{ color: INK, opacity: 0.55 }}>
      initializing kinematics model →
    </div>
  </div>
);

const TileMath = () => (
  <div className="h-full w-full flex flex-col justify-between p-4 md:p-5" style={{ background: BONE }}>
    <div>
      <div className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.25em] mb-3" style={{ color: INK, opacity: 0.55 }}>
        differential drive
      </div>
      <div className="space-y-2 md:space-y-2.5">
        {[
          { eq: 'ẋ = v · cos θ', en: 'forward velocity in x' },
          { eq: 'ẏ = v · sin θ', en: 'forward velocity in y' },
          { eq: 'θ̇ = (vᴿ − vᴸ) / L', en: 'heading rate from wheels' },
        ].map((row) => (
          <div key={row.eq}>
            <div className="font-mono text-[11px] md:text-[13px] leading-tight" style={{ color: INK }}>
              {row.eq}
            </div>
            <div className="font-mono text-[8px] md:text-[9px] tracking-wide" style={{ color: INK, opacity: 0.5 }}>
              {row.en}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TileTable = () => (
  <div className="h-full w-full flex flex-col justify-between p-4 md:p-5" style={{ background: BONE }}>
    <div className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.25em]" style={{ color: INK, opacity: 0.55 }}>
      pose · state
    </div>
    <div className="font-mono text-[9px] md:text-[11px] leading-[1.4]" style={{ color: INK }}>
      <div className="flex justify-between border-b border-black/10 pb-1 mb-1">
        <span className="opacity-50">param</span><span className="opacity-50">val</span>
      </div>
      {[
        ['x', '0.42'],
        ['y', '1.17'],
        ['θ', '0.08'],
        ['v', '0.65'],
        ['ω', '0.21'],
      ].map(([k, v]) => (
        <div key={k} className="flex justify-between">
          <span>{k}</span><span>{v}</span>
        </div>
      ))}
    </div>
  </div>
);

const TileGraph = () => {
  // Simple sine-like energy landscape sparkline
  const points = Array.from({ length: 40 }, (_, i) => {
    const x = (i / 39) * 100;
    const y = 50 + Math.sin(i * 0.35) * 18 + Math.cos(i * 0.18) * 8;
    return `${x},${y}`;
  }).join(' ');
  return (
    <div className="h-full w-full flex flex-col justify-between p-4 md:p-5" style={{ background: BONE }}>
      <div className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.25em]" style={{ color: INK, opacity: 0.55 }}>
        energy landscape
      </div>
      <svg viewBox="0 0 100 80" preserveAspectRatio="none" className="w-full" style={{ height: '60%' }}>
        <polyline points={points} fill="none" stroke={INK} strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="0" y1="50" x2="100" y2="50" stroke={INK} strokeWidth="0.2" strokeDasharray="1,2" opacity="0.4" />
      </svg>
      <div className="font-mono text-[8px] md:text-[9px] tracking-wide flex justify-between" style={{ color: INK, opacity: 0.5 }}>
        <span>Δx</span><span>cost(q)</span><span>Δy</span>
      </div>
    </div>
  );
};

const TileSolid = ({ color }: { color: string }) => (
  <div className="h-full w-full" style={{ background: color }} />
);

/* ─── Tile grid layout ─── */
// Using explicit placement so we can hold out the center region for the cube
// Desktop: 5 cols × 4 rows. Mobile: 3 cols × 5 rows.

type TileDef = {
  key: string;
  node: React.ReactNode;
  d: { c: number; r: number }; // desktop position
  m?: { c: number; r: number } | null; // mobile position (null = hide)
};

const DESKTOP_TILES: TileDef[] = [
  { key: 'title',    node: <TileTitle />,                   d: { c: 1, r: 1 }, m: { c: 1, r: 1 } },
  { key: 's-bone-1', node: <TileSolid color={BONE_DARK} />, d: { c: 2, r: 1 }, m: { c: 2, r: 1 } },
  { key: 's-blue-1', node: <TileSolid color={BLUE} />,      d: { c: 3, r: 1 }, m: { c: 3, r: 1 } },
  { key: 's-bone-2', node: <TileSolid color={BONE} />,      d: { c: 4, r: 1 }, m: null },
  { key: 'table',    node: <TileTable />,                   d: { c: 5, r: 1 }, m: { c: 1, r: 2 } },

  { key: 's-bone-3', node: <TileSolid color={BONE} />,      d: { c: 1, r: 2 }, m: { c: 2, r: 2 } },
  { key: 's-black-1',node: <TileSolid color={BLACK} />,     d: { c: 2, r: 2 }, m: { c: 3, r: 2 } },
  { key: 's-bone-4', node: <TileSolid color={BONE_DARK} />, d: { c: 3, r: 2 }, m: null },
  { key: 's-bone-5', node: <TileSolid color={BONE} />,      d: { c: 4, r: 2 }, m: null },
  { key: 's-bone-6', node: <TileSolid color={BONE_DARK} />, d: { c: 5, r: 2 }, m: null },

  { key: 's-blue-2', node: <TileSolid color={BLUE} />,      d: { c: 1, r: 3 }, m: { c: 1, r: 3 } },
  { key: 's-bone-7', node: <TileSolid color={BONE} />,      d: { c: 2, r: 3 }, m: { c: 2, r: 3 } },
  { key: 's-bone-8', node: <TileSolid color={BONE_DARK} />, d: { c: 3, r: 3 }, m: { c: 3, r: 3 } },
  { key: 's-bone-9', node: <TileSolid color={BONE} />,      d: { c: 4, r: 3 }, m: null },
  { key: 's-black-2',node: <TileSolid color={BLACK} />,     d: { c: 5, r: 3 }, m: null },

  { key: 'math',     node: <TileMath />,                    d: { c: 1, r: 4 }, m: { c: 1, r: 4 } },
  { key: 's-bone-10',node: <TileSolid color={BONE} />,      d: { c: 2, r: 4 }, m: { c: 2, r: 4 } },
  { key: 's-blue-3', node: <TileSolid color={BLUE} />,      d: { c: 3, r: 4 }, m: { c: 3, r: 4 } },
  { key: 's-bone-11',node: <TileSolid color={BONE_DARK} />, d: { c: 4, r: 4 }, m: null },
  { key: 'graph',    node: <TileGraph />,                   d: { c: 5, r: 4 }, m: { c: 1, r: 5 } },
];

/* ─── Main component ─── */

export const GridStaggerReveal = ({ onComplete }: GridStaggerRevealProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);
  const hasCompletedRef = useRef(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const completeReveal = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    setIsHidden(true);
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsMobile(window.innerWidth < 640);
    // Safety: force-clear after 2.5s in case the timeline fails
    const safety = setTimeout(() => completeReveal(), 2500);
    return () => clearTimeout(safety);
  }, [completeReveal]);

  useEffect(() => {
    if (!rootRef.current || isHidden || hasAnimatedRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      completeReveal();
      return;
    }
    hasAnimatedRef.current = true;

    const ctx = gsap.context(() => {
      const tiles = gsap.utils.toArray<HTMLElement>("[data-tile]");
      const cube = rootRef.current?.querySelector('[data-cube]') as HTMLElement;
      const loadingBar = rootRef.current?.querySelector('[data-loading-bar]') as HTMLElement;
      const percentEl = rootRef.current?.querySelector('[data-loading-percent]') as HTMLElement;

      gsap.set(tiles, { opacity: 0, scale: 0.92 });
      gsap.set(cube, { opacity: 0, scale: 0.8 });
      gsap.set(loadingBar, { scaleX: 0, transformOrigin: 'left center' });

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        onUpdate: function () {
          const p = this.progress();
          gsap.set(loadingBar, { scaleX: Math.min(p * 1.5, 1) });
          if (percentEl) {
            percentEl.textContent = String(Math.min(Math.round(p * 150), 100)).padStart(3, '0');
          }
        },
      });

      // Phase 1 — tiles pop in with diagonal stagger (0.0–0.3s)
      tl.to(tiles, {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        stagger: { each: 0.015, from: 'start' },
      }, 0);

      // Phase 2 — cube fades in (0.15–0.4s)
      tl.to(cube, { opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' }, 0.15);

      // Phase 3 — brief beat so the cube rotation reads (0.5–0.65s)
      tl.to({}, { duration: 0.15 }, 0.5);

      // Phase 4 — tiles gracefully drift + rotate + fade in a diagonal wave (0.65–1.1s)
      // Pre-sort tiles along the diagonal so exit reads as a coherent sweep.
      const sortedTiles = [...tiles].sort((a, b) => {
        const aCol = Number(a.dataset.col ?? 0);
        const aRow = Number(a.dataset.row ?? 0);
        const bCol = Number(b.dataset.col ?? 0);
        const bRow = Number(b.dataset.row ?? 0);
        return (bCol * 1.3 + bRow) - (aCol * 1.3 + aRow); // reverse diagonal
      });
      tl.to(sortedTiles, {
        opacity: 0,
        scale: () => gsap.utils.random(0.88, 0.98),
        xPercent: () => gsap.utils.random(-8, 12),
        yPercent: () => gsap.utils.random(-14, -4),
        rotation: () => gsap.utils.random(-3, 3),
        duration: 0.45,
        ease: 'power3.inOut',
        stagger: { each: 0.022, from: 'start' },
      }, 0.65);

      // Phase 5 — cube lingers, then spirals out (1.0–1.4s)
      tl.to(cube, {
        opacity: 0,
        scale: 1.3,
        rotation: 15,
        duration: 0.4,
        ease: 'power2.inOut',
      }, 1.0);

      // Phase 6 — loading label + bar soften out alongside the cube
      const loadingOverlay = rootRef.current?.querySelector('[data-loading-overlay]') as HTMLElement;
      if (loadingOverlay) {
        tl.to(loadingOverlay, {
          opacity: 0,
          y: 4,
          duration: 0.3,
          ease: 'power2.inOut',
        }, 1.05);
      }

      // Phase 7 — container fades gently (1.3–1.55s)
      tl.to(rootRef.current, {
        autoAlpha: 0,
        duration: 0.25,
        ease: 'sine.inOut',
        onComplete: completeReveal,
      }, 1.3);
    }, rootRef);

    return () => { ctx.revert(); };
  }, [completeReveal, isHidden]);

  if (isHidden) return null;

  const cubeSize = isMobile ? 220 : 420;

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-40"
      style={{ background: BLACK }}
      data-grid-reveal-wrap
    >
      {/* Tile grid */}
      <div
        className="absolute inset-0"
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(5, 1fr)',
          gridTemplateRows: isMobile ? 'repeat(5, 1fr)' : 'repeat(4, 1fr)',
          gap: isMobile ? '3px' : '4px',
          padding: isMobile ? '3px' : '4px',
        }}
      >
        {DESKTOP_TILES.map((tile) => {
          const pos = isMobile ? tile.m : tile.d;
          if (!pos) return null;
          return (
            <div
              key={tile.key}
              data-tile
              data-col={pos.c}
              data-row={pos.r}
              style={{
                gridColumn: pos.c,
                gridRow: pos.r,
                overflow: 'hidden',
                opacity: 0, // hidden on first paint, GSAP animates in
              }}
            >
              {tile.node}
            </div>
          );
        })}
      </div>

      {/* Rotating cube — absolutely centered on top of grid */}
      <div
        data-cube
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ mixBlendMode: 'multiply', opacity: 0 }}
      >
        <WireCube size={cubeSize} spinClass="cube-spin-b" duration={7} />
      </div>

      {/* Loading label + progress bar — bottom strip */}
      <div data-loading-overlay className="absolute bottom-0 left-0 right-0 px-4 md:px-6 pb-3 md:pb-4 z-[70] pointer-events-none">
        <div className="flex items-center justify-between mb-1.5" style={{ color: BONE }}>
          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] opacity-80">
            loading
          </span>
          <span className="font-mono text-[9px] md:text-[10px] tracking-[0.15em] opacity-80">
            <span data-loading-percent>000</span> / 100
          </span>
        </div>
        <div className="h-[2px] w-full overflow-hidden" style={{ background: 'rgba(245,242,236,0.15)' }}>
          <div
            data-loading-bar
            className="h-full"
            style={{
              background: BONE,
              transform: 'scaleX(0)',
              transformOrigin: 'left center',
            }}
          />
        </div>
      </div>
    </div>
  );
};
