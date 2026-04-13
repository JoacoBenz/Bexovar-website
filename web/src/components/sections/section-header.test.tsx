import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionHeader } from "./section-header";

describe("SectionHeader", () => {
  it("renders eyebrow, title, subtitle", () => {
    render(<SectionHeader eyebrow="PROOF" title="Real outcomes" subtitle="Names withheld." />);
    expect(screen.getByText("PROOF")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Real outcomes" })).toBeInTheDocument();
    expect(screen.getByText("Names withheld.")).toBeInTheDocument();
  });
  it("omits eyebrow when not provided", () => {
    render(<SectionHeader title="T" />);
    expect(screen.queryByText(/PROOF/)).not.toBeInTheDocument();
  });
});
