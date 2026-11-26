import { timingSafeEqual } from "node:crypto";

export type ApiKeyHeaders = Record<string, string | string[] | undefined>;

export function presentedApiKey(headers: ApiKeyHeaders): string | undefined {
  const direct = headers["steel-api-key"];
  if (typeof direct === "string" && direct.length > 0) return direct;
  const authorization = headers.authorization;
  if (typeof authorization !== "string") return undefined;
  const match = /^Bearer\s+(.+)$/i.exec(authorization);
  return match?.[1];
}

export function isApiKeyValid(
  presented: string | undefined,
  configured: string | undefined,
): boolean {
  if (!presented || !configured) return false;
  const provided = Buffer.from(presented, "utf8");
  const expected = Buffer.from(configured, "utf8");
  if (provided.length !== expected.length) return false;
  return timingSafeEqual(provided, expected);
}
