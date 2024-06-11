import { api } from "@/lib/axios.config";
import { IProductsResponse } from "@/types/Products";
import { ComponentAccordion } from "../components/ComponentAccordion.component";

export default async function Page() {
  let error = false;
  const products: IProductsResponse = await api
    .get("/products")
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      error = true;
    });

  if (error) {
    return (
      <main className="max-w-[900px] min-h-24 mx-auto px-3 flex items-center justify-center">
        <p className="text-sm font-medium">Не вдалося завантажити товар</p>
      </main>
    );
  }

  return (
    <>
      <main className="max-w-[900px] mx-auto px-3">
        <ComponentAccordion products={products} target="cpu" />
        <ComponentAccordion products={products} target="gpu" />
        <ComponentAccordion products={products} target="motherboard" />
        <ComponentAccordion products={products} target="storage" />
        <ComponentAccordion products={products} target="psu" />
        <ComponentAccordion products={products} target="case" />
      </main>
    </>
  );
}
