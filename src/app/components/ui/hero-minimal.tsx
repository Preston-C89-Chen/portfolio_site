"use client";
import { motion } from "framer-motion";

export const HeroMinimal = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16">
      <div className="max-w-container-lg mx-auto text-center">
        {/* Hero Display - Ultra Large Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          className="font-semibold text-display-sm md:text-display-lg lg:text-display-xl mb-6"
        >
          Preston Chen
        </motion.h1>

        {/* Subtitle - Large Body */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0.0, 0.2, 1] }}
          className="text-body-lg text-text-muted mb-4"
        >
          Frontend Design Engineer
        </motion.p>

        {/* Description - Base Body */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
          className="text-body text-text-muted max-w-2xl mx-auto leading-relaxed"
        >
          Bridging design and development with 8+ years of experience building
          design systems, component libraries, and thoughtful user interfaces
          with pixel-perfect precision.
        </motion.p>

        {/* Optional: Contact Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
          className="mt-12"
        >
          <a
            href="mailto:pchen415@gmail.com"
            className="inline-block text-body text-text hover:text-text-muted transition-colors duration-base relative group"
          >
            Get in touch
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-text group-hover:w-full transition-all duration-base"></span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
