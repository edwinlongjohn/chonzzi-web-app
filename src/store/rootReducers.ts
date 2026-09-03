import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/store/slices/authSlice';
import uiReducer from '@/store/slices/uiSlice';
import { api } from '@/store/api';

export const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;