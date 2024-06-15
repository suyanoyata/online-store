import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Header from "./components/Header.component";
import { app_title } from "@/constants/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: app_title,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        // style={{
        //   fontFamily: "-apple-system, BlinkMacSystemFont",
        // }}
      >
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
