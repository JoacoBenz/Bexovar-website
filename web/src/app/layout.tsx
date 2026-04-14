import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PlausibleProvider from "next-plausible";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "bexovar.io";
const plausibleEnabled = process.env.NEXT_PUBLIC_PLAUSIBLE_ENABLED === "true";

export const metadata: Metadata = {
  title: { default: "Bexovar", template: "%s | Bexovar" },
  description: "Custom software and process automation for mid-market operators.",
  metadataBase: new URL("https://bexovar.io"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={inter.variable}>
      <head>
        {plausibleEnabled && (
          <PlausibleProvider domain={plausibleDomain} trackOutboundLinks />
        )}
      </head>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
