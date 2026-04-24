"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import LinkItem from "@/components/groupBlogLayout/LinkItem/LinkItem";
import AuthNavLinks from "@/components/AuthNavLinks";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Routes } from "@/types/routes";

const BlogNavHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between max-md:hidden">
      <ul className="flex w-[40%] justify-start flex-wrap tracking-wide">
        <LinkItem
          href={Routes.BLOG}
          label={t("nav.blog", "Blog")}
          className="hover:text-primaryColor"
        />
        <LinkItem
          href={Routes.VIDEO}
          label={t("nav.video", "Video")}
          className="hover:text-primaryColor"
        />
        <LinkItem
          href={Routes.MENU}
          label={t("nav.menu", "Mục lục")}
          className="hover:text-primaryColor"
        />
      </ul>
      <ul className="flex w-[40%] justify-end flex-wrap tracking-wide items-center">
        <LinkItem
          href={Routes.GIOI_THIEU}
          label={t("nav.about", "Giới thiệu")}
          className="hover:text-primaryColor"
        />
        <AuthNavLinks />
        <li className="px-2">
          <LanguageSwitcher />
        </li>
      </ul>
    </div>
  );
};

export default BlogNavHeader;
