import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";
import Cursor from "@/components/Cursor";
import SideMenu from "@/components/SideMenu";
import Atmosphere from "@/components/Atmosphere";
import AppPanel from "@/components/AppPanel";
import { APPS } from "@/lib/apps";

const Scene = lazy(() => import("@/components/Scene"));

export const Route = createFileRoute("/main")({
  head: () => ({
    meta: [
      { title: "PK MAXX — Launcher" },
      { name: "description", content: "Premium APK launcher. Hyper, PK Movie, PK Spotify, YouTube Premium and YT Activator — in one cinematic interface." },
      { property: "og:title", content: "PK MAXX — Launcher" },
      { property: "og:description", content: "A futuristic cinematic launcher for premium APKs." },
    ],
  }),
  component: MainPage,
});

function MainPage() {
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
      <Cursor />
      <SideMenu />
      <main className="relative min-h-screen overflow-hidden">
        {/* Hero */}
        <section className="relative flex min-h-[92vh] flex-col items-center justify-center px-6 noise">
          <div className="pointer-events-none absolute inset-0 opacity-80">
            {mounted && (
              <Suspense fallback={null}>
                <Scene />
              </Suspense>
            )}
          </div>
          <Atmosphere density={70} />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse at center, transparent 30%, oklch(0.05 0.005 200 / 0.85) 85%)" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
            className="relative z-10 mx-auto max-w-5xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-3 rounded-full glass px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              <span className="h-1 w-1 rounded-full bg-primary" style={{ boxShadow: "0 0 10px var(--glow)" }} />
              Launcher / online
            </div>
            <h1 className="text-fluid-hero">
              <span className="block">Your private</span>
              <span className="text-aurora block italic">app universe.</span>
            </h1>
            <p className="mx-auto mt-8 max-w-xl text-fluid-body text-muted-foreground">
              Five hand-tuned APKs, presented as floating holographic modules. Move your cursor — feel them respond.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
          >
            <div className="flex flex-col items-center gap-2">
              Scroll
              <div className="h-8 w-px bg-gradient-to-b from-primary to-transparent" />
            </div>
          </motion.div>
        </section>

        {/* App grid */}
        <section className="relative px-6 py-32">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1 }}
              className="mb-16 flex flex-wrap items-end justify-between gap-6"
            >
              <div className="max-w-xl">
                <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary">// Modules</div>
                <h2 className="text-fluid-h2 mt-3">Choose your <span className="text-aurora">module</span>.</h2>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                05 / Active
              </div>
            </motion.div>

            <div className="grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3">
              {APPS.map((app, i) => (
                <div key={app.id} className={i === 0 ? "lg:col-span-2 lg:row-span-1" : ""}>
                  <AppPanel app={app} index={i} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="relative border-t border-border/50 px-6 py-10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:flex-row">
            <div>© 2026 PK MAXX</div>
            <div>Reality Launcher · v1.0</div>
          </div>
        </footer>
      </main>
    </>
  );
}
