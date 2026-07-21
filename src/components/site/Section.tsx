import { cn } from "@/lib/utils";
import type { CSSProperties, ReactNode } from "react";

type Variant = "cream" | "dark" | "plum" | "tint";

export function Section({
  children,
  variant = "cream",
  tight = false,
  className,
  id,
  style,
}: {
  children: ReactNode;
  variant?: Variant;
  tight?: boolean;
  className?: string;
  id?: string;
  style?: CSSProperties;
}) {
  const variants: Record<Variant, string> = {
    cream: "bg-background text-foreground",
    dark: "bg-plum-deep text-[#EFEAE2] dark-surface",
    plum: "bg-plum text-[#EFEAE2] dark-surface",
    tint: "bg-[color:var(--tint)] text-foreground",
  };
  return (
    <section
      id={id}
      style={style}
      className={cn(
        tight ? "py-14" : "py-20 md:py-[84px]",
        variants[variant],
        className,
      )}
    >
      {children}
    </section>
  );
}
