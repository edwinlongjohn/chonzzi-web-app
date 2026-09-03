import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "@/components/site/Container";
import chonzziLogoUrl from "@/assets/chonzzi-logo-white.png";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/academy", label: "The Academy" },
  { to: "/coaching", label: "Coaching with Temi" },
  { to: "/assessments", label: "Free Assessments" },
  { to: "/stories", label: "Stories & Letters" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav className="sticky top-0 z-50 border-b border-gold/25 bg-plum-deep/95 text-white backdrop-blur-md">
      <Container>
        <div className="flex h-20 items-center gap-3">
          {/* Logo */}
          <Link
            to="/"
            className="flex min-w-0 items-center gap-3 no-underline"
            onClick={() => setOpen(false)}
          >
            <img
              src={chonzziLogoUrl}
              alt="The Chonzzi Company"
              className="h-12 w-auto shrink-0 md:h-14"
            />
          </Link>

          {/* Desktop links */}
          <div className="ml-auto hidden items-center gap-5 lg:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `font-mono text-[0.78rem] font-semibold uppercase tracking-[0.07em] text-[#CFC8BE] transition hover:text-white ${isActive ? 'active' : ''
                  }`
                }

              >
                {l.label}
              </NavLink>
            ))}
            <a
              href="https://moneysimplified.chonzzi.com/course"
              className="rounded-md bg-gold px-4 py-2 font-mono text-[0.78rem] font-bold uppercase tracking-[0.07em] text-plum-deep no-underline transition hover:brightness-105"
            >
              Enrol Now
            </a>
          </div>

          {/* Mobile trigger */}
          <button
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-md text-white transition hover:bg-white/10 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </Container>

      {/* Mobile drawer */}
      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-white/10 bg-plum-deep/98 backdrop-blur-md transition-[max-height,opacity] duration-300",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <Container>
          <div className="grid gap-1 py-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `font-mono text-[0.78rem] font-semibold uppercase tracking-[0.07em] text-[#CFC8BE] transition hover:text-white ${isActive ? 'active' : ''
                  }`
                }

              >
                {l.label}
              </NavLink>
            ))}
            <a
              href="https://moneysimplified.chonzzi.com/course"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-md bg-gold px-4 py-3 font-mono text-[0.85rem] font-bold uppercase tracking-[0.07em] text-plum-deep no-underline"
            >
              Enrol Now
            </a>
          </div>
        </Container>
      </div>
    </nav>
  );
}
