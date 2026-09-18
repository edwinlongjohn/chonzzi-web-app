
import { motion } from "framer-motion";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/site/Eyebrow";
import { DoorCard } from "@/components/site/DoorCard";
import { AssessmentCard } from "@/components/site/AssessmentCard";
import { BrandLink } from "@/components/site/BrandButton";
import { HeroBackground } from "@/components/site/HeroBackground";
import  portraitImages  from "@/assets/new-about-img.jpeg";
import { ImageBox } from "@/components/site/ImageBox";



export default function HomePage() {
  return (
    <>
      <HeroBackground className="dark-surface py-24 md:pt-24 md:pb-28 text-[#EFEAE2]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Eyebrow center>The Chonzzi Company</Eyebrow>
            <h1 className="mx-auto mt-4 max-w-[820px] text-white">
              Get your finances together.
            </h1>
            <p className="lead mx-auto mt-4 text-[#CFC8BE]">
              The knowledge and the plan behind the numbers.
            </p>
          </motion.div>
        </Container>
      </HeroBackground>

      <Container>
        <div className="relative z-10 -mt-12 grid gap-7 md:-mt-14 md:grid-cols-2">
          <DoorCard
            variant="msa"
            eyebrow="For every Nigerian"
            title="The Money Simplified Academy"
            description="Structured, affordable financial education. The Course, free guides, and a plan you build with your own hands."
            ctaLabel="Enter the Academy →"
            to="/academy"
          />
          <DoorCard
            variant="flwt"
            eyebrow="For the woman who plans for others"
            title="Coaching with Temi"
            description="Premium one-on-one financial coaching with Temi Egenti. A written plan built on your real numbers, and a year beside you."
            ctaLabel="Work with Temi →"
            to="/coaching"
            delay={0.1}
          />
        </div>
      </Container>

      <Section>
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-[minmax(0,0.9fr)_1fr]">
            <div className="mx-auto w-full max-w-[420px]">
              <ImageBox
                            src={portraitImages}
                            alt="Temi Egenti, Founder of The Chonzzi Company"
                            ratio="portrait"
                            className="max-w-[420px] justify-self-end"
                          />
             
            </div>
            <div>
              <Eyebrow tone="green">About the Founder</Eyebrow>
              <h2 className="mt-3">
                <span className="font-display italic text-plum">
                  &ldquo;I built this so you never have to face your money without a plan.&rdquo;
                </span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Temi is an ACCA Fellow with over 13 years of experience in consulting and corporate
                finance, alongside a coaching practice built on one conviction: financial agency is
                a right, not a privilege. She is a wife, mother, and Nigerian corporate
                professional, teaching you what she practices each day.
              </p>
              <p className="mt-4 font-display italic text-plum">
                &ldquo;Every individual has a right to control their finances. It is not a privilege.&rdquo;
              </p>
              <p className="mt-3 text-[0.85rem] text-muted-foreground">
                FCCA · MCSI · CFEI · FMVA · FPWMP · CBCA · CMSA · MSc Professional Accounting
              </p>
              <div className="mt-5">
                <BrandLink to="/coaching" variant="ghost">
                  Work with Temi →
                </BrandLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Chonzzi Philosophy Section */}
      <Section className=" dark:bg-[#1a1a1a]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <Eyebrow center>The Chonzzi Philosophy</Eyebrow>
            
           <div className="mt-4">
             <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              At The Chonzzi Company, we believe your financial choices should start with being{" "}
              <span className="font-semibold text-foreground">Conscious</span> of what you truly value. 
              We take a <span className="font-semibold text-foreground">Holistic</span> view of your whole life, 
              so you can take full <span className="font-semibold text-foreground">Ownership</span> of every 
              financial decision you make. Together, we help you <span className="font-semibold text-foreground">
              Nurture</span> a personalised plan built on a <span className="font-semibold text-foreground">
              Zero-based</span> approach, where every kobo is allocated to a specific goal. Because when every 
              kobo has a purpose, you don't just manage money. You build toward your financial{" "}
              <span className="font-semibold text-foreground">Zenith</span>,{" "}
              <span className="font-semibold text-foreground">Intentionally</span>.
            </p>
           </div>
           
          </motion.div>
        </Container>
      </Section>

      <Section tight>
        <Container>
          <div className="mx-auto mb-9 max-w-[640px] text-center">
            <Eyebrow center>Free · no account needed</Eyebrow>
            <h2 className="mt-3">Not sure where to start? Know your money first.</h2>
            <p className="lead mx-auto mt-3">
              Three short assessments. Each answers a different question about you and your money,
              and each takes minutes.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <AssessmentCard
              tone="mp"
              tag="Money Personality Assessment"
              question="What is my money personality?"
              description="Are you a saver, an avoider, a warrior, or a spender?"
              meta={["~5 min", "16 questions"]}
              ctaLabel="My personality is…"
              to="/assessments/personality"
            />
            <AssessmentCard
              tone="fhc"
              tag="Financial Health Check"
              question="Where do I stand right now?"
              description="Where is your money strong, and what areas are exposed?"
              meta={["~5 min", "18 questions"]}
              ctaLabel="Are my finances in order?"
              to="/assessments/health-check"
            />
            <AssessmentCard
              tone="rp"
              tag="Risk Profile Assessment"
              question="How much risk am I willing to take?"
              description="Before any investments, know how much risk you can truly take."
              meta={["~3 min", "12 questions"]}
              ctaLabel="What's my risk profile?"
              to="/assessments/risk-profile"
            />
          </div>
        </Container>
      </Section>
    </>
  );
}