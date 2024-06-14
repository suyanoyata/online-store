import { object, z } from "zod";

export const RegisterSchema = object({
  email: z.string().email("having incorrect format"),
  password: z.string().min(8, "less than 8 characters"),
  name: z.string().max(64),
});

export const UserLoginSchema = object({
  email: z.string().email("having incorrect format"),
  password: z.string().min(8, "less than 8 characters"),
});

export const CustomerSchema = object({
  id: z.string(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
});

export const GetUserSchema = CustomerSchema.omit({ password: true });

export const CookieUserSchema = object({ id: z.string() });
