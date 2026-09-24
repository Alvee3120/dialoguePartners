import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

type Database = PostgresJsDatabase<typeof schema>;

/**
 * Lazily create the Postgres client. The client is only built on first use so
 * importing this module never touches the environment or the network — that
 * keeps `next build` working even when DATABASE_URL is absent at build time.
 */
let cached: Database | undefined;

export function getDb(): Database {
  if (cached) return cached;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set — configure it before using the database.");
  }

  const client = postgres(connectionString, { max: 10 });
  cached = drizzle(client, { schema });
  return cached;
}

export { schema };
