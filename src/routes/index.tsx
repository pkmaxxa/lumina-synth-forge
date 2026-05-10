import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import Loader from "@/components/Loader";
import Cursor from "@/components/Cursor";
import MagneticButton from "@/components/MagneticButton";

const Scene = lazy(() => import("@/components/Scene"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NOVA — Cinematic Reality Engine" },
      { name: "description", content: "A next-generation interactive operating experience. Immersive 3D, holographic UI, real-time motion." },
      { property: "og:title", content: "NOVA — Cinematic Reality Engine" },
      { property: "og:description", content: "A next-generation interactive operating experience." },
    ],
  }),
  component: Index,
});

function Index() {
  const [booted, setBooted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  return (
    <>
      <Loader onDone={() => setBooted(true)} />
      <Cursor />
      <main className="relative">
        <Nav />
        <Hero mounted={mounted} booted={booted} />
        <Modules />
        <Capabilities />
        <Manifesto />
        <Footer />
      </main>
    </>
  );
}

function Nav() {
  return (
    <header className="fixed left-1/2 top-6 z-50 w-[min(960px,92vw)] -translate-x-1/2">
      <div className="glass-strong flex items-center justify-between rounded-full px-6 py-3">
        <div className="flex items-center gap-2.5">
          <div className="relative h-6 w-6">
            <div className="absolute inset-0 rounded-sm" style={{ background: "var(--gradient-aurora)", filter: "blur(6px)" }} />
            <div className="absolute inset-0 rounded-sm border border-primary/60" />
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.4em]">Nova</span>
        </div>
        <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.25em] text-muted-foreground md:flex">
          {["Engine", "Modules", "Manifesto"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="transition-colors hover:text-foreground">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" style={{ boxShadow: "0 0 10px var(--glow)" }} />
          Online
        </div>
      </div>
    </header>
  );
}

function Hero({ mounted, booted }: { mounted: boolean; booted: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 noise">
      {/* 3D scene */}
      <div className="pointer-events-none absolute inset-0">
        {mounted && (
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        )}
      </div>

      {/* radial vignette */}
      <div className="pointer-events-none absolute inset-0" style={{
        background: "radial-gradient(ellipse at center, transparent 30%, oklch(0.08 0.02 270 / 0.7) 80%)"
      }} />

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={booted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6 inline-flex items-center gap-3 rounded-full glass px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
        >
          <span className="h-1 w-1 rounded-full bg-accent" style={{ boxShadow: "0 0 8px var(--accent)" }} />
          v1.0 — Reality Build
        </motion.div>

        <h1 className="text-fluid-hero">
          {"The interface".split(" ").map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
              animate={booted ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ delay: 0.4 + i * 0.1, duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
              className="mr-4 inline-block"
            >
              {w}
            </motion.span>
          ))}
          <br />
          <motion.span
            initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
            animate={booted ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ delay: 0.7, duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-aurora inline-block italic"
          >
            of tomorrow.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={booted ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 1 }}
          className="mx-auto mt-8 max-w-xl text-fluid-body text-muted-foreground"
        >
          A cinematic reality engine — fluid 3D, holographic surfaces, and motion that feels physically rendered. Built for the next decade of digital experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={booted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton>Enter the Engine</MagneticButton>
          <MagneticButton variant="ghost">Watch Reel</MagneticButton>
        </motion.div>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={booted ? { opacity: 1 } : {}}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
      >
        <div className="flex flex-col items-center gap-2">
          Scroll
          <div className="h-8 w-px bg-gradient-to-b from-primary to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}

function Modules() {
  const items = [
    { code: "01", title: "Volumetric Light", desc: "Real-time bloom, depth, and atmospheric scattering rendered at 120fps." },
    { code: "02", title: "Liquid Surfaces", desc: "Distortion shaders that breathe — every panel feels physically alive." },
    { code: "03", title: "Particle Field", desc: "GPU-rendered cinematic atmosphere reactive to your every motion." },
    { code: "04", title: "Holographic UI", desc: "Layered glass, ambient glow edges, depth that responds to perspective." },
  ];
  return (
    <section id="modules" className="relative px-6 py-40">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mb-20 max-w-2xl"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary">// Modules</div>
          <h2 className="text-fluid-h2 mt-4">A stack engineered for <span className="text-aurora">sensation</span>.</h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((m, i) => (
            <motion.div
              key={m.code}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl glass-strong p-8"
            >
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
                style={{ background: "var(--gradient-aurora)" }}
              />
              <div className="relative z-10 flex items-start justify-between gap-6">
                <div>
                  <div className="font-mono text-xs text-primary">{m.code}</div>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight">{m.title}</h3>
                  <p className="mt-3 max-w-md text-muted-foreground">{m.desc}</p>
                </div>
                <div className="font-mono text-xs text-muted-foreground transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">↗</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  const stats = [
    { v: "120", u: "fps", l: "Render target" },
    { v: "0.04", u: "ms", l: "Frame jitter" },
    { v: "1.5K", u: "particles", l: "GPU instanced" },
    { v: "∞", u: "depth", l: "Layered glass" },
  ];
  return (
    <section id="engine" className="relative px-6 py-40">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] glass-strong p-10 md:p-16">
          <div className="grid gap-12 md:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                <div className="flex items-baseline gap-1.5">
                  <span className="text-aurora text-5xl font-semibold tracking-tight md:text-6xl">{s.v}</span>
                  <span className="font-mono text-xs text-muted-foreground">{s.u}</span>
                </div>
                <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section id="manifesto" className="relative overflow-hidden px-6 py-40">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--gradient-aurora)" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2 }}
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary">// Manifesto</div>
        <p className="mt-8 text-fluid-h2 italic leading-tight tracking-tight">
          We don't build pages. We build <span className="text-aurora">worlds</span> — fluid, dimensional, and emotionally alive.
        </p>
        <div className="mt-10 inline-flex items-center gap-4">
          <MagneticButton>Begin Your Build</MagneticButton>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-border/50 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:flex-row">
        <div>© 2026 Nova Engine</div>
        <div>Crafted in real-time</div>
      </div>
    </footer>
  );
}
