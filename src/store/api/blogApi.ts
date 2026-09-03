import { api } from './index';
import type {
  BlogPost,
  CreateBlogData,
  UpdateBlogData,
  GetBlogsParams,
  BlogsResponse,
  BlogStats,
  ApiResponse,
  PublishScheduledResponse,
  PublicBlogsParams,
  PublicBlogsResponse,
  CategoryStatsResponse,
} from '@/types';

export const blogApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ============ ADMIN ENDPOINTS ============
    
    // Get all blogs with filters & pagination (Admin)
    getBlogs: builder.query<ApiResponse<BlogsResponse>, GetBlogsParams>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.status) searchParams.set('status', params.status);
        if (params.category) searchParams.set('category', params.category);
        if (params.page) searchParams.set('page', params.page.toString());
        if (params.limit) searchParams.set('limit', params.limit.toString());
        if (params.search) searchParams.set('search', params.search);
        return `/blogs?${searchParams.toString()}`;
      },
      providesTags: (result) =>
        result?.data?.data
          ? [
              ...result.data.data.map(({ id }) => ({ type: 'Blog' as const, id })),
              { type: 'Blog', id: 'LIST' },
            ]
          : [{ type: 'Blog', id: 'LIST' }],
    }),

    // Get single blog (Admin)
    getBlogById: builder.query<ApiResponse<{ blog: BlogPost }>, string>({
      query: (id) => `/blogs/${id}`,
      providesTags: (result, error, id) => [{ type: 'Blog', id }],
    }),

    // Create a new blog (Admin)
    createBlog: builder.mutation<ApiResponse<{ blog: BlogPost }>, CreateBlogData>({
      query: (body) => ({
        url: '/blogs',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Blog', id: 'LIST' }, 'BlogStats', 'PublicBlogs'],
    }),

    // Update a blog (Admin)
    updateBlog: builder.mutation<
      ApiResponse<{ blog: BlogPost }>,
      { id: string; data: UpdateBlogData }
    >({
      query: ({ id, data }) => ({
        url: `/blogs/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Blog', id },
        { type: 'Blog', id: 'LIST' },
        'BlogStats',
        'PublicBlogs',
      ],
    }),

    // Delete a blog (Admin)
    deleteBlog: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Blog', id },
        { type: 'Blog', id: 'LIST' },
        'BlogStats',
        'PublicBlogs',
      ],
    }),

    // Get blog statistics (Admin)
    getBlogStats: builder.query<ApiResponse<BlogStats>, void>({
      query: () => '/blogs/stats',
      providesTags: ['BlogStats'],
    }),

    // Manually publish scheduled posts (Admin)
    publishScheduled: builder.mutation<
      ApiResponse<PublishScheduledResponse>,
      void
    >({
      query: () => ({
        url: '/blogs/publish-scheduled',
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Blog', id: 'LIST' }, 'BlogStats', 'PublicBlogs'],
    }),

    // ============ PUBLIC ENDPOINTS ============

    // Get all published blogs (Public)
    getPublicBlogs: builder.query<ApiResponse<PublicBlogsResponse>, PublicBlogsParams>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.category) searchParams.set('category', params.category);
        if (params.page) searchParams.set('page', params.page.toString());
        if (params.limit) searchParams.set('limit', params.limit.toString());
        if (params.search) searchParams.set('search', params.search);
        return `/blogs/public?${searchParams.toString()}`;
      },
      providesTags: (result) =>
        result?.data?.data
          ? [
              ...result.data.data.map(({ id }) => ({ type: 'PublicBlog' as const, id })),
              { type: 'PublicBlog', id: 'LIST' },
            ]
          : [{ type: 'PublicBlog', id: 'LIST' }],
    }),

    // Get single published blog by ID (Public)
    getPublicBlogById: builder.query<ApiResponse<{ blog: BlogPost }>, string>({
      query: (id) => `/blogs/public/${id}`,
      providesTags: (result, error, id) => [{ type: 'PublicBlog', id }],
    }),

    // Get category statistics (Public)
    getPublicCategoryStats: builder.query<ApiResponse<CategoryStatsResponse>, void>({
      query: () => '/blogs/public/categories/stats',
      providesTags: ['PublicCategoryStats'],
    }),
  }),
});

export const {
  // Admin hooks
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useGetBlogStatsQuery,
  usePublishScheduledMutation,
  // Public hooks
  useGetPublicBlogsQuery,
  useGetPublicBlogByIdQuery,
  useGetPublicCategoryStatsQuery,
} = blogApi;

export default blogApi;