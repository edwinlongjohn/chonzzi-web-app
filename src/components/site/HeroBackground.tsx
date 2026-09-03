import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import heroImage  from "@/assets/hero-background.png";

/**
 * Cinematic hero background: image + deep purple + gold gradient blend.
 */
export function HeroBackground({
  children,
  className,
  imageOpacity = 0.6,
  image = heroImage,
}: {
  children: ReactNode;
  className?: string;
  imageOpacity?: number;
  image?: string;
}) {
  return (
    <div className={cn("relative isolate overflow-hidden", className)}>
      <img
        src={image}
        alt=""
        aria-hidden
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        style={{ opacity: imageOpacity }}
      />
      {/* Deep purple + gold-tinged blend (no white washout) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(125deg, oklch(0.16 0.10 320 / 0.95) 0%, oklch(0.22 0.13 320 / 0.85) 35%, oklch(0.28 0.14 315 / 0.70) 65%, oklch(0.34 0.15 305 / 0.55) 100%)",
        }}
      />
      {/* Subtle gold warmth in one corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-24 -z-10 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: "oklch(0.68 0.16 65 / 0.22)" }}
      />
      {/* Second purple glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 -z-10 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "oklch(0.38 0.16 315 / 0.35)" }}
      />
      {/* Bottom fade so content below the hero blends cleanly */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-44"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, oklch(0.42 0.14 315 / 0.45) 45%, oklch(0.52 0.14 315 / 0.2) 78%, oklch(0.72 0.10 80 / 0.35) 100%)",
        }}
      />
      {children}
    </div>
  );
}
