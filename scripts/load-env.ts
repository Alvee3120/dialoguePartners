import { existsSync } from "node:fs";

type ProcessWithEnvFile = NodeJS.Process & {
  loadEnvFile?: (path: string) => void;
};

/**
 * Load env files into `process.env` the way Next does, without a dotenv
 * dependency. Later files win, so `.env.local` overrides `.env`.
 * Scripts (drizzle-kit, seed) need this; `next dev`/`next start` load them
 * on their own.
 */
export function loadEnv(files: string[] = [".env", ".env.local"]): void {
  const loader = (process as ProcessWithEnvFile).loadEnvFile;
  if (typeof loader !== "function") return;

  for (const file of files) {
    if (!existsSync(file)) continue;
    try {
      loader.call(process, file);
    } catch {
      // Ignore malformed/missing files — real environment still applies.
    }
  }
}
