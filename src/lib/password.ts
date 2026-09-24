import { compare, hash } from "bcryptjs";

const BCRYPT_COST = 12;

/** Hash a plaintext password for storage. */
export function hashPassword(password: string): Promise<string> {
  return hash(password, BCRYPT_COST);
}

/** Constant-time compare of a plaintext password against a stored hash. */
export function verifyPassword(
  password: string,
  passwordHash: string,
): Promise<boolean> {
  return compare(password, passwordHash);
}
