// src/design/primitives.jsx
import React from "react";
import classNames from "classnames";

/* ------------------------------------------------------------------ *
 *  Eyebrow — the small tracked label above a heading
 * ------------------------------------------------------------------ */
export function Eyebrow({ children, tone = "cyber", className }) {
  return (
    <div
      className={classNames(
        "inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.22em]",
        tone === "cyber" && "text-cyber-400",
        tone === "signal" && "text-signal-400",
        tone === "muted" && "text-white/45",
        className,
      )}
    >
      <span
        className={classNames(
          "h-px w-6",
          tone === "cyber" && "bg-cyber-500/60",
          tone === "signal" && "bg-signal-500/60",
          tone === "muted" && "bg-white/25",
        )}
      />
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Display heading with a soft neon bloom behind it
 * ------------------------------------------------------------------ */
export function Display({ children, as: Tag = "h1", size = "xl", className }) {
  const sizes = {
    sm: "text-2xl sm:text-3xl",
    md: "text-3xl sm:text-4xl",
    lg: "text-4xl sm:text-5xl",
    xl: "text-4xl sm:text-6xl lg:text-7xl",
  };

  return (
    <Tag
      className={classNames(
        "relative font-display font-bold tracking-tight text-white",
        "[text-wrap:balance]",
        sizes[size],
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Gradient-filled span for the emphasised words inside a Display. */
export function Accent({ children, from = "signal", className }) {
  return (
    <span
      className={classNames(
        "bg-clip-text text-transparent",
        from === "signal"
          ? "bg-gradient-to-r from-signal-400 via-signal-300 to-cyber-400"
          : "bg-gradient-to-r from-cyber-400 via-cyber-300 to-signal-400",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ *
 *  Buttons
 * ------------------------------------------------------------------ */
export function NeonButton({
  as: Tag = "button",
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}) {
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variants = {
    primary:
      "text-void-950 bg-gradient-to-r from-signal-400 to-cyber-400 border-transparent " +
      "hover:shadow-glow-lg hover:brightness-110",
    ghost:
      "text-signal-300 bg-white/[.03] border-signal-500/30 " +
      "hover:border-signal-400/70 hover:bg-signal-500/10 hover:shadow-glow-sm",
    outline:
      "text-white/80 bg-transparent border-white/15 hover:border-white/40 hover:text-white",
    danger:
      "text-white bg-plasma/15 border-plasma/40 hover:bg-plasma/25 hover:shadow-glow-plasma",
  };

  return (
    <Tag
      className={classNames(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden",
        "rounded-xl border font-bold uppercase tracking-[.14em]",
        "transition-all duration-300 ease-spring",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-void-900",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none",
        sizes[size],
        variants[variant],
        className,
      )}
      {...rest}
    >
      {/* Light sweep on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <span className="relative flex items-center gap-2">{children}</span>
    </Tag>
  );
}

/* ------------------------------------------------------------------ *
 *  Chip / tag
 * ------------------------------------------------------------------ */
export function Chip({ children, tone = "signal", className }) {
  const tones = {
    signal: "border-signal-500/30 bg-signal-500/10 text-signal-300",
    cyber: "border-cyber-500/30 bg-cyber-500/10 text-cyber-300",
    plasma: "border-plasma/30 bg-plasma/10 text-plasma",
    muted: "border-white/12 bg-white/[.04] text-white/60",
  };

  return (
    <span
      className={classNames(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1",
        "text-[11px] font-bold uppercase tracking-[.14em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ *
 *  Stat tile
 * ------------------------------------------------------------------ */
export function Stat({ label, value, hint, tone = "signal", icon: Icon }) {
  return (
    <div className="relative flex flex-col gap-1">
      <div className="flex items-center gap-2">
        {Icon ? (
          <Icon
            className={classNames(
              "h-4 w-4",
              tone === "signal" ? "text-signal-400" : "text-cyber-400",
            )}
          />
        ) : null}
        <span className="text-[11px] font-bold uppercase tracking-[.18em] text-white/45">
          {label}
        </span>
      </div>
      <div
        className={classNames(
          "font-display text-3xl font-bold tabular-nums",
          tone === "signal" ? "text-signal-300" : "text-cyber-300",
        )}
      >
        {value}
      </div>
      {hint ? <div className="text-xs text-white/40">{hint}</div> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Section wrapper — consistent rhythm down every page
 * ------------------------------------------------------------------ */
export function Section({ children, className, width = "default", ...rest }) {
  const widths = {
    narrow: "max-w-3xl",
    default: "max-w-6xl",
    wide: "max-w-7xl",
  };

  return (
    <section
      className={classNames(
        "relative mx-auto w-full px-4 sm:px-6 lg:px-8",
        widths[width],
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
}

/** Thin luminous divider. */
export function Rule({ className }) {
  return (
    <div
      className={classNames(
        "h-px w-full bg-gradient-to-r from-transparent via-signal-500/25 to-transparent",
        className,
      )}
    />
  );
}
