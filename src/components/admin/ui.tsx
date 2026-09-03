import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-[1.7rem] leading-tight">{title}</h1>
        {description && (
          <p className="mt-1.5 max-w-xl text-[0.9rem] text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-2.5">{actions}</div>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon,
  tone = "plum",
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon: ReactNode;
  tone?: "plum" | "emerald" | "gold";
}) {
  const toneClass = {
    plum: "bg-plum/10 text-plum",
    emerald: "bg-emerald/10 text-emerald",
    gold: "bg-gold/15 text-gold",
  }[tone];
  return (
    <div className="rounded-[18px] border border-line bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-28px_rgba(24,0,38,0.35)]">
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted-foreground">
          {label}
        </p>
        <span className={cn("flex h-9 w-9 items-center justify-center rounded-xl", toneClass)}>
          {icon}
        </span>
      </div>
      <p className="mt-3 font-display text-[2rem] font-semibold leading-none text-plum">{value}</p>
      {hint && <p className="mt-1.5 text-[0.8rem] text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-[18px] border border-line bg-white", className)}>
      {children}
    </div>
  );
}

export const inputClass =
  "rounded-xl border border-line bg-white px-3.5 py-2.5 text-[0.88rem] transition focus:border-plum/40 focus:outline-none";

export const btnClass =
  "inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 font-mono text-[0.75rem] font-bold uppercase tracking-[0.08em] text-plum transition hover:bg-[color:var(--tint)]";

export const btnPrimaryClass =
  "inline-flex items-center gap-2 rounded-xl bg-plum px-4 py-2.5 font-mono text-[0.75rem] font-bold uppercase tracking-[0.08em] text-white transition hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(24,0,38,0.22)] disabled:pointer-events-none disabled:opacity-50";

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-gold/15 text-gold",
    contacted: "bg-lilac/25 text-plum",
    enrolled: "bg-emerald/12 text-emerald",
    archived: "bg-muted text-muted-foreground",
    active: "bg-emerald/12 text-emerald",
    unsubscribed: "bg-muted text-muted-foreground",
  };
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 font-mono text-[0.65rem] font-bold uppercase tracking-[0.08em]",
        map[status] ?? "bg-muted text-muted-foreground",
      )}
    >
      {status}
    </span>
  );
}
