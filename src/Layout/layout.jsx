import { Outlet, useLocation } from "react-router-dom";
import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import { Download } from "lucide-react";

import { WelcomeHeader } from "./Header";
import { AuthContext } from "../context/AuthContext";
import Backdrop from "../design/Backdrop";

/** Pages that stay on the cheap static backdrop (long, text-heavy, or already busy). */
const STATIC_BACKDROP_ROUTES = new Set([
  "/policy",
  "/terms-of-service",
  "/ctf-challenge",
  "/cybernexus-certificate",
]);

function BootScreen() {
  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-void-900 font-mono">
      <Backdrop variant="static" />
      <div className="relative flex flex-col items-center gap-6">
        {/* Rotating rings while the session is verified */}
        <div className="relative h-24 w-24">
          <span className="absolute inset-0 rounded-full border border-signal-500/25" />
          <span className="absolute inset-0 animate-spin-slow rounded-full border-2 border-transparent border-t-signal-400 border-r-signal-400/40" />
          <span
            className="absolute inset-3 animate-spin-slow rounded-full border-2 border-transparent border-b-cyber-400 border-l-cyber-400/40"
            style={{ animationDirection: "reverse", animationDuration: "9s" }}
          />
          <span className="absolute inset-0 grid place-items-center">
            <span className="h-2.5 w-2.5 animate-pulse-glow rounded-full bg-signal-400 shadow-glow" />
          </span>
        </div>

        <div className="text-center">
          <div className="text-xs font-bold uppercase tracking-[.35em] text-cyber-400">
            Cyber Nexus
          </div>
          <div className="mt-2 text-sm text-white/50">
            Session tekshirilmoqda...
          </div>
        </div>
      </div>
    </div>
  );
}

export const Layout = () => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);

  const isAuthPage = location.pathname === "/auth";

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 450 : false,
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 450);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Every route change starts at the top; without this a long page keeps the
  // previous page's scroll offset.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [location.pathname]);

  const canShowChrome = !!user && !isAuthPage;

  if (loading) return <BootScreen />;

  const backdropVariant = STATIC_BACKDROP_ROUTES.has(location.pathname)
    ? "static"
    : "full";

  return (
    // No background colour here: the fixed Backdrop sits at -z-10, so a
    // background on this wrapper would paint straight over it. The base colour
    // lives on <body> instead.
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden text-white/85">
      {/* One WebGL context for the whole app, mounted behind every route. */}
      <Backdrop
        key={backdropVariant}
        variant={backdropVariant}
        density={isMobile ? 0.55 : 1}
        parallax={isAuthPage ? 1.2 : 0.85}
      />

      {canShowChrome ? <WelcomeHeader /> : null}

      {/* The header is sticky, not fixed, so it occupies its own space and the
          content needs no compensating top padding. */}
      <main className="relative z-10 w-full flex-1">
        {/* Keyed so each route replays its entrance instead of cross-fading. */}
        <div key={location.pathname} className="animate-fade-up">
          <Outlet />
        </div>
      </main>

      {canShowChrome ? (
        <a
          href="/cybernexus.apk"
          download
          className={classNames(
            "group fixed bottom-3 right-3 z-30 sm:bottom-5 sm:right-5",
            "inline-flex items-center gap-2 rounded-xl border border-signal-500/30",
            "bg-void-900/80 px-3 py-2 backdrop-blur-xl sm:px-4",
            "text-[11px] font-bold uppercase tracking-[.14em] text-signal-300 sm:text-xs",
            "shadow-panel transition-all duration-300 ease-spring",
            "hover:border-signal-400/70 hover:text-signal-200 hover:shadow-glow",
          )}
        >
          <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          <span className="hidden sm:inline">Download APK</span>
          <span className="sm:hidden">APK</span>
        </a>
      ) : null}
    </div>
  );
};

export default Layout;
