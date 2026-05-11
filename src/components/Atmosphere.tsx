import { useEffect, useRef } from "react";

/** Lightweight 2D canvas atmosphere: floating particles + soft fog. */
export default function Atmosphere({ density = 70 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    let raf = 0; let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(c);

    const parts = Array.from({ length: density }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.6 + 0.3,
      vx: (Math.random() - 0.5) * 0.00018,
      vy: -Math.random() * 0.00025 - 0.00005,
      hue: Math.random() < 0.5 ? 165 : 215,
      a: Math.random() * 0.6 + 0.2,
    }));

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -0.05) { p.y = 1.05; p.x = Math.random(); }
        if (p.x < -0.05) p.x = 1.05; if (p.x > 1.05) p.x = -0.05;
        const x = p.x * w, y = p.y * h;
        const grd = ctx.createRadialGradient(x, y, 0, x, y, p.r * 8);
        grd.addColorStop(0, `oklch(0.85 0.18 ${p.hue} / ${p.a})`);
        grd.addColorStop(1, `oklch(0.85 0.18 ${p.hue} / 0)`);
        ctx.fillStyle = grd;
        ctx.beginPath(); ctx.arc(x, y, p.r * 8, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [density]);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
