import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

export type WizardQuestion = {
  text: string;
  section?: string;
  options: { label: string; value: string }[];
};

type Accent = "plum" | "emerald" | "gold";

const accentGradient: Record<Accent, string> = {
  plum:
    "linear-gradient(135deg, oklch(0.24 0.10 320) 0%, oklch(0.35 0.13 315) 60%, oklch(0.55 0.14 90) 130%)",
  emerald:
    "linear-gradient(135deg, oklch(0.30 0.10 155) 0%, oklch(0.48 0.11 155) 60%, oklch(0.75 0.13 90) 130%)",
  gold:
    "linear-gradient(135deg, oklch(0.55 0.14 60) 0%, oklch(0.75 0.13 85) 60%, oklch(0.86 0.10 90) 130%)",
};

const accentBtn: Record<Accent, string> = {
  plum: "bg-plum text-white hover:brightness-110",
  emerald: "bg-emerald text-white hover:brightness-110",
  gold: "bg-gold text-plum-deep hover:brightness-105",
};

const accentRing: Record<Accent, string> = {
  plum: "border-plum bg-plum text-white",
  emerald: "border-emerald bg-emerald text-white",
  gold: "border-gold bg-gold text-plum-deep",
};

export function QuizWizard({
  questions,
  answers,
  onAnswer,
  onSubmit,
  submitLabel,
  accent = "plum",
}: {
  questions: WizardQuestion[];
  answers: Record<number, string | undefined>;
  onAnswer: (index: number, value: string) => void;
  onSubmit: () => void;
  submitLabel: string;
  accent?: Accent;
}) {
  const [current, setCurrent] = useState(0);
  const total = questions.length;
  const q = questions[current];
  const selected = answers[current];
  const isLast = current === total - 1;
  const answeredCount = useMemo(
    () => Object.values(answers).filter((v) => v !== undefined && v !== "").length,
    [answers],
  );
  const pct = Math.round(((current + (selected ? 1 : 0)) / total) * 100);

  const canContinue = selected !== undefined && selected !== "";

  const goNext = () => {
    if (!canContinue) return;
    if (isLast) onSubmit();
    else setCurrent((c) => Math.min(total - 1, c + 1));
  };
  const goBack = () => setCurrent((c) => Math.max(0, c - 1));

  return (
    <div
      className="relative overflow-hidden rounded-[26px] p-[1.5px]"
      style={{ background: accentGradient[accent] }}
    >
      {/* Glass surface */}
      <div className="relative rounded-[24px] bg-white/70 p-6 backdrop-blur-2xl sm:p-8">
        {/* Ambient orbs behind the glass */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 -right-16 h-64 w-64 rounded-full blur-3xl"
          style={{ background: "oklch(0.75 0.13 85 / 0.28)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-16 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "oklch(0.68 0.06 305 / 0.28)" }}
        />

        {/* Header: progress */}
        <div className="relative">
          <div className="flex items-center justify-between text-[0.72rem]">
            <span className="inline-flex items-center gap-2 rounded-full border border-plum/15 bg-white/70 px-3 py-1 font-mono font-bold uppercase tracking-[0.14em] text-plum backdrop-blur">
              Question {String(current + 1).padStart(2, "0")}{" "}
              <span className="text-muted-foreground">/ {String(total).padStart(2, "0")}</span>
            </span>
            <span className="font-mono font-semibold text-muted-foreground">
              {answeredCount} of {total} · {pct}%
            </span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-plum/10">
            <motion.div
              className="h-full rounded-full"
              style={{ background: accentGradient[accent] }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          {q.section && (
            <div className="mt-5 flex items-center gap-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-emerald">
              <Sparkles size={12} /> {q.section}
            </div>
          )}
        </div>

        {/* Question + options: animated per index */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <h3 className="mt-4 font-display text-[1.25rem] font-semibold leading-snug text-black sm:text-[1.5rem]">
              {q.text}
            </h3>

            <div className="mt-6 grid gap-2.5">
              {q.options.map((o, i) => {
                const isSelected = selected === o.value;
                const letter = LETTERS[i] ?? String(i + 1);
                return (
                  <label
                    key={o.value + i}
                    className={cn(
                      "group flex cursor-pointer items-center gap-3.5 rounded-2xl border-2 bg-white/80 px-4 py-3.5 text-[0.94rem] leading-snug backdrop-blur transition-all duration-200",
                      isSelected
                        ? "border-transparent shadow-[0_16px_40px_-18px_rgba(24,0,38,0.35)]"
                        : "border-plum/10 hover:-translate-y-0.5 hover:border-plum/25 hover:bg-white",
                    )}
                    style={
                      isSelected
                        ? {
                            backgroundImage:
                              "linear-gradient(135deg, oklch(1 0 0 / 0.9), oklch(0.97 0.02 305 / 0.9))",
                          }
                        : undefined
                    }
                  >
                    <input
                      type="radio"
                      name={`q-${current}`}
                      value={o.value}
                      checked={isSelected}
                      onChange={() => onAnswer(current, o.value)}
                      className="sr-only"
                    />
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border-2 font-mono text-[0.85rem] font-bold transition-all",
                        isSelected
                          ? accentRing[accent]
                          : "border-plum/20 bg-white text-plum group-hover:border-plum/40",
                      )}
                    >
                      {isSelected ? <Check size={16} strokeWidth={3} /> : letter}
                    </span>
                    <span
                      className={cn(
                        "flex-1",
                        isSelected ? "font-semibold text-plum" : "text-foreground",
                      )}
                    >
                      {o.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Nav */}
        <div className="relative mt-7 flex flex-col-reverse items-stretch justify-between gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={goBack}
            disabled={current === 0}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-xl border-2 border-plum/15 bg-white/70 px-5 py-3 font-mono text-[0.85rem] font-bold uppercase tracking-[0.08em] text-plum backdrop-blur transition",
              current === 0
                ? "cursor-not-allowed opacity-40"
                : "hover:-translate-y-0.5 hover:border-plum/30 hover:bg-white",
            )}
          >
            <ArrowLeft size={16} /> Back
          </button>

          {/* Dot pager (compact on mobile) */}
          <div className="hidden items-center justify-center gap-1.5 sm:flex">
            {questions.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to question ${i + 1}`}
                onClick={() => setCurrent(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === current
                    ? "w-6 bg-plum"
                    : answers[i]
                      ? "w-2.5 bg-emerald/70"
                      : "w-2.5 bg-plum/20 hover:bg-plum/40",
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            disabled={!canContinue}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-mono text-[0.85rem] font-bold uppercase tracking-[0.08em] shadow-[0_14px_32px_-14px_rgba(24,0,38,0.45)] transition-all",
              accentBtn[accent],
              !canContinue && "cursor-not-allowed opacity-50 shadow-none",
              canContinue && "hover:-translate-y-0.5",
            )}
          >
            {isLast ? submitLabel : "Continue"}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function QuizIntroCard({
  eyebrow,
  title,
  description,
  meta,
}: {
  eyebrow: string;
  title: string;
  description: string;
  meta: { label: string; value: string }[];
}) {
  return (
    <div
      className="relative overflow-hidden rounded-[22px] border border-white/40 bg-white/70 p-8 backdrop-blur-xl md:p-10"
      style={{
        boxShadow: "0 30px 80px -30px rgba(24,0,38,0.25)",
      }}
    >
      <span
        aria-hidden
        className="absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl"
        style={{ background: "oklch(0.75 0.13 85 / 0.35)" }}
      />
      <span
        aria-hidden
        className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full blur-3xl"
        style={{ background: "oklch(0.68 0.06 305 / 0.32)" }}
      />
      <div className="relative">
        <div className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.18em] text-emerald">
          {eyebrow}
        </div>
        <h1 className="mt-3">{title}</h1>
        <p className="lead mt-3 max-w-[52ch]">{description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {meta.map((m) => (
            <span
              key={m.label}
              className="inline-flex items-center gap-2 rounded-full border border-plum/15 bg-white/80 px-3.5 py-1.5 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-plum backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              {m.label} · {m.value}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
