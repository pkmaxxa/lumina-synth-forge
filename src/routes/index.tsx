import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loader from "@/components/Loader";
import Cursor from "@/components/Cursor";
import CodeRain from "@/components/CodeRain";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PK MAXX — Dev Terminal" },
      { name: "description", content: "PK MAXX — a developer-grade launcher for premium APKs. Terminal-style UI, modular tooling, zero bloat." },
      { property: "og:title", content: "PK MAXX — Dev Terminal" },
      { property: "og:description", content: "Built by devs, for power users. Five premium modules in one terminal-grade launcher." },
    ],
  }),
  component: WelcomeScreen,
});

const BOOT_LINES = [
  "$ pkmaxx --init",
  "» loading kernel ... OK",
  "» mounting modules [5/5] ... OK",
  "» handshake @ pkmaxx.site ... OK",
  "» status: ONLINE",
];

function WelcomeScreen() {
  const [booted, setBooted] = useState(false);
  const [typed, setTyped] = useState<string[]>([]);

  useEffect(() => {
    if (!booted) return;
    let i = 0;
    const id = setInterval(() => {
      setTyped((p) => [...p, BOOT_LINES[i]]);
      i++;
      if (i >= BOOT_LINES.length) clearInterval(id);
    }, 380);
    return () => clearInterval(id);
  }, [booted]);

  return (
    <>
      <Loader onDone={() => setBooted(true)} />
      <Cursor />
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 noise">
        {/* Background: code rain + grid + vignette */}
        <CodeRain opacity={0.35} />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.78 0.2 165 / 0.06) 1px, transparent 1px), linear-gradient(90deg, oklch(0.78 0.2 165 / 0.06) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 30%, oklch(0.05 0.005 200 / 0.9) 80%)" }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          {/* LEFT — hero text */}
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={booted ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mb-6 inline-flex items-center gap-3 rounded-md border border-primary/30 bg-primary/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.35em] text-primary"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" style={{ boxShadow: "0 0 10px var(--glow)" }} />
              build_v1.0 · status: live
            </motion.div>

            <h1 className="text-fluid-hero font-mono">
              {"PK_MAXX".split("").map((c, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 60 }}
                  animate={booted ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.05, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                  className="text-aurora inline-block"
                >
                  {c}
                </motion.span>
              ))}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block text-primary"
              >
                _
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={booted ? { opacity: 1 } : {}}
              transition={{ delay: 1.1, duration: 0.9 }}
              className="mt-6 max-w-lg font-mono text-sm leading-relaxed text-muted-foreground"
            >
              <span className="text-primary">{">"}</span> A developer-grade launcher.
              Five hand-tuned modules. Zero bloat. Built for power users who live in the terminal.
            </motion.p>

            {/* tech stack chips */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={booted ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.3, duration: 0.7 }}
              className="mt-6 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-widest"
            >
              {["react", "tanstack", "three.js", "edge-runtime", "v1.0"].map((t) => (
                <span key={t} className="rounded border border-border bg-card/40 px-2.5 py-1 text-muted-foreground">
                  {t}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={booted ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <SplashLink to="/main" variant="primary">./run --launcher</SplashLink>
              <SplashLink to="/about" variant="ghost">cat about.md</SplashLink>
            </motion.div>
          </div>

          {/* RIGHT — terminal window */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={booted ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.9 }}
            className="glass-strong relative rounded-xl border border-primary/20 p-0 shadow-2xl"
            style={{ boxShadow: "0 30px 80px -20px oklch(0.78 0.2 165 / 0.25)" }}
          >
            {/* window chrome */}
            <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                pkmaxx@launcher: ~
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">zsh</span>
            </div>

            {/* terminal body */}
            <div className="min-h-[260px] px-5 py-4 font-mono text-[13px] leading-relaxed">
              {typed.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={line.startsWith("$") ? "text-foreground" : line.includes("ONLINE") ? "text-primary" : "text-muted-foreground"}
                >
                  {line}
                </motion.div>
              ))}
              {typed.length >= BOOT_LINES.length && (
                <div className="mt-2 flex items-center text-foreground">
                  <span className="text-primary">$&nbsp;</span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.9, repeat: Infinity }}
                    className="ml-0.5 inline-block h-3.5 w-2 bg-primary"
                  />
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={booted ? { opacity: 1 } : {}}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
        >
          {"// scroll · enter · explore"}
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
      className="group relative inline-flex items-center gap-3 rounded-md px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:scale-[1.03]"
      style={
        isPrimary
          ? {
              background: "linear-gradient(135deg, var(--aurora-1), var(--aurora-2))",
              color: "var(--primary-foreground)",
              boxShadow: "0 10px 35px -10px var(--glow), inset 0 1px 0 oklch(1 0 0 / 0.25)",
            }
          : { border: "1px solid oklch(0.78 0.2 165 / 0.35)", color: "var(--foreground)" }
      }
    >
      <span>{children}</span>
      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}
