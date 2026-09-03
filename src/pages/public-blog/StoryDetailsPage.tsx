import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/site/Eyebrow";
import { HeroBackground } from "@/components/site/HeroBackground";
import { RichTextView } from "@/components/admin/RichTextEditor";
import { useGetPublicBlogByIdQuery } from "@/store/api/blogApi";
import { formatDate } from "@/lib/admin/csv";
import heroImages from "@/assets/stories-and-letters-bg.jpg";

export default function StoryDetailPage() {
  const { collection, slug } = useParams<{ collection: string; slug: string }>();

  // Use the public endpoint to fetch the blog by ID
  // Note: Since the public endpoint uses ID, we need to handle this differently
  // Option 1: If you have the ID from the list, pass it directly
  // Option 2: Modify the backend to support slug-based lookup
  
  // For now, we'll use the ID from the post (we'll need to pass it from the list)
  // If your backend supports slug-based lookup, you can modify this
  
  const { data, isLoading, error } = useGetPublicBlogByIdQuery(
    slug || "", // This should be the ID or slug
    { skip: !slug }
  );

  const post = data?.data?.blog;

  if (isLoading) {
    return (
      <Section>
        <Container className="flex h-64 items-center justify-center">
          <Loader2 className="animate-spin text-plum" />
        </Container>
      </Section>
    );
  }

  if (error || !post) {
    return (
      <Section>
        <Container className="text-center">
          <h1>Story not found.</h1>
          <p className="lead mt-3 text-muted-foreground">
            This story may have been moved or no longer exists.
          </p>
          <Link
            to={`/stories/${collection}`}
            className="mt-6 inline-flex items-center gap-2 rounded-lg border-2 border-plum px-5 py-2.5 font-mono text-[0.82rem] font-bold text-plum no-underline hover:bg-plum hover:text-white"
          >
            <ArrowLeft size={14} /> Back to collection
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
            to={`/stories/${collection}`}
            className="inline-flex items-center bg-gold px-4 py-2 rounded-md gap-2 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-[#CFC8BE] no-underline hover:text-white"
          >
            <ArrowLeft size={13} /> Back to collection
          </Link>
          </div>
          <Eyebrow className="mt-4">{post.category}</Eyebrow>
          <h1 className="mt-3 text-white">{post.title}</h1>
          <p className="lead mt-3 text-[#CFC8BE]">{post.excerpt}</p>
          <p className="mt-3 font-mono text-[0.8rem] text-[#B9B0C4]">
            {formatDate(post.published_at || post.created_at)}
          </p>
        </Container>
      </HeroBackground>

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            {post.image_url && (
              <img
                src={post.image_url}
                alt={post.title}
                className="mb-8 h-64 w-full rounded-2xl object-cover"
              />
            )}
            <div className="prose prose-lg max-w-none">
              <RichTextView html={post.content} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}