import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });
  it("applies primary variant by default", () => {
    render(<Button>Go</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-accent");
  });
  it("applies secondary variant when specified", () => {
    render(<Button variant="secondary">Go</Button>);
    expect(screen.getByRole("button")).toHaveClass("border-border");
  });
  it("renders as anchor when href is provided", () => {
    render(<Button href="/book">Book</Button>);
    const link = screen.getByRole("link", { name: "Book" });
    expect(link).toHaveAttribute("href", "/book");
  });
});
