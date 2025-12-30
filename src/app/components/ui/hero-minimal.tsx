"use client";
import { motion } from "framer-motion";

export const HeroMinimal = () => {
  return (
    <section className="min-h-screen relative">
      {/* Grid Container */}
      <div className="max-w-container-xl mx-auto px-4 md:px-8 lg:px-16 h-screen flex items-center">
        {/* Editorial Grid - Left Aligned */}
        <div className="grid grid-cols-12 gap-8 w-full relative">
          {/* Vertical Grid Lines */}
          <div className="absolute inset-0 grid grid-cols-12 gap-8 pointer-events-none opacity-20">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-r border-text"></div>
            ))}
          </div>

          {/* Geometric Element - Top Left */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
            className="absolute top-0 left-0 w-24 h-24 border-2 border-text"
          />

          {/* Geometric Element - Circle */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
            className="absolute top-32 right-16 w-12 h-12 rounded-full bg-text"
          />

          {/* Content - Spans 8 columns on large screens */}
          <div className="col-span-12 lg:col-span-8 relative z-10">
            {/* Hero Display - Left Aligned */}
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
              className="font-semibold text-display-sm md:text-display-lg lg:text-display-xl mb-8 leading-[0.9]"
            >
              Preston Chen
            </motion.h1>

            {/* Horizontal Divider */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
              className="h-[2px] bg-text mb-8 max-w-md"
            />

            {/* Subtitle - Bolder, More Prominent */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
              className="text-h1-mobile md:text-h1 font-semibold mb-6"
            >
              Frontend Design Engineer
            </motion.p>

            {/* Flavor Text - Enhanced */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
              className="max-w-xl space-y-6"
            >
              <p className="text-body-lg font-medium leading-relaxed">
                Crafting the intersection where beautiful interfaces meet
                solid engineering—designing systems that scale, components
                that breathe, and experiences that resonate.
              </p>

              <p className="text-body text-text-muted leading-relaxed">
                8+ years bridging design and development. Building design systems,
                component libraries, and pixel-perfect interfaces with thoughtful
                microinteractions. BA in Graphic Design meets deep React/TypeScript
                expertise.
              </p>
            </motion.div>

            {/* Contact Link with Geometric Accent */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
              className="mt-12 flex items-center gap-4"
            >
              <div className="w-2 h-2 bg-text"></div>
              <a
                href="mailto:pchen415@gmail.com"
                className="text-body font-medium text-text hover:text-text-muted transition-colors duration-base relative group"
              >
                Get in touch
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-text group-hover:w-full transition-all duration-base"></span>
              </a>
            </motion.div>
          </div>

          {/* Geometric Element - Bottom Right Square */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
            className="absolute bottom-0 right-0 w-16 h-16 border-2 border-text"
          />
        </div>
      </div>

      {/* Horizontal Grid Line - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-text opacity-20" />
    </section>
  );
};
