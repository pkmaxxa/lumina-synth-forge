import { useEffect, useRef } from "react";

/**
 * Matrix-style falling glyph rain on a canvas.
 * Developer / hacker aesthetic background — replaces the liquid orb.
 */
export default function CodeRain({ opacity = 0.55 }: { opacity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const glyphs = "01{}[]<>/=$#*+-_:;.,abcdefABCDEF0123456789λΣΞΩ".split("");
    const fontSize = 14;
    let cols = 0;
    let drops: number[] = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / fontSize);
      drops = Array.from({ length: cols }, () => Math.random() * -50);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.fillStyle = "rgba(8, 12, 14, 0.18)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px JetBrains Mono, ui-monospace, monospace`;

      for (let i = 0; i < cols; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const ch = glyphs[(Math.random() * glyphs.length) | 0];

        // leading glyph — bright emerald
        ctx.fillStyle = "rgba(180, 255, 220, 0.95)";
        ctx.fillText(ch, x, y);

        // trail
        ctx.fillStyle = "rgba(60, 220, 160, 0.55)";
        ctx.fillText(ch, x, y - fontSize);

        if (y > h && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.5 + Math.random() * 0.6;
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity }}
      aria-hidden
    />
  );
}
