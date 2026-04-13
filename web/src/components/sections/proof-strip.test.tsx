import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProofStrip } from "./proof-strip";
import type { Metric } from "@/content/home";

const metrics: Metric[] = [
  { industry: "Finance", headline: "42%", detail: "lower cost" },
  { industry: "Logistics", headline: "4h→20m", detail: "faster close" },
];

describe("ProofStrip", () => {
  it("renders each metric", () => {
    render(<ProofStrip metrics={metrics} />);
    expect(screen.getByText("42%")).toBeInTheDocument();
    expect(screen.getByText("4h→20m")).toBeInTheDocument();
    expect(screen.getByText("Finance")).toBeInTheDocument();
    expect(screen.getByText("Logistics")).toBeInTheDocument();
  });
});
