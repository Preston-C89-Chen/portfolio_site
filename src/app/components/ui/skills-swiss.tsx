"use client";
import { motion } from "framer-motion";

export const SkillsSwiss = () => {
  const designSkills = [
    "Figma",
    "Adobe Creative Suite",
    "UI/UX Design",
    "Design Systems",
    "Prototyping",
    "Typography",
  ];

  const engineeringSkills = [
    "React / TypeScript",
    "Next.js / Node.js",
    "Framer Motion / Three.js",
    "GraphQL / REST APIs",
    "Component Libraries",
    "Performance Optimization",
  ];

  const hybridSkills = [
    "Design Tokens",
    "Accessibility (WCAG)",
    "Micro-interactions",
    "Responsive Design",
    "Version Control (Git)",
    "Storybook",
  ];

  return (
    <section className="py-24 bg-gray-1">
      <div className="swiss-grid">
        {/* Section Header */}
        <div className="col-span-12 mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="accent-circle-orange"></div>
            <h2 className="header-caps text-2xl md:text-3xl">Design + Engineering</h2>
          </div>
          <p className="text-sm md:text-base text-gray-9 max-w-2xl">
            The intersection where beautiful interfaces meet solid code
          </p>
        </div>

        {/* Design Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="col-span-12 md:col-span-6 lg:col-span-4"
        >
          <div className="border-l-2 border-swiss-red pl-6 mb-4">
            <h3 className="header-caps text-lg mb-4">Design</h3>
          </div>
          <ul className="space-y-2">
            {designSkills.map((skill, idx) => (
              <li
                key={idx}
                className="text-sm md:text-base py-2 border-b border-gray-3 last:border-0"
              >
                {skill}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Engineering Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="col-span-12 md:col-span-6 lg:col-span-4"
        >
          <div className="border-l-2 border-swiss-black pl-6 mb-4">
            <h3 className="header-caps text-lg mb-4">Engineering</h3>
          </div>
          <ul className="space-y-2">
            {engineeringSkills.map((skill, idx) => (
              <li
                key={idx}
                className="text-sm md:text-base py-2 border-b border-gray-3 last:border-0"
              >
                {skill}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Hybrid Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="col-span-12 md:col-span-6 lg:col-span-4"
        >
          <div className="border-l-2 border-swiss-yellow pl-6 mb-4">
            <h3 className="header-caps text-lg mb-4">Sweet Spot</h3>
          </div>
          <ul className="space-y-2">
            {hybridSkills.map((skill, idx) => (
              <li
                key={idx}
                className="text-sm md:text-base py-2 border-b border-gray-3 last:border-0 font-medium"
              >
                {skill}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};
