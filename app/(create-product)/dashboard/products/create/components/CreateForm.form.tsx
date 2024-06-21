"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { product_types } from "@/constants/constants";
import { api } from "@/lib/axios.config";
import { CameraOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type ProductTypes =
  | "gpu"
  | "cpu"
  | "motherboard"
  | "ram"
  | "storage"
  | "psu"
  | "case";

type ProductCreate = {
  type: ProductTypes;
  product_title: string;
  vendor: string;
  product_original_url: string;
  product_price: number;
  product_image: string;
} & ProductGPU &
  ProductCPU &
  ProductRAM &
  ProductMotherboard &
  ProductStorage &
  ProductPSU &
  ProductCase;

type ProductGPU = {
  core_clock: number;
  memory_clock: number;
  memory_size: number;
  interface: string;
  required_power: number;
  power_pins: string;
};

type ProductCPU = {
  socket: string;
  core_count: number;
  thread_count: number;
  core_clock: number;
  integrated_graphics: string;
};

type ProductRAM = {
  ram_speed: number;
  ram_type: string;
  ram_count: number;
  ram_size: number;
};

type ProductMotherboard = {
  motherboard_socket: string;
  motherboard_chipset: string;
  motherboard_ram_type: string;
  motherboard_form_factor: string;
};

type ProductStorage = {
  drive_type: string;
  drive_form_factor: string;
  drive_capacity: number;
  drive_read_speed: number;
  drive_write_speed: number;
  drive_interface: string;
};

type ProductPSU = {
  psu_capacity: number;
  psu_gpu_slot: string;
};

type ProductCase = {
  case_type: string;
  case_form_factor: string;
  case_color: string;
};

export const additional_text_sources: {
  [key in ProductTypes]: {
    id: string;
    placeholder: string;
    type: "input" | "select";
    select?: { id: string; title: string }[];
  }[];
} = {
  gpu: [
    {
      id: "core_clock",
      placeholder: "Частота ядра",
      type: "input",
    },
    {
      id: "memory_clock",
      placeholder: "Частота пам'яті",
      type: "input",
    },
    {
      id: "memory_size",
      placeholder: "Обсяг пам'яті",
      type: "input",
    },
    {
      id: "interface",
      placeholder: "Інтерфейс",
      type: "input",
    },
    {
      id: "required_power",
      placeholder: "Потрібна потужність",
      type: "input",
    },
    {
      id: "power_pins",
      placeholder: "Піни відеокарти",
      type: "select",
      select: [
        {
          id: "e_6pin",
          title: "6 pin",
        },
        {
          id: "e_6p2pin",
          title: "6+2 pin",
        },
        {
          id: "e_8pin",
          title: "8 pin",
        },
        {
          id: "e_16pin",
          title: "16 pin",
        },
      ],
    },
  ],
  cpu: [
    {
      id: "socket",
      placeholder: "Сокет",
      type: "input",
    },
    {
      id: "core_count",
      placeholder: "Кількість ядер",
      type: "input",
    },
    {
      id: "thread_count",
      placeholder: "Кількість потоків",
      type: "input",
    },
    {
      id: "core_clock",
      placeholder: "Частота ядра",
      type: "input",
    },
    {
      id: "integrated_graphics",
      placeholder: "Інтегрована графіка, якщо є",
      type: "input",
    },
  ],
  motherboard: [
    {
      id: "motherboard_socket",
      placeholder: "Сокет материнської плати (AM4, LGA1151 та ін.)",
      type: "input",
    },
    {
      id: "motherboard_chipset",
      placeholder: "Чіпсет материнської плати (A320, B450 та ін.)",
      type: "input",
    },
    {
      id: "motherboard_ram_type",
      placeholder: "Тип оперативної пам'яті (DDR3, DDR4 та ін.)",
      type: "input",
    },
    {
      id: "motherboard_form_factor",
      placeholder: "Форм-фактор материнської плати",
      type: "input",
    },
  ],
  ram: [
    {
      id: "ram_speed",
      placeholder: "Частота оперативної пам'яті",
      type: "input",
    },
    {
      id: "ram_type",
      placeholder: "Тип оперативної пам'яті (DDR3, DDR4 та ін.)",
      type: "input",
    },
    {
      id: "ram_count",
      placeholder: "Кількість планок оперативної пам'яті",
      type: "input",
    },
    {
      id: "ram_size",
      placeholder: "Обсяг пам'яті (за 1 шт.)",
      type: "input",
    },
  ],
  storage: [
    {
      id: "drive_type",
      placeholder: "Тип накопичувача (HDD, SSD)",
      type: "input",
    },
    {
      id: "drive_form_factor",
      placeholder: "Форм-фактор накопичувача (2.5, 3.5)",
      type: "input",
    },
    {
      id: "drive_capacity",
      placeholder: "Обсяг накопичувача",
      type: "input",
    },
    {
      id: "drive_read_speed",
      placeholder: "Швидкість читання",
      type: "input",
    },
    {
      id: "drive_write_speed",
      placeholder: "Швидкість запису",
      type: "input",
    },
    {
      id: "drive_interface",
      placeholder: "Інтерфейс",
      type: "input",
    },
  ],
  psu: [
    {
      id: "psu_capacity",
      placeholder: "Потужність блоку живлення",
      type: "input",
    },
    {
      id: "psu_gpu_slot",
      placeholder: "Піни відеокарти",
      type: "select",
      select: [
        {
          id: "e_6pin",
          title: "6 pin",
        },
        {
          id: "e_6p2pin",
          title: "6+2 pin",
        },
        {
          id: "e_8pin",
          title: "8 pin",
        },
        {
          id: "e_16pin",
          title: "16 pin",
        },
      ],
    },
  ],
  case: [
    {
      id: "case_type",
      placeholder: "Тип корпусу",
      type: "select",
      select: [
        {
          id: "ATX",
          title: "ATX",
        },
        {
          id: "MicroATX",
          title: "Micro ATX",
        },
        {
          id: "MiniITX",
          title: "Mini ITX",
        },
      ],
    },
    {
      id: "case_form_factor",
      placeholder: "Форм-фактор корпусу",
      type: "select",
      select: [
        {
          id: "MidTower",
          title: "Mid Tower",
        },
        {
          id: "FullTower",
          title: "Full Tower",
        },
      ],
    },
    {
      id: "case_color",
      placeholder: "Колір корпусу",
      type: "input",
    },
  ],
};

export const CreateForm = () => {
  const [products, setProducts] = useState<ProductCreate>({
    type: "gpu",
    psu_gpu_slot: "e_6pin",
    case_type: "ATX",
    case_form_factor: "MidTower",
    power_pins: "e_6pin",
  } as ProductCreate);

  const general_text_sources = [
    {
      id: "product_title",
      placeholder: "Назва товару",
    },
    {
      id: "vendor",
      placeholder: "Виробник",
    },
    {
      id: "product_original_url",
      placeholder: "Посилання на товар, звідки взята інформація",
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

  const route = useRouter();

  function create_product() {
    setSubmitting(true);
    api
      .post(
        `/api/v1/products/add/${products.type}`,
        {
          ...products,
          product_price: parseInt(products.product_price?.toString()),
          core_count: parseInt(products.core_count?.toString()),
          thread_count: parseInt(products.thread_count?.toString()),
          psu_capacity: parseInt(products.psu_capacity?.toString()),
          core_clock: parseFloat(products.core_clock?.toString()),
          memory_clock: parseInt(products.memory_clock?.toString()),
          memory_size: parseInt(products.memory_size?.toString()),
          required_power: parseInt(products.required_power?.toString()),
          drive_type: products.drive_type?.toUpperCase(),
          drive_capacity: parseInt(products.drive_capacity?.toString()),
          drive_read_speed: parseInt(products.drive_read_speed?.toString()),
          drive_write_speed: parseInt(products.drive_write_speed?.toString()),
          ram_speed: parseInt(products.ram_speed?.toString()),
          ram_count: parseInt(products.ram_count?.toString()),
          ram_size: parseInt(products.ram_size?.toString()),
        },
        {
          withCredentials: true,
        },
      )
      .then(() => {
        route.push("/");
      })
      .catch(() => {
        setFailed(true);
        setSubmitting(false);
      });
  }

  const PowerRadioGroup = () => {
    if (products.type !== "psu") return null;
    return additional_text_sources[products.type]?.map(
      (source) =>
        source.type === "select" && (
          <>
            <p className="my-0 mt-2 text-sm font-medium">
              {source.placeholder}
            </p>
            <RadioGroup
              key={source.id}
              value={products.psu_gpu_slot}
              defaultValue={source.select && source.select[0].id}
              onValueChange={(value: ProductTypes) => {
                setProducts({
                  ...products,
                  [source.id]: value,
                });
              }}
              className="flex mt-3 flex-wrap"
            >
              {source.select?.map((product) => (
                <div key={product.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={product.id} id={product.id} />
                  <Label htmlFor={product.id}>{product.title}</Label>
                </div>
              ))}
            </RadioGroup>
          </>
        ),
    );
  };

  const GPUPinsRadioGroup = () => {
    if (products.type !== "gpu") return null;
    return additional_text_sources[products.type]?.map(
      (source) =>
        source.type === "select" && (
          <>
            <p className="my-0 mt-2 text-sm font-medium">
              {source.placeholder}
            </p>
            <RadioGroup
              key={source.id}
              value={products.power_pins}
              defaultValue={source.select && source.select[0].id}
              onValueChange={(value: ProductTypes) => {
                setProducts({
                  ...products,
                  [source.id]: value,
                });
              }}
              className="flex mt-3 flex-wrap"
            >
              {source.select?.map((product) => (
                <div key={product.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={product.id} id={product.id} />
                  <Label htmlFor={product.id}>{product.title}</Label>
                </div>
              ))}
            </RadioGroup>
          </>
        ),
    );
  };

  const CaseFormFactorRadioGroup = () => {
    if (products.type === "case") {
      return additional_text_sources[products.type]?.map(
        (source) =>
          source.type === "select" &&
          source.id == "case_form_factor" && (
            <>
              <p className="my-0 mt-2 text-sm font-medium">
                {source.placeholder}
              </p>
              <RadioGroup
                key={source.id}
                value={products.case_form_factor}
                defaultValue={source.select && source.select[0].id}
                onValueChange={(value: ProductTypes) => {
                  setProducts({
                    ...products,
                    [source.id]: value,
                  });
                }}
                className="flex mt-3 flex-wrap"
              >
                {source.select?.map((product) => (
                  <div key={product.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={product.id} id={product.id} />
                    <Label htmlFor={product.id}>{product.title}</Label>
                  </div>
                ))}
              </RadioGroup>
            </>
          ),
      );
    }
  };

  const CaseTypeRadioGroup = () => {
    if (products.type === "case") {
      return additional_text_sources[products.type]?.map(
        (source) =>
          source.type === "select" &&
          source.id == "case_type" && (
            <>
              <p className="my-0 mt-2 text-sm font-medium">
                {source.placeholder}
              </p>
              <RadioGroup
                key={source.id}
                value={products.case_type}
                defaultValue={source.select && source.select[0].id}
                onValueChange={(value: ProductTypes) => {
                  setProducts({
                    ...products,
                    [source.id]: value,
                  });
                }}
                className="flex mt-3 flex-wrap"
              >
                {source.select?.map((product) => (
                  <div key={product.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={product.id} id={product.id} />
                    <Label htmlFor={product.id}>{product.title}</Label>
                  </div>
                ))}
              </RadioGroup>
            </>
          ),
      );
    }
  };

  const ProductPreviewImage = () => {
    return (
      <div className="max-sm:w-full w-[230px] h-[200px] flex flex-col items-center justify-center bg-zinc-100 rounded-sm max-sm:mt-0 mt-2">
        {!products.product_image && (
          <>
            <CameraOff color="gray" size={64} strokeWidth={1.5} />
            <p className="text-xs font-medium text-zinc-500 mt-2">
              Тут з&apos;явиться зображення товару
            </p>
          </>
        )}
        {products.product_image && (
          <img
            src={products.product_image}
            alt={products.product_title}
            className="object-scale-down h-[200px] w-[230px] mix-blend-multiply p-5"
          />
        )}
      </div>
    );
  };

  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);

  return (
    <>
      <h1 className="text-2xl mt-2 font-bold">Оберіть тип товару</h1>
      <RadioGroup
        value={products.type}
        defaultValue={product_types[0].id}
        onValueChange={(value: ProductTypes) => {
          setFailed(false);
          setProducts({
            ...products,
            type: value,
          });
        }}
        className="flex mt-3 flex-wrap"
      >
        {product_types.map((product) => (
          <div key={product.id} className="flex items-center space-x-2">
            <RadioGroupItem value={product.id} id={product.id} />
            <Label htmlFor={product.id}>{product.title}</Label>
          </div>
        ))}
      </RadioGroup>
      <h1 className="text-2xl mt-2 font-bold">Загальна інформація</h1>
      <div className="flex gap-6 max-sm:flex-col">
        <div className="flex-1 w-full">
          {general_text_sources.map((source, index) => (
            <Input
              onChange={(event) => {
                setFailed(false);
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
          <h1 className="text-2xl mt-2 font-bold">Додаткова інформація</h1>
          <>
            {additional_text_sources[products.type]?.map(
              (source) =>
                source.type === "input" && (
                  <Input
                    onChange={(event) => {
                      setFailed(false);
                      setProducts({
                        ...products,
                        [source.id]: event.target.value,
                      });
                    }}
                    key={source.id}
                    className="mt-2"
                    placeholder={source.placeholder}
                    id={source.id}
                  />
                ),
            )}
            <PowerRadioGroup />
            <CaseFormFactorRadioGroup />
            <CaseTypeRadioGroup />
            <GPUPinsRadioGroup />
          </>
        </div>
        <ProductPreviewImage />
      </div>
      {failed && (
        <p className="text-sm text-red-500 font-medium mt-3">
          Сталася помилка під час створення товару, перевірте введені поля, та
          спробуйте ще раз.
        </p>
      )}
      <Button
        disabled={isSubmitting}
        className="my-2 mobile:w-full w-[145px]"
        onClick={create_product}
      >
        {!isSubmitting && "Створити товар"}
        {isSubmitting && <Loader2 className="animate-spin" />}
      </Button>
    </>
  );
};
