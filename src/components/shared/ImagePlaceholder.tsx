import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  aspect?: "portrait" | "wide" | "square";
  className?: string;
  label?: string;
}

export function ImagePlaceholder({ aspect = "portrait", className, label = "Image Placeholder" }: ImagePlaceholderProps) {
  return (
    <div className={cn(
      "rounded-radius overflow-hidden bg-gradient-to-br from-plum to-emerald-soft relative flex items-center justify-center text-white/85 font-sans text-xs font-bold tracking-widest uppercase text-center p-6",
      aspect === "portrait" && "aspect-[4/5]",
      aspect === "wide" && "aspect-[16/9]",
      aspect === "square" && "aspect-square",
      className
    )}>
      <div className="absolute inset-0 bg-radial from-gold/20 to-transparent opacity-40" />
      <span className="relative z-10">{label}</span>
    </div>
  );
}