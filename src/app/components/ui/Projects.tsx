'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import fleetImage from '@public/projects/robotics-telemetry/fleet.jpg';
import epochImage from '@public/projects/epoch/mission-map.jpg';

/* ─── Mini visualizations ─── */

// Stock/options candlestick + trend line
const StatstacksPreview = () => {
  const candles = [
    { x: 18, open: 54, close: 46, high: 40, low: 60, up: true },
    { x: 42, open: 48, close: 58, high: 42, low: 64, up: false },
    { x: 66, open: 44, close: 36, high: 30, low: 52, up: true },
    { x: 90, open: 40, close: 50, high: 32, low: 56, up: false },
    { x: 114, open: 36, close: 28, high: 22, low: 44, up: true },
    { x: 138, open: 30, close: 24, high: 18, low: 38, up: true },
    { x: 162, open: 28, close: 34, high: 22, low: 40, up: false },
    { x: 186, open: 30, close: 22, high: 16, low: 38, up: true },
    { x: 210, open: 24, close: 18, high: 12, low: 32, up: true },
    { x: 234, open: 20, close: 26, high: 14, low: 32, up: false },
  ];

  const linePoints = candles
    .map((c) => `${c.x},${(c.open + c.close) / 2}`)
    .join(' ');

  return (
    <svg
      viewBox="0 0 260 100"
      className="w-full h-full"
      preserveAspectRatio="none"
      aria-hidden
    >
      {/* grid */}
      {[20, 40, 60, 80].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="260"
          y2={y}
          stroke="currentColor"
          strokeOpacity="0.08"
          strokeWidth="0.5"
        />
      ))}

      {/* candles */}
      {candles.map((c, i) => (
        <g key={i}>
          <line
            x1={c.x}
            y1={c.high}
            x2={c.x}
            y2={c.low}
            stroke="currentColor"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
          <rect
            x={c.x - 4}
            y={Math.min(c.open, c.close)}
            width="8"
            height={Math.abs(c.close - c.open) || 1}
            fill={c.up ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1"
          />
        </g>
      ))}

      {/* trend line */}
      <motion.polyline
        points={linePoints}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeDasharray="2 2"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.8 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
};

/* ─── Project data ─── */

interface Project {
  index: string;
  status: 'LIVE' | 'IN PROGRESS' | 'PROTOTYPE';
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  href?: string;
  hrefLabel?: string;
  displayHref?: string;
  preview: React.ReactNode;
}

const projects: Project[] = [
  {
    index: '01',
    status: 'IN PROGRESS',
    title: 'UAS FLIGHT TESTING',
    tagline: 'Requirements, instrumented runs, and evidence.',
    description:
      'Design and run structured flight test cards on personal UAS hardware with explicit pass/fail criteria. Compare post-flight telemetry with predictions across multiple airspeeds. Validated camera intrinsics against real EXIF data and identified a gap between published specifications and observed data.',
    stack: ['FLIGHT TEST CARDS', 'TELEMETRY', 'EXIF VALIDATION'],
    preview: <div className="flex h-full flex-col justify-center gap-3 font-mono text-xs"><span className="text-black/40">TEST WORKFLOW</span><span>01 / Define pass & fail criteria</span><span>02 / Fly & capture telemetry</span><span>03 / Compare results to predictions</span></div>,
  },
  {
    index: '02',
    status: 'IN PROGRESS',
    title: 'EPOCH MISSION PLANNER',
    tagline: 'Turn a survey goal into a repeatable flight plan.',
    description:
      'A map-based drone planner that works backward from what a survey needs to measure. Inspect the route, understand the capture settings, and keep earlier plans ready for the next visit.',
    stack: ['PYTHON', 'TYPESCRIPT', 'MAPLIBRE', 'DJI WPML / KMZ'],
    href: '/projects/epoch-mission-planner',
    hrefLabel: 'READ CASE STUDY',
    displayHref: 'Local-first · In development',
    preview: <Image src={epochImage} alt="Epoch mission planner displaying a proposed coastal survey route and flight estimates" className="h-full w-full object-contain" sizes="(max-width: 768px) 90vw, 560px" />,
  },
  {
    index: '03',
    status: 'LIVE',
    title: 'STATSTACKS',
    tagline: 'Options, futures & equities analysis.',
    description:
      'Pricing signals, flow, and chain-level analytics built for self-directed traders. Surfaces what the raw data is actually saying.',
    stack: ['NEXT.JS', 'TYPESCRIPT', 'PYTHON', 'MARKET DATA'],
    href: 'https://statstacks.io',
    hrefLabel: 'VISIT',
    displayHref: 'statstacks.io',
    preview: <StatstacksPreview />,
  },
  {
    index: '04',
    status: 'PROTOTYPE',
    title: 'ROBOTICS TELEMETRY DASHBOARD',
    tagline: 'Fleet monitoring. Robot inspection. Session QA.',
    description:
      'A three-workspace operator console connecting a geospatial fleet view, a Franka workcell, and session investigation. Built with synthetic scenarios, telemetry freshness checks, and regression coverage.',
    stack: ['REACT', 'TYPESCRIPT', 'THREE.JS', 'MAPLIBRE', 'WEBSOCKETS'],
    href: '/projects/robotics-telemetry-console',
    hrefLabel: 'READ CASE STUDY',
    displayHref: 'Synthetic data · Desktop prototype',
    preview: <Image src={fleetImage} alt="Robotics dashboard showing simulated robotaxis on a Mountain View map with fleet health and topic panels" className="h-full w-full object-contain" sizes="(max-width: 768px) 90vw, 560px" />,
  },
];

/* ─── Project card ─── */

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const isLive = project.status === 'LIVE';
  const CardTag = project.href ? 'a' : 'div';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <CardTag
        {...(project.href
          ? {
              href: project.href,
              ...(project.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
            }
          : {})}
        className={`group block h-full border border-black/15 p-6 md:p-8 transition-colors duration-300 ${
          project.href ? 'hover:border-black cursor-pointer' : 'cursor-default'
        }`}
      >
        {/* Top row: index + status */}
        <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.2em] text-black/50 mb-6">
          <span>{project.index}</span>
          <span className="flex items-center gap-2">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isLive ? 'bg-black animate-pulse' : 'bg-black/30'
              }`}
            />
            {project.status}
          </span>
        </div>

        {/* Preview area */}
        <div className="aspect-[16/9] w-full mb-6 md:mb-8 bg-[#FAFAF7] border border-black/5 p-3 md:p-4 text-black">
          {project.preview}
        </div>

        {/* Title */}
        <h3 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-[0.95] tracking-tight mb-3">
          {project.title}
        </h3>

        {/* Tagline */}
        <p className="text-sm md:text-base text-black/70 mb-4">
          {project.tagline}
        </p>

        {/* Description */}
        <p className="text-sm leading-relaxed text-black/60 mb-6 max-w-md">
          {project.description}
        </p>

        {/* Stack chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[10px] tracking-[0.15em] text-black/60 border border-black/15 px-2 py-1"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Link row */}
        <div className="pt-6 border-t border-black/10 flex flex-wrap gap-3 items-center justify-between">
          {project.href ? (
            <>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-black transition-all duration-200 group-hover:tracking-[0.25em]">
                {project.hrefLabel} ↗
              </span>
              <span className="font-mono text-[11px] text-black/40">
                {project.displayHref}
              </span>
            </>
          ) : (
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-black/40">
              Work in progress
            </span>
          )}
        </div>
      </CardTag>
    </motion.div>
  );
};

/* ─── Section ─── */

export const Projects = () => {
  return (
    <section
      id="projects"
      data-section="projects"
      className="w-full bg-white text-black py-24 md:py-32 border-t border-black/10"
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-sm md:text-base uppercase tracking-wider font-medium mb-2">
            Projects
          </h2>
          <div className="h-[2px] bg-black w-24" />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.index} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
