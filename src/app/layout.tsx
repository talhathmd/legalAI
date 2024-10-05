import localFont from "next/font/local";
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@propelauth/react";
import ServerLayout from "./server-layout";
import ClientLayout from "./client-layout";
import { cn } from "@/lib/utils";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ServerLayout>
      <ClientLayout>{children}</ClientLayout>
    </ServerLayout>
  );
}
