import type {
  AuthTokens,
  LoginDto,
  RegisterDto,
  RegisterResponse,
} from "@/types/auth";
import { clearAuthTokens, setAuthTokens } from "@/utils/authTokens";
import { useAuthStore } from "@/zustand/stores/auth-store";
import api from "./axios";

const register = (data: RegisterDto) => {
  return api.post<RegisterResponse>("/auth/register", data);
};

const login = async (data: LoginDto) => {
  const response = await api.post<AuthTokens>("/auth/login", data);
  setAuthTokens(response.data);
  useAuthStore.getState().setUser(response.data.user);
  useAuthStore.getState().setIsLoggedIn(true);
  return response;
};

const logout = async () => {
  try {
    await api.post("/auth/logout");
    clearAuthTokens();
    useAuthStore.getState().clearUser();
    useAuthStore.getState().setIsLoggedIn(false);
  } finally {
  }
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;
