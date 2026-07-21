import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Container } from "@/components/site/Container";
import logo from "@/assets/images/logo.png";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/academy", label: "The Academy" },
  { to: "/coaching", label: "Coaching with Temi" },
  { to: "/tools", label: "Free Assessments" },
  { to: "/stories", label: "Stories & Letters" },
] as const;

export function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 border-b border-gold/25 bg-plum-deep/[0.97] text-white backdrop-blur-md">
      <Container>
        <div className="flex flex-wrap items-center gap-6 py-[15px]">
          <Link
            to="/"
            className="mr-auto flex items-center gap-3 font-mono font-extrabold tracking-[0.14em] text-white hover:no-underline"
            onClick={() => setOpen(false)}
          >
            <img src={logo} alt="The Chonzzi Company" className="h-8 w-8 rounded bg-white p-1" />
            <span className="hidden text-[0.95rem] sm:inline">THE CHONZZI COMPANY</span>
          </Link>

          <button
            className="ml-auto inline-flex items-center justify-center rounded p-2 text-white md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={cn("font-mono text-[0.8rem] font-semibold uppercase tracking-[0.07em] text-[#CFC8BE] hover:text-white [&.active]:border-b-2 [&.active]:border-gold [&.active]:pb-1 [&.active]:text-white", pathname === l.to ? "active" : "")} 
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://moneysimplified.chonzzi.com/course"
              className="rounded-md bg-gold px-[18px] py-[9px] font-mono text-[0.8rem] font-bold uppercase tracking-[0.07em] text-plum-deep no-underline transition hover:brightness-105"
            >
              Enrol Now
            </a>
          </div>
        </div>

        <div className={cn("grid gap-3 overflow-hidden pb-4 md:hidden", open ? "block" : "hidden")}>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "font-mono text-[0.85rem] font-semibold uppercase tracking-[0.07em] text-[#CFC8BE]",
                pathname === link.to
                  ? "text-white border-gold" 
                  : "text-[#CFC8BE] border-transparent hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
          
          <a
            href="https://moneysimplified.chonzzi.com/course"
            className="inline-flex w-fit rounded-md bg-gold px-[18px] py-[9px] font-mono text-[0.8rem] font-bold uppercase tracking-[0.07em] text-plum-deep no-underline"
          >
            Enrol Now
          </a>
        </div>
      </Container>
    </nav>
  );
}





// import { Link, useLocation } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { cn } from '@/lib/utils';
// // 1. Import the logo image
// import logo from '@/assets/images/logo.png'; 

// export function Navbar() {
//   const { pathname } = useLocation();

//   const links = [
//     { href: '/academy', label: 'The Academy' },
//     { href: '/coaching', label: 'Coaching with Temi' },
//     { href: '/tools', label: 'Free Assessments' },
//     { href: '/stories', label: 'Stories & Letters' },
//   ];

//   return (
//     <nav className="sticky top-0 z-50 bg-plum-deep/95 backdrop-blur-md border-b border-gold/25 text-white py-3">
//       <div className="container mx-auto px-6 flex items-center justify-between gap-4 flex-wrap">
        
//         {/* 2. Replace the text with the Image Logo */}
//         <Link to="/" className="hover:opacity-90 transition-opacity">
//           <img src={logo} alt="The Chonzzi Company" className="h-10 w-auto object-contain" />
//         </Link>
        
//         <div className="hidden md:flex items-center gap-6">
//           {links.map((link) => (
//             <Link
//               key={link.href}
//               to={link.href}
//               className={cn(
//                 "font-sans text-xs font-bold tracking-wider uppercase transition-colors border-b-2 pb-1",
//                 pathname === link.href 
//                   ? "text-white border-gold" 
//                   : "text-[#CFC8BE] border-transparent hover:text-white"
//               )}
//             >
//               {link.label}
//             </Link>
//           ))}
//         </div>
//         <Button className="bg-gold text-plum-deep hover:bg-gold-soft font-bold uppercase">
//           <a href="https://moneysimplified.chonzzi.com/course" target="_blank" rel="noopener noreferrer">
//             Enrol Now
//           </a>
//         </Button>
//       </div>
//     </nav>
//   );
// }