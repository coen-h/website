import type { Metadata } from "next";
import { JetBrains_Mono  } from "next/font/google";
import "./globals.css";

const fontSans = JetBrains_Mono({
  variable: "--font-jetbrains_mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coen Hitchcock",
  description: "My Portfolio Site",
  keywords: "coen hitchcock, coen, hitchcock, portfolio, terminal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${fontSans.variable} antialiased m-0 bg-gradient-to-br from-20% to-80% from-neutral-300 via-emerald-50 to-neutral-200 dark:from-neutral-600 dark:via-emerald-950 dark:to-neutral-800`}
      >
        {children}
      </body>
    </html>
  );
}
