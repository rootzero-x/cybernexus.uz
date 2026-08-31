// src/design/CharacterPanel.jsx
import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import classNames from "classnames";

// The rigged model plus its Draco decoder is a few hundred KB; it must never
// be on the critical path for the login button.
const CharacterStage = lazy(() => import("./scene/CharacterStage"));

function canRun3D() {
  try {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return false;
    if ((navigator.hardwareConcurrency || 4) < 4) return false;
    // A second WebGL context on a low-end phone is a reliable way to get the
    // whole page killed, so the character is desktop/tablet only.
    if (window.innerWidth < 900) return false;

    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Mounts the 3D character once it is actually scrolled into view and the
 * device looks capable of rendering it. Everything degrades to nothing —
 * the surrounding layout never depends on it being there.
 */
export default function CharacterPanel({
  className,
  scale = 1,
  yOffset = -1.1,
  glow = true,
}) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canRun3D()) return;

    if (!("IntersectionObserver" in window)) {
      setShow(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={classNames("relative", className)}>
      {glow ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 55% 55% at 50% 55%, rgba(0,255,157,.16), transparent 70%)," +
              "radial-gradient(ellipse 40% 45% at 62% 35%, rgba(0,229,255,.14), transparent 70%)",
          }}
        />
      ) : null}

      {show ? (
        <Suspense fallback={null}>
          <CharacterStage className="h-full w-full" scale={scale} yOffset={yOffset} />
        </Suspense>
      ) : null}
    </div>
  );
}
