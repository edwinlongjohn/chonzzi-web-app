
import { Link } from "react-router-dom";
import { Container } from "@/components/site/Container";
import logo from '@/assets/images/logo.png';

export function Footer() {
  return (
    <footer className="bg-plum-deep py-12 text-[0.85rem] text-[#8f8798]">
      <Container>
        <div className="mb-6 flex items-center gap-3">
          <img src={logo} alt="Chonzzi" className="h-8 w-8 rounded bg-white p-1" />
          <span className="font-mono font-bold uppercase tracking-[0.14em] text-white">The Chonzzi Company</span>
        </div>
        <p className="mb-4 flex flex-wrap gap-x-5 gap-y-2">
          <Link to="/academy" className="text-[#CFC8BE] no-underline hover:text-white">Money Simplified Academy</Link>
          <Link to="/coaching" className="text-[#CFC8BE] no-underline hover:text-white">Coaching with Temi</Link>
          <a href="https://moneysimplified.chonzzi.com/shop" className="text-[#CFC8BE] no-underline hover:text-white">Shop</a>
          <Link to="/assessments" className="text-[#CFC8BE] no-underline hover:text-white">Free Assessments</Link>
          <Link to="/stories" className="text-[#CFC8BE] no-underline hover:text-white">Stories &amp; Letters</Link>
        </p>
        <p>
          The Chonzzi Company · Port Harcourt, Nigeria, serving clients globally.
          <br />
          Home of Financial Literacy With Temi &amp; The Money Simplified Academy.
        </p>
      </Container>
    </footer>
  );
}
