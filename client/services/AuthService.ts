import type { AuthTokens, LoginDto, RegisterDto, RegisterResponse } from "@/types/auth";
import { clearAuthTokens, getRefreshToken, setAuthTokens } from "@/utils/authTokens";
import api from "./axios";

const register = (data: RegisterDto) => {
  return api.post<RegisterResponse>("/auth/register", data);
};

const login = async (data: LoginDto) => {
  const response = await api.post<AuthTokens>("/auth/login", data);
  setAuthTokens(response.data);
  return response;
};

const refresh = async (refreshToken?: string) => {
  const token = refreshToken ?? getRefreshToken();
  if (!token) throw new Error("Missing refresh token");

  const response = await api.post<AuthTokens>(
    "/auth/refresh",
    undefined,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  setAuthTokens(response.data);
  return response;
};

const logout = async () => {
  try {
    return await api.post("/auth/logout");
  } finally {
    clearAuthTokens();
  }
};

const AuthService = {
  register,
  login,
  refresh,
  logout,
};

export default AuthService;

