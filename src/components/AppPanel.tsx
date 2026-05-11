import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useRef, type MouseEvent } from "react";
import type { AppMeta } from "@/lib/apps";

export default function AppPanel({ app, index }: { app: AppMeta; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-50, 50], [8, -8]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(mx, [-50, 50], [-8, 8]), { stiffness: 180, damping: 18 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect(); if (!r) return;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 100);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 100);
  };
  const reset = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="group relative h-full overflow-hidden rounded-3xl glass-strong p-8"
      >
        {/* aurora glow */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-90"
          style={{ background: `radial-gradient(circle, oklch(0.78 0.2 ${app.hue}), transparent 70%)` }}
        />
        {/* shine sweep */}
        <div
          className="pointer-events-none absolute inset-0 -translate-x-full opacity-0 transition-all duration-1000 group-hover:translate-x-full group-hover:opacity-100"
          style={{ background: "linear-gradient(115deg, transparent 40%, oklch(1 0 0 / 0.08) 50%, transparent 60%)" }}
        />

        <div className="relative z-10 flex h-full flex-col gap-6" style={{ transform: "translateZ(40px)" }}>
          <div className="flex items-start justify-between">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
              style={{
                background: `linear-gradient(135deg, oklch(0.78 0.2 ${app.hue} / 0.3), oklch(0.78 0.2 ${app.hue} / 0.05))`,
                border: `1px solid oklch(0.78 0.2 ${app.hue} / 0.4)`,
                boxShadow: `0 0 30px -8px oklch(0.78 0.2 ${app.hue} / 0.7), inset 0 1px 0 oklch(1 0 0 / 0.2)`,
                color: `oklch(0.95 0.1 ${app.hue})`,
              }}
            >
              {app.glyph}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              0{index + 1} / 05
            </div>
          </div>

          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.4em]" style={{ color: `oklch(0.85 0.16 ${app.hue})` }}>
              {app.tag}
            </div>
            <h3 className="mt-2 text-3xl font-semibold tracking-tight">{app.name}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{app.desc}</p>
          </div>

          <Link
            to="/apps/$appId" params={{ appId: app.id }}
            className="mt-auto inline-flex items-center justify-between rounded-full glass px-5 py-3 text-xs font-medium uppercase tracking-[0.25em] transition-all duration-500 hover:translate-y-[-2px]"
            style={{ boxShadow: `0 10px 40px -15px oklch(0.78 0.2 ${app.hue})` }}
          >
            <span>Get APK</span>
            <span className="text-base transition-transform duration-500 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
