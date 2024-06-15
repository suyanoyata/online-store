import { shop_service } from "@/app/api/(services)/shop.service";

export async function GET(request: Request) {
  const products = await shop_service.api.get_all_products();
  return Response.json(products);
}

export const runtime = "nodejs";
