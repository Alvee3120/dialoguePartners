"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { applications, type ApplicationStatus } from "@/lib/db/schema";
import { APPLICATION_STATUSES } from "@/lib/job-options";
import { isUuid } from "@/lib/validation";

function isApplicationStatus(value: string): value is ApplicationStatus {
  return (APPLICATION_STATUSES as readonly string[]).includes(value);
}

export async function setApplicationStatusAction(
  formData: FormData,
): Promise<void> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!isUuid(id) || !isApplicationStatus(status)) return;

  const db = getDb();
  await db
    .update(applications)
    .set({ status })
    .where(eq(applications.id, id));

  revalidatePath("/admin/applications");
  revalidatePath(`/admin/applications/${id}`);
}
