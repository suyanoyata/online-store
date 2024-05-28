"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCartStore from "@/context/customer_cart.store";
import { api } from "@/lib/axios.config";
import { useState } from "react";

type ProductCreate = {
  product_title: string;
  core_clock: number;
  memory_size: number;
  memory_clock: number;
  interface: string;
  vendor: string;
  minimal_power: number;
  product_original_url: string;
  product_price: number;
  product_image: string;
};

export const CreateForm = () => {
  const [products, setProducts] = useState<ProductCreate>({} as ProductCreate);

  const { cartData } = useCartStore();

  const text_sources = [
    {
      id: "product_title",
      placeholder: "Назва товару",
    },
    {
      id: "core_clock",
      placeholder: "Частота ядра",
    },
    {
      id: "memory_size",
      placeholder: "Обсяг пам'яті",
    },
    {
      id: "memory_clock",
      placeholder: "Частота пам'яті",
    },
    {
      id: "interface",
      placeholder: "Інтерфейс",
    },
    {
      id: "vendor",
      placeholder: "Виробник",
    },
    {
      id: "minimal_power",
      placeholder: "Мінімальна потужність",
    },
    {
      id: "product_original_url",
      placeholder: "Посилання на товар",
    },
    {
      id: "product_price",
      placeholder: "Ціна товару",
    },
    {
      id: "product_image",
      placeholder: "Посилання на зображення товару, якщо є",
    },
  ];

  function create_product() {
    api.post(
      "/products/add/gpu",
      {
        ...products,
        core_clock: parseInt(products.core_clock.toString()),
        memory_size: parseInt(products.memory_size.toString()),
        memory_clock: parseInt(products.memory_clock.toString()),
        minimal_power: parseInt(products.minimal_power.toString()),
        product_price: parseInt(products.product_price.toString()),
      },
      {
        withCredentials: true,
      },
    );
  }

  return (
    <>
      {text_sources.map((source, index) => (
        <Input
          onChange={(event) => {
            setProducts({
              ...products,
              [source.id]: event.target.value,
            });
          }}
          key={index}
          className="mt-2"
          placeholder={source.placeholder}
          id={source.id}
        />
      ))}
      <Button className="mt-2" onClick={create_product}>
        Створити товар
      </Button>
    </>
  );
};
