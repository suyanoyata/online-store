import { IProductGPU } from "@/types/Products";
import { create } from "zustand";

type ICartData = {
  cpu?: any;
  motherboard?: any;
  ram?: any;
  case?: any;
  storage?: any;
  power_storage?: any;
  gpu: IProductGPU;
};

interface StoreState {
  throttle: boolean;
  cartData: ICartData | null;
  setThrottle: (throttle: boolean) => void;
  setCartData: (cartData: ICartData | null) => void;
}

const useCartStore = create<StoreState>((set) => ({
  throttle: true,
  setThrottle: (throttle: boolean) => set({ throttle: throttle }),
  cartData: {} as ICartData,
  setCartData: (cartData: ICartData | null) => set({ cartData: cartData }),
}));

export default useCartStore;
