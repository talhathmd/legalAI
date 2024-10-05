"use client";

import { AuthProvider } from "@propelauth/react";
import localFont from "next/font/local";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = Inter({ subsets: ["latin"] });
const authUrl = process.env.NEXT_PUBLIC_AUTH_URL || "https://localhost:3000";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider authUrl={authUrl}>
      <div className={cn("min-h-screen antialiased grainy", inter.className)}>
        <Navbar />
        {children}
      </div>
    </AuthProvider>
  );
}
