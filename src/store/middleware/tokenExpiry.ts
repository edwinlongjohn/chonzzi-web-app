// store/middleware/tokenExpiry.ts
import type{ Middleware } from "@reduxjs/toolkit";
import { logout } from "@/store/slices/authSlice";
import { tokenService } from "@/lib/api";

export const tokenExpiryMiddleware: Middleware = (store) => (next) => (action :any) => {
  // Check if the action is from the API and has a 403 error
  if (action.type?.startsWith('api/') && action.type?.endsWith('/rejected')) {
    const payload = action.payload as any;
    
    if (payload?.status === 401 || payload?.status === 403) {
      console.warn('403 Forbidden - Logging out via middleware');
      store.dispatch(logout());
      
      // Clear cookies
      tokenService.removeUserCookie();
      tokenService.removeToken();
      
      // Redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/authentication/login';
      }
    }
  }
  
  return next(action);
};