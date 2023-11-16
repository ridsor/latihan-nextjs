"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import ReduxProvider from "@/redux/provider";
import { usePathname } from "next/navigation";
import Navbar from "./navbar";

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
          {!disableNavbar.includes(pathname) && <Navbar />}
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
