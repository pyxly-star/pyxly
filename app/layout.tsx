import "./globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "./theme-context";
import { LanguageProvider } from "./language-context";
import  {useLanguage} from "./language-context";

import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Pyxly",
  description: "Projektverwaltung",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};


export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="de">
  <body className="min-h-screen w-full overflow-x-hidden">
    <LanguageProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </LanguageProvider>
  </body>
</html>
  );
}
