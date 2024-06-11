import {
  IGraphicsProduct,
  IMemoryProduct,
  IMotherboardProduct,
  IPowerProduct,
  IProcessorProduct,
  IStorageProduct,
} from "@/types/Products";
import { create } from "zustand";

export type ICartData = {
  cpu?: IProcessorProduct;
  motherboard?: IMotherboardProduct;
  ram?: IMemoryProduct;
  case?: any;
  storage?: IStorageProduct;
  psu?: IPowerProduct;
  gpu: IGraphicsProduct;
};

interface StoreState {
  throttle: boolean;
  cartData: ICartData;
  setThrottle: (throttle: boolean) => void;
  setCartData: (cartData: ICartData) => void;
}

const useCartStore = create<StoreState>((set) => ({
  throttle: true,
  setThrottle: (throttle: boolean) => set({ throttle: throttle }),
  cartData: {} as ICartData,
  setCartData: (cartData: ICartData) => set({ cartData: cartData }),
}));

export default useCartStore;
