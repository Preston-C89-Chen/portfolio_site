"use client";
import { motion } from "framer-motion";

export const HeroSwiss = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="swiss-grid">
        <div className="col-span-12 md:col-span-8">
          {/* Geometric Accents */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="accent-circle-yellow"></div>
            <div className="accent-circle-orange"></div>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            PRESTON CHEN
          </motion.h1>

          {/* Role */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-xl md:text-2xl text-gray-9 mb-12"
          >
            Frontend Design Engineer
          </motion.p>

          {/* Manifesto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="max-w-2xl"
          >
            <p className="text-base md:text-lg leading-relaxed">
              I bridge design and development.
              <br />
              I build systems, not just features.
              <br />
              I make it fast. I make it beautiful.
              <br />
              <strong>I make it carefully.</strong>
            </p>
          </motion.div>

          {/* Divider */}
          <div className="divider-swiss-red my-12"></div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="max-w-2xl"
          >
            <p className="text-sm md:text-base text-gray-9">
              With a <strong>BA in Graphic Design</strong> and <strong>8+ years</strong> of frontend engineering experience,
              I specialize in React, TypeScript, and modern animation libraries to create
              pixel-perfect, performant design systems and delightful user interfaces.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
