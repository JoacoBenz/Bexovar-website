import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DemoCard } from "./demo-card";

beforeEach(() => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia;
});
import type { Demo } from "@/content/demos";

const demo: Demo = {
  slug: "invoice-triage",
  title: "AP invoice triage & coding",
  duration: "45s",
  category: "Finance",
  summary: "Parses invoices and codes them.",
  poster: "/demos/invoice-triage.svg",
  videoSrc: "/demos/invoice-triage.mp4",
};

describe("DemoCard", () => {
  it("renders title, duration, category, and summary", () => {
    render(<DemoCard demo={demo} />);
    expect(screen.getByText(demo.title)).toBeInTheDocument();
    expect(screen.getByText(/45s/)).toBeInTheDocument();
    expect(screen.getByText("Finance")).toBeInTheDocument();
    expect(screen.getByText(/parses invoices/i)).toBeInTheDocument();
  });

  it("the VideoEmbed play button is reachable and labeled with the title", () => {
    render(<DemoCard demo={demo} />);
    expect(
      screen.getByRole("button", { name: /play ap invoice triage & coding video/i }),
    ).toBeEnabled();
  });

  it("clicking play swaps the poster for a playing video", () => {
    render(<DemoCard demo={demo} />);
    fireEvent.click(
      screen.getByRole("button", { name: /play ap invoice triage & coding video/i }),
    );
    expect(screen.getByTestId("video-el")).toHaveAttribute(
      "src",
      "/demos/invoice-triage.mp4",
    );
  });
});
