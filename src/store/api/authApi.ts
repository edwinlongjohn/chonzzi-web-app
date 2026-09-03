import { api } from './index';
import { setCredentials, logout } from '../slices/authSlice';
import type{
  LoginCredentials,
  ChangePasswordData,
  AuthResponse,
  ApiResponse,
  UserWithProfile,
  UpdateProfileData,
} from '@/types';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({

    // Login user
    login: builder.mutation<ApiResponse<AuthResponse>, LoginCredentials>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { user, tokens } = data.data;
          dispatch(
            setCredentials({
              user,
              accessToken: tokens.accessToken,
            })
          );
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
      invalidatesTags: ['Auth'],
    }),

    // Refresh token
    refreshToken: builder.mutation<ApiResponse<AuthResponse>, { refreshToken: string }>({
      query: (refreshToken) => ({
        url: '/auth/refresh',
        method: 'POST',
        body: refreshToken,
      }),
    }),

    // Logout
    logout: builder.mutation<ApiResponse<null>, { refreshToken: string }>({
      query: (refreshToken) => ({
        url: '/auth/logout',
        method: 'POST',
        body: refreshToken,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (error) {
          console.error('Logout failed:', error);
          dispatch(logout()); // Force logout even if API fails
        }
      },
      invalidatesTags: ['Auth'],
    }),

    // Logout all devices
    logoutAll: builder.mutation<ApiResponse<null>, void>({
      query: () => ({
        url: '/auth/logout-all',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (error) {
          console.error('Logout all failed:', error);
        }
      },
      invalidatesTags: ['Auth'],
    }),

    // Change password
    changePassword: builder.mutation<ApiResponse<null>, ChangePasswordData>({
      query: (passwords) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: passwords,
      }),
      invalidatesTags: ['Auth'],
    }),

    // Forgot password
    forgotPassword: builder.mutation<ApiResponse<null>, { email: string }>({
      query: (email) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: { email },
      }),
    }),

    // Reset password
    resetPassword: builder.mutation<ApiResponse<null>, { token: string; newPassword: string }>({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
      }),
    }),

    // Get current user
    getCurrentUser: builder.query<ApiResponse<{ user: UserWithProfile }>, void>({
      query: () => '/auth/me',
      providesTags: ['Auth'],
    }),

    // Verify token
    verifyToken: builder.mutation<ApiResponse<{ valid: boolean }>, { token: string }>({
      query: (token) => ({
        url: '/auth/verify-token',
        method: 'POST',
        body: token,
      }),
    }),

    // Update profile
    updateProfile: builder.mutation<ApiResponse<{ user: UserWithProfile }>, UpdateProfileData>({
      query: (profileData) => ({
        url: '/users/profile',
        method: 'PUT',
        body: profileData,
      }),
      invalidatesTags: ['Profile', 'Users'],
    }),

    // Get profile
    getProfile: builder.query<ApiResponse<{ user: UserWithProfile }>, void>({
      query: () => '/users/profile',
      providesTags: ['Profile'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useLogoutAllMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetCurrentUserQuery,
  useVerifyTokenMutation,
  useUpdateProfileMutation,
  useGetProfileQuery,
} = authApi;

export default authApi;