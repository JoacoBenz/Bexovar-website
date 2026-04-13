import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServicesGrid } from "./services-grid";

const items = [
  { slug: "a", title: "A", summary: "sa" },
  { slug: "b", title: "B", summary: "sb" },
];

describe("ServicesGrid", () => {
  it("renders a card per service with a link to its detail page", () => {
    render(<ServicesGrid items={items} />);
    const linkA = screen.getByRole("link", { name: /A/i });
    expect(linkA).toHaveAttribute("href", "/services/a");
    const linkB = screen.getByRole("link", { name: /B/i });
    expect(linkB).toHaveAttribute("href", "/services/b");
  });
});
