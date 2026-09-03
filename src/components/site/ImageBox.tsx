import { cn } from "@/lib/utils";

type Ratio = "portrait" | "wide" | "square" |"none";
type Animation = "none" | "float" | "pulse" | "drift";

export function ImageBox({
  label,
  src,
  alt,
  shadow = true,
  ratio = "wide",
  animation = "none",
  className,
}: {
  label?: string;
  src?: string;
  alt?: string;
  ratio?: Ratio;
  shadow?: boolean;
  animation?: Animation;
  className?: string;
}) {
  const ratios: Record<Ratio, string> = {
    portrait: "aspect-[4/5]",
    wide: "aspect-[6/7] md:aspect-[6/5]",
    square: "aspect-square",
    none: "",
  };

  const animations: Record<Animation, string> = {
    none: "",
    float: "animate-image-float",
    pulse: "animate-image-pulse",
    drift: "animate-image-drift",
  };

  if (src) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-[14px] ",
          ratios[ratio],
          shadow ? "shadow-[0_24px_60px_-28px_rgba(24,0,38,0.35)]" : "",
          className,
        )}
      >
        <img
          src={src}
          alt={alt ?? ""}
          className={cn(
            "h-full w-full object-cover will-change-transform",
            animations[animation]
          )}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-[14px] p-5 text-center font-mono text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-white/85",
        "bg-[linear-gradient(135deg,var(--plum)_0%,var(--emerald)_130%)]",
        ratios[ratio],
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(201,162,39,0.28),transparent_55%)]" />
      <span className="relative z-10 whitespace-pre-line leading-snug">
        {label}
      </span>
    </div>
  );
}