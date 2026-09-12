import {
  useLoginMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
} from '../store/api/authApi';
import type {
  LoginCredentials,
  ApiResponse,
  AuthResponse,
} from '@/types';
import { useAppSelector } from '@/store/hooks';

const {isAuthenticated, isLoading, user} = useAppSelector((state) => state.auth);

interface UseAuthReturn {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  login: (credentials: LoginCredentials) => Promise<{
    success: boolean;
    data?: ApiResponse<AuthResponse>;
    error?: string;
  }>;
 
  logout: () => Promise<{ success: boolean; error?: string }>;
  refreshUser: () => Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }>;
}

export const useAuth = (): UseAuthReturn => {
  

  const [loginMutation, { isLoading: isLoggingIn }] = useLoginMutation();
  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation();
  const { refetch: refetchUser } = useGetCurrentUserQuery(undefined, {
    skip: !isAuthenticated,
  });

  const login = async (credentials: LoginCredentials) => {
    try {
      const result = await loginMutation(credentials).unwrap();
      return { success: true, data: result };
    } catch (error: any) {
      return {
        success: false,
        error: error.data?.message || 'Login failed',
      };
    }
  };

  
  const logout = async () => {
    try {
      // Get the refresh token from localStorage
      const auth = localStorage.getItem('auth');
      let refreshToken = '';
      
      if (auth) {
        const authData = JSON.parse(auth);
        refreshToken = authData.refreshToken || '';
      }
      
      // Call logout mutation with the refresh token
      if (refreshToken) {
        await logoutMutation({ refreshToken }).unwrap();
      } else {
        // If no refresh token, just clear local storage
        localStorage.removeItem('auth');
        return { success: true };
      }
      
      localStorage.removeItem('auth');
      return { success: true };
    } catch (error: any) {
      // Even if the API call fails, clear local storage
      localStorage.removeItem('auth');
      return {
        success: false,
        error: error.data?.message || 'Logout failed',
      };
    }
  };

  const refreshUser = async () => {
    try {
      const result = await refetchUser();
      return { success: true, data: result.data };
    } catch (error: any) {
      return {
        success: false,
        error: error.data?.message || 'Failed to refresh user',
      };
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    isLoggingIn,
    isLoggingOut,
    login,
    logout,
    refreshUser,
  };
};

export default useAuth;