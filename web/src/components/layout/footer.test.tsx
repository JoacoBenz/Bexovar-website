import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./footer";

describe("Footer", () => {
  it("renders Services links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Custom Software" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "RPA & Agents" })).toBeInTheDocument();
  });
  it("renders email contact link", () => {
    render(<Footer />);
    const emailLink = screen.getByRole("link", { name: /hello@bexovar\.io/i });
    expect(emailLink).toHaveAttribute("href", "mailto:hello@bexovar.io");
  });
  it("renders the Book a call CTA", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /book a call/i })).toBeInTheDocument();
  });
});
