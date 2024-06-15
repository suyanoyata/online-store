import { ProductTypes } from "@/app/(create-product)/dashboard/products/create/components/CreateForm.form";
import { constants } from "@/app/api/(configs)/constants";
import { isSeller, validateAuthToken } from "@/app/api/(middleware)/jwt";
import { shop_service } from "@/app/api/(services)/shop.service";

export async function POST(
  request: Request,
  { params }: { params: { product_type: ProductTypes } },
) {
  const userId = validateAuthToken();

  if (!userId.data || userId.error) {
    return Response.json(userId.error, {
      status: 401,
    });
  }

  if (!isSeller()) {
    return Response.json(
      { error: "Forbidden" },
      {
        status: 401,
      },
    );
  }

  if (
    !constants.allowed_product_fields.includes(params.product_type) ||
    typeof params.product_type != "string"
  ) {
    return Response.json(
      {
        error: `${params.product_type} is not valid as a product type.`,
      },
      {
        status: 400,
      },
    );
  }

  const body = await request.json();

  try {
    const new_product = await shop_service.api.add_product(
      userId.data?.id,
      params.product_type,
      body,
    );

    return Response.json(new_product);
  } catch (e) {
    return Response.json(e, {
      status: 400,
    });
  }
}
