import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";
import Loader from "@/components/Loader";
import Cursor from "@/components/Cursor";
import Atmosphere from "@/components/Atmosphere";

const Scene = lazy(() => import("@/components/Scene"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PK MAXX — Reality Launcher" },
      { name: "description", content: "PK MAXX — a futuristic cinematic launcher. Premium APKs, immersive interface, holographic motion." },
      { property: "og:title", content: "PK MAXX — Reality Launcher" },
      { property: "og:description", content: "Powered by PK MAXX. Step into a cinematic premium digital universe." },
    ],
  }),
  component: WelcomeScreen,
});

function WelcomeScreen() {
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
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 noise">
        <div className="pointer-events-none absolute inset-0">
          {mounted && (
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          )}
        </div>
        <Atmosphere density={90} />

        {/* radial vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 35%, oklch(0.05 0.005 200 / 0.85) 85%)" }}
        />

        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.7, filter: "blur(20px)" }}
            animate={booted ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative mb-10 h-44 w-44 md:h-56 md:w-56"
          >
            <motion.img
              src="/images/image-1.png" alt="PK MAXX"
              className="h-full w-full object-contain"
              style={{ filter: "drop-shadow(0 0 40px var(--glow))" }}
              animate={{ y: [0, -10, 0], rotate: [0, 3, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-full opacity-50 blur-3xl"
              style={{ background: "var(--gradient-aurora)" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={booted ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-4 inline-flex items-center gap-3 rounded-full glass px-5 py-1.5 font-mono text-[10px] uppercase tracking-[0.45em] text-muted-foreground"
          >
            <span className="h-1 w-1 rounded-full bg-primary" style={{ boxShadow: "0 0 10px var(--glow)" }} />
            v1.0 — Reality Build
          </motion.div>

          <h1 className="text-fluid-hero">
            {"PK MAXX".split("").map((c, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 100, filter: "blur(30px)" }}
                animate={booted ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ delay: 0.6 + i * 0.06, duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
                className="text-aurora inline-block"
                style={{ marginRight: c === " " ? "0.4em" : 0 }}
              >
                {c}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={booted ? { opacity: 1 } : {}}
            transition={{ delay: 1.4, duration: 1 }}
            className="mt-6 font-mono text-xs uppercase tracking-[0.6em] text-muted-foreground"
          >
            Powered by PK MAXX
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={booted ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.7, duration: 0.9 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-5"
          >
            <SplashLink to="/main" variant="primary">Enter</SplashLink>
            <SplashLink to="/about" variant="ghost">Explore</SplashLink>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={booted ? { opacity: 1 } : {}}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
        >
          <div className="flex flex-col items-center gap-2">
            Tap to Begin
            <div className="h-8 w-px bg-gradient-to-b from-primary to-transparent" />
          </div>
        </motion.div>
      </main>
    </>
  );
}

function SplashLink({ to, variant, children }: { to: "/main" | "/about"; variant: "primary" | "ghost"; children: string }) {
  const isPrimary = variant === "primary";
  return (
    <Link
      to={to}
      className="group relative inline-flex items-center gap-3 rounded-full px-9 py-4 text-sm font-medium uppercase tracking-[0.3em] transition-all duration-500 hover:scale-[1.04]"
      style={
        isPrimary
          ? {
              background: "linear-gradient(135deg, var(--aurora-1), var(--aurora-2))",
              color: "var(--primary-foreground)",
              boxShadow: "0 15px 50px -10px var(--glow), inset 0 1px 0 oklch(1 0 0 / 0.3)",
            }
          : { border: "1px solid oklch(1 0 0 / 0.18)", backdropFilter: "blur(20px)" }
      }
    >
      <span>{children}</span>
      <span className="text-base transition-transform duration-500 group-hover:translate-x-1">→</span>
      {isPrimary && (
        <span
          className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ boxShadow: "0 0 60px 0 var(--glow)" }}
        />
      )}
    </Link>
  );
}
