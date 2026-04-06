"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

type GridConfig = { cols: number; rows: number };
type RevealCell = { id: number; col: number; row: number };
type GridStaggerRevealProps = { onComplete?: () => void };

const getGridConfig = (width: number): GridConfig => {
  if (width < 640) return { cols: 16, rows: 28 };
  if (width < 1024) return { cols: 24, rows: 20 };
  return { cols: 32, rows: 18 };
};

// Color palette — monochrome with subtle warm/cool shifts
const PALETTE = [
  '#0d0d0d', '#1a1a1a', '#2a2a2a', '#3a3a3a',
  '#141418', '#1c1c22', '#22222a',
  '#f0ede8', '#e8e4de', '#ddd9d2',
  '#f5f5f0', '#eae8e3',
];

function seededHash(a: number, b: number): number {
  let h = ((a * 2654435761) ^ (b * 2246822519)) >>> 0;
  h = ((h >> 16) ^ h) * 0x45d9f3b;
  return ((h >> 16) ^ h) >>> 0;
}

export const GridStaggerReveal = ({ onComplete }: GridStaggerRevealProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);
  const hasCompletedRef = useRef(false);
  const [isHidden, setIsHidden] = useState(false);
  const [gridConfig, setGridConfig] = useState<GridConfig>({ cols: 32, rows: 18 });

  const completeReveal = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    setIsHidden(true);
    onComplete?.();
  }, [onComplete]);

  // Set grid config once on mount — no resize listener to avoid re-render bugs
  useEffect(() => {
    if (typeof window === "undefined") return;
    setGridConfig(getGridConfig(window.innerWidth));

    // Safety: force clear after 5s no matter what
    const safety = setTimeout(() => completeReveal(), 5000);
    return () => clearTimeout(safety);
  }, [completeReveal]);

  const cells = useMemo<RevealCell[]>(() => {
    const c: RevealCell[] = [];
    let id = 0;
    for (let row = 0; row < gridConfig.rows; row++) {
      for (let col = 0; col < gridConfig.cols; col++) {
        c.push({ id, col, row });
        id++;
      }
    }
    return c;
  }, [gridConfig.cols, gridConfig.rows]);

  // Varied column/row sizes
  const colSizes = useMemo(() => {
    const sizes: string[] = [];
    for (let i = 0; i < gridConfig.cols; i++) {
      const h = seededHash(i, 12345) % 100;
      if (h < 15) sizes.push('1.8fr');
      else if (h < 30) sizes.push('0.5fr');
      else if (h < 45) sizes.push('2.2fr');
      else if (h < 55) sizes.push('0.7fr');
      else sizes.push('1fr');
    }
    return sizes.join(' ');
  }, [gridConfig.cols]);

  const rowSizes = useMemo(() => {
    const sizes: string[] = [];
    for (let i = 0; i < gridConfig.rows; i++) {
      const h = seededHash(i, 67890) % 100;
      if (h < 15) sizes.push('1.6fr');
      else if (h < 30) sizes.push('0.6fr');
      else if (h < 45) sizes.push('2fr');
      else if (h < 55) sizes.push('0.8fr');
      else sizes.push('1fr');
    }
    return sizes.join(' ');
  }, [gridConfig.rows]);

  useEffect(() => {
    if (!rootRef.current || isHidden || hasAnimatedRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      completeReveal();
      return;
    }

    hasAnimatedRef.current = true;

    const ctx = gsap.context(() => {
      const revealCells = gsap.utils.toArray<HTMLElement>("[data-grid-reveal-cell]");
      gsap.set(revealCells, { autoAlpha: 1, scale: 1, willChange: "opacity, transform" });
      gsap.set(rootRef.current, { autoAlpha: 1 });

      // Loading bar
      const loadingBar = rootRef.current?.querySelector('[data-loading-bar]') as HTMLElement;
      if (loadingBar) gsap.set(loadingBar, { scaleX: 0, transformOrigin: 'left center' });

      // Asymmetric reveal: diagonal wave from top-left to bottom-right
      const sorted = [...revealCells].sort((a, b) => {
        const aCol = Number(a.dataset.col ?? 0);
        const aRow = Number(a.dataset.row ?? 0);
        const bCol = Number(b.dataset.col ?? 0);
        const bRow = Number(b.dataset.row ?? 0);
        const aDiag = aCol * 1.3 + aRow;
        const bDiag = bCol * 1.3 + bRow;
        return aDiag - bDiag;
      });

      const timeline = gsap.timeline({
        delay: 0.15,
        defaults: { ease: "none" },
        onUpdate: function() {
          if (loadingBar) gsap.set(loadingBar, { scaleX: this.progress() });
        },
      });

      // Phase 1: cells shift — quick diagonal sweep
      timeline.to(sorted, {
        opacity: () => gsap.utils.random(0.2, 0.8),
        xPercent: () => gsap.utils.random(-30, 50),
        yPercent: () => gsap.utils.random(-15, 15),
        scale: () => gsap.utils.random(0.85, 1.1),
        duration: 0.1,
        stagger: {
          each: 0.0008,
          from: "start",
        },
      }, 0);

      // Phase 2: cells scatter and dissolve
      timeline.to(sorted, {
        autoAlpha: 0,
        scale: () => gsap.utils.random(0.3, 0.95),
        xPercent: () => gsap.utils.random(20, 80),
        yPercent: () => gsap.utils.random(-40, 40),
        rotation: () => gsap.utils.random(-15, 15),
        duration: 0.2,
        stagger: {
          amount: 0.5,
          from: "start",
        },
      });

      // Phase 3: fade container
      timeline.to(rootRef.current, {
        autoAlpha: 0,
        duration: 0.15,
        ease: "sine.out",
        onComplete: completeReveal,
      }, "-=0.1");
    }, rootRef);

    return () => { ctx.revert(); };
  }, [completeReveal, gridConfig.cols, gridConfig.rows, isHidden]);

  if (isHidden) return null;

  return (
    <div ref={rootRef} className="pointer-events-none fixed inset-0 z-40" data-grid-reveal-wrap>
      {/* Loading — centered text + bottom bar */}
      <div className="absolute inset-0 z-[60] flex flex-col pointer-events-none">
        <div className="flex-1 flex items-center justify-center">
          <span className="text-[clamp(2rem,8vw,5rem)] font-bold uppercase tracking-[0.3em] text-white bg-black/60 backdrop-blur-sm px-8 py-4">
            Loading
          </span>
        </div>
        <div className="px-8 md:px-16 lg:px-24 pb-10">
          <div className="h-[6px] w-full bg-white/20 overflow-hidden">
            <div
              data-loading-bar
              className="h-full bg-white"
              style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
            />
          </div>
        </div>
      </div>

      <div
        className="grid h-full w-full"
        style={{
          gridTemplateColumns: colSizes,
          gridTemplateRows: rowSizes,
        }}
      >
        {cells.map((cell) => {
          const h = seededHash(cell.col, cell.row);
          const colorIdx = h % PALETTE.length;
          const cellOpacity = 0.4 + (h % 60) / 100; // 0.4–1.0
          return (
            <div
              key={cell.id}
              data-grid-reveal-cell
              data-col={cell.col}
              data-row={cell.row}
              className="h-full w-full"
              style={{
                backgroundColor: PALETTE[colorIdx],
                opacity: cellOpacity,
                border: '0.5px solid rgba(255,255,255,0.06)',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
