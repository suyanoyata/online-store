"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { LoginFormData } from "@/types/Customer";
import { sellerLogin } from "./actions/account.actions";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>();

  const router = useRouter();

  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    setSubmitting(true);
    sellerLogin(data).then((response) => {
      if (response.message) {
        setError(response.field, {
          message: response.message,
        });
        setSubmitting(false);
        return;
      }
      router.push("/");
    });
  };

  return (
    <div className="w-full flex lg:flex-row">
      <div className="flex items-center justify-center flex-1 px-3 h-[calc(100vh-45px)]">
        <div className="mx-auto grid w-[350px] gap-6 px-3">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Вхід в аккаунт продавця</h1>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Пошта</Label>
              <Input
                {...register("email", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Неправильний формат адреси",
                  },
                  required: true,
                })}
                id="email"
                type="email"
                placeholder="seller@gmail.com"
              />
              {errors.email?.message && (
                <p className="text-sm text-red-500">{errors.email?.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Пароль</Label>
              </div>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  minLength: {
                    value: 8,
                    message: "Пароль повинен містити хоча би 8 символів",
                  },
                })}
              />
              {errors.password?.message && (
                <p className="text-sm text-red-500">
                  {errors.password?.message}
                </p>
              )}
            </div>
            {errors.root?.message && (
              <p className="text-sm text-red-500">{errors.root?.message}</p>
            )}
            <Button
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
              type="submit"
              className="w-full"
            >
              {!isSubmitting && "Увійти"}
              {isSubmitting && <Loader2 className="animate-spin" />}
            </Button>
          </div>
          <div className="text-center text-sm">
            Немає аккаунту?{" "}
            <Link href="/seller/account/create" className="underline">
              Створити
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-muted flex-1 max-sm:hidden h-screen"></div>
    </div>
  );
}
