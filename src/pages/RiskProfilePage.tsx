import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/site/Eyebrow";
import { BrandAnchor } from "@/components/site/BrandButton";
import { QuizWizard, QuizIntroCard, type WizardQuestion } from "@/components/quiz/QuizWizard";
import { ResultGate } from "@/components/quiz/ResultGate";
import {
  RP_Q,
  RP_DIMS,
  RP_LEVELS,
  RP_ALIGNMENT,
  RP_TIME_AND_ACCESS,
  RP_CLOSING,
} from "@/data/assessments";
import { generateRiskProfileSummaryHtml } from "@/utils/generateRiskProfileHtml";

const DIM_HEADS = [
  "Risk tolerance — how falls feel",
  "Risk capacity — what your base can carry",
  "Investing experience — what you have seen",
  "Return expectations — the job of this money",
];

type DimResult = {
  name: string;
  score: number;
  max: number;
  pct: number;
  label: string;
};

type RiskResult = {
  level: (typeof RP_LEVELS)[number];
  levelIndex: 1 | 2 | 3;
  baseLevel: 1 | 2 | 3;
  capLevel: 1 | 2 | 3;
  alignmentVariant: 0 | 1 | 2;
  dims: DimResult[];
};

export default function RiskProfilePage() {
  const [name, setName] = useState("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<RiskResult | null>(null);
  const resRef = useRef<HTMLDivElement>(null);

  const questions: WizardQuestion[] = RP_Q.map((q) => ({
    text: q.t,
    section: DIM_HEADS[q.d],
    options: q.o.map((label, j) => ({ label, value: String(j) })),
  }));

  const submit = () => {
    // --- Step A: score every answer (position-based: 3,2,1,0) ---
    const D = RP_DIMS.map((d, i) => ({ ...d, index: i, score: 0 }));

    for (let i = 0; i < RP_Q.length; i++) {
      const position = Number(answers[i]); // 0..3 (0 = boldest, 3 = most cautious)
      if (Number.isNaN(position)) return;
      D[RP_Q[i].d].score += 3 - position;
    }

    // --- Step B: per-dimension percentage and reading label ---
    const dims: DimResult[] = D.map((d) => {
      const pct = d.score / d.max;
      // ≥70% → high (index 2); 40–69.99% → mid (index 1); <40% → low (index 0)
      const bandIdx = pct >= 0.7 ? 2 : pct >= 0.4 ? 1 : 0;
      return {
        name: d.name,
        score: d.score,
        max: d.max,
        pct,
        label: d.labs[bandIdx],
      };
    });

    // --- Step C: blend (weighted average of dimension percentages) ---
    const totalW = RP_DIMS.reduce((a, d) => a + d.w, 0); // 1.00
    const blend = D.reduce((a, d) => a + (d.score / d.max) * d.w, 0) / totalW;

    // --- Step D: base level from blend ---
    const baseLevel: 1 | 2 | 3 = blend < 0.4 ? 1 : blend < 0.7 ? 2 : 3;

    // --- Step E: capacity level from Risk capacity alone ---
    const capPct = D[1].score / D[1].max;
    const capLevel: 1 | 2 | 3 = capPct >= 0.7 ? 3 : capPct >= 0.4 ? 2 : 1;

    // --- Step F: final level = MIN(base, capacity) — capacity caps ---
    const finalLevel = Math.min(baseLevel, capLevel) as 1 | 2 | 3;
    const level = RP_LEVELS[finalLevel - 1];

    // --- Step G: alignment variant ---
    const alignmentVariant: 0 | 1 | 2 =
      baseLevel > capLevel ? 0 : capLevel > baseLevel ? 1 : 2;

    setResult({
      level,
      levelIndex: finalLevel,
      baseLevel,
      capLevel,
      alignmentVariant,
      dims,
    });
  };

  useEffect(() => {
    if (result) resRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [result]);

  // The headline: omit name and comma if blank
  const headline = name.trim()
    ? `${name.trim()}, here is what your answers show.`
    : "Here is what your answers show.";

  return (
    <>
      <Section tight className="!pt-14 !pb-8">
        <Container>
          <QuizIntroCard
            eyebrow="Risk Profile"
            title="Your Risk Profile"
            description="Before your money takes any risk, know how much risk is actually yours to take."
            meta={[
              { label: "Time", value: "2 min" },
              { label: "Questions", value: "12" },
              { label: "Result", value: "Instant" },
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
            submitLabel="Show my profile"
            accent="gold"
          />

          {result && (
            <div
              ref={resRef}
              className="mt-8 rounded-[22px] border border-gold/30 bg-white/80 p-8 backdrop-blur-xl shadow-[0_28px_60px_-30px_rgba(201,162,39,0.4)]"
            >
              {/* Block 1 — Headline */}
              <Eyebrow>Your profile{name && `, ${name.toUpperCase()}`}</Eyebrow>
              <h2 className="mt-2.5">{headline}</h2>

              {/* Block 2 — Profile name + paragraph */}
              <h3 className="mt-4">{result.level.name}</h3>
              <p className="my-3">{result.level.blurb}</p>

              {/* Block 3 — Alignment note (Step G) */}
              <p className="rounded-lg border border-gold/30 bg-[color:var(--tint)] p-4 text-[0.9rem]">
                {RP_ALIGNMENT[result.alignmentVariant]}
              </p>

              {/* Block 4 — Four dimensions table */}
              <p className="mt-7 font-mono text-[0.7rem] font-bold uppercase tracking-[0.12em] text-plum">
                THE FOUR DIMENSIONS
              </p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[520px] border-collapse text-left text-[0.9rem]">
                  <thead>
                    <tr>
                      <th className="border-b border-line py-2.5 font-mono text-[0.66rem] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                        Dimension
                      </th>
                      <th className="border-b border-line py-2.5 font-mono text-[0.66rem] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                        Score
                      </th>
                      <th className="border-b border-line py-2.5 font-mono text-[0.66rem] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                        Reading
                      </th>
                      <th className="border-b border-line py-2.5 font-mono text-[0.66rem] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                        Progress
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.dims.map((d) => {
                      const filled = Math.round(d.pct * 10);
                      const blocks = "█".repeat(filled) + "░".repeat(10 - filled);
                      return (
                        <tr key={d.name}>
                          <td className="border-b border-line py-2.5 pr-4">{d.name}</td>
                          <td className="border-b border-line py-2.5 pr-4 font-mono text-[0.82rem]">
                            {d.score} / {d.max}
                          </td>
                          <td className="border-b border-line py-2.5 pr-4 text-plum">
                            {d.label}
                          </td>
                          <td className="border-b border-line py-2.5 font-mono text-[0.8rem] tracking-[1px] text-emerald">
                            {blocks}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Block 5 — Time and access note (no heading) */}
              <p className="mt-6 text-[0.9rem] leading-relaxed">{RP_TIME_AND_ACCESS}</p>

              {/* ResultGate — sends the full reading to email */}
              <ResultGate
                title="Your full profile is ready."
                description="Your complete risk breakdown and what it means for your first investments, sent to your inbox so you can keep it."
                buttonLabel="Send my full profile"
                buttonVariant="gold"
                userName={name.trim() || undefined}
                assessmentData={{
                  assessmentName: "Risk Profile",
                  assessmentDescription:
                    "A 12-question investment risk diagnostic across four dimensions, producing a Conservative, Balanced or Growth profile.",
                  resultsSummary: generateRiskProfileSummaryHtml(
                    {
                      headline,
                      level: result.level,
                      alignmentVariant: result.alignmentVariant,
                      dims: result.dims,
                    },
                    name
                  ),
                 
                }}
              />

              {/* Block 6 — Closing CTA */}
              <hr className="my-6 border-line" />
              <h3>{RP_CLOSING.heading}</h3>
              <p className="mt-2">{RP_CLOSING.body}</p>
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