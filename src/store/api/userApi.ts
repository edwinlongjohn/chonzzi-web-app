import { api } from './index';
import type{
  User,
  UserWithProfile,
  UserFilters,
  PaginationParams,
  PaginatedResponse,
  ApiResponse,
} from '@/types';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users (admin only)
    getUsers: builder.query<
      ApiResponse<PaginatedResponse<UserWithProfile>>,
      UserFilters & PaginationParams
    >({
      query: (params = {}) => ({
        url: '/users',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.data.map(({ id }) => ({ type: 'Users' as const, id: id })),
              { type: 'Users', id: 'LIST' },
            ]
          : [{ type: 'Users', id: 'LIST' }],
    }),

    // Get user by ID
    getUserById: builder.query<ApiResponse<{ user: UserWithProfile }>, string>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: 'Users', id }],
    }),

    // Update user (admin only)
    updateUser: builder.mutation<
      ApiResponse<{ user: UserWithProfile }>,
      { id: string; userData: Partial<User> }
    >({
      query: ({ id, userData }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Users', id },
        'Users',
      ],
    }),

    // Delete user (admin only)
    deleteUser: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Users', id },
        'Users',
      ],
    }),

    // Bulk update user status (admin only)
    bulkUpdateStatus: builder.mutation<
      ApiResponse<{ count: number }>,
      { userIds: string[]; isActive: boolean }
    >({
      query: (data) => ({
        url: '/users/bulk/status',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Users'],
    }),

    // Get user statistics (admin only)
    getUserStatistics: builder.query<
      ApiResponse<{
        totalUsers: number;
        activeUsers: number;
        inactiveUsers: number;
        adminUsers: number;
        newUsersToday: number;
        newUsersThisWeek: number;
      }>,
      void
    >({
      query: () => '/users/statistics',
      providesTags: ['Users'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useBulkUpdateStatusMutation,
  useGetUserStatisticsQuery,
} = userApi;

export default userApi;