import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CaseStudiesBrowser } from "./case-studies-browser";
import type { CaseStudy, Industry, ServiceSlug } from "@/content/en/case-studies";

const industries: Industry[] = ["Finance", "Logistics"];
const serviceSlugs: ServiceSlug[] = ["custom-software", "rpa-agents"];

const baseStudy = (
  overrides: Partial<CaseStudy> & Pick<CaseStudy, "slug" | "industry" | "services">,
): CaseStudy => ({
  engagementLength: "x",
  clientDescriptor: "x",
  headlineOutcome: "x",
  headlineMetric: { value: "1", label: "l" },
  cardSummary: `summary for ${overrides.slug}`,
  situation: "s",
  whatWeBuilt: "b",
  outcome: "o",
  delivery: "d",
  pullQuotes: [{ quote: "q", attribution: "a" }],
  relatedDemoSlugs: [],
  ...overrides,
} as CaseStudy);

const studies: CaseStudy[] = [
  baseStudy({ slug: "a", industry: "Finance", services: ["rpa-agents"] }),
  baseStudy({ slug: "b", industry: "Logistics", services: ["custom-software"] }),
  baseStudy({ slug: "c", industry: "Finance", services: ["custom-software"] }),
];

describe("CaseStudiesBrowser", () => {
const identityIndustryLabels: Record<Industry, string> = {
  Finance: "Finance",
  Logistics: "Logistics",
  Healthcare: "Healthcare",
  Retail: "Retail",
};

  it("shows all case studies under the All filter", () => {
    render(
      <CaseStudiesBrowser
        caseStudies={studies}
        industries={industries}
        serviceSlugs={serviceSlugs}
        serviceLabels={{ "custom-software": "Custom Software", "rpa-agents": "RPA & Agents" }}
        industryLabels={identityIndustryLabels}
      />,
    );
    expect(screen.getByText("summary for a")).toBeInTheDocument();
    expect(screen.getByText("summary for b")).toBeInTheDocument();
    expect(screen.getByText("summary for c")).toBeInTheDocument();
  });

  it("filters by industry when an industry chip is clicked", () => {
    render(
      <CaseStudiesBrowser
        caseStudies={studies}
        industries={industries}
        serviceSlugs={serviceSlugs}
        serviceLabels={{ "custom-software": "Custom Software", "rpa-agents": "RPA & Agents" }}
        industryLabels={identityIndustryLabels}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Finance" }));
    expect(screen.getByText("summary for a")).toBeInTheDocument();
    expect(screen.queryByText("summary for b")).toBeNull();
    expect(screen.getByText("summary for c")).toBeInTheDocument();
  });

  it("filters by service when a service chip is clicked", () => {
    render(
      <CaseStudiesBrowser
        caseStudies={studies}
        industries={industries}
        serviceSlugs={serviceSlugs}
        serviceLabels={{ "custom-software": "Custom Software", "rpa-agents": "RPA & Agents" }}
        industryLabels={identityIndustryLabels}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Custom Software" }));
    expect(screen.queryByText("summary for a")).toBeNull();
    expect(screen.getByText("summary for b")).toBeInTheDocument();
    expect(screen.getByText("summary for c")).toBeInTheDocument();
  });

  it("renders an empty state when no case studies match the active filter", () => {
    render(
      <CaseStudiesBrowser
        caseStudies={studies.filter((s) => s.industry === "Finance")}
        industries={industries}
        serviceSlugs={serviceSlugs}
        serviceLabels={{ "custom-software": "Custom Software", "rpa-agents": "RPA & Agents" }}
        industryLabels={identityIndustryLabels}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Logistics" }));
    expect(screen.getByText(/no case studies match this filter/i)).toBeInTheDocument();
  });
});
