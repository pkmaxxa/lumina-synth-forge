import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 14 + 6;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setTimeout(() => {
          setDone(true);
          setTimeout(onDone, 800);
        }, 400);
      }
      setProgress(p);
    }, 150);
    return () => clearInterval(id);
  }, [onDone]);

  const lines = [
    "INITIALIZING PK CORE",
    "CALIBRATING HOLOGRAM SHADERS",
    "BOOTING PARTICLE FIELD",
    "SYNCING REALITY ENGINE",
  ];

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background noise"
          exit={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="absolute left-1/2 top-1/2 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.78 0.2 165 / 0.4), transparent 50%)",
                animation: "pulse-glow 3s ease-in-out infinite",
              }}
            />
            <div
              className="absolute left-0 right-0 h-px bg-primary/60"
              style={{ animation: "scan-line 2.4s linear infinite", boxShadow: "0 0 20px var(--glow)" }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-10 px-6">
            <div className="relative h-40 w-40">
              <motion.div
                className="absolute inset-0 rounded-full border border-primary/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ boxShadow: "inset 0 0 30px var(--glow), 0 0 30px var(--glow)" }}
              />
              <motion.div
                className="absolute inset-3 rounded-full border border-secondary/40"
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
              <motion.img
                src="/images/image-1.png"
                alt="PK MAXX"
                className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] object-contain"
                style={{ filter: "drop-shadow(0 0 24px var(--glow))" }}
                animate={{ scale: [1, 1.06, 1], rotate: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="text-center">
              <div className="text-aurora text-3xl font-bold tracking-[0.4em]">PK MAXX</div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                Powered by PK MAXX
              </div>
            </div>

            <div className="w-[min(420px,80vw)] space-y-3">
              <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                <span>System Boot</span>
                <span>{Math.floor(progress).toString().padStart(3, "0")}%</span>
              </div>
              <div className="h-px overflow-hidden bg-white/10">
                <motion.div
                  className="h-full"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, var(--aurora-1), var(--aurora-2), var(--aurora-3))",
                    boxShadow: "0 0 12px var(--glow)",
                  }}
                />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/80">
                › {lines[Math.min(lines.length - 1, Math.floor((progress / 100) * lines.length))]}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
