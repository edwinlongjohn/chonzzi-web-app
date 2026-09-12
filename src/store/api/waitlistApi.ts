import { api } from './index';
import type {
  WaitlistEntry,
  JoinWaitlistData,
  UpdateWaitlistStatusData,
  UpdateWaitlistNotesData,
  WaitlistStats,
  WaitlistResponse,
  ApiResponse,
  WaitlistStatus,
} from '@/types';

export const waitlistApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Public: Join waitlist
    joinWaitlist: builder.mutation<ApiResponse<{ entry: WaitlistEntry }>, JoinWaitlistData>({
      query: (data) => ({
        url: '/waitlist/join',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Waitlist', 'WaitlistStats'],
    }),

    // Admin: Get all waitlist entries with filters & pagination
    getWaitlistEntries: builder.query<
      ApiResponse<WaitlistResponse>,
      { status?: WaitlistStatus | string; page?: number; limit?: number; search?: string }
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.status) searchParams.set('status', params.status);
        if (params.page) searchParams.set('page', params.page.toString());
        if (params.limit) searchParams.set('limit', params.limit.toString());
        if (params.search) searchParams.set('search', params.search);
        return `/waitlist?${searchParams.toString()}`;
      },
      providesTags: (result) =>
        result?.data?.data
          ? [
              ...result.data.data.map(({ id }) => ({ type: 'Waitlist' as const, id })),
              { type: 'Waitlist', id: 'LIST' },
            ]
          : [{ type: 'Waitlist', id: 'LIST' }],
    }),

    // Admin: Get waitlist statistics
    getWaitlistStats: builder.query<ApiResponse<WaitlistStats>, void>({
      query: () => '/waitlist/stats',
      providesTags: ['WaitlistStats'],
    }),

    // Admin: Get single waitlist entry
    getWaitlistEntry: builder.query<ApiResponse<{ entry: WaitlistEntry }>, string>({
      query: (id) => `/waitlist/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Waitlist', id }],
    }),

    // Admin: Update status with notes
    updateWaitlistStatus: builder.mutation<
      ApiResponse<{ entry: WaitlistEntry }>,
      { id: string; data: UpdateWaitlistStatusData }
    >({
      query: ({ id, data }) => ({
        url: `/waitlist/${id}/status`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Waitlist', id },
        { type: 'Waitlist', id: 'LIST' },
        'WaitlistStats',
      ],
    }),

    // Admin: Update notes only
    updateWaitlistNotes: builder.mutation<
      ApiResponse<{ entry: WaitlistEntry }>,
      { id: string; data: UpdateWaitlistNotesData }
    >({
      query: ({ id, data }) => ({
        url: `/waitlist/${id}/notes`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Waitlist', id },
        { type: 'Waitlist', id: 'LIST' },
      ],
    }),

    // Admin: Delete waitlist entry
    deleteWaitlistEntry: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/waitlist/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Waitlist', id },
        { type: 'Waitlist', id: 'LIST' },
        'WaitlistStats',
      ],
    }),
  }),
});

export const {
  useJoinWaitlistMutation,
  useGetWaitlistEntriesQuery,
  useGetWaitlistStatsQuery,
  useGetWaitlistEntryQuery,
  useUpdateWaitlistStatusMutation,
  useUpdateWaitlistNotesMutation,
  useDeleteWaitlistEntryMutation,
} = waitlistApi;

export default waitlistApi;