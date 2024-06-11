"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ScrollArea } from "@/components/ui/scroll-area";
import useCartStore, { ICartData } from "@/context/customer_cart.store";
import { IProductsResponse } from "@/types/Products";
import { useEffect, useState } from "react";
import { AccordionProduct } from "./AccordionItem.component";
import { localizedTitle } from "@/app/(cart)/customer/cart/components/CartList.component";
import Link from "next/link";

export const ComponentAccordion = ({
  products,
  target,
}: {
  products: IProductsResponse;
  target: "gpu" | "cpu" | "motherboard" | "ram" | "storage" | "psu" | "case";
}) => {
  const [open, setOpen] = useState<string>("0");

  const { cartData, setCartData, setThrottle } = useCartStore();

  useEffect(() => {
    const storage = localStorage.getItem("cart");
    setThrottle(false);
    setCartData(storage ? JSON.parse(storage) : ({} as ICartData));
  }, []);

  if (!products[target]) return null;

  const AccordionCheckCpuCompability = () => {
    if (
      target == "cpu" &&
      cartData?.motherboard != undefined &&
      cartData?.cpu != undefined
    ) {
      if (cartData.cpu.socket != cartData.motherboard.motherboard_socket) {
        return (
          <p className="text-red-400 font-medium text-sm">
            Ваш процесор несумісний із материнською платою. Потрібен сокет{" "}
            {cartData.motherboard?.motherboard_socket}, у Вас:{" "}
            {cartData.cpu?.socket}
          </p>
        );
      }
    }
  };

  const AccordionCheckMotherboardCompability = () => {
    if (
      target == "motherboard" &&
      cartData?.motherboard != undefined &&
      cartData?.cpu != undefined
    ) {
      if (cartData.cpu.socket != cartData.motherboard.motherboard_socket) {
        return (
          <p className="text-red-400 font-medium text-sm mt-4">
            Ваша материнська плата несумісна із процесором. Потрібен сокет{" "}
            {cartData.cpu.socket}, у Вас:{" "}
            {cartData.motherboard.motherboard_socket}
          </p>
        );
      }
    }
  };

  const AccordionCheckGpuPower = () => {
    if (
      target == "psu" &&
      cartData.gpu != undefined &&
      cartData.psu != undefined
    ) {
      if (cartData.psu.psu_capacity < cartData.gpu.required_power) {
        return (
          <p className="text-red-400 font-medium text-sm mt-4">
            Вам може не вистачити потужності блоку живлення для відеокарти.
            Мінімальна потрібна потужність: {cartData.gpu.required_power}W, у
            цього блоку живлення: {cartData.psu.psu_capacity}W.
          </p>
        );
      }
    }
  };

  return (
    <>
      <AccordionCheckCpuCompability />
      <AccordionCheckMotherboardCompability />
      <AccordionCheckGpuPower />
      <Accordion value={open} onValueChange={setOpen} type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex flex-1 items-center">
              <div className="flex flex-col justify-start text-left">
                <p className="text-sm text-zinc-400 font-medium">
                  {localizedTitle[target].title}
                </p>
                <p className="text-xl font-bold">
                  {cartData && cartData[target]
                    ? cartData[target]?.product_title
                    : localizedTitle[target].title}
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="mb-2">
              {products[target].length != 0 && (
                <ScrollArea className="max-h-[500px]">
                  <div className="flex flex-col gap-5">
                    {products[target].map((product, i) => (
                      <AccordionProduct
                        target={target}
                        key={i}
                        product={product}
                        setOpen={setOpen}
                      />
                    ))}
                  </div>
                </ScrollArea>
              )}
              {products[target].length === 0 && (
                <p className="text-sm font-medium text-zinc-600">
                  Товарів цього типу ще немає в каталозі.
                </p>
              )}
            </div>
            <Link href={`/products/${target}`}>
              <span className="text-blue-500 hover:underline">
                Переглянути всі товари цієї категорії
              </span>
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};
