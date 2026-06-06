/* ============================================================
   Portfolio motion engine
   - custom cursor + magnetic elements
   - scroll reveals (IntersectionObserver)
   - parallax on [data-parallax]
   - kinetic hero entrance
   - active nav + progress bar
   ============================================================ */
(function () {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFine = window.matchMedia('(pointer: fine)').matches;

  /* ---------- Custom cursor ---------- */
  function initCursor() {
    if (!isFine || reduce) return;
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
    });

    function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(loop);
    }
    loop();

    const hot = 'a, button, .magnetic, .project-card, .chip, .social-link';
    document.querySelectorAll(hot).forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
    document.body.classList.add('has-cursor');
  }

  /* ---------- Magnetic buttons ---------- */
  function initMagnetic() {
    if (!isFine || reduce) return;
    document.querySelectorAll('.magnetic').forEach((el) => {
      const strength = parseFloat(el.dataset.magnetic || '0.35');
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0,0)';
      });
    });
  }

  /* ---------- Scroll reveals ---------- */
  function initReveals() {
    const items = document.querySelectorAll('[data-reveal]');
    if (reduce) {
      items.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.dataset.delay || '0', 10);
          setTimeout(() => el.classList.add('is-in'), delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
    items.forEach((el) => io.observe(el));
  }

  /* ---------- Parallax ---------- */
  function initParallax() {
    if (reduce) return;
    const els = [...document.querySelectorAll('[data-parallax]')];
    if (!els.length) return;
    let ticking = false;
    function update() {
      const vh = window.innerHeight;
      els.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || '0.1');
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2 - vh / 2;
        el.style.transform = `translate3d(0, ${(-center * speed).toFixed(2)}px, 0)`;
      });
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---------- Scroll progress + nav ---------- */
  function initScrollUI() {
    const bar = document.querySelector('.progress-bar');
    const nav = document.querySelector('.nav');
    const links = [...document.querySelectorAll('.nav-link')];
    const sections = links
      .map((l) => document.querySelector(l.getAttribute('href')))
      .filter(Boolean);

    function onScroll() {
      const st = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = `scaleX(${h > 0 ? st / h : 0})`;
      if (nav) nav.classList.toggle('nav--solid', st > 40);

      let current = sections[0];
      sections.forEach((s) => {
        if (s && s.getBoundingClientRect().top <= window.innerHeight * 0.4) current = s;
      });
      links.forEach((l) =>
        l.classList.toggle('is-active', current && l.getAttribute('href') === '#' + current.id)
      );
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Hero counters ---------- */
  function initCounters() {
    const nums = document.querySelectorAll('[data-count]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const dur = 1400;
        const start = performance.now();
        function tick(now) {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = target % 1 === 0 ? Math.round(target * eased) : (target * eased).toFixed(1);
          el.textContent = val + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.6 });
    nums.forEach((n) => io.observe(n));
  }

  /* ---------- Smooth anchor scroll ---------- */
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id === '#') return;
        const t = document.querySelector(id);
        if (!t) return;
        e.preventDefault();
        const y = t.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
        document.body.classList.remove('menu-open');
      });
    });
  }

  /* ---------- Mobile menu ---------- */
  function initMenu() {
    const btn = document.querySelector('.menu-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => document.body.classList.toggle('menu-open'));
  }

  /* ---------- Theme toggle (light / dark) ---------- */
  function initTheme() {
    const root = document.documentElement;
    const btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
    // Follow the OS preference only while the user hasn't made an explicit choice.
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', (e) => {
      let stored;
      try { stored = localStorage.getItem('theme'); } catch (err) {}
      if (stored !== 'dark' && stored !== 'light') {
        root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }
    });
  }

  /* ---------- Tilt on project cards ---------- */
  function initTilt() {
    if (!isFine || reduce) return;
    document.querySelectorAll('[data-tilt]').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  function init() {
    initCursor();
    initMagnetic();
    initReveals();
    initParallax();
    initScrollUI();
    initCounters();
    initSmoothAnchors();
    initMenu();
    initTilt();
    initTheme();
    document.body.classList.add('loaded');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
