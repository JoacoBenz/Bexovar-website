// Bexovar UI Kit — reusable JSX components (global scope for Babel)

const BX = window.BexovarContent;
// NOTE: useState/useEffect are destructured in index.html's inline script.
// Do not re-destructure them here — Babel transpiles both files into the
// same global scope and a duplicate `const` declaration crashes the page.

function Container({ children, className }) {
  return <div className={`container ${className || ""}`}>{children}</div>;
}

function Section({ children, variant, id }) {
  const cls = variant === "alt" ? "section section--alt" : variant === "dark" ? "section section--dark" : "section";
  return <section id={id} className={cls}><Container>{children}</Container></section>;
}

function Button({ children, variant = "primary", size = "md", onClick, href }) {
  const cls = `btn btn--${variant} btn--${size}`;
  if (href) return <a className={cls} href={href} onClick={onClick}>{children}</a>;
  return <button className={cls} onClick={onClick}>{children}</button>;
}

function Eyebrow({ children, sub }) {
  return <p className={`eyebrow ${sub ? "eyebrow--sub" : ""}`}>{children}</p>;
}

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="h2">{title}</h2>
      {subtitle && <p className="lead">{subtitle}</p>}
    </div>
  );
}

function OrbitalGraphic() {
  return (
    <div className="orbital" role="presentation" aria-hidden="true">
      <div className="orbital__ring orbital__ring--1"></div>
      <div className="orbital__ring orbital__ring--2"></div>
      <div className="orbital__ring orbital__ring--3"></div>
      <div className="orbital__core"><div className="orbital__sphere"></div></div>
      <div className="orbital__dot1"></div>
      <div className="orbital__dot2"></div>
      <div className="orbital__dot3"></div>
    </div>
  );
}

function NavBar({ current, onNav, locale, setLocale, onBook }) {
  return (
    <header className="nav">
      <Container>
        <div className="nav__inner">
          <button className="nav__brand" onClick={() => onNav("home")}>Bexovar</button>
          <nav className="nav__links" aria-label="Primary">
            {BX.nav.map(l => (
              <button key={l.slug} className="nav__link" aria-current={current === l.slug} onClick={() => onNav(l.slug)}>{l.label}</button>
            ))}
          </nav>
          <div className="nav__right">
            <div className="nav__lang" role="group" aria-label="Language">
              <button aria-pressed={locale === "en"} onClick={() => setLocale("en")}>EN</button>
              <button aria-pressed={locale === "es"} onClick={() => setLocale("es")}>ES</button>
            </div>
            <Button size="sm" onClick={onBook}>Book a call</Button>
          </div>
        </div>
      </Container>
    </header>
  );
}

function Footer({ onNav, onBook }) {
  return (
    <footer className="footer">
      <Container>
        <div className="footer__top">
          <div>
            <h3 className="footer__head">Services</h3>
            <ul>
              {BX.services.map(s => <li key={s.slug}><a onClick={(e) => { e.preventDefault(); onNav("services"); }} href="#">{s.title}</a></li>)}
            </ul>
          </div>
          <div>
            <h3 className="footer__head">Company</h3>
            <ul>
              <li><a onClick={(e) => { e.preventDefault(); onNav("about"); }} href="#">About</a></li>
              <li><a onClick={(e) => { e.preventDefault(); onNav("case-studies"); }} href="#">Case Studies</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="footer__head">Ready to talk?</h3>
            <p style={{ fontSize: 14, color: "var(--ink-muted)", margin: "0 0 16px", lineHeight: 1.55 }}>30-min call. See a live demo on your workflow.</p>
            <Button size="md" onClick={onBook}>Book a call</Button>
          </div>
        </div>
      </Container>
      <div className="footer__bottom">
        <Container>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "space-between" }}>
            <p style={{ margin: 0 }}>© {new Date().getFullYear()} Bexovar. All rights reserved.</p>
            <div className="links"><a href="#">LinkedIn</a><a href="#">hello@bexovar.io</a><a href="#">Privacy</a></div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

function StatBlock({ tag, headline, label }) {
  return (
    <div className="card">
      {tag && <span className="stat__tag">{tag}</span>}
      <p className="stat__num">{headline}</p>
      <p className="stat__lbl">{label}</p>
    </div>
  );
}

function ServiceCard({ service, onClick }) {
  return (
    <a className="card" href="#" onClick={(e) => { e.preventDefault(); onClick && onClick(service); }}>
      <h3 className="service__title">{service.title}</h3>
      <p className="service__summary">{service.summary}</p>
      <span className="service__link">Learn more →</span>
    </a>
  );
}

function ProcessStep({ step }) {
  return (
    <li className="card">
      <span className="step__bubble">{step.number}</span>
      <h3 className="h3" style={{ marginTop: 18 }}>{step.title}</h3>
      <p style={{ fontSize: 14, color: "var(--ink-muted)", margin: "8px 0 0", lineHeight: 1.55 }}>{step.summary}</p>
    </li>
  );
}

function DemoCard({ demo, onPlay }) {
  return (
    <article className="card demo-card">
      <div className="demo__poster">
        <img src={demo.poster} alt="" />
        <div className="demo__play">
          <button className="demo__play-btn" aria-label={`Play ${demo.title}`} onClick={() => onPlay && onPlay(demo)}>▶</button>
        </div>
      </div>
      <div className="demo__body">
        <div className="demo__meta"><span className="demo__pill">{demo.category}</span><span>{demo.duration}</span></div>
        <h3 className="demo__title">{demo.title}</h3>
        <p className="demo__summary">{demo.summary}</p>
      </div>
    </article>
  );
}

function CaseCard({ c, onClick }) {
  return (
    <a className="card" href="#" onClick={(e) => { e.preventDefault(); onClick && onClick(c); }}>
      <span className="casecard__tag">{c.industry}</span>
      <div className="casecard__metric">
        <span className="casecard__big">{c.metric}</span>
        <span className="casecard__lbl">{c.metricLabel}</span>
      </div>
      <p className="casecard__body">{c.summary}</p>
      <span className="casecard__link">Read case study →</span>
    </a>
  );
}

function CategoryFilter({ categories, active, onChange }) {
  const opts = ["All", ...categories];
  return (
    <div className="filter" role="group" aria-label="Filter by category">
      {opts.map(opt => (
        <button key={opt} className="filter__chip" aria-pressed={opt === active} onClick={() => onChange(opt)}>{opt}</button>
      ))}
    </div>
  );
}

function PhasePanel({ phase }) {
  return (
    <div className="phase">
      <div className="phase__head">
        <span className="phase__num">{phase.number}</span>
        <div>
          <h3 className="h3">{phase.title}</h3>
          <p style={{ fontSize: 14, color: "var(--ink-subtle)", margin: "4px 0 0" }}>{phase.duration}</p>
        </div>
      </div>
      <div className="phase__grid">
        <div>
          <Eyebrow sub>Deliverables</Eyebrow>
          <ul>{phase.deliverables.map(d => <li key={d}>{d}</li>)}</ul>
        </div>
        <div>
          <Eyebrow sub>Your role</Eyebrow>
          <p style={{ fontSize: 14, color: "var(--ink-muted)", margin: "12px 0 0", lineHeight: 1.6 }}>{phase.clientRole}</p>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ item, open, onToggle }) {
  return (
    <div className="faq__item">
      <button className="faq__row" onClick={onToggle} aria-expanded={open}>
        <span className="faq__q">{item.q}</span>
        <span className="faq__ico">{open ? "–" : "+"}</span>
      </button>
      {open && <p className="faq__a">{item.a}</p>}
    </div>
  );
}

function PullQuote({ quote, attribution }) {
  return (
    <figure className="pullquote">
      <blockquote>&ldquo;{quote}&rdquo;</blockquote>
      <figcaption>— {attribution}</figcaption>
    </figure>
  );
}

function CTASection({ heading, subtitle, onBook }) {
  return (
    <Section variant="dark">
      <div className="cta-band">
        <h2 className="h2" style={{ maxWidth: 720, margin: "0 auto" }}>{heading}</h2>
        {subtitle && <p className="lead">{subtitle}</p>}
        <div className="cta-band__actions">
          <Button size="lg" onClick={onBook}>Book a call</Button>
          <Button size="lg" variant="ghost-dark">Request a proposal</Button>
        </div>
      </div>
    </Section>
  );
}

Object.assign(window, {
  Container, Section, Button, Eyebrow, SectionHeader, OrbitalGraphic,
  NavBar, Footer, StatBlock, ServiceCard, ProcessStep, DemoCard, CaseCard,
  CategoryFilter, PhasePanel, FAQItem, PullQuote, CTASection,
});
