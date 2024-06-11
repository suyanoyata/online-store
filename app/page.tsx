// @ts-nocheck

import { Card, CardDescription, CardTitle } from "@/components/ui/card";

import Image from "next/image";

import { api } from "@/lib/axios.config";
import { IProductsResponse } from "@/types/Products";
import { CameraOff, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Descriptions, localizedPsu } from "@/constants/constants";

export default async function Home() {
  let products: IProductsResponse | undefined;
  try {
    await api.get("/products").then((response) => {
      products = response.data;
    });
  } catch (_) {
    // pass
  }

  const UniversalProductCard = ({
    product_type,
  }: {
    product_type:
      | "gpu"
      | "cpu"
      | "motherboard"
      | "psu"
      | "case"
      | "storage"
      | "ram";
  }) => {
    return (
      <>
        <div className="w-full flex justify-end mt-3 mb-2">
          <h1 className="text-2xl font-bold mr-auto ml-3 mobile:text-lg">
            {Descriptions[product_type].title}
          </h1>
          <Link
            href={`/products/${product_type}`}
            className="text-sm font-medium cursor-pointer hover:underline inline-flex items-center"
          >
            Показати всі <ChevronRight size={18} />
          </Link>
        </div>
        <div className="flex flex-nowrap gap-3 overflow-x-scroll px-3">
          {products[product_type] &&
            products?.[product_type].map((product, index: number) => (
              <Link key={index} href={`/products/view/${product.id}`}>
                <Card className="p-3 min-w-[300px] max-w-[300px] h-[280px]">
                  <div className="h-[170px] w-full bg-zinc-100 rounded-[6px] mb-3 flex items-center justify-center">
                    {!product.product_image && (
                      <CameraOff color="gray" size={64} strokeWidth={1.5} />
                    )}
                    {product.product_image && (
                      <Image
                        src={product.product_image}
                        alt={product.product_title}
                        width={256 - 64}
                        className="select-none object-scale-down p-4 mix-blend-multiply"
                        height={0}
                      />
                    )}
                  </div>
                  <CardTitle>{product.product_title}</CardTitle>
                  <CardDescription className="mt-2">
                    {Descriptions[product_type].fields.map((field, index) => (
                      <span key={index} className="font-medium">
                        {field.title}:{" "}
                        <span className="text-black">
                          {field.key !== "psu_gpu_slot" && product[field.key]}
                          {field.key == "psu_gpu_slot" &&
                            localizedPsu[product[field.key]]}
                          {field.measure}
                        </span>
                        {index + 1 !=
                          Descriptions[product_type].fields.length && " • "}
                      </span>
                    ))}
                  </CardDescription>
                </Card>
              </Link>
            ))}
          {products[product_type].length === 0 && (
            <p className="text-sm text-zinc-400 font-medium">
              Товарів цього типу ще немає.
            </p>
          )}
        </div>
      </>
    );
  };

  return (
    <main className="max-w-[900px] mx-auto">
      <UniversalProductCard product_type="cpu" />
      <UniversalProductCard product_type="gpu" />
      <UniversalProductCard product_type="ram" />
      <UniversalProductCard product_type="motherboard" />
      <UniversalProductCard product_type="psu" />
      <UniversalProductCard product_type="case" />
      <UniversalProductCard product_type="storage" />
    </main>
  );
}
