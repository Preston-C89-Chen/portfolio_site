"use client";
import { motion } from "framer-motion";

const skills = [
  "PYTHON",
  "DATA QUALITY",
  "TYPESCRIPT",
  "SQL",
  "DOCKER",
  "REST APIs",
  "GRAPHQL",
  "DATA PIPELINES",
  "REACT",
  "GIT",
  "NODE.JS",
  "COMPUTER VISION",
  "DEEP LEARNING",
  "ANNOTATION TOOLING",
  "ISAAC SIM",
  "ROS 2",
  "OPENUSD",
];

export const SkillsTicker = () => {
  // Duplicate the skills array for seamless loop
  const duplicatedSkills = [...skills, ...skills];

  return (
    <section className="w-full bg-black text-white py-8 border-y-2 border-white overflow-hidden">
      <div className="flex">
        {/* First set of skills */}
        <motion.div
          className="flex gap-12 pr-12"
          animate={{
            x: [0, -100 + "%"],
          }}
          transition={{
            x: {
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {duplicatedSkills.map((skill, index) => (
            <div key={`${skill}-${index}`} className="flex items-center gap-12 flex-shrink-0">
              <span className="text-xl md:text-2xl font-bold tracking-tight whitespace-nowrap">
                {skill}
              </span>
              {/* Separator dot */}
              <span className="text-xl md:text-2xl">*</span>
            </div>
          ))}
        </motion.div>

        {/* Second set for seamless loop */}
        <motion.div
          className="flex gap-12 pr-12"
          animate={{
            x: [0, -100 + "%"],
          }}
          transition={{
            x: {
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {duplicatedSkills.map((skill, index) => (
            <div key={`${skill}-duplicate-${index}`} className="flex items-center gap-12 flex-shrink-0">
              <span className="text-xl md:text-2xl font-bold tracking-tight whitespace-nowrap">
                {skill}
              </span>
              {/* Separator dot */}
              <span className="text-xl md:text-2xl">*</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
