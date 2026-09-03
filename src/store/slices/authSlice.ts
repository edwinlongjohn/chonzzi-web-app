import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserWithProfile } from '@/types';
import { tokenService } from '@/lib/api';

interface AuthState {
  user: UserWithProfile | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Helper to get initial state from localStorage
const getInitialState = (): AuthState => {
  try {
    const stored = localStorage.getItem('auth');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading auth state:', error);
  }
  return {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isLoading: true,
  };
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: UserWithProfile;
        accessToken: string;
      }>
    ) => {
      const { user, accessToken} = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.isAuthenticated = true;
      state.isLoading = false;

      // Persist to localStorage
      tokenService.setUserCookie(user);
      tokenService.setToken(accessToken);
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      tokenService.removeUserCookie();
      tokenService.removeToken();
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    updateUser: (state, action: PayloadAction<Partial<UserWithProfile>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        tokenService.setUserCookie(state.user);
      }
    },
  },
});

export const { setCredentials, logout, setLoading, updateUser } = authSlice.actions;
export default authSlice.reducer;

