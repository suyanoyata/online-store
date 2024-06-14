export type Product = {
  product_title: string;
  vendor: string;
  product_original_url?: string;
  product_image: string;
  product_price: number;
  type: "gpu" | "cpu";
};
