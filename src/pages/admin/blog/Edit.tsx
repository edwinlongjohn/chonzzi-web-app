import { useNavigate, useParams } from 'react-router-dom';
import { useGetBlogByIdQuery, useUpdateBlogMutation } from '@/store/api/blogApi';
import { PageHeader } from '@/components/admin/ui';
import { BlogForm, type BlogDraft } from '@/components/admin/BlogForm';
import { Loader2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { btnClass } from '@/components/admin/ui';

export function EditPostPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const { data: postData, isLoading } = useGetBlogByIdQuery(postId!);
  const [updateBlog, { isLoading: isSaving }] = useUpdateBlogMutation();

  const handleSave = async (draft: BlogDraft) => {
    if (!postId) return;
    try {
      await updateBlog({
        id: postId,
        data: {
          title: draft.title,
          excerpt: draft.excerpt,
          content: draft.body,
          category: draft.category,
          status: draft.status,
          image_url: draft.image_url || null,
          scheduled_publish_at: draft.status === 'scheduled' ? draft.scheduled_publish_at : null,
        },
      }).unwrap();

      toast.success('Post saved');
      navigate(`/chonzzi-admin/blog/${postId}`);
    } catch (error:any) {
      if (error && error.status === 422) {
        const validationErrors = (error.data as any)?.errors;
        const validationMessage = (error.data as any)?.message;
        if (validationErrors) {
          toast.error(`${validationMessage}`, { duration: 3000 });
          toast.error(`${validationErrors}`, { duration: 3000 });
        }
        return;
      }
      toast.error('Failed to save post');
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-plum" />
      </div>
    );
  }

  const post = postData?.data?.blog;

  if (!post) {
    return (
      <>
        <PageHeader eyebrow="Content" title="Post not found" description="This letter no longer exists." />
        <Link to="/admin/blog" className={`${btnClass} no-underline`}>
          <ArrowLeft size={14} /> Back to blog
        </Link>
      </>
    );
  }

  const initial: BlogDraft = {
    title: post.title,
    excerpt: post.excerpt,
    body: post.content,
    category: post.category,
    status: post.status,
    image_url: post.image_url,
    scheduled_publish_at: post.scheduled_publish_at,
  };

  return (
    <>
      <PageHeader eyebrow="Content" title="Edit post" description={post.title} />
      <BlogForm
        initial={initial}
        saving={isSaving}
        onSave={handleSave}
        onCancel={() => navigate(`/chonzzi-admin/blog`)}
      />
    </>
  );
}

export default EditPostPage;