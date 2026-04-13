import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { VideoEmbed } from "./video-embed";

describe("VideoEmbed", () => {
  it("renders the poster and a labeled play button before interaction", () => {
    render(
      <VideoEmbed
        title="Invoice triage"
        poster="/demos/invoice-triage.svg"
        src="/demos/invoice-triage.mp4"
      />,
    );
    const img = screen.getByRole("img", { name: /invoice triage poster/i });
    expect(img).toHaveAttribute("src", "/demos/invoice-triage.svg");
    expect(
      screen.getByRole("button", { name: /play invoice triage video/i }),
    ).toBeEnabled();
    expect(screen.queryByTestId("video-el")).toBeNull();
  });

  it("swaps poster for <video> with autoplay when play is clicked", () => {
    render(
      <VideoEmbed
        title="Invoice triage"
        poster="/demos/invoice-triage.svg"
        src="/demos/invoice-triage.mp4"
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /play invoice triage video/i }));
    const video = screen.getByTestId("video-el") as HTMLVideoElement;
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute("src", "/demos/invoice-triage.mp4");
    expect(video).toHaveAttribute("controls");
    expect(video.autoplay).toBe(true);
  });

  it("disables the play button when no src is provided", () => {
    render(<VideoEmbed title="Missing demo" poster="/demos/missing.svg" />);
    expect(
      screen.getByRole("button", { name: /play missing demo video/i }),
    ).toBeDisabled();
  });
});
