import { ShoppingCart, Trash2 } from "lucide-react";
import { HeaderButton } from "../Header.component";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/lib/axios.config";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

const CartItem = ({
  product,
}: {
  product: {
    product_title: string;
    product_price: number;
    product_image?: string;
  };
}) => {
  return (
    <div className="border-t py-3 flex">
      <div className="min-w-24 min-h-24 bg-zinc-100 rounded-sm mr-2 flex items-center justify-center">
        {product.product_image && (
          <Image
            className="mix-blend-multiply"
            src={product.product_image}
            alt=""
            width={96 - 18}
            height={96 - 18}
          />
        )}
      </div>
      <div className="w-full">
        <div className="w-full flex justify-between">
          <h2 className="text-sm font-medium w-[260px] text-wrap">
            {product.product_title}
          </h2>
          <h2 className="text-sm font-medium">{product.product_price} UAH</h2>
        </div>
        <p className="text-sm inline-flex items-center text-zinc-800 gap-1 mt-1 cursor-pointer hover:underline">
          <Trash2 size={16} />
          Видалити
        </p>
      </div>
    </div>
  );
};

export default async function Cart() {
  const te = await api.get("/products").then((response) => {
    return response.data.data.gpus;
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:outline-none">
        <HeaderButton className="ml-2">
          <ShoppingCart size={18} strokeWidth={2.4} />
        </HeaderButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-full min-w-[400px] h-[300px] px-4 py-3"
      >
        <h2 className="text-xl text-black font-bold select-none pb-2">
          Корзина
        </h2>
        <ScrollArea className="cart-items-wrapper w-full flex flex-col h-[250px]">
          {te.map((product: any, index: number) => (
            <CartItem key={index} product={product} />
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
