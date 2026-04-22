import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/types/auth";
import type { AuthTokens } from "@/types/auth";

const isBrowser = () => typeof window !== "undefined";

export const getAccessToken = (): string | null => {
  if (!isBrowser()) return null;
  return window.localStorage.getItem(ACCESS_TOKEN);
};

export const getRefreshToken = (): string | null => {
  if (!isBrowser()) return null;
  return window.localStorage.getItem(REFRESH_TOKEN);
};

export const setAuthTokens = (tokens: AuthTokens): void => {
  if (!isBrowser()) return;
  window.localStorage.setItem(ACCESS_TOKEN, tokens.accessToken);
  import("@/zustand/stores/auth-store").then(({ useAuthStore }) => {
    useAuthStore.setState({ isLoggedIn: true });
  });
};

export const clearAuthTokens = (): void => {
  if (!isBrowser()) return;
  window.localStorage.removeItem(ACCESS_TOKEN);
  import("@/zustand/stores/auth-store").then(({ useAuthStore }) => {
    useAuthStore.setState({ isLoggedIn: false });
  });
};

