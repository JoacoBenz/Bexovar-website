import { describe, it, expect } from "vitest";
import { serviceLabelBySlug, services } from "./services";

describe("serviceLabelBySlug", () => {
  it("returns the service title for a known slug", () => {
    expect(serviceLabelBySlug("custom-software")).toBe(
      services.find((s) => s.slug === "custom-software")!.title,
    );
  });

  it("returns undefined for an unknown slug", () => {
    expect(serviceLabelBySlug("does-not-exist")).toBeUndefined();
  });
});
