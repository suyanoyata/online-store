import { GraphicsAccordion } from "../components/GraphicsAccordion.component";
import { api } from "@/lib/axios.config";
import { IProductsResponse } from "@/types/Products";
import { ProcessorAccordion } from "../components/ProcessorAccordion.component";

export default async function Page() {
  const products: IProductsResponse = await api
    .get("/products")
    .then((response) => {
      return response.data.data;
    });
  return (
    <>
      <main className="max-w-[900px] mx-auto px-3">
        <ProcessorAccordion products={products.gpus} />
        <GraphicsAccordion products={products.gpus} />
      </main>
    </>
  );
}
