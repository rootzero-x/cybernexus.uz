// src/pages/PremiumApp/App.jsx  (yoki sening path'ing)
// Variant #2 — Glass Hero + Tabs + Featured Carousel + Responsive Grid (PRO)

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
  FaShieldAlt,
  FaMobileAlt,
  FaDesktop,
} from "react-icons/fa";

export const App = () => {
  const { mode } = useContext(GlobalContext);

  // ✅ Verified: 2026-01-22
 const appsData = [
  {
    name: "Tor Browser",
    category: "Privacy Browser",
    description:
      "Internetda maxfiylik va anonimlikni oshiradigan bepul brauzer. Trafik Tor tarmog‘i orqali yo‘naltiriladi.",
    downloadLink: "https://www.torproject.org/download/",
    platforms: "Windows, macOS, Linux, Android",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Tor%20Browser%20icon.svg",
    license: "Free / Open Source",
    pricing: "Free",
    officialSource: "Tor Project",
    lastVerified: "2026-01-22",
  },
  {
    name: "NordVPN",
    category: "VPN",
    description:
      "Tezkor va xavfsiz VPN xizmati. Ulanishni shifrlab, onlayn maxfiylikni oshiradi.",
    downloadLink: "https://nordvpn.com/pricing/",
    platforms: "Windows, macOS, Linux, Android, iOS",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/NordVPN%20logo.svg",
    license: "Proprietary",
    pricing: "Paid (subscription)",
    officialSource: "NordVPN",
    lastVerified: "2026-01-22",
  },
  {
    name: "Tails OS",
    category: "Privacy OS (Live)",
    description:
      "Maxfiylik va anonimlik uchun mo‘ljallangan Live OS. Internetga chiqish Tor orqali; iz qoldirmaslikka yo‘naltirilgan.",
    downloadLink: "https://tails.net/install/",
    platforms: "USB/DVD (Live OS)",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Tails-logo-flat.svg",
    license: "Open Source (GPLv3)",
    pricing: "Free",
    officialSource: "Tails Project (tails.net)",
    lastVerified: "2026-01-22",
  },
  {
    name: "Kali Linux",
    category: "Security/Pentesting OS",
    description:
      "Xavfsizlik testlari va pentesting uchun maxsus Linux distributivi (faqat ruxsat bilan ishlating).",
    downloadLink: "https://www.kali.org/get-kali/",
    platforms: "Linux, Windows (VM), USB",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Kali-dragon-icon.svg",
    license: "Open Source",
    pricing: "Free",
    officialSource: "Offensive Security (kali.org)",
    lastVerified: "2026-01-22",
  },
  {
    name: "Wireshark",
    category: "Network Analyzer",
    description:
      "Tarmoq trafikini tahlil qilish uchun ochiq kodli vosita. Paketlarni ushlab, batafsil ko‘rish imkonini beradi.",
    downloadLink: "https://www.wireshark.org/download.html",
    platforms: "Windows, macOS, Linux",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Wireshark%20icon%20new.png",
    license: "Open Source (GPL)",
    pricing: "Free",
    officialSource: "Wireshark Foundation (wireshark.org)",
    lastVerified: "2026-01-22",
  },
  {
    name: "Proton VPN",
    category: "VPN",
    description:
      "Maxfiylikka yo‘naltirilgan VPN xizmati. Bepul va pulli tariflar bilan xavfsiz ulanish beradi.",
    downloadLink: "https://protonvpn.com/download",
    platforms: "Windows, macOS, Linux, Android, iOS",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/ProtonVPN%20Logo.svg",
    license: "Mixed (apps open source; service proprietary)",
    pricing: "Free + Paid plans",
    officialSource: "Proton (protonvpn.com)",
    lastVerified: "2026-01-22",
  },
  {
    name: "Qubes OS",
    category: "Security OS (Isolation)",
    description:
      "Xavfsizlikka yo‘naltirilgan OS. Ilovalarni VM/izolyatsiya orqali ajratib, zarar ta’sirini kamaytiradi.",
    downloadLink: "https://www.qubes-os.org/downloads/",
    platforms: "PC (Dedicated Hardware)",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Qubes%20OS%20Logo.svg",
    license: "Open Source",
    pricing: "Free",
    officialSource: "Qubes OS Project (qubes-os.org)",
    lastVerified: "2026-01-22",
  },
  {
    name: "Burp Suite (Community/Pro)",
    category: "Web Security Testing",
    description:
      "Veb-ilovalar xavfsizligini test qilish uchun mashhur toolkit (faqat ruxsat bilan).",
    downloadLink: "https://portswigger.net/burp/releases",
    platforms: "Windows, macOS, Linux",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/BurpSuite%20logo.svg",
    license: "Community (free) / Pro (commercial)",
    pricing: "Free + Paid (Pro)",
    officialSource: "PortSwigger",
    lastVerified: "2026-01-22",
  },
  {
    name: "Metasploit Framework",
    category: "Pentesting Framework",
    description:
      "Penetration testing uchun mashhur framework (faqat ruxsat bilan).",
    downloadLink: "https://www.metasploit.com/download",
    platforms: "Windows, macOS, Linux",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Metasploit%20logo%20and%20wordmark.svg",
    license: "Open Source + Commercial offerings",
    pricing: "Free (Framework) + Paid (Pro)",
    officialSource: "Rapid7 / Metasploit",
    lastVerified: "2026-01-22",
  },
  {
    name: "Parrot OS",
    category: "Security/Privacy Linux",
    description:
      "Xavfsizlik va maxfiylikka yo‘naltirilgan Linux distributivi. Pentesting va dev ishlari uchun qulay.",
    downloadLink: "https://www.parrotsec.org/download/",
    platforms: "Linux, Windows (VM/WSL), USB",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Parrot-logo.svg",
    license: "Open Source",
    pricing: "Free",
    officialSource: "Parrot Project (parrotsec.org)",
    lastVerified: "2026-01-22",
  },
  {
    name: "Orbot (Tor for Android)",
    category: "Privacy / Tor Proxy",
    description:
      "Android’da Tor tarmog‘iga ulanish (VPN/proxy). Trafikni Tor orqali yo‘naltirib maxfiylikni oshiradi.",
    downloadLink:
      "https://play.google.com/store/apps/details?id=org.torproject.android",
    platforms: "Android",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Orbot-logo.svg",
    license: "Open Source",
    pricing: "Free",
    officialSource: "Tor Project (Google Play)",
    lastVerified: "2026-01-22",
  },
  {
    name: "Bitdefender Mobile Security",
    category: "Mobile Security",
    description:
      "Telefonni zararli dasturlar va phishing/scam tahdidlardan himoya qilishga yo‘naltirilgan mobil xavfsizlik yechimi.",
    downloadLink: "https://www.bitdefender.com/en-us/consumer/mobile-security",
    platforms: "Android, iOS",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Bitdefender%20logo.svg",
    license: "Proprietary",
    pricing: "Paid (trial available)",
    officialSource: "Bitdefender",
    lastVerified: "2026-01-22",
  },
  {
    name: "1Password",
    category: "Password Manager",
    description:
      "Parollar va maxfiy ma’lumotlarni xavfsiz saqlash/boshqarish. Kuchli shifrlash va autofill mavjud.",
    downloadLink: "https://1password.com/downloads/",
    platforms: "Windows, macOS, Linux, Android, iOS",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/1Password%20icon.png",
    license: "Proprietary",
    pricing: "Paid (subscription)",
    officialSource: "1Password",
    lastVerified: "2026-01-22",
  },
  {
    name: "Malwarebytes Mobile Security",
    category: "Mobile Security",
    description:
      "Mobil qurilmada zararli dastur/scam/phishing tahdidlariga qarshi himoya (platformaga qarab funksiyalar farq qiladi).",
    downloadLink: "https://www.malwarebytes.com/mobile",
    platforms: "Android, iOS",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Malwarebytes%20logo.png",
    license: "Proprietary",
    pricing: "Free + Paid plans",
    officialSource: "Malwarebytes",
    lastVerified: "2026-01-22",
  },
  {
    name: "DuckDuckGo Private Browser",
    category: "Privacy Browser",
    description:
      "Kuzatuvchi trackerlarni bloklash va maxfiy qidiruv/brauzingga yo‘naltirilgan brauzer.",
    downloadLink: "https://duckduckgo.com/app",
    platforms: "Android, iOS, Windows, macOS",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/The%20DuckDuckGo%20Duck.png",
    license: "Mixed (app components vary)",
    pricing: "Free",
    officialSource: "DuckDuckGo",
    lastVerified: "2026-01-22",
  },
  {
    name: "LastPass",
    category: "Password Manager",
    description:
      "Parollarni saqlash va autofill qilish uchun password manager. Reja/tariflarga qarab imkoniyatlar farq qiladi.",
    downloadLink: "https://lastpass.com/misc_download2.php",
    platforms: "Windows, macOS, Linux (via extensions), Android, iOS",
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/LastPass%20logo%202016.svg",
    license: "Proprietary",
    pricing: "Free + Paid plans",
    officialSource: "LastPass",
    lastVerified: "2026-01-22",
  },
];


  // ====== UI State ======
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("All"); // All | Privacy | Pentest | Mobile | Desktop | OS
  const [active, setActive] = useState(null); // modal
  const [favOnly, setFavOnly] = useState(false);

  const [fav, setFav] = useState(() => {
    try {
      const raw = localStorage.getItem("cybernexus_apps_fav_v2");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cybernexus_apps_fav_v2", JSON.stringify(fav));
    } catch {}
  }, [fav]);

  const toggleFav = (name) => {
    setFav((p) => (p.includes(name) ? p.filter((x) => x !== name) : [...p, name]));
  };

  const handleDownload = (link) =>
    window.open(link, "_blank", "noopener,noreferrer");

  // ====== Helpers: categorize ======
  const getCategory = (app) => {
    const n = (app.name || "").toLowerCase();
    const p = (app.platforms || "").toLowerCase();
    const text = `${n} ${p}`.toLowerCase();

    const isMobile = text.includes("android") || text.includes("ios");
    const isDesktop =
      text.includes("windows") || text.includes("macos") || text.includes("linux");
    const isOS =
      n.includes("linux") ||
      n.includes("os") ||
      p.includes("usb") ||
      p.includes("live");
    const isPentest =
      n.includes("kali") ||
      n.includes("burp") ||
      n.includes("metasploit") ||
      n.includes("wireshark");
    const isPrivacy =
      n.includes("tor") ||
      n.includes("proton") ||
      n.includes("duckduckgo") ||
      n.includes("tails") ||
      n.includes("vpn");

    return { isMobile, isDesktop, isOS, isPentest, isPrivacy };
  };

  const tabs = useMemo(
    () => [
      { key: "All", label: "All", icon: FaLayerGroup },
      { key: "Privacy", label: "Privacy", icon: FaShieldAlt },
      { key: "Pentest", label: "Pentest", icon: FaShieldAlt },
      { key: "Mobile", label: "Mobile", icon: FaMobileAlt },
      { key: "Desktop", label: "Desktop", icon: FaDesktop },
      { key: "OS", label: "OS", icon: FaShieldAlt },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = appsData.filter((a) => {
      const text = `${a.name} ${a.description} ${a.platforms}`.toLowerCase();
      if (q && !text.includes(q)) return false;

      const c = getCategory(a);
      if (tab === "Privacy" && !c.isPrivacy) return false;
      if (tab === "Pentest" && !c.isPentest) return false;
      if (tab === "Mobile" && !c.isMobile) return false;
      if (tab === "Desktop" && !c.isDesktop) return false;
      if (tab === "OS" && !c.isOS) return false;

      if (favOnly && !fav.includes(a.name)) return false;

      return true;
    });

    // stable nice sorting
    list.sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [appsData, query, tab, favOnly, fav]);

  const featured = useMemo(() => {
    // curated top set (feel free to change)
    const pick = ["Tor Browser", "Kali Linux", "Burp Suite", "ProtonVPN", "Wireshark"];
    const map = new Map(appsData.map((a) => [a.name, a]));
    return pick.map((n) => map.get(n)).filter(Boolean);
  }, [appsData]);

  // ====== UI Atoms ======
  const Glass = ({ className, children }) => (
    <div
      className={classNames(
        "rounded-xl border-2 bg-black/55 backdrop-blur-xl",
        "border-neon-green/40 shadow-neon",
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
          ? "border-neon-blue bg-neon-blue/10 text-neon-blue shadow-neon-blue"
          : "border-neon-green/30 bg-black/50 text-gray-200 hover:border-neon-green hover:text-neon-green"
      )}
    >
      {Icon ? <Icon className="text-[12px]" /> : null}
      {children}
    </button>
  );

  const Clamp2 = ({ children, className }) => (
    <p
      className={classNames("text-sm text-neon-green/80 leading-relaxed", className)}
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
      {/* soft grid */}
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
                  <div className="h-11 w-11 rounded-lg border border-neon-blue/40 bg-neon-blue/10 grid place-items-center shadow-neon-blue">
                    <FaShieldAlt className="text-neon-blue" />
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-black tracking-wider text-neon-green truncate">
                      Cyber Toolkit
                    </h1>
                    <p className="mt-1 text-xs sm:text-sm text-neon-blue/90 font-bold tracking-widest truncate">
                      PRIVACY • DEFENSE • PENTEST • MOBILE
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm sm:text-base text-gray-300/90 leading-relaxed">
                  Eng kerakli kiberxavfsizlik ilovalari va tool’lar katalogi.
                  Qidir, filterla, “favorite”ga saqla va tez yuklab ol.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Chip active={favOnly} onClick={() => setFavOnly((v) => !v)} icon={favOnly ? FaStar : FaRegStar}>
                    Favorites
                  </Chip>
                  <Chip active={tab === "Privacy"} onClick={() => setTab("Privacy")} icon={FaShieldAlt}>
                    Privacy
                  </Chip>
                  <Chip active={tab === "Pentest"} onClick={() => setTab("Pentest")} icon={FaShieldAlt}>
                    Pentest
                  </Chip>
                </div>
              </div>

              {/* Search */}
              <div className="w-full lg:w-[420px]">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-blue/80" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Qidirish: tor, vpn, kali, burp..."
                    className={classNames(
                      "w-full rounded-xl border-2 bg-black/60 backdrop-blur px-10 py-3 text-sm",
                      "border-neon-green/50 text-neon-green placeholder:text-gray-500",
                      "focus:outline-none focus:border-neon-blue focus:shadow-neon-blue"
                    )}
                  />
                </div>

                <div className="mt-3 text-xs text-gray-400 flex items-center justify-between">
                  <span>
                    Natija:{" "}
                    <span className="text-neon-green font-black">{filtered.length}</span>
                  </span>
                  <span className="text-neon-blue/80 font-bold tracking-widest">
                    CLICK CARD → DETAILS
                  </span>
                </div>
              </div>
            </div>
          </Glass>
        </motion.div>

        {/* STICKY TABS */}
        <div className="sticky top-0 z-30 pt-4">
          <div className="rounded-xl border border-neon-green/25 bg-black/70 backdrop-blur-xl px-3 py-3">
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
                className="hidden sm:inline-flex rounded-lg border border-neon-blue/30 bg-neon-blue/10 px-3 py-2 text-xs font-black tracking-widest text-neon-blue hover:border-neon-green hover:text-neon-green transition-all"
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
            <h2 className="text-sm sm:text-base font-black tracking-widest text-neon-blue">
              FEATURED
            </h2>
            <span className="text-[11px] text-gray-500">
              swipe → (mobile/tablet)
            </span>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {featured.map((app) => {
              const isFav = fav.includes(app.name);
              return (
                <button
                  key={app.name}
                  type="button"
                  onClick={() => setActive(app)}
                  className={classNames(
                    "min-w-[280px] sm:min-w-[340px] lg:min-w-[380px]",
                    "rounded-xl border-2 bg-black/70 backdrop-blur p-4 text-left",
                    "border-neon-green/45 shadow-neon",
                    "hover:border-neon-blue hover:shadow-neon-blue transition-all"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-12 w-12 rounded-lg border border-neon-blue/40 bg-neon-blue/10 grid place-items-center overflow-hidden shrink-0">
                        <img
                          src={app.imageUrl}
                          alt={app.name}
                          className="h-10 w-10 object-contain"
                          loading="lazy"
                        />
                      </div>
                      {/* ✅ FIX: min-w-0 + truncate */}
                      <div className="min-w-0">
                        <div className="text-base font-black tracking-wider text-neon-green truncate">
                          {app.name}
                        </div>
                        <div className="mt-1 text-[11px] font-bold tracking-widest text-neon-blue/80 truncate">
                          {app.platforms}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFav(app.name);
                      }}
                      className={classNames(
                        "shrink-0 rounded-lg border px-2 py-2 transition-all",
                        isFav
                          ? "border-neon-blue bg-neon-blue/10 text-neon-blue shadow-neon-blue"
                          : "border-neon-green/30 bg-black/50 text-gray-200 hover:border-neon-green hover:text-neon-green"
                      )}
                      title="Favorite"
                      aria-label="favorite"
                    >
                      {isFav ? <FaStar /> : <FaRegStar />}
                    </button>
                  </div>

                  <div className="mt-3">
                    <Clamp2>{app.description}</Clamp2>
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
        </motion.div>

        {/* MAIN GRID */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((app, idx) => {
              const isFav = fav.includes(app.name);
              return (
                <motion.button
                  key={app.name}
                  type="button"
                  onClick={() => setActive(app)}
                  className={classNames(
                    "rounded-xl border-2 bg-black/70 backdrop-blur p-4 text-left",
                    "border-neon-green/45 shadow-neon",
                    "hover:border-neon-blue hover:shadow-neon-blue transition-all"
                  )}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.02 + idx * 0.02, ease: "easeOut" }}
                  whileHover={{ y: -3 }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-12 w-12 rounded-lg border border-neon-blue/40 bg-neon-blue/10 grid place-items-center overflow-hidden shrink-0">
                        <img
                          src={app.imageUrl}
                          alt={app.name}
                          className="h-10 w-10 object-contain"
                          loading="lazy"
                        />
                      </div>

                      {/* ✅ FIX: title never leaves the card */}
                      <div className="min-w-0">
                        <h3 className="text-base font-black tracking-wider text-neon-green truncate">
                          {app.name}
                        </h3>
                        <p className="mt-1 text-[11px] font-bold tracking-widest text-neon-blue/80 truncate">
                          {app.platforms}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFav(app.name);
                      }}
                      className={classNames(
                        "shrink-0 rounded-lg border px-2 py-2 transition-all",
                        isFav
                          ? "border-neon-blue bg-neon-blue/10 text-neon-blue shadow-neon-blue"
                          : "border-neon-green/30 bg-black/50 text-gray-200 hover:border-neon-green hover:text-neon-green"
                      )}
                      title="Favorite"
                      aria-label="favorite"
                    >
                      {isFav ? <FaStar /> : <FaRegStar />}
                    </button>
                  </div>

                  <div className="mt-3">
                    <Clamp2>{app.description}</Clamp2>
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

          {filtered.length === 0 && (
            <div className="mt-8 text-center">
              <div className="rounded-xl border-2 border-neon-green/35 bg-black/60 p-8 shadow-neon">
                <div className="text-neon-blue font-black tracking-widest">
                  NO RESULTS
                </div>
                <p className="mt-2 text-sm text-gray-400">
                  Qidiruv yoki tab’ni o‘zgartirib ko‘ring.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setTab("All");
                    setFavOnly(false);
                  }}
                  className="mt-5 rounded-lg border-2 border-neon-blue bg-neon-blue/10 px-4 py-2 text-xs font-black tracking-widest text-neon-blue hover:border-neon-green hover:text-neon-green transition-all"
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
                      <img
                        src={active.imageUrl}
                        alt={active.name}
                        className="h-11 w-11 object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xl font-black tracking-wider text-neon-green truncate">
                        {active.name}
                      </div>
                      <div className="mt-1 text-xs font-bold tracking-widest text-neon-blue/90 truncate">
                        {active.platforms}
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
                    ABOUT
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-neon-green/85">
                    {active.description}
                  </p>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => toggleFav(active.name)}
                    className={classNames(
                      "flex-1 rounded-xl border-2 px-4 py-3 text-sm font-black tracking-wider transition-all",
                      fav.includes(active.name)
                        ? "border-neon-blue bg-neon-blue/10 text-neon-blue shadow-neon-blue"
                        : "border-neon-green bg-black/60 text-neon-green shadow-neon hover:border-neon-blue hover:text-neon-blue"
                    )}
                  >
                    {fav.includes(active.name) ? "★ Favorited" : "☆ Add to favorites"}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownload(active.downloadLink)}
                    className="flex-1 rounded-xl border-2 border-neon-green bg-gradient-to-r from-neon-green to-neon-blue px-4 py-3 text-sm font-black tracking-wider text-black shadow-neon hover:shadow-neon-blue transition-all inline-flex items-center justify-center gap-2"
                  >
                    Yuklab olish <FaExternalLinkAlt className="text-[14px]" />
                  </button>
                </div>

                <div className="mt-3 text-center text-[11px] text-gray-500">
                  External link opens in new tab.
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

export default App;
