// Bexovar Modern — shared React components for both directions.
// Consumes content from window.BexovarContent.
// Uses React.useState / React.useEffect (no destructure — global scope shared).

const BX2 = window.BexovarContent;

function ModContainer({ children, className }) {
  return <div className={`container ${className || ""}`}>{children}</div>;
}

function ModEyebrow({ children, accent }) {
  return <p className={`eyebrow ${accent ? "eyebrow--accent" : ""}`}>{children}</p>;
}

function ModButton({ children, variant = "primary", size, onClick, magnet = true, iconEnd }) {
  const cls = `btn btn--${variant}${size === "lg" ? " btn--lg" : size === "sm" ? " btn--sm" : ""}`;
  return (
    <button className={cls} onClick={onClick} data-magnet={magnet ? "1" : undefined}>
      {children}
      {iconEnd && <span className="arrow">→</span>}
    </button>
  );
}

function ModNav({ current, onNav, onBook }) {
  return (
    <header className="nav" data-reveal>
      <a className="nav__brand" onClick={(e) => { e.preventDefault(); onNav("home"); }} href="#">
        <span className="nav__dot"></span>Bexovar
      </a>
      <nav className="nav__links" aria-label="Primary">
        {BX2.nav.map(l => (
          <button key={l.slug} className="nav__link" aria-current={current === l.slug} onClick={() => onNav(l.slug)}>{l.label}</button>
        ))}
      </nav>
      <div className="nav__right">
        <ModButton variant="ghost" size="sm" onClick={onBook} magnet={false}>EN / ES</ModButton>
        <ModButton variant="primary" size="sm" onClick={onBook} iconEnd>Book a call</ModButton>
      </div>
    </header>
  );
}

function Orbital({ variant }) {
  return (
    <div className={`orbital ${variant === "b" ? "orbital--variant-b" : ""}`}>
      <div className="orbital__halo"></div>
      <div className="orbital__stage">
        <div className="orbital__ring orbital__ring--1"></div>
        <div className="orbital__ring orbital__ring--2"></div>
        <div className="orbital__ring orbital__ring--3"></div>
        <div className="orbital__core"><div className="orbital__sphere"></div></div>
        <div className="orbital__particle orbital__particle--1"></div>
        <div className="orbital__particle orbital__particle--warm orbital__particle--2"></div>
        <div className="orbital__particle orbital__particle--3"></div>
        <div className="orbital__particle orbital__particle--warm orbital__particle--4"></div>
      </div>
    </div>
  );
}

function ModStat({ tag, num, label, idx }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { window.BexovarModernFX.countUp(ref.current, num); io.disconnect(); }
    }, { threshold: 0.5 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [num]);
  return (
    <div className="card card--tilt" data-reveal data-reveal-delay={idx * 70}>
      {tag && <span className="stat__tag">{tag}</span>}
      <div ref={ref} className="stat__num">{num}</div>
      <div className="stat__lbl">{label}</div>
    </div>
  );
}

function ModService({ service, idx, onClick }) {
  return (
    <button className="card card--tilt" data-reveal data-reveal-delay={idx * 80} onClick={onClick} style={{ textAlign: "left", width: "100%" }}>
      <div className="service__icon">0{idx + 1}</div>
      <h3 className="service__title">{service.title}</h3>
      <p className="service__summary">{service.summary}</p>
      <span className="service__link">Learn more <span className="arrow">→</span></span>
    </button>
  );
}

function ModProcessStep({ step, idx }) {
  return (
    <div className="card" data-reveal data-reveal-delay={idx * 80}>
      <span className="step__num">Phase 0{step.number}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span className="step__bubble">{step.number}</span>
        <h3 className="h3">{step.title}</h3>
      </div>
      <p style={{ fontSize: 13.5, color: "var(--ink-muted)", marginTop: 14, lineHeight: 1.55 }}>{step.summary}</p>
    </div>
  );
}

function ModDemo({ demo, idx, onPlay }) {
  return (
    <article className="card card--tilt demo" data-reveal data-reveal-delay={idx * 60} onClick={() => onPlay && onPlay(demo)}>
      <div className="demo__poster">
        <img src={demo.poster} alt="" />
        <div className="demo__play"><span className="demo__play-btn">▶</span></div>
      </div>
      <div className="demo__body">
        <div className="demo__meta"><span className="demo__pill">{demo.category}</span><span>{demo.duration}</span></div>
        <h3 className="demo__title">{demo.title}</h3>
        <p className="demo__summary">{demo.summary}</p>
      </div>
    </article>
  );
}

function ModCase({ c, idx }) {
  return (
    <a className="card card--tilt" href="#" onClick={(e) => e.preventDefault()} data-reveal data-reveal-delay={idx * 80}>
      <span className="casecard__tag">{c.industry}</span>
      <div className="casecard__metric">
        <span className="casecard__big">{c.metric}</span>
        <span className="casecard__lbl">{c.metricLabel}</span>
      </div>
      <p className="casecard__body">{c.summary}</p>
      <span className="casecard__link">Read case study <span className="arrow">→</span></span>
    </a>
  );
}

function ModFilter({ categories, active, onChange }) {
  const opts = ["All", ...categories];
  return (
    <div className="filter" data-reveal>
      {opts.map(o => (
        <button key={o} className="filter__chip" aria-pressed={o === active} onClick={() => onChange(o)}>{o}</button>
      ))}
    </div>
  );
}

function ModPhase({ phase, idx }) {
  return (
    <div className="phase" data-reveal data-reveal-delay={idx * 90}>
      <div className="phase__head">
        <span className="phase__num">{phase.number}</span>
        <div>
          <h3 className="h3">{phase.title}</h3>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-subtle)", margin: "4px 0 0", letterSpacing: "0.05em" }}>{phase.duration}</p>
        </div>
      </div>
      <div className="phase__grid">
        <div>
          <ModEyebrow>Deliverables</ModEyebrow>
          <ul>{phase.deliverables.map(d => <li key={d}>{d}</li>)}</ul>
        </div>
        <div>
          <ModEyebrow>Your role</ModEyebrow>
          <p style={{ fontSize: 13.5, color: "var(--ink-muted)", marginTop: 12, lineHeight: 1.65 }}>{phase.clientRole}</p>
        </div>
      </div>
    </div>
  );
}

function ModFaq({ item, open, onToggle }) {
  return (
    <div className="faq__item" data-open={open} data-reveal>
      <button className="faq__row" onClick={onToggle} aria-expanded={open}>
        <span className="faq__q">{item.q}</span>
        <span className="faq__ico">+</span>
      </button>
      {open && <p className="faq__a">{item.a}</p>}
    </div>
  );
}

function ModPullQuote({ quote, attribution }) {
  return (
    <figure className="pullquote" data-reveal>
      <blockquote>&ldquo;{quote}&rdquo;</blockquote>
      <figcaption>— {attribution}</figcaption>
    </figure>
  );
}

function ModCta({ heading, subtitle, onBook }) {
  return (
    <section data-reveal>
      <ModContainer>
        <div className="cta">
          <h2 className="h2">{heading}</h2>
          {subtitle && <p className="lead">{subtitle}</p>}
          <div className="cta__actions">
            <ModButton variant="warm" size="lg" onClick={onBook} iconEnd>Book a call</ModButton>
            <ModButton variant="ghost-dark" size="lg" magnet={false}>Request a proposal</ModButton>
          </div>
        </div>
      </ModContainer>
    </section>
  );
}

function ModFooter({ onNav, onBook }) {
  return (
    <footer className="footer">
      <ModContainer>
        <div className="footer__top">
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--ink)", marginBottom: 10 }}>
              <span className="nav__dot"></span>Bexovar
            </div>
            <p style={{ fontSize: 13, color: "var(--ink-muted)", maxWidth: 280, lineHeight: 1.55 }}>Software and automation for mid-market operators. Measured, not promised.</p>
          </div>
          <div>
            <h3 className="footer__head">Services</h3>
            <ul>{BX2.services.map(s => <li key={s.slug}><a onClick={(e) => { e.preventDefault(); onNav("services"); }} href="#">{s.title}</a></li>)}</ul>
          </div>
          <div>
            <h3 className="footer__head">Company</h3>
            <ul>
              <li><a onClick={(e) => { e.preventDefault(); onNav("about"); }} href="#">About</a></li>
              <li><a onClick={(e) => { e.preventDefault(); onNav("case-studies"); }} href="#">Case Studies</a></li>
              <li><a onClick={(e) => { e.preventDefault(); onNav("how-we-work"); }} href="#">How we work</a></li>
            </ul>
          </div>
          <div>
            <h3 className="footer__head">Talk to us</h3>
            <ul>
              <li><a href="#">hello@bexovar.io</a></li>
              <li><a href="#">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Bexovar. All rights reserved.</span>
          <span style={{ fontFamily: "var(--font-mono)" }}>v2.0 · built with care</span>
        </div>
      </ModContainer>
    </footer>
  );
}

// --------- Page assembly ---------

function ModHome({ onNav, onBook }) {
  return (
    <div data-screen-label="01 Home">
      <section>
        <ModContainer>
          <div className="hero">
            <div>
              <span className="hero__badge" data-reveal>New · Automation ROI calculator</span>
              <h1 className="display" data-reveal>Cut your ops team's busywork by <em>30–60%.</em> Measured, not promised.</h1>
              <p className="lead" data-reveal data-reveal-delay="80">{BX2.home.hero.body}</p>
              <div className="hero__cta" data-reveal data-reveal-delay="160">
                <ModButton variant="primary" size="lg" onClick={onBook} iconEnd>Book a call</ModButton>
                <ModButton variant="ghost" size="lg" onClick={() => onNav("demos")}>See demos</ModButton>
              </div>
              <div className="hero__meta" data-reveal data-reveal-delay="240">
                <span>Finance</span><span>Logistics</span><span>Healthcare</span><span>Manufacturing</span><span>Retail</span>
              </div>
            </div>
            <div data-reveal data-reveal-delay="120"><Orbital /></div>
          </div>
        </ModContainer>
      </section>

      <section>
        <ModContainer>
          <ModEyebrow accent>Proof</ModEyebrow>
          <h2 className="h2" data-reveal>Real outcomes, real clients.</h2>
          <p className="lead" data-reveal data-reveal-delay="60">Names withheld under NDA. Metrics verified.</p>
          <div className="grid grid--4" style={{ marginTop: 48 }}>
            {BX2.home.metrics.map((m, i) => <ModStat key={m.industry} tag={m.industry} num={m.headline} label={m.detail} idx={i} />)}
          </div>
        </ModContainer>
      </section>

      <section>
        <ModContainer>
          <ModEyebrow accent>Demos</ModEyebrow>
          <h2 className="h2" data-reveal>See it in action.</h2>
          <p className="lead" data-reveal data-reveal-delay="60">Short demos of automation we've actually shipped.</p>
          <div className="grid grid--3" style={{ marginTop: 48 }}>
            {BX2.demos.slice(0, 3).map((d, i) => <ModDemo key={d.slug} demo={d} idx={i} />)}
          </div>
          <div style={{ marginTop: 32 }}>
            <ModButton variant="ghost" onClick={() => onNav("demos")} iconEnd>Browse the full gallery</ModButton>
          </div>
        </ModContainer>
      </section>

      <section>
        <ModContainer>
          <ModEyebrow accent>Services</ModEyebrow>
          <h2 className="h2" data-reveal>What we build.</h2>
          <p className="lead" data-reveal data-reveal-delay="60">Most engagements blend these. We help you pick the mix.</p>
          <div className="grid grid--4" style={{ marginTop: 48 }}>
            {BX2.services.map((s, i) => <ModService key={s.slug} service={s} idx={i} onClick={() => onNav("services")} />)}
          </div>
        </ModContainer>
      </section>

      <section>
        <ModContainer>
          <ModEyebrow accent>How we work</ModEyebrow>
          <h2 className="h2" data-reveal>Predictable process. No mystery.</h2>
          <div className="grid grid--4" style={{ marginTop: 48 }}>
            {BX2.home.process.map((s, i) => <ModProcessStep key={s.number} step={s} idx={i} />)}
          </div>
        </ModContainer>
      </section>

      <ModCta heading={BX2.home.closingCta.heading} subtitle={BX2.home.closingCta.subtitle} onBook={onBook} />
    </div>
  );
}

function ModServices({ onNav, onBook }) {
  return (
    <div data-screen-label="02 Services">
      <section>
        <ModContainer>
          <ModEyebrow accent>What we build</ModEyebrow>
          <h1 className="display" data-reveal>Four services, <em>one outcome:</em> your team gets their time back.</h1>
          <p className="lead" data-reveal data-reveal-delay="60">Most of our engagements blend these. We'll help you figure out which mix fits.</p>
        </ModContainer>
      </section>
      <section>
        <ModContainer>
          <div className="grid grid--2" style={{ gap: 24 }}>
            {BX2.services.map((s, i) => (
              <div key={s.slug} className="card card--tilt" data-reveal data-reveal-delay={i * 70} style={{ padding: 32 }}>
                <div className="service__icon">0{i + 1}</div>
                <ModEyebrow accent>{s.title}</ModEyebrow>
                <h2 className="h3" style={{ fontSize: 24, marginTop: 6 }}>{s.tagline}</h2>
                <p style={{ fontSize: 14.5, color: "var(--ink-muted)", marginTop: 12, lineHeight: 1.6 }}>{s.summary}</p>
                <ModEyebrow>What this looks like in practice</ModEyebrow>
                <ul style={{ paddingLeft: 18, color: "var(--ink-muted)", fontSize: 13.5, lineHeight: 1.7, margin: "4px 0 0" }}>
                  {s.examples.map(e => <li key={e}>{e}</li>)}
                </ul>
                <div style={{ marginTop: 20, padding: 16, borderRadius: 12, background: "linear-gradient(135deg, rgba(2,132,199,0.08), rgba(249,115,22,0.08))", border: "1px solid rgba(2,132,199,0.15)" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.02em" }}>{s.miniCase.headline}</div>
                  <div style={{ fontSize: 13, color: "var(--ink-muted)", marginTop: 4 }}>{s.miniCase.summary}</div>
                </div>
              </div>
            ))}
          </div>
        </ModContainer>
      </section>
      <ModCta heading="Not sure which service you need?" subtitle="Book a call — we'll help you scope it before anyone writes a line of code." onBook={onBook} />
    </div>
  );
}

function ModDemos({ onBook }) {
  const [cat, setCat] = React.useState("All");
  const list = cat === "All" ? BX2.demos : BX2.demos.filter(d => d.category === cat);
  return (
    <div data-screen-label="03 Demos">
      <section>
        <ModContainer>
          <ModEyebrow accent>Demos</ModEyebrow>
          <h1 className="display" data-reveal>Demos we've <em>actually shipped.</em></h1>
          <p className="lead" data-reveal data-reveal-delay="60">Across finance, logistics, healthcare, RPA, integrations, and AI agents.</p>
          <div style={{ marginTop: 40 }}><ModFilter categories={BX2.demoCategories} active={cat} onChange={setCat} /></div>
          <div className="grid grid--3" style={{ marginTop: 40 }}>
            {list.map((d, i) => <ModDemo key={d.slug} demo={d} idx={i} />)}
          </div>
        </ModContainer>
      </section>
      <ModCta heading="Want a live demo on your data?" subtitle="30-min call. We'll run one on your actual workflow." onBook={onBook} />
    </div>
  );
}

function ModCases({ onBook }) {
  const [cat, setCat] = React.useState("All");
  const list = cat === "All" ? BX2.cases : BX2.cases.filter(c => c.industry === cat);
  return (
    <div data-screen-label="04 Case Studies">
      <section>
        <ModContainer>
          <ModEyebrow accent>Case studies</ModEyebrow>
          <h1 className="display" data-reveal>The numbers, with <em>the work</em> behind them.</h1>
          <p className="lead" data-reveal data-reveal-delay="60">Anonymized engagements backing our headline numbers. Filter by industry.</p>
          <div style={{ marginTop: 40 }}><ModFilter categories={BX2.caseCategories} active={cat} onChange={setCat} /></div>
          <div className="grid grid--2" style={{ marginTop: 40 }}>
            {list.map((c, i) => <ModCase key={c.slug} c={c} idx={i} />)}
          </div>
          <div style={{ marginTop: 48 }}>
            <ModPullQuote quote="We expected a tool. We got a process that runs without us — and the docs to prove it." attribution="VP of Operations, logistics provider" />
          </div>
        </ModContainer>
      </section>
      <ModCta heading="Your case study could be next." subtitle="Book a call. Bring your messiest process." onBook={onBook} />
    </div>
  );
}

function ModHowWeWork({ onBook }) {
  const [open, setOpen] = React.useState(0);
  const hww = BX2.howWeWork;
  return (
    <div data-screen-label="05 How We Work">
      <section>
        <ModContainer>
          <div className="hero">
            <div>
              <ModEyebrow accent>{hww.hero.eyebrow}</ModEyebrow>
              <h1 className="display" data-reveal>{hww.hero.title}</h1>
              <p className="lead" data-reveal data-reveal-delay="80">{hww.hero.body}</p>
            </div>
            <div data-reveal data-reveal-delay="120"><Orbital variant="b" /></div>
          </div>
        </ModContainer>
      </section>
      <section>
        <ModContainer>
          <ModEyebrow accent>The four phases</ModEyebrow>
          <h2 className="h2" data-reveal>Same shape every time.</h2>
          <div style={{ display: "grid", gap: 20, marginTop: 48 }}>
            {hww.phases.map((p, i) => <ModPhase key={p.number} phase={p} idx={i} />)}
          </div>
        </ModContainer>
      </section>
      <section>
        <ModContainer>
          <ModEyebrow accent>Questions</ModEyebrow>
          <h2 className="h2" data-reveal>Things execs usually ask.</h2>
          <div style={{ marginTop: 40, maxWidth: 820 }}>
            {hww.faq.map((f, i) => <ModFaq key={f.q} item={f} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />)}
          </div>
        </ModContainer>
      </section>
      <ModCta heading="Start with a 30-minute call." subtitle="We'll tell you whether your problem fits our shape — honestly — before we quote anything." onBook={onBook} />
    </div>
  );
}

function ModAbout({ onBook }) {
  const a = BX2.about;
  return (
    <div data-screen-label="06 About">
      <section>
        <ModContainer>
          <ModEyebrow accent>{a.hero.eyebrow}</ModEyebrow>
          <h1 className="display" data-reveal>We build the software <em>your operators</em> wish they had.</h1>
          <p className="lead" data-reveal data-reveal-delay="80">{a.hero.body}</p>
        </ModContainer>
      </section>
      <section>
        <ModContainer>
          <ModEyebrow accent>Values</ModEyebrow>
          <h2 className="h2" data-reveal>How we operate.</h2>
          <div className="grid grid--2" style={{ marginTop: 48 }}>
            {a.values.map((v, i) => (
              <div key={v.title} className="card card--tilt" data-reveal data-reveal-delay={i * 80}>
                <h3 className="h3">{v.title}</h3>
                <p style={{ fontSize: 14.5, color: "var(--ink-muted)", marginTop: 12, lineHeight: 1.65 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </ModContainer>
      </section>
      <section>
        <ModContainer>
          <ModEyebrow accent>By the numbers</ModEyebrow>
          <h2 className="h2" data-reveal>A bit of context.</h2>
          <div className="grid grid--3" style={{ marginTop: 48 }}>
            {a.stats.map((s, i) => <ModStat key={s.headline} num={s.headline} label={s.label} idx={i} />)}
          </div>
        </ModContainer>
      </section>
      <ModCta heading="Want to know if we're a fit?" subtitle="Book a 30-min call. If we're not, we'll tell you." onBook={onBook} />
    </div>
  );
}

function ModApp({ variant }) {
  const [page, setPage] = React.useState("home");
  const [book, setBook] = React.useState(false);
  React.useEffect(() => {
    // Re-init modern FX whenever page switches.
    const t = setTimeout(() => window.BexovarModernFX && window.BexovarModernFX.initAll(), 40);
    return () => clearTimeout(t);
  }, [page]);
  const onBook = () => setBook(true);
  const pages = {
    home: <ModHome onNav={setPage} onBook={onBook} />,
    services: <ModServices onNav={setPage} onBook={onBook} />,
    demos: <ModDemos onBook={onBook} />,
    "case-studies": <ModCases onBook={onBook} />,
    "how-we-work": <ModHowWeWork onBook={onBook} />,
    about: <ModAbout onBook={onBook} />,
  };
  return (
    <div className={`mod mod-scope ${variant === "gradient" ? "mod--gradient" : "mod--glass"}`}>
      <ModContainer><ModNav current={page} onNav={setPage} onBook={onBook} /></ModContainer>
      <main>{pages[page] || pages.home}</main>
      <ModContainer><ModFooter onNav={setPage} onBook={onBook} /></ModContainer>
      {book && (
        <div onClick={() => setBook(false)} style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.6)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 24 }}>
          <div onClick={e => e.stopPropagation()} className="card" style={{ maxWidth: 460, width: "100%", padding: 32, background: "#fff" }}>
            <ModEyebrow accent>Book a call</ModEyebrow>
            <h2 className="h2" style={{ fontSize: 28 }}>30 minutes. No fluff.</h2>
            <p style={{ fontSize: 14.5, color: "var(--ink-muted)", marginTop: 12, lineHeight: 1.6 }}>This is where a Cal.com embed would load.</p>
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <ModButton variant="primary" onClick={() => setBook(false)}>Confirm</ModButton>
              <ModButton variant="ghost" onClick={() => setBook(false)}>Close</ModButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, {
  ModContainer, ModEyebrow, ModButton, ModNav, Orbital, ModStat, ModService, ModProcessStep,
  ModDemo, ModCase, ModFilter, ModPhase, ModFaq, ModPullQuote, ModCta, ModFooter,
  ModHome, ModServices, ModDemos, ModCases, ModHowWeWork, ModAbout, ModApp,
});
