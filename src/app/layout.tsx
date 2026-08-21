import type { Metadata } from "next";
import "./globals.css";
import ThemeRegistry from "../providers/ThemeRegistry";
import { portfolioApps } from "@/consts/richFx";
import RichFxProvider from "@/providers/RichFxProvider";
import NavigationTelemetry from "@/components/shared/monitoring/navigation-telemetry/NavigationTelemetry";
import { withBasePath } from "@/utils/basePath";

export const metadata: Metadata = {
  description: portfolioApps.site.description,
  icons: {
    icon: withBasePath("/favicon.ico"),
    shortcut: withBasePath("/favicon.ico"),
    apple: withBasePath("/favicon.ico"),
  },
  manifest: withBasePath("/manifest.json"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://cdn.jsdelivr.net/npm/pathseg@1.2.1/pathseg.js"
          async
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/poly-decomp@0.3.0/build/decomp.min.js"
          async
        ></script>
      </head>
      <body>
        <ThemeRegistry>
          <RichFxProvider>
            <NavigationTelemetry />
            {children}
          </RichFxProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
