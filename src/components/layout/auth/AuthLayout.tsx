import { Link, Outlet } from "react-router-dom";

import LOGO from "@/assets/chonzzi-logo-white.png";
import { AnimatePresence, motion } from "framer-motion";

export const fieldClass =
    "w-full rounded-xl border border-line bg-white px-4 py-3 font-serif text-[0.95rem] transition focus:border-plum/40 focus:outline-none focus:ring-2 focus:ring-plum/10";

export const labelClass =
    "mb-1.5 block font-mono text-[0.7rem] font-bold uppercase tracking-[0.1em] text-plum";

export const submitClass =
    "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-plum px-6 py-3 font-mono text-[0.82rem] font-bold uppercase tracking-[0.08em] text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(24,0,38,0.25)] disabled:pointer-events-none disabled:opacity-60";

export default function AuthLayout() {
    return (
        <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
            <AnimatePresence mode="wait">

                {/* Brand panel */}
                <div
                    className="relative hidden flex-col justify-between overflow-hidden p-12 text-white lg:flex"
                    style={{
                        background:
                            "linear-gradient(150deg, oklch(0.22 0.09 320) 0%, oklch(0.30 0.12 315) 55%, oklch(0.42 0.13 90) 130%)",
                    }}
                >
                    <span
                        aria-hidden
                        className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold/25 blur-3xl"
                    />
                    <span
                        aria-hidden
                        className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-lilac/20 blur-3xl"
                    />
                    <Link to="/" className="relative inline-flex items-center gap-3 no-underline">
                        <img src={LOGO} alt="The Chonzzi Company" className="h-11 w-auto" />
                    </Link>
                    <div className="relative max-w-md">
                        <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-gold-soft">
                            Admin workspace
                        </p>
                        <h2 className="mt-4 font-display text-[2rem] font-semibold leading-tight text-white">
                            Every kobo has a purpose. So does every record here.
                        </h2>
                        <p className="mt-4 text-[0.95rem] leading-relaxed text-[#EDE6F0]/85">
                            Manage the bootcamp waitlist, the Money Simplified letter, assessments and stories, all
                            from one place.
                        </p>
                    </div>
                    <p className="relative font-mono text-[0.7rem] uppercase tracking-[0.12em] text-[#EDE6F0]/60">
                        The Chonzzi Company Ltd.
                    </p>
                </div>
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="flex-1"
                >
                    {/* Form panel */}
                    <div className="flex items-center justify-center bg-background px-5 py-12 sm:px-10">
                        <div className="w-full max-w-[420px]">
                            <Link to="/" className="mb-8 inline-flex lg:hidden">
                                <img src={LOGO} alt="The Chonzzi Company" className="h-10 w-auto" />
                            </Link>
                            <Outlet />
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}