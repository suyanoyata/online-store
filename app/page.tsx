import { Card, CardDescription, CardTitle } from "@/components/ui/card";

import Image from "next/image";

import { api } from "@/lib/axios.config";
import { IProductsResponse } from "@/types/Products";
import { CameraOff, ChevronRight } from "lucide-react";

export default async function Home() {
  let products: IProductsResponse | undefined;
  try {
    await api.get("/products").then((response) => {
      products = response.data.data;
    });
  } catch (_) {
    // pass
  }

  return (
    <main className="max-w-[900px] mx-auto">
      <div className="w-full flex justify-end mt-3 mb-2">
        <h1 className="text-2xl font-bold mr-auto ml-3">Відеокарти</h1>
        <p className="text-sm font-medium cursor-pointer hover:underline inline-flex items-center">
          Показати всі <ChevronRight size={18} />
        </p>
      </div>
      <div className="flex flex-nowrap gap-3 overflow-x-scroll px-3">
        {products?.gpus.map((gpu, index: number) => (
          <Card
            className="p-3 min-w-[300px] max-w-[300px] h-[280px]"
            key={index}
          >
            <div className="h-[170px] w-full bg-zinc-100 rounded-[6px] mb-3 flex items-center justify-center">
              {!gpu.product_image && (
                <CameraOff color="gray" size={64} strokeWidth={1.5} />
              )}
              {gpu.product_image && (
                <Image
                  src={gpu.product_image}
                  alt={gpu.product_title}
                  width={256 - 64}
                  className="select-none mix-blend-multiply"
                  height={0}
                />
              )}
            </div>
            <CardTitle>{gpu.product_title}</CardTitle>
            <CardDescription className="mt-2">
              Частота ядра: {gpu.core_clock} Mhz • Частота пам&apos;яті:{" "}
              {gpu.memory_clock} Mhz
            </CardDescription>
          </Card>
        ))}
      </div>
    </main>
  );
}
