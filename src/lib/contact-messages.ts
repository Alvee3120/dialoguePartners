import { desc, eq, sql } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { contactMessages, type ContactMessage } from "@/lib/db/schema";

export async function listContactMessages(): Promise<ContactMessage[]> {
  const db = getDb();
  return db
    .select()
    .from(contactMessages)
    .orderBy(desc(contactMessages.createdAt));
}

export async function getContactMessageById(
  id: string,
): Promise<ContactMessage | null> {
  const db = getDb();
  const [row] = await db
    .select()
    .from(contactMessages)
    .where(eq(contactMessages.id, id))
    .limit(1);
  return row ?? null;
}

export async function getContactMessageStats() {
  const db = getDb();
  const [row] = await db
    .select({ total: sql<number>`count(*)::int` })
    .from(contactMessages);
  return row ?? { total: 0 };
}
