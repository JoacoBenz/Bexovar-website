// Bexovar website — shared runtime (header state, language toggle, reveals, ⌘K palette).

(function () {
  'use strict';

  // --- Language toggle ----------------------------------------------------
  const htmlEl = document.documentElement;
  const saved = localStorage.getItem('bx-lang');
  const browserPref = (navigator.language || 'en').toLowerCase().startsWith('es') ? 'es' : 'en';
  const initial = saved || htmlEl.dataset.initialLang || browserPref;
  htmlEl.lang = initial;
  htmlEl.dataset.lang = initial;

  window.addEventListener('DOMContentLoaded', () => {
    // Header scroll state
    const header = document.querySelector('.bx-header');
    if (header) {
      const onScroll = () => header.dataset.scrolled = (window.scrollY > 8) ? 'true' : 'false';
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Language buttons
    document.querySelectorAll('[data-bx-lang]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const next = btn.dataset.bxLang;
        if (next === htmlEl.dataset.lang) return;
        localStorage.setItem('bx-lang', next);
        htmlEl.dataset.lang = next;
        htmlEl.lang = next;
        window.dispatchEvent(new CustomEvent('bx:lang-change', { detail: { lang: next } }));
      });
    });
    updateLangButtons();

    // Mobile nav
    const burger = document.querySelector('.bx-burger');
    const panel  = document.querySelector('.bx-mobile-panel');
    if (burger && panel) {
      burger.addEventListener('click', () => {
        const open = panel.dataset.open === 'true';
        panel.dataset.open = open ? 'false' : 'true';
      });
      panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => panel.dataset.open = 'false'));
    }

    // Reveal on scroll. Only opt into hide-then-reveal if IO is available.
    if ('IntersectionObserver' in window) {
      htmlEl.dataset.reveal = 'on';
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.dataset.visible = 'true';
            io.unobserve(e.target);
          }
        });
      }, { rootMargin: '0px 0px -5% 0px', threshold: 0.01 });
      document.querySelectorAll('.bx-reveal').forEach(el => io.observe(el));
      // Safety net: force-reveal anything still hidden after 1.2s
      setTimeout(() => {
        document.querySelectorAll('.bx-reveal:not([data-visible="true"])').forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight + 200) el.dataset.visible = 'true';
        });
      }, 1200);
    }

    // Stagger: if a parent has .bx-stagger, assign incremental delays to its .bx-reveal children
    document.querySelectorAll('.bx-stagger').forEach((group) => {
      [...group.querySelectorAll('.bx-reveal')].forEach((el, i) => {
        el.style.setProperty('--bx-reveal-delay', `${i * 70}ms`);
      });
    });

    // ⌘K palette
    setupPalette();
  });

  window.addEventListener('bx:lang-change', () => {
    updateLangButtons();
    // Let pages re-render themselves
    if (typeof window.bxRender === 'function') window.bxRender();
  });

  function updateLangButtons() {
    const lang = htmlEl.dataset.lang;
    document.querySelectorAll('[data-bx-lang]').forEach(btn => {
      btn.setAttribute('aria-pressed', btn.dataset.bxLang === lang ? 'true' : 'false');
    });
  }

  // --- ⌘K palette ---------------------------------------------------------
  function setupPalette() {
    const backdrop = document.querySelector('.bx-palette-backdrop');
    if (!backdrop) return;
    const input = backdrop.querySelector('.bx-palette__input');
    const list  = backdrop.querySelector('.bx-palette__list');
    let activeIdx = 0;
    let items = [];

    function getDemos() {
      const lang = htmlEl.dataset.lang;
      const dict = window.BX_I18N?.[lang];
      return dict?.demos?.items || [];
    }

    function renderList(filterText = '') {
      const demos = getDemos();
      const q = filterText.trim().toLowerCase();
      items = demos.filter(d =>
        !q || d.title.toLowerCase().includes(q) || d.category.toLowerCase().includes(q) || d.summary.toLowerCase().includes(q)
      );
      activeIdx = 0;
      list.innerHTML = items.map((d, i) => `
        <div class="bx-palette__item" data-idx="${i}" data-active="${i === 0 ? 'true' : 'false'}">
          <div style="flex:1 1 auto">
            <div class="cat">${escapeHtml(d.category)}</div>
            <div class="title">${escapeHtml(d.title)}</div>
            <div class="sum">${escapeHtml(d.summary)}</div>
          </div>
          <div class="bx-mono" style="opacity:.5">${escapeHtml(d.duration)}</div>
        </div>
      `).join('') || `<div class="bx-palette__item"><div class="sum">No results.</div></div>`;
      list.querySelectorAll('.bx-palette__item').forEach((el, i) => {
        el.addEventListener('mouseenter', () => { setActive(i); });
        el.addEventListener('click', () => choose(i));
      });
    }

    function setActive(i) {
      if (i < 0 || i >= items.length) return;
      activeIdx = i;
      list.querySelectorAll('.bx-palette__item').forEach((el, j) => {
        el.dataset.active = j === i ? 'true' : 'false';
      });
      const el = list.querySelector(`[data-idx="${i}"]`);
      if (el) el.scrollIntoView({ block: 'nearest' });
    }

    function choose(i) {
      const d = items[i];
      if (!d) return;
      close();
      // Scroll to the matching card in the demos grid
      const card = document.querySelector(`[data-demo-slug="${d.slug}"]`);
      if (card) {
        card.scrollIntoView({ block: 'center', behavior: 'smooth' });
        card.animate(
          [{ boxShadow: '0 0 0 0 rgba(2,132,199,0)' },
           { boxShadow: '0 0 0 6px rgba(2,132,199,0.25)' },
           { boxShadow: '0 0 0 0 rgba(2,132,199,0)' }],
          { duration: 1200, easing: 'cubic-bezier(.22,1,.36,1)' }
        );
      }
    }

    function open() {
      backdrop.dataset.open = 'true';
      input.value = '';
      renderList('');
      setTimeout(() => input.focus(), 40);
    }
    function close() { backdrop.dataset.open = 'false'; }

    document.querySelectorAll('[data-bx-open-palette]').forEach(btn => {
      btn.addEventListener('click', open);
    });
    backdrop.addEventListener('click', (e) => { if (e.target === backdrop) close(); });
    input.addEventListener('input', (e) => renderList(e.target.value));
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        backdrop.dataset.open === 'true' ? close() : open();
      }
      if (backdrop.dataset.open !== 'true') return;
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(Math.min(activeIdx + 1, items.length - 1)); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setActive(Math.max(activeIdx - 1, 0)); }
      if (e.key === 'Enter')     { e.preventDefault(); choose(activeIdx); }
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  window.bxEscape = escapeHtml;

  // Helpers pages can use
  window.bxLang = () => htmlEl.dataset.lang;
  window.bxDict = () => window.BX_I18N?.[htmlEl.dataset.lang] || window.BX_I18N?.en;

  // Broken image placeholder
  document.addEventListener('error', function (e) {
    if (e.target.tagName === 'IMG' && !e.target.dataset.placeholder) {
      e.target.dataset.placeholder = 'true';
      var wrap = e.target.closest('.bx-demo__poster') || e.target.parentElement;
      if (!wrap) return;
      var ph = document.createElement('div');
      ph.className = 'bx-placeholder';
      ph.setAttribute('aria-hidden', 'true');
      ph.innerHTML = '<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="6" y="10" width="36" height="28" rx="4" stroke="#94a3b8" stroke-width="1.5" fill="none"/><circle cx="17" cy="21" r="3" stroke="#94a3b8" stroke-width="1.5"/><path d="M6 32l10-8 6 5 10-10 10 10v4a4 4 0 01-4 4H10a4 4 0 01-4-4v-1z" fill="#e2e8f0"/></svg>';
      e.target.style.display = 'none';
      wrap.insertBefore(ph, wrap.firstChild);
    }
  }, true);
})();
