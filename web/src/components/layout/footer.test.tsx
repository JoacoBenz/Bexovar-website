import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../messages/en.json";

// Mock the locale-aware navigation to avoid next/navigation resolution issues in jsdom
vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

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
