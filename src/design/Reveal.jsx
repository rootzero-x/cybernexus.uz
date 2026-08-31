// src/design/Reveal.jsx
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";

/**
 * True when this browser cannot (or should not) animate the reveal, so the
 * content must be visible from the very first paint.
 *
 * Read once during lazy state initialisation rather than inside an effect:
 * setting state synchronously in an effect would render the element hidden for
 * a frame and only then reveal it, which is a visible flash for exactly the
 * users who asked for less motion.
 */
function shouldSkipAnimation() {
  if (typeof window === "undefined") return true; // SSR / prerender
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return true;
  if (!("IntersectionObserver" in window)) return true;
  return false;
}

/**
 * Reveals its children the first time they scroll into view.
 *
 * Uses IntersectionObserver rather than a scroll listener, so a long page with
 * dozens of revealing blocks costs nothing per frame, and disconnects as soon
 * as an element has appeared — the animation is a one-shot, not a toggle.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 20,
  as: Tag = "div",
  className,
  once = true,
  ...rest
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(shouldSkipAnimation);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (shouldSkipAnimation()) return; // already visible

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            if (once) io.disconnect();
          } else if (!once) {
            setShown(false);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      className={classNames(
        "transition-[opacity,transform] duration-700 ease-spring will-change-transform",
        shown ? "opacity-100 translate-y-0" : "opacity-0",
        className,
      )}
      style={{
        transitionDelay: `${delay}ms`,
        transform: shown ? undefined : `translate3d(0, ${y}px, 0)`,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
