import { user_service } from "@/app/api/(services)/user.service";
import { RegisterSchema } from "@/app/api/(types)/zod/user.schema";

export async function POST(
  request: Request,
  { params }: { params: { account_type: "sellers" | "customers" } },
) {
  const credentials = await request.json();

  try {
    const body = RegisterSchema.parse(credentials);

    const registerResponse = await user_service.api.create_account(
      {
        email: body.email,
        password: body.password,
        name: body.name,
      },
      params.account_type,
    );

    return Response.json(registerResponse);
  } catch (e) {
    return Response.json(e, {
      status: 400,
    });
  }
}
