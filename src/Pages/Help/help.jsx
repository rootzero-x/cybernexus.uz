// src/pages/Help/Help.jsx
import React, { useContext, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { GlobalContext } from "../../GlobalState/globalstate";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaStar,
  FaRegStar,
  FaExternalLinkAlt,
  FaTimes,
  FaLayerGroup,
  FaTelegram,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaShieldAlt,
  FaInfoCircle,
  FaQuestionCircle,
} from "react-icons/fa";

/**
 * ✅ CyberNexus Help — Premium (News design language)
 * - Glass hero + sticky tabs
 * - Search + Favorites (localStorage)
 * - Quick actions (Telegram/Email/WhatsApp/Phone)
 * - FAQ cards + modal details
 * - Clean background grid (no heavy matrix DOM spam)
 */

export const Help = () => {
  const { mode } = useContext(GlobalContext);

  // ====== CONTACT TARGETS (same as Contact page) ======
  const CONTACT = useMemo(
    () => ({
      telegram: "https://t.me/snovden_01",
      whatsapp: "https://wa.me/+998935188508",
      phone: "tel:+998935188508",
      email: "izzatullayev008@gmail.com",
      channel: "https://t.me/cyber_nexuss",
      chat: "https://t.me/cybernexus_chat",
      bot: "https://t.me/cybernexuss_bot",
    }),
    []
  );

  // ====== FAQ DATA ======
  const faq = useMemo(
    () => [
      {
        id: "faq-how-join",
        title: "CyberNexus’ga qanday qo‘shilaman?",
        description:
          "Telegram kanal va community chat orqali join bo‘lasiz, so‘ng postlar/yo‘riqnomalarni kuzatib borasiz.",
        details:
          "1) Kanalga obuna bo‘ling. 2) Chat’ga kiring (qoidalarni o‘qing). 3) Bot orqali servislar/yo‘riqnomalarni oling. 4) Savollaringiz bo‘lsa Help orqali yozing.",
        category: "Getting Started",
        tags: ["Join", "Telegram", "Community"],
        icon: FaTelegram,
        link: CONTACT.channel,
      },
      {
        id: "faq-bot",
        title: "Bot nima qiladi?",
        description:
          "Bot orqali quick linklar, servislar va platforma navigatsiyasi osonlashadi.",
        details:
          "Bot: asosiy bo‘limlar, yangiliklar, foydali linklar, yo‘nalishlar va tezkor ma’lumotlar uchun. Katta yangilanishlar kanal orqali beriladi.",
        category: "Platform",
        tags: ["Bot", "Automation", "Tools"],
        icon: FaQuestionCircle,
        link: CONTACT.bot,
      },
      {
        id: "faq-report",
        title: "Bug/issue yoki xatolikni qanday yuboraman?",
        description:
          "Eng yaxshisi: Telegram yoki Email orqali screenshot + qisqa ta’rif bilan yuboring.",
        details:
          "Yuborishda: 1) nima bo‘ldi (1-2 gap), 2) qaysi qurilma/browser, 3) screenshot/video, 4) link/route. Shunda tezroq yechim topamiz.",
        category: "Support",
        tags: ["Bug", "Screenshot", "Details"],
        icon: FaInfoCircle,
        link: CONTACT.telegram,
      },
      {
        id: "faq-security",
        title: "Xavfsizlik bo‘yicha murojaat (responsible disclosure)",
        description:
          "Agar zaiflik topsangiz, uni oshkor qilmasdan oldin bizga xabar bering.",
        details:
          "Responsible disclosure: 1) PoC’ni ommaga tarqatmang. 2) Minimal isbot + risk izohi. 3) Qanday takrorlanishini qisqacha yozing. Biz tezda tekshiramiz va patch qilamiz.",
        category: "Security",
        tags: ["Security", "Disclosure", "Ethical"],
        icon: FaShieldAlt,
        link: `mailto:${CONTACT.email}?subject=${encodeURIComponent(
          "Security report (Responsible disclosure)"
        )}`,
      },
      {
        id: "faq-collab",
        title: "Hamkorlik / sponsor / taklif",
        description:
          "Rasmiy takliflar uchun email orqali yozing (subject aniq bo‘lsin).",
        details:
          "Email subject misollar: Partnership / Sponsorship / Collaboration. Qisqacha: kim siz, nima taklif, qanday format, deadline.",
        category: "Business",
        tags: ["Partnership", "Sponsor", "Email"],
        icon: FaEnvelope,
        link: `mailto:${CONTACT.email}?subject=${encodeURIComponent("Collaboration / Partnership")}`,
      },
      {
        id: "faq-urgent",
        title: "Tezkor aloqa kerak bo‘lsa-chi?",
        description:
          "Urgent holatlar uchun WhatsApp yoki telefon (keyin Telegram’da context bilan).",
        details:
          "Urgent: WhatsApp/Phone. Kontekst: keyin Telegram’da qisqa tafsilot qoldiring (qanday muammo, qayerda, qachondan).",
        category: "Support",
        tags: ["Urgent", "WhatsApp", "Phone"],
        icon: FaPhone,
        link: CONTACT.whatsapp,
      },
    ],
    [CONTACT]
  );

  // ====== UI State ======
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("All"); // All | Getting Started | Platform | Support | Security | Business
  const [active, setActive] = useState(null);
  const [favOnly, setFavOnly] = useState(false);

  const [fav, setFav] = useState(() => {
    try {
      const raw = localStorage.getItem("cybernexus_help_fav_v1");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cybernexus_help_fav_v1", JSON.stringify(fav));
    } catch {
        /* storage unavailable — non-fatal */
      }
  }, [fav]);

  const toggleFav = (id) => {
    setFav((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  };

  // ====== Tabs ======
  const tabs = useMemo(
    () => [
      { key: "All", label: "All", icon: FaLayerGroup },
      { key: "Getting Started", label: "Getting Started", icon: FaTelegram },
      { key: "Platform", label: "Platform", icon: FaQuestionCircle },
      { key: "Support", label: "Support", icon: FaInfoCircle },
      { key: "Security", label: "Security", icon: FaShieldAlt },
      { key: "Business", label: "Business", icon: FaEnvelope },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = faq.filter((n) => {
      const text = `${n.title} ${n.description} ${n.details} ${n.category} ${(n.tags || []).join(
        " "
      )}`.toLowerCase();

      if (q && !text.includes(q)) return false;
      if (tab !== "All" && n.category !== tab) return false;
      if (favOnly && !fav.includes(n.id)) return false;
      return true;
    });

    // slight priority: Security + Support first
    const pr = { Security: 0, Support: 1, "Getting Started": 2, Platform: 3, Business: 4 };
    list.sort((a, b) => (pr[a.category] ?? 99) - (pr[b.category] ?? 99));
    return list;
  }, [faq, query, tab, favOnly, fav]);

  const featured = useMemo(() => {
    const pick = ["faq-security", "faq-report", "faq-how-join", "faq-urgent"];
    const map = new Map(faq.map((x) => [x.id, x]));
    return pick.map((id) => map.get(id)).filter(Boolean);
  }, [faq]);

  // ====== UI Atoms (News-style) ======
  const Glass = ({ className, children }) => (
    <div
      className={classNames(
        "rounded-2xl border bg-void-850/55 backdrop-blur-xl",
        "border-signal-500/40 shadow-glow-sm",
        className
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
          ? "border-cyber-500 bg-cyber-500/10 text-cyber-300 shadow-glow-cyan"
          : "border-signal-500/30 bg-void-850/50 text-gray-200 hover:border-signal-500 hover:text-signal-300"
      )}
    >
      {Icon ? <Icon className="text-[12px]" /> : null}
      {children}
    </button>
  );

  const Clamp2 = ({ children, className }) => (
    <p
      className={classNames("text-sm text-signal-300/80 leading-relaxed", className)}
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

  const open = (url) => window.open(url, "_blank", "noopener,noreferrer");

  // quick message (keeps your original behavior, but safer + cleaner)
  const [message, setMessage] = useState("");
  const sendMessage = () => {
    const text = (message || "").trim();
    if (!text) {
      setActive({
        id: "tmp-empty",
        title: "Xabar bo‘sh",
        description: "Xabar yozing va yuboring.",
        details: "Iltimos, kamida 1-2 gap yozib yuboring.",
        category: "Support",
        tags: ["Message"],
        icon: FaInfoCircle,
        link: CONTACT.telegram,
      });
      return;
    }

    const encoded = encodeURIComponent(text);
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
      // SMS on mobile
      const phoneNumber = "+998935188508";
      window.location.href = `sms:${phoneNumber}?body=${encoded}`;
      return;
    }

    // Email on desktop
    const subject = encodeURIComponent("CyberNexus — Help message");
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${encoded}`;
  };

  return (
    <div className="w-full min-h-screen text-white/85 overflow-x-hidden" data-mode={mode}>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-24">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <Glass className="p-5 sm:p-7">
            <div className="flex flex-col lg:flex-row lg:items-center gap-5">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-lg border border-cyber-500/40 bg-cyber-500/10 grid place-items-center shadow-glow-cyan">
                    <FaInfoCircle className="text-cyber-300" />
                  </div>
                  <div className="min-w-0">
                    <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white truncate">
                      Help Center
                    </h1>
                    <p className="mt-1 text-xs sm:text-sm text-cyber-300/90 font-bold tracking-widest truncate">
                      FAQ • SUPPORT • SECURITY REPORT
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm sm:text-base text-white/55 leading-relaxed">
                  Tezkor yo‘riqnomalar, FAQ va aloqa kanallari. Qidiruv qiling, filter tanlang,
                  kerak bo‘lsa favorites’ga saqlang yoki xabar yuboring.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Chip active={favOnly} onClick={() => setFavOnly((v) => !v)} icon={favOnly ? FaStar : FaRegStar}>
                    Favorites
                  </Chip>
                  <Chip active={tab === "Support"} onClick={() => setTab("Support")} icon={FaInfoCircle}>
                    Support
                  </Chip>
                  <Chip active={tab === "Security"} onClick={() => setTab("Security")} icon={FaShieldAlt}>
                    Security
                  </Chip>
                </div>
              </div>

              {/* Search */}
              <div className="w-full lg:w-[440px]">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-300/80" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Qidirish: join, bot, bug, security, email..."
                    className={classNames(
                      "w-full rounded-2xl border bg-void-850/60 backdrop-blur px-10 py-3 text-sm",
                      "border-signal-500/50 text-signal-300 placeholder:text-white/35",
                      "focus:outline-none focus:border-cyber-500 focus:shadow-glow-cyan"
                    )}
                  />
                </div>

                <div className="mt-3 text-xs text-white/45 flex items-center justify-between">
                  <span>
                    Natija: <span className="text-signal-300 font-black">{filtered.length}</span>
                  </span>
                  <span className="text-cyber-300/80 font-bold tracking-widest">CLICK CARD → DETAILS</span>
                </div>
              </div>
            </div>
          </Glass>
        </motion.div>

        {/* QUICK ACTIONS */}
        <motion.div
          className="mt-5"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: "qa-tg", label: "Telegram", icon: FaTelegram, href: CONTACT.telegram },
              { id: "qa-wa", label: "WhatsApp", icon: FaWhatsapp, href: CONTACT.whatsapp },
              { id: "qa-mail", label: "Email", icon: FaEnvelope, href: `mailto:${CONTACT.email}` },
              { id: "qa-call", label: "Call", icon: FaPhone, href: CONTACT.phone },
            ].map((x) => (
              <button
                key={x.id}
                type="button"
                onClick={() => open(x.href)}
                className={classNames(
                  "rounded-2xl border bg-void-850/70 backdrop-blur p-3 text-left",
                  "border-signal-500/40 shadow-glow-sm",
                  "hover:border-cyber-500 hover:shadow-glow-cyan transition-all"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg border border-cyber-500/40 bg-cyber-500/10 grid place-items-center shadow-glow-cyan">
                    <x.icon className="text-cyber-300" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold tracking-tight text-white truncate">
                      {x.label}
                    </div>
                    <div className="mt-1 text-[11px] font-bold tracking-widest text-cyber-300/80 truncate">
                      OPEN →
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* STICKY TABS */}
        <div className="sticky top-0 z-30 pt-4">
          <div className="rounded-xl border border-signal-500/25 bg-void-850/70 backdrop-blur-xl px-3 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                {tabs.map((t) => (
                  <Chip key={t.key} active={tab === t.key} onClick={() => setTab(t.key)} icon={t.icon}>
                    {t.label}
                  </Chip>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setTab("All");
                  setFavOnly(false);
                }}
                className="hidden sm:inline-flex rounded-lg border border-cyber-500/30 bg-cyber-500/10 px-3 py-2 text-xs font-black tracking-widest text-cyber-300 hover:border-signal-500 hover:text-signal-300 transition-all"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* FEATURED */}
        <motion.div
          className="mt-5"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm sm:text-base font-black tracking-widest text-cyber-300">FEATURED</h2>
            <span className="text-[11px] text-white/35">swipe →</span>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {featured.map((item) => {
              const isFav = fav.includes(item.id);
              const Icon = item.icon || FaInfoCircle;
              return (
                <div
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      e.currentTarget.click();
                    }
                  }}
                  onClick={() => setActive(item)}
                  className={classNames(
                    "min-w-[300px] sm:min-w-[360px] lg:min-w-[420px]",
                    "rounded-2xl border bg-void-850/70 backdrop-blur p-4 text-left",
                    "border-signal-500/45 shadow-glow-sm",
                    "hover:border-cyber-500 hover:shadow-glow-cyan transition-all"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-12 w-12 rounded-lg border border-cyber-500/40 bg-cyber-500/10 grid place-items-center overflow-hidden shrink-0">
                        <Icon className="text-cyber-300" />
                      </div>

                      <div className="min-w-0">
                        <div className="text-base font-bold tracking-tight text-white truncate">
                          {item.category}
                        </div>
                        <div className="mt-1 text-[11px] font-bold tracking-widest text-cyber-300/80 truncate">
                          {item.tags?.[0] || "HELP"} • QUICK
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFav(item.id);
                      }}
                      className={classNames(
                        "shrink-0 rounded-lg border px-2 py-2 transition-all",
                        isFav
                          ? "border-cyber-500 bg-cyber-500/10 text-cyber-300 shadow-glow-cyan"
                          : "border-signal-500/30 bg-void-850/50 text-gray-200 hover:border-signal-500 hover:text-signal-300"
                      )}
                      title="Favorite"
                      aria-label="favorite"
                    >
                      {isFav ? <FaStar /> : <FaRegStar />}
                    </button>
                  </div>

                  <div className="mt-3">
                    <div className="text-sm font-black tracking-wider text-signal-300">{item.title}</div>
                    <Clamp2 className="mt-2 text-white/55">{item.description}</Clamp2>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[11px] font-bold tracking-widest text-white/45">QUICK VIEW</span>
                    <span className="text-xs font-black tracking-widest text-cyber-300">OPEN →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* MESSAGE BOX (your original "Xabar yuborish", but premium) */}
        <motion.div
          className="mt-7"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <Glass className="p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-black tracking-widest text-cyber-300">SEND A MESSAGE</div>
                <div className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-white truncate">
                  Xabar yuborish
                </div>
                <p className="mt-2 text-sm text-white/55 leading-relaxed">
                  Desktop’da email orqali, telefon’da SMS orqali yuboriladi (avtomatik ochiladi).
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Chip active={false} onClick={() => open(CONTACT.telegram)} icon={FaTelegram}>
                  Telegram
                </Chip>
                <Chip active={false} onClick={() => open(CONTACT.whatsapp)} icon={FaWhatsapp}>
                  WhatsApp
                </Chip>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-3">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Xabaringizni shu yerga yozing..."
                className={classNames(
                  "w-full min-h-[140px] rounded-2xl border bg-void-850/60 backdrop-blur px-4 py-3 text-sm",
                  "border-signal-500/35 text-signal-300 placeholder:text-white/35",
                  "focus:outline-none focus:border-cyber-500 focus:shadow-glow-cyan"
                )}
              />
              <button
                type="button"
                onClick={sendMessage}
                className={classNames(
                  "rounded-2xl border border-signal-500 bg-gradient-to-r from-signal-400 to-cyber-400",
                  "px-5 py-3 text-sm font-black tracking-widest text-black shadow-glow-sm",
                  "hover:shadow-glow-cyan transition-all inline-flex items-center justify-center gap-2"
                )}
              >
                Yuborish <FaExternalLinkAlt className="text-[14px]" />
              </button>
            </div>

            <div className="mt-3 text-[11px] text-white/35">
              Eslatma: yuborish tugmasi email/SMS ilovasini ochadi.
            </div>
          </Glass>
        </motion.div>

        {/* MAIN GRID */}
        <motion.div
          className="mt-7"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item, idx) => {
              const isFav = fav.includes(item.id);
              const Icon = item.icon || FaInfoCircle;

              return (
                <motion.div
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      e.currentTarget.click();
                    }
                  }}
                  onClick={() => setActive(item)}
                  className={classNames(
                    "rounded-2xl border bg-void-850/70 backdrop-blur p-4 text-left",
                    "border-signal-500/45 shadow-glow-sm",
                    "hover:border-cyber-500 hover:shadow-glow-cyan transition-all"
                  )}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.02 + idx * 0.02,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -3 }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-12 w-12 rounded-lg border border-cyber-500/40 bg-cyber-500/10 grid place-items-center overflow-hidden shrink-0">
                        <Icon className="text-cyber-300" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-[13px] sm:text-sm font-bold tracking-tight text-white truncate">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-[11px] font-bold tracking-widest text-cyber-300/80 truncate">
                          {item.category} • {(item.tags || [])[0] || "HELP"}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFav(item.id);
                      }}
                      className={classNames(
                        "shrink-0 rounded-lg border px-2 py-2 transition-all",
                        isFav
                          ? "border-cyber-500 bg-cyber-500/10 text-cyber-300 shadow-glow-cyan"
                          : "border-signal-500/30 bg-void-850/50 text-gray-200 hover:border-signal-500 hover:text-signal-300"
                      )}
                      title="Favorite"
                      aria-label="favorite"
                    >
                      {isFav ? <FaStar /> : <FaRegStar />}
                    </button>
                  </div>

                  <div className="mt-3">
                    <Clamp2 className="text-white/55">{item.description}</Clamp2>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {(item.tags || []).slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-black tracking-widest rounded-full border border-signal-500/25 bg-void-850/60 px-2 py-1 text-signal-300/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[11px] font-bold tracking-widest text-white/45">DETAILS</span>
                    <span className="text-xs font-black tracking-widest text-cyber-300">OPEN →</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="mt-8 text-center">
              <div className="rounded-2xl border border-signal-500/35 bg-void-850/60 p-8 shadow-glow-sm">
                <div className="text-cyber-300 font-black tracking-widest">NO RESULTS</div>
                <p className="mt-2 text-sm text-white/45">Qidiruv yoki tab’ni o‘zgartirib ko‘ring.</p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setTab("All");
                    setFavOnly(false);
                  }}
                  className="mt-5 rounded-lg border-2 border-cyber-500 bg-cyber-500/10 px-4 py-2 text-xs font-black tracking-widest text-cyber-300 hover:border-signal-500 hover:text-signal-300 transition-all"
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </motion.div>
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
                        <active.icon className="text-signal-300 text-xl" />
                      ) : (
                        <FaInfoCircle className="text-signal-300 text-xl" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="text-lg sm:text-xl font-black tracking-wider text-signal-300 line-clamp-2">
                        {active.title}
                      </div>
                      <div className="mt-2 text-xs font-bold tracking-widest text-cyber-300/90 truncate">
                        {active.category}
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
                  <div className="text-[11px] font-black tracking-widest text-white/45">SUMMARY</div>
                  <p className="mt-2 text-sm leading-relaxed text-signal-300/85">{active.description}</p>
                </div>

                <div className="mt-3 rounded-xl border border-signal-500/20 bg-void-850/50 p-4">
                  <div className="text-[11px] font-black tracking-widest text-white/45">DETAILS</div>
                  <p className="mt-2 text-sm leading-relaxed text-signal-300/80">{active.details}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {(active.tags || []).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-black tracking-widest rounded-full border border-cyber-500/25 bg-cyber-500/10 px-2 py-1 text-cyber-300/90"
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
                      "flex-1 rounded-2xl border px-4 py-3 text-sm font-black tracking-wider transition-all",
                      fav.includes(active.id)
                        ? "border-cyber-500 bg-cyber-500/10 text-cyber-300 shadow-glow-cyan"
                        : "border-signal-500 bg-void-850/60 text-signal-300 shadow-glow-sm hover:border-cyber-500 hover:text-cyber-300"
                    )}
                  >
                    {fav.includes(active.id) ? "★ Favorited" : "☆ Add to favorites"}
                  </button>

                  <button
                    type="button"
                    onClick={() => open(active.link)}
                    className="flex-1 rounded-2xl border border-signal-500 bg-gradient-to-r from-signal-400 to-cyber-400 px-4 py-3 text-sm font-black tracking-wider text-black shadow-glow-sm hover:shadow-glow-cyan transition-all inline-flex items-center justify-center gap-2"
                  >
                    Open <FaExternalLinkAlt className="text-[14px]" />
                  </button>
                </div>

                <div className="mt-3 text-center text-[11px] text-white/35">External link opens in a new tab.</div>
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

export default Help;
