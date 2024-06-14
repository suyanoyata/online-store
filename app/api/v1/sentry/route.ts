import { validateAuthToken } from "../../(middleware)/jwt";
import { customer_service } from "../../(services)/user.service";

export async function GET() {
  const userId = validateAuthToken();

  if (userId?.error) {
    return Response.json({ error: userId.error }, { status: 401 });
  }

  const customer = await customer_service.api.get_user(userId.data?.id);

  return Response.json(customer);
}
