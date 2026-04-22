import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getAccessToken } from "@/utils/authTokens";

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
    { name: "AuthStore" }
  )
);

export const initAuthStore = () => {
  useAuthStore.setState({ isLoggedIn: !!getAccessToken() });
};
