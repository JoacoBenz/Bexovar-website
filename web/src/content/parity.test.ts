import { describe, it, expect } from "vitest";
import * as en from "./en";
import * as es from "./es";

function structuralKeysOf(value: unknown, depth = 0): string[] {
  if (depth > 3 || value === null || typeof value !== "object") return [];
  if (Array.isArray(value)) {
    return value.flatMap((v, i) => structuralKeysOf(v, depth + 1).map((k) => `[${i}].${k}`));
  }
  const out: string[] = [];
  for (const key of Object.keys(value)) {
    const child = (value as Record<string, unknown>)[key];
    out.push(key);
    out.push(...structuralKeysOf(child, depth + 1).map((k) => `${key}.${k}`));
  }
  return out;
}

describe("content parity (en vs es)", () => {
  it("exposes identical top-level exports", () => {
    expect(Object.keys(es).sort()).toEqual(Object.keys(en).sort());
  });

  it("home.ts has the same keys in both locales", () => {
    expect(structuralKeysOf(es.home).sort()).toEqual(structuralKeysOf(en.home).sort());
  });

  it("services catalog has the same slugs and shape", () => {
    expect(es.services.map((s) => s.slug).sort()).toEqual(en.services.map((s) => s.slug).sort());
    expect(structuralKeysOf(es.services[0]).sort()).toEqual(
      structuralKeysOf(en.services[0]).sort(),
    );
  });

  it("demos catalog has the same slugs", () => {
    expect(es.demos.map((d) => d.slug).sort()).toEqual(en.demos.map((d) => d.slug).sort());
  });

  it("case studies catalog has the same slugs", () => {
    expect(es.caseStudies.map((c) => c.slug).sort()).toEqual(
      en.caseStudies.map((c) => c.slug).sort(),
    );
  });

  it("about has the same keys", () => {
    expect(structuralKeysOf(es.about).sort()).toEqual(structuralKeysOf(en.about).sort());
  });

  it("how-we-work has the same keys", () => {
    expect(structuralKeysOf(es.howWeWork).sort()).toEqual(structuralKeysOf(en.howWeWork).sort());
  });
});
