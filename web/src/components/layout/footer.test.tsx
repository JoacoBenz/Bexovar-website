import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../messages/en.json";
import { Footer } from "./footer";

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

describe("Footer", () => {
  it("renders Services links", () => {
    render(<Footer />, { wrapper: Wrapper });
    expect(screen.getByRole("link", { name: "Custom Software" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "RPA & Agents" })).toBeInTheDocument();
  });
  it("renders email contact link", () => {
    render(<Footer />, { wrapper: Wrapper });
    const emailLink = screen.getByRole("link", { name: /hello@bexovar\.io/i });
    expect(emailLink).toHaveAttribute("href", "mailto:hello@bexovar.io");
  });
  it("renders the Book a call CTA", () => {
    render(<Footer />, { wrapper: Wrapper });
    expect(screen.getByRole("link", { name: /book a call/i })).toBeInTheDocument();
  });
});
