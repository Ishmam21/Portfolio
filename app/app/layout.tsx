import type { Metadata } from "next";
import { portfolio } from "./content";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ishmam Portfolio",
  description: `${portfolio.role}. ${portfolio.introduction}`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
