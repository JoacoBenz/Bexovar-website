import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { OrbitalGraphic } from "./orbital-graphic";

describe("OrbitalGraphic", () => {
  it("renders with an aria role of presentation", () => {
    const { container } = render(<OrbitalGraphic />);
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveAttribute("role", "presentation");
    expect(root).toHaveAttribute("aria-hidden", "true");
  });
  it("renders three orbit rings", () => {
    const { container } = render(<OrbitalGraphic />);
    expect(container.querySelectorAll("[data-orbit-ring]")).toHaveLength(3);
  });
});
