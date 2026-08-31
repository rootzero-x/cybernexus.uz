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
  FaBug,
  FaGavel,
  FaSkullCrossbones,
  FaCloud,
} from "react-icons/fa";

/**
 * Premium News — App.jsx style
 * Features:
 *  - Glass hero + Sticky tabs
 *  - Featured horizontal carousel
 *  - Responsive grid (3 screens: mobile/tablet/desktop)
 *  - Modal details + external link
 *  - Favorites (localStorage)
 *  - Search + Category filters
 */

export const News = () => {
  const { mode } = useContext(GlobalContext);

  // ====== DATA (Updated, credible sources, Jan 2026 focus) ======
const newsItems = [
  // ========= THREAT INTEL (Microsoft / Reuters / CISA) =========
  {
    id: "reuters-mustang-panda-2026-01-15",
    title: "China-linked group ‘Mustang Panda’ targets U.S. entities with themed malware",
    description:
      "Cyber-espionage campaign used phishing with Venezuela-themed lures to deliver malware and maintain access.",
    details:
      "Researchers linked tooling/infrastructure to Mustang Panda; illustrates rapid weaponization of real-world events in phishing.",
    source: "Reuters",
    date: "2026-01-15",
    category: "Threat Intel",
    tags: ["APT", "Phishing", "Malware"],
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Flag_of_China.png/640px-Flag_of_China.png",
    link: "https://www.reuters.com/business/media-telecom/chinese-linked-hackers-target-us-entities-with-venezuelan-themed-malware-2026-01-15/",
  },
  {
    id: "msft-aitm-bec-2026-01-21",
    title: "Resurgence of multi-stage AiTM phishing + BEC campaign abusing SharePoint",
    description:
      "Microsoft reports a multi-stage adversary-in-the-middle (AiTM) phishing and business email compromise (BEC) campaign.",
    details:
      "Campaign abused SharePoint file-sharing to deliver payloads and used inbox rules for persistence/stealth.",
    source: "Microsoft Security Blog",
    date: "2026-01-21",
    category: "Threat Intel",
    tags: ["Phishing", "BEC", "AiTM", "SharePoint"],
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Microsoft_Office_SharePoint_%282019%E2%80%93present%29.svg/512px-Microsoft_Office_SharePoint_%282019%E2%80%93present%29.svg.png",
    link: "https://www.microsoft.com/en-us/security/blog/2026/01/21/multistage-aitm-phishing-bec-campaign-abusing-sharepoint/",
  },
  {
    id: "msft-domain-spoof-2026-01-06",
    title: "Phishing actors exploit complex routing & misconfigurations to spoof domains",
    description:
      "Microsoft explains how attackers abuse routing complexity and misconfigurations to spoof domains.",
    details:
      "Harden email/domain routing, monitor anomalies, enforce authentication and anti-spoofing controls.",
    source: "Microsoft Security Blog",
    date: "2026-01-06",
    category: "Threat Intel",
    tags: ["Spoofing", "Email Security", "Phishing"],
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Antispam_icon.svg/512px-Antispam_icon.svg.png",
    link: "https://www.microsoft.com/en-us/security/blog/2026/01/06/phishing-actors-exploit-complex-routing-and-misconfigurations-to-spoof-domains/",
  },
  {
    id: "cisa-brickstorm-alert-2025-12-04",
    title: "PRC state-sponsored actors use BRICKSTORM malware across public sector and IT",
    description:
      "CISA warns PRC state-sponsored actors are using BRICKSTORM for persistent access across sectors.",
    details:
      "Guidance includes detection, mitigation, and threat-hunting recommendations for defenders.",
    source: "CISA",
    date: "2025-12-04",
    category: "Threat Intel",
    tags: ["BRICKSTORM", "PRC", "Persistence", "Hunting"],
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Seal_of_the_United_States_Department_of_Homeland_Security.svg/640px-Seal_of_the_United_States_Department_of_Homeland_Security.svg.png",
    link: "https://www.cisa.gov/news-events/alerts/2025/12/04/prc-state-sponsored-actors-use-brickstorm-malware-across-public-sector-and-information-technology",
  },

  // ========= VULNERABILITIES / KEV / PATCH =========
  {
    id: "cisa-kev-2026-01-21",
    title: "CISA adds one known exploited vulnerability to KEV Catalog",
    description:
      "CISA confirmed evidence of active exploitation and added a vulnerability to the KEV catalog.",
    details:
      "If it’s on KEV, it’s exploited in real attacks — treat patching/mitigation as urgent.",
    source: "CISA",
    date: "2026-01-21",
    category: "Vulnerabilities",
    tags: ["KEV", "Patch", "Exploitation"],
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Seal_of_the_United_States_Department_of_Homeland_Security.svg/640px-Seal_of_the_United_States_Department_of_Homeland_Security.svg.png",
    link: "https://www.cisa.gov/news-events/alerts/2026/01/21/cisa-adds-one-known-exploited-vulnerability-catalog",
  },
  {
    id: "cisa-kev-2026-01-07",
    title: "CISA adds two known exploited vulnerabilities to KEV Catalog",
    description:
      "CISA added two vulnerabilities to KEV based on evidence of active exploitation.",
    details:
      "Use KEV as patch-priority input; add compensating controls if immediate patching isn’t possible.",
    source: "CISA",
    date: "2026-01-07",
    category: "Vulnerabilities",
    tags: ["KEV", "Exploitation", "Remediation"],
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/640px-Flag_of_the_United_States.svg.png",
    link: "https://www.cisa.gov/news-events/alerts/2026/01/07/cisa-adds-two-known-exploited-vulnerabilities-catalog",
  },
  {
    id: "cisa-kev-live-catalog",
    title: "Known Exploited Vulnerabilities Catalog (LIVE)",
    description:
      "CISA maintains the authoritative list of vulnerabilities exploited in the wild.",
    details:
      "Weekly workflow: map KEV → asset inventory → patch/mitigate → monitor exposed services.",
    source: "CISA",
    date: "LIVE",
    category: "Vulnerabilities",
    tags: ["KEV", "CVE", "Best Practice"],
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Computer_icon.svg/512px-Computer_icon.svg.png",
    link: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
  },
  {
    id: "cisa-vuln-bulletin-sb26-020",
    title: "CISA Vulnerability Bulletin (Week of Jan 12, 2026)",
    description:
      "Weekly summary of newly recorded vulnerabilities (useful for triage and tracking).",
    details:
      "Good for awareness + prioritization; combine with KEV to drive patch decisions.",
    source: "CISA Bulletin",
    date: "2026-01-12",
    category: "Vulnerabilities",
    tags: ["Bulletin", "CVE", "Triage"],
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Checklist_icon.svg/512px-Checklist_icon.svg.png",
    link: "https://www.cisa.gov/news-events/bulletins/sb26-020",
  },

  // ========= ICS / OT SECURITY (CISA ICS Advisories) =========
  {
    id: "cisa-icsa-26-015-03-siemens",
    title: "ICS Advisory: Siemens TeleControl Server Basic",
    description:
      "CISA ICS advisory for Siemens TeleControl Server Basic (OT/ICS vulnerability guidance).",
    details:
      "Review affected versions and mitigations; prioritize if exposed or reachable from untrusted networks.",
    source: "CISA ICS Advisory",
    date: "2026-01-14",
    category: "Vulnerabilities",
    tags: ["ICS", "OT", "Siemens"],
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Industrial_icon.svg/512px-Industrial_icon.svg.png",
    link: "https://www.cisa.gov/news-events/ics-advisories/icsa-26-015-03",
  },
  {
    id: "cisa-icsa-26-020-01-schneider",
    title: "ICS Advisory: Schneider Electric EcoStruxure Foxboro DCS",
    description:
      "CISA ICS advisory for Schneider Electric EcoStruxure Foxboro DCS vulnerabilities.",
    details:
      "OT environments: segment networks, reduce exposure, and follow vendor/CISA mitigation steps.",
    source: "CISA ICS Advisory",
    date: "2026-01-20",
    category: "Vulnerabilities",
    tags: ["ICS", "OT", "Schneider"],
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Industrial_icon.svg/512px-Industrial_icon.svg.png",
    link: "https://www.cisa.gov/news-events/ics-advisories/icsa-26-020-01",
  },
  {
    id: "cisa-icsa-25-212-01-guralp-updateb",
    title: "ICS Advisory Update: Güralp Systems FMUS/MIN devices (Update B)",
    description:
      "Updated ICS advisory for Güralp Systems devices; review revisions and mitigations.",
    details:
      "OT patching is slow: apply compensating controls (segmentation, allowlisting, monitoring).",
    source: "CISA ICS Advisory",
    date: "2026-01-13",
    category: "Vulnerabilities",
    tags: ["ICS", "OT", "Update"],
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Industrial_icon.svg/512px-Industrial_icon.svg.png",
    link: "https://www.cisa.gov/news-events/ics-advisories/icsa-25-212-01",
  },

  // ========= CLOUD & IDENTITY (Microsoft) =========
  {
    id: "msft-identity-2026-01-20",
    title: "Four priorities for AI-powered identity & network access security in 2026",
    description:
      "Microsoft recommends identity-first controls as AI agents and automation expand.",
    details:
      "Focus: adaptive protection, identity hardening, safer access baselines, continuous posture improvements.",
    source: "Microsoft Security Blog",
    date: "2026-01-20",
    category: "Cloud & Identity",
    tags: ["Identity", "Zero Trust", "AI Security"],
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png",
    link: "https://www.microsoft.com/en-us/security/blog/2026/01/20/four-priorities-for-ai-powered-identity-and-network-access-security-in-2026/",
  },
  {
    id: "msft-agents-posture-2026-01-21",
    title: "A new era of agents, a new era of posture",
    description:
      "AI agents expand attack surface; Microsoft discusses posture management for AI apps/agents.",
    details:
      "Treat agents like identities: least privilege, monitoring, policy enforcement, posture governance.",
    source: "Microsoft Security Blog",
    date: "2026-01-21",
    category: "Cloud & Identity",
    tags: ["AI Agents", "Posture", "Governance"],
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png",
    link: "https://www.microsoft.com/en-us/security/blog/2026/01/21/new-era-of-agents-new-era-of-posture/",
  },

  // ========= POLICY / REGULATION / GEO =========
  {
    id: "reuters-eu-high-risk-suppliers-2026-01-20",
    title: "EU plans to phase out 'high-risk' suppliers in critical infrastructure (Huawei focus)",
    description:
      "Draft revisions to EU cybersecurity rules propose phasing out equipment from high-risk suppliers.",
    details:
      "Aims to reduce dependence on high-risk vendors across multiple critical sectors.",
    source: "Reuters",
    date: "2026-01-20",
    category: "Policy",
    tags: ["EU", "Telecom", "Critical Infrastructure"],
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/640px-Flag_of_Europe.svg.png",
    link: "https://www.reuters.com/business/media-telecom/eu-phase-out-high-risk-tech-targets-huawei-chinese-companies-2026-01-20/",
  },
  {
    id: "reuters-poland-power-2026-01-15",
    title: "Poland PM: reasons to believe Russia behind cyberattack on power system",
    description:
      "Poland said indicators suggest a group tied to Russian services behind the December power-sector cyberattack.",
    details:
      "Officials said defenses worked and critical infrastructure was not harmed; highlights ongoing CI targeting.",
    source: "Reuters",
    date: "2026-01-15",
    category: "Policy",
    tags: ["Critical Infrastructure", "Energy", "Attribution"],
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Flag_of_Poland.svg/640px-Flag_of_Poland.svg.png",
    link: "https://www.reuters.com/world/reasons-believe-russia-behind-cyberattack-polish-power-system-pm-says-2026-01-15/",
  },
  {
    id: "reuters-poland-power-failed-2026-01-13",
    title: "Massive cyberattack on Polish power system in December failed, minister says",
    description:
      "Poland described a major attempted attack against power infrastructure communications as its largest in years.",
    details:
      "Focused on comms between renewable installations and distribution operators; ultimately failed.",
    source: "Reuters",
    date: "2026-01-13",
    category: "Policy",
    tags: ["Energy", "Renewables", "Infrastructure"],
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Flag_of_Poland.svg/640px-Flag_of_Poland.svg.png",
    link: "https://www.reuters.com/sustainability/climate-energy/massive-cyberattack-polish-power-system-december-failed-minister-says-2026-01-13/",
  },

  // ========= PATCH / VULN NEWS (The Hacker News - still credible in security world) =========
  {
    id: "thn-msft-patch-tuesday-2026-01-14",
    title: "Microsoft January 2026 Patch Tuesday fixes 114 flaws (one actively exploited)",
    description:
      "Security update addresses numerous Windows flaws and includes an actively exploited vulnerability.",
    details:
      "Patch promptly; exploitable bugs can be chained with others to escalate impact.",
    source: "The Hacker News",
    date: "2026-01-14",
    category: "Vulnerabilities",
    tags: ["Patch Tuesday", "Windows", "Zero-day"],
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Windows_logo_-_2012.svg/512px-Windows_logo_-_2012.svg.png",
    link: "https://thehackernews.com/2026/01/microsoft-fixes-114-windows-flaws-in.html",
  },
  {
    id: "thn-cisco-zero-day-2026-01-22",
    title: "Cisco fixes an actively exploited zero-day (advisory-based report)",
    description:
      "Cisco advisory coverage about an actively exploited issue affecting devices with web-based management interface.",
    details:
      "If you run affected gear: patch ASAP, restrict management access, and monitor for anomalous HTTP patterns.",
    source: "The Hacker News",
    date: "2026-01-22",
    category: "Vulnerabilities",
    tags: ["Cisco", "Zero-day", "Network"],
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Cisco_logo.svg/512px-Cisco_logo.svg.png",
    link: "https://thehackernews.com/2026/01/cisco-fixes-actively-exploited-zero-day.html",
  },
  {
    id: "thn-cisa-kev-office-hpe-2026-01-08",
    title: "CISA flags Microsoft Office and HPE OneView bugs as actively exploited (KEV)",
    description:
      "Report summarizing KEV additions impacting Microsoft Office and HPE OneView.",
    details:
      "Use KEV deadlines and patch guidance; verify exposure paths and apply compensating controls if needed.",
    source: "The Hacker News",
    date: "2026-01-08",
    category: "Vulnerabilities",
    tags: ["KEV", "Office", "HPE"],
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png",
    link: "https://thehackernews.com/2026/01/cisa-flags-microsoft-office-and-hpe.html",
  },

  // ========= “EVERGREEN” VERIFIED LISTS (still official) =========
  {
    id: "cisa-advisories-index",
    title: "CISA Cybersecurity Advisories (Official index)",
    description:
      "Official advisory hub: alerts, bulletins, and guidance in one place.",
    details:
      "Best place to keep your ‘News’ fresh because it’s continuously updated.",
    source: "CISA",
    date: "LIVE",
    category: "Vulnerabilities",
    tags: ["Advisories", "Alerts", "Official"],
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Seal_of_the_United_States_Department_of_Homeland_Security.svg/640px-Seal_of_the_United_States_Department_of_Homeland_Security.svg.png",
    link: "https://www.cisa.gov/news-events/cybersecurity-advisories",
  },
  {
    id: "msft-security-blog-home",
    title: "Microsoft Security Blog (Official hub)",
    description:
      "Official Microsoft Security research, incidents, and defender guidance hub.",
    details:
      "Use this to expand News feed with verified Microsoft-authored research posts.",
    source: "Microsoft Security Blog",
    date: "LIVE",
    category: "Cloud & Identity",
    tags: ["Official", "Research", "Defender"],
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png",
    link: "https://www.microsoft.com/en-us/security/blog/",
  },

  // ========= EXTRA VERIFIED ITEMS (still solid + diverse) =========
  {
    id: "reuters-cybersecurity-hub",
    title: "Reuters Cybersecurity Hub (Latest list)",
    description:
      "Reuters’ cybersecurity topic page with continuously updated news list.",
    details:
      "Great for ‘Latest’ section; use for weekly updates and new incidents.",
    source: "Reuters",
    date: "LIVE",
    category: "Policy",
    tags: ["News Hub", "Incidents", "Verified"],
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Newspaper_icon.svg/512px-Newspaper_icon.svg.png",
    link: "https://www.reuters.com/technology/cybersecurity/",
  },
  {
    id: "msft-social-engineering-hub",
    title: "Microsoft Threat Intel: Social engineering & phishing (topic hub)",
    description:
      "Microsoft’s curated hub for phishing/social engineering research and guidance.",
    details:
      "Use to build threat intel learning content and update News feed reliably.",
    source: "Microsoft Security Blog",
    date: "LIVE",
    category: "Threat Intel",
    tags: ["Phishing", "Social Engineering", "Intel"],
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png",
    link: "https://www.microsoft.com/en-us/security/blog/threat-intelligence/social-engineering-phishing/",
  },

  // ========= MORE “SAFE” CARD IMAGES (always exists) =========
  {
    id: "visual-shield-generic",
    title: "Zero Trust basics: least privilege + continuous verification",
    description:
      "A compact reminder card: identity hardening, least privilege, continuous verification reduce breach blast radius.",
    details:
      "Use as ‘knowledge card’ between news items if you want richer UX feed.",
    source: "CyberNexus Insight",
    date: "LIVE",
    category: "Cloud & Identity",
    tags: ["Zero Trust", "Least Privilege", "Best Practice"],
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Shield_icon.svg/512px-Shield_icon.svg.png",
    link: "https://www.cisa.gov/topics/cybersecurity-best-practices",
  },
];

  // ====== UI State ======
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("All"); // All | Threat Intel | Vulnerabilities | Ransomware | Policy | Cloud & Identity
  const [active, setActive] = useState(null); // modal
  const [favOnly, setFavOnly] = useState(false);

  const [fav, setFav] = useState(() => {
    try {
      const raw = localStorage.getItem("cybernexus_news_fav_v1");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cybernexus_news_fav_v1", JSON.stringify(fav));
    } catch {
        /* storage unavailable — non-fatal */
      }
  }, [fav]);

  const toggleFav = (id) => {
    setFav((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  };

  // ====== Helpers ======
  const tabs = useMemo(
    () => [
      { key: "All", label: "All", icon: FaLayerGroup },
      { key: "Threat Intel", label: "Threat Intel", icon: FaShieldAlt },
      { key: "Vulnerabilities", label: "Vulnerabilities", icon: FaBug },
      { key: "Ransomware", label: "Ransomware", icon: FaSkullCrossbones },
      { key: "Policy", label: "Policy", icon: FaGavel },
      { key: "Cloud & Identity", label: "Cloud & Identity", icon: FaCloud },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = newsItems.filter((n) => {
      const text = `${n.title} ${n.description} ${n.details} ${n.source} ${n.category} ${(n.tags || []).join(" ")}`.toLowerCase();
      if (q && !text.includes(q)) return false;

      if (tab !== "All" && n.category !== tab) return false;
      if (favOnly && !fav.includes(n.id)) return false;

      return true;
    });

    // sort: newest first (LIVE goes top-ish but after newest)
    list.sort((a, b) => {
      const da = a.date === "LIVE" ? "9999-12-31" : a.date;
      const db = b.date === "LIVE" ? "9999-12-31" : b.date;
      return db.localeCompare(da);
    });

    return list;
  }, [newsItems, query, tab, favOnly, fav]);

  const featured = useMemo(() => {
    // curated highlight set
    const pick = [
      "msft-aitm-bec-2026-01-21",
      "cisa-kev-2026-01-21",
      "reuters-mustang-panda-2026-01-15",
      "msft-identity-2026-01-20",
      "cisa-kev-catalog-live",
    ];
    const map = new Map(newsItems.map((x) => [x.id, x]));
    return pick.map((id) => map.get(id)).filter(Boolean);
  }, [newsItems]);

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

  const formatDate = (d) => {
    if (!d || d === "LIVE") return d || "";
    // keep ISO but nicer
    return d;
  };

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
                    <FaShieldAlt className="text-cyber-300" />
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-black tracking-wider text-signal-300 truncate">
                      Cybersecurity News
                    </h1>
                    <p className="mt-1 text-xs sm:text-sm text-cyber-300/90 font-bold tracking-widest truncate">
                      LATEST • VERIFIED • PRO SOURCES
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm sm:text-base text-white/55 leading-relaxed">
                  Eng yangi va ishonchli kiberxavfsizlik yangiliklari: APT, KEV/CVE,
                  phishing, incidentlar va siyosiy/regulyator update’lar.
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
                    active={tab === "Threat Intel"}
                    onClick={() => setTab("Threat Intel")}
                    icon={FaShieldAlt}
                  >
                    Threat Intel
                  </Chip>
                  <Chip
                    active={tab === "Vulnerabilities"}
                    onClick={() => setTab("Vulnerabilities")}
                    icon={FaBug}
                  >
                    KEV / CVE
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
                    placeholder="Qidirish: cisa, kev, phishing, microsoft, reuters..."
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
                    <span className="text-signal-300 font-black">
                      {filtered.length}
                    </span>
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
                          {item.category} • {formatDate(item.date)}
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
                    <Clamp2 className="mt-2">{item.description}</Clamp2>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[11px] font-bold tracking-widest text-white/45">
                      QUICK VIEW
                    </span>
                    <span className="text-xs font-black tracking-widest text-cyber-300">
                      OPEN →
                    </span>
                  </div>
                </div>
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
                          {item.source} • {item.category} • {formatDate(item.date)}
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
                    <Clamp2>{item.description}</Clamp2>
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
                </motion.div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="mt-8 text-center">
              <div className="rounded-2xl border border-signal-500/35 bg-void-850/60 p-8 shadow-glow-sm">
                <div className="text-cyber-300 font-black tracking-widest">
                  NO RESULTS
                </div>
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
                        {active.source} • {active.category} • {formatDate(active.date)}
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
                    Read source <FaExternalLinkAlt className="text-[14px]" />
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

export default News;
