// src/pages/About/About.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
} from "framer-motion";
import {
  FaTelegram,
  FaInstagram,
  FaGithub,
  FaShieldAlt,
  FaUsers,
  FaCheckCircle,
  FaTrophy,
  FaLock,
  FaCode,
  FaNetworkWired,
  FaRocket,
  FaBolt,
  FaGraduationCap,
  FaLayerGroup,
  FaStar,
  FaRegStar,
  FaTimes,
  FaExternalLinkAlt,
  FaBook,
  FaBug,
  FaClipboardCheck,
} from "react-icons/fa";

/**
 * ✅ CyberNexus About — Premium (News page design language)
 * - Glass hero + sticky tabs (section navigation)
 * - Featured horizontal carousel
 * - Responsive premium cards
 * - Modal details for feature/roadmap cards
 * - Favorites (localStorage)
 * - Minimal clean animations (fade/slide only)
 * - Live users count from backend API
 */

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut", delay: i * 0.08 },
  }),
};

export const About = () => {
  // ====== Favorites (localStorage) ======
  const [fav, setFav] = useState(() => {
    try {
      const raw = localStorage.getItem("cybernexus_about_fav_v1");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cybernexus_about_fav_v1", JSON.stringify(fav));
    } catch {}
  }, [fav]);

  const toggleFav = (id) => {
    setFav((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  };

  // ====== Live stats from backend ======
  const [usersCount, setUsersCount] = useState(null);
  const usersMv = useMotionValue(0);
  const [usersDisplay, setUsersDisplay] = useState("0");

  const API_BASE =
    import.meta.env.VITE_API_BASE ||
    "https://694fc8f1e1918.myxvest1.ru/cybernexus/api";

  // ====== Modal ======
  const [active, setActive] = useState(null);

  // ====== Social popover ======
  const [isMobile, setIsMobile] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef(null);
  const joinBtnRef = useRef(null);

  useEffect(() => {
    const check = () =>
      setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!isPopoverOpen) return;
      const t = e.target;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(t) &&
        joinBtnRef.current &&
        !joinBtnRef.current.contains(t)
      ) {
        setIsPopoverOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [isPopoverOpen]);

  // ====== Fetch users count from API ======
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const res = await fetch(`${API_BASE}/stats/users_count.php`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (!alive) return;

        const cnt = Number(data?.users_count ?? 0);
        setUsersCount(cnt);

        // 0 -> cnt animation
        animateCount(usersMv, cnt, setUsersDisplay);
      } catch {
        // fallback: agar API ishlamasa 0 qoladi (UI buzilmaydi)
        setUsersCount(0);
        setUsersDisplay("0");
      }
    })();

    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ====== Helper functions ======
  const formatCompact = (n) => {
    const num = Number(n || 0);
    if (!Number.isFinite(num)) return "0";
    if (num < 1000) return String(num);
    if (num < 1_000_000) {
      const v = num / 1000;
      return `${v >= 10 ? v.toFixed(0) : v.toFixed(1)}k`;
    }
    if (num < 1_000_000_000) {
      const v = num / 1_000_000;
      return `${v >= 10 ? v.toFixed(0) : v.toFixed(1)}M`;
    }
    const v = num / 1_000_000_000;
    return `${v >= 10 ? v.toFixed(0) : v.toFixed(1)}B`;
  };

  const animateCount = (mv, to, onUpdate) => {
    mv.set(0);
    return animate(mv, to, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => {
        const rounded = Math.round(latest);
        onUpdate(formatCompact(rounded));
      },
    });
  };

  // ====== Data ======
  const stats = useMemo(
    () => [
      {
        id: "stat-award",
        icon: FaTrophy,
        value: "01",
        label: "TUMAN BOSQICHI",
        accent: "text-yellow-400",
        border: "border-yellow-400/50",
        bg: "bg-yellow-400/10",
      },
      {
        id: "stat-active",
        icon: FaUsers,
        value: "2",
        label: "SUBDOMAINLAR",
        accent: "text-neon-green",
        border: "border-neon-green/40",
        bg: "bg-neon-green/10",
      },
      {
        id: "stat-registered",
        icon: FaCheckCircle,
        value: usersDisplay,
        label: "RO'YXATDAN O'TGAN",
        accent: "text-neon-blue",
        border: "border-neon-blue/40",
        bg: "bg-neon-blue/10",
      },
    ],
    [usersDisplay],
  );

  const features = useMemo(
    () => [
      {
        id: "feat-cyber-knowledge",
        icon: FaLock,
        title: "KIBERXAVFSIZLIK BILIMI",
        desc: "Zamonaviy tahdidlardan himoyalanish, xavflarni aniqlash va real amaliyotga yo'naltirilgan bilimlar.",
        details:
          "Threat modeling, incident mindset, va real hayotdagi hujum zanjirlarini tushunish: password hygiene, 2FA, session security, endpoint basics, data protection.",
        tags: ["Defense", "Privacy", "Basics"],
        link: "https://cybernexus.uz",
      },
      {
        id: "feat-awareness",
        icon: FaShieldAlt,
        title: "CYBER AWARENESS",
        desc: "Phishing, social engineering, account security va digital hygiene bo'yicha mustahkam ko'nikmalar.",
        details:
          "AiTM/credential theft, fake domains, email spoofing, malicious attachments: qanday tanish, qanday tekshirish, qanday bloklash — oddiy va amaliy yondashuv.",
        tags: ["Phishing", "OSINT", "Hygiene"],
        link: "https://cybernexus.uz",
      },
      {
        id: "feat-tools",
        icon: FaNetworkWired,
        title: "AMALIY DASTURLAR",
        desc: "Tarmoq tahlili, vulnerability assessment va pentesting ekotizimi bo'yicha foydali tool'lar to'plami.",
        details:
          "Network fundamentals, scanning basics, vuln triage, hardening checklists. Maqsad: xavfsizlikni oshirish — zarar yetkazish emas.",
        tags: ["Tools", "Network", "Vuln"],
        link: "https://cybernexus.uz",
      },
      {
        id: "feat-qa",
        icon: FaGraduationCap,
        title: "SAVOL–JAVOB",
        desc: "Mutaxassislar va community yordamida real case'lar bo'yicha tezkor maslahatlar va yo'nalish.",
        details:
          "Yo'l xaritasi, resurs tavsiyalari, learning path: boshlovchi → intermediate → portfolio. Savollarni to'g'ri berish va debug fikrlash.",
        tags: ["Community", "Roadmap", "Mentor"],
        link: "https://t.me/cyber_nexuss",
      },
    ],
    [],
  );

  const roadmap = useMemo(
    () => [
      {
        id: "road-news",
        icon: FaBook,
        title: "NEWS FEED (VERIFIED)",
        desc: "CISA / Microsoft / Reuters kabi manbalardan yangiliklar — qisqa va aniq formatda.",
        details:
          "News bo'limi: kategoriya, qidiruv, favorites, modal details. Maqsad: o'qib chiqish oson, share qilish qulay.",
        tags: ["News", "Verified", "Daily"],
        link: "https://cybernexus.uz",
      },
      {
        id: "road-checklists",
        icon: FaClipboardCheck,
        title: "SECURITY CHECKLISTS",
        desc: "Account security, device hardening va privacy bo'yicha tayyor checklist'lar.",
        details:
          "Har bir checklist: 10–20 band, real-world tavsiyalar, 2FA, password manager, backup, browser safety.",
        tags: ["Hardening", "Privacy", "Practice"],
        link: "https://cybernexus.uz",
      },
      {
        id: "road-labs",
        icon: FaBug,
        title: "LABS (SAFE PRACTICE)",
        desc: "Simulyatsiya va xavfsiz mashqlar: log analysis, basic forensics, phishing recognition.",
        details:
          "Xavfsiz va qonuniy format: faqat o'rganish va himoya uchun. Yomon niyatli yo'riqnomalar yo'q.",
        tags: ["Labs", "Learning", "Defensive"],
        link: "https://cybernexus.uz",
      },
    ],
    [],
  );

  const socials = useMemo(
    () => [
      {
        icon: FaTelegram,
        label: "TELEGRAM",
        href: "https://t.me/cyber_nexuss",
      },
      {
        icon: FaInstagram,
        label: "INSTAGRAM",
        href: "https://instagram.com/cybernexus.uz",
      },
      {
        icon: FaGithub,
        label: "GITHUB",
        href: "https://github.com/rootzero-x",
      },
    ],
    [],
  );

  // ====== Section tabs (sticky) ======
  const [section, setSection] = useState("Overview");

  const sectionTabs = useMemo(
    () => [
      { key: "Overview", label: "Overview", icon: FaLayerGroup },
      { key: "Mission", label: "Mission", icon: FaShieldAlt },
      { key: "Stats", label: "Stats", icon: FaUsers },
      { key: "Features", label: "Features", icon: FaCode },
      { key: "Roadmap", label: "Roadmap", icon: FaRocket },
      { key: "Community", label: "Community", icon: FaBolt },
    ],
    [],
  );

  const refs = {
    Overview: useRef(null),
    Mission: useRef(null),
    Stats: useRef(null),
    Features: useRef(null),
    Roadmap: useRef(null),
    Community: useRef(null),
  };

  const scrollTo = (key) => {
    const el = refs[key]?.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 92;
    window.scrollTo({ top, behavior: "smooth" });
  };

  // Active section highlight (IntersectionObserver)
  useEffect(() => {
    const keys = Object.keys(refs);
    const els = keys.map((k) => refs[k].current).filter(Boolean);
    if (els.length === 0) return;

    const ob = new IntersectionObserver(
      (entries) => {
        // pick the most visible
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

  // ====== UI atoms (match News style) ======
  const Glass = ({ className, children }) => (
    <div
      className={classNames(
        "rounded-xl border-2 bg-black/55 backdrop-blur-xl",
        "border-neon-green/40 shadow-neon",
        className,
      )}
    >
      {children}
    </div>
  );

  const Chip = ({ active, onClick, icon: Icon, children }) => (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-black tracking-wider transition-all",
        active
          ? "border-neon-blue bg-neon-blue/10 text-neon-blue shadow-neon-blue"
          : "border-neon-green/30 bg-black/50 text-gray-200 hover:border-neon-green hover:text-neon-green",
      )}
    >
      {Icon ? <Icon className="text-[12px]" /> : null}
      {children}
    </button>
  );

  const Clamp2 = ({ children, className }) => (
    <p
      className={classNames(
        "text-sm text-neon-green/80 leading-relaxed",
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

  return (
    <div className="w-full min-h-screen bg-black font-mono text-neon-green overflow-x-hidden">
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
        {/* HERO (Glass) */}
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
                    <div className="h-11 w-11 rounded-lg border border-neon-blue/40 bg-neon-blue/10 grid place-items-center shadow-neon-blue">
                      <FaShieldAlt className="text-neon-blue" />
                    </div>
                    <div className="min-w-0">
                      <h1 className="text-2xl sm:text-3xl font-black tracking-wider text-neon-green truncate">
                        Cyber Nexus
                      </h1>
                      <p className="mt-1 text-xs sm:text-sm text-neon-blue/90 font-bold tracking-widest truncate">
                        ABOUT • ROADMAP • COMMUNITY
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm sm:text-base text-gray-300/90 leading-relaxed">
                    Cyber Nexus — kiberxavfsizlik bo'yicha amaliy bilimlar,
                    verified yangiliklar va community'ni birlashtiradigan
                    platforma. Maqsad: raqamli dunyoda xavfsiz qolish uchun aniq
                    yo'l-yo'riq, resurslar va real practice.
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
                      active={section === "Features"}
                      onClick={() => scrollTo("Features")}
                      icon={FaCode}
                    >
                      Platform
                    </Chip>
                    <Chip
                      active={section === "Roadmap"}
                      onClick={() => scrollTo("Roadmap")}
                      icon={FaRocket}
                    >
                      Roadmap
                    </Chip>
                  </div>
                </div>

                {/* Right side badge */}
                <div className="w-full lg:w-[440px]">
                  <div className="rounded-xl border-2 border-yellow-400/60 bg-yellow-400/10 p-4 shadow-[0_0_24px_rgba(250,204,21,0.18)]">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg border border-yellow-400/60 bg-yellow-400/10 grid place-items-center">
                        <FaTrophy className="text-yellow-400 text-xl" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] font-black tracking-widest text-yellow-300">
                          YOSH IXTIROCHI
                        </div>
                        <div className="text-sm sm:text-base font-black text-white tracking-wider truncate">
                          VILOYAT BOSQICHI
                        </div>
                        <div className="mt-1 text-[11px] font-bold tracking-widest text-gray-300 truncate">
                          PROGRESS • REAL RESULTS • COMMUNITY
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {stats.map((s) => (
                        <div
                          key={s.id}
                          className={classNames(
                            "rounded-lg border bg-black/60 px-3 py-3 text-center",
                            s.border,
                          )}
                        >
                          <div className="text-[10px] font-black tracking-widest text-gray-400">
                            {s.label}
                          </div>
                          <div
                            className={classNames(
                              "mt-1 text-lg font-black",
                              s.accent,
                            )}
                          >
                            {s.id === "stat-registered" && usersCount === null
                              ? "..."
                              : s.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-gray-400 flex items-center justify-between">
                    <span className="text-neon-green/80 font-bold tracking-widest">
                      CLICK CARDS → DETAILS
                    </span>
                    <span className="text-neon-blue/80 font-bold tracking-widest">
                      PREMIUM UI
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Glass>
        </motion.div>

        {/* STICKY SECTION TABS */}
        <div className="sticky top-0 z-30 pt-4">
          <div className="rounded-xl border border-neon-green/25 bg-black/70 backdrop-blur-xl px-3 py-3">
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
                className="hidden sm:inline-flex rounded-lg border border-neon-blue/30 bg-neon-blue/10 px-3 py-2 text-xs font-black tracking-widest text-neon-blue hover:border-neon-green hover:text-neon-green transition-all"
              >
                TOP
              </button>
            </div>
          </div>
        </div>

        {/* MISSION */}
        <section
          ref={refs.Mission}
          data-section="Mission"
          className="mt-6 scroll-mt-[92px]"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
          >
            <Glass className="p-5 sm:p-7">
              <div className="flex items-start gap-4">
                <div className="shrink-0 h-12 w-12 rounded-lg border border-neon-green/40 bg-neon-green/10 grid place-items-center shadow-neon">
                  <FaShieldAlt className="text-neon-green" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-black tracking-wider text-neon-green">
                    &gt;_ MISSIYAMIZ
                  </h2>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-300/90">
                    Cyber Nexus — kiberxavfsizlikni o'rganish va amaliyotga
                    tatbiq qilish uchun premium platforma. Biz "verified sources
                    + real practice + community" konseptini birlashtiramiz:
                    yangiliklar, roadmap, checklist va o'quv yo'nalishlar.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Chip
                      active={false}
                      onClick={() => scrollTo("Roadmap")}
                      icon={FaRocket}
                    >
                      Roadmap-based growth
                    </Chip>
                    <Chip
                      active={false}
                      onClick={() => scrollTo("Features")}
                      icon={FaLock}
                    >
                      Privacy-first mindset
                    </Chip>
                    <Chip
                      active={false}
                      onClick={() => scrollTo("Community")}
                      icon={FaUsers}
                    >
                      Community support
                    </Chip>
                  </div>
                </div>
              </div>
            </Glass>
          </motion.div>
        </section>

        {/* STATS GRID */}
        <section
          ref={refs.Stats}
          data-section="Stats"
          className="mt-6 scroll-mt-[92px]"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm sm:text-base font-black tracking-widest text-neon-blue">
                REAL NATIJALAR
              </h2>
              <span className="text-[11px] text-gray-500">
                trusted growth →
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {stats.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.04 + i * 0.06,
                    ease: "easeOut",
                  }}
                  className={classNames(
                    "rounded-xl border-2 bg-black/70 backdrop-blur p-5 text-center",
                    "shadow-neon transition-all hover:border-neon-blue hover:shadow-neon-blue",
                    s.border,
                  )}
                >
                  <div
                    className={classNames(
                      "mx-auto mb-4 grid h-12 w-12 place-items-center rounded-lg border",
                      s.border,
                      s.bg,
                    )}
                  >
                    <s.icon className={classNames("text-2xl", s.accent)} />
                  </div>

                  <div
                    className={classNames(
                      "text-4xl sm:text-5xl font-black",
                      s.accent,
                    )}
                  >
                    {s.id === "stat-registered" && usersCount === null
                      ? "..."
                      : s.value}
                  </div>
                  <div className="mt-2 text-xs font-black tracking-widest text-gray-400">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* FEATURES (cards + modal) */}
        <section
          ref={refs.Features}
          data-section="Features"
          className="mt-8 scroll-mt-[92px]"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm sm:text-base font-black tracking-widest text-neon-green">
                PLATFORM IMKONIYATLARI
              </h2>
              <span className="text-[11px] text-gray-500">click → details</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {features.map((f, idx) => {
                const isFav = fav.includes(f.id);
                return (
                  <motion.button
                    key={f.id}
                    type="button"
                    onClick={() => setActive({ ...f, kind: "Feature" })}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.05 + idx * 0.05,
                      ease: "easeOut",
                    }}
                    whileHover={{ y: -3 }}
                    className={classNames(
                      "rounded-xl border-2 bg-black/70 backdrop-blur p-5 text-left",
                      "border-neon-green/45 shadow-neon",
                      "hover:border-neon-blue hover:shadow-neon-blue transition-all",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-12 w-12 rounded-lg border border-neon-blue/40 bg-neon-blue/10 grid place-items-center shadow-neon-blue shrink-0">
                          <f.icon className="text-neon-blue" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm sm:text-base font-black tracking-wider text-white truncate">
                            {f.title}
                          </div>
                          <div className="mt-1 text-[11px] font-bold tracking-widest text-neon-blue/80 truncate">
                            FEATURE • DEFENSIVE • PRACTICAL
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFav(f.id);
                        }}
                        className={classNames(
                          "shrink-0 rounded-lg border px-2 py-2 transition-all",
                          isFav
                            ? "border-neon-blue bg-neon-blue/10 text-neon-blue shadow-neon-blue"
                            : "border-neon-green/30 bg-black/50 text-gray-200 hover:border-neon-green hover:text-neon-green",
                        )}
                        title="Favorite"
                        aria-label="favorite"
                      >
                        {isFav ? <FaStar /> : <FaRegStar />}
                      </button>
                    </div>

                    <div className="mt-3">
                      <Clamp2 className="text-gray-300/90">{f.desc}</Clamp2>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {(f.tags || []).slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-black tracking-widest rounded-full border border-neon-green/25 bg-black/60 px-2 py-1 text-neon-green/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[11px] font-bold tracking-widest text-gray-400">
                        DETAILS
                      </span>
                      <span className="text-xs font-black tracking-widest text-neon-blue">
                        OPEN →
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* FEATURED ROADMAP CAROUSEL */}
        <section
          ref={refs.Roadmap}
          data-section="Roadmap"
          className="mt-10 scroll-mt-[92px]"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm sm:text-base font-black tracking-widest text-neon-blue">
                ROADMAP (HIGHLIGHTS)
              </h2>
              <span className="text-[11px] text-gray-500">swipe →</span>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {roadmap.map((r) => {
                const isFav = fav.includes(r.id);
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setActive({ ...r, kind: "Roadmap" })}
                    className={classNames(
                      "min-w-[300px] sm:min-w-[360px] lg:min-w-[420px]",
                      "rounded-xl border-2 bg-black/70 backdrop-blur p-4 text-left",
                      "border-neon-green/45 shadow-neon",
                      "hover:border-neon-blue hover:shadow-neon-blue transition-all",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-12 w-12 rounded-lg border border-neon-blue/40 bg-neon-blue/10 grid place-items-center shadow-neon-blue shrink-0">
                          <r.icon className="text-neon-blue" />
                        </div>

                        <div className="min-w-0">
                          <div className="text-base font-black tracking-wider text-neon-green truncate">
                            {r.title}
                          </div>
                          <div className="mt-1 text-[11px] font-bold tracking-widest text-neon-blue/80 truncate">
                            ROADMAP • PREMIUM UX
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFav(r.id);
                        }}
                        className={classNames(
                          "shrink-0 rounded-lg border px-2 py-2 transition-all",
                          isFav
                            ? "border-neon-blue bg-neon-blue/10 text-neon-blue shadow-neon-blue"
                            : "border-neon-green/30 bg-black/50 text-gray-200 hover:border-neon-green hover:text-neon-green",
                        )}
                        title="Favorite"
                        aria-label="favorite"
                      >
                        {isFav ? <FaStar /> : <FaRegStar />}
                      </button>
                    </div>

                    <div className="mt-3">
                      <Clamp2 className="mt-2 text-gray-300/90">
                        {r.desc}
                      </Clamp2>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[11px] font-bold tracking-widest text-gray-400">
                        QUICK VIEW
                      </span>
                      <span className="text-xs font-black tracking-widest text-neon-blue">
                        OPEN →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Favorites anchor */}
            <div id="fav-anchor" className="mt-8" />

            {/* Favorites summary (if any) */}
            {fav.length > 0 && (
              <Glass className="mt-5 p-5 sm:p-6 border-neon-blue/40 shadow-neon-blue">
                <div className="flex items-start gap-3">
                  <div className="h-11 w-11 rounded-lg border border-neon-blue/40 bg-neon-blue/10 grid place-items-center shadow-neon-blue">
                    <FaStar className="text-neon-blue" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm sm:text-base font-black tracking-widest text-neon-blue">
                      FAVORITES
                    </div>
                    <p className="mt-2 text-sm text-gray-300/90 leading-relaxed">
                      Siz saqlagan kartalar:{" "}
                      <span className="text-neon-green font-black">
                        {fav.length}
                      </span>{" "}
                      ta. (Keyinroq tez qaytib ko'rish uchun.)
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {fav.slice(0, 10).map((id) => (
                        <span
                          key={id}
                          className="text-[10px] font-black tracking-widest rounded-full border border-neon-green/25 bg-black/60 px-2 py-1 text-neon-green/80"
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

        {/* COMMUNITY (audience + join) */}
        <section
          ref={refs.Community}
          data-section="Community"
          className="mt-10 scroll-mt-[92px]"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={5}
          >
            <Glass className="p-5 sm:p-7 border-neon-blue/40 shadow-neon-blue">
              <div className="flex items-start gap-4">
                <div className="shrink-0 h-12 w-12 rounded-lg border border-neon-blue/40 bg-neon-blue/10 grid place-items-center shadow-neon-blue">
                  <FaRocket className="text-neon-blue" />
                </div>
                <div className="min-w-0 w-full">
                  <h2 className="text-lg sm:text-xl font-black tracking-wider text-neon-blue">
                    &gt;_ KIMLAR UCHUN?
                  </h2>

                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-300/90">
                    Cyber Nexus — boshlovchilar, talabalar va IT enthusiastlar
                    uchun. Maqsad: tez, xavfsiz va to'g'ri yo'nalishda o'sish.
                    "Learning → Practice → Portfolio".
                  </p>

                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      "O'QUVCHILAR",
                      "TALABALAR",
                      "IT ENTHUSIASTS",
                      "BO'LAJAK MUTAXASSISLAR",
                    ].map((t, i) => (
                      <div
                        key={i}
                        className="rounded-lg border border-neon-blue/35 bg-neon-blue/5 px-3 py-3 text-center"
                      >
                        <FaBolt className="mx-auto text-neon-blue mb-2" />
                        <div className="text-[11px] sm:text-xs font-black tracking-widest text-gray-300">
                          {t}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Social connect popover */}
                  <div className="mt-6 flex justify-center">
                    <div className="relative">
                      <AnimatePresence>
                        {isPopoverOpen && (
                          <motion.div
                            ref={popoverRef}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{
                              opacity: 0,
                              y: 10,
                              transition: { duration: 0.18 },
                            }}
                            className={classNames(
                              "z-50 border-2 border-neon-blue bg-black/95 backdrop-blur rounded-xl p-5",
                              "shadow-neon-blue",
                              {
                                "absolute left-1/2 -translate-x-1/2 -top-[150px] w-[320px]":
                                  !isMobile,
                                "fixed bottom-0 left-0 right-0 w-full rounded-b-none":
                                  isMobile,
                              },
                            )}
                          >
                            <div className="text-center text-sm font-black tracking-widest text-neon-green">
                              &gt; CONNECT WITH US_
                            </div>

                            <div className="mt-5 flex items-center justify-around">
                              {socials.map((s, i) => (
                                <a
                                  key={i}
                                  href={s.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group flex flex-col items-center gap-2"
                                >
                                  <div className="rounded-lg border-2 border-neon-blue bg-neon-blue/10 p-3 transition-all duration-300 group-hover:border-neon-green group-hover:bg-neon-green/10">
                                    <s.icon className="h-7 w-7 text-neon-blue transition-colors duration-300 group-hover:text-neon-green" />
                                  </div>
                                  <span className="text-[11px] font-black tracking-widest text-gray-400 group-hover:text-neon-green">
                                    {s.label}
                                  </span>
                                </a>
                              ))}
                            </div>

                            {isMobile && (
                              <button
                                onClick={() => setIsPopoverOpen(false)}
                                className="mt-5 w-full rounded-lg border border-neon-blue/40 bg-neon-blue/10 py-2 text-xs font-black tracking-widest text-neon-blue"
                              >
                                YOPISH
                              </button>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.button
                        ref={joinBtnRef}
                        onClick={() => setIsPopoverOpen((v) => !v)}
                        whileTap={{ scale: 0.98 }}
                        className={classNames(
                          "px-7 py-3 sm:px-8 sm:py-4 rounded-xl border-2",
                          "border-neon-green bg-gradient-to-r from-neon-green to-neon-blue",
                          "text-black font-black tracking-wider",
                          "shadow-neon hover:shadow-neon-blue transition-all duration-300",
                        )}
                      >
                        &gt; BIZGA QO'SHILING! 🚀
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </Glass>
          </motion.div>
        </section>

        {/* FOOTER */}
        <motion.footer
          className="mt-12 pt-8 border-t-2 border-neon-green/30 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          <p className="text-xs sm:text-sm text-gray-500 mb-2 font-mono">
            © 2025–2026 CYBER NEXUS — ALL RIGHTS RESERVED
          </p>
          <a
            href="https://cybernexus.uz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-blue hover:text-neon-green transition-colors duration-300 font-black text-sm sm:text-base tracking-wider"
          >
            &gt; cybernexus.uz_
          </a>
        </motion.footer>
      </div>

      {/* MODAL (details) */}
      <AnimatePresence>
        {active && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-[2px]"
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
                className="w-full max-w-2xl rounded-xl border-2 border-neon-blue bg-black/90 backdrop-blur p-5 shadow-neon-blue"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-14 w-14 rounded-lg border border-neon-green/35 bg-neon-green/10 grid place-items-center overflow-hidden shrink-0">
                      {active.icon ? (
                        <active.icon className="text-neon-green text-2xl" />
                      ) : (
                        <FaShieldAlt className="text-neon-green text-2xl" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="text-lg sm:text-xl font-black tracking-wider text-neon-green line-clamp-2">
                        {active.title}
                      </div>
                      <div className="mt-2 text-xs font-bold tracking-widest text-neon-blue/90 truncate">
                        {active.kind || "DETAILS"} • CYBER NEXUS
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    className="rounded-lg border border-neon-blue/40 bg-neon-blue/10 p-2 text-neon-blue hover:border-neon-green hover:text-neon-green transition-all"
                    aria-label="close"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="mt-4 rounded-xl border border-neon-green/25 bg-black/60 p-4">
                  <div className="text-[11px] font-black tracking-widest text-gray-400">
                    SUMMARY
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-neon-green/85">
                    {active.desc}
                  </p>
                </div>

                <div className="mt-3 rounded-xl border border-neon-green/20 bg-black/50 p-4">
                  <div className="text-[11px] font-black tracking-widest text-gray-400">
                    DETAILS
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-neon-green/80">
                    {active.details}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {(active.tags || []).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-black tracking-widest rounded-full border border-neon-blue/25 bg-neon-blue/10 px-2 py-1 text-neon-blue/90"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => toggleFav(active.id)}
                    className={classNames(
                      "flex-1 rounded-xl border-2 px-4 py-3 text-sm font-black tracking-wider transition-all",
                      fav.includes(active.id)
                        ? "border-neon-blue bg-neon-blue/10 text-neon-blue shadow-neon-blue"
                        : "border-neon-green bg-black/60 text-neon-green shadow-neon hover:border-neon-blue hover:text-neon-blue",
                    )}
                  >
                    {fav.includes(active.id)
                      ? "★ Favorited"
                      : "☆ Add to favorites"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (active.link)
                        window.open(
                          active.link,
                          "_blank",
                          "noopener,noreferrer",
                        );
                    }}
                    className="flex-1 rounded-xl border-2 border-neon-green bg-gradient-to-r from-neon-green to-neon-blue px-4 py-3 text-sm font-black tracking-wider text-black shadow-neon hover:shadow-neon-blue transition-all inline-flex items-center justify-center gap-2"
                  >
                    Open <FaExternalLinkAlt className="text-[14px]" />
                  </button>
                </div>

                <div className="mt-3 text-center text-[11px] text-gray-500">
                  External link opens in a new tab.
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* small utilities */}
      <style>{`
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
    </div>
  );
};

export default About;
