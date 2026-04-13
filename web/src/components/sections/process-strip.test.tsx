import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProcessStrip } from "./process-strip";

const steps = [
  { number: "1", title: "Discover", summary: "a" },
  { number: "2", title: "Design",   summary: "b" },
];

describe("ProcessStrip", () => {
  it("renders each step with number and title", () => {
    render(<ProcessStrip steps={steps} />);
    expect(screen.getByText("Discover")).toBeInTheDocument();
    expect(screen.getByText("Design")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
