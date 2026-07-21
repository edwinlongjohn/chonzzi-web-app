// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { PageHeader } from "@/components/shared/PageHeader";

// export default function ToolsPage() {
//   const assessments = [
//     {
//       id: 'personality',
//       tag: 'Assessment 01',
//       title: 'Money Personality',
//       question: '"Why do I handle money this way?"',
//       desc: 'The saver, the avoider, the worrier, the spender — most of us carry more than one. Discover yours, and what it means for your next money decision.',
//       meta: ['2 min', '10 questions', 'Result by email'],
//       color: 'lilac',
//       btnText: 'Find my personality'
//     },
//     {
//       id: 'health-check',
//       tag: 'Assessment 02',
//       title: 'Financial Health Check',
//       question: '"Where do I stand right now?"',
//       desc: 'Eighteen honest questions across six areas of your financial life — clarity, safety net, debt, growth, future, and agency. See exactly where the gaps are.',
//       meta: ['3 min', '18 questions', 'Result by email'],
//       color: 'emerald',
//       btnText: 'Check my health'
//     },
//     {
//       id: 'risk-profile',
//       tag: 'Assessment 03',
//       title: 'Risk Profile',
//       question: '"How should I invest?"',
//       desc: 'Before your money takes any risk, know how much risk is actually yours to take — with a suggested investment split shaped by your age and temperament.',
//       meta: ['2 min', '12 questions', 'Result by email'],
//       color: 'gold',
//       btnText: 'Find my profile'
//     }
//   ];

//   return (
//     <div className="flex flex-col min-h-screen">
//       <PageHeader 
//         eyebrow="FREE · NO ACCOUNT NEEDED · MINUTES EACH"
//         title="Know your money."
//         description="Three assessments. Three different questions about you and your money. Take one, or take all three — each ends with your result and your next step."
//         className="text-center"
//       />
      
//       <section className="py-16 lg:py-20 px-6 bg-cream">
//         <div className="container max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//             {assessments.map((a) => (
//               <Card key={a.id} className="bg-white relative overflow-hidden shadow-sm">
//                 <div className={`absolute top-0 left-8 right-8 h-1 bg-${a.color}`}></div>
//                 <CardHeader>
//                   <p className="text-xs font-bold tracking-widest uppercase text-muted">{a.tag}</p>
//                   <CardTitle className="font-heading text-xl text-plum mt-1">{a.title}</CardTitle>
//                   <CardDescription className="font-heading text-lg text-plum/80 font-semibold italic">{a.question}</CardDescription>
//                 </CardHeader>
//                 <CardContent className="flex flex-col flex-1 gap-4">
//                   <p className="text-sm text-muted flex-1">{a.desc}</p>
//                   <div className="flex gap-3 text-[10px] font-bold tracking-widest uppercase text-muted">
//                     {a.meta.map((m, idx) => <span key={idx}>{m}</span>)}
//                   </div>
//                   <Link to={`/tools/${a.id}`} className="mt-auto">
//                     <Button className={`w-full ${a.color === 'lilac' ? 'bg-plum' : a.color === 'emerald' ? 'bg-emerald' : 'bg-gold text-plum-deep'} text-white hover:opacity-90`}>
//                       {a.btnText}
//                     </Button>
//                   </Link>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//           <p className="text-center text-sm text-muted max-w-4xl mx-auto">
//             Your answers stay on this page unless you choose to email yourself the results. Emailing your result adds you to the Money Simplified letter — you can leave any time.
//           </p>
//         </div>
//       </section>
//     </div>
//   );
// }


import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/site/Eyebrow";
import { AssessmentCard } from "@/components/site/AssessmentCard";



export default function ToolsPage() {
  return (
    <>
      <Section variant="plum">
        <Container>
          <div className="text-center">
            <Eyebrow center>Free · no account needed · minutes each</Eyebrow>
            <h1 className="mx-auto mt-4 max-w-[700px] text-white">Know your money.</h1>
            <p className="lead mx-auto mt-4 text-[#CFC8BE]">
              Three assessments. Three different questions about you and your money. Take one, or
              take all three — each ends with your result and your next step.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            <AssessmentCard
              tone="mp"
              tag="Assessment 01"
              title="Money Personality"
              question="Why do I handle money this way?"
              description="The saver, the avoider, the worrier, the spender — most of us carry more than one. Discover yours, and what it means for your next money decision."
              meta={["2 min", "10 questions", "Result by email"]}
              ctaLabel="Find my personality"
              to="/tools/personality"
            />
            <AssessmentCard
              tone="fhc"
              tag="Assessment 02"
              title="Financial Health Check"
              question="Where do I stand right now?"
              description="Eighteen honest questions across six areas of your financial life — clarity, safety net, debt, growth, future, and agency. See exactly where the gaps are."
              meta={["3 min", "18 questions", "Result by email"]}
              ctaLabel="Check my health"
              to="/tools/health-check"
            />
            <AssessmentCard
              tone="rp"
              tag="Assessment 03"
              title="Risk Profile"
              question="How should I invest?"
              description="Before your money takes any risk, know how much risk is actually yours to take — with a suggested investment split shaped by your age and temperament."
              meta={["2 min", "12 questions", "Result by email"]}
              ctaLabel="Find my profile"
              to="/tools/risk-profile"
            />
          </div>
          <p className="mt-8 text-center text-[0.85rem] text-muted-foreground">
            Your answers stay on this page unless you choose to email yourself the results. Emailing
            your result adds you to the Money Simplified letter — you can leave any time.
          </p>
        </Container>
      </Section>
    </>
  );
}
