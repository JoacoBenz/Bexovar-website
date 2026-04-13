import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeaturedCase } from "./featured-case";

describe("FeaturedCase", () => {
  it("renders eyebrow, title, summary, and CTA link", () => {
    render(
      <FeaturedCase
        eyebrow="Featured case"
        title="How they saved 4 days"
        summary="200 people, 6 weeks."
        href="/case-studies/foo"
        cta="Read →"
      />
    );
    expect(screen.getByText("Featured case")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "How they saved 4 days" })).toBeInTheDocument();
    expect(screen.getByText("200 people, 6 weeks.")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: "Read →" });
    expect(link).toHaveAttribute("href", "/case-studies/foo");
  });
});
