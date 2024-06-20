import { user_service } from "@/app/api/(services)/user.service";
import { RegisterSchema } from "@/app/api/(types)/zod/user.schema";
import { expirationDays } from "@/constants/constants";
import { cookies } from "next/headers";

type RegisterPayload = {
  account_type: "sellers" | "customers";
};

export async function POST(
  request: Request,
  { params }: { params: RegisterPayload },
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

    cookies().set("access-token", registerResponse.token, {
      maxAge: 86400 + expirationDays,
    });

    return Response.json(registerResponse);
  } catch (e) {
    return Response.json(e, {
      status: 400,
    });
  }
}
