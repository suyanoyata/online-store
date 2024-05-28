export interface IProductGPU {
  id: string;
  product_title: string;
  product_image: null | string;
  product_original_url: string;
  product_preview_image: null | string;
  product_price: number;
  minimal_power: number;
  core_clock: number;
  memory_clock: number;
  interface: string;
  vendor: string;
}

export interface IProductsResponse {
  gpus: IProductGPU[];
}
