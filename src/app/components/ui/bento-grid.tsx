"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
  colSpan?: number;
  rowSpan?: number;
}

export const BentoGrid = ({ children, className }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto auto-rows-[200px]",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({
  title,
  description,
  icon,
  className,
  children,
  colSpan = 1,
  rowSpan = 1,
}: BentoCardProps) => {
  const colSpanClass = {
    1: "lg:col-span-1",
    2: "lg:col-span-2",
    3: "lg:col-span-3",
    4: "lg:col-span-4",
  }[colSpan];

  const rowSpanClass = {
    1: "lg:row-span-1",
    2: "lg:row-span-2",
    3: "lg:row-span-3",
  }[rowSpan];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        "bg-gradient-to-br from-surface2 to-surface3",
        "backdrop-blur-md border border-white/10",
        "p-6 flex flex-col",
        "hover:border-blueThree/30 transition-all duration-300",
        "hover:shadow-[0_0_30px_rgba(130,224,249,0.15)]",
        colSpanClass,
        rowSpanClass,
        className
      )}
    >
      {/* Background gradient effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blueOne/5 to-blueThree/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {icon && (
          <div className="mb-4 text-blueThree group-hover:text-blueOne transition-colors duration-300">
            {icon}
          </div>
        )}

        <h3 className="text-lg md:text-xl font-bold text-white mb-2">
          {title}
        </h3>

        <p className="text-sm md:text-base text-white/70 mb-4">
          {description}
        </p>

        {children && <div className="mt-auto">{children}</div>}
      </div>
    </motion.div>
  );
};

// Preset layout patterns
export const BentoGridShowcase = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 max-w-7xl mx-auto auto-rows-[200px]">
      {children}
    </div>
  );
};
