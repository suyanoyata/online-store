// @ts-nocheck

import { api } from "@/lib/axios.config";
import { IBaseProduct } from "@/types/Products";
import Image from "next/image";

import { CameraOff } from "lucide-react";
import { AddToCartButton } from "./components/AddToCart.button";
import { notFound } from "next/navigation";
import { localizedPsu, product_properties } from "@/constants/constants";
import { schemas } from "@/app/api/(types)/zod/product.schema";

export default async function Page({ params }: { params: { slug: string } }) {
  const product: IBaseProduct = await api
    .get(`/products/${params.slug}`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });

  const d = (): null | { [key: string]: string } => {
    try {
      return schemas[product.type].parse(product) as { [key: string]: string };
    } catch (e) {
      notFound();
    }
  };

  const details = d();

  if (!product) {
    return (
      <main className="mx-auto w-[900px]">
        <h1 className="text-black text-2xl font-bold">Цього товару не існує</h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[900px] flex mt-4 gap-4 px-3 max-sm:flex-col max-sm:items-center">
      {product.product_image && (
        <Image
          className="mix-blend-multiply object-scale-down p-3 w-full max-w-[350px]"
          src={product.product_image}
          width={350}
          height={0}
          alt=""
        />
      )}
      {!product.product_image && (
        <div className="w-[350px] h-[350px] bg-zinc-100 rounded-sm flex items-center justify-center flex-col gap-3">
          <CameraOff size={128} color="gray" strokeWidth={1} />
          <p className="text-sm text-zinc-500 font-medium">
            Відсутнє зображення товару
          </p>
        </div>
      )}
      <aside>
        <h1 className="text-black text-2xl font-bold">
          {product.product_title}
        </h1>
        <p className="text-xl text-zinc-600 font-semibold mt-1">
          Ціна: <span className="text-black">{product.product_price} UAH</span>
        </p>
        <AddToCartButton product={product} />
        {Object.keys(details as { [key: string]: string }).map((key) => {
          const title = () => {
            if (
              product_properties &&
              product_properties[product.type] &&
              product_properties[product.type][key]
            ) {
              return product_properties[product.type][key].title;
            } else {
              return key;
            }
          };
          const measure = () => {
            if (
              product_properties[product.type] &&
              product_properties[product.type][key]
            ) {
              return product_properties[product.type][key].measure;
            }
          };
          const value =
            key == "power_pins" || key == "psu_gpu_slot"
              ? localizedPsu[details[key]]
              : details[key];

          return (
            <p className="text-sm mt-1 font-medium" key={key}>
              <span className="text-zinc-500">{title()}: </span>
              {details && details[key] ? `${value}${measure()}` : " - "}
            </p>
          );
        })}
      </aside>
    </main>
  );
}
