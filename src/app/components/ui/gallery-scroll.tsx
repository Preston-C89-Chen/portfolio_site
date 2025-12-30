"use client";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef } from "react";

interface Project {
  title: string;
  company: string;
  description: string;
  image: StaticImageData;
  url?: string;
}

interface GalleryScrollProps {
  projects: Project[];
}

export const GalleryScroll = ({ projects }: GalleryScrollProps) => {
  const trackRef = useRef<HTMLDivElement>(null);

  // Duplicate projects for seamless infinite scroll
  const duplicatedProjects = [...projects, ...projects];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Calculate total width for animation reset
    const firstCard = track.querySelector('.gallery-card');
    if (!firstCard) return;

    const cardWidth = firstCard.clientWidth;
    const gap = 32; // 2rem gap
    const totalWidth = (cardWidth + gap) * projects.length;

    // Set CSS custom property for animation
    track.style.setProperty('--total-width', `${totalWidth}px`);
  }, [projects.length]);

  return (
    <section className="py-20 lg:py-32 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-container-lg mx-auto px-4 md:px-8 lg:px-16 mb-12">
        <h2 className="text-h1-mobile md:text-h1 font-medium">Selected Work</h2>
        <p className="text-body text-text-muted mt-4">
          A curated collection of design systems, component libraries, and interactive experiences
        </p>
      </div>

      {/* Infinite Scroll Track */}
      <div className="relative">
        <div
          ref={trackRef}
          className="gallery-track flex gap-8"
        >
          {duplicatedProjects.map((project, index) => (
            <article
              key={index}
              className="gallery-card flex-shrink-0 w-[400px] md:w-[500px] lg:w-[600px] group"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] bg-gray-2 overflow-hidden mb-6">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-slow group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <h3 className="text-h1-mobile font-medium mb-2 transition-colors duration-base group-hover:text-text-muted">
                {project.title}
              </h3>
              <p className="text-body text-text-muted mb-3">
                {project.company}
              </p>
              <p className="text-body-sm text-text-muted leading-relaxed">
                {project.description}
              </p>

              {/* Optional: View Project Link */}
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-body-sm text-text hover:text-text-muted transition-colors duration-base relative group/link"
                >
                  View project
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-text group-hover/link:w-full transition-all duration-base"></span>
                </a>
              )}
            </article>
          ))}
        </div>

        {/* Gradient Overlays for Fade Effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg to-transparent"></div>
      </div>

      <style jsx>{`
        .gallery-track {
          animation: scroll-horizontal 60s linear infinite;
          will-change: transform;
        }

        .gallery-track:hover {
          animation-play-state: paused;
        }

        @keyframes scroll-horizontal {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-1 * var(--total-width, 50%)));
          }
        }
      `}</style>
    </section>
  );
};
