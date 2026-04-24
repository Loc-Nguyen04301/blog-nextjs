"use client";
import { useEffect } from "react";
import LinkItem from "@/components/groupBlogLayout/LinkItem/LinkItem";
import { useAuthStore, initAuthStore } from "@/zustand/stores/auth-store";
import { Routes } from "@/types/routes";
import { useTranslation } from "react-i18next";

const AuthNavLinks = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { t } = useTranslation();

  useEffect(() => {
    initAuthStore();
  }, []);

  if (isLoggedIn) return null;

  return (
    <>
      <LinkItem
        href={Routes.SIGN_IN}
        label={t("nav.signIn", "Đăng nhập")}
        className="hover:text-primaryColor"
      />
      <LinkItem
        href={Routes.SIGN_UP}
        label={t("nav.signUp", "Đăng ký")}
        className="hover:text-primaryColor"
      />
    </>
  );
};

export default AuthNavLinks;
