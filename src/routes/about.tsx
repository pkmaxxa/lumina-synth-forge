import { createFileRoute } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, type MouseEvent } from "react";
import Lenis from "lenis";
import Cursor from "@/components/Cursor";
import SideMenu from "@/components/SideMenu";
import Atmosphere from "@/components/Atmosphere";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — PK MAXX" },
      { name: "description", content: "The story behind PK MAXX — a personal vision for cinematic, immersive premium app experiences." },
      { property: "og:title", content: "About — PK MAXX" },
      { property: "og:description", content: "The story behind PK MAXX." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  return (
    <>
      <Cursor />
      <SideMenu />
      <main className="relative min-h-screen overflow-hidden">
        <Atmosphere density={60} />
        <div
          className="pointer-events-none absolute left-1/2 top-1/3 h-[80vmax] w-[80vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--gradient-aurora)" }}
        />

        <section className="relative px-6 pb-32 pt-40">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <PortraitCard />

            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                className="font-mono text-[10px] uppercase tracking-[0.5em] text-primary"
              >
                // About
              </motion.div>
              <h1 className="text-fluid-h2 mt-5">
                {"The mind behind".split(" ").map((w, i) => (
                  <motion.span key={i}
                    initial={{ opacity: 0, y: 40, filter: "blur(15px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.9 }}
                    className="mr-3 inline-block"
                  >{w}</motion.span>
                ))}
                <br />
                <motion.span
                  initial={{ opacity: 0, y: 40, filter: "blur(15px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="text-aurora italic"
                >PK MAXX.</motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 1 }}
                className="mt-8 max-w-xl text-fluid-body text-muted-foreground"
              >
                I build premium digital experiences — not pages, not apps, but immersive worlds. PK MAXX is my personal launcher: a curated set of high-end APKs wrapped in a cinematic, holographic interface.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 1 }}
                className="mt-5 max-w-xl text-fluid-body text-muted-foreground"
              >
                Every panel, every transition, every glow is hand-tuned. The goal is a feeling — that you've stepped into the future of how software should look, move, and respond.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.8 }}
                className="mt-12 grid grid-cols-2 gap-4 max-w-md"
              >
                <a href="https://t.me/pkmaxx143" target="_blank" rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-full glass px-5 py-3 text-xs uppercase tracking-[0.3em] transition-all hover:translate-y-[-2px]">
                  Telegram <span className="transition-transform group-hover:translate-x-1">↗</span>
                </a>
                <a href="https://www.instagram.com/____unknown___hu__" target="_blank" rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-full glass px-5 py-3 text-xs uppercase tracking-[0.3em] transition-all hover:translate-y-[-2px]">
                  Instagram <span className="transition-transform group-hover:translate-x-1">↗</span>
                </a>
              </motion.div>

              <div className="mt-16 grid grid-cols-3 gap-6">
                {[
                  { v: "05", l: "Modules" },
                  { v: "120", l: "FPS Target" },
                  { v: "∞", l: "Depth" },
                ].map((s, i) => (
                  <motion.div
                    key={s.l}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.7 }}
                  >
                    <div className="text-aurora text-4xl font-semibold tracking-tight">{s.v}</div>
                    <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{s.l}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative px-6 pb-32">
          <div className="mx-auto max-w-4xl rounded-[2rem] glass-strong p-10 text-center md:p-16">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary">// Manifesto</div>
            <p className="mt-6 text-fluid-h2 italic leading-tight tracking-tight">
              I don't build apps. I build <span className="text-aurora">atmospheres</span> — fluid, dimensional, and emotionally alive.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

function PortraitCard() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-50, 50], [10, -10]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-50, 50], [-10, 10]), { stiffness: 120, damping: 18 });
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect(); if (!r) return;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 100);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 100);
  };
  const reset = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ perspective: 1400 }} className="relative mx-auto w-full max-w-md"
    >
      <motion.div
        ref={ref} onMouseMove={onMove} onMouseLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative aspect-[4/5] overflow-hidden rounded-[2rem] glass-strong"
      >
        <motion.img
          src="/images/image-2.jpg" alt="PK MAXX portrait" loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          animate={{ scale: [1, 1.04, 1], y: [0, -6, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: "translateZ(20px)" }}
        />
        {/* atmospheric overlays */}
        <div className="pointer-events-none absolute inset-0" style={{
          background: "linear-gradient(180deg, transparent 30%, oklch(0.05 0.005 200 / 0.8) 100%)"
        }} />
        <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-60" style={{
          background: "radial-gradient(ellipse at 30% 20%, oklch(0.7 0.22 165 / 0.35), transparent 60%), radial-gradient(ellipse at 80% 80%, oklch(0.7 0.22 220 / 0.3), transparent 60%)"
        }} />
        {/* scan line */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-0 right-0 h-px bg-primary/40" style={{ animation: "scan-line 5s linear infinite", boxShadow: "0 0 14px var(--glow)" }} />
        </div>
        {/* corner brackets */}
        {["top-3 left-3", "top-3 right-3 rotate-90", "bottom-3 left-3 -rotate-90", "bottom-3 right-3 rotate-180"].map((p) => (
          <div key={p} className={`absolute ${p} h-5 w-5 border-l border-t border-primary/70`} style={{ boxShadow: "0 0 10px var(--glow)" }} />
        ))}
        {/* badge */}
        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/90" style={{ transform: "translateZ(40px)" }}>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" style={{ boxShadow: "0 0 8px var(--glow)" }} />
            PK MAXX
          </div>
          <div className="opacity-60">// founder</div>
        </div>
      </motion.div>
      <div
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] opacity-50 blur-3xl"
        style={{ background: "var(--gradient-aurora)" }}
      />
    </motion.div>
  );
}
