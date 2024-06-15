import { isCustomer, validateAuthToken } from "@/app/api/(middleware)/jwt";
import { shop_service } from "@/app/api/(services)/shop.service";

export async function POST(request: Request) {
  const userId = validateAuthToken();

  if (!userId.data || userId.error) {
    return Response.json(userId.error, {
      status: 401,
    });
  }

  if (!isCustomer()) {
    return Response.json(
      { error: "Forbidden" },
      {
        status: 401,
      },
    );
  }

  const body = await request.json();

  try {
    const order = await shop_service.api.order_product(
      body.items,
      userId.data?.id,
    );

    return Response.json(order);
  } catch (e) {
    return Response.json(e, {
      status: 400,
    });
  }
}
