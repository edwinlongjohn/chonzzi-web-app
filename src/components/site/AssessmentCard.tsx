import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type Tone = "mp" | "fhc" | "rp";
const toneBar: Record<Tone, string> = {
  mp: "bg-lilac",
  fhc: "bg-emerald",
  rp: "bg-gold",
};
const ctaClass: Record<Tone, string> = {
  mp: "bg-plum text-white",
  fhc: "bg-emerald text-white",
  rp: "bg-gold text-plum-deep",
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
    <div className="relative flex flex-col gap-3 rounded-[14px] border border-line bg-white p-7 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(24,0,38,0.12)]">
      <span
        className={cn(
          "absolute left-7 right-7 top-0 h-1 rounded-b",
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
          "self-start rounded-lg px-[22px] py-3 font-mono text-[0.85rem] font-bold no-underline transition hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(24,0,38,0.2)]",
          ctaClass[tone],
        )}
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
