"use client";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";

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
  return (
    <section className="py-20 lg:py-32 relative">
      {/* Horizontal Grid Line - Top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-text opacity-20" />

      {/* Section Header with Grid */}
      <div className="max-w-container-xl mx-auto px-4 md:px-8 lg:px-16 mb-16">
        <div className="grid grid-cols-12 gap-8 relative">
          {/* Vertical Grid Lines */}
          <div className="absolute inset-0 grid grid-cols-12 gap-8 pointer-events-none opacity-20">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-r border-text"></div>
            ))}
          </div>

          {/* Geometric Element - Square */}
          <div className="absolute -top-12 right-0 w-16 h-16 border-2 border-text" />

          <div className="col-span-12 lg:col-span-6 relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-3 h-3 bg-text"></div>
              <h2 className="text-h1-mobile md:text-h1 font-semibold">Selected Work</h2>
            </div>
            <p className="text-body-lg font-medium leading-relaxed max-w-lg">
              A curated collection of design systems, component libraries, and
              interactive experiences that showcase the intersection of design
              and engineering excellence.
            </p>
          </div>

          {/* Geometric Element - Circle */}
          <div className="absolute top-8 right-24 w-8 h-8 rounded-full bg-text hidden lg:block" />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-container-xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-12 gap-8 relative">
          {/* Vertical Grid Lines - Desktop Only */}
          <div className="absolute inset-0 pointer-events-none opacity-20 lg:block hidden">
            <div className="grid grid-cols-12 gap-8 h-full">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="border-r border-text h-full"></div>
              ))}
            </div>
          </div>

          {projects.map((project, index) => {
            // Alternating grid layout for rhythm
            const isEven = index % 2 === 0;

            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0.0, 0.2, 1] }}
                className={`col-span-12 ${isEven ? 'lg:col-span-7 lg:col-start-1' : 'lg:col-span-8 lg:col-start-5'} relative group mb-16 lg:mb-24`}
              >
                {/* Geometric Accent */}
                <div className={`absolute ${isEven ? '-left-4' : '-right-4'} top-0 w-2 h-24 bg-text`} />

                {/* Image with Border */}
                <div className="relative aspect-[4/3] bg-gray-2 overflow-hidden border-2 border-text mb-6">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-slow group-hover:scale-105"
                  />

                  {/* Project Number Overlay */}
                  <div className="absolute top-4 left-4 w-12 h-12 border-2 border-bg bg-text/90 flex items-center justify-center">
                    <span className="text-body-sm font-bold text-bg">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-h1-mobile font-semibold mb-2 group-hover:text-text-muted transition-colors duration-base">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-1.5 h-1.5 bg-text"></div>
                      <p className="text-body font-medium text-text-muted">
                        {project.company}
                      </p>
                    </div>
                  </div>

                  <p className="text-body text-text-muted leading-relaxed max-w-lg">
                    {project.description}
                  </p>

                  {/* View Project Link */}
                  {project.url && (
                    <div className="flex items-center gap-3 pt-2">
                      <div className="w-2 h-2 border border-text"></div>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-body-sm font-medium text-text hover:text-text-muted transition-colors duration-base relative group/link"
                      >
                        View project
                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-text group-hover/link:w-full transition-all duration-base"></span>
                      </a>
                    </div>
                  )}
                </div>

                {/* Horizontal Divider */}
                <div className="absolute -bottom-8 left-0 right-0 h-[1px] bg-text opacity-20" />
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Horizontal Grid Line - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-text opacity-20" />
    </section>
  );
};
