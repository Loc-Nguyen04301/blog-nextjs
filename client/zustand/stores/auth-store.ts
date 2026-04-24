import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { UserInfo } from "@/types/auth";

interface AuthState {
  user: UserInfo | null;
  isLoggedIn: boolean;
  setUser: (info: UserInfo) => void;
  clearUser: () => void;
  setIsLoggedIn: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      isLoggedIn: false,
      setUser: (info) => set({ user: info }),
      clearUser: () => set({ user: null }),
      setIsLoggedIn: (value) => set({ isLoggedIn: value }),
    }),
    { name: "AuthStore" },
  ),
);
