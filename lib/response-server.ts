export const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function logResponseStorageError(route: string, error: unknown) {
  const details = error && typeof error === "object"
    ? {
        name: "name" in error && typeof error.name === "string" ? error.name : "UnknownError",
        code: "code" in error && typeof error.code === "string" ? error.code : undefined,
        message: "message" in error && typeof error.message === "string" ? error.message : "Unknown storage failure"
      }
    : { name: "UnknownError", message: "Unknown storage failure" };
  console.error("ParablePath response storage failed", { route, ...details });
}
