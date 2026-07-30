/* Sam Wong — scroll-immersive landing. Engine per sam-scroll-immerse-landing. */
'use strict';

document.documentElement.classList.add('js-motion');

/* ── Lenis ↔ ScrollTrigger — one loop (copied verbatim from the skill) ──── */
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.15,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  syncTouch: false
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: -70 });
  });
});

/* ── The journey — one continuous shot, scrubbed by scroll ─────────────── */
function createJourney() {
  const wrap = document.querySelector('[data-journey-wrap]');
  const canvas = document.querySelector('[data-journey]');
  if (!wrap || !canvas) return null;

  const small = window.innerWidth < 900;
  const COUNT = small ? 39 : 116;
  const dir = small ? 'media/journey-sm' : 'media/journey';
  const src = (i) => `${dir}/f${String(i + 1).padStart(3, '0')}.webp`;

  const conn = navigator.connection || {};
  if (conn.saveData === true || /(^|-)2g$/.test(conn.effectiveType || '')) return null;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  const ctx = canvas.getContext('2d', { alpha: false });
  const frames = new Array(COUNT);
  let drawn = -1;
  let playing = false;

  const ready = (i) => frames[i] && frames[i].complete && frames[i].naturalWidth > 0;

  function size() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    if (drawn >= 0) paint(frames[drawn]);
  }

  // object-fit: cover, by hand — a canvas won't do it for you
  function paint(img) {
    if (!img || !img.naturalWidth) return;
    const cw = canvas.width, ch = canvas.height;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale, h = img.naturalHeight * scale;
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  }

  // Scrolling can outrun loading — draw the nearest loaded frame, never blank.
  function render(i) {
    const target = Math.max(0, Math.min(COUNT - 1, i));
    let pick = -1;
    for (let d = 0; d < COUNT; d++) {
      const lo = target - d, hi = target + d;
      if (lo >= 0 && ready(lo)) { pick = lo; break; }
      if (hi < COUNT && ready(hi)) { pick = hi; break; }
    }
    if (pick < 0 || pick === drawn) return;
    drawn = pick;
    paint(frames[pick]);
    if (!playing) { playing = true; wrap.classList.add('is-playing'); }
  }

  function load(i) {
    return new Promise((resolve) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = img.onerror = () => resolve(i);
      img.src = src(i);
      frames[i] = img;
    });
  }

  // First frame first, then ~6 workers.
  size();
  load(0).then(() => {
    render(0);
    let next = 1;
    const worker = () => (next >= COUNT ? Promise.resolve() : load(next++).then(worker));
    for (let k = 0; k < 6; k++) worker();
  });

  window.addEventListener('resize', size);
  return { render, count: COUNT };
}

const journey = createJourney();

/* ── Pinned beats — one at a time, scrub-safe both directions ──────────── */
const stage = document.querySelector('[data-seq-stage]');
if (stage) {
  const beats = gsap.utils.toArray('.seq__beat');
  ScrollTrigger.create({
    trigger: stage,
    start: 'top top',
    end: '+=220%',
    pin: true,
    scrub: true,
    invalidateOnRefresh: true,
    onUpdate(self) {
      const idx = Math.min(beats.length - 1, Math.floor(self.progress * beats.length));
      beats.forEach((b, i) => b.classList.toggle('is-active', i === idx));
    }
  });
}

/* ── Reveals ───────────────────────────────────────────────────────────── */
gsap.utils.toArray('.reveal').forEach((el) => {
  ScrollTrigger.create({
    trigger: el,
    start: 'top 82%',
    once: true,
    onEnter: () => el.classList.add('is-in')
  });
});

/* ── Bind the journey LAST — after every pin exists, with end: 'max' ───── */
function bindJourney(j) {
  if (!j) return;
  const cursor = { i: 0 };
  gsap.to(cursor, {
    i: j.count - 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.documentElement,
      start: 'top top',
      end: 'max',
      scrub: 0.45,
      invalidateOnRefresh: true
    },
    onUpdate: () => j.render(Math.round(cursor.i))
  });
}
bindJourney(journey);

ScrollTrigger.refresh();
window.addEventListener('load', () => ScrollTrigger.refresh());
