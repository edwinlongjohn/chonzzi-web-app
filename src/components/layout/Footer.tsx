import { Link } from "react-router-dom";
import { Container } from "@/components/site/Container";
import logoWhite from "@/assets/chonzzi-logo-white.png";
import {
  ArrowUpRight,
  Mail,
  MapPin,
} from "lucide-react";

import {  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaTiktok,
  //FaXTwitter,
  FaYoutube
} from "react-icons/fa6";

const columns: {
  heading: string;
  links: { label: string; to?: string; href?: string }[];
}[] = [
  {
    heading: "Learn",
    links: [
      { label: "Money Simplified Academy", to: "/academy" },
      { label: "Free Assessments", to: "/assessments" },
      { label: "Stories & Letters", to: "/stories" },
    ],
  },
  {
    heading: "Work with Temi",
    links: [
      { label: "Coaching with Temi", to: "/coaching" },
      {
        label: "Book a discovery call",
        href: "https://fincoach.chonzzi.com/onyinye-temi-egenti-igboamagh/discovery-session",
      },
      { label: "Shop", href: "https://moneysimplified.chonzzi.com/shop" },
    ],
  },
];

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/moneysimplified.ng/", Icon: FaInstagram },
  { label: "TikTok", href: "https://www.tiktok.com/@moneysimplifiedng?_r=1&_t=ZS-964sUFgtiBp", Icon: FaTiktok },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61591244192310", Icon: FaFacebook },
  { label: "LinkedIn", href: "https://www.linkedin.com/newsletters/life-money-all-in-between-7350735291873165314/", Icon: FaLinkedin },
  { label: "YouTube", href: "https://www.youtube.com/@moneysimplifiedngtv", Icon: FaYoutube },
  // { label: "Twitter / X", href: "https://twitter.com/", Icon: FaXTwitter },
];

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden text-[0.9rem] text-[#B9B0C4]"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.19 0.09 320) 0%, oklch(0.16 0.08 320) 60%, oklch(0.13 0.07 320) 100%)",
      }}
    >
      <span
        aria-hidden
        className="absolute -top-24 left-1/3 h-64 w-64 rounded-full blur-3xl"
        style={{ background: "oklch(0.75 0.13 85 / 0.12)" }}
      />
      <span
        aria-hidden
        className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "oklch(0.68 0.06 305 / 0.14)" }}
      />
      <Container>
        <div className="grid gap-10 pt-14 pb-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand block */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <img
                src={logoWhite}
                alt="Chonzzi"
                className="h-10 w-auto"
              />
              <div>
                {/* <div className="font-mono text-[0.85rem] font-bold uppercase tracking-[0.14em] text-white">
                  The Chonzzi Company
                </div> */}
                <div className="mt-0.5 text-[0.75rem] text-[#8f8798]">
                  Financial agency, made ordinary.
                </div>
              </div>
            </div>
            {/* <div className="max-w-[46ch]">
              <div className="mb-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-gold-soft">
                The Chonzzi Philosophy
              </div>
              <p className="text-[#CFC8BE]/85">
                At The Chonzzi Company, we believe your financial choices should start with being{" "}
                Conscious of what you truly value. We take a{" "}
                Holistic view of your whole life, so you can take full{" "}
                Ownership of every financial decision you make.
                Together, we help you Nurture a personalised plan
                built on a Zero-based approach, where every kobo is
                allocated to a specific goal. Because when every kobo has a purpose, you don't just
                manage money. You build toward your financial{" "}
                Zenith, Intentionally.
              </p>
            </div> */}
            <ul className="mt-5 space-y-2 text-[0.85rem] text-[#CFC8BE]/80">
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-gold-soft" />
                Port Harcourt, Nigeria · serving clients globally
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-gold-soft" />
                <a
                  href="mailto:hello@chonzzi.com"
                  className="text-[#CFC8BE] no-underline hover:text-white"
                >
                  hello@chonzzi.com
                </a>
              </li>
            </ul>

            {/* Social icons */}
            <div className="mt-6">
              <div className="mb-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-gold-soft">
                Follow us
              </div>
              <div className="flex flex-wrap gap-2.5">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#CFC8BE] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:bg-gold hover:text-plum-deep hover:shadow-[0_10px_24px_-8px_rgba(201,162,39,0.55)]"
                  >
                    <Icon size={16} strokeWidth={2} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <div className="mb-4 font-mono text-[0.72rem] font-bold uppercase tracking-[0.16em] text-gold-soft">
                {col.heading}
              </div>
              <ul className="space-y-2.5">
                {col.links.map((l) =>
                  l.to ? (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="group inline-flex items-center gap-1.5 text-[#CFC8BE] no-underline transition-colors hover:text-white"
                      >
                        {l.label}
                        <ArrowUpRight
                          size={13}
                          className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                        />
                      </Link>
                    </li>
                  ) : (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="group inline-flex items-center gap-1.5 text-[#CFC8BE] no-underline transition-colors hover:text-white"
                      >
                        {l.label}
                        <ArrowUpRight
                          size={13}
                          className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                        />
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap  justify-end gap-4 border-t border-white/10 py-6 text-[0.78rem] text-[#8f8798]">
          <span>© {new Date().getFullYear()} The Chonzzi Company Ltd. All rights reserved.</span>
          {/* <span className="font-mono uppercase tracking-[0.12em]">
            Built with intention · in Nigeria
          </span> */}
        </div>
      </Container>
    </footer>
  );
}
