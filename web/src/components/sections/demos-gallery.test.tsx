import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DemosGallery } from "./demos-gallery";
import type { Demo } from "@/content/en/demos";

const demos: Demo[] = [
  {
    slug: "a",
    title: "A demo",
    duration: "30s",
    category: "Finance",
    summary: "sa",
    poster: "/demos/a.svg",
  },
  {
    slug: "b",
    title: "B demo",
    duration: "45s",
    category: "Logistics",
    summary: "sb",
    poster: "/demos/b.svg",
  },
  {
    slug: "c",
    title: "C demo",
    duration: "60s",
    category: "Finance",
    summary: "sc",
    poster: "/demos/c.svg",
  },
];

describe("DemosGallery", () => {
  it("shows all demos by default under the All filter", () => {
    render(<DemosGallery demos={demos} categories={["Finance", "Logistics"]} />);
    expect(screen.getByText("A demo")).toBeInTheDocument();
    expect(screen.getByText("B demo")).toBeInTheDocument();
    expect(screen.getByText("C demo")).toBeInTheDocument();
  });

  it("filters demos when a category chip is clicked", () => {
    render(<DemosGallery demos={demos} categories={["Finance", "Logistics"]} />);
    fireEvent.click(screen.getByRole("button", { name: "Logistics" }));
    expect(screen.queryByText("A demo")).toBeNull();
    expect(screen.getByText("B demo")).toBeInTheDocument();
    expect(screen.queryByText("C demo")).toBeNull();
  });

  it("renders an empty-state message when no demos match the active filter", () => {
    render(
      <DemosGallery
        demos={demos.filter((d) => d.category === "Finance")}
        categories={["Finance", "Logistics"]}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Logistics" }));
    expect(screen.getByText(/no demos in this category yet/i)).toBeInTheDocument();
  });
});
