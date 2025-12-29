"use client";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";

interface Project {
  number: string;
  title: string;
  company: string;
  description: string;
  tags: string[];
  image: StaticImageData;
  url?: string;
}

interface WorkSwissProps {
  projects: Project[];
}

export const WorkSwiss = ({ projects }: WorkSwissProps) => {
  return (
    <section className="py-24">
      <div className="swiss-grid">
        {/* Section Header */}
        <div className="col-span-12 mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="accent-square"></div>
            <h2 className="header-caps text-2xl md:text-3xl">Selected Work</h2>
          </div>
          <p className="text-sm md:text-base text-gray-9 max-w-2xl">
            Showcasing design systems, component libraries, and interactive experiences
          </p>
        </div>

        {/* Project Grid */}
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="col-span-12 md:col-span-6 lg:col-span-4"
          >
            <article className="border border-gray-3 p-6 hover:border-swiss-red transition-colors duration-200">
              {/* Number */}
              <span className="text-xs font-bold text-gray-7 block mb-4">
                {project.number}
              </span>

              {/* Image */}
              <div className="mb-4 aspect-[4/3] bg-gray-2 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  width={600}
                  height={450}
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-1">{project.title}</h3>
              <p className="text-sm text-gray-9 mb-1">{project.company}</p>
              <p className="text-sm text-gray-9 mb-4">{project.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs uppercase tracking-wide bg-gray-2 border border-gray-4 px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
