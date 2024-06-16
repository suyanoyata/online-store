"use client";

import { Button } from "@/components/ui/button";
import useCartStore, { ICartData } from "@/context/customer_cart.store";
import { Loader2 } from "lucide-react";
import { api } from "@/lib/axios.config";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CheckoutField = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      suppressHydrationWarning
      className="flex items-center justify-between mb-2"
    >
      <p className="text-zinc-400 font-medium text-sm">{title}</p>
      <p className="text-black font-medium text-sm">{children}</p>
    </div>
  );
};

function calculate_price(cartData: ICartData | null) {
  let price = 0;
  for (const key in cartData) {
    const product_price = cartData[key as keyof ICartData].product_price;
    price += product_price;
  }

  return price;
}

function orderItems(
  cartData: ICartData,
  setCartData: (cartData: ICartData) => void,
) {
  if (cartData == null) return;

  let items: string[] = [];

  Object.keys(cartData).forEach((key) => {
    // @ts-ignore
    items.push(cartData[key].id);
  });

  api
    .post(
      "/api/v1/order",
      {
        items,
      },
      {
        withCredentials: true,
      },
    )
    .then(() => {
      localStorage.removeItem("cart");
      setCartData({} as ICartData);
    });
}

function delivery_price(cartData: ICartData): number {
  let price = 0;

  if (!cartData) {
    return price;
  }

  Object.keys(cartData).forEach((key) => {
    // @ts-ignore
    price += cartData[key].product_price;
  });

  price = price * 0.01;

  return parseInt(price.toFixed(0));
}

export const CheckoutDesktop = () => {
  const { cartData, throttle, setCartData } = useCartStore();

  const [pendingCheckout, setPendingCheckout] = useState<boolean>(false);

  const checkout_fields = [
    {
      title: "Вартість доставки",
      value: delivery_price(cartData) + " UAH",
    },
    {
      title: "Вартість товару",
      value: calculate_price(cartData) + " UAH",
    },
    {
      title: "Сума",
      value: delivery_price(cartData) + calculate_price(cartData) + " UAH",
    },
  ];

  const router = useRouter();

  return (
    <aside className="flex-1 max-w-[260px] sticky top-16 max-xl:hidden h-[200px]">
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
      <Button
        disabled={cartData == null || pendingCheckout}
        onClick={() => {
          setPendingCheckout(true);
          orderItems(cartData, setCartData);
          setTimeout(() => {
            router.push("/customer/orders");
          }, 1500);
        }}
        className="w-full mt-3"
      >
        {!pendingCheckout && "Замовити"}
        {pendingCheckout && <Loader2 className="animate-spin" />}
      </Button>
    </aside>
  );
};

export const CheckoutMobile = () => {
  const { cartData, throttle, setCartData } = useCartStore();

  const checkout_fields = [
    {
      title: "Вартість доставки",
      value: delivery_price(cartData) + " UAH",
    },
    {
      title: "Вартість товару",
      value: calculate_price(cartData) + " UAH",
    },
    {
      title: "Сума",
      value: delivery_price(cartData) + calculate_price(cartData) + " UAH",
    },
  ];

  const router = useRouter();

  const [pendingCheckout, setPendingCheckout] = useState<boolean>(false);

  return (
    <div className="fixed w-full border-b border-zinc-100 xl:hidden bottom-0 rounded-t-lg px-3 py-4 flex flex-col z-10 bg-white">
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
      <Button
        disabled={cartData == null || pendingCheckout}
        onClick={() => {
          setPendingCheckout(true);
          orderItems(cartData, setCartData);
          setTimeout(() => {
            router.push("/customer/orders");
          }, 1500);
        }}
        className="w-full mt-4 h-10"
      >
        {!pendingCheckout && "Замовити"}
        {pendingCheckout && <Loader2 className="animate-spin" />}
      </Button>
    </div>
  );
};
