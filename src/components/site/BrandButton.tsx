import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "green" | "gold" | "ghost" | "ghost-light";

const base =
  "inline-flex items-center justify-center rounded-lg font-mono font-bold text-[0.94rem] px-[30px] py-[15px] no-underline transition-all duration-150 focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(24,0,38,0.22)]";

const variants: Record<Variant, string> = {
  primary: "bg-plum text-white",
  green: "bg-emerald text-white",
  gold: "bg-gold text-plum-deep",
  ghost: "bg-transparent text-plum border-2 border-plum",
  "ghost-light": "bg-transparent text-white border-2 border-white/70",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

export const BrandButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & CommonProps
>(function BrandButton({ variant = "primary", className, children, ...rest }, ref) {
  return (
    <button ref={ref} className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  );
});

export function BrandAnchor({
  variant = "primary",
  className,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & CommonProps) {
  return (
    <a className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </a>
  );
}

export function BrandLink({
  variant = "primary",
  className,
  children,
  to,
}: CommonProps & { to: string; hash?: string }) {
  return (
    <Link to={to}  className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );
}
