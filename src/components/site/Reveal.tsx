import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Smooth, slick scroll-in reveal. Wrap any block to animate it in on scroll.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as: _as,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section";
}) {
  const variants: Variants = {
    hidden: { opacity: 0, y, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
    },
  };
  const Comp = _as === "section" ? motion.section : motion.div;
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </Comp>
  );
}
