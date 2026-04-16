import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../messages/en.json";

// Mock the locale-aware navigation to avoid next/navigation resolution issues in jsdom
vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
  useRouter: () => ({ replace: vi.fn() }),
  usePathname: () => "/",
}));

import { NavBar } from "./nav-bar";

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

describe("NavBar", () => {
  it("renders the brand link to home", () => {
    render(<NavBar />, { wrapper: Wrapper });
    const brand = screen.getByRole("link", { name: /bexovar/i });
    expect(brand).toHaveAttribute("href", "/");
  });
  it("renders all configured nav links", () => {
    render(<NavBar />, { wrapper: Wrapper });
    for (const label of ["Services", "Case Studies", "Demos", "How we work", "About"]) {
      expect(screen.getAllByRole("link", { name: label }).length).toBeGreaterThan(0);
    }
  });
  it("renders a book-a-call CTA", () => {
    render(<NavBar />, { wrapper: Wrapper });
    expect(screen.getAllByRole("link", { name: /book a call/i }).length).toBeGreaterThan(0);
  });
});
