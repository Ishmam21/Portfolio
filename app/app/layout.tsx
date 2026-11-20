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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
              const navigation = performance.getEntriesByType("navigation")[0];
              if (navigation ? navigation.type !== "reload" : performance.navigation?.type !== 1) return;
              try {
                const saved = JSON.parse(sessionStorage.getItem("portfolio:reload-scroll") || "null");
                if (saved?.url !== location.href || !Number.isFinite(saved.top)) return;

                // Let the gallery restore against the pinned layout instead of the initial HTML.
                const previous = history.scrollRestoration;
                history.scrollRestoration = "manual";
                addEventListener("pageshow", () => {
                  requestAnimationFrame(() => { history.scrollRestoration = previous; });
                }, { once: true });
              } catch {
                // Leave native restoration enabled when storage is unavailable.
              }
            })();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
