import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      isLoggedIn: false,
      setLoggedIn: (value) => set({ isLoggedIn: value }),
    }),
    { name: "AuthStore" },
  ),
);
