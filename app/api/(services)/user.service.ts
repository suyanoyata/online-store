import { PrismaClient } from "@prisma/client";
import { IBaseUser, ILoginRequest } from "@/app/api/(types)/request";
import { hashPassword } from "@/app/api/(configs)/bcrypt.config";
import { LoginUser } from "@/app/api/(types)/response";
import bcrypt from "bcrypt";
import { generateToken } from "@/app/api/(middleware)/jwt";
import {
  CookieUserSchema,
  GetUserSchema,
} from "@/app/api/(types)/zod/user.schema";

const prisma = new PrismaClient();

const create_account = async (
  user: IBaseUser,
  type: "sellers" | "customers",
) => {
  let exists;
  if (type == "customers") {
    exists = await prisma.customers.findUnique({
      where: {
        email: user.email,
      },
    });
  } else if (type == "sellers") {
    exists = await prisma.sellers.findUnique({
      where: {
        email: user.email,
      },
    });
  }

  if (exists) {
    throw {
      field: "email",
      message: "Користувач з такою поштою вже існує",
    };
  }

  const create = await prisma[type as "customers"].create({
    data: {
      name: user.name,
      email: user.email,
      password: await hashPassword(user.password),
    },
  });

  const account = GetUserSchema.parse(create);
  const cookie = CookieUserSchema.parse(account);

  const token = generateToken(cookie.id, type);

  return { account, token };
};

const login_account = async ({
  email,
  password,
  type,
}: ILoginRequest): Promise<{ user: LoginUser; token: string }> => {
  let dbUser;
  let account_type = "customer";
  if (type == "customers") {
    dbUser = await prisma.customers.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
      },
    });
    account_type = "customer";
  } else if (type == "sellers") {
    dbUser = await prisma.sellers.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
      },
    });

    account_type = "seller";
  }

  if (!dbUser) {
    throw {
      field: "email",
      message: "Такого користувача не існує",
    };
  }

  const match = await bcrypt.compare(password, dbUser.password);

  const user = GetUserSchema.parse(dbUser);
  const cookie = CookieUserSchema.parse(user);

  if (match) {
    const token = generateToken(cookie.id, account_type);
    return { user, token };
  } else {
    throw {
      field: "password",
      message: "Неправильний пароль",
    };
  }
};

const get_user = async (id: string) => {
  let response;
  let type = "customer";
  response = await prisma.customers.findUnique({
    where: {
      id,
    },
  });

  if (response == null) {
    response = await prisma.sellers.findUnique({
      where: {
        id,
      },
    });
    type = "seller";
  }

  if (!response) {
    throw {
      message: "No customer with provided id",
      customer: {},
    };
  }

  const customer = GetUserSchema.parse(response);

  return {
    account: {
      ...customer,
      type,
    },
  };
};

const get_user_type = async (
  id: string,
): Promise<"seller" | "customer" | "unauthorized"> => {
  const response = await prisma.customers.findUnique({
    where: {
      id,
    },
  });

  if (!response) {
    const seller = await prisma.sellers.findUnique({
      where: {
        id,
      },
    });

    if (!seller) return "unauthorized";

    return "seller";
  }

  return "customer";
};

export const user_service = {
  api: {
    get_user_type,
    create_account,
    login_account,
  },
};

export const seller_service = {
  api: {},
};

export const customer_service = {
  api: {
    get_user,
  },
};
