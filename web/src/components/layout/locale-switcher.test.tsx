import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../messages/en.json";
import { LocaleSwitcher } from "./locale-switcher";

const replaceMock = vi.fn();
vi.mock("@/i18n/navigation", () => ({
  useRouter: () => ({ replace: replaceMock }),
  usePathname: () => "/demos",
}));

function renderWithProvider(locale: "en" | "es" = "en") {
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleSwitcher />
    </NextIntlClientProvider>,
  );
}

describe("LocaleSwitcher", () => {
  beforeEach(() => replaceMock.mockClear());

  it("renders both locale buttons with the Spanish option unpressed on English", () => {
    renderWithProvider("en");
    expect(screen.getByRole("button", { name: "EN" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "ES" })).toHaveAttribute("aria-pressed", "false");
    const group = screen.getByRole("group", { name: /language/i });
    expect(group).toBeInTheDocument();
  });

  it("clicking ES calls router.replace with the new locale", () => {
    renderWithProvider("en");
    fireEvent.click(screen.getByRole("button", { name: "ES" }));
    expect(replaceMock).toHaveBeenCalledWith("/demos", { locale: "es" });
  });

  it("clicking the already-active locale does nothing", () => {
    renderWithProvider("en");
    fireEvent.click(screen.getByRole("button", { name: "EN" }));
    expect(replaceMock).not.toHaveBeenCalled();
  });
});
