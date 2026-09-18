// pages/assessments/PersonalityPage.tsx
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/site/Eyebrow";
import { BrandAnchor } from "@/components/site/BrandButton";
import { QuizWizard, QuizIntroCard, type WizardQuestion } from "@/components/quiz/QuizWizard";
import { ResultGate } from "@/components/quiz/ResultGate";
import {
  QUESTIONS,
  SCALE_LABELS,
  //NAMES,
  //SHORT,
  //BLENDS,
  COPY,
  evaluate,
  type Result,
} from "@/lib/moneyPersonality";
import { generatePersonalitySummaryHtml } from "@/utils/generatePersonalityHtml";

export default function PersonalityPage() {
  const [name, setName] = useState("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<Result | null>(null);
  const resRef = useRef<HTMLDivElement>(null);

  const questions: WizardQuestion[] = QUESTIONS.map((q) => ({
    text: q.text,
    options: SCALE_LABELS.map((label) => ({
      label,
      value: String(SCALE_LABELS.indexOf(label) + 1),
    })),
  }));

  const submit = () => {
    const ratings = QUESTIONS.map((_, i) => Number(answers[i]));
    if (ratings.some((r) => !r)) return;
    setResult(evaluate(ratings));
  };

  useEffect(() => {
    if (result) resRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [result]);

  return (
    <>
      <Section tight className="!pt-14 !pb-8">
        <Container>
          <QuizIntroCard
            eyebrow="Money Personality"
            title={COPY.title}
            description={`${COPY.lead} ${COPY.howItWorks}`}
            meta={[
              { label: "Time", value: "5 min" },
              { label: "Questions", value: "16" },
              { label: "Result", value: "Instant" },
            ]}
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={COPY.namePrompt}
            className="mt-6 w-full max-w-[340px] rounded-xl border border-line bg-white/80 px-[15px] py-3 shadow-sm backdrop-blur focus:border-plum/40 focus:outline-none"
          />
          <p className="mt-3 max-w-[62ch] text-[0.85rem] text-muted-foreground">
            {COPY.instruction} {COPY.noRightAnswers}
          </p>
        </Container>
      </Section>

      <Section tight className="!pt-0">
        <Container>
          <QuizWizard
            questions={questions}
            answers={answers}
            onAnswer={(i, v) => setAnswers({ ...answers, [i]: v })}
            onSubmit={submit}
            submitLabel={COPY.seeResult}
            accent="plum"
          />

          {result && (
            <div
              ref={resRef}
              className="mt-8 overflow-hidden rounded-[22px] border border-plum/15 bg-white/80 p-8 shadow-[0_28px_60px_-30px_rgba(24,0,38,0.35)] backdrop-blur-xl"
            >
              <Eyebrow tone="lilac">{COPY.greeting(name.trim())}</Eyebrow>
              <h2 className="mt-2.5">{result.title}</h2>
              <p className="my-3">{result.opening}</p>

              {/* Scores and bands */}
              {/* <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {NAMES.map((n) => (
                  <div
                    key={n}
                    className="flex items-center justify-between rounded-xl border border-plum/10 bg-white/70 px-4 py-3"
                  >
                    <span className="font-semibold text-plum">The {n}</span>
                    <span className="font-mono text-[0.8rem] text-muted-foreground">
                      {result.scores[n]} / 20 · {result.bands[n]}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-2.5 text-[0.8rem] text-muted-foreground">{COPY.legend}</p> */}

              {/* Pattern detail */}
              {/* {result.patterns.length > 0 && (
                <div className="mt-6 grid gap-4">
                  {result.patterns.map((p) => (
                    <div
                      key={p}
                      className="rounded-[14px] border border-line bg-[color:var(--tint)] p-5"
                    >
                      <h3>The {p}</h3>
                      <p className="mt-2 text-[0.92rem]">{SHORT[p].means}</p>
                      <p className="mt-2 text-[0.92rem]">
                        <b>The light: </b>
                        {SHORT[p].light}
                      </p>
                      <p className="mt-2 text-[0.92rem]">
                        <b>The shadow: </b>
                        {SHORT[p].shadow}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {result.shape === "balanced" && (
                <div className="mt-6 grid gap-4">
                  <p className="text-[0.9rem] text-muted-foreground">{COPY.fourIntro}</p>
                  {NAMES.map((p) => (
                    <div
                      key={p}
                      className="rounded-[14px] border border-line bg-[color:var(--tint)] p-5"
                    >
                      <h3>The {p}</h3>
                      <p className="mt-2 text-[0.92rem]">{SHORT[p].means}</p>
                      <p className="mt-2 text-[0.92rem]">
                        <b>The light: </b>
                        {SHORT[p].light}
                      </p>
                      <p className="mt-2 text-[0.92rem]">
                        <b>The shadow: </b>
                        {SHORT[p].shadow}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {result.blend && BLENDS[result.blend] && (
                <div className="mt-5 rounded-[14px] border border-gold/40 bg-white/70 p-5">
                  <h3>{result.blend.replace("-", " with ")}</h3>
                  <p className="mt-2 text-[0.92rem]">{BLENDS[result.blend]}</p>
                </div>
              )}

              <p className="mt-5">{COPY.meaning1}</p>
              <p className="mt-3">{COPY.meaning2}</p> */}

              <ResultGate
                title={COPY.formHeading}
                description={''}
                buttonLabel="Send my full reading"
                buttonVariant="primary"
                userName={name.trim() || undefined}
                assessmentData={{
                  assessmentName: "Money Personality",
                  assessmentDescription:
                    "Your personality explains why you handle money the way you do, and where that habit helps you or quietly costs you. There is no wrong type here, only patterns worth knowing about.",
                  resultsSummary: generatePersonalitySummaryHtml(result, name),

                }}
              />

              <p className="mt-3 text-[0.8rem] text-muted-foreground">{COPY.privacy}</p>

              <hr className="my-6 border-line" />
              <h3>{COPY.ctaHeading}</h3>
              <p className="mt-2">{COPY.cta1}</p>
              <p className="mt-2">{COPY.cta2}</p>
              <div className="mt-3">
                <BrandAnchor variant="primary" href="https://moneysimplified.chonzzi.com/course">
                  Enrol in the Course, ₦35,000
                </BrandAnchor>
              </div>
              <p className="mt-4 text-[0.85rem] text-muted-foreground">
                Next:{" "}
                <Link to="/assessments/health-check" className="text-emerald">
                  take the Financial Health Check
                </Link>{" "}
                or{" "}
                <Link to="/assessments/risk-profile" className="text-emerald">
                  find your Risk Profile
                </Link>
                .
              </p>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}