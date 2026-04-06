"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { CITIES, CYCLE_DURATION, TRANSITION_DURATION } from "./cityPatterns";

export type CityRotationState = {
  currentIndex: number;
  nextIndex: number;
  transition: number; // 0–1 tween value
};

export function useCityRotation(active: boolean) {
  const [state, setState] = useState<CityRotationState>({
    currentIndex: 0,
    nextIndex: 1,
    transition: 0,
  });

  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  const startTransition = useCallback(() => {
    const cur = stateRef.current;
    const nextIdx = (cur.currentIndex + 1) % CITIES.length;

    setState((prev) => ({ ...prev, nextIndex: nextIdx, transition: 0 }));

    const obj = { t: 0 };
    tweenRef.current = gsap.to(obj, {
      t: 1,
      duration: TRANSITION_DURATION,
      ease: "power2.inOut",
      onUpdate: () => {
        setState((prev) => ({ ...prev, transition: obj.t }));
      },
      onComplete: () => {
        setState({
          currentIndex: nextIdx,
          nextIndex: (nextIdx + 1) % CITIES.length,
          transition: 0,
        });
      },
    });
  }, []);

  useEffect(() => {
    if (!active) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      // Instant swaps, no animation
      const interval = setInterval(() => {
        setState((prev) => ({
          currentIndex: (prev.currentIndex + 1) % CITIES.length,
          nextIndex: (prev.currentIndex + 2) % CITIES.length,
          transition: 0,
        }));
      }, CYCLE_DURATION * 1000);
      return () => clearInterval(interval);
    }

    const schedule = () => {
      timerRef.current = setTimeout(() => {
        startTransition();
        schedule();
      }, CYCLE_DURATION * 1000);
    };

    schedule();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, [active, startTransition]);

  return {
    currentCity: CITIES[state.currentIndex],
    nextCity: CITIES[state.nextIndex],
    transition: state.transition,
    currentIndex: state.currentIndex,
  };
}
