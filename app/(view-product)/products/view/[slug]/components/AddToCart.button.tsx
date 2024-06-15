"use client";

import { Button } from "@/components/ui/button";
import useCartStore, { ICartData } from "@/context/customer_cart.store";
import useStore from "@/context/store";
import { useCartAutoSave } from "@/hooks/useCartAutoSave.hook";
import { IBaseProduct } from "@/types/Products";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export const AddToCartButton = ({ product }: { product: IBaseProduct }) => {
  const { cartData, setCartData, setThrottle, throttle } = useCartStore();
  const { account_type } = useStore();

  useEffect(() => {
    const storage = localStorage.getItem("cart");
    setThrottle(false);
    setCartData(storage ? JSON.parse(storage) : ({} as ICartData));
  }, []);

  useCartAutoSave();

  function addToCart() {
    const new_product = {
      ...cartData,
      [product.type]: product,
    };

    JSON.stringify(new_product);
    setCartData(new_product);
  }

  if (account_type == "seller") return null;

  return (
    <Button
      disabled={
        throttle || (cartData && cartData[product.type]?.id === product.id)
      }
      className={`my-3 w-[170px] max-sm:w-full select-none ${cartData[product.type]?.id === product.id ? "cursor-not-allowed" : "cursor-default"}`}
      onClick={addToCart}
    >
      {throttle && <Loader2 className="animate-spin" />}
      {!throttle && (
        <span>
          {cartData[product.type]?.id === product.id
            ? "Додано в корзину"
            : "Додати в корзину"}
        </span>
      )}
    </Button>
  );
};
