import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CategoryFilter } from "./category-filter";

const cats = ["Finance", "Logistics", "RPA"] as const;

describe("CategoryFilter", () => {
  it("renders an 'All' chip plus a chip per category", () => {
    render(<CategoryFilter categories={cats} active="All" onChange={() => {}} />);
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    for (const c of cats) {
      expect(screen.getByRole("button", { name: c })).toBeInTheDocument();
    }
  });

  it("marks the active chip with aria-pressed=true", () => {
    render(
      <CategoryFilter categories={cats} active="Logistics" onChange={() => {}} />,
    );
    expect(screen.getByRole("button", { name: "Logistics" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "Finance" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("calls onChange with the clicked category", () => {
    const onChange = vi.fn();
    render(<CategoryFilter categories={cats} active="All" onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Finance" }));
    expect(onChange).toHaveBeenCalledWith("Finance");
  });

  it("calls onChange('All') when the All chip is clicked", () => {
    const onChange = vi.fn();
    render(
      <CategoryFilter categories={cats} active="Finance" onChange={onChange} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "All" }));
    expect(onChange).toHaveBeenCalledWith("All");
  });
});
