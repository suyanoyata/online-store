import {
  Descriptions,
  app_title,
  localizedPsu,
  localizedTitle,
} from "@/constants/constants";
import { api } from "@/lib/axios.config";
import { AvailableProducts, IBaseProduct } from "@/types/Products";
import { CameraOff } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const allowed_products = [
  "gpu",
  "cpu",
  "motherboard",
  "storage",
  "ram",
  "psu",
  "case",
];

export default async function Page({
  params,
}: {
  params: { product_type: AvailableProducts };
}) {
  if (!allowed_products.includes(params.product_type)) {
    notFound();
  }
  const products: IBaseProduct[] = await api
    .get(`/products/type/${params.product_type}`)
    .then((response) => {
      return response.data;
    });

  return (
    <>
      <Head>
        <title>
          {localizedTitle[params.product_type].title} - {app_title}
        </title>
      </Head>
      <main className="mx-auto max-w-[960px] px-3">
        <h1 className="text-2xl font-bold mb-3">
          {localizedTitle[params.product_type].title}
        </h1>
        {products.length == 0 && (
          <p className="h-80 flex items-center justify-center text-sm font-medium text-zinc-600 gap-1">
            Товарів не знайдено.{" "}
            <Link href="/" className="text-blue-500 hover:underline">
              Повернутися на головну.
            </Link>
          </p>
        )}
        <main className="flex flex-col sm:flex-row sm:gap-3 sm:mx-1 sm:flex-wrap sm:justify-center">
          {products.map((product) => {
            return (
              <Link
                href={`/products/view/${product.id}`}
                key={product.id}
                className="border-b py-2 flex gap-2 items-center sm:border sm:p-3 sm:rounded-sm sm:flex-col sm:items-start flex-1 sm:max-w-[300px] flex-shrink"
              >
                {product.product_image && (
                  <Image
                    src={product.product_image}
                    alt=""
                    className="w-[40px] h-[40px] object-scale-down sm:w-[120px] sm:h-[120px] sm:mx-auto"
                    width={120}
                    height={120}
                  />
                )}
                {!product.product_image && (
                  <div className="min-w-[40px] min-h-[40px] w-[40px] h-[40px] bg-zinc-100 rounded-sm flex items-center justify-center sm:w-[120px] sm:h-[120px] sm:mx-auto">
                    <CameraOff size={20} className="text-zinc-400" />
                  </div>
                )}
                <div>
                  <p className="font-medium overflow-hidden text-nowrap text-ellipsis w-[calc(100vw-160px)] sm:w-[280px]">
                    {product.product_title}
                  </p>
                  <p className="text-sm font-medium text-zinc-400">
                    {Descriptions[params.product_type].fields.map(
                      (field, index) => {
                        return (
                          <span key={index}>
                            {field.title}:{" "}
                            {field.key == "psu_gpu_slot" &&
                              // @ts-ignore
                              localizedPsu[product[field.key]]}
                            {field.key !== "psu_gpu_slot" &&
                              // @ts-ignore
                              product[field.key]}{" "}
                            {field.measure}
                            {Descriptions[params.product_type].fields.length !==
                              index + 1 && (
                              <span className="text-black"> • </span>
                            )}
                          </span>
                        );
                      },
                    )}
                  </p>
                </div>
                <p className="flex-1 text-sm font-medium text-nowrap ml-auto">
                  {product.product_price} UAH
                </p>
              </Link>
            );
          })}
        </main>
      </main>
    </>
  );
}
