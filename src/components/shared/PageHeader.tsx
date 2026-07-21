import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  isDark?: boolean;
}

export function PageHeader({ eyebrow, title, description, children, className, isDark = true }: PageHeaderProps) {
  return (
    <section className={cn(isDark ? "bg-plum-deep text-[#EFEAE2]" : "bg-plumbg text-[#EFEAE2]", "py-20 lg:py-24 px-6", className)}>
      <div className="container max-w-7xl mx-auto">
        <div className="mb-4 text-gold/80 text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2">
          <span className="w-6 h-0.5 bg-current" /> {eyebrow}
        </div>
        <h1 className="font-heading text-4xl lg:text-5xl font-semibold leading-tight max-w-2xl text-white mb-4">
          {title}
        </h1>
        {description && <p className="text-[#CFC8BE] text-lg max-w-xl leading-relaxed">{description}</p>}
        {children && <div className="mt-6 flex flex-wrap gap-4">{children}</div>}
      </div>
    </section>
  );
}