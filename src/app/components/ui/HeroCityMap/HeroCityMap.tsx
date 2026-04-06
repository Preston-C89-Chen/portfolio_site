"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { CityLabel } from "./CityLabel";
import { FigureGroundPanel } from "./FigureGroundPanel";
import { useCityRotation } from "./useCityRotation";

const PointCloudBackground = dynamic(
  () => import("./PointCloudBackground"),
  { ssr: false },
);

type HeroCityMapProps = {
  revealReady?: boolean;
};

export const HeroCityMap = ({ revealReady = true }: HeroCityMapProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const shouldReveal = revealReady || prefersReducedMotion;
  const baseDuration = prefersReducedMotion ? 0 : 0.7;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const { currentCity, currentIndex } = useCityRotation(!!shouldReveal);

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: baseDuration,
        delay: prefersReducedMotion ? 0 : 0.06,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const labelVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: baseDuration,
        delay: prefersReducedMotion ? 0 : 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: baseDuration,
        delay: prefersReducedMotion ? 0 : 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      data-hero-section
      className="relative min-h-screen overflow-hidden bg-white text-black"
    >
      {/* Layer 1: Point cloud — full bleed background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <PointCloudBackground cityName={currentCity.name} />
      </div>

      {/* Layer 2a: Figure-ground panel — mobile (top-right, small) */}
      <div className="absolute top-[80px] right-4 w-[35%] h-[22%] z-[1] md:hidden">
        <div className="relative h-full overflow-hidden rounded-sm opacity-40">
          <div
            key={`mobile-${currentCity.name}`}
            className="absolute inset-0 animate-slow-zoom"
          >
            <FigureGroundPanel cityName={currentCity.name} />
          </div>
        </div>
      </div>

      {/* Layer 2b: Figure-ground panel — desktop (bottom-right, larger) */}
      <div className="absolute bottom-0 right-0 w-1/4 h-[45%] z-[1] hidden md:block pr-8 pb-8 md:pr-16 md:pb-8 lg:pr-24">
        <div className="relative h-full overflow-hidden rounded-sm opacity-40">
          <div
            key={currentCity.name}
            className="absolute inset-0 animate-slow-zoom"
          >
            <FigureGroundPanel cityName={currentCity.name} />
          </div>
        </div>
      </div>

      {/* Layer 3: Text overlay */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative z-10 mx-auto flex h-screen max-w-[1920px] flex-col px-8 md:px-16 lg:px-24"
      >
        {/* Header */}
        <motion.header
          variants={headerVariants}
          initial="hidden"
          animate={shouldReveal ? "visible" : "hidden"}
          className="flex items-center justify-between border-b border-black/10 py-8"
        >
          <h1 className="font-gilroy text-xl font-bold tracking-tight">Preston Chen</h1>
          <nav className="flex items-center gap-6">
            <button
              onClick={() => {
                document.querySelector('[data-section="work"]')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-black/70 transition-all duration-200 hover:text-black hover:tracking-[0.25em]"
            >
              Work
            </button>
            <span className="text-black/20 text-xs select-none">/</span>
            <button
              onClick={() => {
                document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-black/70 transition-all duration-200 hover:text-black hover:tracking-[0.25em]"
            >
              Contact
            </button>
          </nav>
        </motion.header>

        {/* Title + City label — left side */}
        <div className="flex flex-1 flex-col justify-center md:w-1/2">
          <motion.h2
            variants={labelVariants}
            initial="hidden"
            animate={shouldReveal ? "visible" : "hidden"}
            className="font-gilroy text-[clamp(1.25rem,3vw,2rem)] font-bold uppercase leading-[1] tracking-[0.12em] bg-white/80 backdrop-blur-sm px-4 py-2 w-fit"
          >
            Data Quality Engineer
          </motion.h2>

          <motion.div
            variants={labelVariants}
            initial="hidden"
            animate={shouldReveal ? "visible" : "hidden"}
            className="mt-6"
          >
            <CityLabel city={currentCity} index={currentIndex} />
          </motion.div>
        </div>

        {/* Footer description */}
        <motion.div
          variants={footerVariants}
          initial="hidden"
          animate={shouldReveal ? "visible" : "hidden"}
          className="border-t border-black/10 pb-8 pt-8 md:w-1/2"
        >
          <p className="font-mono max-w-lg text-xs text-black/50 bg-white/80 backdrop-blur-sm px-4 py-3 w-fit leading-relaxed">
            Data quality engineer with 5+ years in software engineering. I build
            tooling, validate data pipelines, and care about what happens
            downstream when labels are wrong. Building toward simulation
            engineering for robotics.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};
