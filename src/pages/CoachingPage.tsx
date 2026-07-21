import { Link } from "react-router-dom";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/site/Eyebrow";
import { ImageBox } from "@/components/site/ImageBox";
import { BrandAnchor } from "@/components/site/BrandButton";
import { BrandCard } from "@/components/site/Card";
import { Quote } from "@/components/site/Quote";
import { EmailCapture } from "@/components/site/EmailCapture";

const steps = [
  { n: "01", title: "Discovery & Vision", body: "We start with your values, not your bank balance — all eight dimensions of your life, and what you're truly building toward." },
  { n: "02", title: "Your Numbers", body: "Your complete financial picture, laid out clearly and honestly, and a working budget that reflects your real life." },
  { n: "03", title: "Your Plan", body: "The budget refined against your goals, and your plan taking shape — on your numbers, in your hands." },
  { n: "04", title: "Your Final Plan", body: "Your investment and retirement strategy built in, the full plan assembled — then monthly check-ins for a year while you live it." },
];

const testimonials: { q: string; a: string }[][] = [
  [
    { q: "With just a glance, I can now see exactly where I stand.", a: "Olayinka, Legal Professional" },
    { q: "After two sessions, I am free of the fear of the unknown, because the plan is clearly written.", a: "Titilope, Occupational Health, Oil & Gas" },
  ],
  [
    { q: "This is not just an ad, I am telling you the truth.", a: "Chef P, Five Years On" },
    { q: "Heightened clarity. Zero judgment.", a: "Chinenye, Transformation & Change" },
  ],
];

export default function CoachingPage() {
  return (
    <>
      <Section variant="plum">
        <Container>
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <Eyebrow>Financial Literacy With Temi</Eyebrow>
              <h1 className="mt-3.5 text-white">
                A plan that fits your life, not a template with your name on it.
              </h1>
              <p className="lead mt-4 text-[#CFC8BE]">
                Most professional Nigerian women earn well but have no financial plan that fits
                their real life. I help you build one around what you actually value — so you're
                never caught off guard by money.
              </p>
              <div className="mt-7">
                <BrandAnchor variant="gold" href="https://fincoach.chonzzi.com/onyinye-temi-egenti-igboamagh/discovery-session">
                  Book a free discovery call
                </BrandAnchor>
              </div>
              <p className="mt-3 text-[0.85rem] text-[#B9B0C4]">
                No numbers, no commitment. You decide if this is someone you can work with.
              </p>
            </div>
            <ImageBox
              label={"Founder portrait — hero\nProfessional coaching photo of Temi"}
              ratio="portrait"
              className="max-w-[420px] justify-self-end"
            />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-7 md:grid-cols-2">
            <div>
              <Eyebrow tone="green">Temi Egenti</Eyebrow>
              <h2 className="mt-2">
                She reads your numbers the way an institution would, with the empathy a friend
                would.
              </h2>
              <p className="mt-3">
                Temi is an ACCA Fellow with over 12 years in active corporate finance, alongside a
                coaching practice built on one conviction: financial agency is a right, not a
                privilege. She is a wife, mother, and Nigerian corporate professional — building
                her own financial life inside the same economy you live in.
              </p>
              <p className="mt-3 text-[0.85rem] text-muted-foreground">
                FCCA · MCSI · CFEI · FMVA · FPWMP · CBCA · CMSA · MSc Professional Accounting
              </p>
            </div>
            <BrandCard variant="tint">
              <h3>What she believes</h3>
              <p className="mt-2 text-[0.95rem]">
                Financial agency is a right, not a privilege. It is not determined by how much a
                woman earns, and it should never depend on luck. Every plan Temi builds exists so
                the people in it are never caught off guard by money.
              </p>
            </BrandCard>
          </div>
        </Container>
      </Section>

      <Section variant="tint" tight>
        <Container>
          <Eyebrow tone="green">The programme</Eyebrow>
          <h2 className="mt-2">The Financially Fit Future Programme</h2>
          <p className="lead mt-2">
            Four structured coaching sessions, a personalised written financial plan, and a full
            year of accountability with Temi.
          </p>
          <div className="mt-8">
            {steps.map((s) => (
              <div key={s.n} className="mb-5 flex gap-4">
                <div className="min-w-[42px] font-display text-[1.5rem] font-bold text-gold">{s.n}</div>
                <div>
                  <h3>{s.title}</h3>
                  <p className="mt-1 text-[0.9rem] text-muted-foreground">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-2">
            <b>More than sessions — a year beside you.</b> The plan covers black tax, dependents,
            and shared household finances. It fits the life you actually live.
          </p>
          <div className="mt-6">
            <BrandAnchor variant="green" href="https://fincoach.chonzzi.com/onyinye-temi-egenti-igboamagh/discovery-session">
              Book a free discovery call
            </BrandAnchor>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Eyebrow tone="green">In their words</Eyebrow>
          <h2 className="mt-2">What a plan of your own feels like.</h2>
          <div className="mt-3 grid gap-7 md:grid-cols-2">
            {testimonials.map((col, i) => (
              <div key={i}>
                {col.map((t) => (
                  <Quote key={t.a} attribution={t.a}>
                    {t.q}
                  </Quote>
                ))}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="tint" tight>
        <Container>
          <div className="grid gap-7 md:grid-cols-2">
            <div>
              <Eyebrow tone="green">Stories & the monthly letter</Eyebrow>
              <h2 className="mt-2">Read Temi.</h2>
              <p className="mt-3">
                Thirteen episodes and counting of Temi's women's stories — money, life, and
                everything in between. And once a month, her personal letter on the investment
                landscape: what's happening, and what she thinks about it.
              </p>
              <p className="mt-3">
                <Link to="/stories" className="text-emerald">
                  Read the stories →
                </Link>
              </p>
            </div>
            <BrandCard>
              <h3>The Temi Egenti letter — monthly, free</h3>
              <div className="mt-3">
                <EmailCapture
                  buttonLabel="Subscribe"
                  buttonVariant="primary"
                  successMessage="Welcome — Temi writes once a month."
                />
              </div>
            </BrandCard>
          </div>
        </Container>
      </Section>

      <Section variant="plum" tight>
        <Container>
          <div className="text-center">
            <h2 className="mx-auto mb-2 max-w-[620px] text-white">
              Three steps to a plan of your own.
            </h2>
            <p className="lead mx-auto mb-3 text-[#CFC8BE]">
              Book the free call. Decide if we fit. Build the plan — with a year of me beside you.
            </p>
            <div className="mx-auto mb-6 flex max-w-[560px] flex-wrap justify-center gap-5 text-[0.85rem] text-[#CFC8BE]">
              <span><b className="text-gold-soft">1.</b> 30 minutes, no numbers needed</span>
              <span><b className="text-gold-soft">2.</b> You ask anything</span>
              <span><b className="text-gold-soft">3.</b> No obligation either way</span>
            </div>
            <BrandAnchor variant="gold" href="https://fincoach.chonzzi.com/onyinye-temi-egenti-igboamagh/discovery-session">
              Book a free discovery call
            </BrandAnchor>
          </div>
        </Container>
      </Section>
    </>
  );
}
