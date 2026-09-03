import {Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/site/Eyebrow";
import { BrandAnchor } from "@/components/site/BrandButton";
import { QuizWizard, QuizIntroCard, type WizardQuestion } from "@/components/quiz/QuizWizard";
import { ResultGate } from "@/components/quiz/ResultGate";
import { RP_Q, RP_DIMS, RP_LEVELS } from "@/data/assessments";


const DIM_HEADS = [
  "Risk tolerance, how falls feel",
  "Risk capacity, what your base can carry",
  "Investing experience, what you have seen",
  "Return expectations, the job of this money",
];

export default function RiskProfilePage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<null | {
    level: (typeof RP_LEVELS)[number];
    split: string | null;
  }>(null);
  const resRef = useRef<HTMLDivElement>(null);

  const questions: WizardQuestion[] = RP_Q.map((q) => ({
    text: q.t,
    section: DIM_HEADS[q.d],
    options: q.o.map((label, j) => ({ label, value: String(j) })),
  }));

  const submit = () => {
    const D = RP_DIMS.map((d) => ({ ...d, score: 0 }));
    for (let i = 0; i < RP_Q.length; i++) D[RP_Q[i].d].score += 3 - Number(answers[i]);
    const totalW = D.reduce((a, d) => a + d.w, 0);
    const blend = D.reduce((a, d) => a + (d.score / d.max) * d.w, 0) / totalW;
    const capPct = D[1].score / D[1].max;
    const baseLvl = blend < 0.4 ? 1 : blend < 0.7 ? 2 : 3;
    const capLvl = capPct >= 0.7 ? 3 : capPct >= 0.4 ? 2 : 1;
    const lvl = Math.min(baseLvl, capLvl);
    const level = RP_LEVELS[lvl - 1];

    const ageV = parseInt(age);
    let split: string | null = null;
    if (!isNaN(ageV) && ageV > 0) {
      const adj = [-15, 0, 10][lvl - 1];
      const g = Math.max(10, Math.min(90, 100 - ageV + adj));
      split = `Growth assets ${g}% (equities, equity funds, property) · Stability assets ${100 - g}% (bonds, money market, fixed income).`;
    }
    setResult({ level, split });
  };

  useEffect(() => {
    if (result) resRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [result]);

  return (
    <>
      <Section tight className="!pt-14 !pb-8">
        <Container>
          <QuizIntroCard
            eyebrow="Risk Profile"
            title="Your Risk Profile"
            description="Before your money takes any risk, know how much risk is actually yours to take. Your age shapes the suggested split, add it below."
            meta={[
              { label: "Time", value: "2 min" },
              { label: "Questions", value: "12" },
              { label: "Result", value: "With split" },
            ]}
          />
          <div className="mt-6 flex flex-wrap gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your first name (optional)"
              className="w-full max-w-[240px] rounded-xl border border-line bg-white/80 px-[15px] py-3 shadow-sm backdrop-blur focus:border-plum/40 focus:outline-none"
            />
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Your age"
              min={16}
              max={90}
              className="w-full max-w-[140px] rounded-xl border border-line bg-white/80 px-[15px] py-3 shadow-sm backdrop-blur focus:border-plum/40 focus:outline-none"
            />
          </div>
        </Container>
      </Section>

      <Section tight className="!pt-0">
        <Container>
          <QuizWizard
            questions={questions}
            answers={answers}
            onAnswer={(i, v) => setAnswers({ ...answers, [i]: v })}
            onSubmit={submit}
            submitLabel="Show my profile"
            accent="gold"
          />

          {result && (
            <div ref={resRef} className="mt-8 rounded-[22px] border border-gold/30 bg-white/80 p-8 backdrop-blur-xl shadow-[0_28px_60px_-30px_rgba(201,162,39,0.4)]">
              <Eyebrow>Your profile{name && `, ${name.toUpperCase()}`}</Eyebrow>
              <h2 className="mt-2.5">{result.level.name}</h2>
              <p className="my-3">{result.level.blurb}</p>
              {result.split ? (
                <div className="rounded-lg bg-[color:var(--tint)] p-4">
                  <p className="text-[0.9rem]">
                    <b>Your age-shaped starting split:</b> {result.split}
                  </p>
                  <p className="mt-2 text-[0.8rem] text-muted-foreground">
                    Baseline of 100 minus your age, adjusted for your profile. A starting point for
                    conversation, not personal advice.
                  </p>
                </div>
              ) : (
                <p className="text-[0.85rem] text-muted-foreground">
                  Add your age above and re-run for a suggested growth/stability split.
                </p>
              )}
              <ResultGate
                title="Your full profile is ready."
                description="Your complete risk breakdown, your suggested asset split, and what it means for your first investments, sent to your inbox so you can keep it."
                buttonLabel="Send my full profile"
                buttonVariant="gold"
              />
              <hr className="my-6 border-line" />
              <h3>The next step</h3>
              <p className="mt-2">
                Modules 9 and 10 of the Course turn this profile into an actual investment plan ,
                the fundamentals, then every option open to the everyday Nigerian.
              </p>
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
                <Link to="/assessments/personality" className="text-emerald">
                  discover your Money Personality
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
