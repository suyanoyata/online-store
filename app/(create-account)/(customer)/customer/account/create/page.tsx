"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2">
      <div className="flex items-center justify-center">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Створення аккаунту</h1>
            <p className="text-balance text-muted-foreground">
              Ми збираємо мінімум даних для функціонування
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="customer-name">Введіть Ваше ім&apos;я</Label>
              <Input id="customer-name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Пошта</Label>
              <Input
                id="email"
                type="email"
                placeholder="customer@gmail.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Пароль</Label>
              </div>
              <Input id="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="confirm-password">Підтвердіть пароль</Label>
              </div>
              <Input id="confirm-password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Створити
            </Button>
          </div>
          <div className="text-center text-sm">
            Вже є аккаунт?{" "}
            <Link href="/customer/account/login" className="underline">
              Увійти
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block h-screen"></div>
    </div>
  );
}
