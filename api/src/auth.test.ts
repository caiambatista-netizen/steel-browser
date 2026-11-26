import { describe, expect, it } from "vitest";
import { isApiKeyValid, presentedApiKey } from "./auth.js";

describe("Steel API key authentication", () => {
  it("accepts the steel-api-key header", () => {
    expect(isApiKeyValid(presentedApiKey({ "steel-api-key": "secret" }), "secret")).toBe(true);
  });
  it("accepts a bearer token", () => {
    expect(isApiKeyValid(presentedApiKey({ authorization: "Bearer secret" }), "secret")).toBe(true);
  });
  it("rejects missing and incorrect keys", () => {
    expect(isApiKeyValid(presentedApiKey({}), "secret")).toBe(false);
    expect(isApiKeyValid(presentedApiKey({ "steel-api-key": "wrong" }), "secret")).toBe(false);
  });
  it("fails closed when no server key is configured", () => {
    expect(isApiKeyValid(presentedApiKey({ "steel-api-key": "secret" }), undefined)).toBe(false);
  });
});
