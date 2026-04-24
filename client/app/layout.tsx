import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import ScrollToTop from "../utils/ScrollToTop";
import AlertComponent from "@/components/AlertComponent";
import LoadingComponent from "@/components/LoadingComponent";
import { AudioPlayerProvider } from "@/context/audio-player-context";
import { lato } from "@/fonts";
import I18nProvider from "@/components/I18nProvider";
import AuthInitializer from "@/components/AuthInitializer";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Loc Nguyen Writer",
  description: "Loc Nguyen Writer",
  icons: {
    icon: "favicon.ico",
  },
  openGraph: {
    locale: "en_US",
    type: "article",
    title: "Loc Nguyen Writer",
    description: "Loc Nguyen Writer",
    siteName: "Loc Nguyen Writer",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const lang = cookieStore.get("i18next")?.value ?? "vi";

  return (
    <html lang={lang} className={lato.variable}>
      <head>
        <link rel="preconnect" href="http://103.101.163.17:8000" />
      </head>
      <body style={{ fontFamily: "var(--font-lato)" }} suppressHydrationWarning>
        <I18nProvider lang={lang}>
          <AudioPlayerProvider>
            <AuthInitializer />
            <AlertComponent />
            <LoadingComponent />
            <ScrollToTop />
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </AudioPlayerProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
