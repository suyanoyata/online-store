"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ScrollArea } from "@/components/ui/scroll-area";
import useCartStore from "@/context/customer_cart.store";
import { IGraphicsProduct } from "@/types/Products";
import { useEffect, useState } from "react";
import { AccordionProduct } from "./AccordionItem.component";

export const GraphicsAccordion = ({
  products,
}: {
  products: IGraphicsProduct[];
}) => {
  const [open, setOpen] = useState<string>("0");

  const { cartData, setCartData, setThrottle } = useCartStore();

  const storage = localStorage.getItem("cart");

  useEffect(() => {
    setThrottle(false);
    setCartData(storage ? JSON.parse(storage) : null);
  }, [storage]);

  return (
    <Accordion value={open} onValueChange={setOpen} type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-xl font-bold">
          {cartData?.gpu ? cartData.gpu.product_title : "Відеокарта"}
        </AccordionTrigger>
        <AccordionContent>
          <ScrollArea className="max-h-[500px]">
            <div className="flex flex-col gap-5">
              {products.map((product, i) => (
                <AccordionProduct
                  target="gpu"
                  key={i}
                  product={product}
                  setOpen={setOpen}
                />
              ))}
            </div>
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
