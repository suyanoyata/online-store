import { JwtPayload, sign, verify } from "jsonwebtoken";
import { user_service } from "@/app/api/(services)/user.service";
import { cookies, headers } from "next/headers";

const secret: string = process.env.JWT_SECRET as string;

export const generateToken = (id: string, type: string) => {
  const token = sign({ id, type }, secret);

  return token;
};

export const validateAuthToken = (): {
  data?: {
    id: string;
    type: string;
  };
  error?: string;
} => {
  const headerList = headers();
  const token =
    cookies().get("access-token")?.value || headerList.get("access-token");
  try {
    if (!token) {
      throw Error();
    }
    const decodedData = verify(token, secret);

    return {
      // @ts-ignore
      data: decodedData,
    };
  } catch (e) {
    return { error: "You are not authorized" };
  }
};

export const isSeller = async () => {
  try {
    const user = validateAuthToken();
    if (!user.data) {
      throw Error();
    }

    const { id } = user.data;

    const type = await user_service.api.get_user_type(id);

    if (type !== "seller") {
      throw Error();
    }

    return true;
  } catch (e) {
    return false;
  }
};

export const isCustomer = async () => {
  try {
    const user = validateAuthToken();

    if (!user.data) {
      throw Error();
    }

    const { id } = user.data;

    const type = await user_service.api.get_user_type(id);

    if (type !== "customer") {
      throw Error();
    }

    return true;
  } catch (e) {
    return false;
  }
};
