import {Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/site/Eyebrow";
import { BrandButton, BrandAnchor } from "@/components/site/BrandButton";
import { QuizQuestion } from "@/components/quiz/QuizQuestion";
import { ResultGate } from "@/components/quiz/ResultGate";
import { MP_Q, MP_TYPES } from "@/data/assessments";


export default function PersonalityPage() {
  const [name, setName] = useState("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [warn, setWarn] = useState("");
  const [result, setResult] = useState<null | { top: (typeof MP_TYPES)[number]; second: (typeof MP_TYPES)[number] | null }>(null);
  const resRef = useRef<HTMLDivElement>(null);

  const submit = () => {
    for (let i = 0; i < 10; i++) {
      if (!answers[i]) {
        setWarn(`Answer all 10 questions — ${i + 1} is waiting.`);
        return;
      }
    }
    setWarn("");
    const tally: Record<string, number> = { saver: 0, avoider: 0, worrier: 0, spender: 0 };
    for (let i = 0; i < 10; i++) tally[answers[i]]++;
    const sorted = Object.entries(tally).sort((a, b) => b[1] - a[1]);
    const top = MP_TYPES.find((t) => t.key === sorted[0][0])!;
    const second =
      sorted[1][1] > 0 && sorted[1][1] >= sorted[0][1] - 2
        ? MP_TYPES.find((t) => t.key === sorted[1][0]) ?? null
        : null;
    setResult({ top, second });
  };

  useEffect(() => {
    if (result) resRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [result]);

  return (
    <>
      <Section tight className="!pt-14">
        <Container>
          <Eyebrow tone="lilac">Free · 2 minutes · 10 questions</Eyebrow>
          <h1 className="my-3">Your Money Personality</h1>
          <p className="lead">
            The way you handle money isn't a flaw — it's a pattern, usually learned long before your
            first salary. Ten questions. No right answers, only honest ones.
          </p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your first name (optional)"
            className="mt-5 w-full max-w-[340px] rounded-lg border border-line bg-white px-[15px] py-3"
          />
        </Container>
      </Section>

      <Section tight className="!pt-0">
        <Container>
          <div className="my-4 rounded-lg border border-[#EAD9A0] bg-[#FFF8E7] px-4 py-3 text-[0.85rem] text-[#6b5a1e]">
            <b>Build note (remove before launch):</b> The 10 questions below are structural
            placeholders. Final questions and mapping to come. Scoring engine, teaser result, and
            email capture are fully wired.
          </div>
          {MP_Q.map((q, i) => (
            <QuizQuestion
              key={i}
              index={i}
              text={q.t}
              name={`mq${i}`}
              options={q.o.map(([label, value]) => ({ label, value }))}
              selected={answers[i]}
              onSelect={(v) => setAnswers({ ...answers, [i]: v })}
            />
          ))}
          <p className="mt-4 flex flex-wrap items-center gap-3">
            <BrandButton variant="primary" onClick={submit}>
              Show my personality
            </BrandButton>
            <span className="text-[0.85rem] text-muted-foreground">{warn}</span>
          </p>

          {result && (
            <div ref={resRef} className="mt-7 rounded-[14px] border-2 border-plum bg-white p-8">
              <Eyebrow tone="lilac">
                Your personality{name && `, ${name.toUpperCase()}`}
              </Eyebrow>
              <h2 className="mt-2.5">{result.top.name}</h2>
              <p className="my-3">{result.top.blurb}</p>
              {result.second && (
                <p className="text-[0.85rem] text-muted-foreground">
                  With a strong second thread of <b>{result.second.name}</b> — most of us carry
                  more than one.
                </p>
              )}
              <ResultGate
                title="Your full personality profile is ready."
                description="What your type means for budgeting, saving, and the one habit that changes everything for your pattern — sent to your inbox so you can keep it."
                buttonLabel="Send my full profile"
                buttonVariant="primary"
              />
              <hr className="my-6 border-line" />
              <h3>The next step</h3>
              <p className="mt-2">
                Module 1 of the Course is built on exactly this — your money mindset, your patterns,
                and how to work with them instead of against them.
              </p>
              <div className="mt-3">
                <BrandAnchor variant="primary" href="https://moneysimplified.chonzzi.com/course">
                  Enrol in the Course — ₦35,000
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
