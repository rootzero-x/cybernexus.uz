import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { GlobalContext } from "../../GlobalState/globalstate";
import { useLocation } from "react-router-dom";
import { FaTerminal } from "react-icons/fa";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import { authLogout } from "../../api/auth";

export const WelcomeHeader = () => {
  const [open, setOpen] = useState(false);
  const { mode, setMode } = useContext(GlobalContext);
  const { user, refresh } = useContext(AuthContext);

  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const toggleSidebar = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close sidebar on mobile when navigating
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const safeName = (user?.full_name || "User").trim();
  const safeEmail = (user?.email || "").trim();
  const safeRole = (user?.role || "user").trim();
  const avatarUrl = (user?.avatar_url || "").trim();

  const initials = useMemo(() => {
    const parts = safeName.split(" ").filter(Boolean);
    const a = (parts[0]?.[0] || "U").toUpperCase();
    const b = (parts[1]?.[0] || "").toUpperCase();
    return (a + b).slice(0, 2);
  }, [safeName]);

  const logout = async () => {
    try {
      await authLogout(); // backend cookie + session delete
    } catch {}
    try {
      await refresh(); // user=null
    } catch {}
    setOpen(false);
    navigate("/auth", { replace: true });
  };

  return (
    <div
      style={{ display: location.pathname === "/faq" ? "none" : "block" }}
      className="fixed top-0 right-0 h-full z-50 font-mono"
    >
      <motion.div
        ref={menuButtonRef}
        className="fixed top-4 right-4 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-lg bg-black border-2 border-neon-green shadow-[0_0_15px_rgba(0,255,0,0.5)] cursor-pointer transition-all duration-300"
        onClick={toggleSidebar}
        onMouseEnter={() => window.innerWidth >= 640 && setOpen(true)}
        whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(0,255,0,0.7)" }}
        whileTap={{ scale: 0.95 }}
      >
        <FaTerminal className="text-neon-green text-xl sm:text-2xl" />
      </motion.div>

      <motion.div
        ref={sidebarRef}
        className={classNames(
          "fixed top-0 right-0 h-full w-64 sm:w-80 bg-black bg-opacity-95 border-l-2 border-neon-green shadow-[0_0_20px_rgba(0,255,0,0.3)] transform transition-transform duration-500 ease-in-out flex flex-col pt-16 px-4 sm:px-6 overflow-y-auto",
          {
            "translate-x-0": open,
            "translate-x-full": !open,
          },
        )}
        onMouseLeave={() => window.innerWidth >= 640 && setOpen(false)}
        initial={{ x: "100%" }}
        animate={{ x: open ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <Link to={"/"} className="mb-5">
          <motion.p
            className="text-2xl sm:text-3xl font-bold text-neon-green text-center tracking-wider"
            style={{ textShadow: "0 0 10px rgba(0,255,0,0.7)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            CyberNexus
          </motion.p>
        </Link>

        {/* ✅ PROFILE PANEL (me.php dan kelgan user) */}
        <motion.div
          className="mb-5 rounded-xl border-2 border-neon-green/50 bg-black/70 backdrop-blur p-4 shadow-[0_0_18px_rgba(0,255,0,0.18)]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
        >
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-xl border-2 border-neon-blue/40 bg-neon-blue/10 overflow-hidden shrink-0 grid place-items-center shadow-[0_0_12px_rgba(0,255,255,0.25)]">
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
              <span className="absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full bg-neon-green shadow-[0_0_10px_rgba(0,255,0,0.7)]" />
            </div>

            <div className="min-w-0">
              <div className="text-sm sm:text-base font-black text-neon-green truncate">
                {safeName || "User"}
              </div>
              <div className="mt-1 text-[11px] sm:text-xs text-neon-blue/80 font-bold tracking-widest truncate">
                {safeEmail || "—"}
              </div>
              <div className="mt-2 inline-flex items-center gap-2">
                <span className="text-[10px] font-black tracking-widest rounded-full border border-neon-green/30 bg-black/60 px-2 py-1 text-neon-green/80">
                  ROLE: {safeRole.toUpperCase()}
                </span>
                <span className="text-[10px] font-black tracking-widest rounded-full border border-neon-blue/25 bg-neon-blue/10 px-2 py-1 text-neon-blue/90">
                  ID: {user?.id ?? "—"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                navigate("/");
              }}
              className="rounded-lg border border-neon-green/35 bg-black/60 px-3 py-2 text-[11px] font-black tracking-widest text-neon-green hover:border-neon-blue hover:text-neon-blue transition-all"
            >
              HOME
            </button>

            <button
              type="button"
              onClick={logout}
              className="rounded-lg border border-red-500/35 bg-red-500/10 px-3 py-2 text-[11px] font-black tracking-widest text-red-200 hover:border-red-400 hover:text-red-100 transition-all"
            >
              LOGOUT
            </button>
          </div>
        </motion.div>

        {/* LINKS */}
        <div className="flex flex-col gap-3 sm:gap-4 text-base sm:text-lg text-neon-green">
          {[
            "premium-app",
            "news",
            "about",
            "contact",
            "help",
            "services",
            "ctf-challenge",
            "cybernexus-certificate",
            "portfolio",
          ].map((path, index) => (
            <motion.div
              key={path}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.08 * index }}
            >
              <Link to={`/${path}`}>
                <p className="cursor-pointer hover:text-neon-blue transition-colors duration-200 tracking-wide">
                  {path.charAt(0).toUpperCase() + path.slice(1)}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.label
          htmlFor="mode"
          className="mt-8 mx-auto"
          onClick={handleMode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        ></motion.label>
      </motion.div>
    </div>
  );
};
