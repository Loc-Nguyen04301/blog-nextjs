import { ACCESS_TOKEN } from "@/types/auth";
import type { AuthTokens } from "@/types/auth";

const isBrowser = () => typeof window !== "undefined";

export const getAccessToken = (): string | null => {
  if (!isBrowser()) return null;
  return window.localStorage.getItem(ACCESS_TOKEN);
};

export const setAuthTokens = (tokens: AuthTokens): void => {
  if (!isBrowser()) return;
  window.localStorage.setItem(ACCESS_TOKEN, tokens.accessToken);
};

export const clearAuthTokens = (): void => {
  if (!isBrowser()) return;
  window.localStorage.removeItem(ACCESS_TOKEN);
};

const decodeJwtPayload = (token: string): { exp?: number } | null => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
};

export const isAccessTokenExpired = (): boolean => {
  const token = getAccessToken();
  if (!token) return true;
  const payload = decodeJwtPayload(token);
  if (!payload?.exp) return true;
  return Date.now() >= payload.exp * 1000;
};
