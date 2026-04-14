import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CaseStudySection } from "./case-study-section";

describe("CaseStudySection", () => {
  it("renders the title as an h2 and splits prose on double newlines into paragraphs", () => {
    render(
      <CaseStudySection title="The Situation" body={"First paragraph.\n\nSecond paragraph."} />,
    );
    expect(screen.getByRole("heading", { level: 2, name: /the situation/i })).toBeInTheDocument();
    expect(screen.getByText("First paragraph.")).toBeInTheDocument();
    expect(screen.getByText("Second paragraph.")).toBeInTheDocument();
  });

  it("trims empty paragraphs caused by stray blank lines", () => {
    render(<CaseStudySection title="X" body={"A.\n\n\n\nB."} />);
    const paragraphs = screen.getAllByText(/^[AB]\.$/);
    expect(paragraphs).toHaveLength(2);
  });
});
