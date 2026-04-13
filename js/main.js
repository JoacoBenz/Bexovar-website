/* ═══════════════════════════════════════════════════════════════
   BEXOVAR — Shared JS
   ═══════════════════════════════════════════════════════════════ */

// ─── Language Switching ─────────────────────────────────────────
function setLang(lang) {
    if (lang === 'es') {
        document.body.classList.add('lang-es');
    } else {
        document.body.classList.remove('lang-es');
    }
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.trim() === lang.toUpperCase());
    });
    // Swap <option> text (can't use spans inside <option>)
    document.querySelectorAll('option[data-en][data-es]').forEach(opt => {
        opt.textContent = opt.getAttribute('data-' + lang);
    });
    localStorage.setItem('bexovar-lang', lang);
}

// Restore language preference
(function() {
    const saved = localStorage.getItem('bexovar-lang');
    if (saved === 'es') setLang('es');
})();

// ─── Mobile Menu ────────────────────────────────────────────────
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

// ─── Scroll Effects ─────────────────────────────────────────────
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// ─── Smooth Scroll ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                document.getElementById('navLinks')?.classList.remove('active');
            }
        });
    });
});

// ─── Fade-in on Scroll ──────────────────────────────────────────
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });
});
