import type { Metadata } from "next";
import "@/app/globals.css";
import { app_title } from "@/constants/constants";

export const metadata: Metadata = {
  title: `Створити товар | ${app_title}`,
  description: "Create a product to add it to the store.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
