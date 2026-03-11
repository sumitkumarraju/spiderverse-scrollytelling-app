import type { Metadata } from "next";
import { Outfit, Teko } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "700", "900"],
});

const teko = Teko({
  subsets: ["latin"],
  variable: "--font-teko",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Spider-Verse | Multiverse Tracker",
  description: "Monitor dimensional anomalies and secure the Spider-Society.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${teko.variable} antialiased selection:bg-red-500/30 selection:text-white bg-black`}
      >
        {children}
      </body>
    </html>
  );
}
