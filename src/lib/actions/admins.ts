"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { requireOwner } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { hashPassword } from "@/lib/password";
import {
  adminFormToInput,
  adminInputSchema,
  fieldErrors,
  isUuid,
} from "@/lib/validation";

export type AdminFormState =
  | { error?: string; fieldErrors?: Record<string, string> }
  | undefined;

export async function createAdminAction(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireOwner();

  const parsed = adminInputSchema.safeParse(adminFormToInput(formData));
  if (!parsed.success) {
    return {
      error: "Please fix the highlighted fields.",
      fieldErrors: fieldErrors(parsed.error),
    };
  }

  const { name, email, password, role } = parsed.data;
  const db = getDb();

  const [existing] = await db
    .select({ id: adminUsers.id })
    .from(adminUsers)
    .where(eq(adminUsers.email, email))
    .limit(1);

  if (existing) {
    return {
      error: "That email is already registered.",
      fieldErrors: { email: "Already in use." },
    };
  }

  const passwordHash = await hashPassword(password);
  await db.insert(adminUsers).values({ name, email, passwordHash, role });

  revalidatePath("/admin/admins");
  redirect("/admin/admins?saved=1");
}

/** Toggle an admin's active flag — deactivated admins can't sign in, but keep their history. */
export async function setAdminActiveAction(formData: FormData): Promise<void> {
  const session = await requireOwner();

  const id = String(formData.get("id") ?? "");
  const isActive = formData.get("isActive") === "true";
  if (!isUuid(id) || id === session.userId) return;

  const db = getDb();
  await db.update(adminUsers).set({ isActive }).where(eq(adminUsers.id, id));

  revalidatePath("/admin/admins");
}

export async function deleteAdminAction(formData: FormData): Promise<void> {
  const session = await requireOwner();

  const id = String(formData.get("id") ?? "");
  if (!isUuid(id) || id === session.userId) return;

  const db = getDb();
  await db.delete(adminUsers).where(eq(adminUsers.id, id));

  revalidatePath("/admin/admins");
}
