'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface GalleryImage {
  src: string;
  label?: string;
}

interface WorkExperience {
  id: string;
  company: string;
  role: string;
  dateRange: string;
  description: string;
  images: GalleryImage[];
}

const workExperiences: WorkExperience[] = [
  {
    id: 'aclima',
    company: 'ACLIMA, INC.',
    role: 'AIR QUALITY DATA COLLECTOR',
    dateRange: '(2025 — 2026)',
    description:
      'Monitored air quality sensor hardware across data collection routes, ensuring accurate readings and data integrity. Worked independently to uphold quality standards, identifying and flagging anomalous readings for review. Maintained detailed field logs documenting equipment status, route conditions, and collection parameters.',
    images: [],
  },
  {
    id: 'synapsefi',
    company: 'SYNAPSEFI',
    role: 'SOFTWARE ENGINEER III',
    dateRange: '(2019 — 2024)',
    description:
      'Built data validation and visualization tooling for financial datasets, processing 10k+ account migrations with strict integrity requirements. Designed internal tooling dashboards for data permissions and quality controls. Optimized batch data processing pipelines for large-scale operations and real-time reporting.',
    images: [
      { src: '/sf-port1.jpg' },
      { src: '/sf-port2.jpg' },
      { src: '/sf-port3.jpg' },
    ],
  },
  {
    id: 'contract',
    company: 'CONTRACT ENGINEER',
    role: 'MULTIPLE COMPANIES',
    dateRange: '(2015 — 2019)',
    description:
      'Built data-driven applications integrating REST APIs and real-time data feeds across multiple client engagements. Developed reusable tooling components and established documentation standards. Integrated frontend systems with Django admin and backend data pipelines for end-to-end data workflows.',
    images: [
      { src: '/bli-port1.png', label: 'BriteLite Immersive' },
      { src: '/bli-port2.png', label: 'BriteLite Immersive' },
      { src: '/bli-port3.png', label: 'BriteLite Immersive' },
      { src: '/be-port1.png', label: 'BrightEdge' },
      { src: '/be-port2.png', label: 'BrightEdge' },
      { src: '/vf-port1.jpg', label: 'ViewFind' },
      { src: '/vf-port2.jpg', label: 'ViewFind' },
      { src: '/vf-port3.jpg', label: 'ViewFind' },
    ],
  },
];

/* ─── Sliding Gallery ─── */

const ImageGallery: React.FC<{ images: GalleryImage[] }> = ({ images }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, images.length - 1));
    setActiveIndex(clamped);
  };

  const currentLabel = images[activeIndex]?.label;

  return (
    <div className="mt-6">
      {/* Company label */}
      <AnimatePresence mode="wait">
        {currentLabel && (
          <motion.div
            key={currentLabel}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="mb-3"
          >
            <span className="text-xs uppercase tracking-[0.15em] text-white/60">
              {currentLabel}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slider viewport */}
      <div ref={containerRef} className="overflow-hidden rounded-sm">
        <motion.div
          className="flex"
          animate={{ x: `-${activeIndex * 100}%` }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        >
          {images.map((img, i) => (
            <div
              key={img.src}
              className="w-full flex-shrink-0"
              style={{ aspectRatio: '16 / 10' }}
            >
              <Image
                src={img.src}
                alt={img.label ? `${img.label} - ${i + 1}` : `Portfolio work ${i + 1}`}
                width={800}
                height={500}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation */}
      {images.length > 1 && (
        <div className="mt-4 flex items-center justify-between">
          {/* Dots */}
          <div className="flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? 'w-6 bg-white'
                    : 'w-1.5 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`View image ${i + 1}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex gap-3">
            <button
              onClick={() => scrollTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              className="text-sm tracking-wider text-white/50 transition-colors hover:text-white disabled:opacity-20 disabled:hover:text-white/50"
              aria-label="Previous image"
            >
              ←
            </button>
            <span className="text-sm tracking-wider text-white/30">
              {activeIndex + 1}/{images.length}
            </span>
            <button
              onClick={() => scrollTo(activeIndex + 1)}
              disabled={activeIndex === images.length - 1}
              className="text-sm tracking-wider text-white/50 transition-colors hover:text-white disabled:opacity-20 disabled:hover:text-white/50"
              aria-label="Next image"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── Accordion Item ─── */

interface AccordionItemProps {
  experience: WorkExperience;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  experience,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="border-b border-white">
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <button
          onClick={onToggle}
          className="w-full py-12 flex items-start justify-between hover:opacity-70 transition-opacity duration-200"
          aria-expanded={isOpen}
          aria-controls={`content-${experience.id}`}
        >
          <div className="flex-shrink-0 w-2/5 pr-8">
            <h3 className="text-left text-[clamp(2rem,6vw,5rem)] font-bold leading-[0.9] tracking-tight">
              {experience.company}
            </h3>
          </div>

          <div className="flex-1 flex items-start justify-between gap-8">
            <div className="flex-1">
              <div className="text-base mb-2 tracking-wide">
                {experience.dateRange}
              </div>
              <div className="text-xl font-normal tracking-wide">
                {experience.role}
              </div>
            </div>

            <div className="flex-shrink-0 pt-1">
              <div className="relative w-8 h-8">
                <motion.div
                  className="absolute top-1/2 left-0 w-full h-[2px] bg-white -translate-y-1/2"
                  initial={false}
                />
                <motion.div
                  className="absolute left-1/2 top-0 w-[2px] h-full bg-white -translate-x-1/2"
                  initial={false}
                  animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }}
                  transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
                />
              </div>
            </div>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={`content-${experience.id}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="overflow-hidden"
            >
              <div className="pb-12 pt-4">
                <div className="flex gap-12">
                  {/* Description — left column */}
                  <div className="w-2/5">
                    <p className="text-base leading-relaxed max-w-lg">
                      {experience.description}
                    </p>
                  </div>

                  {/* Gallery — right column */}
                  {experience.images.length > 0 && (
                    <div className="flex-1">
                      <ImageGallery images={experience.images} />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden">
        <button
          onClick={onToggle}
          className="w-full py-6 flex flex-col gap-4 hover:opacity-70 transition-opacity duration-200 text-left"
          aria-expanded={isOpen}
          aria-controls={`content-mobile-${experience.id}`}
        >
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-[2rem] font-bold leading-[0.9] tracking-tight flex-1">
              {experience.company}
            </h3>

            <div className="flex-shrink-0 pt-1">
              <div className="relative w-6 h-6">
                <motion.div
                  className="absolute top-1/2 left-0 w-full h-[2px] bg-white -translate-y-1/2"
                  initial={false}
                />
                <motion.div
                  className="absolute left-1/2 top-0 w-[2px] h-full bg-white -translate-x-1/2"
                  initial={false}
                  animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }}
                  transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-4">
            <div className="text-xs mb-2 tracking-wide opacity-70">
              {experience.dateRange}
            </div>
            <div className="text-sm font-normal tracking-wide">
              {experience.role}
            </div>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={`content-mobile-${experience.id}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="overflow-hidden"
            >
              <div className="pb-6 pt-6 border-t border-white/20">
                <p className="text-sm leading-relaxed mb-4">
                  {experience.description}
                </p>
                {experience.images.length > 0 && (
                  <ImageGallery images={experience.images} />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const WorkAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section data-section="work" className="w-full bg-black text-white py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
        <div className="mb-16 md:mb-24">
          <h2 className="text-sm md:text-base uppercase tracking-wider font-medium mb-2">
            Experience
          </h2>
          <div className="h-[2px] bg-white w-24" />
        </div>

        <div className="border-t border-white">
          {workExperiences.map((experience) => (
            <AccordionItem
              key={experience.id}
              experience={experience}
              isOpen={openId === experience.id}
              onToggle={() => handleToggle(experience.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkAccordion;
