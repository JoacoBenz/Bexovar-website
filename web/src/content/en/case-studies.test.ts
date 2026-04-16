import { describe, it, expect } from "vitest";
import {
  caseStudies,
  caseStudyIndustries,
  caseStudyServices,
  getCaseStudyBySlug,
  type CaseStudy,
  type Industry,
} from "./case-studies";
import { services } from "./services";
import { demos } from "./demos";

describe("case-studies content module", () => {
  it("has exactly 4 entries", () => {
    expect(caseStudies).toHaveLength(4);
  });

  it("exposes industries in Finance · Logistics · Healthcare · Retail order", () => {
    expect(caseStudyIndustries).toEqual(["Finance", "Logistics", "Healthcare", "Retail"]);
  });

  it("exposes services in the order used by site-config", () => {
    expect(caseStudyServices).toEqual([
      "custom-software",
      "rpa-agents",
      "integrations",
      "consulting",
    ]);
  });

  it("has unique slugs", () => {
    const slugs = caseStudies.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("covers each of the four industries exactly once", () => {
    for (const ind of caseStudyIndustries) {
      expect(caseStudies.filter((c) => c.industry === ind)).toHaveLength(1);
    }
  });

  it("every service reference resolves in the services catalog", () => {
    const validSlugs = new Set(services.map((s) => s.slug));
    for (const cs of caseStudies) {
      for (const svc of cs.services) {
        expect(validSlugs.has(svc)).toBe(true);
      }
    }
  });

  it("every relatedDemoSlug resolves in the demos catalog", () => {
    const validSlugs = new Set(demos.map((d) => d.slug));
    for (const cs of caseStudies) {
      for (const slug of cs.relatedDemoSlugs) {
        expect(validSlugs.has(slug)).toBe(true);
      }
    }
  });

  it("every entry has at least one pull quote with quote + attribution", () => {
    for (const cs of caseStudies) {
      expect(cs.pullQuotes.length).toBeGreaterThan(0);
      for (const q of cs.pullQuotes) {
        expect(q.quote).toBeTruthy();
        expect(q.attribution).toBeTruthy();
      }
    }
  });

  it("every entry has non-empty prose for all four narrative sections", () => {
    for (const cs of caseStudies) {
      expect(cs.situation).toBeTruthy();
      expect(cs.whatWeBuilt).toBeTruthy();
      expect(cs.outcome).toBeTruthy();
      expect(cs.delivery).toBeTruthy();
    }
  });

  it("getCaseStudyBySlug returns the right entry and undefined for unknown", () => {
    const first = caseStudies[0];
    expect(getCaseStudyBySlug(first.slug)?.slug).toBe(first.slug);
    expect(getCaseStudyBySlug("does-not-exist")).toBeUndefined();
  });

  it("types export correctly", () => {
    const cs: CaseStudy = caseStudies[0];
    const ind: Industry = cs.industry;
    expect(cs.slug).toBeTruthy();
    expect(ind).toBeTruthy();
  });
});
