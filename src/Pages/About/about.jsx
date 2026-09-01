// src/Pages/About/about.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import {
  Users,
  Newspaper,
  Wrench,
  Package,
  ShieldCheck,
  Target,
  BookOpen,
  Lock,
  GitBranch,
  ArrowUpRight,
  CheckCircle2,
  Circle,
  Loader2,
} from "lucide-react";

import { apiFetch } from "../../api/client";
import { APPS } from "../App/appsData";
import {
  HoloCard,
  Eyebrow,
  Display,
  Accent,
  Section,
  Reveal,
  Rule,
} from "../../design";

const PILLARS = [
  {
    icon: BookOpen,
    tone: "signal",
    title: "Amaliyot, nazariya emas",
    text: "Har bir modul qo'l bilan ishlanadigan narsa beradi — terminal mashqi, ishlaydigan vosita yoki tekshirilgan dastur. Faqat o'qib chiqiladigan matn emas.",
  },
  {
    icon: ShieldCheck,
    tone: "cyber",
    title: "Tekshirilgan manba",
    text: "Katalogdagi har bir havola ishlab chiquvchining o'z saytiga olib boradi. Xavfsizlik dasturida yuklab olish manbasi dasturning o'zi qadar muhim.",
  },
  {
    icon: Lock,
    tone: "signal",
    title: "Ma'lumot sizda qoladi",
    text: "Vositalar brauzeringizda ishlaydi. Parol, hash, JWT — kiritganingiz sahifadan chiqmaydi va serverga yuborilmaydi.",
  },
  {
    icon: Target,
    tone: "cyber",
    title: "Mas'uliyatli yondashuv",
    text: "Hujum vositalari faqat o'zingizga tegishli yoki yozma ruxsat berilgan tizimlar uchun. Bu har bir sahifada aniq yozilgan.",
  },
];

const ROADMAP = [
  {
    status: "done",
    title: "Google orqali kirish va sessiya xavfsizligi",
    text: "OAuth, bearer token, sessiya cheklovlari va so'rov limitlari.",
  },
  {
    status: "done",
    title: "Avtomatik yangiliklar tasmasi",
    text: "O'nta manbadan har soatda yig'iladigan kiberxavfsizlik yangiliklari.",
  },
  {
    status: "done",
    title: "Vositalar to'plami",
    text: "Parol generatori, hash, JWT, subnet, shifrlar va boshqalar — hammasi brauzerda.",
  },
  {
    status: "done",
    title: "Admin panel — TOTP 2FA",
    text: "Bcrypt parol va RFC 6238 ikkinchi omil.",
  },
  {
    status: "progress",
    title: "CTF bosqichlari kengaytirilmoqda",
    text: "Yangi darajalar va topshiriqlar qo'shilmoqda.",
  },
  {
    status: "planned",
    title: "Foydalanuvchi profili va yutuqlar",
    text: "Bajarilgan mashqlar tarixi, ball va reyting.",
  },
  {
    status: "planned",
    title: "O'quv yo'nalishlari",
    text: "Boshlang'ichdan ilg'orgacha bosqichma-bosqich dastur.",
  },
];

const STATUS_META = {
  done: { icon: CheckCircle2, label: "Bajarildi", cls: "text-signal-400" },
  progress: { icon: Loader2, label: "Jarayonda", cls: "text-cyber-400 animate-spin-slow" },
  planned: { icon: Circle, label: "Rejada", cls: "text-white/25" },
};

/** Live platform numbers; a failed call leaves a dash rather than a wrong figure. */
function usePlatformStats() {
  const [stats, setStats] = useState({ users: null, news: null });

  useEffect(() => {
    let alive = true;

    apiFetch("/stats/users_count.php", { skipAuth: true })
      .then((r) => {
        if (alive && typeof r?.users_count === "number") {
          setStats((s) => ({ ...s, users: r.users_count }));
        }
      })
      .catch(() => {});

    apiFetch("/news/list.php?limit=1", { skipAuth: true })
      .then((r) => {
        if (alive && typeof r?.total === "number") {
          setStats((s) => ({ ...s, news: r.total }));
        }
      })
      .catch(() => {});

    return () => {
      alive = false;
    };
  }, []);

  return stats;
}

export const About = () => {
  const stats = usePlatformStats();

  const numbers = [
    {
      icon: Users,
      tone: "signal",
      value: stats.users === null ? "—" : stats.users.toLocaleString("uz-UZ"),
      label: "Ro'yxatdan o'tganlar",
    },
    {
      icon: Newspaper,
      tone: "cyber",
      value: stats.news === null ? "—" : stats.news.toLocaleString("uz-UZ"),
      label: "Yangiliklar bazasi",
    },
    { icon: Package, tone: "signal", value: APPS.length, label: "Tekshirilgan vosita" },
    { icon: Wrench, tone: "cyber", value: 10, label: "Onlayn utilita" },
  ];

  return (
    <div className="pb-24 pt-14 sm:pt-20">
      {/* ---------------- Hero ---------------- */}
      <Section width="wide">
        <Reveal>
          <Eyebrow tone="cyber">Platforma haqida</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <Display size="xl" className="mt-5">
            Kiberxavfsizlikni <Accent>amalda o'rganish.</Accent>
          </Display>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
            CyberNexus — o'zbek tilida kiberxavfsizlikni amaliy o'rganish uchun
            platforma. Maqsad oddiy: nazariyani o'qib chiqish emas, balki
            vositalarni ishlatib ko'rish, mashq qilish va sohada nima
            bo'layotganini kuzatib borish.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {numbers.map((n) => (
              <HoloCard key={n.label} glow={n.tone} className="flex items-center gap-3.5">
                <n.icon
                  className={classNames(
                    "h-5 w-5 shrink-0",
                    n.tone === "cyber" ? "text-cyber-400" : "text-signal-400",
                  )}
                />
                <div className="min-w-0">
                  <div className="font-display text-2xl font-bold tabular-nums text-white">
                    {n.value}
                  </div>
                  <div className="truncate text-[10px] font-bold uppercase tracking-[.16em] text-white/40">
                    {n.label}
                  </div>
                </div>
              </HoloCard>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ---------------- Principles ---------------- */}
      <Section width="wide" className="mt-20">
        <Reveal>
          <Eyebrow tone="signal">Tamoyillar</Eyebrow>
          <Display size="md" className="mt-4">
            Nimaga <Accent>e'tibor beramiz.</Accent>
          </Display>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <HoloCard glow={p.tone} className="h-full">
                <span
                  className={classNames(
                    "grid h-11 w-11 place-items-center rounded-xl border",
                    p.tone === "cyber"
                      ? "border-cyber-500/35 bg-cyber-500/10 text-cyber-400"
                      : "border-signal-500/35 bg-signal-500/10 text-signal-400",
                  )}
                >
                  <p.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-white">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/50">{p.text}</p>
              </HoloCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------- Roadmap ---------------- */}
      <Section width="default" className="mt-20">
        <Reveal>
          <Eyebrow tone="cyber">Roadmap</Eyebrow>
          <Display size="md" className="mt-4">
            Nima <Accent from="cyber">qilingan va nima keyin.</Accent>
          </Display>
        </Reveal>

        <div className="mt-10 space-y-3">
          {ROADMAP.map((r, i) => {
            const meta = STATUS_META[r.status];
            return (
              <Reveal key={r.title} delay={i * 60}>
                <HoloCard
                  glow={r.status === "done" ? "signal" : r.status === "progress" ? "cyber" : "none"}
                  className="flex items-start gap-4"
                >
                  <meta.icon className={classNames("mt-0.5 h-5 w-5 shrink-0", meta.cls)} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-base font-bold text-white">{r.title}</h3>
                      <span
                        className={classNames(
                          "rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider",
                          r.status === "done"
                            ? "border-signal-500/35 bg-signal-500/10 text-signal-300"
                            : r.status === "progress"
                              ? "border-cyber-500/35 bg-cyber-500/10 text-cyber-300"
                              : "border-white/12 bg-white/[.03] text-white/40",
                        )}
                      >
                        {meta.label}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/45">{r.text}</p>
                  </div>
                </HoloCard>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ---------------- Stack ---------------- */}
      <Section width="wide" className="mt-20">
        <Reveal>
          <HoloCard glow="signal">
            <div className="flex items-center gap-2.5">
              <GitBranch className="h-5 w-5 text-signal-400" />
              <h2 className="font-display text-xl font-bold text-white">
                Platforma nima ustida qurilgan
              </h2>
            </div>

            <Rule className="my-5" />

            <div className="grid gap-6 sm:grid-cols-3">
              {[
                ["Frontend", ["React 19", "Vite", "Tailwind CSS", "three.js / WebGL"]],
                ["Backend", ["PHP 7.4", "MariaDB", "Nginx", "RSS agregatori"]],
                ["Xavfsizlik", ["Google OAuth", "Bearer token", "TOTP 2FA", "Rate limiting"]],
              ].map(([group, items]) => (
                <div key={group}>
                  <div className="text-[10px] font-bold uppercase tracking-[.2em] text-cyber-400">
                    {group}
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {items.map((t) => (
                      <li key={t} className="flex gap-2 text-sm text-white/50">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-signal-400" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </HoloCard>
        </Reveal>
      </Section>

      {/* ---------------- CTA ---------------- */}
      <Section width="default" className="mt-16">
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link to="/services" className="group block">
              <HoloCard glow="signal" className="flex h-full items-center gap-3">
                <Wrench className="h-5 w-5 shrink-0 text-signal-400" />
                <div>
                  <div className="font-display text-base font-bold text-white">
                    Vositalarni sinab ko'ring
                  </div>
                  <div className="mt-0.5 text-xs text-white/40">10 ta onlayn utilita</div>
                </div>
                <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-white/25 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal-400" />
              </HoloCard>
            </Link>

            <Link to="/contact" className="group block">
              <HoloCard glow="cyber" className="flex h-full items-center gap-3">
                <ShieldCheck className="h-5 w-5 shrink-0 text-cyber-400" />
                <div>
                  <div className="font-display text-base font-bold text-white">
                    Taklif yoki hisobot
                  </div>
                  <div className="mt-0.5 text-xs text-white/40">To'g'ridan-to'g'ri yozing</div>
                </div>
                <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-white/25 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyber-400" />
              </HoloCard>
            </Link>
          </div>
        </Reveal>
      </Section>
    </div>
  );
};

export default About;
