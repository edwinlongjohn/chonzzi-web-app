import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Sparkles, CheckCircle2 } from "lucide-react";
import { BrandAnchor } from "./BrandButton";

/**
 * Dismissible enrol modal, appears up to `maxShows` times per page load:
 *  1) shortly after mount
 *  2) when scrolled ~halfway
 *  3) when reached near the bottom
 */
export function EnrolModal({ maxShows = 3 }: { maxShows?: number }) {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(0);

  const trigger = () => {
    setShown((s) => (s < maxShows ? s + 1 : s));
    setOpen(true);
  };

  // First show on mount
  useEffect(() => {
    const t = setTimeout(() => {
      trigger();
    }, 900);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll-based triggers 2 & 3
  useEffect(() => {
    if (shown >= maxShows) return;
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const pct = window.scrollY / total;
      if (shown === 1 && pct >= 0.5) trigger();
      else if (shown === 2 && pct >= 0.92) trigger();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown, maxShows]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-plum-deep/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="enrol-title"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-[22px] border border-white/15 bg-white/95 shadow-[0_40px_120px_-20px_rgba(24,0,38,0.6)] backdrop-blur-xl"
          >
            {/* Accent header */}
            <div
              className="relative px-7 py-8 text-white"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.24 0.10 320) 0%, oklch(0.32 0.12 315) 60%, oklch(0.42 0.14 90) 130%)",
              }}
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <X size={16} />
              </button>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-[0.7rem] font-bold uppercase tracking-[0.14em] text-gold-soft">
                <Sparkles size={12} /> The Money Simplified Course
              </div>
              <h3 id="enrol-title" className="mt-4 font-display text-[1.55rem] font-semibold leading-tight text-white">
                Your foundation is one decision away.
              </h3>
              <p className="mt-2 text-[0.9rem] text-[#EDE6F0]/90">
                Ten modules · sixty short videos · your own numbers · permanent access.
              </p>
            </div>

            <div className="px-7 py-6">
              <ul className="mb-5 space-y-2.5 text-[0.9rem] text-foreground">
                {[
                  "Build a plan on your real numbers",
                  "Sequence debt, savings & investments",
                  "Come back any time, access is permanent",
                ].map((li) => (
                  <li key={li} className="flex items-start gap-2.5">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald" />
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 font-mono text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground hover:text-plum"
                >
                  Maybe later
                </button>
                <BrandAnchor
                  variant="primary"
                  href="https://moneysimplified.chonzzi.com/course"
                >
                  Enrol, ₦35,000
                </BrandAnchor>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
