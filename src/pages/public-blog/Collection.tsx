import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/site/Eyebrow";
import { BrandCard } from "@/components/site/Card";
import { HeroBackground } from "@/components/site/HeroBackground";
import { useGetPublicBlogsQuery } from "@/store/api/blogApi";
import { formatDate } from "@/lib/admin/csv";
import heroImages from "@/assets/stories-and-letters-bg.jpg";
import type { Collection } from "@/types";

// Collection metadata
const collections: Collection[] = [
    {
        slug: "weekly-letter",
        label: "The Weekly Letter Archive",
        category: "letters",
        blurb: "Every past issue, oldest to newest. One honest look each week at how Nigerian life meets money.",
        tag: "Money Simplified Weekly Newsletter",
        tagTone: "green",
        cover: "",
        coverAlt: "",
    },
    {
        slug: "character-stories",
        label: "Character Stories",
        category: "character_stories",
        blurb: "Follow Emeka, Blessing, Funmi & Tunde, Chidi, Damilola, and Yetunde, seven Nigerians making real money decisions, one day at a time.",
        tag: "Money Simplified Character Stories",
        tagTone: "green",
        cover: "",
        coverAlt: "",
    },
    {
        slug: "her-stories",
        label: "Her Women's Stories",
        category: "women_stories",
        blurb: "Temi's women's stories on money, life, and all in between. Thirteen episodes and counting.",
        tag: "Life, Money, and Everything in Between",
        tagTone: "lilac",
        cover: "",
        coverAlt: "",
    },
];

export default function CollectionPage() {
    const { collection: collectionSlug } = useParams<{ collection: string }>();

    // Find the collection metadata
    const meta = collections.find((c) => c.slug === collectionSlug);

    // Fetch published blogs for this category using public endpoint
    const { data, isLoading, error } = useGetPublicBlogsQuery(
        {
            category: meta?.category || "",
            page: 1,
            limit: 50,
        },
        { skip: !meta }
    );

    const posts = data?.data?.data || [];

    // If collection not found
    if (!meta) {
        return (
            <Section>
                <Container className="text-center">
                    <h1>Collection not found.</h1>
                    <p className=" mt-3 text-muted-foreground">
                        That shelf of stories does not exist yet.
                    </p>
                    <Link
                        to="/stories"
                        className="mt-6 inline-flex items-center gap-2 rounded-lg border-2 border-plum px-5 py-2.5 font-mono text-[0.82rem] font-bold text-plum no-underline hover:bg-plum hover:text-white"
                    >
                        <ArrowLeft size={14} /> Back to stories & letters
                    </Link>
                </Container>
            </Section>
        );
    }

    return (
        <>
            <HeroBackground
                image={heroImages}
                className="dark-surface py-14 text-[#EFEAE2]"
                imageOpacity={0.4}
            >
                <Container>
                    <div>
                        <Link
                            to="/stories"
                            className=" inline-flex items-center rounded-md bg-gold px-4 py-2 gap-2 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-[#CFC8BE] no-underline hover:text-white"
                        >
                            <ArrowLeft size={13} /> Stories & letters
                        </Link>
                    </div>


                    <Eyebrow className="mt-4">{meta.tag}</Eyebrow>
                    <h1 className="mt-3 text-white">{meta.label}</h1>
                    <p className=" mt-3 text-[#CFC8BE]">{meta.blurb}</p>
                </Container>
            </HeroBackground>

            <Section>
                <Container>
                    {isLoading ? (
                        <div className="flex h-64 items-center justify-center">
                            <Loader2 className="animate-spin text-plum" />
                        </div>
                    ) : error ? (
                        <BrandCard variant="tint" className="text-center">
                            <h3>Error loading stories</h3>
                            <p className="mt-2 text-[0.9rem] text-muted-foreground">
                                Unable to load stories at this time. Please try again later.
                            </p>
                        </BrandCard>
                    ) : posts.length === 0 ? (
                        <BrandCard variant="tint" className="text-center">
                            <h3>No stories here yet.</h3>
                            <p className="mt-2 text-[0.9rem] text-muted-foreground">
                                The next {meta.label.toLowerCase()} is being written. Check back soon.
                            </p>
                        </BrandCard>
                    ) : (
                        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                            {posts.map((post) => (
                                <Link
                                    key={post.id}
                                    to={`/stories/${collectionSlug}/${post.id}`}
                                    className="no-underline"
                                >
                                    <BrandCard className="flex h-full flex-col transition-transform hover:scale-[1.02]">
                                        {post.image_url && (
                                            <img
                                                src={post.image_url}
                                                alt={post.title}
                                                className="mb-5 h-44 w-full rounded-2xl object-cover"
                                            />
                                        )}
                                        <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground">
                                            {formatDate(post.published_at || post.created_at)}
                                        </p>
                                        <h3 className="mt-2">{post.title}</h3>
                                        <p className="mt-2 flex-1 text-[0.85rem] text-muted-foreground">
                                            {post.excerpt}
                                        </p>
                                        <span className="mt-4 inline-flex items-center gap-2 font-mono text-[0.82rem] font-bold text-plum">
                                            Read the story <ArrowRight size={14} />
                                        </span>
                                    </BrandCard>
                                </Link>
                            ))}
                        </div>
                    )}
                </Container>
            </Section>
        </>
    );
}