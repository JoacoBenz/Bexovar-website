import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroOutcomes } from "./hero-outcomes";

describe("HeroOutcomes", () => {
  it("renders eyebrow, heading, body, and industries line", () => {
    render(
      <HeroOutcomes
        eyebrow="EYE"
        title="Title"
        body="Body"
        industries="Industries: A · B"
      />
    );
    expect(screen.getByText("EYE")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "Title" })).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
    expect(screen.getByText(/Industries: A/)).toBeInTheDocument();
  });
  it("renders primary and secondary CTAs as links", () => {
    render(
      <HeroOutcomes
        eyebrow="x" title="x" body="x" industries="x"
        primary={{ href: "/book", label: "Book a call" }}
        secondary={{ href: "/demos", label: "See demos" }}
      />
    );
    expect(screen.getByRole("link", { name: "Book a call" })).toHaveAttribute("href", "/book");
    expect(screen.getByRole("link", { name: "See demos" })).toHaveAttribute("href", "/demos");
  });
});
