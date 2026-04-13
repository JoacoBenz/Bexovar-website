import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CTASection } from "./cta-section";

describe("CTASection", () => {
  it("renders heading and primary CTA link", () => {
    render(
      <CTASection
        heading="Ready?"
        primary={{ href: "/book", label: "Book a call" }}
      />
    );
    expect(screen.getByRole("heading", { name: "Ready?" })).toBeInTheDocument();
    const link = screen.getByRole("link", { name: "Book a call" });
    expect(link).toHaveAttribute("href", "/book");
  });
  it("renders optional secondary CTA", () => {
    render(
      <CTASection
        heading="h"
        primary={{ href: "/a", label: "A" }}
        secondary={{ href: "/b", label: "B" }}
      />
    );
    expect(screen.getByRole("link", { name: "B" })).toBeInTheDocument();
  });
});
