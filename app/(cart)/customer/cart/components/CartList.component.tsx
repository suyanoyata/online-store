"use client";

import useCartStore from "@/context/customer_cart.store";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

const Product = ({ product, title }: { product: any; title: string }) => {
  return (
    <div className="flex items-center">
      <div className="bg-zinc-100 w-[70px] h-[70px] flex items-center justify-center rounded-sm shrink-0">
        {product.product_image && (
          <Image
            src={product.product_image}
            alt=""
            width={70 - 24}
            height={70 - 24}
            className="mix-blend-multiply w-auto h-auto"
          />
        )}
      </div>
      <div className="ml-2">
        <p className="text-zinc-400 text-xs font-semibold">{title}</p>
        <h2 className="text-sm font-medium cursor-pointer hover:underline">
          {product.product_title}
        </h2>
      </div>
      <p className="ml-auto text-black font-medium text-nowrap text-sm">
        {product.product_price} UAH
      </p>
    </div>
  );
};

const localizedTitle = {
  gpu: {
    title: "Відеокарта",
  },
};

export const CartList = () => {
  const { throttle, setThrottle, cartData, setCartData } = useCartStore();

  useEffect(() => {
    const storage = localStorage.getItem("cart");

    setCartData(storage && JSON.parse(storage));
    setTimeout(() => {
      setThrottle(false);
    }, 500);
  }, []);

  if (throttle) {
    return (
      <div className="w-full flex items-center justify-center mt-20">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!cartData?.gpu) return;

  return Object.keys(cartData).map((key: string) => (
    <div key={key} className="my-2">
      <Product title={localizedTitle[key].title} product={cartData[key]} />
    </div>
  ));
};
