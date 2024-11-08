import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import ScrollToTop from "./utils/ScrollToTop";

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
    siteName: "The Present Writer",
    images: {
      url: "https://i1.wp.com/thepresentwriter.com/wp-content/uploads/2020/08/The-Present-Writer-jpeg-3.png?fit=1602%2C1602&ssl=1",
      width: 1602,
      height: 1602,
      type: "image/png",
      alt: "Ablot Loc Nguyen",
    },
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
        <ScrollToTop />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
