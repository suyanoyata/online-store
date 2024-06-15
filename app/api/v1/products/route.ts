import { shop_service } from "@/app/api/(services)/shop.service";
import { faker } from "@faker-js/faker";
import { validateAuthToken } from "../../(middleware)/jwt";

export async function GET(request: Request) {
  const user = validateAuthToken();
  const products = await shop_service.api.get_all_products();

  return Response.json(products);
}
