import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";
import { motion } from "framer-motion";

export function DoorCard({
  variant,
  eyebrow,
  title,
  description,
  ctaLabel,
  to,
  delay = 0,
}: {
  variant: "msa" | "flwt";
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  to: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Link
        to={to}
        className={cn(
          "relative flex min-h-[320px] flex-col gap-4 overflow-hidden rounded-[14px] p-10 no-underline shadow-[0_14px_40px_rgba(24,0,38,0.18)] transition-all duration-200",
          "hover:-translate-y-1 hover:shadow-[0_22px_54px_rgba(24,0,38,0.26)]",
          variant === "msa" ? "bg-emerald text-white" : "bg-plum text-white",
        )}
      >
        <span className="absolute left-0 right-0 top-0 h-[5px] bg-gold" />
        <Eyebrow tone="gold" className="!text-gold-soft">
          {eyebrow}
        </Eyebrow>
        <h2 className="m-0 text-[1.55rem] text-white">{title}</h2>
        <p className="flex-1 text-white/85">{description}</p>
        <span className="inline-block self-start rounded-md border border-white/35 bg-white/15 px-[22px] py-3 font-mono text-[0.88rem] font-bold tracking-[0.06em] text-white transition group-hover:bg-white/25">
          {ctaLabel}
        </span>
      </Link>
    </motion.div>
  );
}
