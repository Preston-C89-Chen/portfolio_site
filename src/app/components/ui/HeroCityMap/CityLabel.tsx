"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { CityConfig } from "./cityPatterns";

type CityLabelProps = {
  city: CityConfig;
  index: number;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export const CityLabel = ({ city, index }: CityLabelProps) => {
  const prefersReducedMotion = useReducedMotion();
  const dur = prefersReducedMotion ? 0 : 0.8;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${city.name}-${index}`}
        initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
        animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
        exit={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
        transition={{ duration: dur, ease: EASE as unknown as number[] }}
        className="select-none"
      >
        <h3 className="text-[clamp(1.5rem,5vw,3.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.02em] text-black/40">
          {city.name}
        </h3>
        <p className="mt-2 font-mono text-xs tracking-wider text-black/30 md:text-sm">
          {city.coordinates}
        </p>
      </motion.div>
    </AnimatePresence>
  );
};
