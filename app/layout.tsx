import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agent Sumo - AI Business Operations Assistant",
  description:
    "AI-powered assistant for business operations including purchase orders, inventory management, and requisitions",
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  );
}
