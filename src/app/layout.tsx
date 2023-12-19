"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import ReduxProvider from "@/redux/provider";
import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

const disableNavbar = ["/login", "/register"];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ReduxProvider>
          <SessionProvider>
            {!disableNavbar.includes(pathname) && <Navbar />}
            {children}
          </SessionProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
