import { createSlice,type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface UIState {
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  sidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
}

const getInitialTheme = (): 'light' | 'dark' | 'system' => {
  try {
    const theme = localStorage.getItem('theme') as 'light' | 'dark' | 'system';
    if (theme && ['light', 'dark', 'system'].includes(theme)) {
      return theme;
    }
  } catch (error) {
    console.error('Error loading theme:', error);
  }
  return 'light';
};

const initialState: UIState = {
  isLoading: false,
  error: null,
  successMessage: null,
  sidebarOpen: true,
  theme: getInitialTheme(),
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setSuccessMessage: (state, action: PayloadAction<string>) => {
      state.successMessage = action.payload;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    clearAll: (state) => {
      state.isLoading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setSuccessMessage,
  clearSuccessMessage,
  toggleSidebar,
  setTheme,
  clearAll,
} = uiSlice.actions;

export default uiSlice.reducer;

// Selectors
export const selectIsLoading = (state: RootState) => state.ui.isLoading;
export const selectError = (state: RootState) => state.ui.error;
export const selectSuccessMessage = (state: RootState) => state.ui.successMessage;
export const selectSidebarOpen = (state: RootState) => state.ui.sidebarOpen;
export const selectTheme = (state: RootState) => state.ui.theme;