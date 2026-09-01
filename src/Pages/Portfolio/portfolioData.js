// src/Pages/Portfolio/portfolioData.js
//
// Edit this file to change the portfolio — the page reads everything from here.

export const PROFILE = {
  name: "Oyatullokh",
  handle: "rootzero_x",
  role: "Security Engineer · Full-Stack Developer",
  photo: "/snowden.jpg",
  tagline: "Xavfsiz tizimlar quraman, zaifliklarni mas'uliyat bilan tadqiq qilaman.",
  bio:
    "Kiberxavfsizlik va veb-ishlab chiqish bo'yicha amaliyotchi. Platformalarni " +
    "noldan loyihalashtiraman: autentifikatsiya, ma'lumotlar himoyasi va " +
    "infratuzilma xavfsizligi — hammasi bir kishining mas'uliyatida.",
  location: "O'zbekiston",
  available: true,
};

export const LINKS = [
  { key: "github", label: "GitHub", href: "https://github.com/rootzero-x", handle: "rootzero-x" },
  { key: "telegram", label: "Telegram", href: "https://t.me/rootzero_x", handle: "@rootzero_x" },
  { key: "instagram", label: "Instagram", href: "https://www.instagram.com/rootzero.x/", handle: "@rootzero.x" },
];

/** Grouped so the page can show them as a capability map, not a word cloud. */
export const SKILLS = [
  {
    group: "Xavfsizlik",
    tone: "signal",
    items: [
      "Penetration Testing",
      "Web Application Security",
      "Autentifikatsiya (OAuth, TOTP)",
      "Kriptografiya",
      "Incident Response",
      "DevSecOps",
    ],
  },
  {
    group: "Backend",
    tone: "cyber",
    items: ["PHP", "Node.js", "Python", "MySQL / MariaDB", "REST API", "Linux / Nginx"],
  },
  {
    group: "Frontend",
    tone: "signal",
    items: ["React", "Tailwind CSS", "Vite", "React Native", "WebGL / three.js"],
  },
  {
    group: "Infratuzilma",
    tone: "cyber",
    items: ["Docker", "AWS", "CI/CD", "Server administratsiyasi", "Monitoring"],
  },
];

/**
 * Projects.
 *
 * `metrics` are shown as small stat chips; leave the array empty when there is
 * nothing concrete to state rather than inventing a number.
 */
export const PROJECTS = [
  {
    slug: "cybernexus",
    title: "CyberNexus",
    kind: "Platforma",
    year: "2026",
    description:
      "Kiberxavfsizlik ta'lim platformasi: CTF mashqlari, tahlil vositalari, " +
      "sertifikat generatori va jonli yangiliklar tasmasi. Google orqali " +
      "autentifikatsiya, TOTP bilan himoyalangan admin panel va o'nta manbadan " +
      "avtomatik yangilanadigan yangiliklar agregatori.",
    tags: ["React", "PHP", "MySQL", "OAuth", "three.js"],
    metrics: [
      { label: "Foydalanuvchi", value: "1 250+" },
      { label: "Modul", value: "9" },
    ],
    link: "https://cybernexus.uz",
    cover: "/img/projects/cybernexus.svg",
    tone: "signal",
    featured: true,
  },
  {
    slug: "uzstudents",
    title: "UzStudents",
    kind: "Ta'lim platformasi",
    year: "2026",
    description:
      "Universitet talablari uchun masofaviy ta'lim platformasi. AI integratsiyasi " +
      "bilan ishlaydigan baholash tizimi va o'qituvchi paneli.",
    tags: ["React", "Tailwind CSS", "PHP", "MySQL", "AI"],
    metrics: [],
    link: "https://uzstudents.uz",
    cover: "/img/projects/uzstudents.svg",
    tone: "cyber",
    featured: true,
  },
  {
    slug: "rootzero-vpn",
    title: "RootZero VPN",
    kind: "Android ilova",
    year: "2026",
    description:
      "Android uchun VPN mijozi. Ulanish profillari, avtomatik qayta ulanish va " +
      "trafik statistikasi.",
    tags: ["React Native", "Android", "Networking"],
    metrics: [],
    link: null,
    cover: "/img/projects/rootzero-vpn.svg",
    tone: "cyber",
  },
  {
    slug: "securepass",
    title: "SecurePass",
    kind: "Parol menejeri",
    year: "2025",
    description:
      "Uchdan-uchgacha shifrlangan parol menejeri. Zero-knowledge arxitektura — " +
      "server hech qachon ochiq matnni ko'rmaydi.",
    tags: ["React", "Node.js", "Cryptography"],
    metrics: [],
    link: null,
    cover: "/img/projects/securepass.svg",
    tone: "signal",
  },
  {
    slug: "vulnscan",
    title: "VulnScan",
    kind: "Xavfsizlik vositasi",
    year: "2025",
    description:
      "Veb-ilovalar uchun avtomatlashtirilgan zaiflik skaneri. Topilmalarni " +
      "hisobot ko'rinishida chiqaradi.",
    tags: ["Python", "Security", "Automation"],
    metrics: [],
    link: null,
    cover: "/img/projects/vulnscan.svg",
    tone: "plasma",
  },
  {
    slug: "rootzero-smm",
    title: "RootZero SMM",
    kind: "SMM paneli",
    year: "2025",
    description:
      "Ijtimoiy tarmoq xizmatlari uchun buyurtma va balans boshqaruvi paneli, " +
      "API integratsiyalari bilan.",
    tags: ["PHP", "MySQL", "API"],
    metrics: [],
    link: null,
    cover: "/img/projects/rootzero-smm.svg",
    tone: "cyber",
  },
];

/** Rough timeline for the "yo'l" section. */
export const TIMELINE = [
  {
    year: "2026",
    title: "CyberNexus platformasi",
    text: "Platformani 1 250 dan ortiq foydalanuvchiga yetkazish, xavfsizlik auditi va to'liq qayta dizayn.",
  },
  {
    year: "2026",
    title: "UzStudents",
    text: "Masofaviy ta'lim platformasi va AI baholash tizimi ishga tushirildi.",
  },
  {
    year: "2025",
    title: "Mobil ilovalar",
    text: "RootZero VPN va boshqa Android ilovalari — React Native bilan.",
  },
  {
    year: "2025",
    title: "Xavfsizlik vositalari",
    text: "SecurePass va VulnScan — shifrlash va zaiflik tahlili yo'nalishida.",
  },
];
