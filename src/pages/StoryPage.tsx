import { Link } from "react-router-dom";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/site/Eyebrow";
import { BrandCard } from "@/components/site/Card";
import { EmailCapture } from "@/components/site/EmailCapture";
import { HeroBackground } from "@/components/site/HeroBackground";
import { useGetPublicCategoryStatsQuery } from "@/store/api/blogApi";
import { Loader2 } from "lucide-react";
import heroImages from "@/assets/stories-and-letters-bg.jpg";
import weeklyLetterCover from "@/assets/money-simplified.jpg";
import charactersCover from "@/assets/character-stories.jpeg";
import herStoriesCover from "@/assets/her-women-stories.jpg";
import type { Collection } from "@/types";

const collections: Collection[] = [
  {
    slug: "weekly-letter",
    label: "The Weekly Letter Archive",
    category: "letters",
    blurb: "Every past issue, oldest to newest. One honest look each week at how Nigerian life meets money.",
    tag: "Money Simplified Weekly Newsletter",
    tagTone: "green",
    cover: weeklyLetterCover,
    coverAlt: "Money Simplified Weekly Letter cover",
  },
  {
    slug: "character-stories",
    label: "Character Stories",
    category: "character_stories",
    blurb: "Follow Emeka, Blessing, Funmi & Tunde, Chidi, Damilola, and Yetunde, seven Nigerians making real money decisions, one day at a time.",
    tag: "Money Simplified Character Stories",
    tagTone: "green",
    cover: charactersCover,
    coverAlt: "Money Simplified Character Stories",
  },
  {
    slug: "her-stories",
    label: "Her Women's Stories",
    category: "women_stories",
    blurb: "Temi's women's stories on money, life, and all in between. Thirteen episodes and counting.",
    tag: "Life, Money, and Everything in Between",
    tagTone: "lilac",
    cover: herStoriesCover,
    coverAlt: "Her Women's Stories",
  },
];

export default function StoriesPage() {
  const { data: categoryStats, isLoading: statsLoading } = useGetPublicCategoryStatsQuery();

  const stats = categoryStats?.data?.stats;

  return (
    <>
      <HeroBackground image={heroImages} className="dark-surface py-14 text-[#EFEAE2]" imageOpacity={0.4}>
        <Container>
          <Eyebrow>Stories & letters</Eyebrow>
          <h1 className="mt-3 text-white">Life, Money, and Everything in Between.</h1>
          <p className="lead mt-3 text-[#CFC8BE]">
            Weekly serial stories, the character universe, Temi's episodes, and every past letter,
            growing every week.
          </p>
        </Container>
      </HeroBackground>

      <Section>
        <Container>
          <div className="grid gap-7 md:grid-cols-3">
            {collections.map((c) => {
              // Get count for this category
              const count = stats?.categories?.[c.category] || 0;
              
              return (
                <Link key={c.slug} to={`/stories/${c.slug}`} className="no-underline">
                  <BrandCard className="flex flex-col !p-0 overflow-hidden transition-transform hover:scale-[1.02]">
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={c.cover}
                        alt={c.coverAlt}
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                    <div className="p-7">
                      <Eyebrow tone={c.tagTone}>{c.tag}</Eyebrow>
                      <h3 className="mt-2">{c.label}</h3>
                      <p className="mt-2 flex-1 text-[0.85rem] text-muted-foreground">{c.blurb}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {statsLoading ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            `${count} stor${count === 1 ? 'y' : 'ies'}`
                          )}
                        </span>
                        <span className="inline-flex rounded-lg border-2 border-plum px-5 py-2.5 font-mono text-[0.82rem] font-bold text-plum no-underline transition-colors hover:bg-plum hover:text-white">
                          Browse collection →
                        </span>
                      </div>
                    </div>
                  </BrandCard>
                </Link>
              );
            })}
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
                nameField={true}
                successMessage="Welcome to the letters."
                source="stories-newsletter"
                type="newsletter"
              />
            </div>
          </BrandCard>
        </Container>
      </Section>
    </>
  );
}