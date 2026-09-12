import { api } from "./index";
import type {
  Subscriber,
  GetSubscribersParams,
  ApiResponse,
  UpdateSubscriberData,
  SubscribeData,
  UnsubscribeData,
  UpdateSubscriberStatusData,
  SubscribeResponse,
} from "@/types";

export const subscriptionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================
    // Public Endpoints
    // ============================================

    // Subscribe to newsletter (public)
    subscribe: builder.mutation<
      ApiResponse<{ subscriber: SubscribeResponse }>,
      SubscribeData
    >({
      query: (data) => ({
        url: "/subscribers/subscribe",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subscribers", "SubscriberStats"],
    }),

    // Unsubscribe from newsletter (public)
    unsubscribe: builder.mutation<ApiResponse<null>, UnsubscribeData>({
      query: (data) => ({
        url: "/subscribers/unsubscribe",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subscribers", "SubscriberStats"],
    }),

    // ============================================
    // Admin Endpoints - Subscriber Management
    // ============================================

    // Get all subscribers with filters & pagination
    getSubscribers: builder.query<
      ApiResponse<{
        data: Subscriber[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      }>,
      GetSubscribersParams
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.status) searchParams.set("status", params.status);
        if (params.search) searchParams.set("search", params.search);
        if (params.page) searchParams.set("page", params.page.toString());
        if (params.limit) searchParams.set("limit", params.limit.toString());
        return `/subscribers?${searchParams.toString()}`;
      },
      providesTags: (result) =>
        result?.data?.data
          ? [
              ...result.data.data.map(({ id }) => ({
                type: "Subscriber" as const,
                id,
              })),
              { type: "Subscriber", id: "LIST" },
            ]
          : [{ type: "Subscriber", id: "LIST" }],
    }),

    // Get single subscriber by ID
    getSubscriberById: builder.query<
      ApiResponse<{ subscriber: Subscriber }>,
      string
    >({
      query: (id) => `/subscribers/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Subscriber", id }],
    }),

    // Get subscriber statistics
    getSubscriberStats: builder.query<
      ApiResponse<{
        stats: {
          total: number;
          unsubscribed: number;
          subscribed:number;
        };
      }>,
      void
    >({
      query: () => "/subscribers/stats",
      providesTags: ["SubscriberStats"],
    }),

    // Update subscriber (admin)
    updateSubscriber: builder.mutation<
      ApiResponse<{ subscriber: Subscriber }>,
      { id: string; data: UpdateSubscriberData }
    >({
      query: ({ id, data }) => ({
        url: `/subscribers/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Subscriber", id },
        { type: "Subscriber", id: "LIST" },
        "SubscriberStats",
      ],
    }),

    // Update subscriber status (admin)
    updateSubscriberStatus: builder.mutation<
      ApiResponse<{ subscriber: Subscriber }>,
      { id: string; data: UpdateSubscriberStatusData }
    >({
      query: ({ id, data }) => ({
        url: `/subscribers/${id}/status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Subscriber", id },
        { type: "Subscriber", id: "LIST" },
        "SubscriberStats",
      ],
    }),

    // Delete subscriber (admin)
    deleteSubscriber: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/subscribers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Subscriber", id },
        { type: "Subscriber", id: "LIST" },
        "SubscriberStats",
      ],
    }),

    // Bulk update subscribers (admin)
    bulkUpdateSubscribers: builder.mutation<
      ApiResponse<{ updated: number }>,
      { ids: string[]; data: UpdateSubscriberData }
    >({
      query: ({ ids, data }) => ({
        url: "/subscribers/bulk",
        method: "PATCH",
        body: { ids, data },
      }),
      invalidatesTags: ["Subscribers", "SubscriberStats"],
    }),

    // Bulk delete subscribers (admin)
    bulkDeleteSubscribers: builder.mutation<
      ApiResponse<{ deleted: number }>,
      string[]
    >({
      query: (ids) => ({
        url: "/subscribers/bulk",
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: ["Subscribers", "SubscriberStats"],
    }),
  }),
});

// Export all hooks
export const {
  // Public hooks
  useSubscribeMutation,
  useUnsubscribeMutation,

  // Admin hooks
  useGetSubscribersQuery,
  useGetSubscriberByIdQuery,
  useGetSubscriberStatsQuery,
  useUpdateSubscriberMutation,
  useUpdateSubscriberStatusMutation,
  useDeleteSubscriberMutation,
  useBulkUpdateSubscribersMutation,
  useBulkDeleteSubscribersMutation,
} = subscriptionApi;

export default subscriptionApi;
