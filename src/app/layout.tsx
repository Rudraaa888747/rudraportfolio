import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rudra Chokshi | AI Engineer & Creative Technologist",
  description: "Portfolio of Rudra Chokshi, a futuristic AI-focused software engineer and builder of modern digital experiences.",
  openGraph: {
    title: "Rudra Chokshi | AI Engineer",
    description: "Futuristic AI-focused software engineer and builder of modern digital experiences.",
    url: "https://rudrachokshi.com", // update with real domain later
    siteName: "Rudra Chokshi Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rudra Chokshi | AI Engineer",
    description: "Futuristic AI-focused software engineer and builder of modern digital experiences.",
  },
};

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased dark`}
    >
      <body className="bg-black text-white font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
        <CustomCursor />
        <Navbar />
        <div className="bg-noise" />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
