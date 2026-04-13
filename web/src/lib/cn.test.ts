import { describe, it, expect } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("merges classes and dedupes conflicting Tailwind utilities", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
  it("filters falsy values", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });
});
