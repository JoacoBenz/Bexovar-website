import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NavBar } from "./nav-bar";

describe("NavBar", () => {
  it("renders the brand link to home", () => {
    render(<NavBar />);
    const brand = screen.getByRole("link", { name: /bexovar/i });
    expect(brand).toHaveAttribute("href", "/");
  });
  it("renders all configured nav links", () => {
    render(<NavBar />);
    for (const label of ["Services", "Case Studies", "Demos", "How we work", "About"]) {
      expect(screen.getAllByRole("link", { name: label }).length).toBeGreaterThan(0);
    }
  });
  it("renders a book-a-call CTA", () => {
    render(<NavBar />);
    expect(screen.getAllByRole("link", { name: /book a call/i }).length).toBeGreaterThan(0);
  });
});
