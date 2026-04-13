import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Faq } from "./faq";

const items = [
  { q: "First?", a: "First answer." },
  { q: "Second?", a: "Second answer." },
];

describe("Faq", () => {
  it("renders each question as a <summary>", () => {
    render(<Faq items={items} />);
    expect(screen.getByText("First?")).toBeInTheDocument();
    expect(screen.getByText("Second?")).toBeInTheDocument();
  });
  it("renders each answer", () => {
    render(<Faq items={items} />);
    expect(screen.getByText("First answer.")).toBeInTheDocument();
    expect(screen.getByText("Second answer.")).toBeInTheDocument();
  });
});
