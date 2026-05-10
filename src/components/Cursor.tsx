import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf = 0;

    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const loop = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-10 w-10 rounded-full border border-primary/50 md:block"
        style={{ boxShadow: "0 0 20px var(--glow)", mixBlendMode: "screen" }}
      />
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[91] hidden h-1.5 w-1.5 rounded-full bg-primary md:block"
        style={{ boxShadow: "0 0 10px var(--glow)" }}
      />
    </>
  );
}
