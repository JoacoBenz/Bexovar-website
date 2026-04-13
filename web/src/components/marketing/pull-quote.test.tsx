import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PullQuote } from "./pull-quote";

describe("PullQuote", () => {
  it("renders the quote inside a blockquote and the attribution", () => {
    render(<PullQuote quote="We stopped asking." attribution="VP of Finance" />);
    const block = screen.getByText(/we stopped asking/i).closest("blockquote");
    expect(block).not.toBeNull();
    expect(screen.getByText(/VP of Finance/)).toBeInTheDocument();
  });
});
