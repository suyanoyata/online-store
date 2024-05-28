"use client";

import { Button } from "@/components/ui/button";
import useCartStore from "@/context/customer_cart.store";
import { Loader2 } from "lucide-react";

const CheckoutField = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex items-center justify-between mb-2">
      <p className="text-zinc-400 font-medium text-sm">{title}</p>
      <p className="text-black font-medium text-sm">{children}</p>
    </div>
  );
};

export const CheckoutDesktop = () => {
  const { cartData, throttle } = useCartStore();

  const checkout_fields = [
    {
      title: "Вартість доставки",
      value: `$30`,
    },
    {
      title: "Сума",
      value: cartData?.gpu ? `${cartData?.gpu.product_price} UAH` : null,
    },
  ];

  return (
    <aside className="flex-1 max-w-[260px] h-[800px] sticky top-3 max-xl:hidden">
      <h1 className="text-black font-semibold p-2 text-right text-lg mb-3">
        Зведення про замовлення
      </h1>
      {!throttle &&
        checkout_fields.map((field, i) => (
          <CheckoutField key={i} title={field.title}>
            {field.value}
          </CheckoutField>
        ))}
      {throttle && (
        <div>
          <Loader2 className="animate-spin mx-auto h-24" />
        </div>
      )}
      <Button className="w-full mt-3">Сплатити</Button>
    </aside>
  );
};

export const CheckoutMobile = () => {
  const { cartData, throttle } = useCartStore();

  const checkout_fields = [
    {
      title: "Вартість доставки",
      value: `$30`,
    },
    {
      title: "Сума",
      value: cartData?.gpu ? `${cartData?.gpu.product_price} UAH` : null,
    },
  ];

  return (
    <div className="fixed w-full  border-b border-zinc-100 xl:hidden bottom-0 rounded-t-lg px-3 py-4 flex flex-col z-10 bg-white">
      <h1 className="text-black font-semibold text-xl mb-3">
        Зведення про замовлення
      </h1>
      {throttle && (
        <div className="w-full flex items-center justify-center my-4">
          <Loader2 className="animate-spin" />
        </div>
      )}
      {!throttle &&
        checkout_fields.map((field, i) => (
          <CheckoutField key={i} title={field.title}>
            {field.value ? field.value : 0}
          </CheckoutField>
        ))}
      <Button className="w-full mt-4 h-10">Сплатити</Button>
    </div>
  );
};
