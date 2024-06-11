"use server";

import { api } from "@/lib/axios.config";
import { LoginFormData } from "@/types/Customer";
import { SubmitHandler } from "react-hook-form";

export const sellerLogin = async (data: LoginFormData) => {
  return api.post(
    "/sellers/account/login",
    {
      ...data,
    },
    { withCredentials: true },
  );
};
