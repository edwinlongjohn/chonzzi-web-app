// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { PageHeader } from "@/components/shared/PageHeader";

// export default function StoriesPage() {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <PageHeader 
//         eyebrow="STORIES & LETTERS"
//         title="Where the library lives."
//         description="Weekly serial stories, the character universe, Temi's episodes, and every past letter — growing every week."
//       />
      
//       <section className="py-20 lg:py-28 px-6 bg-cream">
//         <div className="container max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            
//             {/* Collection Card 1 */}
//             <Card className="flex flex-col overflow-hidden border-line shadow-sm hover:shadow-md transition-shadow bg-white">
//               <div className="h-48 bg-gradient-to-br from-plum to-emerald-soft flex flex-col items-center justify-center text-white/80 font-sans text-xs font-bold tracking-[0.2em] uppercase text-center p-4">
//                 <span className="relative z-10">Collection Cover<br />Weekly Letter</span>
//               </div>
//               <CardHeader>
//                 <div className="text-emerald text-[10px] font-bold tracking-[0.15em] uppercase flex items-center gap-2 mb-1">
//                   <span className="w-4 h-0.5 bg-emerald inline-block"/> Money Simplified
//                 </div>
//                 <CardTitle className="font-heading text-xl text-plum">The Weekly Letter — archive</CardTitle>
//               </CardHeader>
//               <CardContent className="flex flex-col flex-1 gap-4 pb-8">
//                 <p className="text-sm text-muted flex-1 leading-relaxed">
//                   Every past issue, oldest to newest. One honest look each week at how Nigerian life meets money — and one move to make.
//                 </p>
//                 <Button variant="outline" className="border-plum text-plum hover:bg-plum/5 w-full mt-2" onClick={(e) => { e.preventDefault(); alert('Prototype link'); }}>
//                   Browse the archive →
//                 </Button>
//               </CardContent>
//             </Card>

//             {/* Collection Card 2 */}
//             <Card className="flex flex-col overflow-hidden border-line shadow-sm hover:shadow-md transition-shadow bg-white">
//               <div className="h-48 bg-gradient-to-br from-plum to-emerald-soft flex flex-col items-center justify-center text-white/80 font-sans text-xs font-bold tracking-[0.2em] uppercase text-center p-4">
//                 <span className="relative z-10">Collection Cover<br />Character Stories</span>
//               </div>
//               <CardHeader>
//                 <div className="text-emerald text-[10px] font-bold tracking-[0.15em] uppercase flex items-center gap-2 mb-1">
//                   <span className="w-4 h-0.5 bg-emerald inline-block"/> Money Simplified
//                 </div>
//                 <CardTitle className="font-heading text-xl text-plum">Character stories</CardTitle>
//               </CardHeader>
//               <CardContent className="flex flex-col flex-1 gap-4 pb-8">
//                 <p className="text-sm text-muted flex-1 leading-relaxed">
//                   Follow Emeka, Blessing, Funmi &amp; Tunde, Chidi, Damilola, and Yetunde — six Nigerians making real money decisions, one week at a time.
//                 </p>
//                 <Button variant="outline" className="border-plum text-plum hover:bg-plum/5 w-full mt-2" onClick={(e) => { e.preventDefault(); alert('Prototype link'); }}>
//                   Meet the characters →
//                 </Button>
//               </CardContent>
//             </Card>

//             {/* Collection Card 3 */}
//             <Card className="flex flex-col overflow-hidden border-line shadow-sm hover:shadow-md transition-shadow bg-white">
//               <div className="h-48 bg-gradient-to-br from-plum to-emerald-soft flex flex-col items-center justify-center text-white/80 font-sans text-xs font-bold tracking-[0.2em] uppercase text-center p-4">
//                 <span className="relative z-10">Collection Cover<br />Temi's Episodes</span>
//               </div>
//               <CardHeader>
//                 <div className="text-lilac text-[10px] font-bold tracking-[0.15em] uppercase flex items-center gap-2 mb-1">
//                   <span className="w-4 h-0.5 bg-lilac inline-block"/> Financial Literacy with Temi
//                 </div>
//                 <CardTitle className="font-heading text-xl text-plum">Temi's stories — 13 episodes</CardTitle>
//               </CardHeader>
//               <CardContent className="flex flex-col flex-1 gap-4 pb-8">
//                 <p className="text-sm text-muted flex-1 leading-relaxed">
//                   Her women's stories: money, life, and all in between. Thirteen episodes and counting.
//                 </p>
//                 <Button variant="outline" className="border-plum text-plum hover:bg-plum/5 w-full mt-2" onClick={(e) => { e.preventDefault(); alert('Prototype link'); }}>
//                   Start with episode one →
//                 </Button>
//               </CardContent>
//             </Card>

//           </div>

//           {/* Newsletter Signup - Tinted Card */}
//           <Card className="bg-card border-none p-8 shadow-sm mt-8">
//             <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//               <div>
//                 <h3 className="font-heading text-2xl font-semibold text-plum">Never miss a letter.</h3>
//                 <p className="text-muted mt-2">One email a week from Money Simplified. One a month from Temi. Both free, both worth opening.</p>
//               </div>
//               <div className="flex flex-col gap-3">
//                 <div className="flex flex-wrap gap-3">
//                   <Input type="email" placeholder="Your email" className="flex-1 min-w-[180px] bg-white border-line" />
//                   <Button className="bg-emerald text-white hover:bg-emerald-soft">Subscribe free</Button>
//                 </div>
//                 <p className="text-sm text-muted italic" id="st-msg">(Prototype: connects to Kit in the live build).</p>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </section>
//     </div>
//   );
// }


import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/site/Eyebrow";
import { BrandCard } from "@/components/site/Card";
import { ImageBox } from "@/components/site/ImageBox";
import { EmailCapture } from "@/components/site/EmailCapture";



const collections = [
  {
    tag: "Money Simplified",
    tagTone: "green" as const,
    title: "The Weekly Letter — archive",
    body: "Every past issue, oldest to newest. One honest look each week at how Nigerian life meets money — and one move to make.",
    cover: "Collection cover\nWeekly Letter",
    cta: "Browse the archive →",
  },
  {
    tag: "Money Simplified",
    tagTone: "green" as const,
    title: "Character stories",
    body: "Follow Emeka, Blessing, Funmi & Tunde, Chidi, Damilola, and Yetunde — six Nigerians making real money decisions, one week at a time.",
    cover: "Collection cover\nCharacter Stories",
    cta: "Meet the characters →",
  },
  {
    tag: "Financial Literacy With Temi",
    tagTone: "lilac" as const,
    title: "Temi's stories — 13 episodes",
    body: "Her women's stories: money, life, and all in between. Thirteen episodes and counting.",
    cover: "Collection cover\nTemi's Episodes",
    cta: "Start with episode one →",
  },
];

export default function StoriesPage() {
  return (
    <>
      <Section variant="dark" tight>
        <Container>
          <Eyebrow>Stories & letters</Eyebrow>
          <h1 className="mt-3 text-white">Where the library lives.</h1>
          <p className="lead mt-3 text-[#CFC8BE]">
            Weekly serial stories, the character universe, Temi's episodes, and every past letter —
            growing every week.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-7 md:grid-cols-3">
            {collections.map((c) => (
              <BrandCard key={c.title} className="flex flex-col !p-0 overflow-hidden">
                <ImageBox label={c.cover} ratio="wide" className="rounded-none" />
                <div className="p-7">
                  <Eyebrow tone={c.tagTone}>{c.tag}</Eyebrow>
                  <h3 className="mt-2">{c.title}</h3>
                  <p className="mt-2 flex-1 text-[0.85rem] text-muted-foreground">{c.body}</p>
                  <p className="mt-4">
                    <a
                      href="#"
                      className="inline-flex rounded-lg border-2 border-plum px-5 py-2.5 font-mono text-[0.82rem] font-bold text-plum no-underline"
                    >
                      {c.cta}
                    </a>
                  </p>
                </div>
              </BrandCard>
            ))}
          </div>

          <BrandCard variant="tint" className="mt-9">
            <div className="grid items-center gap-6 md:grid-cols-2">
              <div>
                <h3>Never miss a letter.</h3>
                <p className="mt-2 text-[0.9rem] text-muted-foreground">
                  One email a week from Money Simplified. One a month from Temi. Both free, both
                  worth opening.
                </p>
              </div>
              <EmailCapture
                buttonLabel="Subscribe free"
                buttonVariant="green"
                successMessage="Welcome to the letters."
              />
            </div>
          </BrandCard>
        </Container>
      </Section>
    </>
  );
}
