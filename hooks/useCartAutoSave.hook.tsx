import useCartStore from "@/context/customer_cart.store";
import { useEffect } from "react";

export const useCartAutoSave = () => {
  const { cartData } = useCartStore();

  useEffect(() => {
    if (JSON.stringify(cartData) === "{}") return;

    localStorage.setItem("cart", JSON.stringify(cartData));
  }, [cartData]);

  return {};
};
