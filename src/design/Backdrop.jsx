// src/design/Backdrop.jsx
import React, { Suspense, lazy, useEffect, useState } from "react";

// three.js is ~150 KB gzipped. Splitting it out keeps it off the critical path,
// so the page paints (and the login form works) before the scene arrives.
const NeuralField = lazy(() => import("./scene/NeuralField"));

/** Cheap WebGL capability probe — cached after the first call. */
let webglSupport = null;
function supportsWebGL() {
  if (webglSupport !== null) return webglSupport;
  try {
    const canvas = document.createElement("canvas");
    webglSupport = !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

/**
 * Static layers that are always painted: a colour wash, the grid, a vignette
 * and a scanline. On their own they already look intentional, so a device that
 * cannot run WebGL gets a designed background rather than a blank one.
 */
export function StaticBackdrop({ intensity = 1 }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Nebula wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% -10%, rgba(0,255,157,.13), transparent 60%)," +
            "radial-gradient(ellipse 90% 60% at 85% 20%, rgba(0,229,255,.10), transparent 62%)," +
            "radial-gradient(ellipse 90% 70% at 10% 85%, rgba(255,45,149,.06), transparent 60%)," +
            "#03060f",
          opacity: intensity,
        }}
      />

      {/* Perspective grid */}
      <div
        className="absolute inset-x-0 bottom-0 h-[55vh] opacity-[.22]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,157,.20) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(0,255,157,.20) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          transform: "perspective(340px) rotateX(62deg)",
          transformOrigin: "bottom center",
          maskImage: "linear-gradient(to top, black 5%, transparent 85%)",
          WebkitMaskImage: "linear-gradient(to top, black 5%, transparent 85%)",
        }}
      />

      {/* Flat grid over the upper area */}
      <div
        className="absolute inset-0 opacity-[.10] bg-grid-fade bg-grid"
        style={{
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 75%)",
        }}
      />

      {/* Vignette keeps text legible at the edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 45%, transparent 30%, rgba(0,2,8,.75) 100%)",
        }}
      />

      <div className="absolute inset-0 opacity-[.5] animate-scanline"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(0,255,157,.045) 50%, transparent)",
          height: "38%",
        }}
      />
    </div>
  );
}

/**
 * Full backdrop: static layers plus the WebGL field on top.
 *
 * `variant="static"` opts a page out of the 3D layer entirely — useful for
 * long, text-heavy pages where a permanent render loop is not worth the battery.
 */
export default function Backdrop({
  variant = "full",
  density = 1,
  parallax = 1,
  intensity = 1,
}) {
  const [enable3D, setEnable3D] = useState(false);

  useEffect(() => {
    if (variant !== "full") return;
    if (!supportsWebGL()) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // A very low core count usually means a device that will struggle with a
    // continuous render loop.
    if ((navigator.hardwareConcurrency || 4) < 4) return;

    // Let the page paint and settle first.
    const id = window.requestIdleCallback
      ? window.requestIdleCallback(() => setEnable3D(true), { timeout: 1200 })
      : window.setTimeout(() => setEnable3D(true), 350);

    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(id);
      else window.clearTimeout(id);
    };
  }, [variant]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-void-900">
      <StaticBackdrop intensity={intensity} />

      {enable3D ? (
        <Suspense fallback={null}>
          <div className="absolute inset-0 opacity-90">
            <NeuralField density={density} parallax={parallax} />
          </div>

          {/* Scrim over the 3D layer. Particles and wireframes are bright
              enough to fight body copy for attention; this keeps the scene
              readable as depth rather than as content. */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 65% 55% at 32% 45%, rgba(3,6,15,.88) 0%, rgba(3,6,15,.55) 45%, transparent 78%)",
            }}
          />
        </Suspense>
      ) : null}

      {/* Film grain, painted last so it sits over everything. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[.16] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
