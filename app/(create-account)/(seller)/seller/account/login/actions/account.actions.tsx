"use server";

import { api } from "@/lib/axios.config";
import { LoginFormData } from "@/types/Customer";

export const sellerLogin = async (data: LoginFormData) => {
  return api
    .post("/sellers/account/login", {
      ...data,
    })
    .then((response) => {
      return {
        data: response.data,
        cookies: response.headers["set-cookie"],
      };
    });
};
