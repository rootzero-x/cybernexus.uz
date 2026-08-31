import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import {
  Menu,
  X,
  LogOut,
  ChevronDown,
  Sparkles,
  Newspaper,
  Info,
  Mail,
  LifeBuoy,
  Wrench,
  Flag,
  Award,
  Briefcase,
  Terminal as TerminalIcon,
} from "lucide-react";

import { AuthContext } from "../../context/AuthContext";

const NAV = [
  { to: "/premium-app", label: "Premium", icon: Sparkles },
  { to: "/services", label: "Services", icon: Wrench },
  { to: "/ctf-challenge", label: "CTF", icon: Flag },
  { to: "/portfolio", label: "Portfolio", icon: Briefcase },
  { to: "/news", label: "News", icon: Newspaper },
  { to: "/cybernexus-certificate", label: "Certificate", icon: Award },
  { to: "/about", label: "About", icon: Info },
  { to: "/contact", label: "Contact", icon: Mail },
  { to: "/help", label: "Help", icon: LifeBuoy },
];

// Shown inline on wide screens; the rest live in the "More" menu.
const PRIMARY_COUNT = 5;

function Avatar({ url, initials, size = "h-9 w-9" }) {
  const [broken, setBroken] = useState(false);

  if (url && !broken) {
    return (
      <img
        src={url}
        alt=""
        referrerPolicy="no-referrer"
        onError={() => setBroken(true)}
        className={classNames(size, "rounded-lg border border-white/12 object-cover")}
      />
    );
  }

  return (
    <span
      className={classNames(
        size,
        "grid place-items-center rounded-lg border border-signal-500/30 bg-signal-500/10",
        "text-xs font-bold text-signal-300",
      )}
    >
      {initials}
    </span>
  );
}

export const WelcomeHeader = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuRef = useRef(null);
  const moreRef = useRef(null);

  const name = (user?.full_name || "User").trim();
  const email = (user?.email || "").trim();
  const role = (user?.role || "user").trim();
  const avatarUrl = (user?.avatar_url || "").trim();

  const initials = useMemo(() => {
    const parts = name.split(" ").filter(Boolean);
    return ((parts[0]?.[0] || "U") + (parts[1]?.[0] || "")).toUpperCase().slice(0, 2);
  }, [name]);

  const [primary, overflow] = useMemo(
    () => [NAV.slice(0, PRIMARY_COUNT), NAV.slice(PRIMARY_COUNT)],
    [],
  );

  // Solidify the bar once the page scrolls under it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Any navigation closes every open surface.
  useEffect(() => {
    setMobileOpen(false);
    setMenuOpen(false);
    setMoreOpen(false);
  }, [location.pathname]);

  // Click-outside and Escape for the dropdowns.
  useEffect(() => {
    if (!menuOpen && !moreOpen) return;

    const onDown = (e) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
      if (moreOpen && moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setMoreOpen(false);
      }
    };

    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, moreOpen]);

  // Lock body scroll behind the mobile sheet.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const handleLogout = async () => {
    await logout();
    navigate("/auth", { replace: true });
  };

  const linkClass = ({ isActive }) =>
    classNames(
      "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
      isActive ? "text-signal-300" : "text-white/55 hover:text-white/90",
    );

  return (
    <>
      <header
        className={classNames(
          "sticky top-0 z-40 w-full transition-all duration-300",
          scrolled
            ? "border-b border-white/8 bg-void-900/80 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <Link
            to="/"
            className="group flex shrink-0 items-center gap-2.5"
            aria-label="CyberNexus bosh sahifa"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-signal-500/35 bg-signal-500/10 transition-shadow duration-300 group-hover:shadow-glow-sm">
              <TerminalIcon className="h-4 w-4 text-signal-400" />
            </span>
            <span className="hidden font-display text-sm font-bold tracking-tight text-white sm:block">
              Cyber<span className="text-signal-400">Nexus</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="ml-4 hidden items-center gap-0.5 lg:flex">
            {primary.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive ? (
                      <span className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-transparent via-signal-400 to-transparent" />
                    ) : null}
                  </>
                )}
              </NavLink>
            ))}

            {/* Overflow menu */}
            <div className="relative" ref={moreRef}>
              <button
                type="button"
                onClick={() => setMoreOpen((v) => !v)}
                aria-expanded={moreOpen}
                aria-haspopup="menu"
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-white/55 transition-colors hover:text-white/90"
              >
                Ko'proq
                <ChevronDown
                  className={classNames(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    moreOpen && "rotate-180",
                  )}
                />
              </button>

              {moreOpen ? (
                <div
                  role="menu"
                  className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-void-850/95 p-1.5 shadow-panel-lg backdrop-blur-xl"
                >
                  {overflow.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      role="menuitem"
                      className={({ isActive }) =>
                        classNames(
                          "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                          isActive
                            ? "bg-signal-500/12 text-signal-300"
                            : "text-white/60 hover:bg-white/5 hover:text-white",
                        )
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              ) : null}
            </div>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            {/* User menu */}
            <div className="relative hidden sm:block" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                aria-haspopup="menu"
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[.03] px-2 py-1.5 transition-colors hover:border-white/20"
              >
                <Avatar url={avatarUrl} initials={initials} size="h-7 w-7" />
                <span className="max-w-[8rem] truncate text-sm text-white/75">
                  {name.split(" ")[0]}
                </span>
                <ChevronDown
                  className={classNames(
                    "h-3.5 w-3.5 text-white/40 transition-transform duration-200",
                    menuOpen && "rotate-180",
                  )}
                />
              </button>

              {menuOpen ? (
                <div
                  role="menu"
                  className="absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-xl border border-white/10 bg-void-850/95 shadow-panel-lg backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3 border-b border-white/8 p-4">
                    <Avatar url={avatarUrl} initials={initials} size="h-10 w-10" />
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-white">{name}</div>
                      <div className="truncate text-xs text-white/40">{email}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-4 py-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-[.18em] text-white/35">
                      Role
                    </span>
                    <span className="rounded-full border border-cyber-500/30 bg-cyber-500/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-cyber-300">
                      {role}
                    </span>
                  </div>

                  <div className="p-1.5">
                    <button
                      type="button"
                      onClick={handleLogout}
                      role="menuitem"
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-plasma transition-colors hover:bg-plasma/10"
                    >
                      <LogOut className="h-4 w-4" />
                      Chiqish
                    </button>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Mobile trigger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Menyuni ochish"
              className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[.03] text-white/70 transition-colors hover:border-white/25 hover:text-white lg:hidden"
            >
              <Menu className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- Mobile sheet ---------------- */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-void-950/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col border-l border-white/10 bg-void-900/95 shadow-panel-lg backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/8 p-4">
              <div className="flex items-center gap-3">
                <Avatar url={avatarUrl} initials={initials} size="h-10 w-10" />
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-white">{name}</div>
                  <div className="truncate text-xs text-white/40">{email}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Menyuni yopish"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 text-white/60 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-3">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    classNames(
                      "flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors",
                      isActive
                        ? "bg-signal-500/12 text-signal-300"
                        : "text-white/60 hover:bg-white/5 hover:text-white",
                    )
                  }
                >
                  <item.icon className="h-4.5 w-4.5" />
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="border-t border-white/8 p-3">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-plasma/30 bg-plasma/10 px-4 py-3 text-sm font-bold uppercase tracking-[.14em] text-plasma transition-colors hover:bg-plasma/20"
              >
                <LogOut className="h-4 w-4" />
                Chiqish
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default WelcomeHeader;
