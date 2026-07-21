import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/site/Eyebrow";
import { DoorCard } from "@/components/site/DoorCard";
import { AssessmentCard } from "@/components/site/AssessmentCard";
import { ImageBox } from "@/components/site/ImageBox";
import { BrandLink } from "@/components/site/BrandButton";

export default function HomePage() {
  return (
    <>
      <Section variant="plum" className="!py-24 md:!pt-24 md:!pb-28">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Eyebrow center>The Chonzzi Company</Eyebrow>
            <h1 className="mx-auto mt-4 max-w-[780px] text-white">
              Financial agency is a right,
              <br /> not a privilege.
            </h1>
            <p className="lead mx-auto mt-4 text-[#CFC8BE]">
              Two ways in. One mission: no one you love ever caught off guard by money.
            </p>
          </motion.div>
        </Container>
      </Section>

      <Container>
        <div className="relative z-10 -mt-12 grid gap-7 md:-mt-14 md:grid-cols-2">
          <DoorCard
            variant="msa"
            eyebrow="For every Nigerian"
            title="The Money Simplified Academy"
            description="Structured, affordable financial education — the Course, free guides, and a plan you build with your own hands."
            ctaLabel="Enter the Academy →"
            to="/academy"
          />
          <DoorCard
            variant="flwt"
            eyebrow="For the woman who plans for others"
            title="Financial Literacy With Temi"
            description="Premium one-on-one financial coaching with Temi Egenti — a written plan built on your real numbers, and a year beside you."
            ctaLabel="Meet Temi →"
            to="/coaching"
            delay={0.1}
          />
        </div>
      </Container>

      <Section>
        <Container>
          <div className="grid items-center gap-8 md:grid-cols-2">
            <ImageBox
              label={"Founder portrait\nProfessional photo of Temi Egenti\n(warm, direct-to-camera)"}
              ratio="portrait"
              className="max-w-[420px]"
            />
            <div>
              <Eyebrow tone="green">The woman behind both doors</Eyebrow>
              <h2 className="mt-3">Built by someone living the same economy you are.</h2>
              <p className="mt-3 text-muted-foreground">
                Temi Egenti is an ACCA Fellow with over twelve years in active corporate finance,
                alongside a coaching practice built on one conviction: financial agency is a right,
                not a privilege. A wife, mother, and Nigerian corporate professional — building her
                own financial life inside the same economy you live in.
              </p>
              <p className="mt-3 text-[0.85rem] text-muted-foreground">
                FCCA · MCSI · CFEI · FMVA · FPWMP · CBCA · CMSA · MSc Professional Accounting
              </p>
              <div className="mt-5">
                <BrandLink to="/coaching" variant="ghost">
                  Meet Temi →
                </BrandLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="tint" tight>
        <Container>
          <div className="mx-auto mb-9 max-w-[640px] text-center">
            <Eyebrow center>Free · no account needed</Eyebrow>
            <h2 className="mt-3">Not sure where to start? Know your money first.</h2>
            <p className="lead mx-auto mt-3">
              Three short assessments. Each answers a different question about you and your money —
              and each takes minutes.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <AssessmentCard
              tone="mp"
              tag="Assessment 01 · Money Personality"
              question="Why do I handle money this way?"
              description="Discover which of the four money personalities drives your decisions — the saver, the avoider, the worrier, or the spender — and what to do about it."
              meta={["2 min", "10 questions"]}
              ctaLabel="Find my personality"
              to="/assessments/personality"
            />
            <AssessmentCard
              tone="fhc"
              tag="Assessment 02 · Financial Health Check"
              question="Where do I stand right now?"
              description="Eighteen honest questions across six areas of your financial life — and a score that shows you exactly where the gaps are."
              meta={["3 min", "18 questions"]}
              ctaLabel="Check my health"
              to="/assessments/health-check"
            />
            <AssessmentCard
              tone="rp"
              tag="Assessment 03 · Risk Profile"
              question="How should I invest?"
              description="Before your money takes any risk, know how much risk is actually yours to take — with a suggested split shaped by your age."
              meta={["2 min", "12 questions"]}
              ctaLabel="Find my profile"
              to="/assessments/risk-profile"
            />
          </div>
          <p className="mt-6 text-center text-[0.85rem] text-muted-foreground">
            Prefer to see them all together?{" "}
            <Link to="/assessments" className="text-emerald">
              Visit the Assessment Hub →
            </Link>
          </p>
        </Container>
      </Section>
    </>
  );
}