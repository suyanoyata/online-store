"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { header_routes } from "@/constants/header.routes";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

export default function HeaderNavigation() {
  const LargeScreenContent = () => {
    return (
      <div className="hidden sm:flex">
        <NavigationMenu className="ml-2">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Комплектуючі</NavigationMenuTrigger>
              <NavigationMenuContent className="min-w-[240px] min-h-[240px] p-2 flex flex-wrap justify-evenly">
                {header_routes.map((route) => (
                  <Link
                    key={route.url}
                    href={route.url}
                    className="text-sm font-medium hover:underline cursor-pointer h-5 antialiased"
                  >
                    {route.title}
                  </Link>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu className="ml-2">
          <NavigationMenuItem>
            <NavigationMenuTrigger disabled>Збірка</NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-[240px] min-h-[240px]">
              <NavigationMenuLink></NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenu>
      </div>
    );
  };

  const SmallScreenContent = () => {
    return (
      <Sheet>
        <div className="sm:hidden h-[24px] ml-2">
          <SheetTrigger>
            <MenuIcon />
          </SheetTrigger>
        </div>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="mr-auto text-xl font-bold">
              Навігація
            </SheetTitle>
            <SheetDescription className="flex flex-col text-left gap-1">
              {header_routes.map((route) => (
                <Link
                  key={route.url}
                  href={route.url}
                  className="text-md font-medium hover:underline cursor-pointer h-5 antialiased hover:text-black"
                >
                  {route.title}
                </Link>
              ))}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );
  };

  return (
    <>
      <LargeScreenContent />
      <SmallScreenContent />
    </>
  );
}
