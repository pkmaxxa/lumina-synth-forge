import { useRef, type ReactNode, type MouseEvent } from "react";

export default function MagneticButton({
  children,
  onClick,
  variant = "primary",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  const base =
    "magnetic relative inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide";
  const styles =
    variant === "primary"
      ? "text-primary-foreground"
      : "text-foreground glass";

  return (
    <button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      className={`${base} ${styles}`}
      style={
        variant === "primary"
          ? {
              background: "linear-gradient(135deg, var(--aurora-2), var(--aurora-1))",
              boxShadow: "0 10px 40px -10px var(--glow), inset 0 1px 0 oklch(1 0 0 / 0.3)",
            }
          : undefined
      }
    >
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 text-base">→</span>
    </button>
  );
}
