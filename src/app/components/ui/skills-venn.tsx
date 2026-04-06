"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkillCategory {
  title: string;
  skills: string[];
  color: string;
}

export const SkillsVenn = () => {
  const designSkills: SkillCategory = {
    title: "Design",
    skills: ["Figma", "Adobe Suite", "UI/UX", "Design Systems", "Prototyping"],
    color: "colorDesign",
  };

  const engineeringSkills: SkillCategory = {
    title: "Engineering",
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "Performance"],
    color: "colorCode",
  };

  const hybridSkills = [
    "Component Libraries",
    "Design Tokens",
    "Framer Motion",
    "Accessibility",
    "Micro-interactions",
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto py-20 px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold text-center mb-12 text-white"
      >
        Design + Engineering
      </motion.h2>

      {/* Venn Diagram Container */}
      <div className="relative h-[500px] md:h-[600px] flex items-center justify-center">
        {/* Left Circle - Design */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="absolute left-[10%] md:left-[15%] w-[280px] h-[280px] md:w-[350px] md:h-[350px]"
        >
          <div className="relative w-full h-full">
            {/* Circle background */}
            <div className="absolute inset-0 rounded-full bg-colorDesign/20 backdrop-blur-sm border-2 border-colorDesign/40" />

            {/* Design label */}
            <div className="absolute top-8 left-8 md:top-12 md:left-12">
              <h3 className="text-xl md:text-2xl font-bold text-colorDesign mb-4">
                {designSkills.title}
              </h3>
              <ul className="space-y-2">
                {designSkills.skills.map((skill, idx) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.3 }}
                    className="text-sm md:text-base text-white/80"
                  >
                    • {skill}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Right Circle - Engineering */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="absolute right-[10%] md:right-[15%] w-[280px] h-[280px] md:w-[350px] md:h-[350px]"
        >
          <div className="relative w-full h-full">
            {/* Circle background */}
            <div className="absolute inset-0 rounded-full bg-colorCode/20 backdrop-blur-sm border-2 border-colorCode/40" />

            {/* Engineering label */}
            <div className="absolute top-8 right-8 md:top-12 md:right-12 text-right">
              <h3 className="text-xl md:text-2xl font-bold text-colorCode mb-4">
                {engineeringSkills.title}
              </h3>
              <ul className="space-y-2">
                {engineeringSkills.skills.map((skill, idx) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.3 }}
                    className="text-sm md:text-base text-white/80"
                  >
                    {skill} •
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Center Intersection - Hybrid Skills */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute z-10 w-[180px] md:w-[220px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-colorDesign to-colorCode rounded-2xl blur-xl opacity-40" />

            {/* Content card */}
            <div className="relative bg-gradient-to-br from-surface2 to-surface3 backdrop-blur-md rounded-2xl border border-white/20 p-4 md:p-6">
              <h4 className="text-base md:text-lg font-bold text-center bg-gradient-to-r from-colorDesign to-colorCode bg-clip-text text-transparent mb-3">
                Sweet Spot
              </h4>
              <ul className="space-y-1.5">
                {hybridSkills.map((skill, idx) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.6 }}
                    className="text-xs md:text-sm text-white/90 text-center font-medium"
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="text-center text-white/70 mt-12 max-w-2xl mx-auto text-sm md:text-base"
      >
        With a BA in Graphic Design and 8+ years of frontend engineering experience,
        I thrive at the intersection of design and code—crafting design systems,
        component libraries, and delightful user experiences.
      </motion.p>
    </div>
  );
};
