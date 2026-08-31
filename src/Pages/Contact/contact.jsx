// src/pages/Contact/Contact.jsx
import React, { useContext, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { GlobalContext } from "../../GlobalState/globalstate";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTelegram,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaGithub,
  FaWhatsapp,
  FaYoutube,
  FaTiktok,
  FaTwitter,
  FaGlobe,
  FaMobileAlt,
  FaSearch,
  FaStar,
  FaRegStar,
  FaExternalLinkAlt,
  FaTimes,
  FaLayerGroup,
} from "react-icons/fa";

/**
 * ✅ CyberNexus Contact — Premium (News page design language)
 * - Glass hero + sticky filter tabs
 * - Search + Favorites (localStorage)
 * - Featured horizontal carousel
 * - Responsive grid
 * - Modal details + open link
 * - No scanlines / no heavy effects (clean premium)
 */

export const Contact = () => {
  const { mode } = useContext(GlobalContext);

  // ====== DATA (your links) ======
  const contacts = useMemo(
    () => [
      {
        id: "telegram-personal",
        title: "Telegram (Personal)",
        handle: "@snovden_01",
        description: "To‘g‘ridan-to‘g‘ri bog‘lanish uchun Telegram.",
        details:
          "Savol, hamkorlik yoki takliflar uchun yozing. Xavfsizlik bo‘yicha etik va qonuniy doirada ishlaymiz.",
        source: "Telegram",
        category: "Direct",
        tags: ["DM", "Fast", "Preferred"],
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/512px-Telegram_logo.svg.png",
        link: "https://t.me/snovden_01",
      },
      {
        id: "instagram",
        title: "Instagram",
        handle: "@cybernexus.uz",
        description: "Kontentlar, qisqa postlar va announcement’lar.",
        details:
          "Platforma yangiliklari, qisqa cybersecurity tips, community update’lar Instagram’da.",
        source: "Instagram",
        category: "Social",
        tags: ["Updates", "Content", "Brand"],
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/512px-Instagram_icon.png",
        link: "https://instagram.com/cybernexus.uz",
      },
      {
        id: "whatsapp",
        title: "WhatsApp",
        handle: "+998 93 518 85 08",
        description: "Tezkor aloqa uchun WhatsApp.",
        details:
          "Muhim masalalar bo‘yicha tezkor bog‘lanish. Iltimos: mavzuni qisqa yozing.",
        source: "WhatsApp",
        category: "Direct",
        tags: ["Quick", "Mobile", "Call/Chat"],
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png",
        link: "https://wa.me/+998935188508",
      },
      {
        id: "phone",
        title: "Phone",
        handle: "+998 93 518 85 08",
        description: "Telefon orqali bog‘lanish.",
        details:
          "Aloqa vaqti: imkon qadar ish vaqti ichida. Agar javob bo‘lmasa, Telegram yozing.",
        source: "Phone",
        category: "Direct",
        tags: ["Call", "Urgent"],
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Phone_font_awesome.svg/512px-Phone_font_awesome.svg.png",
        link: "tel:+998935188508",
      },
      {
        id: "email",
        title: "Email",
        handle: "izzatullayev008@gmail.com",
        description: "Rasmiy takliflar va uzun xatlar uchun.",
        details:
          "Email’da: subject’ni aniq yozing (Collab / Bug report / Partnership). Screenshot yoki havola qo‘shsangiz tezroq.",
        source: "Email",
        category: "Direct",
        tags: ["Formal", "Long form"],
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/512px-Gmail_icon_%282020%29.svg.png",
        link: "mailto:izzatullayev008@gmail.com",
      },
      {
        id: "github",
        title: "GitHub",
        handle: "oyatullo2",
        description: "Kodlar, repolar va ishlanmalar.",
        details:
          "Issue ochish: minimal reproduksiya + screenshot + environment. Pull request’lar ham ko‘rib chiqiladi.",
        source: "GitHub",
        category: "Dev",
        tags: ["Repo", "Issues", "Code"],
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/512px-Octicons-mark-github.svg.png",
        link: "https://github.com/oyatullo2",
      },
    ],
    []
  );

  const marqueeItems = useMemo(
    () => [
      {
        id: "site",
        text: "Web-site: cybernexus.uz",
        link: "https://cybernexus.uz",
        icon: FaGlobe,
        category: "Official",
      },
      {
        id: "channel",
        text: "Channel: @cyber_nexuss",
        link: "https://t.me/cyber_nexuss",
        icon: FaTelegram,
        category: "Official",
      },
      {
        id: "chat",
        text: "Chat: @cybernexus_chat",
        link: "https://t.me/cybernexus_chat",
        icon: FaTelegram,
        category: "Community",
      },
      {
        id: "bot",
        text: "Bot: @cybernexuss_bot",
        link: "https://t.me/cybernexuss_bot",
        icon: FaTelegram,
        category: "Tools",
      },
      {
        id: "youtube",
        text: "YouTube: @cyber_nexuss",
        link: "https://youtube.com/@cybernexuss?si=IN776e9_NqHBb0A3",
        icon: FaYoutube,
        category: "Social",
      },
      {
        id: "ig",
        text: "Instagram: @cyber_nexuss",
        link: "https://instagram.com/cybernexus.uz",
        icon: FaInstagram,
        category: "Social",
      },
      {
        id: "tiktok",
        text: "TikTok: @cyber_nexuss",
        link: "https://www.tiktok.com/@cyber.nexuss?_t=ZS-8us03V8s29Y&_r=1",
        icon: FaTiktok,
        category: "Social",
      },
      {
        id: "x",
        text: "X: @cyber_nexuss",
        link: "https://x.com/cyber_nexuss?t=l6IO3T3Y60C1ayUcT0MPfw&s=09",
        icon: FaTwitter,
        category: "Social",
      },
      {
        id: "app",
        text: "Mobile app: download",
        link: "https://t.me/cyber_nexuss/75",
        icon: FaMobileAlt,
        category: "Tools",
      },
    ],
    []
  );

  // ====== Favorites ======
  const [favOnly, setFavOnly] = useState(false);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("All"); // All | Direct | Social | Dev | Official | Community | Tools
  const [active, setActive] = useState(null);

  const [fav, setFav] = useState(() => {
    try {
      const raw = localStorage.getItem("cybernexus_contact_fav_v1");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cybernexus_contact_fav_v1", JSON.stringify(fav));
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
      { key: "Direct", label: "Direct", icon: FaPhone },
      { key: "Social", label: "Social", icon: FaInstagram },
      { key: "Dev", label: "Dev", icon: FaGithub },
      { key: "Official", label: "Official", icon: FaGlobe },
      { key: "Community", label: "Community", icon: FaTelegram },
      { key: "Tools", label: "Tools", icon: FaMobileAlt },
    ],
    []
  );

  // ====== Build a single list for UI (contacts + marquee) ======
  const combined = useMemo(() => {
    const extra = marqueeItems.map((m) => ({
      id: `m-${m.id}`,
      title: m.text,
      handle: "",
      description: "Rasmiy / community link.",
      details: "Havola yangi tab’da ochiladi.",
      source: "CyberNexus",
      category: m.category,
      tags: [m.category],
      imageUrl:
        m.icon === FaTelegram
          ? "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/512px-Telegram_logo.svg.png"
          : m.icon === FaInstagram
            ? "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/512px-Instagram_icon.png"
            : m.icon === FaYoutube
              ? "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/512px-YouTube_full-color_icon_%282017%29.svg.png"
              : m.icon === FaTiktok
                ? "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Tiktok_icon.svg/512px-Tiktok_icon.svg.png"
                : m.icon === FaTwitter
                  ? "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/X_logo_2023_original.svg/512px-X_logo_2023_original.svg.png"
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Shield_icon.svg/512px-Shield_icon.svg.png",
      link: m.link,
      kind: "Link",
    }));

    return [
      ...contacts.map((c) => ({ ...c, kind: "Contact" })),
      ...extra,
    ];
  }, [contacts, marqueeItems]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = combined.filter((n) => {
      const text = `${n.title} ${n.handle} ${n.description} ${n.details} ${n.source} ${n.category} ${(n.tags || []).join(
        " "
      )}`.toLowerCase();

      if (q && !text.includes(q)) return false;
      if (tab !== "All" && n.category !== tab) return false;
      if (favOnly && !fav.includes(n.id)) return false;
      return true;
    });

    // stable sort: Contacts first, then Links
    list.sort((a, b) => {
      const ka = a.kind === "Contact" ? 0 : 1;
      const kb = b.kind === "Contact" ? 0 : 1;
      return ka - kb;
    });

    return list;
  }, [combined, query, tab, favOnly, fav]);

  const featured = useMemo(() => {
    const pick = ["telegram-personal", "email", "github", "m-site", "m-channel"];
    const map = new Map(combined.map((x) => [x.id, x]));
    return pick.map((id) => map.get(id)).filter(Boolean);
  }, [combined]);

  // ====== UI atoms (News-style) ======
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

  return (
    <div
      className="w-full min-h-screen font-mono text-signal-300 overflow-x-hidden"
      data-mode={mode}
    >
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
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <Glass className="p-5 sm:p-7">
            <div className="flex flex-col lg:flex-row lg:items-center gap-5">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-lg border border-cyber-500/40 bg-cyber-500/10 grid place-items-center shadow-glow-cyan">
                    <FaTelegram className="text-cyber-300" />
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-black tracking-wider text-signal-300 truncate">
                      Contact
                    </h1>
                    <p className="mt-1 text-xs sm:text-sm text-cyber-300/90 font-bold tracking-widest truncate">
                      OFFICIAL • DIRECT • SOCIAL • DEV
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm sm:text-base text-white/55 leading-relaxed">
                  Bog‘lanish uchun barcha rasmiy linklar va direct aloqa kanallari.
                  Qidiruv qiling, filter tanlang va kerak bo‘lsa favorites’ga saqlang.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Chip
                    active={favOnly}
                    onClick={() => setFavOnly((v) => !v)}
                    icon={favOnly ? FaStar : FaRegStar}
                  >
                    Favorites
                  </Chip>
                  <Chip
                    active={tab === "Direct"}
                    onClick={() => setTab("Direct")}
                    icon={FaPhone}
                  >
                    Direct
                  </Chip>
                  <Chip
                    active={tab === "Official"}
                    onClick={() => setTab("Official")}
                    icon={FaGlobe}
                  >
                    Official
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
                    placeholder="Qidirish: telegram, email, github, channel..."
                    className={classNames(
                      "w-full rounded-2xl border bg-void-850/60 backdrop-blur px-10 py-3 text-sm",
                      "border-signal-500/50 text-signal-300 placeholder:text-white/35",
                      "focus:outline-none focus:border-cyber-500 focus:shadow-glow-cyan"
                    )}
                  />
                </div>

                <div className="mt-3 text-xs text-white/45 flex items-center justify-between">
                  <span>
                    Natija:{" "}
                    <span className="text-signal-300 font-black">{filtered.length}</span>
                  </span>
                  <span className="text-cyber-300/80 font-bold tracking-widest">
                    CLICK CARD → DETAILS
                  </span>
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
                {tabs.map((t) => (
                  <Chip
                    key={t.key}
                    active={tab === t.key}
                    onClick={() => setTab(t.key)}
                    icon={t.icon}
                  >
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

        {/* FEATURED CAROUSEL */}
        <motion.div
          className="mt-5"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm sm:text-base font-black tracking-widest text-cyber-300">
              FEATURED
            </h2>
            <span className="text-[11px] text-white/35">swipe →</span>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {featured.map((item) => {
              const isFav = fav.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
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
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="h-10 w-10 object-contain"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://upload.wikimedia.org/wikipedia/commons/6/6a/Cybersecurity.png";
                          }}
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="text-base font-black tracking-wider text-signal-300 truncate">
                          {item.source}
                        </div>
                        <div className="mt-1 text-[11px] font-bold tracking-widest text-cyber-300/80 truncate">
                          {item.category} • {item.kind}
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
                    <div className="text-sm font-black tracking-wider text-signal-300">
                      {item.title}
                    </div>
                    <Clamp2 className="mt-2 text-white/55">{item.description}</Clamp2>
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

        {/* MAIN GRID */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item, idx) => {
              const isFav = fav.includes(item.id);
              return (
                <motion.button
                  key={item.id}
                  type="button"
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
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="h-10 w-10 object-contain"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://upload.wikimedia.org/wikipedia/commons/6/6a/Cybersecurity.png";
                          }}
                        />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-[13px] sm:text-sm font-black tracking-wider text-signal-300 truncate">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-[11px] font-bold tracking-widest text-cyber-300/80 truncate">
                          {item.source} • {item.category}
                        </p>
                        {item.handle ? (
                          <p className="mt-1 text-[11px] font-bold tracking-widest text-white/45 truncate">
                            {item.handle}
                          </p>
                        ) : null}
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

          {filtered.length === 0 && (
            <div className="mt-8 text-center">
              <div className="rounded-2xl border border-signal-500/35 bg-void-850/60 p-8 shadow-glow-sm">
                <div className="text-cyber-300 font-black tracking-widest">NO RESULTS</div>
                <p className="mt-2 text-sm text-white/45">
                  Qidiruv yoki tab’ni o‘zgartirib ko‘ring.
                </p>
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

        {/* MARQUEE (clean, loop) */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.12 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm sm:text-base font-black tracking-widest text-signal-300">
              MORE LINKS
            </h2>
            <span className="text-[11px] text-white/35">auto-scroll →</span>
          </div>

          <div className="w-full overflow-hidden rounded-2xl border border-signal-500/35 bg-void-850/60 shadow-glow-sm">
            <div className="flex items-center gap-4 px-4 py-3">
              <span className="text-[11px] sm:text-xs font-black tracking-widest text-white/45 shrink-0">
                Bizning boshqa manzillarimiz:
              </span>

              <div className="relative w-full overflow-hidden">
                <motion.div
                  className="flex whitespace-nowrap items-center gap-3"
                  initial={{ x: "10%" }}
                  animate={{ x: "-110%" }}
                  transition={{ duration: 24, ease: "linear", repeat: Infinity }}
                >
                  {[...marqueeItems, ...marqueeItems].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={`${item.id}-${idx}`}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classNames(
                          "inline-flex items-center gap-2 rounded-full px-3 py-1 border",
                          "border-cyber-500/30 bg-cyber-500/10 text-signal-300",
                          "hover:border-signal-500 hover:text-cyber-300 transition-all"
                        )}
                      >
                        <span className="text-xs sm:text-sm font-bold">{item.text}</span>
                        <Icon className={classNames("text-[14px]", item.id === "youtube" ? "text-red-600" : "text-cyber-300")} />
                      </a>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </div>
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
                      <img
                        src={active.imageUrl}
                        alt={active.title}
                        className="h-11 w-11 object-contain"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://upload.wikimedia.org/wikipedia/commons/6/6a/Cybersecurity.png";
                        }}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-lg sm:text-xl font-black tracking-wider text-signal-300 line-clamp-2">
                        {active.title}
                      </div>
                      <div className="mt-2 text-xs font-bold tracking-widest text-cyber-300/90 truncate">
                        {active.source} • {active.category} • {active.kind}
                      </div>
                      {active.handle ? (
                        <div className="mt-1 text-[11px] font-bold tracking-widest text-white/45 truncate">
                          {active.handle}
                        </div>
                      ) : null}
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
                  <p className="mt-2 text-sm leading-relaxed text-signal-300/85">
                    {active.description}
                  </p>
                </div>

                <div className="mt-3 rounded-xl border border-signal-500/20 bg-void-850/50 p-4">
                  <div className="text-[11px] font-black tracking-widest text-white/45">
                    DETAILS
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-signal-300/80">
                    {active.details}
                  </p>

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
                    onClick={() => window.open(active.link, "_blank", "noopener,noreferrer")}
                    className="flex-1 rounded-2xl border border-signal-500 bg-gradient-to-r from-signal-400 to-cyber-400 px-4 py-3 text-sm font-black tracking-wider text-black shadow-glow-sm hover:shadow-glow-cyan transition-all inline-flex items-center justify-center gap-2"
                  >
                    Open link <FaExternalLinkAlt className="text-[14px]" />
                  </button>
                </div>

                <div className="mt-3 text-center text-[11px] text-white/35">
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

export default Contact;
