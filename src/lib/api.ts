import Cookie from "js-cookie";

const TOKEN_COOKIE_KEY = "token";
const USER_COOKIE_KEY = "user";

export const tokenService = {
  setUserCookie: (user: any) => {
    try {
      // Serialize user data to JSON string
      const userData = JSON.stringify(user);

      Cookie.set(USER_COOKIE_KEY, userData, {
        expires: 7, // 1 day
        secure: import.meta.env.VITE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      console.log("User stored in cookie");
    } catch (error) {
      console.error("Failed to set user cookie:", error);
    }
  },

  // Get user from cookie
  getUserFromCookie: (): any | null => {
    try {
      const userData = Cookie.get(USER_COOKIE_KEY);
      if (userData) {
        return JSON.parse(userData);
      }
      return null;
    } catch (error) {
      console.error("Failed to get user from cookie:", error);
      return null;
    }
  },

  // Remove user cookie
  removeUserCookie: () => {
    try {
      Cookie.remove(USER_COOKIE_KEY, { path: "/" });
      console.log("User cookie removed");
    } catch (error) {
      console.error("Failed to remove user cookie:", error);
    }
  },
  getToken: (): any | null => {
    if (typeof window !== "undefined") {
      return Cookie.get(TOKEN_COOKIE_KEY);
    }
    return null;
  },

  setToken: (token: string) => {
    if (typeof window !== "undefined") {
      // Set cookie with secure options
      Cookie.set(TOKEN_COOKIE_KEY, token, {
        expires: 7, // 1 day
        secure: import.meta.env.VITE_ENV === "production",
        sameSite: "strict",
      });
    }
  },

  removeToken: () => {
    if (typeof window !== "undefined") {
      Cookie.remove(TOKEN_COOKIE_KEY);
    }
  },

  hasToken: () => {
    if (typeof window !== "undefined") {
      return !!Cookie.get(TOKEN_COOKIE_KEY);
    }
    return false;
  },
};
