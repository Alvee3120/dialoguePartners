/** Shared between the proxy guard (edge-safe) and the auth module — keep pure. */
export const SESSION_COOKIE_NAME = "dp_admin_session";

export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days
