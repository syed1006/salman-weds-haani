// Gentle falling rose petals — the ambient romantic layer behind the page.
// Hand-rolled canvas 2D (~2KB), no library. Respects prefers-reduced-motion.

interface Petal {
  baseX: number;
  y: number;
  size: number;
  speed: number;
  swayAmp: number;
  swayFreq: number;
  phase: number;
  rot: number;
  vr: number;
  color: string;
  alpha: number;
}

const COLORS = ['#eeb7c2', '#e59aa9', '#f4d8dd', '#d4b378', '#e8c3ca'];

export function initPetals(canvas: HTMLCanvasElement): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let w = 0;
  let h = 0;
  const dpr = Math.min(devicePixelRatio || 1, 2);

  const resize = () => {
    w = canvas.width = Math.floor(innerWidth * dpr);
    h = canvas.height = Math.floor(innerHeight * dpr);
  };
  resize();
  addEventListener('resize', resize);

  const count = innerWidth < 640 ? 14 : 22;
  const petals: Petal[] = Array.from({ length: count }, () => spawn(true));

  function spawn(anywhere = false): Petal {
    return {
      baseX: Math.random() * w,
      y: anywhere ? Math.random() * h : -30 * dpr,
      size: (Math.random() * 9 + 8) * dpr,
      speed: (Math.random() * 0.35 + 0.25) * dpr,
      swayAmp: (Math.random() * 40 + 22) * dpr,
      swayFreq: Math.random() * 0.9 + 0.5,
      phase: Math.random() * Math.PI * 2,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.012,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.35 + 0.35,
    };
  }

  function drawPetal(p: Petal, t: number) {
    const x = p.baseX + Math.sin(t * p.swayFreq + p.phase) * p.swayAmp;
    ctx!.save();
    ctx!.translate(x, p.y);
    ctx!.rotate(p.rot + Math.sin(t * 0.7 + p.phase) * 0.4);
    ctx!.globalAlpha = p.alpha;
    ctx!.fillStyle = p.color;
    // petal: two curved lobes meeting at a point
    const s = p.size;
    ctx!.beginPath();
    ctx!.moveTo(0, 0);
    ctx!.quadraticCurveTo(s * 0.55, -s * 0.45, s, 0);
    ctx!.quadraticCurveTo(s * 0.5, s * 0.65, 0, 0);
    ctx!.fill();
    ctx!.restore();
  }

  let start: number | null = null;
  const tick = (ms: number) => {
    if (start === null) start = ms;
    const t = (ms - start) / 1000;
    ctx!.clearRect(0, 0, w, h);
    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];
      p.y += p.speed;
      p.rot += p.vr;
      if (p.y > h + 40 * dpr) petals[i] = spawn();
      else drawPetal(p, t);
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
