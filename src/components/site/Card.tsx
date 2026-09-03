import { cn } from "@/lib/utils";
import type { CSSProperties, ReactNode } from "react";

export function BrandCard({
  children,
  className,
  variant = "solid",
  style,
  interactive = true,
}: {
  children: ReactNode;
  className?: string;
  variant?: "solid" | "tint";
  style?: CSSProperties;
  interactive?: boolean;
}) {
  return (
    <div
      style={style}
      className={cn(
        "group relative overflow-hidden rounded-[16px] p-7 transition-all duration-500 ease-out",
        variant === "solid"
          ? "border border-line bg-white"
          : "border border-transparent bg-[color:var(--tint)]",
        interactive &&
          "hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_24px_54px_-22px_rgba(24,0,38,0.22)]",
        className,
      )}
    >
      {interactive && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] w-0 bg-gradient-to-r from-gold via-gold-soft to-gold transition-all duration-500 ease-out group-hover:w-full"
        />
      )}
      {children}
    </div>
  );
}
