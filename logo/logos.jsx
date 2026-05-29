/* ============================================================================
   Bexovar — Logo explorations (round 3)
   Keep:
     1A — Orbit · tilted (unchanged)
     5A — Vector · ring — reworked: orbit traces a FIGURE-8 across the B,
           passing over its strokes instead of around the outside.
   New designs for the other 4 slots.
   ========================================================================== */

const SKY_600 = '#0284c7';
const SKY_500 = '#0ea5e9';
const SKY_400 = '#38bdf8';
const SKY_300 = '#7dd3fc';
const INK     = '#0f172a';

// =============================================================================
// 1A — ORBIT · TILTED (UNCHANGED from round 2 approval)
// =============================================================================
function MarkOrbitA({ size = 48, animated = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <ellipse cx="24" cy="24" rx="20" ry="6.5"
               stroke={SKY_600} strokeWidth="1.6" opacity="0.55" />
      <g transform="rotate(-28 24 24)">
        <ellipse cx="24" cy="24" rx="20" ry="11"
                 stroke={SKY_600} strokeWidth="1.8" />
      </g>
      <circle cx="24" cy="24" r="4.2" fill={SKY_600} />
      <circle cx="24" cy="24" r="1.6" fill="#fff" />
      <g style={animated ? { transformOrigin: '24px 24px', animation: 'orbit-spin 5s linear infinite' } : undefined}>
        <g transform="rotate(-28 24 24)">
          <circle cx="44" cy="24" r="2.8" fill={INK} />
        </g>
      </g>
      <g style={animated ? { transformOrigin: '24px 24px', animation: 'orbit-spin-rev 3.2s linear infinite' } : undefined}>
        <circle cx="40" cy="24" r="1.8" fill={SKY_400} />
      </g>
    </svg>
  );
}

// =============================================================================
// 1B — NEW: ORBIT · WAVE
//   A circular radio wave / sine ring. Audio-visualizer feel: a ring built
//   from vertical bars whose lengths ripple around the circumference.
// =============================================================================
function MarkOrbitB({ size = 48, animated = false }) {
  const N = 36;
  const barsRef = React.useRef(null);
  React.useEffect(() => {
    if (!animated) return;
    let raf, start = performance.now();
    const tick = (now) => {
      const t = (now - start) / 1000;
      const bars = barsRef.current?.children || [];
      for (let i = 0; i < N; i++) {
        const a = (i / N) * Math.PI * 2;
        const wave = 1 + 0.55 * Math.sin(a * 3 - t * 2.4);
        const len = 2.6 * wave;
        const el = bars[i];
        if (el) el.setAttribute('d', buildBar(a, len));
      }
      raf = requestAnimationFrame(tick);
    };
    const buildBar = (a, len) => {
      const r1 = 14, r2 = 14 + len;
      const x1 = 24 + Math.cos(a) * r1, y1 = 24 + Math.sin(a) * r1;
      const x2 = 24 + Math.cos(a) * r2, y2 = 24 + Math.sin(a) * r2;
      return `M${x1} ${y1} L${x2} ${y2}`;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animated]);

  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      {/* base ring */}
      <circle cx="24" cy="24" r="14" stroke={SKY_600} strokeWidth="1.2" opacity="0.35" />
      {/* bars */}
      <g ref={barsRef} stroke={SKY_600} strokeWidth="1.6" strokeLinecap="round">
        {Array.from({ length: N }).map((_, i) => {
          const a = (i / N) * Math.PI * 2;
          const r1 = 14, r2 = 17;
          const x1 = 24 + Math.cos(a) * r1, y1 = 24 + Math.sin(a) * r1;
          const x2 = 24 + Math.cos(a) * r2, y2 = 24 + Math.sin(a) * r2;
          return <path key={i} d={`M${x1} ${y1} L${x2} ${y2}`} />;
        })}
      </g>
      {/* core dot */}
      <circle cx="24" cy="24" r="3.2" fill={INK} />
      <circle cx="24" cy="24" r="1.4" fill="#fff" />
    </svg>
  );
}

// =============================================================================
// 1C — NEW: ORBIT · ARCS
//   Three open arc segments at different tilts, rotating at different speeds.
//   A comet-tail node trails along the outermost arc. Reads like orbital
//   trajectories captured mid-motion.
// =============================================================================
// =============================================================================
// 1C — NEW: ORBIT · ARCS
//   Three open arc segments at different tilts, rotating at different speeds.
//   Reads like orbital trajectories caught mid-motion — simple, confident, airy.
// =============================================================================
function MarkOrbitC({ size = 48, animated = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      {/* outer arc (270°) */}
      <g style={animated ? { transformOrigin: '24px 24px', animation: 'orbit-spin 7s linear infinite' } : undefined}>
        <path d="M24 4 A20 20 0 1 1 4 24" stroke={SKY_600} strokeWidth="1.8"
              strokeLinecap="round" fill="none" />
        <circle cx="24" cy="4" r="2.2" fill={INK} />
      </g>
      {/* middle arc (180°), reverse */}
      <g style={animated ? { transformOrigin: '24px 24px', animation: 'orbit-spin-rev 5s linear infinite' } : undefined}>
        <path d="M10 24 A14 14 0 0 1 38 24" stroke={SKY_600} strokeWidth="1.6"
              strokeLinecap="round" fill="none" opacity="0.75" />
        <circle cx="38" cy="24" r="1.8" fill={SKY_400} />
      </g>
      {/* inner arc (120°) */}
      <g style={animated ? { transformOrigin: '24px 24px', animation: 'orbit-spin 3.2s linear infinite' } : undefined}>
        <path d="M17 20 A8 8 0 0 1 31 20" stroke={SKY_600} strokeWidth="1.4"
              strokeLinecap="round" fill="none" opacity="0.55" />
      </g>
      {/* core */}
      <circle cx="24" cy="24" r="2.6" fill={INK} />
    </svg>
  );
}

function MarkOrbitCLegacy({ size = 48, animated = false }) {
  // Concentric rings of dots. Each dot is magnetically pulled TOWARD the
  // orbiting body as the orb passes near it — creating a traveling wave of
  // attraction that follows the orb around the field.
  const rings = [
    { r: 6,  n: 6,  sz: 1.4, o: 0.9  },
    { r: 10, n: 10, sz: 1.2, o: 0.7  },
    { r: 14, n: 14, sz: 1.0, o: 0.5  },
    { r: 18, n: 18, sz: 0.8, o: 0.32 },
  ];

  // Build flat dot list with base polar coords.
  const dots = [];
  rings.forEach((ring) => {
    for (let i = 0; i < ring.n; i++) {
      const a = (i / ring.n) * Math.PI * 2;
      dots.push({ a, r: ring.r, sz: ring.sz, o: ring.o });
    }
  });

  const groupRef = React.useRef(null);
  const orbRef = React.useRef(null);
  const coreRef = React.useRef(null);

  React.useEffect(() => {
    if (!animated) return;
    let raf;
    const start = performance.now();
    const period = 6000; // match 6s outer orbit
    const orbR = 22;     // orb rides on the outer framing ring

    const tick = (now) => {
      const t = ((now - start) % period) / period;
      const orbAng = t * Math.PI * 2;
      const ox = 24 + Math.cos(orbAng) * orbR;
      const oy = 24 + Math.sin(orbAng) * orbR;

      // Move the orb
      if (orbRef.current) {
        orbRef.current.setAttribute('cx', ox.toFixed(2));
        orbRef.current.setAttribute('cy', oy.toFixed(2));
      }

      // Core also leans toward the orb (magnetic field reaches the center)
      if (coreRef.current) {
        const cdx = ox - 24;
        const cdy = oy - 24;
        const cd = Math.hypot(cdx, cdy) || 1;
        const corePull = 3.5; // stronger than dots — the core is most attracted
        coreRef.current.setAttribute('cx', (24 + (cdx / cd) * corePull).toFixed(2));
        coreRef.current.setAttribute('cy', (24 + (cdy / cd) * corePull).toFixed(2));
      }

      // Nudge each dot toward the orb, scaled by proximity.
      const circles = groupRef.current?.children || [];
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const bx = 24 + Math.cos(d.a) * d.r;
        const by = 24 + Math.sin(d.a) * d.r;
        const dx = ox - bx;
        const dy = oy - by;
        const dist = Math.hypot(dx, dy);
        // Gaussian falloff with WIDE reach so the magnetic wave clearly
        // sweeps across the field as the orb moves.
        const sigma = 10;          // was 6 — influence radius ~3σ = 30px
        const influence = Math.exp(-(dist * dist) / (2 * sigma * sigma));
        const pull = 7 * influence;  // was 3.2 — much stronger deformation
        const nx = dist > 0.001 ? dx / dist : 0;
        const ny = dist > 0.001 ? dy / dist : 0;
        const cx = bx + nx * pull;
        const cy = by + ny * pull;
        const el = circles[i];
        if (el) {
          el.setAttribute('cx', cx.toFixed(2));
          el.setAttribute('cy', cy.toFixed(2));
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animated]);

  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      {/* outer framing ring */}
      <circle cx="24" cy="24" r="22" stroke={SKY_600} strokeWidth="1" opacity="0.4" />

      {/* Dot field */}
      <g ref={groupRef}>
        {dots.map((d, i) => {
          const bx = 24 + Math.cos(d.a) * d.r;
          const by = 24 + Math.sin(d.a) * d.r;
          return <circle key={i} cx={bx} cy={by} r={d.sz}
                         fill={SKY_600} opacity={d.o} />;
        })}
      </g>

      {/* glowing core — also pulled toward orb */}
      <circle ref={coreRef} cx="24" cy="24" r="2.4" fill={INK} />

      {/* Orbiting body — position updated in rAF so dots can follow */}
      <circle ref={orbRef} cx="46" cy="24" r="2.4" fill={INK} />
    </svg>
  );
}

// =============================================================================
// 5A — VECTOR · FIGURE-8
//   The chevron-bowl B with a node that travels the B's OWN lines in an
//   infinite figure-8: up the stem, around the upper bowl, across the waist
//   (crossing the stem), around the lower bowl, back across the waist, loop.
//   The path is drawn EXACTLY on top of the B's strokes so the dot never
//   leaves the letter.
// =============================================================================
function MarkVectorA({ size = 48, animated = false }) {
  // The node travels this exact path on top of the B:
  //   start top of stem → around upper bowl → down across stem to waist →
  //   around lower bowl → back up stem.
  const path = [
    'M14.5 11',
    'L27 11',
    'L33 17.5',
    'L27 24',
    'L14.5 24',
    'L28 24',
    'L34 30.5',
    'L28 37',
    'L14.5 37',
    'L14.5 11',
    'Z',
  ].join(' ');

  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true" overflow="visible">
      <defs>
        {/* Glow filter for the node so it reads clearly on top of the strokes */}
        <filter id="vecNodeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* The B */}
      <rect x="13" y="11" width="3" height="26" fill={INK} />
      <path d="M16 11 L27 11 L33 17.5 L27 24 L16 24"
            stroke={SKY_600} strokeWidth="3" strokeLinejoin="miter" fill="none" />
      <path d="M16 24 L28 24 L34 30.5 L28 37 L16 37"
            stroke={SKY_600} strokeWidth="3" strokeLinejoin="miter" fill="none" />

      {/* Motion path (invisible, but node sits EXACTLY on the letter strokes) */}
      <path id="vectorAPath" d={path} fill="none" stroke="none" />

      {/* Single node — black with a bright glow so it reads as an illuminated
          "bug" riding directly on top of the B's strokes. */}
      {animated ? (
        <g filter="url(#vecNodeGlow)">
          <circle r="2.8" fill={INK}>
            <animateMotion dur="4.5s" repeatCount="indefinite" rotate="0">
              <mpath href="#vectorAPath" />
            </animateMotion>
          </circle>
        </g>
      ) : (
        <circle cx="14.5" cy="11" r="2.8" fill={INK} />
      )}
    </svg>
  );
}

// =============================================================================
// 5B — NEW: VECTOR · SHADOW
//   The chevron-bowl B offset-duplicated in the sky color — a subtle shadow/
//   echo that gives the mark depth. Minimal, editorial.
// =============================================================================
function MarkVectorB({ size = 48, animated = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      {/* echo copy (behind, offset) */}
      <g transform="translate(3 3)" opacity="0.32">
        <rect x="13" y="11" width="3" height="26" fill={SKY_600} />
        <path d="M16 11 L27 11 L33 17.5 L27 24 L16 24"
              stroke={SKY_600} strokeWidth="3" strokeLinejoin="miter" fill="none" />
        <path d="M16 24 L28 24 L34 30.5 L28 37 L16 37"
              stroke={SKY_600} strokeWidth="3" strokeLinejoin="miter" fill="none" />
      </g>
      {/* foreground B */}
      <rect x="13" y="11" width="3" height="26" fill={INK} />
      <path d="M16 11 L27 11 L33 17.5 L27 24 L16 24"
            stroke={SKY_600} strokeWidth="3" strokeLinejoin="miter" fill="none" />
      <path d="M16 24 L28 24 L34 30.5 L28 37 L16 37"
            stroke={SKY_600} strokeWidth="3" strokeLinejoin="miter" fill="none" />
      {/* subtle animated breath on the echo */}
      {animated && (
        <rect x="10" y="11" width="28" height="26" fill="none">
          <animateTransform attributeName="transform" type="translate"
                            values="0 0; 1 1; 0 0" dur="3.2s" repeatCount="indefinite" />
        </rect>
      )}
    </svg>
  );
}

// =============================================================================
// 5C — NEW: VECTOR · SCANLINE
//   The B with a horizontal scan beam passing top-to-bottom; the portion of
//   the B it overlaps briefly "energizes" in sky-400. Clean, operational.
// =============================================================================
function MarkVectorC({ size = 48, animated = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <defs>
        <clipPath id="bClip">
          <rect x="13" y="11" width="22" height="26" />
        </clipPath>
      </defs>
      {/* B */}
      <rect x="13" y="11" width="3" height="26" fill={INK} />
      <path d="M16 11 L27 11 L33 17.5 L27 24 L16 24"
            stroke={SKY_600} strokeWidth="3" strokeLinejoin="miter" fill="none" />
      <path d="M16 24 L28 24 L34 30.5 L28 37 L16 37"
            stroke={SKY_600} strokeWidth="3" strokeLinejoin="miter" fill="none" />

      {/* scan beam — clipped to B bounding box */}
      {animated && (
        <g clipPath="url(#bClip)">
          <rect x="13" y="10" width="22" height="2.4" fill={SKY_400} opacity="0.85">
            <animate attributeName="y" values="10;38;10" dur="2.8s" repeatCount="indefinite" />
          </rect>
          {/* secondary softer trailing beam */}
          <rect x="13" y="6" width="22" height="5" fill={SKY_400} opacity="0.18">
            <animate attributeName="y" values="6;34;6" dur="2.8s" repeatCount="indefinite" />
          </rect>
        </g>
      )}
      {/* baseline tick */}
      <line x1="10" y1="40.5" x2="37" y2="40.5" stroke={SKY_600} strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}

// =============================================================================
// Wordmarks
// =============================================================================
const typeOrbit = {
  fontFamily: '"Inter", system-ui, sans-serif',
  fontWeight: 600,
  fontSize: '28px',
  letterSpacing: '-0.02em',
  color: INK,
};
const typeVector = {
  fontFamily: '"Inter", system-ui, sans-serif',
  fontWeight: 600,
  fontSize: '19px',
  letterSpacing: '0.22em',
  color: INK,
  textTransform: 'uppercase',
};

function Lockup({ Mark, wordmark, wordStyle, markSize = 44, gap = 12, animated = false }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap, lineHeight: 1 }}>
      <Mark size={markSize} animated={animated} />
      <span style={wordStyle}>{wordmark}</span>
    </div>
  );
}

function makeLogo(Mark, baseStyle, wordmark, defaultGap) {
  return function Logo({ markSize = 44, fontSize, gap, animated = false }) {
    const style = { ...baseStyle, ...(fontSize && { fontSize }) };
    return (
      <Lockup Mark={Mark} wordmark={wordmark} wordStyle={style}
              markSize={markSize} gap={gap ?? defaultGap} animated={animated} />
    );
  };
}

const LogoOrbitA  = makeLogo(MarkOrbitA,  typeOrbit,  'Bexovar', 14);
const LogoOrbitB  = makeLogo(MarkOrbitB,  typeOrbit,  'Bexovar', 14);
const LogoOrbitC  = makeLogo(MarkOrbitC,  typeOrbit,  'Bexovar', 14);
const LogoVectorA = makeLogo(MarkVectorA, typeVector, 'BEXOVAR', 14);
const LogoVectorB = makeLogo(MarkVectorB, typeVector, 'BEXOVAR', 14);
const LogoVectorC = makeLogo(MarkVectorC, typeVector, 'BEXOVAR', 14);

Object.assign(window, {
  MarkOrbitA, MarkOrbitB, MarkOrbitC,
  MarkVectorA, MarkVectorB, MarkVectorC,
  LogoOrbitA, LogoOrbitB, LogoOrbitC,
  LogoVectorA, LogoVectorB, LogoVectorC,
});
