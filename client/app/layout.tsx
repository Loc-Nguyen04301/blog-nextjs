import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import ScrollToTop from "../utils/ScrollToTop";
import AlertComponent from "@/components/AlertComponent";
import LoadingComponent from "@/components/LoadingComponent";
import { AudioPlayerProvider } from "@/context/audio-player-context";

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
  return (
    <html lang="en">
      <body>
        <AudioPlayerProvider>
          <AlertComponent />
          <LoadingComponent />
          <ScrollToTop />
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AudioPlayerProvider>
      </body>
    </html>
  );
}
