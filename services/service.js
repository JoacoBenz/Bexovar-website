// Service detail page — reads body[data-service-slug], renders from BX_I18N + BX_SERVICES.

(function () {
  'use strict';

  // Service-specific visual motifs (SVG). Each is a different abstraction
  // of the service idea, so the 4 pages feel distinct at a glance.
  const MOTIFS = {
    // Custom software — stacked panels / an "app window" composed of modular blocks
    'custom-software': `
      <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cs-g1" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#0284c7"/>
            <stop offset="100%" stop-color="#38bdf8"/>
          </linearGradient>
          <linearGradient id="cs-g2" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#e0f2fe" stop-opacity="1"/>
            <stop offset="100%" stop-color="#ffffff" stop-opacity="1"/>
          </linearGradient>
        </defs>
        <!-- Background card: full app shell -->
        <g filter="none">
          <rect x="40" y="60" width="320" height="280" rx="20" fill="var(--bx-bg-card)" stroke="var(--bx-line)" stroke-width="1"/>
          <!-- window chrome -->
          <rect x="40" y="60" width="320" height="32" rx="20" fill="url(#cs-g2)" stroke="none"/>
          <rect x="40" y="78" width="320" height="14" fill="url(#cs-g2)"/>
          <line x1="40" y1="92" x2="360" y2="92" stroke="var(--bx-line)" stroke-width="1"/>
          <circle cx="58" cy="76" r="4" fill="#ef4444"/>
          <circle cx="72" cy="76" r="4" fill="#f59e0b"/>
          <circle cx="86" cy="76" r="4" fill="#22c55e"/>

          <!-- sidebar -->
          <rect x="40" y="92" width="82" height="248" fill="var(--bx-bg-soft)"/>
          <line x1="122" y1="92" x2="122" y2="340" stroke="var(--bx-line)" stroke-width="1"/>
          <rect x="52" y="108" width="58" height="8" rx="2" fill="var(--bx-ink-10)"/>
          <rect x="52" y="126" width="40" height="6" rx="2" fill="var(--bx-ink-10)" opacity="0.7"/>
          <rect x="52" y="142" width="48" height="6" rx="2" fill="var(--bx-ink-10)" opacity="0.5"/>
          <rect x="52" y="158" width="44" height="6" rx="2" fill="var(--bx-ink-10)" opacity="0.5"/>
          <rect x="48" y="196" width="66" height="22" rx="6" fill="#0284c7" opacity="0.1"/>
          <rect x="54" y="204" width="54" height="6" rx="2" fill="#0284c7"/>

          <!-- main content: tiles -->
          <rect x="140" y="110" width="94" height="64" rx="8" fill="url(#cs-g1)" opacity="0.2"/>
          <rect x="140" y="110" width="94" height="64" rx="8" stroke="#0284c7" stroke-opacity="0.4" stroke-width="1" fill="none"/>
          <rect x="152" y="124" width="28" height="6" rx="2" fill="#0284c7"/>
          <text x="152" y="160" font-family="monospace" font-size="22" font-weight="700" fill="#0284c7">42%</text>

          <rect x="246" y="110" width="94" height="64" rx="8" fill="var(--bx-bg-soft)"/>
          <rect x="246" y="110" width="94" height="64" rx="8" stroke="var(--bx-line)" stroke-width="1" fill="none"/>
          <rect x="258" y="124" width="28" height="6" rx="2" fill="var(--bx-ink-30)"/>
          <text x="258" y="160" font-family="monospace" font-size="22" font-weight="700" fill="var(--bx-ink)">1.2k</text>

          <!-- main table -->
          <rect x="140" y="188" width="200" height="140" rx="8" fill="var(--bx-bg-soft)" stroke="var(--bx-line)" stroke-width="1"/>
          <line x1="140" y1="210" x2="340" y2="210" stroke="var(--bx-line)" stroke-width="1"/>
          <g fill="var(--bx-ink-10)">
            <rect x="152" y="222" width="60" height="5" rx="2"/>
            <rect x="220" y="222" width="40" height="5" rx="2"/>
            <rect x="268" y="222" width="30" height="5" rx="2"/>
            <rect x="306" y="222" width="22" height="5" rx="2" fill="#22c55e"/>

            <rect x="152" y="244" width="70" height="5" rx="2"/>
            <rect x="220" y="244" width="36" height="5" rx="2"/>
            <rect x="268" y="244" width="30" height="5" rx="2"/>
            <rect x="306" y="244" width="22" height="5" rx="2" fill="#f59e0b"/>

            <rect x="152" y="266" width="52" height="5" rx="2"/>
            <rect x="220" y="266" width="44" height="5" rx="2"/>
            <rect x="268" y="266" width="30" height="5" rx="2"/>
            <rect x="306" y="266" width="22" height="5" rx="2" fill="#22c55e"/>

            <rect x="152" y="288" width="64" height="5" rx="2"/>
            <rect x="220" y="288" width="40" height="5" rx="2"/>
            <rect x="268" y="288" width="30" height="5" rx="2"/>
            <rect x="306" y="288" width="22" height="5" rx="2" fill="#22c55e"/>

            <rect x="152" y="310" width="56" height="5" rx="2"/>
            <rect x="220" y="310" width="48" height="5" rx="2"/>
            <rect x="268" y="310" width="30" height="5" rx="2"/>
            <rect x="306" y="310" width="22" height="5" rx="2" fill="#0284c7"/>
          </g>
        </g>
        <!-- Floating badge: code mark -->
        <g transform="translate(300 30)">
          <rect width="80" height="40" rx="10" fill="#0284c7"/>
          <text x="40" y="26" font-family="monospace" font-size="12" font-weight="700" fill="#fff" text-anchor="middle">&lt; / &gt;</text>
        </g>
      </svg>
    `,

    // RPA & Agents — flowchart of steps connected by wires; a bot cursor walking through
    'rpa-agents': `
      <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ra-g1" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#0284c7"/>
            <stop offset="100%" stop-color="#38bdf8"/>
          </linearGradient>
        </defs>

        <!-- connecting wires -->
        <g stroke="var(--bx-line)" stroke-width="1.5" fill="none">
          <path d="M100 110 L180 110 L180 200" />
          <path d="M300 110 L220 110 L220 200" />
          <path d="M200 260 L200 330" />
        </g>

        <!-- animated data packets -->
        <g>
          <circle r="4" fill="#0284c7">
            <animateMotion dur="3s" repeatCount="indefinite" path="M100 110 L180 110 L180 200"/>
          </circle>
          <circle r="4" fill="#38bdf8">
            <animateMotion dur="3s" begin="0.8s" repeatCount="indefinite" path="M300 110 L220 110 L220 200"/>
          </circle>
          <circle r="4" fill="#0284c7">
            <animateMotion dur="2s" begin="1.6s" repeatCount="indefinite" path="M200 260 L200 330"/>
          </circle>
        </g>

        <!-- Step 1: Email -->
        <g>
          <rect x="50" y="80" width="100" height="60" rx="10" fill="var(--bx-bg-card)" stroke="var(--bx-line)" stroke-width="1"/>
          <rect x="60" y="92" width="80" height="36" rx="4" fill="var(--bx-bg-soft)"/>
          <line x1="65" y1="100" x2="105" y2="100" stroke="var(--bx-ink-10)" stroke-width="3" stroke-linecap="round"/>
          <line x1="65" y1="108" x2="120" y2="108" stroke="var(--bx-ink-10)" stroke-width="2" stroke-linecap="round"/>
          <line x1="65" y1="116" x2="95" y2="116" stroke="var(--bx-ink-10)" stroke-width="2" stroke-linecap="round"/>
          <text x="100" y="158" font-family="monospace" font-size="10" fill="var(--bx-ink-50)" text-anchor="middle">INTAKE</text>
        </g>

        <!-- Step 2: API -->
        <g>
          <rect x="250" y="80" width="100" height="60" rx="10" fill="var(--bx-bg-card)" stroke="var(--bx-line)" stroke-width="1"/>
          <text x="300" y="118" font-family="monospace" font-size="18" font-weight="700" fill="#0284c7" text-anchor="middle">{ }</text>
          <text x="300" y="158" font-family="monospace" font-size="10" fill="var(--bx-ink-50)" text-anchor="middle">API</text>
        </g>

        <!-- Step 3 (center): Agent/Bot -->
        <g>
          <rect x="140" y="200" width="120" height="90" rx="14" fill="url(#ra-g1)"/>
          <!-- bot face -->
          <rect x="160" y="218" width="80" height="52" rx="10" fill="rgba(255,255,255,0.96)"/>
          <circle cx="182" cy="238" r="4" fill="#0284c7"/>
          <circle cx="218" cy="238" r="4" fill="#0284c7"/>
          <rect x="178" y="252" width="44" height="4" rx="2" fill="#0284c7" opacity="0.4"/>
          <!-- antenna -->
          <line x1="200" y1="200" x2="200" y2="188" stroke="#0284c7" stroke-width="2"/>
          <circle cx="200" cy="184" r="4" fill="#0284c7">
            <animate attributeName="r" values="3;5;3" dur="1.8s" repeatCount="indefinite"/>
          </circle>
          <text x="200" y="305" font-family="monospace" font-size="10" fill="var(--bx-ink-50)" text-anchor="middle">AGENT</text>
        </g>

        <!-- Step 4: ERP record -->
        <g>
          <rect x="140" y="330" width="120" height="54" rx="10" fill="var(--bx-bg-card)" stroke="var(--bx-line)" stroke-width="1"/>
          <rect x="152" y="342" width="96" height="6" rx="2" fill="#22c55e" opacity="0.6"/>
          <rect x="152" y="354" width="64" height="4" rx="2" fill="var(--bx-ink-10)"/>
          <rect x="152" y="364" width="80" height="4" rx="2" fill="var(--bx-ink-10)"/>
          <path d="M226 358 L232 364 L242 352" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        </g>
      </svg>
    `,

    // Integrations — two orbits meeting, handshake; interlocking rings
    'integrations': `
      <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="in-g1" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#0284c7"/>
            <stop offset="100%" stop-color="#38bdf8"/>
          </linearGradient>
        </defs>

        <!-- Background grid -->
        <g opacity="0.15" stroke="var(--bx-ink-30)" stroke-width="1">
          <line x1="0" y1="100" x2="400" y2="100"/>
          <line x1="0" y1="200" x2="400" y2="200"/>
          <line x1="0" y1="300" x2="400" y2="300"/>
          <line x1="100" y1="0" x2="100" y2="400"/>
          <line x1="200" y1="0" x2="200" y2="400"/>
          <line x1="300" y1="0" x2="300" y2="400"/>
        </g>

        <!-- Left node cluster -->
        <g>
          <circle cx="120" cy="200" r="70" fill="var(--bx-bg-card)" stroke="var(--bx-line)" stroke-width="1"/>
          <circle cx="120" cy="200" r="70" fill="none" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="3 5" opacity="0.5">
            <animateTransform attributeName="transform" type="rotate" from="0 120 200" to="360 120 200" dur="40s" repeatCount="indefinite"/>
          </circle>
          <circle cx="120" cy="200" r="40" fill="url(#in-g1)" opacity="0.9"/>
          <text x="120" y="206" font-family="monospace" font-size="14" font-weight="700" fill="#fff" text-anchor="middle">CRM</text>
          <!-- satellites -->
          <g>
            <circle cx="60" cy="200" r="6" fill="#0284c7"/>
            <circle cx="180" cy="200" r="6" fill="#0284c7"/>
            <circle cx="120" cy="140" r="6" fill="#0284c7"/>
            <circle cx="120" cy="260" r="6" fill="#0284c7"/>
            <animateTransform attributeName="transform" type="rotate" from="0 120 200" to="360 120 200" dur="22s" repeatCount="indefinite"/>
          </g>
        </g>

        <!-- Right node cluster -->
        <g>
          <circle cx="280" cy="200" r="70" fill="var(--bx-bg-card)" stroke="var(--bx-line)" stroke-width="1"/>
          <circle cx="280" cy="200" r="70" fill="none" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="3 5" opacity="0.5">
            <animateTransform attributeName="transform" type="rotate" from="360 280 200" to="0 280 200" dur="40s" repeatCount="indefinite"/>
          </circle>
          <circle cx="280" cy="200" r="40" fill="url(#in-g1)" opacity="0.9"/>
          <text x="280" y="206" font-family="monospace" font-size="14" font-weight="700" fill="#fff" text-anchor="middle">ERP</text>
          <g>
            <circle cx="220" cy="200" r="6" fill="#38bdf8"/>
            <circle cx="340" cy="200" r="6" fill="#38bdf8"/>
            <circle cx="280" cy="140" r="6" fill="#38bdf8"/>
            <circle cx="280" cy="260" r="6" fill="#38bdf8"/>
            <animateTransform attributeName="transform" type="rotate" from="360 280 200" to="0 280 200" dur="22s" repeatCount="indefinite"/>
          </g>
        </g>

        <!-- Bidirectional data bridge -->
        <g>
          <path d="M160 200 L240 200" stroke="#0284c7" stroke-width="2" stroke-dasharray="4 4" opacity="0.3"/>
          <!-- packet flying right -->
          <rect x="-6" y="-4" width="12" height="8" rx="2" fill="#0284c7">
            <animateMotion dur="2.4s" repeatCount="indefinite" path="M160 200 L240 200"/>
          </rect>
          <!-- packet flying left -->
          <rect x="-6" y="-4" width="12" height="8" rx="2" fill="#38bdf8">
            <animateMotion dur="2.4s" begin="1.2s" repeatCount="indefinite" path="M240 200 L160 200"/>
          </rect>
        </g>

        <!-- sync badge -->
        <g transform="translate(178 78)">
          <rect width="44" height="22" rx="11" fill="var(--bx-bg-card)" stroke="var(--bx-sky-600)" stroke-width="1"/>
          <path d="M12 11 L8 11 M12 11 C12 8.2 14.2 6 17 6 C19.8 6 22 8.2 22 11 M22 11 L26 11 M22 11 C22 13.8 19.8 16 17 16 C14.2 16 12 13.8 12 11" stroke="#0284c7" stroke-width="1.5" fill="none" stroke-linecap="round" transform="translate(5 0)"/>
          <text x="34" y="15" font-family="monospace" font-size="9" font-weight="700" fill="#0284c7">SYNC</text>
        </g>
      </svg>
    `,

    // Consulting — blueprint / process map; paper with a sharp pen
    'consulting': `
      <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="co-g1" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#0284c7"/>
            <stop offset="100%" stop-color="#38bdf8"/>
          </linearGradient>
        </defs>

        <!-- Paper (blueprint) -->
        <g>
          <rect x="60" y="50" width="280" height="300" rx="12" fill="var(--bx-bg-card)" stroke="var(--bx-line)" stroke-width="1"/>
          <!-- grid lines -->
          <g stroke="var(--bx-line)" stroke-width="0.5" opacity="0.6">
            <line x1="60" y1="90" x2="340" y2="90"/>
            <line x1="60" y1="130" x2="340" y2="130"/>
            <line x1="60" y1="170" x2="340" y2="170"/>
            <line x1="60" y1="210" x2="340" y2="210"/>
            <line x1="60" y1="250" x2="340" y2="250"/>
            <line x1="60" y1="290" x2="340" y2="290"/>
            <line x1="100" y1="50" x2="100" y2="350"/>
            <line x1="140" y1="50" x2="140" y2="350"/>
            <line x1="180" y1="50" x2="180" y2="350"/>
            <line x1="220" y1="50" x2="220" y2="350"/>
            <line x1="260" y1="50" x2="260" y2="350"/>
            <line x1="300" y1="50" x2="300" y2="350"/>
          </g>

          <!-- Process step boxes, in a flow -->
          <g>
            <rect x="78" y="100" width="72" height="40" rx="6" fill="#e0f2fe" stroke="#0284c7" stroke-width="1"/>
            <text x="114" y="124" font-family="monospace" font-size="10" font-weight="700" fill="#0284c7" text-anchor="middle">MAP</text>

            <rect x="164" y="100" width="72" height="40" rx="6" fill="#e0f2fe" stroke="#0284c7" stroke-width="1"/>
            <text x="200" y="124" font-family="monospace" font-size="10" font-weight="700" fill="#0284c7" text-anchor="middle">QUANTIFY</text>

            <rect x="250" y="100" width="72" height="40" rx="6" fill="#e0f2fe" stroke="#0284c7" stroke-width="1"/>
            <text x="286" y="124" font-family="monospace" font-size="10" font-weight="700" fill="#0284c7" text-anchor="middle">RANK</text>

            <!-- arrows -->
            <path d="M150 120 L164 120" stroke="#0284c7" stroke-width="1.5" marker-end="url(#co-arrow)"/>
            <path d="M236 120 L250 120" stroke="#0284c7" stroke-width="1.5" marker-end="url(#co-arrow)"/>
          </g>

          <!-- ROI chart -->
          <g>
            <rect x="78" y="164" width="244" height="94" rx="6" fill="var(--bx-bg-soft)"/>
            <!-- axes -->
            <line x1="98" y1="244" x2="310" y2="244" stroke="var(--bx-ink-30)" stroke-width="1"/>
            <line x1="98" y1="180" x2="98" y2="244" stroke="var(--bx-ink-30)" stroke-width="1"/>
            <!-- bars: payback by initiative -->
            <rect x="118" y="210" width="18" height="34" fill="url(#co-g1)"/>
            <rect x="148" y="194" width="18" height="50" fill="url(#co-g1)"/>
            <rect x="178" y="180" width="18" height="64" fill="url(#co-g1)"/>
            <rect x="208" y="202" width="18" height="42" fill="url(#co-g1)" opacity="0.5"/>
            <rect x="238" y="218" width="18" height="26" fill="url(#co-g1)" opacity="0.5"/>
            <rect x="268" y="228" width="18" height="16" fill="url(#co-g1)" opacity="0.5"/>
            <text x="190" y="184" font-family="monospace" font-size="9" font-weight="700" fill="#0284c7" text-anchor="middle">BEST ROI</text>
          </g>

          <!-- Annotations (handwriting) -->
          <g stroke="#0284c7" stroke-width="1.5" fill="none" stroke-linecap="round">
            <path d="M100 288 Q 115 280 130 290 T 160 288"/>
            <path d="M170 290 L 220 290"/>
            <path d="M230 288 Q 250 300 270 288"/>
          </g>
          <g fill="var(--bx-ink-30)">
            <circle cx="100" cy="320" r="2"/>
            <circle cx="120" cy="320" r="2"/>
            <circle cx="140" cy="320" r="2"/>
            <circle cx="160" cy="320" r="2"/>
            <circle cx="180" cy="320" r="2"/>
            <circle cx="200" cy="320" r="2"/>
          </g>
        </g>

        <defs>
          <marker id="co-arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="4" markerHeight="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 z" fill="#0284c7"/>
          </marker>
        </defs>

        <!-- Pen -->
        <g transform="translate(288 286) rotate(35)">
          <rect x="0" y="0" width="70" height="12" rx="2" fill="#0f172a"/>
          <rect x="0" y="0" width="16" height="12" fill="#0284c7"/>
          <polygon points="70,0 82,6 70,12" fill="#334155"/>
          <polygon points="82,6 90,6" stroke="#0284c7" stroke-width="2"/>
        </g>
      </svg>
    `,
  };

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return [...(root || document).querySelectorAll(sel)]; }

  function render() {
    const slug = document.body.dataset.serviceSlug;
    const lang = document.documentElement.dataset.lang || 'en';
    const dict = window.BX_I18N?.[lang];
    const detailDict = window.BX_SERVICES?.[lang] || window.BX_SERVICES?.en;
    if (!dict || !detailDict) return;

    const svc = dict.services.items.find(s => s.slug === slug);
    const detail = detailDict[slug];
    if (!svc || !detail) return;

    // Page title (only on first load; don't thrash on language switch)
    document.title = `${detail.hero.eyebrow} — Bexovar`;

    // Common text bindings via [data-txt] — shared with site.js
    $$('[data-txt]').forEach(el => {
      const path = el.dataset.txt.split('.');
      let v = dict;
      for (const p of path) v = v?.[p];
      if (typeof v === 'string') el.textContent = v;
    });
    $$('[data-cta-book]').forEach(el => el.textContent = dict.cta.book);
    $$('[data-cta-demos]').forEach(el => el.textContent = dict.cta.seeDemos);
    $$('[data-nav]').forEach(a => { if (dict.nav[a.dataset.nav]) a.textContent = dict.nav[a.dataset.nav]; });

    // Hero
    $('#svc-num').textContent = `${svc.num} / 04`;
    $('#svc-eyebrow').textContent = detail.hero.eyebrow;
    $('#svc-title').textContent = detail.hero.title;
    $('#svc-body').textContent = detail.hero.body;
    $('#svc-motif').innerHTML = MOTIFS[slug] || '';

    // Siblings
    $('#svc-siblings').innerHTML = dict.services.items.map(s => `
      <a class="svc-sibling" href="${bxEscape(s.slug)}.html" data-current="${s.slug === slug ? 'true' : 'false'}">
        <span class="svc-sibling__num">${bxEscape(s.num)}</span>
        <span class="svc-sibling__title">${bxEscape(s.title)}</span>
      </a>
    `).join('');

    // Examples
    const exTagLabel = lang === 'es' ? 'EJEMPLO' : 'EXAMPLE';
    $('#svc-examples').innerHTML = detail.examples.map(ex => `
      <li class="svc-example">
        <div class="svc-example__num"></div>
        <div class="svc-example__text">${bxEscape(ex)}</div>
        <div class="svc-example__tag">${exTagLabel}</div>
      </li>
    `).join('');
    $('#examples-h').textContent = lang === 'es'
      ? 'Tres cosas que hemos entregado en este tipo de trabajo.'
      : "Three things we've shipped in this bucket.";

    // Mini case
    $('#mc-stat').textContent = detail.miniCase.stat;
    $('#mc-label').textContent = detail.miniCase.label;
    $('#mc-summary').textContent = detail.miniCase.summary;
    $('#mc-readmore').textContent = lang === 'es' ? 'Leer el caso completo →' : 'Read the full case →';

    // Process recap — reuse the home process list
    const processTagLabel = lang === 'es' ? 'FASE' : 'PHASE';
    $('#svc-process').innerHTML = dict.process.steps.map(s => `
      <div class="svc-phase">
        <div class="svc-phase__tag">${processTagLabel}</div>
        <div class="svc-phase__num">${bxEscape(s.num)}</div>
        <div class="svc-phase__title">${bxEscape(s.title)}</div>
        <p class="svc-phase__sum">${bxEscape(s.summary)}</p>
      </div>
    `).join('');
    $('#svc-process-title').textContent = lang === 'es'
      ? 'Cuatro fases. Igual en cada engagement.'
      : 'Four phases. Same for every engagement.';

    // Related demos
    const demosById = new Map(dict.demos.items.map(d => [d.slug, d]));
    const related = (detail.demos || []).map(id => demosById.get(id)).filter(Boolean);
    $('#svc-related-demos').innerHTML = related.map(d => `
      <a class="svc-demo" href="../index.html#demos" data-slug="${bxEscape(d.slug)}">
        <span class="svc-demo__cat">${bxEscape(d.category)}</span>
        <div class="svc-demo__title">${bxEscape(d.title)}</div>
        <p class="svc-demo__sum">${bxEscape(d.summary)}</p>
      </a>
    `).join('');
    $('#related-demos-h').textContent = lang === 'es'
      ? 'Demos cortas de este servicio en acción.'
      : 'Short demos that show this service in action.';

    // Footer cols
    const svcLinks = dict.services.items.map(s => `<a href="${bxEscape(s.slug)}.html">${bxEscape(s.title)}</a>`).join('');
    $('#footer-services').innerHTML = svcLinks;
    $('#footer-resources').innerHTML = dict.footer.resources.map(l => `<a href="${bxEscape(l.href)}">${bxEscape(l.label)}</a>`).join('');
    $('#footer-company').innerHTML  = dict.footer.companyLinks.map(l => `<a href="${bxEscape(l.href)}">${bxEscape(l.label)}</a>`).join('');
  }

  window.bxRender = render;
  document.addEventListener('DOMContentLoaded', render);
})();
