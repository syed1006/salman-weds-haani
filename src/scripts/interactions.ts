import gsap from 'gsap';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Per-guest personalization (?to=Guest+Name) ─────────────────
function initGuest(): string {
  const guest = new URLSearchParams(location.search).get('to')?.trim() ?? '';
  if (guest) {
    const gate = document.getElementById('gate-guest');
    const hero = document.getElementById('hero-guest');
    if (gate) gate.textContent = `Dear ${guest} & family,`;
    if (hero) hero.textContent = `In honour of ${guest} & family`;
  }
  return guest;
}

// ── Background nasheed ─────────────────────────────────────────
function initMusic(): { tryPlay: () => void } {
  const audio = document.getElementById('bg-music') as HTMLAudioElement | null;
  const btn = document.getElementById('music-toggle');
  if (!audio || !btn) return { tryPlay: () => {} };

  let available = false;
  fetch(audio.src, { method: 'HEAD' })
    .then((r) => {
      if (r.ok) {
        available = true;
        btn.hidden = false;
      }
    })
    .catch(() => {});

  const setState = () => btn.classList.toggle('playing', !audio.paused);
  btn.addEventListener('click', () => {
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  });
  audio.addEventListener('play', setState);
  audio.addEventListener('pause', setState);

  return {
    tryPlay: () => {
      if (available) audio.play().catch(() => {});
    },
  };
}

// ── Gate: sealed envelope opens the invitation ─────────────────
// Animation: "Wedding Invitation" envelope from LottieFiles (free,
// Lottie Simple License) — watercolor envelope with gold wax seal.
const ENVELOPE_END_FRAME = 360; // the source clip fades to black after this

function initGate(music: { tryPlay: () => void }): void {
  const gate = document.getElementById('gate');
  const holder = document.getElementById('gate-lottie');
  const openBtn = document.getElementById('gate-open');
  const hint = document.getElementById('gate-hint');
  if (!gate || !holder || !openBtn) return;

  let anim: { play: () => void; setSpeed: (s: number) => void; playSegments: (s: [number, number], f: boolean) => void; addEventListener: (e: string, cb: () => void) => void } | null = null;
  let opened = false;
  let revealed = false;

  const reveal = () => {
    if (revealed) return;
    revealed = true;
    document.dispatchEvent(new CustomEvent('invitation:open'));

    if (reducedMotion()) {
      gate.style.display = 'none';
      document.body.classList.remove('locked');
      return;
    }

    gsap
      .timeline({
        onComplete: () => {
          gate.style.display = 'none';
          document.body.classList.remove('locked');
        },
      })
      // the letter has risen — the gate dissolves into the site
      .to(gate, { autoAlpha: 0, scale: 1.05, duration: 1.1, ease: 'power2.inOut' })
      // golden light blooms behind the hero as it appears
      .fromTo(
        '.hero-bloom',
        { autoAlpha: 0, scale: 0.7 },
        { autoAlpha: 1, scale: 1, duration: 2.2, ease: 'power2.out' },
        0.3
      );
  };

  // Load the envelope animation (svg-only lottie build, ~⅓ the size)
  (async () => {
    try {
      // @ts-ignore — no type declarations for the light player entry
      const mod = await import('lottie-web/build/player/lottie_light');
      const lottie = mod.default ?? mod;
      anim = lottie.loadAnimation({
        container: holder,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: gate.dataset.lottie,
      });
      anim!.addEventListener('DOMLoaded', () => gate.classList.add('anim-ready'));
      anim!.addEventListener('complete', reveal);
    } catch {
      /* lottie failed to load — tap still opens the site plainly */
    }
  })();

  openBtn.addEventListener('click', () => {
    if (opened) return;
    opened = true;
    music.tryPlay();
    gate.classList.add('opening');
    if (hint) gsap.to(hint, { autoAlpha: 0, duration: 0.4 });

    if (anim && gate.classList.contains('anim-ready') && !reducedMotion()) {
      anim.setSpeed(1.25);
      anim.playSegments([0, ENVELOPE_END_FRAME], true);
      // safety net: if `complete` never fires, open anyway
      setTimeout(reveal, 8000);
    } else {
      reveal();
    }
  });
}

// ── Confetti (gold & emerald petals) ───────────────────────────
interface Petal {
  x: number; y: number; vx: number; vy: number;
  w: number; h: number; rot: number; vr: number;
  color: string; life: number;
}

let confettiCanvas: HTMLCanvasElement | null = null;
let petals: Petal[] = [];
let confettiRunning = false;

export function confettiBurst(count = 140): void {
  if (reducedMotion()) return;
  if (!confettiCanvas) {
    confettiCanvas = document.createElement('canvas');
    confettiCanvas.className = 'confetti-canvas';
    document.body.appendChild(confettiCanvas);
  }
  const canvas = confettiCanvas;
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  const colors = ['#e59aa9', '#d4b378', '#b8d8c2', '#f4d8dd', '#c9a35c'];

  for (let i = 0; i < count; i++) {
    petals.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * canvas.width * 0.5,
      y: canvas.height * 0.25 + (Math.random() - 0.5) * canvas.height * 0.1,
      vx: (Math.random() - 0.5) * 14 * devicePixelRatio,
      vy: (Math.random() * -10 - 4) * devicePixelRatio,
      w: (Math.random() * 8 + 5) * devicePixelRatio,
      h: (Math.random() * 6 + 4) * devicePixelRatio,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.3,
      color: colors[i % colors.length],
      life: 1,
    });
  }
  if (confettiRunning) return;
  confettiRunning = true;

  const ctx = canvas.getContext('2d')!;
  const gravity = 0.28 * devicePixelRatio;
  const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals = petals.filter((p) => p.life > 0 && p.y < canvas.height + 40);
    for (const p of petals) {
      p.vy += gravity;
      p.vx *= 0.985;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      p.life -= 0.004;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, Math.min(1, p.life * 1.6));
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    if (petals.length > 0) requestAnimationFrame(tick);
    else {
      confettiRunning = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };
  requestAnimationFrame(tick);
}

// ── Scratch-to-reveal save the date ────────────────────────────
function paintFoil(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
  const { width: w, height: h } = canvas;

  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#e9d3a3');
  grad.addColorStop(0.45, '#c9a35c');
  grad.addColorStop(0.75, '#9a7434');
  grad.addColorStop(1, '#c9a35c');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // subtle diagonal sheen
  ctx.globalAlpha = 0.18;
  ctx.fillStyle = '#fffbe9';
  for (let x = -h; x < w; x += 26) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + h, h);
    ctx.lineTo(x + h + 8, h);
    ctx.lineTo(x + 8, 0);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // sparkles
  ctx.fillStyle = '#fff6dd';
  for (let i = 0; i < 26; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const r = Math.random() * 1.6 + 0.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = 'rgba(61, 40, 8, 0.75)';
  ctx.font = `600 ${Math.round(w * 0.11)}px 'Cormorant Garamond', serif`;
  ctx.textAlign = 'center';
  ctx.letterSpacing = '3px';
  ctx.fillText('SCRATCH', w / 2, h / 2 + 5);
}

function initScratch(): void {
  const section = document.getElementById('save-the-date');
  const row = document.getElementById('scratch-row');
  const revealBtn = document.getElementById('std-reveal');
  const hint = document.getElementById('std-hint');
  const dateBlock = document.getElementById('std-date');
  if (!section || !row || !revealBtn || !dateBlock) return;

  const cells = Array.from(row.querySelectorAll<HTMLElement>('.scratch-cell'));
  const done = new Set<HTMLElement>();
  let revealed = false;

  const finishCell = (cell: HTMLElement) => {
    if (done.has(cell)) return;
    done.add(cell);
    const foil = cell.querySelector<HTMLCanvasElement>('.scratch-foil')!;
    foil.style.pointerEvents = 'none';
    gsap.to(foil, { autoAlpha: 0, duration: 0.5 });
    if (done.size === cells.length) revealAll();
  };

  const revealAll = () => {
    if (revealed) return;
    revealed = true;
    cells.forEach(finishCell);
    gsap.to([hint, revealBtn], { autoAlpha: 0, height: 0, margin: 0, duration: 0.5 });
    dateBlock.classList.add('shown');
    if (!reducedMotion()) {
      gsap.from(dateBlock, { scale: 0.85, autoAlpha: 0, duration: 0.7, ease: 'back.out(1.6)' });
    }
    confettiBurst(160);
  };

  revealBtn.addEventListener('click', revealAll);

  cells.forEach((cell) => {
    const canvas = cell.querySelector<HTMLCanvasElement>('.scratch-foil')!;
    paintFoil(canvas);
    const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
    let drawing = false;
    let last: { x: number; y: number } | null = null;
    let strokes = 0;

    const point = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return {
        x: ((e.clientX - r.left) / r.width) * canvas.width,
        y: ((e.clientY - r.top) / r.height) * canvas.height,
      };
    };

    const erase = (x: number, y: number) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
    };

    const checkProgress = () => {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let clear = 0;
      const total = canvas.width * canvas.height;
      for (let i = 3; i < data.length; i += 16) if (data[i] < 128) clear++;
      if (clear / (total / 4) > 0.45) finishCell(cell);
    };

    canvas.addEventListener('pointerdown', (e) => {
      drawing = true;
      canvas.setPointerCapture(e.pointerId);
      const p = point(e);
      erase(p.x, p.y);
      last = p;
    });
    canvas.addEventListener('pointermove', (e) => {
      if (!drawing) return;
      const p = point(e);
      if (last) {
        const dx = p.x - last.x;
        const dy = p.y - last.y;
        const steps = Math.max(1, Math.hypot(dx, dy) / 6);
        for (let i = 0; i <= steps; i++) erase(last.x + (dx * i) / steps, last.y + (dy * i) / steps);
      }
      last = p;
      if (++strokes % 6 === 0) checkProgress();
    });
    const stop = () => {
      if (drawing) checkProgress();
      drawing = false;
      last = null;
    };
    canvas.addEventListener('pointerup', stop);
    canvas.addEventListener('pointercancel', stop);
  });
}

// ── Countdown ──────────────────────────────────────────────────
function initCountdown(): void {
  const section = document.getElementById('save-the-date');
  const target = section?.dataset.target;
  if (!section || !target) return;
  const when = new Date(target).getTime();
  const el = (u: string) => section.querySelector<HTMLElement>(`[data-unit="${u}"]`);
  const pad = (n: number) => String(Math.max(0, n)).padStart(2, '0');

  const tick = () => {
    const diff = Math.max(0, when - Date.now());
    const s = Math.floor(diff / 1000);
    el('days')!.textContent = pad(Math.floor(s / 86400));
    el('hours')!.textContent = pad(Math.floor((s % 86400) / 3600));
    el('minutes')!.textContent = pad(Math.floor((s % 3600) / 60));
    el('seconds')!.textContent = pad(s % 60);
  };
  tick();
  setInterval(tick, 1000);
}

// ── RSVP ───────────────────────────────────────────────────────
function initRsvp(guest: string): void {
  const section = document.getElementById('rsvp');
  const yes = document.getElementById('rsvp-yes');
  const no = document.getElementById('rsvp-no');
  const response = document.getElementById('rsvp-response');
  const wa = document.getElementById('rsvp-wa') as HTMLAnchorElement | null;
  if (!section || !yes || !no || !response || !wa) return;

  const number = section.dataset.whatsapp ?? '';
  const from = guest ? ` — ${guest}` : '';

  const answer = (going: boolean) => {
    response.textContent = going
      ? "Yay! Can't wait to celebrate with you 🎉"
      : 'You will be missed — please keep us in your duas 🤲';
    if (number) {
      const msg = going
        ? `Assalamu alaikum! Insha Allah we will join the Nikah of Salman & Haani on 11th October 2026 ❤️${from}`
        : `Assalamu alaikum! We are sorry we can't make it to the Nikah of Salman & Haani — our duas are always with you 🤲${from}`;
      wa.href = `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
      wa.hidden = false;
    }
    if (going) confettiBurst(180);
  };

  yes.addEventListener('click', () => answer(true));
  no.addEventListener('click', () => answer(false));
}

// ── Entry point ────────────────────────────────────────────────
export function initInteractions(): void {
  const guest = initGuest();
  const music = initMusic();
  initGate(music);
  initScratch();
  initCountdown();
  initRsvp(guest);
}
