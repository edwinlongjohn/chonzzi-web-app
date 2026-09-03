import { tokenService } from "@/lib/api";
import { triggerLogout } from "@/utils/auth";
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

// Don't import RootState here - use a type that doesn't depend on the store
interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  logout: () => void;
}

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/api`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as { auth: AuthState };
    const token = state.auth?.accessToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log("Base query result:", result);

  if (result.error && result.error.status === 401) {
    // Trigger logout callback
    triggerLogout();
    tokenService.removeUserCookie();
    tokenService.removeToken();

    // if (refreshToken) {
    //   try {
    //     const refreshResult = await baseQuery(
    //       {
    //         url: "/auth/refresh",
    //         method: "POST",
    //         body: { refreshToken },
    //       },
    //       api,
    //       extraOptions,
    //     );

    //     const refreshData = refreshResult.data as any;

    //     if (refreshData?.data?.tokens) {
    //       const auth = localStorage.getItem("auth");
    //       if (auth) {
    //         const authData = JSON.parse(auth);
    //         authData.accessToken = refreshData.data.tokens.accessToken;
    //         authData.refreshToken = refreshData.data.tokens.refreshToken;
    //         localStorage.setItem("auth", JSON.stringify(authData));
    //       }

    //       result = await baseQuery(args, api, extraOptions);
    //     } else {
    //       localStorage.removeItem("auth");
    //     }
    //   } catch (error) {
    //     localStorage.removeItem("auth");
    //   }
    // } else {
    //   localStorage.removeItem("auth");
    // }
  }
  if (result.error && result.error.status === 422) {
    console.log("Validation error:", result.error);
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "User",
    "Users",
    "Profile",
    "Auth",
    "BlogPost",
    "BlogStats",
    "Blog",
    "Subscribers",
    "SubscriberStats",
    "Subscriber",
    "Waitlist",
    "WaitlistStats",
    "PublicBlogs",
    "PublicBlog",
    "PublicCategoryStats",
  ],
  endpoints: () => ({}),
});

export default api;
