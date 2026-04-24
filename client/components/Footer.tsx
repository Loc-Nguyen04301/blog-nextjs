"use client";
import { lato } from "@/fonts";
import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer
      className={`text-center ${lato.variable} font-sans text-xs font-bold mt-10`}
    >
      <p>{t("footer.copyright", "© Copyright All Rights Reserved By Loc Nguyen")}</p>
    </footer>
  );
};

export default Footer;
