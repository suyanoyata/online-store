import { shop_service } from "@/app/api/(services)/shop.service";
import { isSeller, validateAuthToken } from "../../(middleware)/jwt";

export async function GET(request: Request) {
  const user = validateAuthToken();

  if (!user.data || user.error) {
    return Response.json(user.error, {
      status: 401,
    });
  }

  const seller = await isSeller();

  if (seller) {
    return Response.json(
      {
        message: "Forbidden",
      },
      {
        status: 401,
      },
    );
  }

  const orders = await shop_service.api.get_user_orders(user.data?.id);

  return Response.json(orders);
}
