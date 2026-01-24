import { Link, useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames";
import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { GlobalContext } from "../../GlobalState/globalstate";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import { authLogout } from "../../api/auth";
import { FaTerminal } from "react-icons/fa";
import { Menu, X, ChevronRight } from "lucide-react";

export const WelcomeHeader = () => {
  const [open, setOpen] = useState(false); // desktop sidebar
  const [mobileOpen, setMobileOpen] = useState(false); // mobile sheet
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 450 : false,
  );

  // mobile: hide/show on scroll
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  const { mode, setMode } = useContext(GlobalContext);
  const { user, refresh } = useContext(AuthContext);

  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);

  const mobilePanelRef = useRef(null);
  const mobileBtnRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const shouldHide = location.pathname === "/faq";
  if (shouldHide) return null;

  const safeName = (user?.full_name || "User").trim();
  const safeEmail = (user?.email || "").trim();
  const safeRole = (user?.role || "user").trim();
  const avatarUrl = (user?.avatar_url || "").trim();

  const firstName = useMemo(() => {
    const parts = safeName.split(" ").filter(Boolean);
    return parts[0] || "User";
  }, [safeName]);

  const initials = useMemo(() => {
    const parts = safeName.split(" ").filter(Boolean);
    const a = (parts[0]?.[0] || "U").toUpperCase();
    const b = (parts[1]?.[0] || "").toUpperCase();
    return (a + b).slice(0, 2);
  }, [safeName]);

  const navPaths = useMemo(
    () => [
      "premium-app",
      "news",
      "about",
      "contact",
      "help",
      "services",
      "ctf-challenge",
      "cybernexus-certificate",
      "portfolio",
    ],
    [],
  );

  const formatLabel = (path) =>
    path
      .split("-")
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const handleMode = () => setMode(mode === "light" ? "dark" : "light");

  const logout = async () => {
    try {
      await authLogout();
    } catch {}
    try {
      await refresh();
    } catch {}
    setOpen(false);
    setMobileOpen(false);
    navigate("/auth", { replace: true });
  };

  // resize watcher
  useEffect(() => {
    const onResize = () => {
      const next = window.innerWidth < 450;
      setIsMobile(next);
      if (next) setOpen(false);
      else setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // close menus when navigating
  useEffect(() => {
    setOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  // outside click close
  useEffect(() => {
    const handleClickOutside = (event) => {
      // desktop
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
      // mobile
      if (
        mobilePanelRef.current &&
        !mobilePanelRef.current.contains(event.target) &&
        mobileBtnRef.current &&
        !mobileBtnRef.current.contains(event.target)
      ) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // mobile: scroll hide/show
  useEffect(() => {
    if (!isMobile) return;

    lastScrollY.current = window.scrollY || 0;

    const onScroll = () => {
      const y = window.scrollY || 0;
      const prev = lastScrollY.current;

      if (mobileOpen) {
        setNavVisible(true);
        lastScrollY.current = y;
        return;
      }

      if (y < 18) {
        setNavVisible(true);
        lastScrollY.current = y;
        return;
      }

      const delta = y - prev;
      if (delta > 10) setNavVisible(false);
      if (delta < -10) setNavVisible(true);

      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile, mobileOpen]);

  // premium motion
  const sheetVariants = {
    hidden: { y: -14, opacity: 0, scale: 0.988 },
    show: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 170, damping: 20 },
    },
    exit: {
      y: -10,
      opacity: 0,
      scale: 0.988,
      transition: { duration: 0.16 },
    },
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[90] font-mono pointer-events-none">
      {/* ===================== MOBILE (<450px) ===================== */}
      {isMobile ? (
        <>
          {/* Floating glass navbar (pill) */}
          <AnimatePresence>
            {navVisible ? (
              <motion.div
                key="mobileNav"
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -42, opacity: 0 }}
                transition={{ type: "spring", stiffness: 180, damping: 22 }}
                className="fixed top-0 left-0 right-0 z-[95] pointer-events-auto"
                style={{
                  paddingTop: "calc(env(safe-area-inset-top, 0px) + 10px)",
                }}
              >
                <div className="mx-auto w-[92%] max-w-[920px]">
                  <div
                    className={classNames(
                      "rounded-2xl px-3 py-2.5",
                      "bg-black/55 backdrop-blur-2xl",
                      "border border-neon-green/20",
                      "shadow-[0_10px_35px_rgba(0,0,0,0.55)]",
                      "relative overflow-hidden",
                    )}
                  >
                    {/* soft glow */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute -top-10 -left-10 h-24 w-24 rounded-full bg-neon-green/12 blur-2xl" />
                      <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-neon-blue/12 blur-2xl" />
                    </div>

                    <div className="relative flex items-center justify-between gap-3">
                      {/* Left cluster */}
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="h-10 w-10 rounded-2xl border border-neon-blue/25 bg-neon-blue/10 overflow-hidden grid place-items-center shadow-[0_0_18px_rgba(0,255,255,0.18)] shrink-0">
                          {avatarUrl ? (
                            <img
                              src={avatarUrl}
                              alt="avatar"
                              className="h-full w-full object-cover"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          ) : (
                            <span className="text-neon-blue font-black tracking-widest text-sm">
                              {initials}
                            </span>
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="text-neon-green font-black tracking-wider truncate text-sm">
                              {firstName}
                            </div>
                            <span className="shrink-0 rounded-full border border-neon-green/20 bg-black/40 px-2 py-[3px] text-[10px] font-black tracking-widest text-neon-green/80">
                              {safeRole.toUpperCase()}
                            </span>
                          </div>
                          <div className="text-[10px] text-neon-blue/75 font-bold tracking-widest truncate">
                            {safeEmail || "—"}
                          </div>
                        </div>
                      </div>

                      {/* Right menu button */}
                      <motion.button
                        ref={mobileBtnRef}
                        type="button"
                        onClick={() => setMobileOpen((p) => !p)}
                        whileTap={{ scale: 0.96 }}
                        className={classNames(
                          "h-10 w-10 rounded-2xl grid place-items-center shrink-0",
                          "border border-neon-green/20 bg-black/45 backdrop-blur-xl",
                          "shadow-[0_0_18px_rgba(0,255,0,0.14)]",
                          "hover:border-neon-blue/35 transition-all",
                        )}
                        aria-label="Open menu"
                      >
                        {mobileOpen ? (
                          <X className="h-5 w-5 text-neon-green" />
                        ) : (
                          <Menu className="h-5 w-5 text-neon-green" />
                        )}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Sheet + Backdrop */}
          <AnimatePresence>
            {mobileOpen ? (
              <>
                {/* Backdrop */}
                <motion.div
                  key="mBackdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.16 }}
                  className="fixed inset-0 z-[92] bg-black/50 backdrop-blur-[2px] pointer-events-auto"
                />

                {/* ✅ SHEET: header style bilan 1 xil + ichida scroll */}
                <motion.div
                  key="mSheet"
                  ref={mobilePanelRef}
                  variants={sheetVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className={classNames(
                    "fixed left-0 right-0 z-[96] pointer-events-auto",
                    "mx-auto w-[92%] max-w-[920px]",
                    "rounded-3xl overflow-hidden",
                    "bg-black/55 backdrop-blur-2xl",
                    "border border-neon-green/20",
                    "shadow-[0_14px_40px_rgba(0,0,0,0.55)]",
                    "relative",
                  )}
                  style={{
                    top: "calc(env(safe-area-inset-top, 0px) + 72px)",
                    height:
                      "calc(100vh - (env(safe-area-inset-top, 0px) + 92px))",
                  }}
                >
                  {/* glow like header */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-14 -left-14 h-48 w-48 rounded-full bg-neon-green/10 blur-3xl" />
                    <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-neon-blue/10 blur-3xl" />
                  </div>

                  {/* ✅ FLEX LAYOUT: top sticky + scroll body */}
                  <div className="relative h-full flex flex-col">
                    {/* Sticky top bar */}
                    {/* <div className="shrink-0 sticky top-0 z-[110] px-4 py-3 border-b border-neon-green/15 bg-black/35 backdrop-blur-2xl flex items-center justify-between">
                      <div className="text-[11px] font-black tracking-[0.25em] text-neon-green/85">
                        CYBERNEXUS MENU
                      </div>

                      <motion.button
                        type="button"
                        onClick={() => setMobileOpen(false)}
                        whileTap={{ scale: 0.96 }}
                        className="h-10 w-10 rounded-2xl grid place-items-center border border-neon-green/20 bg-black/35 shadow-[0_0_14px_rgba(0,255,0,0.14)]"
                        aria-label="Close"
                      >
                        <X className="h-5 w-5 text-neon-green" />
                      </motion.button>
                    </div> */}

                    {/* ✅ Scrollable body (MUAMMO FIX) */}
                    <div className="flex-1 min-h-0 overflow-y-auto p-4">
                      {/* User card */}
                      <div className="rounded-3xl border border-neon-green/14 bg-black/40 p-4 shadow-[0_0_18px_rgba(0,255,0,0.10)]">
                        <div className="flex items-center gap-3">
                          <div className="relative h-14 w-14 rounded-3xl border border-neon-blue/25 bg-neon-blue/10 overflow-hidden grid place-items-center shadow-[0_0_18px_rgba(0,255,255,0.20)] shrink-0">
                            {avatarUrl ? (
                              <img
                                src={avatarUrl}
                                alt="avatar"
                                className="h-full w-full object-cover"
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            ) : (
                              <span className="text-neon-blue font-black tracking-widest">
                                {initials}
                              </span>
                            )}
                            <span className="absolute bottom-2 right-2 h-2.5 w-2.5 rounded-full bg-neon-green shadow-[0_0_10px_rgba(0,255,0,0.7)]" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="text-neon-green font-black tracking-wider truncate">
                              {safeName || "User"}
                            </div>
                            <div className="mt-1 text-[11px] text-neon-blue/75 font-bold tracking-widest truncate">
                              {safeEmail || "—"}
                            </div>

                            <div className="mt-2 flex flex-wrap gap-2">
                              <span className="text-[10px] font-black tracking-widest rounded-full border border-neon-green/20 bg-black/35 px-2 py-1 text-neon-green/80">
                                ROLE: {safeRole.toUpperCase()}
                              </span>
                              <span className="text-[10px] font-black tracking-widest rounded-full border border-neon-blue/20 bg-neon-blue/10 px-2 py-1 text-neon-blue/90">
                                ID: {user?.id ?? "—"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={logout}
                          className={classNames(
                            "mt-4 w-full rounded-2xl px-4 py-3",
                            "border border-red-500/25 bg-red-500/10",
                            "text-[12px] font-black tracking-widest text-red-200",
                            "hover:border-red-400/40 hover:bg-red-500/15 transition-all",
                          )}
                        >
                          LOGOUT
                        </button>
                      </div>

                      {/* Links (endiga sig‘may qolsa ham scroll bo‘ladi) */}
                      <div className="mt-4 grid grid-cols-1 gap-2">
                        {navPaths.map((path, idx) => (
                          <motion.div
                            key={path}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.015 * idx }}
                          >
                            <Link
                              to={`/${path}`}
                              onClick={() => setMobileOpen(false)}
                              className={classNames(
                                "group w-full rounded-2xl px-4 py-3",
                                "border border-neon-green/14 bg-black/40",
                                "flex items-center justify-between gap-3",
                                "hover:border-neon-blue/35 hover:bg-black/55 transition-all",
                              )}
                            >
                              <div className="text-neon-green font-black tracking-wider text-sm">
                                {formatLabel(path)}
                              </div>
                              <ChevronRight className="h-4 w-4 text-neon-blue/70 group-hover:text-neon-blue transition-colors" />
                            </Link>
                          </motion.div>
                        ))}
                      </div>

                      {/* mode toggle hidden */}
                      <motion.label
                        htmlFor="mode"
                        className="mt-3 mx-auto block h-1 w-1 opacity-0"
                        onClick={handleMode}
                      />
                    </div>
                  </div>
                </motion.div>
              </>
            ) : null}
          </AnimatePresence>
        </>
      ) : (
        /* ===================== DESKTOP/TABLET (>=450px) ===================== */
        <div className="fixed top-0 right-0 h-full z-[95] pointer-events-none">
          {/* Terminal button */}
          <motion.button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((p) => !p)}
            onMouseEnter={() => window.innerWidth >= 640 && setOpen(true)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className={classNames(
              "fixed top-4 right-4 z-[110] pointer-events-auto",
              "h-12 w-12 sm:h-14 sm:w-14 rounded-2xl grid place-items-center",
              "bg-black/70 backdrop-blur-xl",
              "border border-neon-green/35",
              "shadow-[0_0_22px_rgba(0,255,0,0.18)]",
              "hover:border-neon-blue/35 hover:shadow-[0_0_26px_rgba(0,255,255,0.16)]",
              "transition-all",
            )}
            aria-label="Open terminal menu"
          >
            <FaTerminal className="text-neon-green text-xl sm:text-2xl" />
          </motion.button>

          {/* Sidebar */}
          <AnimatePresence>
            {open ? (
              <motion.div
                ref={sidebarRef}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                onMouseLeave={() => window.innerWidth >= 640 && setOpen(false)}
                className={classNames(
                  "fixed top-0 right-0 z-[105] pointer-events-auto",
                  "h-full w-72 sm:w-80",
                  "bg-black/85 backdrop-blur-2xl",
                  "border-l border-neon-green/25",
                  "shadow-[0_0_28px_rgba(0,255,0,0.14)]",
                  "pt-16 px-5 overflow-y-auto",
                )}
              >
                <Link to="/" onClick={() => setOpen(false)}>
                  <div className="text-2xl font-black text-neon-green text-center tracking-wider">
                    CyberNexus
                  </div>
                </Link>

                {/* Profile */}
                <div className="mt-5 rounded-2xl border border-neon-green/18 bg-black/55 p-4 shadow-[0_0_18px_rgba(0,255,0,0.10)]">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl border border-neon-blue/25 bg-neon-blue/10 overflow-hidden grid place-items-center shrink-0">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt="avatar"
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <span className="text-neon-blue font-black tracking-widest">
                          {initials}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="text-neon-green font-black truncate">
                        {safeName || "User"}
                      </div>
                      <div className="mt-1 text-[11px] text-neon-blue/75 font-bold tracking-widest truncate">
                        {safeEmail || "—"}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="text-[10px] font-black tracking-widest rounded-full border border-neon-green/20 bg-black/45 px-2 py-1 text-neon-green/80">
                          ROLE: {safeRole.toUpperCase()}
                        </span>
                        <span className="text-[10px] font-black tracking-widest rounded-full border border-neon-blue/20 bg-neon-blue/10 px-2 py-1 text-neon-blue/90">
                          ID: {user?.id ?? "—"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={logout}
                    className={classNames(
                      "mt-4 w-full rounded-2xl px-4 py-3",
                      "border border-red-500/25 bg-red-500/10",
                      "text-[12px] font-black tracking-widest text-red-200",
                      "hover:border-red-400/40 hover:bg-red-500/15 transition-all",
                    )}
                  >
                    LOGOUT
                  </button>
                </div>

                {/* Links */}
                <div className="mt-5 flex flex-col gap-2">
                  {navPaths.map((path) => (
                    <Link
                      key={path}
                      to={`/${path}`}
                      onClick={() => setOpen(false)}
                      className={classNames(
                        "rounded-2xl px-4 py-3",
                        "border border-neon-green/14 bg-black/55",
                        "text-neon-green font-black tracking-wider",
                        "hover:border-neon-blue/35 hover:text-neon-blue transition-all",
                      )}
                    >
                      {formatLabel(path)}
                    </Link>
                  ))}
                </div>

                <motion.label
                  htmlFor="mode"
                  className="mt-6 mx-auto block h-1 w-1 opacity-0"
                  onClick={handleMode}
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
