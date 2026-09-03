import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

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
  const gradient =
    variant === "msa"
      ? "linear-gradient(135deg, oklch(0.42 0.13 155) 0%, oklch(0.32 0.10 165) 55%, oklch(0.24 0.10 320) 100%)"
      : "linear-gradient(135deg, oklch(0.30 0.12 320) 0%, oklch(0.22 0.10 315) 55%, oklch(0.16 0.08 320) 100%)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Link
        to={to}
        style={{ backgroundImage: gradient }}
        className={cn(
          "group relative flex min-h-[340px] flex-col gap-4 overflow-hidden rounded-[18px] p-10 text-white no-underline",
          "shadow-[0_18px_44px_-20px_rgba(24,0,38,0.45)] transition-all duration-500 ease-out",
          "hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-24px_rgba(24,0,38,0.6)]",
        )}
      >
        {/* Hover-reveal gold top border */}
        <span
          aria-hidden
          className="absolute left-0 top-0 h-[3px] w-0 bg-gradient-to-r from-gold via-gold-soft to-gold transition-all duration-500 ease-out group-hover:w-full"
        />
        {/* Radial hover glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(600px circle at var(--x,50%) var(--y,0%), rgba(255,255,255,0.10), transparent 40%)",
          }}
        />
        {/* Decorative shine on hover */}
        <span
          aria-hidden
          className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl transition-all duration-700 group-hover:scale-125 group-hover:bg-white/20"
        />

        <Eyebrow tone="gold" className="!text-gold-soft relative">
          {eyebrow}
        </Eyebrow>
        <h2 className="relative m-0 text-[1.6rem] text-white">{title}</h2>
        <p className="relative flex-1 text-white/85">{description}</p>
        <span className="relative inline-flex items-center gap-2 self-start rounded-lg border border-white/25 bg-white/10 px-[22px] py-3 font-mono text-[0.88rem] font-bold tracking-[0.06em] text-white backdrop-blur-sm transition-all duration-300 group-hover:border-gold/60 group-hover:bg-white/20 group-hover:pr-7">
          {ctaLabel}
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </Link>
    </motion.div>
  );
}
