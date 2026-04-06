'use client';

import { useEffect, useRef } from 'react';
import { dronePosition } from './dronePosition';

// Approximate scene-space bounds the drone patrols within
const SCENE_HALF_WIDTH = 5.0;
const SCENE_HALF_HEIGHT = 3.5;

export const DroneMinimapIndicator = () => {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const dot = dotRef.current;
      if (dot) {
        // Map drone scene xy → 0..1 on mini-map
        // Note: drone scene Y is flipped relative to screen
        const nx = (dronePosition.x + SCENE_HALF_WIDTH) / (2 * SCENE_HALF_WIDTH);
        const ny = 1 - (dronePosition.y + SCENE_HALF_HEIGHT) / (2 * SCENE_HALF_HEIGHT);
        const cx = Math.max(0, Math.min(1, nx)) * 100;
        const cy = Math.max(0, Math.min(1, ny)) * 100;
        dot.style.left = `${cx}%`;
        dot.style.top = `${cy}%`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={dotRef}
      className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ left: '50%', top: '50%' }}
    >
      <div className="w-full h-full rounded-full bg-[#a85555] shadow-[0_0_4px_rgba(168,85,85,0.6)]" />
    </div>
  );
};
