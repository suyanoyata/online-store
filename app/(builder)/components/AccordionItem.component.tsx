"use client";

import useCartStore from "@/context/customer_cart.store";
import { useCartAutoSave } from "@/hooks/useCartAutoSave.hook";
import {
  IBaseProduct,
  IGraphicsProduct,
  IMemoryProduct,
  IMotherboardProduct,
  IPowerProduct,
  IProcessorProduct,
  IStorageProduct,
  ICaseProduct,
} from "@/types/Products";
import { CameraOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AccordionImage = ({ product }: { product: IBaseProduct }) => {
  return (
    <div className="accordion-image flex-none">
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
  target,
  product,
  setOpen,
}: {
  target: "gpu" | "cpu" | "motherboard" | "ram" | "storage" | "psu" | "case";
  product:
    | IGraphicsProduct
    | IProcessorProduct
    | IStorageProduct
    | IMemoryProduct
    | IMotherboardProduct
    | IPowerProduct
    | ICaseProduct;
  setOpen: (s: string) => void;
}) => {
  const { cartData, setCartData } = useCartStore();

  useCartAutoSave();

  return (
    <div className="flex items-center">
      <AccordionImage product={product} />
      <div>
        <Link
          href={`/products/view/${product.id}`}
          target="_blank"
          className="font-semibold text-md hover:underline cursor-pointer text-ellipsis text-nowrap overflow-hidden"
        >
          {product.product_title}
        </Link>
      </div>
      <p className="ml-auto text-nowrap">{product.product_price} UAH</p>
      <p
        onClick={() => {
          setCartData({
            ...cartData,
            [target]: product,
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
