// Bexovar Modern UI Kit — shared JS helpers.
// Idempotent initializers; safe to call multiple times.
// Exposes window.BexovarModernFX.

(function () {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- 1. Scroll reveal ----------
  function initReveals(root) {
    const els = (root || document).querySelectorAll('[data-reveal]:not([data-reveal-init])');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach((el, i) => {
      el.setAttribute('data-reveal-init', '1');
      if (!el.style.getPropertyValue('--reveal-delay')) {
        const stagger = el.dataset.revealDelay;
        if (stagger) el.style.setProperty('--reveal-delay', stagger + 'ms');
      }
      io.observe(el);
    });
  }

  // ---------- 2. 3D tilt on cards ----------
  function bindTilt(card) {
    if (card.__tiltBound || reduced) return;
    card.__tiltBound = true;
    const max = 6; // degrees
    let raf = 0;
    function onMove(e) {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;  // 0..1
      const y = (e.clientY - r.top) / r.height;
      const rx = (0.5 - y) * max;
      const ry = (x - 0.5) * max;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.setProperty('--rx', rx.toFixed(2) + 'deg');
        card.style.setProperty('--ry', ry.toFixed(2) + 'deg');
        card.style.setProperty('--mx', (x * 100).toFixed(0) + '%');
        card.style.setProperty('--my', (y * 100).toFixed(0) + '%');
      });
    }
    function reset() {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--mx', '-100%');
      card.style.setProperty('--my', '-100%');
    }
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', reset);
  }
  function initTilts(root) {
    (root || document).querySelectorAll('.card--tilt').forEach(bindTilt);
  }

  // ---------- 3. Spotlight glow on all cards (no tilt) ----------
  function initSpotlights(root) {
    (root || document).querySelectorAll('.card:not(.card--tilt)').forEach(card => {
      if (card.__spotBound) return;
      card.__spotBound = true;
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  // ---------- 4. Magnetic buttons ----------
  function bindMagnet(btn) {
    if (btn.__magBound || reduced) return;
    btn.__magBound = true;
    const strength = 0.22;
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      btn.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      btn.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(0) + '%');
      btn.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(0) + '%');
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  }
  function initMagnets(root) {
    (root || document).querySelectorAll('[data-magnet]').forEach(bindMagnet);
  }

  // ---------- 5. Orbital parallax ----------
  function bindOrbital(wrap) {
    if (wrap.__orbBound || reduced) return;
    wrap.__orbBound = true;
    const stage = wrap.querySelector('.orbital__stage');
    if (!stage) return;
    function onMove(e) {
      const r = wrap.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / r.width;
      const y = (e.clientY - (r.top + r.height / 2)) / r.height;
      stage.style.setProperty('--rx', (-y * 12).toFixed(1) + 'deg');
      stage.style.setProperty('--ry', (x * 12).toFixed(1) + 'deg');
    }
    function reset() {
      stage.style.setProperty('--rx', '0deg');
      stage.style.setProperty('--ry', '0deg');
    }
    // Track mouse over the whole hero, not just the orbital
    const hero = wrap.closest('.hero') || wrap;
    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', reset);
  }
  function initOrbitals(root) {
    (root || document).querySelectorAll('.orbital').forEach(bindOrbital);
  }

  // ---------- 6. Animated counter ----------
  // Call manually on StatBlock render: BexovarModernFX.countUp(el, '42%').
  function countUp(el, finalText) {
    if (reduced) { el.textContent = finalText; return; }
    const num = parseFloat(finalText.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) { el.textContent = finalText; return; }
    const prefix = finalText.slice(0, finalText.search(/[0-9]/) >= 0 ? finalText.search(/[0-9]/) : 0);
    const suffix = finalText.slice(prefix.length + String(num).length);
    const dur = 1200;
    const start = performance.now();
    function tick(t) {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = (num * eased);
      const display = num % 1 === 0 ? Math.round(val) : val.toFixed(1);
      el.textContent = prefix + display + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // Init everything visible now and whenever new content mounts.
  function initAll(root) {
    initReveals(root);
    initTilts(root);
    initSpotlights(root);
    initMagnets(root);
    initOrbitals(root);
  }

  window.BexovarModernFX = { initAll, initReveals, initTilts, initSpotlights, initMagnets, initOrbitals, countUp };

  // Auto-init on DOM ready, and expose a MutationObserver for React roots.
  if (document.readyState !== 'loading') initAll();
  else document.addEventListener('DOMContentLoaded', () => initAll());
})();
