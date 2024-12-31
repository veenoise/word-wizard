import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./Navigation";
import { Toaster } from "@/components/ui/toaster";
import { AudioContextWrapper } from "@/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Word Wizard",
  description: "AWS Game Builder Challenge Entry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark bg-neutral-800 overflow-x-hidden`}
      >
        <AudioContextWrapper>
          <header>
            <Navigation />
          </header>
          <main>                
            {children}
          </main>
          <Toaster />
        </AudioContextWrapper>
      </body>
    </html>
  );
}
