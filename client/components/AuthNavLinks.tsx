"use client";
import { useEffect } from "react";
import LinkItem from "@/components/groupBlogLayout/LinkItem/LinkItem";
import { useAuthStore, initAuthStore } from "@/zustand/stores/auth-store";
import { Routes } from "@/types/routes";

const AuthNavLinks = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    initAuthStore();
  }, []);

  if (isLoggedIn) return null;

  return (
    <>
      <LinkItem
        href={Routes.SIGN_IN}
        label="Đăng nhập"
        className="hover:text-primaryColor"
      />
      <LinkItem
        href={Routes.SIGN_UP}
        label="Đăng ký"
        className="hover:text-primaryColor"
      />
    </>
  );
};

export default AuthNavLinks;
