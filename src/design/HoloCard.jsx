// src/design/HoloCard.jsx
import React, { useCallback, useRef, useState } from "react";
import classNames from "classnames";

/**
 * A glass panel that tilts toward the pointer in real 3D, with a specular
 * sheen that tracks the cursor and a neon edge that lights up on approach.
 *
 * Everything is driven through CSS custom properties written straight to the
 * node, so pointer movement never triggers a React render.
 */
export default function HoloCard({
  as: Tag = "div",
  children,
  className,
  intensity = 1,
  glow = "signal", // signal | cyber | plasma | none
  interactive = true,
  padded = true,
  ...rest
}) {
  const ref = useRef(null);
  const frame = useRef(0);
  const [lit, setLit] = useState(false);

  const handleMove = useCallback(
    (e) => {
      if (!interactive || !ref.current) return;

      // Coalesce to one update per frame — pointermove fires far faster than
      // the display refreshes.
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        const el = ref.current;
        if (!el) return;

        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;

        const maxTilt = 7 * intensity;
        el.style.setProperty("--rx", `${(0.5 - py) * maxTilt}deg`);
        el.style.setProperty("--ry", `${(px - 0.5) * maxTilt}deg`);
        el.style.setProperty("--mx", `${px * 100}%`);
        el.style.setProperty("--my", `${py * 100}%`);
      });
    },
    [interactive, intensity],
  );

  const reset = useCallback(() => {
    setLit(false);
    if (frame.current) {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    }
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }, []);

  const glowRing = {
    signal: "before:bg-[radial-gradient(circle_at_var(--mx)_var(--my),rgba(0,255,157,.30),transparent_55%)]",
    cyber: "before:bg-[radial-gradient(circle_at_var(--mx)_var(--my),rgba(0,229,255,.30),transparent_55%)]",
    plasma: "before:bg-[radial-gradient(circle_at_var(--mx)_var(--my),rgba(255,45,149,.28),transparent_55%)]",
    none: "before:bg-none",
  }[glow];

  return (
    <Tag
      ref={ref}
      onPointerMove={handleMove}
      onPointerEnter={() => interactive && setLit(true)}
      onPointerLeave={reset}
      className={classNames(
        "cn-holo group relative isolate rounded-2xl",
        "border border-white/10 bg-white/[.035] backdrop-blur-xl",
        "shadow-panel transition-[box-shadow,border-color] duration-500 ease-spring",
        // The sheen layer.
        "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-2xl",
        "before:opacity-0 before:transition-opacity before:duration-500",
        glowRing,
        lit && "before:opacity-100",
        lit && glow === "signal" && "border-signal-500/40 shadow-glow",
        lit && glow === "cyber" && "border-cyber-500/40 shadow-glow-cyan",
        lit && glow === "plasma" && "border-plasma/40 shadow-glow-plasma",
        padded && "p-5 sm:p-6",
        className,
      )}
      {...rest}
    >
      {/* Hairline top highlight — sells the "pane of glass" read. */}
      <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      {children}
    </Tag>
  );
}
