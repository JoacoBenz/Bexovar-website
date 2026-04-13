import { describe, it, expect } from "vitest";
import {
  demos,
  demoCategories,
  getFeaturedDemos,
  type Demo,
  type DemoCategory,
} from "./demos";

describe("demos content module", () => {
  it("exposes the six spec categories in display order", () => {
    expect(demoCategories).toEqual([
      "Finance",
      "Logistics",
      "Healthcare",
      "RPA",
      "Integrations",
      "AI agents",
    ]);
  });

  it("has at least one demo per category", () => {
    for (const cat of demoCategories) {
      expect(demos.some((d) => d.category === cat)).toBe(true);
    }
  });

  it("has unique slugs", () => {
    const slugs = demos.map((d) => d.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every demo has required fields and a poster path under /demos/", () => {
    for (const d of demos) {
      expect(d.title).toBeTruthy();
      expect(d.duration).toMatch(/^\d+(:\d{2})?(s|m)?$/i);
      expect(d.summary).toBeTruthy();
      expect(d.poster).toMatch(/^\/demos\/.+\.(png|jpg|webp|svg)$/);
    }
  });

  it("getFeaturedDemos returns exactly 3 demos in catalog order", () => {
    const featured = getFeaturedDemos();
    expect(featured).toHaveLength(3);
    const indices = featured.map((d) => demos.findIndex((x) => x.slug === d.slug));
    expect(indices).toEqual([...indices].sort((a, b) => a - b));
  });

  it("Demo and DemoCategory types are exported", () => {
    const cat: DemoCategory = "Finance";
    const demo: Demo = demos[0];
    expect(cat).toBe("Finance");
    expect(demo.slug).toBeTruthy();
  });
});
