import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/site/Eyebrow";
import { AssessmentCard } from "@/components/site/AssessmentCard";
import { HeroBackground } from "@/components/site/HeroBackground";
import { ShieldCheck, Mail } from "lucide-react";

// export const Route = createFileRoute("/assessments/")({
//   head: () => ({
//     meta: [
//       { title: "Free Assessments, The Chonzzi Company" },
//       { name: "description", content: "Three free assessments: Money Personality, Financial Health Check, and Risk Profile. Minutes each, no account needed." },
//       { property: "og:title", content: "Free Assessments, The Chonzzi Company" },
//       { property: "og:description", content: "Know your money. Three short assessments." },
//     ],
//   }),
//   component: AssessmentsHub,
// });

export default function AssessmentsHub() {
  return (
    <>
      <HeroBackground className="dark-surface py-20 md:py-[84px] text-[#EFEAE2]">
        <Container>
          <div className="text-center">
            <Eyebrow center>Free · no account needed · minutes each</Eyebrow>
            <h1 className="mx-auto mt-4 max-w-[700px] text-white">Know your money.</h1>
            <p className="lead mx-auto mt-4 text-[#CFC8BE]">
              Three assessments. Three different questions about you and your money. Take one, or
              take all three, each ends with your result and your next step.
            </p>
          </div>
        </Container>
      </HeroBackground>

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            <AssessmentCard
              tone="mp"
              tag="Money Personality Assessment"
              title="Money Personality"
              question="What is my money personality?"
              description="Are you a saver, an avoider, a warrior, or a spender?"
              meta={["~5 min", "16 questions", "Result by email"]}
              ctaLabel="My personality is…"
              to="/assessments/personality"
            />
            <AssessmentCard
              tone="fhc"
              tag="Financial Health Check"
              title="Financial Health Check"
              question="Where do I stand right now?"
              description="18 honest questions across 6 areas of your financial life, and a score that shows you exactly where the gaps are."
              meta={["~5 min", "18 questions", "Result by email"]}
              ctaLabel="Are my finances in order?"
              to="/assessments/health-check"
            />
            <AssessmentCard
              tone="rp"
              tag="Risk Profile Assessment"
              title="Risk Profile"
              question="How much risk am I willing to take?"
              description="Before your money takes any risk, know how much risk is actually yours to take, with a suggested investment split shaped by your age and temperament."
              meta={["~3 min", "12 questions", "Result by email"]}
              ctaLabel="What's my risk profile?"
              to="/assessments/risk-profile"
            />
          </div>

          {/* Redesigned privacy/consent note */}
          <div
            className="mt-10 overflow-hidden rounded-[20px] border border-plum/10"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.98 0.02 305) 0%, oklch(0.95 0.04 305) 100%)",
            }}
          >
            <div className="grid gap-0 md:grid-cols-2">
              <div className="flex gap-4 p-7 md:border-r md:border-plum/10">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald shadow-sm">
                  <ShieldCheck size={22} />
                </span>
                <div>
                  <h4 className="mb-1.5 font-display text-[1.05rem] font-semibold text-plum">
                    Private by default
                  </h4>
                  <p className="m-0 text-[0.9rem] leading-relaxed text-muted-foreground">
                    Your answers stay on this page unless you choose to email yourself the results.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-7">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-gold shadow-sm">
                  <Mail size={22} />
                </span>
                <div>
                  <h4 className="mb-1.5 font-display text-[1.05rem] font-semibold text-plum">
                    If you email your result
                  </h4>
                  <p className="m-0 text-[0.9rem] leading-relaxed text-muted-foreground">
                    Emailing your result adds you to the Money Simplified letter, you can leave any
                    time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
