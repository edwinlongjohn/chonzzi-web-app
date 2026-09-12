import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/site/Eyebrow";
import { BrandAnchor } from "@/components/site/BrandButton";
import { QuizWizard, QuizIntroCard, type WizardQuestion } from "@/components/quiz/QuizWizard";
import { ResultGate } from "@/components/quiz/ResultGate";
import { FHC_Q, FHC_PILLARS, FHC_LEVELS } from "@/data/assessments";

type PillarResult = { name: string; score: number; max: number; pct: number; status: "Strong" | "Building" | "Gap" };
type CopyVariant = { heading: string; copy: string };

const PILLAR_COPY: Record<string, Record<"Gap" | "Building" | "Strength", CopyVariant>> = {
  Clarity: { Gap: { heading: "You are managing money you cannot fully see", copy: "You cannot direct money you have not counted. Until your income, spending and net worth are written down, every decision is a guess. Close this gap first, because every other area on this page depends on it." }, Building: { heading: "You see most of your money, but there is a gap", copy: "You are not passive with your money. What is missing is the full picture: the transfers you make and forget, the subscription that renews automatically. Tighten the view and the rest gets easier." }, Strength: { heading: "You know your numbers", copy: "Clarity is the foundation most people skip, and you have not skipped it. What is left is making sure those numbers are pointed somewhere deliberate." } },
  "Safety net": { Gap: { heading: "One shock stands between you and your progress", copy: "You are building something, and a safety net is what stops one bad month from undoing it. At the moment an emergency or a paused salary would come out of your savings, your investments, or a loan, which sets back whatever that money was meant for." }, Building: { heading: "Your safety net is real but it has a hole in it", copy: "You have months of cover set aside in an account of its own, and you built that. What is missing is depth: topping it up to a full three to six months costs far less than borrowing during the emergency it is there for." }, Strength: { heading: "Your safety net is real", copy: "You can absorb an emergency without touching your investments or borrowing to cover it, which means a bad month costs you money but not progress." } },
  "Debt & obligations": { Gap: { heading: "Obligations you have not planned for are planning your month for you", copy: "Debt without a payoff plan and family support without a set amount work the same way: both take their share of your income before you have decided what the rest is for. The answer is not to stop giving. It is to set the amount in advance and, for the debt, a date it ends." }, Building: { heading: "Not everything that leaves your hands has a plan yet", copy: "Loan repayments are happening and most of your giving is deliberate. What is left is the part that is still informal: the giving with no ceiling, the debt with no end date. Setting a limit on both is what stops the drift." }, Strength: { heading: "What leaves your hands, leaves on your terms", copy: "Your debts have a plan and your obligations have a budget line. That structure is what keeps your bigger decisions from being forced ones." } },
  Growth: { Gap: { heading: "Your income is doing the work, but your money has not caught up", copy: "Money sitting in a regular account will keep losing value, and nothing on your statement will show it. That is inflation doing its work. What closes this gap is structure: paying your future first by automatic transfer, and keeping that money where it earns more than prices rise." }, Building: { heading: "Your money has started working but it is not yet pulling its weight", copy: "You have savings and investments in motion. The question now is placement: is what you are holding working as hard as it could be, or is some of it sitting somewhere convenient rather than somewhere suitable?" }, Strength: { heading: "Your money is working alongside you", copy: "You save first and your money is invested with intention. What is left is checking that each holding is still the best available option for what you need it to do." } },
  "Future & protection": { Gap: { heading: "The future keeps arriving without a fund waiting for it", copy: "School fees, a home, retirement: these arrive on known dates, so each needs its own fund rather than one general pot. The second half of this area is protection. Without a will, written instructions and adequate cover, the people you provide for would have to work out for themselves what you own and where it is held." }, Building: { heading: "Your longer-term plans are partly funded", copy: "Some of your dated goals already have money set aside for them. The ones that do not, and the documents you have not written yet, will not cause you a problem until the point you need them, which is usually the point you cannot fix them." }, Strength: { heading: "You are building with the long view", copy: "Your goals have funds, your future is being financed and your affairs are documented. You have covered the part most people postpone: protecting what you are building, and the people you are building it for." } },
  Agency: { Gap: { heading: "You have financial access, but not yet financial agency", copy: "Money passes through your hands, but the decisions, the visibility and the confidence are still being built. Financial confidence is built one decision at a time, and it comes from understanding a plan you helped write rather than following one you were handed. Where money is shared, asking to see the full picture is partnership, not distrust." }, Building: { heading: "You own most of your decisions, but the claim is not finished", copy: "You are present in your money and the big decisions pass through you. What is left is the part that only exists in your head: the decision you keep postponing, the account or policy your partner has never seen. Pick one and put a date on it this month." }, Strength: { heading: "You sit in the driver’s seat of your own money", copy: "You decide from understanding, your name is on what you have built, and you can look at your finances without flinching. That is financial agency, and it is what the other five areas make possible." } },
};

const FALLBACKS = ["Before this week ends, write down last month’s income and where it actually went.", "This week, open a separate account that is not tied to your debit card and fund it. It doesn’t matter how small. The habit matters before the amount does.", "List every debt and every regular obligation in one place, with amounts. The best plans are those written out.", "Set up one automatic transfer that leaves your account on payday, so you don’t have to negotiate with yourself.", "Pick the nearest dated goal and open a fund for it this month.", "Pick one financial decision you have been postponing and give yourself a clear deadline to act on it."];

function calculateResult(answers: Record<number, string>) {
  const pillars = FHC_PILLARS.map((pillar) => ({ ...pillar, score: 0, max: 0 }));
  const scored = FHC_Q.map((question) => {
    const answer = answers[question.id - 1];
    if (answer === "na") return { question, score: null as number | null };
    const score = 3 - Number(answer);
    pillars[question.p].score += score;
    pillars[question.p].max += 3;
    return { question, score };
  });
  const pillarResults: PillarResult[] = pillars.map((pillar) => { const pct = pillar.max ? pillar.score / pillar.max : 0; return { name: pillar.name, score: pillar.score, max: pillar.max, pct, status: pct >= 0.75 ? "Strong" : pct >= 0.4 ? "Building" : "Gap" }; });
  const total = scored.reduce((sum, item) => sum + (item.score ?? 0), 0);
  const totalMax = scored.filter((item) => item.score !== null).length * 3;
  const overallPct = totalMax ? total / totalMax : 0;
  let levelIndex = FHC_LEVELS.reduce((index, level, current) => overallPct >= level[0] ? current : index, 0);
  if (pillarResults.some((pillar) => pillar.status === "Gap")) levelIndex = Math.min(levelIndex, 2);
  const flags = scored.filter((item) => item.score === 0 && item.question.flag).map((item) => ({ ...item.question.flag!, pillar: FHC_PILLARS[item.question.p].name, step: item.question.step })).sort((a, b) => a.rank - b.rank);
  const priorities = pillarResults.map((pillar, index) => ({ pillar, index, priority: (1 - pillar.pct) * FHC_PILLARS[index].w })).filter(({ pillar }) => pillar.pct < 0.75).sort((a, b) => b.priority - a.priority || FHC_PILLARS[b.index].tie - FHC_PILLARS[a.index].tie).slice(0, 3).map(({ pillar, index }, priorityIndex) => { const candidate = scored.filter(({ question, score }) => question.p === index && score !== null && !(question.flag && score === 0) && score <= 1).sort((a, b) => (a.score! - b.score!) || a.question.id - b.question.id)[0]; return { number: priorityIndex + 1, pillar, step: candidate?.question.step ?? FALLBACKS[index] }; });
  const bestPillar = pillarResults.reduce((best, pillar, index) => pillar.pct > best.pillar.pct ? { pillar, index } : best, { pillar: pillarResults[0], index: 0 });
  const allClearStep = scored.filter(({ score }) => score !== null && score <= 1).sort((a, b) => (a.score! - b.score!) || a.question.id - b.question.id)[0];
  const sharpening = pillarResults.reduce((lowest, pillar) => pillar.pct < lowest.pct ? pillar : lowest, pillarResults[0]);
  return { pillars: pillarResults, total, totalMax, level: FHC_LEVELS[levelIndex], flags, priorities, bestPillar, allClear: priorities.length === 0 && flags.length === 0, allClearStep, sharpening };
}


export default function HealthCheckPage() {
  const [name, setName] = useState("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<ReturnType<typeof calculateResult> | null>(null);
  const resRef = useRef<HTMLDivElement>(null);
  const questions: WizardQuestion[] = FHC_Q.map((q) => ({ text: q.t, section: FHC_PILLARS[q.p].name, options: [...q.o.map((label, index) => ({ label, value: String(index) })), ...(q.na ? [{ label: q.na, value: "na" }] : [])] }));

  // In HealthCheckPage.tsx, create the HTML string for the results summary
  const generateResultsSummaryHtml = (
  result: ReturnType<typeof calculateResult>,
  name: string
): string => {
  const nameText = name.trim()
    ? `${name.trim()}, here is what your answers show.`
    : "Here is what your answers show.";

  let html = "";

  // Header
  html += `<h2>${nameText}</h2>`;

  // Score display
  html += `<p class="score-display">${result.total} <span>out of ${result.totalMax}</span></p>`;

  // Level
  html += `<h3>${result.level[1]}</h3>`;
  html += `<p>${result.level[2]}</p>`;

  // Flags
  if (result.flags.length > 0) {
    html += `<div class="flag-block">`;
    html += `<h3>THE THING THAT CANNOT WAIT</h3>`;
    html += `<p><strong>${result.flags[0].label}</strong></p>`;
    html += `<p style="font-size: 12px; color: #8a7a9a;">${result.flags[0].pillar}</p>`;
    html += `<p>One first step: ${result.flags[0].step}</p>`;
    if (result.flags.length > 1) {
      html += `<p style="font-size: 13px; margin-top: 12px;">Also flagged: ${result.flags
        .slice(1, 3)
        .map((flag) => flag.label)
        .join("; ")}</p>`;
    }
    html += `</div>`;
  }

  // Pillar table (wrapped in scrollable wrapper)
  html += `<div class="table-wrapper">`;
  html += `<table>`;
  html += `<thead><tr>`;
  html += `<th>Area</th><th>Score</th><th>Status</th><th>Progress</th>`;
  html += `</tr></thead>`;
  html += `<tbody>`;
  result.pillars.forEach((pillar) => {
    const filled = "█".repeat(Math.round(pillar.pct * 10));
    const empty = "░".repeat(10 - Math.round(pillar.pct * 10));
    html += `<tr>`;
    html += `<td>${pillar.name}</td>`;
    html += `<td>${pillar.score}/${pillar.max}</td>`;
    html += `<td>${pillar.status}</td>`;
    html += `<td style="font-family: monospace; letter-spacing: 2px; white-space: nowrap;">${filled}${empty}</td>`;
    html += `</tr>`;
  });
  html += `</tbody></table>`;
  html += `</div>`;

  // All clear or priorities
  if (result.allClear) {
    html += `<h3>YOU ARE DOING VERY WELL PLANNING YOUR FINANCES</h3>`;
    html += `<p>All six areas are holding at once, which is uncommon and reflects decisions you have made deliberately. From here the work is protection and time: keeping the systems you have built running, and reviewing them periodically. Incomes, dependants and goals change, and a plan set three years ago may no longer match the life you are living.</p>`;
    if (result.allClearStep) {
      html += `<p><strong>One thing still worth doing:</strong> ${result.allClearStep.question.step}</p>`;
    } else if (result.sharpening.pct < 1) {
      html += `<p>Your sharpening edge: ${result.sharpening.name} — the area furthest from full marks. One deliberate look this quarter improves this.</p>`;
    }
  } else {
    html += `<h3>${result.priorities.length === 1 ? "Your priority gap" : "Your priority gaps"}</h3>`;
    result.priorities.forEach((priority) => {
      const variant = priority.pillar.status === "Gap" ? "Gap" : "Building";
      const copy = PILLAR_COPY[priority.pillar.name][variant];
      html += `<div class="priority-block">`;
      html += `<p class="priority-label">Priority ${priority.number}</p>`;
      html += `<h4>${copy.heading}</h4>`;
      html += `<p>${copy.copy}</p>`;
      html += `<p><strong>One first step:</strong> ${priority.step}</p>`;
      html += `</div>`;
    });
  }

  // Best pillar
  if (result.bestPillar.pillar.pct >= 0.75) {
    const copy = PILLAR_COPY[result.bestPillar.pillar.name].Strength;
    html += `<h3>ONE THING YOU ARE DOING WELL</h3>`;
    html += `<h4>${copy.heading}</h4>`;
    html += `<p>${copy.copy}</p>`;
  }

  return html;
}

  useEffect(() => { if (result) resRef.current?.scrollIntoView({ behavior: "smooth" }); }, [result]);

  return (
    <>
      <Section tight className="!pt-14 !pb-8"><Container>
        <QuizIntroCard eyebrow="Financial Literacy With Temi" title="The Financial Health Check" description="An 18-question financial self-diagnostic across six areas of your financial life. There are no right answers, only honest ones." meta={[{ label: "Time", value: "3 min" }, { label: "Questions", value: "18" }, { label: "Areas", value: "6 pillars" }]} />
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your first name (optional)" className="mt-6 w-full max-w-[340px] rounded-xl border border-line bg-white/80 px-[15px] py-3 shadow-sm backdrop-blur focus:border-plum/40 focus:outline-none" />
      </Container>
      </Section>
      <Section tight className="!pt-0"><Container>
        <QuizWizard questions={questions} answers={answers} onAnswer={(index, value) => setAnswers((current) => ({ ...current, [index]: value }))} onSubmit={() => setResult(calculateResult(answers))} submitLabel="Show my results" accent="emerald" />
        {result && <div ref={resRef} className="mt-8 rounded-[22px] border border-emerald/20 bg-white/80 p-8 backdrop-blur-xl shadow-[0_28px_60px_-30px_rgba(26,96,53,0.35)]">

          <Eyebrow tone="green">Financial Health Check</Eyebrow>
          <h2 className="mt-2.5">{name.trim() ? `${name.trim()}, here is what your answers show.` : "Here is what your answers show."}</h2>
          <p className="mt-4 font-display text-[1.6rem] font-bold text-plum">{result.total} <span className="text-base font-normal text-muted-foreground">out of {result.totalMax}</span></p>
          <h3 className="mt-5">{result.level[1]}</h3><p className="my-3">{result.level[2]}</p>
          {result.flags.length > 0 && <div className="my-6 rounded-xl border border-red-200 bg-red-50 p-5"><h3>THE THING THAT CANNOT WAIT</h3><p className="mt-2 font-semibold">{result.flags[0].label}</p><p className="text-sm text-muted-foreground">{result.flags[0].pillar}</p><p className="mt-2">One first step: {result.flags[0].step}</p>{result.flags.length > 1 && <p className="mt-3 text-sm">Also flagged: {result.flags.slice(1, 3).map((flag) => flag.label).join("; ")}</p>}</div>}
          <div className="overflow-x-auto"><table className="mt-4 w-full border-collapse text-[0.9rem]"><thead><tr><th className="border-b border-line py-2.5 text-left">Area</th><th className="border-b border-line py-2.5 text-left">Score</th><th className="border-b border-line py-2.5 text-left">Status</th><th className="border-b border-line py-2.5 text-left">Progress</th></tr></thead><tbody>{result.pillars.map((pillar) => <tr key={pillar.name}><td className="border-b border-line py-2.5">{pillar.name}</td><td className="border-b border-line py-2.5">{pillar.score}/{pillar.max}</td><td className="border-b border-line py-2.5">{pillar.status}</td><td className="border-b border-line py-2.5">{"█".repeat(Math.round(pillar.pct * 10))}{"░".repeat(10 - Math.round(pillar.pct * 10))}</td></tr>)}</tbody></table></div>
          {result.allClear ? <div className="mt-8"><h3>YOU ARE DOING VERY WELL PLANNING YOUR FINANCES</h3><p className="mt-2">All six areas are holding at once, which is uncommon and reflects decisions you have made deliberately. From here the work is protection and time: keeping the systems you have built running, and reviewing them periodically. Incomes, dependants and goals change, and a plan set three years ago may no longer match the life you are living.</p>{result.allClearStep ? <p className="mt-4"><strong>One thing still worth doing:</strong> {result.allClearStep.question.step}</p> : result.sharpening.pct < 1 && <p className="mt-4">Your sharpening edge: {result.sharpening.name} — the area furthest from full marks. One deliberate look this quarter improves this.</p>}</div> : <div className="mt-8"><h3>{result.priorities.length === 1 ? "Your priority gap" : "Your priority gaps"}</h3>{result.priorities.map((priority) => { const variant = priority.pillar.status === "Gap" ? "Gap" : "Building"; const copy = PILLAR_COPY[priority.pillar.name][variant]; return <div key={priority.pillar.name} className="mt-5 border-l-2 border-emerald pl-4"><p className="font-mono text-xs font-bold uppercase tracking-widest text-emerald">Priority {priority.number}</p><h4 className="mt-1">{copy.heading}</h4><p className="mt-2">{copy.copy}</p><p className="mt-2"><strong>One first step:</strong> {priority.step}</p></div>; })}</div>}
          {result.bestPillar.pillar.pct >= 0.75 && <div className="mt-8 border-t border-line pt-6"><h3>ONE THING YOU ARE DOING WELL</h3><h4 className="mt-2">{PILLAR_COPY[result.bestPillar.pillar.name].Strength.heading}</h4><p className="mt-2">{PILLAR_COPY[result.bestPillar.pillar.name].Strength.copy}</p></div>}


          <ResultGate
            title="Your full breakdown is ready."
            description="Your six-area scores, the thing that cannot wait, and your three priorities with a first step for each, sent to your inbox so you can keep it."
            buttonLabel="Send my full report"
            buttonVariant="green"
            userName={name.trim() || undefined}
            assessmentData={{
              assessmentName: "Financial Health Check",
              assessmentDescription: "A comprehensive 18-question financial self-diagnostic across six areas of your financial life",
              resultsSummary: generateResultsSummaryHtml(result, name)
            }}
          />
          <hr className="my-6 border-line" /><h3>THE NEXT STEP</h3><p className="mt-2">A plan that fits your life, not a template with your name on it. This check can show you where the gaps are. Closing them takes a plan built around your income, your obligations and the season of life you are actually in. That is what Money Simplified does, module by module, using your own numbers rather than examples. If something on this page was uncomfortable to read, that is usually the area worth starting with.</p><div className="mt-3"><BrandAnchor variant="primary" href="https://moneysimplified.chonzzi.com/shop">SEE THE MONEY SIMPLIFIED COURSE →</BrandAnchor></div>
          <p className="mt-4 text-[0.85rem] text-muted-foreground">Next: <Link to="/assessments/personality" className="text-emerald">discover your Money Personality</Link> or <Link to="/assessments/risk-profile" className="text-emerald">find your Risk Profile</Link>.</p>
        </div>}
      </Container></Section>
    </>
  );
}

