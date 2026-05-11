import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";

const items = [
  { label: "Home", to: "/main" as const, external: false },
  { label: "About", to: "/about" as const, external: false },
  { label: "Telegram", to: "https://t.me/pkmaxx143", external: true },
  { label: "Instagram", to: "https://www.instagram.com/____unknown___hu__", external: true },
];

export default function SideMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        aria-label="Menu"
        onClick={() => setOpen(true)}
        className="glass-strong fixed left-5 top-5 z-[60] flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-full transition-transform hover:scale-105"
      >
        <span className="h-px w-5 bg-foreground" />
        <span className="h-px w-3.5 bg-primary" />
        <span className="h-px w-5 bg-foreground" />
      </button>

      <Link
        to="/main"
        className="fixed right-5 top-5 z-[60] flex items-center gap-2 rounded-full glass-strong px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.4em]"
      >
        <img src="/images/image-1.png" alt="" className="h-5 w-5" style={{ filter: "drop-shadow(0 0 6px var(--glow))" }} />
        <span className="text-aurora">PK MAXX</span>
      </Link>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[80] bg-background/60 backdrop-blur-2xl"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed left-0 top-0 z-[81] flex h-full w-[min(420px,90vw)] flex-col gap-10 overflow-hidden p-10 noise"
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.13 0.02 200 / 0.95), oklch(0.08 0.01 200 / 0.95))",
                borderRight: "1px solid oklch(1 0 0 / 0.08)",
                boxShadow: "30px 0 80px -20px oklch(0 0 0 / 0.6)",
              }}
            >
              <div
                className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full opacity-30 blur-3xl"
                style={{ background: "var(--gradient-aurora)" }}
              />
              <button
                onClick={() => setOpen(false)}
                className="absolute right-6 top-6 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Close"
              >
                ✕ Close
              </button>

              <div className="relative z-10 flex items-center gap-3 pt-4">
                <img src="/images/image-1.png" alt="PK MAXX" className="h-12 w-12" style={{ filter: "drop-shadow(0 0 14px var(--glow))" }} />
                <div>
                  <div className="text-aurora text-xl font-bold tracking-[0.3em]">PK MAXX</div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">Reality Launcher</div>
                </div>
              </div>

              <nav className="relative z-10 flex flex-col gap-2">
                {items.map((it, i) => {
                  const inner = (
                    <motion.span
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.08, duration: 0.6 }}
                      className="group flex items-baseline justify-between border-b border-white/5 py-5"
                    >
                      <span className="text-3xl font-semibold tracking-tight transition-all duration-500 group-hover:translate-x-2 group-hover:text-aurora">
                        {it.label}
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground">0{i + 1}</span>
                    </motion.span>
                  );
                  return it.external ? (
                    <a key={it.label} href={it.to} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>{inner}</a>
                  ) : (
                    <Link key={it.label} to={it.to} onClick={() => setOpen(false)}>{inner}</Link>
                  );
                })}
              </nav>

              <div className="relative z-10 mt-auto font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                © 2026 — Crafted in real-time
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
