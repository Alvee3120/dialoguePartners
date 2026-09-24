import { eq } from "drizzle-orm";
import { getDb } from "../src/lib/db";
import { adminUsers } from "../src/lib/db/schema";
import { hashPassword } from "../src/lib/password";
import { loadEnv } from "./load-env";

loadEnv();

async function main(): Promise<void> {
  const email = (process.env.SEED_ADMIN_EMAIL ?? process.argv[2] ?? "")
    .trim()
    .toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD ?? process.argv[3] ?? "";
  const name = process.env.SEED_ADMIN_NAME ?? "Administrator";

  if (!email || !password) {
    console.error(
      "Missing credentials. Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD (or pass email and password as arguments).",
    );
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("Password must be at least 8 characters.");
    process.exit(1);
  }

  const db = getDb();
  const passwordHash = await hashPassword(password);

  const [existing] = await db
    .select({ id: adminUsers.id })
    .from(adminUsers)
    .where(eq(adminUsers.email, email))
    .limit(1);

  if (existing) {
    await db
      .update(adminUsers)
      .set({ passwordHash, name, isActive: true })
      .where(eq(adminUsers.id, existing.id));
    console.log(`Updated existing admin: ${email}`);
  } else {
    await db
      .insert(adminUsers)
      .values({ email, name, passwordHash, role: "owner" });
    console.log(`Created admin: ${email}`);
  }

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
