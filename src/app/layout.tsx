"use client";

import "@/styles/globals.css";
import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import CreditFooter from "@/components/creditFooter";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={`min-h-screen bg-background font-sans antialiased ${fontSans.variable}`}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          {children}
        </Providers>
        <CreditFooter />
      </body>
    </html>
  );
}
