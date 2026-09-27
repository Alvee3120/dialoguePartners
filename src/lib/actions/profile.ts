"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { hashPassword, verifyPassword } from "@/lib/password";
import {
  fieldErrors,
  passwordChangeSchema,
  profileInputSchema,
} from "@/lib/validation";

export type ProfileFormState =
  | { error?: string; fieldErrors?: Record<string, string>; ok?: boolean }
  | undefined;

/** Update the signed-in admin's own display name. */
export async function updateProfileAction(
  _prev: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  const session = await requireAdmin();

  const parsed = profileInputSchema.safeParse({
    name: String(formData.get("name") ?? ""),
  });
  if (!parsed.success) {
    return {
      error: "Please fix the highlighted fields.",
      fieldErrors: fieldErrors(parsed.error),
    };
  }

  const db = getDb();
  await db
    .update(adminUsers)
    .set({ name: parsed.data.name })
    .where(eq(adminUsers.id, session.userId));

  revalidatePath("/admin");
  return { ok: true };
}

/** Change the signed-in admin's own password — requires the current one. */
export async function changePasswordAction(
  _prev: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  const session = await requireAdmin();

  const parsed = passwordChangeSchema.safeParse({
    currentPassword: String(formData.get("currentPassword") ?? ""),
    newPassword: String(formData.get("newPassword") ?? ""),
    confirmPassword: String(formData.get("confirmPassword") ?? ""),
  });
  if (!parsed.success) {
    return {
      error: "Please fix the highlighted fields.",
      fieldErrors: fieldErrors(parsed.error),
    };
  }

  const db = getDb();
  const [user] = await db
    .select({ passwordHash: adminUsers.passwordHash })
    .from(adminUsers)
    .where(eq(adminUsers.id, session.userId))
    .limit(1);

  const valid =
    !!user && (await verifyPassword(parsed.data.currentPassword, user.passwordHash));
  if (!valid) {
    return {
      error: "Current password is incorrect.",
      fieldErrors: { currentPassword: "Incorrect password." },
    };
  }

  const passwordHash = await hashPassword(parsed.data.newPassword);
  await db
    .update(adminUsers)
    .set({ passwordHash })
    .where(eq(adminUsers.id, session.userId));

  return { ok: true };
}
