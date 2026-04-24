import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { UserInfo } from "@/types/auth";

interface AuthState {
  user: UserInfo | null;
  setUser: (info: UserInfo) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      setUser: (info) => set({ user: info }),
      clearUser: () => set({ user: null }),
    }),
    { name: "AuthStore" },
  ),
);
