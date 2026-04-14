import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DemosStrip } from "./demos-strip";
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
];

describe("DemosStrip", () => {
  it("renders a DemoCard per demo and the gallery link", () => {
    render(<DemosStrip demos={demos} />);
    expect(screen.getByText("A demo")).toBeInTheDocument();
    expect(screen.getByText("B demo")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /browse full demo gallery/i }),
    ).toHaveAttribute("href", "/demos");
  });

  it("each demo exposes a play affordance labeled with its title", () => {
    render(<DemosStrip demos={demos} />);
    expect(
      screen.getByRole("button", { name: /play a demo video/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /play b demo video/i }),
    ).toBeInTheDocument();
  });
});
