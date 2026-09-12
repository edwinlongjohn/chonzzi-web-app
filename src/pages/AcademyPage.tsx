import { Link } from "react-router-dom";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/site/Eyebrow";
import { ImageBox } from "@/components/site/ImageBox";
import { BrandAnchor, BrandLink } from "@/components/site/BrandButton";
import { BrandCard } from "@/components/site/Card";
import { Quote } from "@/components/site/Quote";
import { EmailCapture } from "@/components/site/EmailCapture";
import { HeroBackground } from "@/components/site/HeroBackground";
import { EnrolModal } from "@/components/site/EnrolModal";
import heroImages from "@/assets/the-academy-bg.jpg";
import portraitImages from "@/assets/new-acad.png";

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
  { title: "A Teen's Guide to Smart Money Moves", body: "The habits that compound into a financially well adult life, for teens and the parents raising them.", cta: "Read free →", href:"https://moneysimplified.chonzzi.com/shop"},
  { title: "Smart Money Moves in Your 20s", body: "First salary, first structures. The decade where the maths is most on your side.", cta: "Read free →", href:"https://moneysimplified.chonzzi.com/shop" },
  { title: "Before You Say I Do", body: "The money conversations every couple should have before the wedding. New, July 2026.", cta: "Read free →", href:"https://moneysimplified.chonzzi.com/shop" },
  { title: "The Nigerian Tax Act Guide", body: "What the new tax law means for your payslip and your side income. Specialised content.", cta: "Get it, ₦2,000 →", href: "https://moneysimplified.chonzzi.com/shop" },
];

const characters = [
  { name: "Emeka", body: "Emeka earns a good salary, yet black tax is keeping him from proposing to the love of his life." },
  { name: "Blessing", body: "Just beginning to see money for what it is, no structure yet, spending without a system." },
  { name: "Funmi & Tunde", body: "Two people who love each other but speak different financial languages, with a baby on the way." },
  { name: "Chidi", body: "Saves carefully and denies himself small luxuries. Now his wife is asking how he can balance saving with actually living." },
  { name: "Damilola", body: "A widow navigating finances alone after her husband managed everything. Learning to lead her own money." },
  { name: "Yetunde", body: "30 when we meet her, 25 years to retirement. The long game, played one deliberate decade at a time." },
];

export default function AcademyPage() {
  return (
    <>
      <HeroBackground image={heroImages} className="dark-surface py-20 md:py-[84px] text-[#EFEAE2]" imageOpacity={0.35}>
        <Container>
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <Eyebrow>The Money Simplified Academy</Eyebrow>
              <h1 className="mt-3.5 text-white">
                Real financial education. Made affordable. Built for Nigeria.
              </h1>
              <p className="lead mt-4 text-[#CFC8BE]">
                The Money Simplified Course walks you through building your own financial
                foundation, so you stop guessing and start deciding.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <BrandAnchor variant="gold" href="https://moneysimplified.chonzzi.com/course">
                  Enrol in the Course, ₦35,000
                </BrandAnchor>
                <a
                  href="#msa-guides"
                  className="inline-flex items-center rounded-lg border-2 border-white/70 px-[30px] py-[15px] font-mono text-[0.94rem] font-bold text-white no-underline transition hover:bg-white/10"
                >
                  Start free with a Guide
                </a>
              </div>
              <Trust items={["10 modules", "60 short videos", "Permanent access"]} />
            </div>
            <ImageBox
              src={portraitImages}
              alt="Nigerian professional at work"
              ratio="wide"
              animation="drift"
              shadow={false}
            />
          </div>
        </Container>
      </HeroBackground>

      <Section>
        <Container>
          <Eyebrow tone="green">The stakes</Eyebrow>
          <h2 className="mt-2">Doing nothing about your money delays the inevitable.</h2>
          <p className="lead mt-3">
            You have read every finance tip out there. You probably follow many influencers and
            understand all the key terms. But without structure, your knowledge will always fall
            flat in the face of real life. That's what the Course fixes. Ten modules, built for
            Nigerian life, that turn what you already know into a plan you can actually run.
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
                Ten modules. Sixty short videos (4 to 10 minutes). A journal for every module,
                applied to <em>your own numbers</em> as you go. Taught through recurring Nigerian
                characters whose money lives look like yours.
              </p>
              <ul className="space-y-2">
                {[
                  "Money mindset & values, then budgeting, debt, automation",
                  "Career & income, goal setting, savings strategy",
                  "Insurance & risk, investment fundamentals, Nigerian investment options",
                  "A documented black-tax method and a couples-money arc",
                ].map((li) => (
                  <li key={li} className="relative pl-6 before:absolute before:left-0 before:text-gold before:content-['✓']">
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
                Access is permanent. Life gets busy? Pause and return, nothing disappears.
              </p>
            </div>
            <BrandCard>
              <h3>The capstone: &ldquo;Your Financial Foundation&rdquo;</h3>
              <p className="mt-2 text-[0.95rem]">
                By the final module, you would have built your plan on your numbers using the
                journal: a zero-based budget, your emergency fund target, your debts sequenced,
                your first investment steps chosen. One document, yours to keep.
              </p>
              <hr className="my-4 border-line" />
              <Quote attribution="Olayinka, Legal Professional">
                With just a glance, I can now see exactly where I stand.
              </Quote>
              <p className="text-[0.85rem] text-muted-foreground">
                Prefer live sessions? Course-holders get 30% off the Bootcamp when the next cohort
                opens.{" "}
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
          <p className="lead mt-2">Short, practical books, free to read.</p>
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
              <h3>More guides ahead</h3>
              <p className="mt-2 text-[0.9rem] text-muted-foreground">
                New guides are released as they are ready. Join the newsletter and hear about each
                one first.
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
            Seven Nigerians walk through the Course, making real money decisions, one day at a
            time.
          </p>
          <div className="mt-7 grid gap-6 md:grid-cols-3">
            {characters.map((c) => (
              <BrandCard key={c.name}>
                <h3>{c.name}</h3>
                <p className="mt-2 text-[0.9rem] text-muted-foreground">{c.body}</p>
              </BrandCard>
            ))}
          </div>
          <p className="mt-6">
            <BrandLink to="/stories" variant="ghost">
              Follow their stories →
            </BrandLink>
          </p>
        </Container>
      </Section>

      <Section id="msa-bootcamp">
        <Container>
          <div className="grid gap-7 md:grid-cols-2">
            <div>
              <Eyebrow tone="green">The Bootcamp</Eyebrow>
              <h2 className="mt-2">The Course, plus Temi live, and your plan reviewed with her one-on-one.</h2>
              <p className="mt-3">
                Eight weeks of live weekly group coaching, then your own session with Coach Temi to
                go through your plan together. You leave with Your Financial Foundation: an
                Excel-based plan designed for your life, ready for implementation.{" "}
                <b>₦100,000.</b>
              </p>
              <p className="mt-3 text-[0.85rem] text-muted-foreground">
                Cohorts open on demand. Join the waitlist to be first to know. Course-holders get
                30% off.
              </p>
            </div>
            <BrandCard>
              <h3>Join the Bootcamp waitlist</h3>
              <div className="mt-3">
                <EmailCapture
                  buttonLabel="Join the waitlist"
                  buttonVariant="primary"
                  nameField={true}
                  successMessage="You are on the list. You will be first to know when the next cohort opens."
                  source="academy-bootcamp"
                  type="waitlist"
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
                One honest look each week at how Nigerian life meets money.
              </p>
            </div>
            <div className="pt-4 md:pt-0">
              <EmailCapture
                buttonLabel="Subscribe free"
                buttonVariant="gold"
                nameField={true}
                successMessage="Welcome. Your first letter arrives this week."
                source="academy-newsletter"
                type="newsletter"
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

      <Section variant="plum" tight>
        <Container>
          <div
            className="relative overflow-hidden rounded-[22px] border border-white/10 p-8 md:p-12"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.24 0.13 320) 0%, oklch(0.32 0.14 315) 60%, oklch(0.42 0.15 305) 130%)",
            }}
          >
            <span
              aria-hidden
              className="absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl"
              style={{ background: "oklch(0.68 0.16 65 / 0.30)" }}
            />
            <div className="relative grid gap-6 md:grid-cols-[1.4fr_auto] md:items-center">
              <div>
                <div className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.18em] text-gold-soft">
                  Your foundation is one decision away
                </div>
                <h2 className="mt-3 text-white">Enrol in the Course today.</h2>
                <p className="mt-2 max-w-[46ch] text-[#EDE6F0]/90">
                  Permanent access · ten modules · your own numbers. Come back to it any time.
                </p>
              </div>
              <div className="flex md:justify-end">
                <BrandAnchor variant="gold" href="https://moneysimplified.chonzzi.com/course">
                  Enrol, ₦35,000
                </BrandAnchor>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <EnrolModal />
    </>
  );
}