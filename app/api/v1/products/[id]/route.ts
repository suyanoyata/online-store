import { shop_service } from "@/app/api/(services)/shop.service";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  if (!params.id || typeof params.id != "string") {
    return Response.error();
  }
  const product = await shop_service.api.get_product_by_id(params.id);

  return Response.json(product);
}
