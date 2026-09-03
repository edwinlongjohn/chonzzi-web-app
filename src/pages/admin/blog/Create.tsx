
import { useNavigate } from 'react-router-dom';
import { useCreateBlogMutation } from '@/store/api/blogApi';
import { PageHeader } from '@/components/admin/ui';
import { BlogForm, emptyDraft, type BlogDraft } from '@/components/admin/BlogForm';
import { toast } from 'sonner';
import { useAppSelector } from '@/store/hooks';

export function NewPostPage() {
  const navigate = useNavigate();
  const {user, isAuthenticated} = useAppSelector((state) => state.auth);
  const [createBlog, { isLoading }] = useCreateBlogMutation();

  const handleSave = async (draft: BlogDraft) => {
    if (!user?.id && !isAuthenticated) {
      toast.error('User not authenticated');
      return;
    }
 
    try {
      const result = await createBlog({
        title: draft.title,
        excerpt: draft.excerpt,
        content: draft.body,
        category: draft.category,
        status: draft.status,
        author_id: user?.id,
        image_url: draft.image_url || null,
        scheduled_publish_at: draft.status === 'scheduled' ? draft.scheduled_publish_at : null,
      }).unwrap();

      toast.success('Post created');
      navigate(`/chonzzi-admin/blog/${result.data.blog.id}`);
    } catch (error:any) {
      console.log('Error creating post:', error);
      if(error && error.status === 422) {
        const validationErrors = (error.data as any)?.errors;
        const validationMessage = (error.data as any)?.message;
        if (validationErrors) {
          toast.error(`${validationMessage}`, {duration: 3000});
          toast.error(`${validationErrors}`, {duration: 3000});
        }
        return;
      }
      toast.error('Failed to create post');
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Content"
        title="Write a letter"
        description="Compose the post, format it the way it should read, then save."
      />
      <BlogForm
        initial={emptyDraft}
        saving={isLoading}
        onSave={handleSave}
        onCancel={() => navigate('/chonzzi-admin/blog')}
      />
    </>
  );
}

export default NewPostPage;