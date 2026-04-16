import { describe, it, expect } from "vitest";
import { getContent } from "./get-content";

describe("getContent", () => {
  it("returns the English tree for 'en'", async () => {
    const c = await getContent("en");
    expect(c.home.hero.title).toContain("busywork");
    expect(c.services.length).toBeGreaterThan(0);
  });

  it("returns a tree with identical top-level keys for 'es' (parity guard)", async () => {
    const en = await getContent("en");
    const es = await getContent("es");
    expect(Object.keys(es).sort()).toEqual(Object.keys(en).sort());
  });
});
