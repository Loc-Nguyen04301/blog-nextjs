import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import type { AuthTokens } from "@/types/auth";
import { clearAuthTokens, getAccessToken, getRefreshToken, setAuthTokens } from "@/utils/authTokens";

const normalizeURL = (url: string | undefined): string => {
  if (!url) return "";
  return url.replace(/\/+$/, ""); // Remove trailing slashes
};

export const baseURL = normalizeURL(process.env.NEXT_PUBLIC_API_URL);

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const shouldSkipRefresh = (url: string | undefined): boolean => {
  if (!url) return false;
  return url.includes("/auth/login") || url.includes("/auth/register") || url.includes("/auth/refresh");
};

let refreshPromise: Promise<AuthTokens> | null = null;

const refreshTokens = async (): Promise<AuthTokens> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error("Missing refresh token");

  const response = await axiosInstance.post<AuthTokens>(
    "/auth/refresh",
    undefined,
    { headers: { Authorization: `Bearer ${refreshToken}` } },
  );

  setAuthTokens(response.data);
  return response.data;
};

axiosInstance.interceptors.request.use(
  (requestConfig: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    const hasAuthHeader =
      (requestConfig.headers as any)?.Authorization || (requestConfig.headers as any)?.authorization;

    if (token && !hasAuthHeader) {
      (requestConfig.headers as any).Authorization = `Bearer ${token}`;
    }

    return requestConfig;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;

    if (!originalRequest) return Promise.reject(error);

    if (error.response?.status !== 401 || originalRequest._retry || shouldSkipRefresh(originalRequest.url)) {
      return Promise.reject(error);
    }

    if (!getRefreshToken()) {
      clearAuthTokens();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = refreshTokens().finally(() => {
          refreshPromise = null;
        });
      }

      const tokens = await refreshPromise;
      (originalRequest.headers as any).Authorization = `Bearer ${tokens.accessToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      clearAuthTokens();
      if (typeof window !== "undefined") window.location.href = "/sign-in";
      return Promise.reject(refreshError);
    }
  },
);

export default axiosInstance;
