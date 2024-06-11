"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { header_routes } from "@/constants/header.routes";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HeaderNavigation() {
  const LargeScreenContent = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
      <div className="hidden sm:flex">
        <HoverCard
          openDelay={50}
          closeDelay={50}
          open={open}
          onOpenChange={setOpen}
        >
          <HoverCardTrigger
            onClick={() => {
              setOpen(!open);
            }}
            className="text-sm cursor-default select-none"
          >
            Комплектуючі
          </HoverCardTrigger>
          <HoverCardContent className="p-2 h-[160px] w-[320px] grid grid-cols-2 z-10 bg-white">
            {header_routes.map((route) => (
              <Link
                key={route.url}
                href={route.url}
                className="text-sm font-medium hover:underline cursor-pointer h-5 antialiased"
              >
                {route.title}
              </Link>
            ))}
          </HoverCardContent>
        </HoverCard>
      </div>
    );
  };

  const SmallScreenContent = () => {
    const [open, setOpen] = useState<boolean>(false);
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <div className="sm:hidden ml-2 h-6">
          <SheetTrigger
            onClick={() => {
              setOpen(true);
            }}
          >
            <MenuIcon />
          </SheetTrigger>
        </div>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="mr-auto text-2xl font-bold">
              Навігація
            </SheetTitle>
            <SheetDescription className="flex flex-col text-left gap-1">
              <span className="text-lg font-bold text-black">Основне</span>
              <Link
                onClick={() => {
                  setOpen(false);
                }}
                className="text-md font-medium hover:underline cursor-pointer h-5 antialiased hover:text-black"
                href="/build"
              >
                Збірка
              </Link>
              <span className="text-lg font-bold text-black">Комплектуючі</span>
              {header_routes.map((route) => (
                <Link
                  onClick={() => {
                    setOpen(false);
                  }}
                  key={route.url}
                  href={route.url}
                  className="text-md font-medium hover:underline cursor-pointer h-5 antialiased hover:text-black"
                >
                  {route.title}
                </Link>
              ))}
              <span className="text-lg font-bold text-black">Інше</span>
              <Link
                onClick={() => {
                  setOpen(false);
                }}
                className="text-md font-medium hover:underline cursor-pointer h-5 antialiased hover:text-black"
                href="/faq/sellers"
              >
                Для продавців
              </Link>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );
  };

  return (
    <div className="items-center h-6 font-medium ml-3">
      <LargeScreenContent />
      <SmallScreenContent />
    </div>
  );
}
