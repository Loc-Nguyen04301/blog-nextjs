"use client";
import LinkItem from "@/components/groupBlogLayout/LinkItem/LinkItem";
import { useAlertStore } from "@/zustand/stores/alert-store";
import { useAuthStore } from "@/zustand/stores/auth-store";
import { Routes } from "@/types/routes";
import { useTranslation } from "react-i18next";

const AuthNavLinks = () => {
  const loading = useAlertStore((state) => state.loading);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { t } = useTranslation();

  if (loading || isLoggedIn) return null;

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
