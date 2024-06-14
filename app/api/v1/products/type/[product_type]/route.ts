import { shop_service } from "@/app/api/(services)/shop.service";

export async function GET(
  request: Request,
  { params }: { params: { product_type: string } },
) {
  const products = await shop_service.api.get_product_by_type(
    params.product_type,
  );
  return Response.json(products);
}
