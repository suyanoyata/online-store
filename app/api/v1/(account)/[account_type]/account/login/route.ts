import { user_service } from "@/app/api/(services)/user.service";
import { UserLoginSchema } from "@/app/api/(types)/zod/user.schema";
import { cookies } from "next/headers";

export async function POST(
  request: Request,
  { params }: { params: { account_type: "sellers" | "customers" } },
) {
  const credentials = await request.json();

  try {
    const body = UserLoginSchema.parse(credentials);

    const loginResponse = await user_service.api.login_account({
      email: body.email,
      password: body.password,
      type: params.account_type,
    });

    cookies().set("access-token", loginResponse.token);

    return Response.json(loginResponse);
  } catch (e) {
    return Response.json(e, {
      status: 400,
    });
  }
}
