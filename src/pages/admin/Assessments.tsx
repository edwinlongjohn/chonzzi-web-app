// import { useMemo, useState, useEffect } from "react";
// import { PageHeader, Panel, StatCard, inputClass, btnClass } from "@/components/admin/ui";
// import { downloadCsv, formatDate, toCsv } from "@/lib/admin/csv";
// import { ClipboardList, Download, Search, X, BarChart3, Gauge, Sparkles } from "lucide-react";

// // Types
// type QuizType = "Money Personality" | "Financial Health Check" | "Risk Profile";
// const QUIZZES: QuizType[] = ["Money Personality", "Financial Health Check", "Risk Profile"];

// interface AssessmentResult {
//   id: string;
//   name: string;
//   email: string;
//   quiz: QuizType;
//   outcome: string;
//   score: string;
//   created_at: string;
//   answers: {
//     question: string;
//     answer: string;
//   }[];
// }

// // Mock data
// const mockAssessmentResults: AssessmentResult[] = [
//   {
//     id: "1",
//     name: "John Doe",
//     email: "john@example.com",
//     quiz: "Money Personality",
//     outcome: "The Saver",
//     score: "85%",
//     created_at: new Date().toISOString(),
//     answers: [
//       {
//         question: "What do you do with your salary?",
//         answer: "I save at least 30% immediately",
//       },
//       {
//         question: "How do you approach spending?",
//         answer: "I plan my spending monthly",
//       },
//     ],
//   },
//   {
//     id: "2",
//     name: "Jane Smith",
//     email: "jane@example.com",
//     quiz: "Financial Health Check",
//     outcome: "Healthy",
//     score: "92%",
//     created_at: new Date(Date.now() - 86400000).toISOString(),
//     answers: [
//       {
//         question: "Do you have an emergency fund?",
//         answer: "Yes, 6 months of expenses",
//       },
//       {
//         question: "Are you investing?",
//         answer: "Yes, diversified portfolio",
//       },
//     ],
//   },
//   {
//     id: "3",
//     name: "Bob Johnson",
//     email: "bob@example.com",
//     quiz: "Risk Profile",
//     outcome: "Moderate Risk Taker",
//     score: "65%",
//     created_at: new Date(Date.now() - 172800000).toISOString(),
//     answers: [
//       {
//         question: "How do you handle market volatility?",
//         answer: "I stay invested and wait",
//       },
//       {
//         question: "What's your investment horizon?",
//         answer: "5-10 years",
//       },
//     ],
//   },
// ];

// // Mock API functions
// const mockApi = {
//   listAssessments: async (): Promise<AssessmentResult[]> => {
//     return new Promise((resolve) => {
//       setTimeout(() => resolve([...mockAssessmentResults]), 500);
//     });
//   },
// };

// export function AssessmentsPage() {
//   const [data, setData] = useState<AssessmentResult[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [quiz, setQuiz] = useState<"all" | QuizType>("all");
//   const [detail, setDetail] = useState<AssessmentResult | null>(null);

//   // Load data
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         setIsLoading(true);
//         const results = await mockApi.listAssessments();
//         setData(results);
//       } catch (error) {
//         console.error("Failed to load assessments:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     loadData();
//   }, []);

//   const filtered = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     return data.filter(
//       (r) =>
//         (quiz === "all" || r.quiz === quiz) &&
//         (!q ||
//           r.name.toLowerCase().includes(q) ||
//           r.email.toLowerCase().includes(q) ||
//           r.outcome.toLowerCase().includes(q)),
//     );
//   }, [data, search, quiz]);

//   const exportCsv = () => {
//     const csvData = filtered.map((item) => ({
//       name: item.name,
//       email: item.email,
//       quiz: item.quiz,
//       outcome: item.outcome,
//       score: item.score,
//       created_at: item.created_at,
//     }));

//     downloadCsv(
//       `assessments-${new Date().toISOString().slice(0, 10)}.csv`,
//       toCsv(csvData, ["name", "email", "quiz", "outcome", "score", "created_at"]),
//     );
//   };

//   const count = (name: QuizType) => data.filter((r) => r.quiz === name).length;

//   if (isLoading) {
//     return (
//       <div className="flex h-64 items-center justify-center">
//         <div className="animate-spin text-plum">
//           <Loader2 size={32} />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <PageHeader
//         eyebrow="Insights"
//         title="Assessment results"
//         description="Every completed quiz, with the full question by question answer sheet."
//         actions={
//           <button onClick={exportCsv} className={btnClass}>
//             <Download size={14} /> Export CSV
//           </button>
//         }
//       />

//       <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//         <StatCard
//           label="Total completions"
//           value={data.length}
//           hint="Across all three quizzes"
//           icon={<ClipboardList size={17} />}
//         />
//         <StatCard
//           label="Money Personality"
//           value={count("Money Personality")}
//           icon={<Sparkles size={17} />}
//           tone="gold"
//         />
//         <StatCard
//           label="Health Check"
//           value={count("Financial Health Check")}
//           icon={<BarChart3 size={17} />}
//           tone="emerald"
//         />
//         <StatCard label="Risk Profile" value={count("Risk Profile")} icon={<Gauge size={17} />} />
//       </div>

//       <div className="mb-4 mt-6 flex flex-wrap items-center gap-3">
//         <div className="relative min-w-[220px] flex-1">
//           <Search
//             size={15}
//             className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
//           />
//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search by name, email or result"
//             className={`${inputClass} w-full pl-10`}
//           />
//         </div>
//         <select
//           value={quiz}
//           onChange={(e) => setQuiz(e.target.value as typeof quiz)}
//           className={inputClass}
//         >
//           <option value="all">All quizzes</option>
//           {QUIZZES.map((q) => (
//             <option key={q} value={q}>
//               {q}
//             </option>
//           ))}
//         </select>
//         <span className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted-foreground">
//           {filtered.length} result{filtered.length === 1 ? "" : "s"}
//         </span>
//       </div>

//       <Panel>
//         {filtered.length === 0 ? (
//           <p className="px-6 py-14 text-center text-[0.9rem] text-muted-foreground">
//             Nothing matches these filters yet.
//           </p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full min-w-[720px] border-collapse text-left">
//               <thead>
//                 <tr className="border-b border-line bg-[color:var(--tint)]">
//                   {["Name", "Quiz", "Result", "Score", "Taken", ""].map((h) => (
//                     <th
//                       key={h}
//                       className="px-5 py-3 font-mono text-[0.66rem] font-bold uppercase tracking-[0.1em] text-muted-foreground"
//                     >
//                       {h}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {filtered.map((r) => (
//                   <tr
//                     key={r.id}
//                     onClick={() => setDetail(r)}
//                     className="cursor-pointer border-b border-line/70 transition hover:bg-[color:var(--tint)]"
//                   >
//                     <td className="px-5 py-3.5">
//                       <p className="m-0 text-[0.9rem] font-semibold text-plum">{r.name}</p>
//                       <p className="m-0 text-[0.8rem] text-muted-foreground">{r.email}</p>
//                     </td>
//                     <td className="px-5 py-3.5 text-[0.85rem] text-muted-foreground">{r.quiz}</td>
//                     <td className="px-5 py-3.5 text-[0.88rem] text-plum">{r.outcome}</td>
//                     <td className="px-5 py-3.5 font-mono text-[0.8rem] text-emerald">{r.score}</td>
//                     <td className="px-5 py-3.5 font-mono text-[0.75rem] text-muted-foreground">
//                       {formatDate(r.created_at)}
//                     </td>
//                     <td className="px-5 py-3.5 text-right">
//                       <span className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.08em] text-emerald">
//                         View
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </Panel>

//       {detail && <ResultDrawer result={detail} onClose={() => setDetail(null)} />}
//     </>
//   );
// }

// function ResultDrawer({ result, onClose }: { result: AssessmentResult; onClose: () => void }) {
//   return (
//     <div className="fixed inset-0 z-50 flex justify-end">
//       <div className="absolute inset-0 bg-plum-deep/50 backdrop-blur-sm" onClick={onClose} />
//       <div className="relative h-full w-full max-w-md overflow-y-auto bg-white p-7 shadow-2xl">
//         <button
//           onClick={onClose}
//           aria-label="Close"
//           className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-[color:var(--tint)]"
//         >
//           <X size={16} />
//         </button>
//         <p className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">
//           {result.quiz}
//         </p>
//         <h2 className="mt-2 text-[1.4rem]">{result.name}</h2>
//         <p className="mt-1 text-[0.86rem] text-muted-foreground">{result.email}</p>

//         <div className="mt-5 rounded-xl bg-[color:var(--tint)] p-4">
//           <p className="m-0 font-mono text-[0.66rem] font-bold uppercase tracking-[0.1em] text-muted-foreground">
//             Result
//           </p>
//           <p className="mt-1.5 text-[1rem] font-semibold text-plum">{result.outcome}</p>
//           <p className="mt-1 font-mono text-[0.8rem] text-emerald">{result.score}</p>
//           <p className="mt-1 font-mono text-[0.72rem] text-muted-foreground">
//             Taken {formatDate(result.created_at)}
//           </p>
//         </div>

//         <p className="mt-6 font-mono text-[0.66rem] font-bold uppercase tracking-[0.12em] text-plum">
//           Answer sheet
//         </p>
//         <ol className="mt-3 space-y-3">
//           {result.answers.map((a, i) => (
//             <li key={i} className="rounded-xl border border-line p-4">
//               <p className="m-0 text-[0.7rem] font-mono uppercase tracking-[0.1em] text-muted-foreground">
//                 Question {i + 1}
//               </p>
//               <p className="mt-1 text-[0.9rem] text-plum">{a.question}</p>
//               <p className="mt-2 inline-flex rounded-full bg-emerald/10 px-3 py-1 text-[0.78rem] font-semibold text-emerald">
//                 {a.answer}
//               </p>
//             </li>
//           ))}
//         </ol>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { PageHeader, Panel, StatCard, inputClass, btnClass } from "@/components/admin/ui";
import { downloadCsv, formatDate, toCsv } from "@/lib/admin/csv";
import {
  ClipboardList,
  Download,
  Search,
  X,
  BarChart3,
  Gauge,
  Sparkles,
  Loader2,
} from "lucide-react";
import { useGetAssessmentsQuery } from "@/store/api/emailApi";
import type { AssessmentResult, QuizType } from "@/types";

const QUIZZES: QuizType[] = [
  "Money Personality",
  "Financial Health Check",
  "Risk Profile",
];
const PAGE_SIZE = 10;

export function AssessmentsPage() {
  const [search, setSearch] = useState("");
  const [quiz, setQuiz] = useState<"all" | QuizType>("all");
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState<AssessmentResult | null>(null);

  const { data, isLoading, error } = useGetAssessmentsQuery({
    quiz_type: quiz === "all" ? undefined : quiz,
    search: search || undefined,
    page,
    limit: PAGE_SIZE,
  });

  const assessments = data?.data?.data || [];
  const total = data?.data?.total || 0;
  const totalPages = data?.data?.totalPages || 1;

  // Count by quiz type (only from the current page as fallback)
  // If you want global counts, add a separate stats endpoint
  const countByQuiz = assessments.reduce<Record<string, number>>((acc, a) => {
    acc[a.quiz_type] = (acc[a.quiz_type] || 0) + 1;
    return acc;
  }, {});

  const exportCsv = () => {
    const csvData = assessments.map((item) => ({
      name: item.user_name,
      email: item.user_email,
      quiz: item.quiz_type,
      created_at: item.created_at,
    }));

    downloadCsv(
      `assessments-${new Date().toISOString().slice(0, 10)}.csv`,
      toCsv(csvData, ["name", "email", "quiz", "created_at"])
    );
  };

  if (isLoading && page === 1) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-plum" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-destructive">
          Failed to load assessments. Please refresh.
        </p>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Assessment results"
        description="Every completed quiz, with the full question by question answer sheet."
        actions={
          <button onClick={exportCsv} className={btnClass}>
            <Download size={14} /> Export CSV
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total completions"
          value={total}
          hint="Across all three quizzes"
          icon={<ClipboardList size={17} />}
        />
        <StatCard
          label="Money Personality"
          value={countByQuiz["Money Personality"] || 0}
          icon={<Sparkles size={17} />}
          tone="gold"
        />
        <StatCard
          label="Health Check"
          value={countByQuiz["Financial Health Check"] || 0}
          icon={<BarChart3 size={17} />}
          tone="emerald"
        />
        <StatCard
          label="Risk Profile"
          value={countByQuiz["Risk Profile"] || 0}
          icon={<Gauge size={17} />}
        />
      </div>

      <div className="mb-4 mt-6 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search
            size={15}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name or email"
            className={`${inputClass} w-full pl-10`}
          />
        </div>
        <select
          value={quiz}
          onChange={(e) => {
            setQuiz(e.target.value as "all" | QuizType);
            setPage(1);
          }}
          className={inputClass}
        >
          <option value="all">All quizzes</option>
          {QUIZZES.map((q) => (
            <option key={q} value={q}>
              {q}
            </option>
          ))}
        </select>
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted-foreground">
          {total} result{total === 1 ? "" : "s"}
        </span>
      </div>

      <Panel>
        {assessments.length === 0 ? (
          <p className="px-6 py-14 text-center text-[0.9rem] text-muted-foreground">
            Nothing matches these filters yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line bg-[color:var(--tint)]">
                  {["Name", "Email", "Quiz", "Taken"].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 font-mono text-[0.66rem] font-bold uppercase tracking-[0.1em] text-muted-foreground"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {assessments.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => setDetail(r)}
                    className="cursor-pointer border-b border-line/70 transition hover:bg-[color:var(--tint)]"
                  >
                    <td className="px-5 py-3.5 text-[0.9rem] font-semibold text-plum">
                      {r.user_name}
                    </td>
                    <td className="px-5 py-3.5 text-[0.85rem] text-muted-foreground">
                      {r.user_email}
                    </td>
                    <td className="px-5 py-3.5 text-[0.85rem] text-muted-foreground">
                      {r.quiz_type}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-[0.75rem] text-muted-foreground">
                      {formatDate(r.created_at)}
                    </td>
                    {/* <td className="px-5 py-3.5 text-right">
                      <span className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.08em] text-emerald">
                        View
                      </span>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className={`${btnClass} disabled:opacity-40`}
            >
              Previous
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className={`${btnClass} disabled:opacity-40`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {detail && <ResultDrawer result={detail} onClose={() => setDetail(null)} />}
    </>
  );
}

function ResultDrawer({
  result,
  onClose,
}: {
  result: AssessmentResult;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-plum-deep/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative h-full w-full max-w-md overflow-y-auto bg-white p-7 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-[color:var(--tint)]"
        >
          <X size={16} />
        </button>
        <p className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {result.quiz_type}
        </p>
        <h2 className="mt-2 text-[1.4rem]">{result.user_name}</h2>
        <p className="mt-1 text-[0.86rem] text-muted-foreground">{result.user_email}</p>

        <div className="mt-5 rounded-xl bg-[color:var(--tint)] p-4">
          <p className="m-0 font-mono text-[0.66rem] font-bold uppercase tracking-[0.1em] text-muted-foreground">
            Taken
          </p>
          <p className="mt-1 font-mono text-[0.8rem] text-plum">
            {formatDate(result.created_at)}
          </p>
        </div>

        <p className="mt-6 font-mono text-[0.66rem] font-bold uppercase tracking-[0.12em] text-plum">
          Answer sheet
        </p>
        <ol className="mt-3 space-y-3">
          {result.answers?.map((a, i) => (
            <li key={i} className="rounded-xl border border-line p-4">
              <p className="m-0 text-[0.7rem] font-mono uppercase tracking-[0.1em] text-muted-foreground">
                Question {i + 1}
              </p>
              <p className="mt-1 text-[0.9rem] text-plum">{a.question}</p>
              <p className="mt-2 inline-flex rounded-full bg-emerald/10 px-3 py-1 text-[0.78rem] font-semibold text-emerald">
                {a.answer}
              </p>
            </li>
          ))}
          {(!result.answers || result.answers.length === 0) && (
            <li className="rounded-xl border border-line p-4 text-[0.85rem] text-muted-foreground">
              No answers recorded.
            </li>
          )}
        </ol>
      </div>
    </div>
  );
}

export default AssessmentsPage;