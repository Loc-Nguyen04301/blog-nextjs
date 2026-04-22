"use client";
import { useEffect } from "react";
import LinkItem from "@/components/groupBlogLayout/LinkItem/LinkItem";
import { useAuthStore, initAuthStore } from "@/zustand/stores/auth-store";

const AuthNavLinks = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    initAuthStore();
  }, []);

  if (isLoggedIn) return null;

  return (
    <>
      <LinkItem
        href={"/sign-in"}
        label="Đăng nhập"
        className="hover:text-primaryColor"
      />
      <div>fhoasdhfiosda</div>
      <LinkItem
        href={"/sign-up"}
        label="Đăng ký"
        className="hover:text-primaryColor"
      />
    </>
  );
};

export default AuthNavLinks;
