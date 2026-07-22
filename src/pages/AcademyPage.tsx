import {  Link } from "react-router-dom";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/site/Eyebrow";
import { ImageBox } from "@/components/site/ImageBox";
import { BrandAnchor} from "@/components/site/BrandButton";
import { BrandCard } from "@/components/site/Card";
import { Quote } from "@/components/site/Quote";
import { EmailCapture } from "@/components/site/EmailCapture";



function Trust({ items }: { items: string[] }) {
  return (
    <div className="mt-5 flex flex-wrap gap-6 font-mono text-[0.78rem] font-semibold uppercase tracking-[0.05em] text-[#CFC8BE]">
      {items.map((i) => (
        <span key={i}>
          <span className="mr-1.5 text-gold">✓</span>
          {i}
        </span>
      ))}
    </div>
  );
}

const guides = [
  { title: "A Teen's Guide to Smart Money Moves", body: "The habits that compound into a financially well adult life — for teens and the parents raising them.", cta: "Read free →" },
  { title: "Smart Money Moves in Your 20s", body: "First salary, first structures. The decade where the maths is most on your side.", cta: "Read free →" },
  { title: "Before You Say I Do", body: "The money conversations every couple should have before the wedding. New, July 2026.", cta: "Read free →" },
  { title: "The Nigerian Tax Act Guide", body: "What the new tax law means for your payslip and your side income — specialised content.", cta: "Get it, ₦2,000 →", href: "https://moneysimplified.chonzzi.com/shop" },
];

const characters = [
  { name: "Emeka", body: "A software engineer on ₦920,000 a month — proof that good income and financial security are not the same thing." },
  { name: "Blessing", body: "26, earning ₦420,000, building her first structures while everyone around her has opinions about her money." },
  { name: "Funmi & Tunde", body: "Married two years, ₦1,080,000 combined, a new baby — two money histories becoming one household plan." },
  { name: "Chidi", body: "41, married with children, supporting a younger brother — the weight and the planning of family obligation." },
  { name: "Damilola", body: "50, a widow rebuilding her financial life five years on — protection, estate matters, and starting again." },
  { name: "Yetunde", body: "30 when we meet her, 25 years to retirement — the long game, played one deliberate decade at a time." },
];

export default function AcademyPage() {
  return (
    <>
      <Section variant="dark">
        <Container>
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <Eyebrow>The Money Simplified Academy</Eyebrow>
              <h1 className="mt-3.5 text-white">
                Real financial education. Made affordable. Built for Nigeria.
              </h1>
              <p className="lead mt-4 text-[#CFC8BE]">
                The Money Simplified Course walks you through building your own financial foundation,
                so you stop guessing and start deciding.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <BrandAnchor variant="gold" href="https://moneysimplified.chonzzi.com/course">
                  Enrol in the Course — ₦35,000
                </BrandAnchor>
                <a
                  href="#msa-guides"
                  className="inline-flex items-center rounded-lg border-2 border-white/70 px-[30px] py-[15px] font-mono text-[0.94rem] font-bold text-white no-underline"
                >
                  Start free with a Guide
                </a>
              </div>
              <Trust items={["10 modules", "60 short videos", "Permanent access"]} />
            </div>
            <ImageBox
              label={"Lifestyle image\nNigerian professional at work / planning\n(warm, aspirational)"}
              ratio="wide"
            />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Eyebrow tone="green">The stakes</Eyebrow>
          <h2 className="mt-2">
            Most Nigerians don't have a savings problem.
            <br /> They have a systems problem.
          </h2>
          <p className="lead mt-3">
            You can read every tip, follow every account, and still not know where your money went
            this month — because knowledge without structure collapses under real Nigerian life:
            black tax, family obligations, no plan holding it together. Another year of good income
            with no system is the most expensive thing you own.
          </p>
        </Container>
      </Section>

      <Section variant="tint" tight>
        <Container>
          <Eyebrow tone="green">The course</Eyebrow>
          <h2 className="mt-2">
            You don't leave knowing things. You leave with your foundation built.
          </h2>
          <div className="mt-7 grid gap-7 md:grid-cols-2">
            <div>
              <p>
                <span className="font-display text-[2.5rem] font-bold text-plum">₦35,000</span>
                <span className="ml-2.5 text-[1.1rem] text-muted-foreground line-through">₦50,000</span>
              </p>
              <p className="my-3.5">
                Ten modules. Sixty short videos (4–10 minutes). A journal for every module, applied
                to <em>your own numbers</em> as you go. Taught through six recurring Nigerian
                characters whose money lives look like yours.
              </p>
              <ul className="space-y-2">
                {[
                  "Money mindset & values, then budgeting, debt, automation",
                  "Career & income, goal setting, savings strategy",
                  "Insurance & risk, investment fundamentals, Nigerian investment options",
                  "A documented black-tax method and a couples-money arc",
                ].map((li) => (
                  <li key={li} className="relative pl-6 before:absolute before:left-0 before:text-gold before:content-['—']">
                    {li}
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <BrandAnchor variant="primary" href="https://moneysimplified.chonzzi.com/course">
                  Enrol in the Course
                </BrandAnchor>
              </div>
              <p className="mt-3 text-[0.85rem] text-muted-foreground">
                Access is permanent. Life gets busy? Pause and return — nothing disappears.
              </p>
            </div>
            <BrandCard>
              <h3>The capstone: "Your Financial Foundation"</h3>
              <p className="mt-2 text-[0.95rem]">
                By the final module you have a completed plan built on your own numbers — a
                zero-based budget, your emergency fund target, your debts sequenced, your first
                investment steps chosen — assembled in a guided template that is yours to keep.
              </p>
              <hr className="my-4 border-line" />
              <Quote attribution="Olayinka, Legal Professional">
                With just a glance, I can now see exactly where I stand.
              </Quote>
              <p className="text-[0.85rem] text-muted-foreground">
                Prefer live sessions? Course-holders get 30–40% off the Bootcamp when the next
                cohort opens.{" "}
                <a href="#msa-bootcamp" className="text-emerald">
                  Join the waitlist below.
                </a>
              </p>
            </BrandCard>
          </div>
        </Container>
      </Section>

      <Section id="msa-guides">
        <Container>
          <Eyebrow tone="green">Start free</Eyebrow>
          <h2 className="mt-2">Every life stage has a guide.</h2>
          <p className="lead mt-2">Short, practical books, free to read. New guide every month.</p>
          <div className="mt-7 grid gap-6 md:grid-cols-3">
            {guides.map((g) => (
              <BrandCard key={g.title}>
                <h3>{g.title}</h3>
                <p className="mt-2 text-[0.9rem] text-muted-foreground">{g.body}</p>
                <p className="mt-3">
                  <a href={g.href ?? "#"} className="text-emerald">
                    {g.cta}
                  </a>
                </p>
              </BrandCard>
            ))}
            <BrandCard variant="tint">
              <h3>Guides 5–10</h3>
              <p className="mt-2 text-[0.9rem] text-muted-foreground">
                One new free guide every month. Join the newsletter and never miss a release.
              </p>
              <p className="mt-3">
                <a href="#msa-news" className="text-emerald">
                  Get notified →
                </a>
              </p>
            </BrandCard>
            <BrandCard variant="tint">
              <h3>Everything in one place</h3>
              <p className="mt-2 text-[0.9rem] text-muted-foreground">
                All guides, the Course, and every Academy product.
              </p>
              <p className="mt-3">
                <a href="https://moneysimplified.chonzzi.com/shop" className="text-emerald">
                  Visit the shop →
                </a>
              </p>
            </BrandCard>
          </div>
        </Container>
      </Section>

      <Section variant="tint" tight>
        <Container>
          <Eyebrow tone="green">The characters</Eyebrow>
          <h2 className="mt-2">Learn through lives that look like yours.</h2>
          <p className="lead mt-2">
            Six Nigerians walk through the Course — and through our weekly stories — making real
            money decisions in real Nigerian life.
          </p>
          <div className="mt-7 grid gap-6 md:grid-cols-3">
            {characters.map((c) => (
              <BrandCard key={c.name} className="border-t-4 border-t-gold">
                <h3>{c.name}</h3>
                <p className="mt-2 text-[0.9rem] text-muted-foreground">{c.body}</p>
              </BrandCard>
            ))}
          </div>
          <p className="mt-6">
            <Link to="/stories" className="text-emerald">
              Follow their stories →
            </Link>
          </p>
        </Container>
      </Section>

      <Section id="msa-bootcamp">
        <Container>
          <div className="grid gap-7 md:grid-cols-2">
            <div>
              <Eyebrow tone="green">The Bootcamp</Eyebrow>
              <h2 className="mt-2">The Course, plus Temi live.</h2>
              <p className="mt-3">
                Eight weeks of live weekly group sessions and two weeks of one-on-one sessions,
                the full Course included. A cohort of no more than 50, and you leave with your plan
                personally reviewed. <b>₦100,000.</b>
              </p>
              <p className="mt-3 text-[0.85rem] text-muted-foreground">
                Cohorts open on demand. Join the waitlist and you'll be first to know —
                Course-holders get 30–40% off.
              </p>
            </div>
            <BrandCard>
              <h3>Join the Bootcamp waitlist</h3>
              <div className="mt-3">
                <EmailCapture
                  buttonLabel="Join the waitlist"
                  buttonVariant="primary"
                  nameField
                  successMessage="You are on the list — you will be first to know when the next cohort opens."
                />
              </div>
            </BrandCard>
          </div>
        </Container>
      </Section>

      <Section variant="dark" tight id="msa-news">
        <Container>
          <div className="grid gap-7 md:grid-cols-2">
            <div>
              <Eyebrow>The weekly letter</Eyebrow>
              <h2 className="mt-2 text-white">Stay in the room where money makes sense.</h2>
              <p className="lead mt-3 text-[#CFC8BE]">
                Every week: how everyday Nigerian life meets money, real conversations, the serial
                stories, and one move to make this week.
              </p>
            </div>
            <div className="pt-4 md:pt-0">
              <EmailCapture
                buttonLabel="Subscribe free"
                buttonVariant="gold"
                successMessage="Welcome — your first letter arrives this week."
              />
              <p className="mt-3 text-[0.85rem] text-[#B9B0C4]">
                Read past issues in{" "}
                <Link to="/stories" className="text-white">
                  Stories &amp; Letters
                </Link>
                .
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <div className="sticky bottom-0 z-40 bg-plum py-3.5 shadow-[0_-8px_24px_rgba(24,0,38,0.25)]">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="m-0 font-mono text-[0.9rem] font-semibold text-white">
              Your foundation is one decision away.
            </p>
            <BrandAnchor variant="gold" href="https://moneysimplified.chonzzi.com/course">
              Enrol in the Course — ₦35,000
            </BrandAnchor>
          </div>
        </Container>
      </div>
    </>
  );
}





// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { PageHeader } from "@/components/shared/PageHeader";
// import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
// import { Check, ArrowRight } from "lucide-react"; // Optional if you use icons

// export default function AcademyPage() {
//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Hero */}
//       <PageHeader 
//         eyebrow="THE MONEY SIMPLIFIED ACADEMY"
//         title="Real financial education. Made affordable. Built for Nigeria."
//         description="The Money Simplified Course walks you through building your own financial foundation, so you stop guessing and start deciding."
//       >
//         <Button className="bg-gold text-plum-deep hover:bg-gold-soft font-bold text-base">
//           <a href="https://moneysimplified.chonzzi.com/course" target="_blank" rel="noopener noreferrer">Enrol in the Course — ₦35,000</a>
//         </Button>
//         <Button variant="outline" className="border-white/50 text-white hover:bg-white/10">
//           <a href="#msa-guides">Start free with a Guide</a>
//         </Button>
//         <div className="flex flex-wrap gap-6 text-xs font-bold tracking-wide uppercase text-[#CFC8BE]">
//           <span className="flex items-center gap-1"><span className="text-gold">✓</span> 10 modules</span>
//           <span className="flex items-center gap-1"><span className="text-gold">✓</span> 60 short videos</span>
//           <span className="flex items-center gap-1"><span className="text-gold">✓</span> Permanent access</span>
//         </div>
//       </PageHeader>

//       {/* Stakes */}
//       <section className="py-16 lg:py-20 px-6 bg-cream">
//         <div className="container max-w-7xl mx-auto">
//           <div className="text-emerald text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2 mb-2">
//             <span className="w-6 h-0.5 bg-emerald" /> The Stakes
//           </div>
//           <h2 className="font-heading text-3xl font-semibold text-plum leading-tight max-w-2xl mb-4">
//             Most Nigerians don't have a savings problem.<br />They have a systems problem.
//           </h2>
//           <p className="text-muted text-lg leading-relaxed max-w-3xl">
//             You can read every tip, follow every account, and still not know where your money went this month — because knowledge without structure collapses under real Nigerian life: black tax, family obligations, no plan holding it together. Another year of good income with no system is the most expensive thing you own.
//           </p>
//         </div>
//       </section>

//       {/* The Course */}
//       <section className="py-16 lg:py-20 px-6 bg-card">
//         <div className="container max-w-7xl mx-auto">
//           <div className="text-emerald text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2 mb-2">
//             <span className="w-6 h-0.5 bg-emerald" /> The Course
//           </div>
//           <h2 className="font-heading text-3xl font-semibold text-plum leading-tight max-w-2xl mb-10">
//             You don't leave knowing things. You leave with your foundation built.
//           </h2>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
//             <div className="space-y-4">
//               <div className="flex items-baseline gap-4">
//                 <span className="font-heading text-5xl text-plum font-bold">₦35,000</span>
//                 <span className="line-through text-xl text-muted">₦50,000</span>
//               </div>
//               <p className="leading-relaxed">
//                 Ten modules. Sixty short videos (4–10 minutes). A journal for every module, applied to <em>your own numbers</em> as you go. Taught through six recurring Nigerian characters whose money lives look like yours.
//               </p>
//               <ul className="space-y-2 list-none mt-4">
//                 <li className="flex gap-3"><span className="text-gold">—</span> Money mindset & values, budgeting, debt, automation</li>
//                 <li className="flex gap-3"><span className="text-gold">—</span> Career & income, goal setting, savings strategy</li>
//                 <li className="flex gap-3"><span className="text-gold">—</span> Insurance & risk, investment fundamentals, Nigerian investment options</li>
//                 <li className="flex gap-3"><span className="text-gold">—</span> A documented black-tax method and a couples-money arc</li>
//               </ul>
//               <Button className="bg-plum text-white hover:bg-plum-deep mt-4">Enrol in the Course</Button>
//               <p className="text-muted text-sm mt-2">Access is permanent. Life gets busy? Pause and return — nothing disappears.</p>
//             </div>
//             <Card className="bg-white border-line shadow-sm">
//               <CardHeader>
//                 <CardTitle className="font-heading text-xl">The capstone: "Your Financial Foundation"</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <p className="text-sm leading-relaxed">
//                   By the final module you have a completed plan built on your own numbers — a zero-based budget, your emergency fund target, your debts sequenced, your first investment steps chosen — assembled in a guided template that is yours to keep.
//                 </p>
//                 <div className="border-l-4 border-gold pl-4 italic text-muted my-4">
//                   "With just a glance, I can now see exactly where I stand."
//                   <span className="block mt-1 not-italic font-sans text-xs font-bold tracking-widest text-plum uppercase">OLAYINKA, LEGAL PROFESSIONAL</span>
//                 </div>
//                 <p className="text-sm text-muted">Prefer live sessions? Course-holders get 30–40% off the Bootcamp when the next cohort opens. <a href="#msa-bootcamp" className="text-emerald underline">Join the waitlist below.</a></p>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* Guides */}
//       <section id="msa-guides" className="py-16 lg:py-20 px-6 bg-cream">
//         <div className="container max-w-7xl mx-auto">
//           <div className="text-emerald text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2 mb-2">
//             <span className="w-6 h-0.5 bg-emerald" /> Start Free
//           </div>
//           <h2 className="font-heading text-3xl font-semibold text-plum leading-tight max-w-2xl mb-4">Every life stage has a guide.</h2>
//           <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">Short, practical books, free to read. New guide every month.</p>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {/* Card Examples - repeat for each guide */}
//             <Card>
//               <CardHeader><CardTitle className="font-heading text-lg">A Teen's Guide to Smart Money Moves</CardTitle></CardHeader>
//               <CardContent className="flex flex-col flex-1">
//                 <p className="text-sm text-muted flex-1">The habits that compound into a financially well adult life — for teens and the parents raising them.</p>
//                 <div className="mt-4"><Link to="#" className="text-plum font-bold text-sm hover:underline" onClick={(e) => { e.preventDefault(); alert('Prototype: this opens the guide reader.'); }}>Read free →</Link></div>
//               </CardContent>
//             </Card>
//             {/* ... Include other guides here ... */}
//           </div>
//         </div>
//       </section>

//       {/* Characters (Abridged for brevity, easily repeatable structure) */}
//       <section className="py-16 lg:py-20 px-6 bg-card">
//         <div className="container max-w-7xl mx-auto">
//           <div className="text-emerald text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2 mb-2">
//             <span className="w-6 h-0.5 bg-emerald" /> The Characters
//           </div>
//           <h2 className="font-heading text-3xl font-semibold text-plum leading-tight max-w-2xl mb-4">Learn through lives that look like yours.</h2>
//           <p className="text-muted text-lg leading-relaxed max-w-2xl mb-10">Six Nigerians walk through the Course — and through our weekly stories — making real money decisions in real Nigerian life.</p>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {/* Character cards */}
//             {['Emeka', 'Blessing', 'Funmi & Tunde', 'Chidi', 'Damilola', 'Yetunde'].map((name, idx) => (
//               <Card key={idx} className="border-t-4 border-t-gold">
//                 <CardHeader><CardTitle className="font-heading text-lg">{name}</CardTitle></CardHeader>
//                 <CardContent>
//                   <p className="text-sm text-muted">A Nigerian making real financial decisions in today's economy.</p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Bootcamp */}
//       <section id="msa-bootcamp" className="py-16 lg:py-20 px-6 bg-cream">
//         <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
//           <div>
//             <div className="text-emerald text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2 mb-2">
//               <span className="w-6 h-0.5 bg-emerald" /> The Bootcamp
//             </div>
//             <h2 className="font-heading text-3xl font-semibold text-plum leading-tight mb-4">The Course, plus Temi live.</h2>
//             <p className="text-lg text-ink mb-4">Eight weeks of live weekly group sessions and two weeks of one-on-one sessions, the full Course included. A cohort of no more than 50, and you leave with your plan personally reviewed. <strong>₦100,000.</strong></p>
//             <p className="text-sm text-muted">Cohorts open on demand. Join the waitlist and you'll be first to know — Course-holders get 30–40% off.</p>
//           </div>
//           <Card>
//             <CardHeader><CardTitle className="font-heading text-xl">Join the Bootcamp waitlist</CardTitle></CardHeader>
//             <CardContent className="space-y-4">
//               <Input type="text" placeholder="Your first name" />
//               <Input type="email" placeholder="Your email" />
//               <Button className="w-full bg-plum text-white hover:bg-plum-deep">Join the waitlist</Button>
//               <p className="text-sm text-muted mt-2" id="wl-msg"></p>
//             </CardContent>
//           </Card>
//         </div>
//       </section>

//       {/* Newsletter - Dark */}
//       <section id="msa-news" className="py-16 lg:py-20 px-6 bg-plum-deep text-[#EFEAE2]">
//         <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           <div>
//             <div className="text-gold text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2 mb-2">
//               <span className="w-6 h-0.5 bg-current" /> The Weekly Letter
//             </div>
//             <h2 className="font-heading text-3xl font-semibold text-white mb-4">Stay in the room where money makes sense.</h2>
//             <p className="text-[#CFC8BE] text-lg">Every week: how everyday Nigerian life meets money, real conversations, the serial stories, and one move to make this week.</p>
//           </div>
//           <div className="flex flex-col gap-4">
//             <div className="flex flex-wrap gap-3">
//               <Input type="email" placeholder="Your email" className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-gold min-w-[200px] flex-1" />
//               <Button className="bg-gold text-plum-deep hover:bg-gold-soft font-bold">Subscribe free</Button>
//             </div>
//             <p className="text-sm text-muted">Read past issues in <Link to="/stories" className="text-white underline">Stories & Letters</Link>.</p>
//           </div>
//         </div>
//       </section>

//       {/* Sticky CTA Footer */}
//       <div className="sticky bottom-0 z-40 bg-plum text-white py-4 border-t border-plum-deep shadow-xl">
//         <div className="container max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
//           <p className="font-sans font-bold text-lg">Your foundation is one decision away.</p>
//           <Button className="bg-gold text-plum-deep hover:bg-gold-soft font-bold">
//             <a href="https://moneysimplified.chonzzi.com/course" target="_blank" rel="noopener noreferrer">Enrol in the Course — ₦35,000</a>
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }