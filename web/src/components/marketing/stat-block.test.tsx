import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatBlock } from "./stat-block";

describe("StatBlock", () => {
  it("renders headline and label", () => {
    render(<StatBlock headline="42%" label="lower cost" />);
    expect(screen.getByText("42%")).toBeInTheDocument();
    expect(screen.getByText("lower cost")).toBeInTheDocument();
  });
  it("renders optional tag", () => {
    render(<StatBlock tag="Finance" headline="42%" label="lower cost" />);
    expect(screen.getByText("Finance")).toBeInTheDocument();
  });
});
