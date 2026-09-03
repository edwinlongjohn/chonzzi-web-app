import { Quote as QuoteIcon } from "lucide-react";

export function Quote({ children, attribution }: { children: string; attribution: string }) {
  return (
    <figure className="group relative my-5 overflow-hidden rounded-[14px] border border-line bg-white p-6 pl-14 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_20px_50px_-20px_rgba(24,0,38,0.22)]">
      {/* Decorative gradient accent */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-gold via-gold-soft to-transparent"
      />
      <QuoteIcon
        size={26}
        className="absolute left-5 top-6 text-gold/70 transition-transform duration-500 group-hover:scale-110"
        strokeWidth={2.5}
      />
      <blockquote className="font-display text-[1.12rem] italic leading-relaxed text-plum">
        "{children}"
      </blockquote>
      <figcaption className="mt-3 flex items-center gap-2">
        <span className="h-px flex-1 bg-gradient-to-r from-gold/60 to-transparent" />
        <span className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.12em] text-plum">
          {attribution}
        </span>
      </figcaption>
    </figure>
  );
}
