import { cn } from "@/lib/utils";

type Ratio = "portrait" | "wide" | "square";

export function ImageBox({
  label,
  ratio = "wide",
  className,
}: {
  label: string;
  ratio?: Ratio;
  className?: string;
}) {
  const ratios: Record<Ratio, string> = {
    portrait: "aspect-[4/5]",
    wide: "aspect-[16/9]",
    square: "aspect-square",
  };
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
      <span className="relative z-10 whitespace-pre-line leading-snug">{label}</span>
    </div>
  );
}
