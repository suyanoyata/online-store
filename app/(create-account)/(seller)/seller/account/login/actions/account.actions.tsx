"use server";

import { expirationDays } from "@/constants/constants";
import { api } from "@/lib/axios.config";
import { LoginFormData } from "@/types/Customer";
import { cookies } from "next/headers";

export const sellerLogin = async (data: LoginFormData) => {
  return api
    .post("/sellers/account/login", {
      ...data,
    })
    .then((response) => {
      cookies().set("access-token", response.data.token, {
        maxAge: 86400 * expirationDays,
      });
      return {
        data: response.data,
        cookies: response.headers["set-cookie"],
      };
    })
    .catch((error) => {
      return error.response.data;
    });
};
