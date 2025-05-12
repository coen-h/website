import type { Metadata } from "next";
import { JetBrains_Mono  } from "next/font/google";
import "./globals.css";

const fontSans = JetBrains_Mono({
  variable: "--font-jetbrains_mono",
  subsets: ["latin"],
});

// const ralewayMono = Raleway_Mono({
//   variable: "--font-raleway-mono",
//   subsets: ["latin"],
// });

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
    <html lang="en">
      <body
        className={`${fontSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
