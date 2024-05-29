"use server";
import { z } from "zod";
import { COOKIE_NAME } from "@/utils/constants";
import { signIn, signUp } from "@/utils/authDb";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const register = async (prevState: any, formData: FormData) => {
  let data;
  try {
    data = registerSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
    });
  } catch (err: any) {
    console.error("Validation error:", err.errors);
    return { message: "Validation error", errors: err.errors };
  }

  try {
    const { token } = await signUp(data);
    cookies().set(COOKIE_NAME, token);
  } catch (err: any) {
    console.error(err);
    return { message: err.message, code: err.code };
  }

  redirect("/dashboard");
};

export const LogIn = async (prevState: any, formData: FormData) => {
  let data;
  try {
    data = loginSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
  } catch (err: any) {
    console.error("Validation error:", err.errors);
    return { message: "Validation error", errors: err.errors };
  }

  try {
    const { token } = await signIn(data);
    cookies().set(COOKIE_NAME, token);
  } catch (err: any) {
    console.error(err);
    return { message: err.message, code: err.code };
  }

  redirect("/dashboard");
};

export const LogOut = async () => {
  cookies().delete(COOKIE_NAME);
  redirect("/signin");
};
