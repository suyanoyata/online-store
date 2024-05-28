"use client";

import useCartStore from "@/context/customer_cart.store";
import { useCartAutoSave } from "@/hooks/useCartAutoSave.hook";
import { IProductGPU } from "@/types/Products";
import { CameraOff } from "lucide-react";
import Image from "next/image";

const AccordionImage = ({ product }: { product: IProductGPU }) => {
  return (
    <div className="accordion-image">
      {!product.product_image && <CameraOff color="gray" />}
      {product.product_image && (
        <Image
          src={product.product_image}
          alt={product.product_title}
          width={64 - 12}
          className="select-none mix-blend-multiply h-auto w-[64px - 12px]"
          height={0}
        />
      )}
    </div>
  );
};

export const AccordionProduct = ({
  product,
  setOpen,
}: {
  product: IProductGPU;
  setOpen: (s: string) => void;
}) => {
  const { cartData, setCartData } = useCartStore();

  useCartAutoSave();

  return (
    <div className="flex items-center">
      <AccordionImage product={product} />
      <div>
        <p className="font-semibold text-md hover:underline cursor-pointer">
          {product.product_title}
        </p>
      </div>
      <p className="ml-auto">{product.product_price} UAH</p>
      <p
        onClick={() => {
          setCartData({
            ...cartData,
            gpu: product,
          });
          setOpen("");
        }}
        className="ml-5 text-blue-500 font-medium hover:underline select-none cursor-pointer"
      >
        Обрати
      </p>
    </div>
  );
};
