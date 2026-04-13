import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DemosStrip } from "./demos-strip";

const demos = [
  { title: "A", duration: "30s", summary: "sa" },
  { title: "B", duration: "45s", summary: "sb" },
];

describe("DemosStrip", () => {
  it("renders each demo tile and link to gallery", () => {
    render(<DemosStrip demos={demos} />);
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /browse full demo gallery/i })).toHaveAttribute("href", "/demos");
  });
});
