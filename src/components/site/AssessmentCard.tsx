import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type Tone = "mp" | "fhc" | "rp";
const toneBar: Record<Tone, string> = {
  mp: "from-lilac to-plum",
  fhc: "from-emerald to-emerald-soft",
  rp: "from-gold to-gold-soft",
};
const ctaClass: Record<Tone, string> = {
  mp: "bg-plum text-white",
  fhc: "bg-emerald text-white",
  rp: "bg-gold text-plum-deep",
};
const toneGradient: Record<Tone, string> = {
  mp: "linear-gradient(180deg, oklch(0.97 0.02 305) 0%, oklch(1 0 0) 60%)",
  fhc: "linear-gradient(180deg, oklch(0.97 0.02 155) 0%, oklch(1 0 0) 60%)",
  rp: "linear-gradient(180deg, oklch(0.97 0.03 85) 0%, oklch(1 0 0) 60%)",
};

export function AssessmentCard({
  tone,
  tag,
  title,
  question,
  description,
  meta,
  ctaLabel,
  to,
}: {
  tone: Tone;
  tag: string;
  title?: string;
  question: string;
  description: string;
  meta: string[];
  ctaLabel: string;
  to: string;
}) {
  return (
    <div
      style={{ background: toneGradient[tone] }}
      className="group relative flex flex-col gap-3 overflow-hidden rounded-[16px] border border-line p-7 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_28px_60px_-24px_rgba(24,0,38,0.25)]"
    >
      {/* Hover-reveal gradient bar */}
      <span
        aria-hidden
        className={cn(
          "absolute left-0 top-0 h-[3px] w-0 rounded-b bg-gradient-to-r transition-all duration-500 ease-out group-hover:w-full",
          toneBar[tone],
        )}
      />
      {/* Corner accent */}
      <span
        aria-hidden
        className={cn(
          "absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40",
          toneBar[tone],
        )}
      />
      <span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] text-muted-foreground">
        {tag}
      </span>
      {title && <h3 className="m-0">{title}</h3>}
      <p className="m-0 font-display text-[1.28rem] font-semibold italic text-plum">
        "{question}"
      </p>
      <p className="flex-1 text-[0.92rem] text-muted-foreground">{description}</p>
      <div className="flex flex-wrap gap-3.5 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
        {meta.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
      <Link
        to={to}
        className={cn(
          "group/cta inline-flex items-center gap-2 self-start rounded-lg px-[22px] py-3 font-mono text-[0.85rem] font-bold no-underline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(24,0,38,0.22)] hover:pr-7",
          ctaClass[tone],
        )}
      >
        {ctaLabel}
        <ArrowRight size={16} className="transition-transform duration-300 group-hover/cta:translate-x-1" />
      </Link>
    </div>
  );
}
