"use client";
import React from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n/config";

interface I18nProviderProps {
  children: React.ReactNode;
  lang: string;
}

const I18nProvider = ({ children, lang }: I18nProviderProps) => {
  if (i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default I18nProvider;
