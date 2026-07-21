import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Tone = "gold" | "green" | "lilac";

export function Eyebrow({
  children,
  tone = "gold",
  className,
  center = false,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  center?: boolean;
}) {
  const toneClass =
    tone === "green"
      ? "text-emerald"
      : tone === "lilac"
        ? "text-lilac"
        : "text-gold";
  return (
    <div
      className={cn(
        "eyebrow",
        toneClass,
        center && "justify-center",
        className,
      )}
    >
      {children}
    </div>
  );
}
