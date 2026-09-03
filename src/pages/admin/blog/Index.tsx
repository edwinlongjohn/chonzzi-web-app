
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useGetBlogsQuery,
  useDeleteBlogMutation,
  useGetBlogStatsQuery,
} from '@/store/api/blogApi';
import type { BlogStatus } from '@/types';
import { PageHeader, Panel, inputClass, btnClass, btnPrimaryClass } from '@/components/admin/ui';
import { formatDate } from '@/lib/admin/csv';
import { cn } from '@/lib/utils';
import { Eye, Loader2, Pencil, Plus, Search, Trash2,  } from 'lucide-react';
import { toast } from 'sonner';

const statusTone: Record<BlogStatus, string> = {
  draft: 'bg-muted text-muted-foreground',
  scheduled: 'bg-gold/15 text-gold',
  published: 'bg-emerald/12 text-emerald',
};

const STATUSES: BlogStatus[] = ['draft', 'scheduled', 'published'];

export function BlogPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'all' | BlogStatus>('all');
  const [page, setPage] = useState(1);
  const limit = 9;

  // Fetch blogs with filters
  const { data, isLoading, isFetching } = useGetBlogsQuery({
    status: status === 'all' ? undefined : status,
    search: search || undefined,
    page,
    limit,
  });

  // Fetch stats
  const { data: statsData } = useGetBlogStatsQuery();
  
  // Delete mutation
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

  // Publish scheduled mutation
  // const [publishScheduled, { isLoading: isPublishing }] = usePublishScheduledMutation();

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      await deleteBlog(id).unwrap();
      toast.success('Post deleted');
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
      toast.error('Failed to delete post');
    }
  };

  // const handlePublishScheduled = async () => {
  //   try {
  //     const result = await publishScheduled().unwrap();
  //     toast.success(`${result.data.published_count} posts published`);
  //   } catch (error) {
  //     toast.error('Failed to publish scheduled posts');
  //   }
  // };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as typeof status);
    setPage(1);
  };

  const posts = data?.data?.data || [];
  const totalPages = data?.data?.totalPages || 1;
  const stats = statsData?.data?.stats;
  const total = stats?.total || 0;
  return (
    <>
      <PageHeader
        eyebrow="Content"
        title="Blog"
        description="Write, edit and schedule the letters that go out on the site."
        actions={
          <div className="flex gap-2">
            {/* <button onClick={handlePublishScheduled} disabled={isPublishing} className={btnClass}>
              <Calendar size={14} />
              {isPublishing ? 'Publishing...' : 'Publish Scheduled'}
            </button> */}
            <button onClick={() => navigate('/chonzzi-admin/blog/new')} className={btnPrimaryClass}>
              <Plus size={14} /> New post
            </button>
          </div>
        }
      />

      {/* Stats Cards */}
      {stats && (
        <div className="mb-5 grid gap-4 sm:grid-cols-3">
          <Panel className="p-4">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </Panel>
          <Panel className="p-4">
            <p className="text-sm text-muted-foreground">Published</p>
            <p className="text-2xl font-bold text-emerald">{stats.published}</p>
          </Panel>
          <Panel className="p-4">
            <p className="text-sm text-muted-foreground">Draft</p>
            <p className="text-2xl font-bold text-muted-foreground">{stats.draft}</p>
          </Panel>
          {/* <Panel className="p-4">
            <p className="text-sm text-muted-foreground">Scheduled</p>
            <p className="text-2xl font-bold text-gold">{stats.scheduled}</p>
          </Panel> */}
        </div>
      )}

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search
            size={15}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={search}
            onChange={handleSearch}
            placeholder="Search posts"
            className={`${inputClass} w-full pl-10`}
          />
        </div>
        <select
          value={status}
          onChange={handleStatusChange}
          className={inputClass}
        >
          <option value="all">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted-foreground">
          {total} post{total !== 1 ? 's' : ''}
          {isFetching && ' (loading...)'}
        </span>
      </div>

      {/* Blog Grid */}
      {isLoading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader2 className="animate-spin text-plum" />
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((p) => (
              <Panel key={p.id} className="flex flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      'inline-flex rounded-full px-2.5 py-1 font-mono text-[0.65rem] font-bold uppercase tracking-[0.08em]',
                      statusTone[p.status],
                    )}
                  >
                    {p.status}
                  </span>
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.08em] text-muted-foreground">
                    {p.category}
                  </span>
                </div>
                <h3 className="mt-3 text-[1.05rem] leading-snug">{p.title}</h3>
                <p className="mt-2 line-clamp-3 text-[0.86rem] text-muted-foreground">{p.excerpt}</p>
                <p className="mt-3 font-mono text-[0.7rem] text-muted-foreground">
                  updated {formatDate(p.updated_at)}
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => navigate(`/chonzzi-admin/blog/${p.id}`)}
                    className={`${btnClass} flex-1 justify-center no-underline`}
                  >
                    <Eye size={13} /> View
                  </button>
                  <button
                    onClick={() => navigate(`/chonzzi-admin/blog/${p.id}/edit`)}
                    className={`${btnClass} flex-1 justify-center no-underline`}
                  >
                    <Pencil size={13} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id, p.title)}
                    disabled={isDeleting}
                    aria-label="Delete post"
                    className="rounded-xl border border-line p-2.5 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </Panel>
            ))}
            {posts.length === 0 && (
              <p className="col-span-full px-6 py-14 text-center text-[0.9rem] text-muted-foreground">
                No posts match these filters.
              </p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between gap-3">
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
        </>
      )}
    </>
  );
}

export default BlogPage;