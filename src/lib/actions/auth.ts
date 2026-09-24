"use server";

import { redirect } from "next/navigation";
import { authenticate, createSession, destroySession } from "@/lib/auth";
import { fieldErrors, loginSchema } from "@/lib/validation";

export type LoginState = { error?: string } | undefined;

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: String(formData.get("email") ?? "")
      .trim()
      .toLowerCase(),
    password: String(formData.get("password") ?? ""),
  });

  if (!parsed.success) {
    const errors = fieldErrors(parsed.error);
    return { error: errors.email ?? errors.password ?? "Enter your details." };
  }

  const session = await authenticate(parsed.data.email, parsed.data.password);
  if (!session) {
    return { error: "Invalid email or password." };
  }

  await createSession(session.userId);

  const next = String(formData.get("next") ?? "");
  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}
