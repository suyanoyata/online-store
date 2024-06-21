import { isSeller, validateAuthToken } from "@/app/api/(middleware)/jwt";
import { shop_service } from "@/app/api/(services)/shop.service";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const token = validateAuthToken();

  if (!isSeller() && token.error) {
    return Response.json(
      {
        message: "Wether you're not authenticated or not seller.",
      },
      {
        status: 401,
      },
    );
  }

  if (!params.id || typeof params.id != "string" || !token.data?.id) {
    return Response.error();
  }

  try {
    const product = await shop_service.api.delete_product(
      token.data.id,
      params.id,
    );

    return Response.json(product);
  } catch (e) {
    return Response.json(e, {
      status: 400,
    });
  }
}
