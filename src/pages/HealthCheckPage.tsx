import { Link } from "react-router-dom";
import { useEffect, useRef, useState, Fragment } from "react";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/site/Eyebrow";
import { BrandButton, BrandAnchor } from "@/components/site/BrandButton";
import { QuizQuestion, PillarHead } from "@/components/quiz/QuizQuestion";
import { ResultGate } from "@/components/quiz/ResultGate";
import { FHC_Q, FHC_PILLARS, FHC_LEVELS } from "@/data/assessments";



export default function HealthCheckPage() {
  const [name, setName] = useState("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [warn, setWarn] = useState("");
  const [result, setResult] = useState<null | {
    level: (typeof FHC_LEVELS)[number];
    tot: number;
    totMax: number;
    pillars: { name: string; pct: number | null; status: string }[];
  }>(null);
  const resRef = useRef<HTMLDivElement>(null);

  const submit = () => {
    for (let i = 0; i < FHC_Q.length; i++) {
      if (answers[i] === undefined) {
        setWarn(`Answer all 18 questions, ${i + 1} is waiting.`);
        return;
      }
    }
    setWarn("");
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
      const status = pct === null ? "—" : pct >= 0.75 ? "Strong" : pct >= 0.4 ? "Building" : "Gap";
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

  let lastPillar = -1;
  return (
    <>
      <Section tight className="!pt-14">
        <Container>
          <Eyebrow tone="green">Free · 3 minutes · 18 questions</Eyebrow>
          <h1 className="my-3">The Financial Health Check</h1>
          <p className="lead">
            You have worked hard for this money. Is it working just as hard for you? There are no
            right answers, only honest ones. Nothing here is recorded unless you choose to email
            yourself the results.
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
          {FHC_Q.map((q, i) => {
            const showPillar = q.p !== lastPillar;
            lastPillar = q.p;
            const opts = q.o.map((o, j) => ({ label: o[0], value: String(j) }));
            if (q.na) opts.push({ label: q.na, value: "na" });
            return (
              <Fragment key={i}>
                {showPillar && <PillarHead>{FHC_PILLARS[q.p].name}</PillarHead>}
                <QuizQuestion
                  index={i}
                  text={q.t}
                  name={`fq${i}`}
                  options={opts}
                  selected={answers[i]}
                  onSelect={(v) => setAnswers({ ...answers, [i]: v })}
                />
              </Fragment>
            );
          })}
          <p className="mt-4 flex flex-wrap items-center gap-3">
            <BrandButton variant="green" onClick={submit}>
              Show my results
            </BrandButton>
            <span className="text-[0.85rem] text-muted-foreground">{warn}</span>
          </p>

          {result && (
            <div ref={resRef} className="mt-7 rounded-[14px] border-2 border-plum bg-white p-8">
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
                        {p.pct === null ? "—" : `${Math.round(p.pct * 100)}%`}
                      </td>
                      <td className="border-b border-line py-2.5">{p.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <ResultGate
                title="Your full breakdown is ready."
                description="Your six-area scores, the thing that cannot wait, and your three priorities with a first step for each — sent to your inbox so you can keep it."
                buttonLabel="Send my full report"
                buttonVariant="green"
              />

              <hr className="my-6 border-line" />
              <h3>The next step</h3>
              <p className="mt-2">
                An assessment shows you the gaps. The Course closes them — ten modules, your own
                numbers, a completed financial foundation.
              </p>
              <div className="mt-3">
                <BrandAnchor variant="primary" href="https://moneysimplified.chonzzi.com/course">
                  Enrol in the Course — ₦35,000
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
