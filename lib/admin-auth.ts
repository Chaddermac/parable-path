import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "parablepath_admin";

function adminPassword() {
  return process.env.ADMIN_PASSWORD || "";
}

export function adminIsConfigured() {
  return adminPassword().length >= 12;
}

export function adminSessionToken() {
  const password = adminPassword();
  if (!password) return "";
  return createHmac("sha256", password).update("parablepath-admin-session-v1").digest("hex");
}

export function passwordMatches(candidate: string) {
  const expected = Buffer.from(adminPassword());
  const supplied = Buffer.from(candidate);
  return expected.length > 0 && expected.length === supplied.length && timingSafeEqual(expected, supplied);
}

export function sessionMatches(candidate?: string) {
  if (!candidate || !adminIsConfigured()) return false;
  const expected = Buffer.from(adminSessionToken());
  const supplied = Buffer.from(candidate);
  return expected.length === supplied.length && timingSafeEqual(expected, supplied);
}
