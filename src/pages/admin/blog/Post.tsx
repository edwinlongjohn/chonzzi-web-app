import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, Pencil } from "lucide-react";
import { PageHeader, Panel, btnClass, btnPrimaryClass } from "@/components/admin/ui";
import { RichTextView } from "@/components/admin/RichTextEditor";
import { formatDate } from "@/lib/admin/csv";
import { useGetBlogByIdQuery } from "@/store/api/blogApi";

export function ViewPostPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const { data: postData, isLoading, error } = useGetBlogByIdQuery(postId!, {
    skip: !postId, // Skip if no postId
  });

  const post = postData?.data?.blog;

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-plum" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <>
        <PageHeader 
          eyebrow="Content" 
          title="Post not found" 
          description="This letter no longer exists or couldn't be loaded." 
        />
        <Link to="/chonzzi-admin/blog" className={`${btnClass} no-underline`}>
          <ArrowLeft size={14} /> Back to blog
        </Link>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow={`${post.category} · ${post.status}`}
        title={post.title}
        description={`updated ${formatDate(post.updated_at)}`}
        actions={
          <>
            <button onClick={() => navigate("/chonzzi-admin/blog")} className={btnClass}>
              <ArrowLeft size={14} /> Back
            </button>
            <Link
              to={`/chonzzi-admin/blog/${postId}/edit`}
              className={`${btnPrimaryClass} no-underline`}
            >
              <Pencil size={14} /> Edit post
            </Link>
          </>
        }
      />

      <Panel className="mx-auto max-w-3xl p-6 sm:p-9">
        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title}
            className="mb-6 h-56 w-full rounded-2xl object-cover"
          />
        )}
        <p className="mt-4 text-[1.02rem] italic text-muted-foreground">{post.excerpt}</p>
        <hr className="my-6 border-line" />
        <RichTextView html={post.content} />
      </Panel>
    </>
  );
}

export default ViewPostPage;