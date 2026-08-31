// src/pages/Privacy/Privacy.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShieldAlt,
  FaLock,
  FaCookieBite,
  FaDatabase,
  FaUserShield,
  FaBug,
  FaServer,
  FaEnvelope,
  FaTelegram,
  FaExternalLinkAlt,
  FaTimes,
  FaStar,
  FaRegStar,
  FaClipboardCheck,
  FaTrashAlt,
  FaGlobe,
  FaKey,
} from "react-icons/fa";

/**
 * ✅ CyberNexus Privacy — Premium (same design language as About/News)
 * - Glass hero + sticky tabs
 * - Sections: Overview, Data, Cookies, Security, Your Rights, Contact, Changelog
 * - Modal details for policy cards
 * - Favorites (localStorage)
 * - Minimal animations (fade/slide)
 *
 * Notes (project context):
 * - API base: /cybernexus/api
 * - Credentials included (session cookies)
 * - Privacy-first, defensive learning platform
 */

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut", delay: i * 0.08 },
  }),
};

export const Privacy = () => {
  // ====== Favorites (localStorage) ======
  const [fav, setFav] = useState(() => {
    try {
      const raw = localStorage.getItem("cybernexus_privacy_fav_v1");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cybernexus_privacy_fav_v1", JSON.stringify(fav));
    } catch {
        /* storage unavailable — non-fatal */
      }
  }, [fav]);

  const toggleFav = (id) => {
    setFav((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  };

  // ====== API (optional small check) ======
  const API_BASE =
    import.meta.env.VITE_API_BASE ||
    "https://694fc8f1e1918.myxvest1.ru/cybernexus/api";

  const [apiStatus, setApiStatus] = useState("idle"); // idle | ok | fail
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/health.php`, {
          method: "GET",
          credentials: "include",
        });
        if (!alive) return;
        setApiStatus(res.ok ? "ok" : "fail");
      } catch {
        if (!alive) return;
        setApiStatus("fail");
      }
    })();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ====== Modal ======
  const [active, setActive] = useState(null);

  // ====== UI atoms ======
  const Glass = React.forwardRef(({ className, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={classNames(
        "rounded-2xl border bg-void-850/55 backdrop-blur-xl",
        "border-signal-500/40 shadow-glow-sm",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  ));
  Glass.displayName = "Glass";

  const Chip = ({ active: isActive, onClick, icon: Icon, children }) => (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-black tracking-wider transition-all",
        isActive
          ? "border-cyber-500 bg-cyber-500/10 text-cyber-300 shadow-glow-cyan"
          : "border-signal-500/30 bg-void-850/50 text-gray-200 hover:border-signal-500 hover:text-signal-300",
      )}
    >
      {Icon ? <Icon className="text-[12px]" /> : null}
      {children}
    </button>
  );

  const Clamp2 = ({ children, className }) => (
    <p
      className={classNames(
        "text-sm text-signal-300/80 leading-relaxed",
        className,
      )}
      style={{
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}
    >
      {children}
    </p>
  );

  // ====== Tabs / Sections ======
  const [section, setSection] = useState("Overview");

  const sectionTabs = useMemo(
    () => [
      { key: "Overview", label: "Overview", icon: FaShieldAlt },
      { key: "Data", label: "Data", icon: FaDatabase },
      { key: "Cookies", label: "Cookies", icon: FaCookieBite },
      { key: "Security", label: "Security", icon: FaLock },
      { key: "Rights", label: "Your Rights", icon: FaUserShield },
      { key: "Contact", label: "Contact", icon: FaEnvelope },
      { key: "Changelog", label: "Changelog", icon: FaClipboardCheck },
    ],
    [],
  );

  const refs = {
    Overview: useRef(null),
    Data: useRef(null),
    Cookies: useRef(null),
    Security: useRef(null),
    Rights: useRef(null),
    Contact: useRef(null),
    Changelog: useRef(null),
  };

  const scrollTo = (key) => {
    const el = refs[key]?.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 92;
    window.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    const keys = Object.keys(refs);
    const els = keys.map((k) => refs[k].current).filter(Boolean);
    if (els.length === 0) return;

    const ob = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0),
          )[0];

        if (visible?.target?.dataset?.section) {
          setSection(visible.target.dataset.section);
        }
      },
      { root: null, threshold: [0.12, 0.2, 0.35, 0.5, 0.65] },
    );

    els.forEach((el) => ob.observe(el));
    return () => ob.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ====== Policy cards (modal) ======
  const policyCards = useMemo(
    () => [
      {
        id: "p-collect",
        icon: FaDatabase,
        title: "WHAT WE COLLECT",
        desc: "Minimal data: account info + security logs. We don’t sell data.",
        details:
          "CyberNexus collects only what is needed to run accounts and keep the platform secure:\n\n• Account data: name/username, email, optional profile fields.\n• Usage signals (basic): pages visited, feature usage (aggregated).\n• Security logs: IP (for abuse prevention), login events, failed attempts.\n\nWe do not intentionally collect sensitive personal data. We do not sell user data.",
        tags: ["Minimal", "Necessary", "No Selling"],
      },
      {
        id: "p-purpose",
        icon: FaShieldAlt,
        title: "WHY WE COLLECT",
        desc: "To deliver features, protect accounts, and improve reliability.",
        details:
          "Purposes:\n\n• Provide platform features (news, learning, community links).\n• Authentication and session management.\n• Fraud/abuse detection (rate-limits, suspicious logins).\n• Reliability improvements (bug fixes, performance).\n\nWe avoid collecting data that is not required for these purposes.",
        tags: ["Service", "Security", "Quality"],
      },
      {
        id: "p-share",
        icon: FaGlobe,
        title: "DATA SHARING",
        desc: "Only with essential providers or when required by law.",
        details:
          "We may share limited data with:\n\n• Hosting / infrastructure providers (to run the site and APIs).\n• Email providers (to send verification, password reset, notifications).\n\nWe do not share data for advertising profiling. If law requires disclosure, we aim to provide the minimum legally required data.",
        tags: ["Providers", "Legal", "Minimum"],
      },
      {
        id: "p-retention",
        icon: FaTrashAlt,
        title: "RETENTION",
        desc: "We keep data only as long as necessary for safety and service.",
        details:
          "Retention approach:\n\n• Account data: kept while your account is active.\n• Security logs: kept for a limited time to investigate abuse.\n• Aggregated analytics: may be kept longer because it’s not tied to you.\n\nIf you request account deletion, we remove personal data where possible while preserving minimal records required for security/abuse prevention.",
        tags: ["Limited", "Deletion", "Security Logs"],
      },
    ],
    [],
  );

  const cookieCards = useMemo(
    () => [
      {
        id: "c-session",
        icon: FaCookieBite,
        title: "SESSION COOKIES",
        desc: "Used to keep you signed in (credentials: include).",
        details:
          "CyberNexus uses session cookies for authentication. Your browser may store a session identifier so the API knows you are logged in.\n\nWe recommend:\n• Use strong passwords\n• Enable 2FA if/when available\n• Don’t log in on shared devices\n\nNote: Some browsers may block cross-site cookies depending on privacy settings.",
        tags: ["Auth", "Session", "Browser"],
      },
      {
        id: "c-preferences",
        icon: FaKey,
        title: "PREFERENCES",
        desc: "Local preferences like favorites are stored in your browser.",
        details:
          "We store some preferences in localStorage (on your device), for example:\n\n• Favorites on About/Privacy pages\n• UI choices (if you add them later)\n\nThis data does not automatically leave your device unless you submit it through a form or API request.",
        tags: ["localStorage", "UI", "Device-only"],
      },
      {
        id: "c-analytics",
        icon: FaServer,
        title: "BASIC ANALYTICS",
        desc: "Used to improve stability and understand feature usage.",
        details:
          "We may use basic aggregated analytics to understand:\n\n• Which features are used most\n• Where errors happen\n• Performance bottlenecks\n\nWe aim to keep analytics minimal, aggregated, and not used for ad tracking.",
        tags: ["Aggregated", "Performance", "No Ads"],
      },
    ],
    [],
  );

  const securityCards = useMemo(
    () => [
      {
        id: "s-auth",
        icon: FaLock,
        title: "ACCOUNT SECURITY",
        desc: "Secure sessions, rate-limits, and safe defaults.",
        details:
          "Security measures include:\n\n• Session-based auth with credentials included\n• Rate-limiting and abuse prevention\n• Input validation and sanitization (XSS/Injection defense mindset)\n• Strict CORS policies (where applicable)\n\nNo system is 100% perfect — if you find an issue, please report responsibly.",
        tags: ["Sessions", "Rate-limit", "Validation"],
      },
      {
        id: "s-defensive",
        icon: FaShieldAlt,
        title: "DEFENSIVE LEARNING ONLY",
        desc: "We focus on safety — no harmful instructions.",
        details:
          "CyberNexus is designed for defensive learning:\n\n• Awareness & safe practice\n• Checklists, hardening, privacy guidance\n• No step-by-step harmful exploitation guides\n\nCommunity spaces should follow safe and legal learning rules.",
        tags: ["Defensive", "Safe", "Legal"],
      },
      {
        id: "s-report",
        icon: FaBug,
        title: "REPORT A VULNERABILITY",
        desc: "Responsible disclosure path for security researchers.",
        details:
          "If you believe you found a security issue:\n\n• Don’t publicly disclose immediately\n• Provide clear reproduction steps\n• Avoid accessing other users’ data\n\nContact us via Telegram or email (below). We will acknowledge and patch as soon as possible.",
        tags: ["Disclosure", "Ethical", "Fixes"],
      },
    ],
    [],
  );

  const rights = useMemo(
    () => [
      {
        id: "r-access",
        icon: FaUserShield,
        title: "Access",
        text: "You can request a summary of your account data we store.",
      },
      {
        id: "r-correct",
        icon: FaClipboardCheck,
        title: "Correction",
        text: "You can request corrections if your data is wrong.",
      },
      {
        id: "r-delete",
        icon: FaTrashAlt,
        title: "Deletion",
        text: "You can request account deletion (subject to security log limits).",
      },
      {
        id: "r-optout",
        icon: FaCookieBite,
        title: "Cookie Controls",
        text: "You can control cookies via your browser settings.",
      },
    ],
    [],
  );

  // ====== Contact targets ======
  const contact = useMemo(
    () => ({
      telegramChannel: "https://t.me/cyber_nexuss",
      telegramChat: "https://t.me/cybernexus_chat",
      adminHandle: "@rootzero_x",
      instagram: "https://instagram.com/cybernexus.uz",
      email: "support@cybernexus.uz",
    }),
    [],
  );

  const quickLinks = useMemo(
    () => [
      {
        id: "q-telegram",
        icon: FaTelegram,
        label: "Telegram Channel",
        href: contact.telegramChannel,
      },
      {
        id: "q-chat",
        icon: FaTelegram,
        label: "Community Chat",
        href: contact.telegramChat,
      },
      {
        id: "q-instagram",
        icon: FaExternalLinkAlt,
        label: "Instagram",
        href: contact.instagram,
      },
      {
        id: "q-email",
        icon: FaEnvelope,
        label: "Email Support",
        href: `mailto:${contact.email}`,
      },
    ],
    [contact],
  );

  return (
    <div className="w-full min-h-screen font-mono text-signal-300 overflow-x-hidden">
      {/* soft grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,170,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,170,.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-12">
        {/* HERO */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={0}
        >
          <Glass className="p-5 sm:p-7" ref={refs.Overview}>
            <div data-section="Overview" className="scroll-mt-[92px]">
              <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-lg border border-cyber-500/40 bg-cyber-500/10 grid place-items-center shadow-glow-cyan">
                      <FaUserShield className="text-cyber-300" />
                    </div>
                    <div className="min-w-0">
                      <h1 className="text-2xl sm:text-3xl font-black tracking-wider text-signal-300 truncate">
                        Privacy Policy
                      </h1>
                      <p className="mt-1 text-xs sm:text-sm text-cyber-300/90 font-bold tracking-widest truncate">
                        CYBER NEXUS • PRIVACY-FIRST • DEFENSIVE
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm sm:text-base text-white/55 leading-relaxed">
                    CyberNexus sizning maxfiyligingizni hurmat qiladi. Biz
                    minimal ma’lumot yig’amiz, xavfsizlikni birinchi o‘ringa
                    qo‘yamiz va reklama/profiling uchun data sotmaymiz. Bu
                    sahifa — qanday data ishlatilishi, cookie’lar va sizning
                    huquqlaringiz haqida.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Chip
                      active={fav.length > 0}
                      onClick={() => {
                        if (!fav.length) return;
                        const el = document.getElementById("fav-anchor");
                        if (el)
                          el.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                      }}
                      icon={fav.length ? FaStar : FaRegStar}
                    >
                      Favorites ({fav.length})
                    </Chip>

                    <Chip
                      active={section === "Security"}
                      onClick={() => scrollTo("Security")}
                      icon={FaLock}
                    >
                      Security
                    </Chip>

                    <Chip
                      active={section === "Rights"}
                      onClick={() => scrollTo("Rights")}
                      icon={FaUserShield}
                    >
                      Your Rights
                    </Chip>
                  </div>
                </div>

                {/* Right side status card */}
                <div className="w-full lg:w-[440px]">
                  <div className="rounded-2xl border border-signal-500/45 bg-void-850/60 p-4 shadow-glow-sm">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg border border-signal-500/45 bg-signal-500/10 grid place-items-center">
                        <FaShieldAlt className="text-signal-300 text-xl" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] font-black tracking-widest text-cyber-300/90">
                          PRIVACY STATUS
                        </div>
                        <div className="text-sm sm:text-base font-black text-white tracking-wider truncate">
                          MINIMAL DATA • SAFE DEFAULTS
                        </div>
                        <div className="mt-1 text-[11px] font-bold tracking-widest text-white/60 truncate">
                          COOKIES • SECURITY • RIGHTS
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="rounded-lg border border-cyber-500/35 bg-cyber-500/5 px-3 py-3 text-center">
                        <div className="text-[10px] font-black tracking-widest text-white/45">
                          API STATUS
                        </div>
                        <div className="mt-1 text-lg font-black text-cyber-300">
                          {apiStatus === "idle"
                            ? "..."
                            : apiStatus === "ok"
                              ? "OK"
                              : "CHECK"}
                        </div>
                      </div>

                      <div className="rounded-lg border border-signal-500/35 bg-signal-500/5 px-3 py-3 text-center">
                        <div className="text-[10px] font-black tracking-widest text-white/45">
                          POLICY
                        </div>
                        <div className="mt-1 text-lg font-black text-signal-300">
                          ACTIVE
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-white/45 flex items-center justify-between">
                    <span className="text-signal-300/80 font-bold tracking-widest">
                      CLICK CARDS → DETAILS
                    </span>
                    <span className="text-cyber-300/80 font-bold tracking-widest">
                      PREMIUM UI
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Glass>
        </motion.div>

        {/* STICKY TABS */}
        <div className="sticky top-0 z-30 pt-4">
          <div className="rounded-xl border border-signal-500/25 bg-void-850/70 backdrop-blur-xl px-3 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                {sectionTabs.map((t) => (
                  <Chip
                    key={t.key}
                    active={section === t.key}
                    onClick={() => scrollTo(t.key)}
                    icon={t.icon}
                  >
                    {t.label}
                  </Chip>
                ))}
              </div>

              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="hidden sm:inline-flex rounded-lg border border-cyber-500/30 bg-cyber-500/10 px-3 py-2 text-xs font-black tracking-widest text-cyber-300 hover:border-signal-500 hover:text-signal-300 transition-all"
              >
                TOP
              </button>
            </div>
          </div>
        </div>

        {/* DATA */}
        <section
          ref={refs.Data}
          data-section="Data"
          className="mt-6 scroll-mt-[92px]"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm sm:text-base font-black tracking-widest text-signal-300">
                DATA HANDLING
              </h2>
              <span className="text-[11px] text-white/35">
                minimal → secure
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {policyCards.map((p, idx) => {
                const isFav = fav.includes(p.id);
                return (
                  <motion.button
                    key={p.id}
                    type="button"
                    onClick={() => setActive({ ...p, kind: "Policy" })}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.05 + idx * 0.05,
                      ease: "easeOut",
                    }}
                    whileHover={{ y: -3 }}
                    className={classNames(
                      "rounded-2xl border bg-void-850/70 backdrop-blur p-5 text-left",
                      "border-signal-500/45 shadow-glow-sm",
                      "hover:border-cyber-500 hover:shadow-glow-cyan transition-all",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-12 w-12 rounded-lg border border-cyber-500/40 bg-cyber-500/10 grid place-items-center shadow-glow-cyan shrink-0">
                          <p.icon className="text-cyber-300" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm sm:text-base font-black tracking-wider text-white truncate">
                            {p.title}
                          </div>
                          <div className="mt-1 text-[11px] font-bold tracking-widest text-cyber-300/80 truncate">
                            PRIVACY • MINIMAL • SAFE
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFav(p.id);
                        }}
                        className={classNames(
                          "shrink-0 rounded-lg border px-2 py-2 transition-all",
                          isFav
                            ? "border-cyber-500 bg-cyber-500/10 text-cyber-300 shadow-glow-cyan"
                            : "border-signal-500/30 bg-void-850/50 text-gray-200 hover:border-signal-500 hover:text-signal-300",
                        )}
                        title="Favorite"
                        aria-label="favorite"
                      >
                        {isFav ? <FaStar /> : <FaRegStar />}
                      </button>
                    </div>

                    <div className="mt-3">
                      <Clamp2 className="text-white/55">{p.desc}</Clamp2>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {(p.tags || []).slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-black tracking-widest rounded-full border border-signal-500/25 bg-void-850/60 px-2 py-1 text-signal-300/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[11px] font-bold tracking-widest text-white/45">
                        DETAILS
                      </span>
                      <span className="text-xs font-black tracking-widest text-cyber-300">
                        OPEN →
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <div id="fav-anchor" className="mt-8" />

            {fav.length > 0 && (
              <Glass className="mt-5 p-5 sm:p-6 border-cyber-500/40 shadow-glow-cyan">
                <div className="flex items-start gap-3">
                  <div className="h-11 w-11 rounded-lg border border-cyber-500/40 bg-cyber-500/10 grid place-items-center shadow-glow-cyan">
                    <FaStar className="text-cyber-300" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm sm:text-base font-black tracking-widest text-cyber-300">
                      FAVORITES
                    </div>
                    <p className="mt-2 text-sm text-white/55 leading-relaxed">
                      Siz saqlagan policy kartalar:{" "}
                      <span className="text-signal-300 font-black">
                        {fav.length}
                      </span>{" "}
                      ta.
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {fav.slice(0, 12).map((id) => (
                        <span
                          key={id}
                          className="text-[10px] font-black tracking-widest rounded-full border border-signal-500/25 bg-void-850/60 px-2 py-1 text-signal-300/80"
                        >
                          {id}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Glass>
            )}
          </motion.div>
        </section>

        {/* COOKIES */}
        <section
          ref={refs.Cookies}
          data-section="Cookies"
          className="mt-10 scroll-mt-[92px]"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm sm:text-base font-black tracking-widest text-cyber-300">
                COOKIES & PREFERENCES
              </h2>
              <span className="text-[11px] text-white/35">
                browser controls →
              </span>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {cookieCards.map((c) => {
                const isFav = fav.includes(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActive({ ...c, kind: "Cookies" })}
                    className={classNames(
                      "min-w-[300px] sm:min-w-[360px] lg:min-w-[420px]",
                      "rounded-2xl border bg-void-850/70 backdrop-blur p-4 text-left",
                      "border-signal-500/45 shadow-glow-sm",
                      "hover:border-cyber-500 hover:shadow-glow-cyan transition-all",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-12 w-12 rounded-lg border border-cyber-500/40 bg-cyber-500/10 grid place-items-center shadow-glow-cyan shrink-0">
                          <c.icon className="text-cyber-300" />
                        </div>

                        <div className="min-w-0">
                          <div className="text-base font-black tracking-wider text-signal-300 truncate">
                            {c.title}
                          </div>
                          <div className="mt-1 text-[11px] font-bold tracking-widest text-cyber-300/80 truncate">
                            COOKIES • STORAGE • CONTROL
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFav(c.id);
                        }}
                        className={classNames(
                          "shrink-0 rounded-lg border px-2 py-2 transition-all",
                          isFav
                            ? "border-cyber-500 bg-cyber-500/10 text-cyber-300 shadow-glow-cyan"
                            : "border-signal-500/30 bg-void-850/50 text-gray-200 hover:border-signal-500 hover:text-signal-300",
                        )}
                        title="Favorite"
                        aria-label="favorite"
                      >
                        {isFav ? <FaStar /> : <FaRegStar />}
                      </button>
                    </div>

                    <div className="mt-3">
                      <Clamp2 className="mt-2 text-white/55">
                        {c.desc}
                      </Clamp2>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[11px] font-bold tracking-widest text-white/45">
                        QUICK VIEW
                      </span>
                      <span className="text-xs font-black tracking-widest text-cyber-300">
                        OPEN →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* SECURITY */}
        <section
          ref={refs.Security}
          data-section="Security"
          className="mt-10 scroll-mt-[92px]"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
          >
            <Glass className="p-5 sm:p-7 border-cyber-500/40 shadow-glow-cyan">
              <div className="flex items-start gap-4">
                <div className="shrink-0 h-12 w-12 rounded-lg border border-cyber-500/40 bg-cyber-500/10 grid place-items-center shadow-glow-cyan">
                  <FaLock className="text-cyber-300" />
                </div>
                <div className="min-w-0 w-full">
                  <h2 className="text-lg sm:text-xl font-black tracking-wider text-cyber-300">
                    &gt;_ SECURITY PRACTICES
                  </h2>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/55">
                    Biz “privacy-first + security-first” tamoyili bilan
                    ishlaymiz: minimal data, himoya choralar, va defensive
                    learning.
                  </p>

                  <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {securityCards.map((s, idx) => (
                      <motion.button
                        key={s.id}
                        type="button"
                        onClick={() => setActive({ ...s, kind: "Security" })}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.35,
                          delay: 0.04 + idx * 0.06,
                        }}
                        className={classNames(
                          "rounded-2xl border bg-black/65 backdrop-blur p-4 text-left",
                          "border-signal-500/35 shadow-glow-sm",
                          "hover:border-cyber-500 hover:shadow-glow-cyan transition-all",
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg border border-signal-500/30 bg-signal-500/10 grid place-items-center">
                            <s.icon className="text-signal-300" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-black tracking-wider text-white truncate">
                              {s.title}
                            </div>
                            <div className="mt-1 text-[11px] font-bold tracking-widest text-white/45 truncate">
                              SECURITY • DEFENSIVE • SAFE
                            </div>
                          </div>
                        </div>

                        <div className="mt-3">
                          <Clamp2 className="text-white/55">{s.desc}</Clamp2>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </Glass>
          </motion.div>
        </section>

        {/* RIGHTS */}
        <section
          ref={refs.Rights}
          data-section="Rights"
          className="mt-10 scroll-mt-[92px]"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
          >
            <Glass className="p-5 sm:p-7">
              <div className="flex items-start gap-4">
                <div className="shrink-0 h-12 w-12 rounded-lg border border-signal-500/40 bg-signal-500/10 grid place-items-center shadow-glow-sm">
                  <FaUserShield className="text-signal-300" />
                </div>
                <div className="min-w-0 w-full">
                  <h2 className="text-lg sm:text-xl font-black tracking-wider text-signal-300">
                    &gt;_ YOUR RIGHTS
                  </h2>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/55">
                    Siz o‘zingizga tegishli ma’lumotlar bo‘yicha so‘rov
                    yuborishingiz mumkin. Biz imkon qadar tez javob beramiz.
                  </p>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {rights.map((r) => (
                      <div
                        key={r.id}
                        className="rounded-xl border border-cyber-500/35 bg-cyber-500/5 p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg border border-cyber-500/35 bg-cyber-500/10 grid place-items-center">
                            <r.icon className="text-cyber-300" />
                          </div>
                          <div>
                            <div className="text-sm font-black tracking-widest text-cyber-300">
                              {r.title.toUpperCase()}
                            </div>
                            <div className="mt-1 text-sm text-white/55 leading-relaxed">
                              {r.text}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 text-xs text-white/35">
                    * Browser cookie controls: Settings → Privacy → Cookies /
                    Tracking.
                  </div>
                </div>
              </div>
            </Glass>
          </motion.div>
        </section>

        {/* CONTACT */}
        <section
          ref={refs.Contact}
          data-section="Contact"
          className="mt-10 scroll-mt-[92px]"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={5}
          >
            <Glass className="p-5 sm:p-7 border-cyber-500/40 shadow-glow-cyan">
              <div className="flex items-start gap-4">
                <div className="shrink-0 h-12 w-12 rounded-lg border border-cyber-500/40 bg-cyber-500/10 grid place-items-center shadow-glow-cyan">
                  <FaEnvelope className="text-cyber-300" />
                </div>
                <div className="min-w-0 w-full">
                  <h2 className="text-lg sm:text-xl font-black tracking-wider text-cyber-300">
                    &gt;_ CONTACT
                  </h2>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/55">
                    Privacy yoki security masalalari bo‘yicha bog‘lanish:
                    <span className="text-signal-300 font-black">
                      {" "}
                      {contact.adminHandle}
                    </span>
                  </p>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {quickLinks.map((q) => (
                      <a
                        key={q.id}
                        href={q.href}
                        target={
                          q.href.startsWith("mailto:") ? undefined : "_blank"
                        }
                        rel={
                          q.href.startsWith("mailto:")
                            ? undefined
                            : "noopener noreferrer"
                        }
                        className={classNames(
                          "rounded-2xl border bg-void-850/60 backdrop-blur px-4 py-4",
                          "border-signal-500/35 shadow-glow-sm",
                          "hover:border-cyber-500 hover:shadow-glow-cyan transition-all",
                          "flex items-center gap-3",
                        )}
                      >
                        <div className="h-10 w-10 rounded-lg border border-cyber-500/35 bg-cyber-500/10 grid place-items-center">
                          <q.icon className="text-cyber-300" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-black tracking-wider text-white truncate">
                            {q.label}
                          </div>
                          <div className="mt-1 text-[11px] font-bold tracking-widest text-white/45 truncate">
                            OPEN →
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>

                  <div className="mt-5 rounded-xl border border-signal-500/25 bg-void-850/60 p-4">
                    <div className="text-[11px] font-black tracking-widest text-white/45">
                      SECURITY REPORT NOTE
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-signal-300/80">
                      Xavfsizlik muammosi bo‘lsa: ommaga chiqarmasdan avval
                      bizga yuboring, boshqa foydalanuvchi datalariga tegmang,
                      va minimal proof bilan report qiling.
                    </p>
                  </div>
                </div>
              </div>
            </Glass>
          </motion.div>
        </section>

        {/* CHANGELOG */}
        <section
          ref={refs.Changelog}
          data-section="Changelog"
          className="mt-10 scroll-mt-[92px]"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={6}
          >
            <Glass className="p-5 sm:p-7">
              <div className="flex items-start gap-4">
                <div className="shrink-0 h-12 w-12 rounded-lg border border-signal-500/40 bg-signal-500/10 grid place-items-center shadow-glow-sm">
                  <FaClipboardCheck className="text-signal-300" />
                </div>
                <div className="min-w-0 w-full">
                  <h2 className="text-lg sm:text-xl font-black tracking-wider text-signal-300">
                    &gt;_ CHANGELOG
                  </h2>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/55">
                    Policy yangilanishlari shu yerda ko‘rsatiladi. (Siz
                    xohlasangiz backenddan ham olib kelamiz.)
                  </p>

                  <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        k: "v1",
                        title: "v1.0",
                        date: "2026",
                        text: "Initial privacy policy layout + defensive focus.",
                      },
                      {
                        k: "v1.1",
                        title: "v1.1",
                        date: "Soon",
                        text: "2FA / RBAC notes + expanded security reporting.",
                      },
                      {
                        k: "v1.2",
                        title: "v1.2",
                        date: "Soon",
                        text: "Detailed retention periods + transparency report.",
                      },
                    ].map((x) => (
                      <div
                        key={x.k}
                        className="rounded-xl border border-cyber-500/35 bg-cyber-500/5 p-4"
                      >
                        <div className="text-xs font-black tracking-widest text-cyber-300">
                          {x.title} • {x.date}
                        </div>
                        <div className="mt-2 text-sm text-white/55 leading-relaxed">
                          {x.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Glass>
          </motion.div>
        </section>

        {/* FOOTER */}
        <motion.footer
          className="mt-12 pt-8 border-t-2 border-signal-500/30 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          <p className="text-xs sm:text-sm text-white/35 mb-2 font-mono">
            © 2025–2026 CYBER NEXUS — ALL RIGHTS RESERVED
          </p>
          <a
            href="https://cybernexus.uz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyber-300 hover:text-signal-300 transition-colors duration-300 font-black text-sm sm:text-base tracking-wider"
          >
            &gt; cybernexus.uz_
          </a>
        </motion.footer>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {active && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-void-850/70 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={() => setActive(null)}
            >
              <div
                className="w-full max-w-2xl rounded-2xl border border-cyber-500 bg-void-900/90 backdrop-blur p-5 shadow-glow-cyan"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-14 w-14 rounded-lg border border-signal-500/35 bg-signal-500/10 grid place-items-center overflow-hidden shrink-0">
                      {active.icon ? (
                        <active.icon className="text-signal-300 text-2xl" />
                      ) : (
                        <FaShieldAlt className="text-signal-300 text-2xl" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="text-lg sm:text-xl font-black tracking-wider text-signal-300 line-clamp-2">
                        {active.title}
                      </div>
                      <div className="mt-2 text-xs font-bold tracking-widest text-cyber-300/90 truncate">
                        {active.kind || "DETAILS"} • CYBER NEXUS
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    className="rounded-lg border border-cyber-500/40 bg-cyber-500/10 p-2 text-cyber-300 hover:border-signal-500 hover:text-signal-300 transition-all"
                    aria-label="close"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="mt-4 rounded-xl border border-signal-500/25 bg-void-850/60 p-4">
                  <div className="text-[11px] font-black tracking-widest text-white/45">
                    SUMMARY
                  </div>
                  <p className="mt-2 text-sm text-white/55 leading-relaxed">
                    {active.details}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Privacy;
