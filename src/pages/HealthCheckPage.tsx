import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/site/Eyebrow";
import { BrandAnchor } from "@/components/site/BrandButton";
import { QuizWizard, QuizIntroCard, type WizardQuestion } from "@/components/quiz/QuizWizard";
import { ResultGate } from "@/components/quiz/ResultGate";
import { FHC_Q, FHC_PILLARS, FHC_LEVELS } from "@/data/assessments";



export default function HealthCheckPage() {
  const [name, setName] = useState("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<null | {
    level: (typeof FHC_LEVELS)[number];
    tot: number;
    totMax: number;
    pillars: { name: string; pct: number | null; status: string }[];
  }>(null);
  const resRef = useRef<HTMLDivElement>(null);

  const questions: WizardQuestion[] = FHC_Q.map((q) => {
    const opts = q.o.map((o, j) => ({ label: o[0], value: String(j) }));
    if (q.na) opts.push({ label: q.na, value: "na" });
    return {
      text: q.t,
      section: FHC_PILLARS[q.p].name,
      options: opts,
    };
  });

  const submit = () => {
    const P = FHC_PILLARS.map((p) => ({ ...p, score: 0, max: 0 }));
    for (let i = 0; i < FHC_Q.length; i++) {
      const a = answers[i];
      const q = FHC_Q[i];
      const pl = P[q.p];
      if (a === "na") continue;
      const j = +a;
      pl.score += q.o[j][1];
      pl.max += 3;
    }
    const out = P.map((p) => {
      const pct = p.max ? p.score / p.max : null;
      const status = pct === null ? "," : pct >= 0.75 ? "Strong" : pct >= 0.4 ? "Building" : "Gap";
      return { name: p.name, pct, status };
    });
    const tot = P.reduce((a, p) => a + p.score, 0);
    const totMax = P.reduce((a, p) => a + p.max, 0);
    const pct = tot / totMax;
    let level = FHC_LEVELS[0];
    for (const l of FHC_LEVELS) if (pct >= l[0]) level = l;
    setResult({ level, tot, totMax, pillars: out });
  };

  useEffect(() => {
    if (result) resRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [result]);

  return (
    <>
      <Section tight className="!pt-14 !pb-8">
        <Container>
          <QuizIntroCard
            eyebrow="Financial Health Check"
            title="The Financial Health Check"
            description="You have worked hard for this money. Is it working just as hard for you? There are no right answers, only honest ones. Nothing here is recorded unless you choose to email yourself the results."
            meta={[
              { label: "Time", value: "3 min" },
              { label: "Questions", value: "18" },
              { label: "Areas", value: "6 pillars" },
            ]}
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your first name (optional)"
            className="mt-6 w-full max-w-[340px] rounded-xl border border-line bg-white/80 px-[15px] py-3 shadow-sm backdrop-blur focus:border-plum/40 focus:outline-none"
          />
        </Container>
      </Section>

      <Section tight className="!pt-0">
        <Container>
          <QuizWizard
            questions={questions}
            answers={answers}
            onAnswer={(i, v) => setAnswers({ ...answers, [i]: v })}
            onSubmit={submit}
            submitLabel="Show my results"
            accent="emerald"
          />

          {result && (
            <div ref={resRef} className="mt-8 rounded-[22px] border border-emerald/20 bg-white/80 p-8 backdrop-blur-xl shadow-[0_28px_60px_-30px_rgba(26,96,53,0.35)]">
              <Eyebrow tone="green">
                Your result{name && `, ${name.toUpperCase()}`}
              </Eyebrow>
              <h2 className="mt-2.5">{result.level[1]}</h2>
              <p className="font-display text-[1.6rem] font-bold text-plum">
                {result.tot}{" "}
                <span className="text-base font-normal text-muted-foreground">
                  out of {result.totMax}
                </span>
              </p>
              <p className="my-3">{result.level[2]}</p>

              <div className="overflow-x-auto">
                <table className="mt-4 w-full border-collapse text-[0.9rem]">
                  <thead>
                    <tr>
                      <th className="border-b border-line py-2.5 text-left font-mono text-[0.72rem] uppercase tracking-[0.1em] text-muted-foreground">Area</th>
                      <th className="border-b border-line py-2.5 text-left font-mono text-[0.72rem] uppercase tracking-[0.1em] text-muted-foreground">Score</th>
                      <th className="border-b border-line py-2.5 text-left font-mono text-[0.72rem] uppercase tracking-[0.1em] text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.pillars.map((p) => (
                      <tr key={p.name}>
                        <td className="border-b border-line py-2.5">{p.name}</td>
                        <td className="border-b border-line py-2.5">
                          {p.pct === null ? "," : `${Math.round(p.pct * 100)}%`}
                        </td>
                        <td className="border-b border-line py-2.5">{p.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <ResultGate
                title="Your full breakdown is ready."
                description="Your six-area scores, the thing that cannot wait, and your three priorities with a first step for each, sent to your inbox so you can keep it."
                buttonLabel="Send my full report"
                buttonVariant="green"
              />

              <hr className="my-6 border-line" />
              <h3>The next step</h3>
              <p className="mt-2">
                An assessment shows you the gaps. The Course closes them, ten modules, your own
                numbers, a completed financial foundation.
              </p>
              <div className="mt-3">
                <BrandAnchor variant="primary" href="https://moneysimplified.chonzzi.com/course">
                  Enrol in the Course, ₦35,000
                </BrandAnchor>
              </div>
              <p className="mt-4 text-[0.85rem] text-muted-foreground">
                Next:{" "}
                <Link to="/assessments/personality" className="text-emerald">
                  discover your Money Personality
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
