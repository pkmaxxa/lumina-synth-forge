import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Lenis from "lenis";
import Cursor from "@/components/Cursor";
import SideMenu from "@/components/SideMenu";
import Atmosphere from "@/components/Atmosphere";
import { getApp, APPS, type AppId } from "@/lib/apps";

export const Route = createFileRoute("/apps/$appId")({
  loader: ({ params }) => {
    const app = getApp(params.appId);
    if (!app) throw notFound();
    return { app };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.app;
    return {
      meta: [
        { title: a ? `${a.name} — PK MAXX` : "PK MAXX" },
        { name: "description", content: a?.long ?? "PK MAXX premium APK." },
        { property: "og:title", content: a ? `${a.name} — PK MAXX` : "PK MAXX" },
        { property: "og:description", content: a?.desc ?? "" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <h1 className="text-fluid-h2">App not found</h1>
        <Link to="/main" className="mt-6 inline-flex rounded-full glass px-6 py-3 text-xs uppercase tracking-[0.3em]">Back to Launcher</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <p className="text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: AppPage,
});

function AppPage() {
  const { app } = Route.useLoaderData();

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  const others = APPS.filter((a) => a.id !== app.id).slice(0, 4);
  const accent = `oklch(0.78 0.2 ${app.hue})`;
  const accentSoft = `oklch(0.78 0.2 ${app.hue} / 0.25)`;

  return (
    <>
      <Cursor />
      <SideMenu />
      <main className="relative min-h-screen overflow-hidden">
        <Atmosphere density={50} />
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[60vmax] w-[60vmax] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
        />

        <section className="relative px-6 pb-24 pt-40">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="mb-10 flex items-center gap-4"
            >
              <Link to="/main" className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground hover:text-foreground">
                ← Back to Launcher
              </Link>
              <div className="font-mono text-[10px] uppercase tracking-[0.4em]" style={{ color: accent }}>// {app.tag}</div>
            </motion.div>

            <div className="grid gap-12 lg:grid-cols-[auto_1fr] lg:items-start">
              {/* Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, rotate: -12 }} animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
                className="relative mx-auto"
              >
                <motion.div
                  className="relative flex h-44 w-44 items-center justify-center overflow-hidden rounded-[2rem] md:h-56 md:w-56"
                  style={{
                    background: `linear-gradient(135deg, ${accentSoft}, oklch(0.78 0.2 ${app.hue} / 0.04))`,
                    border: `1px solid ${accentSoft}`,
                    boxShadow: `0 30px 80px -20px ${accent}, inset 0 1px 0 oklch(1 0 0 / 0.2)`,
                  }}
                  animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img src={app.icon} alt={`${app.name} icon`} width={512} height={512} className="h-full w-full object-cover" />
                  <div className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-60 blur-2xl" style={{ background: accentSoft }} />
                </motion.div>
              </motion.div>

              {/* Title block */}
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 40, filter: "blur(15px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
                  className="text-fluid-hero leading-[0.9]"
                >
                  {app.name}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }}
                  className="mt-6 max-w-2xl text-fluid-body text-muted-foreground"
                >
                  {app.long}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}
                  className="mt-10 flex flex-wrap items-center gap-4"
                >
                  <a
                    href={`/apks/${app.id}.apk`} download
                    className="group relative inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-medium uppercase tracking-[0.3em] transition-all duration-500 hover:scale-[1.04]"
                    style={{
                      background: `linear-gradient(135deg, ${accent}, oklch(0.92 0.02 200))`,
                      color: "var(--primary-foreground)",
                      boxShadow: `0 20px 60px -10px ${accent}, inset 0 1px 0 oklch(1 0 0 / 0.3)`,
                    }}
                  >
                    Download APK
                    <span className="text-base transition-transform duration-500 group-hover:translate-y-[2px]">↓</span>
                  </a>
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    /apks/{app.id}.apk
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Cinematic preview surface */}
        <section className="relative px-6 pb-24">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1 }}
              className="relative aspect-[16/8] overflow-hidden rounded-[2rem] glass-strong"
            >
              {/* faux holographic preview */}
              <div className="absolute inset-0" style={{
                background: `radial-gradient(circle at 20% 30%, ${accent} 0%, transparent 35%), radial-gradient(circle at 80% 70%, oklch(0.7 0.22 ${(app.hue + 60) % 360}) 0%, transparent 40%)`,
                opacity: 0.45,
              }} />
              {/* grid */}
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: "linear-gradient(oklch(1 0 0 / 0.08) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.08) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
                maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
              }} />
              {/* central icon */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{ filter: "drop-shadow(0 0 40px " + accent + ")" }}
                animate={{ scale: [1, 1.05, 1], rotate: [0, 4, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                <img src={app.icon} alt={`${app.name} preview`} width={512} height={512} className="h-64 w-64 object-contain md:h-96 md:w-96" />
              </motion.div>
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                <span>Live preview · {app.tag}</span>
                <span>● rec</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="relative px-6 pb-24">
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
            {app.features.map((f: string, i: number) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="flex items-center justify-between gap-6 rounded-2xl glass p-6"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full font-mono text-xs"
                    style={{ background: accentSoft, color: accent, border: `1px solid ${accentSoft}` }}>
                    0{i + 1}
                  </span>
                  <span className="text-base font-medium">{f}</span>
                </div>
                <span className="font-mono text-xs text-muted-foreground">enabled</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Other modules */}
        <section className="relative px-6 pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="text-2xl font-semibold tracking-tight">Other modules</h3>
              <Link to="/main" className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground">View all →</Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {others.map((o) => (
                <Link key={o.id} to="/apps/$appId" params={{ appId: o.id as AppId }}
                  className="group rounded-2xl glass p-5 transition-all hover:translate-y-[-3px]">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl text-lg"
                      style={{
                        background: `oklch(0.78 0.2 ${o.hue} / 0.2)`,
                        color: `oklch(0.95 0.1 ${o.hue})`,
                        border: `1px solid oklch(0.78 0.2 ${o.hue} / 0.4)`,
                      }}>{o.glyph}</span>
                    <div>
                      <div className="text-sm font-medium">{o.name}</div>
                      <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">{o.tag}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <footer className="relative border-t border-border/50 px-6 py-10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:flex-row">
            <div>© 2026 PK MAXX</div>
            <div>{app.name} · v1.0</div>
          </div>
        </footer>
      </main>
    </>
  );
}
