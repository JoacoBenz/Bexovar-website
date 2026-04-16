import { describe, it, expect } from "vitest";
import { isLocale, locales, defaultLocale } from "./routing";

describe("routing config", () => {
  it("exposes en and es in that order with en as default", () => {
    expect(locales).toEqual(["en", "es"]);
    expect(defaultLocale).toBe("en");
  });

  it("isLocale narrows known locale strings", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("es")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(isLocale("")).toBe(false);
  });
});
