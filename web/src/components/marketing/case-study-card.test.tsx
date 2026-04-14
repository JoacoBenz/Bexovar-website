import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CaseStudyCard } from "./case-study-card";
import type { CaseStudy } from "@/content/case-studies";

const cs: CaseStudy = {
  slug: "finance-invoice-automation",
  industry: "Finance",
  services: ["rpa-agents"],
  engagementLength: "10 weeks",
  clientDescriptor: "Mid-market specialty lender",
  headlineOutcome: "42% lower invoice processing cost.",
  headlineMetric: { value: "42%", label: "lower invoice processing cost" },
  cardSummary: "Cut AP processing cost by 42%.",
  situation: "s",
  whatWeBuilt: "b",
  outcome: "o",
  delivery: "d",
  pullQuotes: [{ quote: "q", attribution: "a" }],
  relatedDemoSlugs: [],
};

describe("CaseStudyCard", () => {
  it("renders industry tag, headline metric, summary, and link to the detail page", () => {
    render(<CaseStudyCard caseStudy={cs} />);
    expect(screen.getByText("Finance")).toBeInTheDocument();
    expect(screen.getByText("42%")).toBeInTheDocument();
    expect(screen.getByText(/lower invoice processing cost/i)).toBeInTheDocument();
    expect(screen.getByText(/cut ap processing cost by 42%/i)).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /read the finance-invoice-automation case study/i });
    expect(link).toHaveAttribute("href", "/case-studies/finance-invoice-automation");
  });
});
