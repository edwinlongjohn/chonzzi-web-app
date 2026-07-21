import { cn } from "@/lib/utils";
import type { CSSProperties, ReactNode } from "react";

export function BrandCard({
  children,
  className,
  variant = "solid",
  style,
}: {
  children: ReactNode;
  className?: string;
  variant?: "solid" | "tint";
  style?: CSSProperties;
}) {
  return (
    <div
      style={style}
      className={cn(
        "rounded-[14px] p-7",
        variant === "solid" ? "border border-line bg-white" : "border-none bg-[color:var(--tint)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
