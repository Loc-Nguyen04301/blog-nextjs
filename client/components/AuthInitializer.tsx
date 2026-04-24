"use client";
import { useEffect } from "react";
import { getAccessToken } from "@/utils/authTokens";
import { useAuthStore } from "@/zustand/stores/auth-store";

const AuthInitializer = () => {
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  useEffect(() => {
    setIsLoggedIn(!!getAccessToken());
  }, [setIsLoggedIn]);

  return null;
};

export default AuthInitializer;
