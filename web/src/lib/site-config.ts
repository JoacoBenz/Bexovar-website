export const siteConfig = {
  name: "Bexovar",
  tagline: "Custom software & process automation",
  domain: "bexovar.io",
  email: "hello@bexovar.io",
  linkedin: "https://www.linkedin.com/company/bexovar",
  nav: [
    { href: "/services", label: "Services" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/demos", label: "Demos" },
    { href: "/how-we-work", label: "How we work" },
    { href: "/about", label: "About" },
  ],
  footer: {
    services: [
      { href: "/services/custom-software", label: "Custom Software" },
      { href: "/services/rpa-agents", label: "RPA & Agents" },
      { href: "/services/integrations", label: "Systems Integration" },
      { href: "/services/consulting", label: "Process Consulting" },
    ],
    company: [
      { href: "/about", label: "About" },
      { href: "/case-studies", label: "Case Studies" },
      { href: "/contact", label: "Contact" },
    ],
  },
  cta: {
    primary: { href: "/book", label: "Book a call" },
    secondary: { href: "/proposal", label: "Request a proposal" },
    tertiary: { href: "/contact", label: "Contact us" },
  },
} as const;

export type NavLink = { href: string; label: string };
