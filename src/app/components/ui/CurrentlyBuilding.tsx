'use client';

import { motion } from 'framer-motion';

const items = [
  {
    label: 'MS DATA SCIENCE',
    detail: 'University of Colorado Boulder — Computer Vision, Deep Learning, Modern AI Models for Vision',
  },
  {
    label: 'SIMULATION ENGINEERING',
    detail: 'Isaac Sim, ROS 2, OpenUSD — working toward sim-to-real data pipelines for robotics',
  },
];

export const CurrentlyBuilding = () => {
  return (
    <section className="w-full bg-[#F5F5F0] text-black py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-sm md:text-base uppercase tracking-wider font-medium mb-2">
            Currently Building
          </h2>
          <div className="h-[2px] bg-black w-24" />
        </div>

        {/* Items */}
        <div className="space-y-12">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border-b border-black/10 pb-8"
            >
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                {item.label}
              </h3>
              <p className="text-sm md:text-base text-black/60 max-w-2xl">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
