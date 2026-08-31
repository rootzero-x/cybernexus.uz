// src/Pages/Welcome/welcome.jsx
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import {
  Sparkles,
  Newspaper,
  Info,
  Mail,
  LifeBuoy,
  Wrench,
  Flag,
  Award,
  Briefcase,
  ArrowUpRight,
  Users,
  Activity,
  ShieldCheck,
} from "lucide-react";

import { AuthContext } from "../../context/AuthContext";
import { apiFetch } from "../../api/client";
import {
  HoloCard,
  Eyebrow,
  Display,
  Accent,
  Chip,
  Section,
  Reveal,
} from "../../design";

/**
 * Modules are listed in a fixed, meaningful order.
 *
 * The previous version reshuffled these on every mount, so the same tile
 * landed somewhere different each visit and no one could ever learn where
 * anything was. Featured entries lead; the rest follow in a stable order.
 */
const MODULES = [
  {
    title: "Premium App",
    blurb: "Kengaytirilgan imkoniyatlar va yopiq modullar.",
    href: "/premium-app",
    image: "/premium-app.avif",
    icon: Sparkles,
    tone: "signal",
    featured: true,
  },
  {
    title: "CTF Challenge",
    blurb: "Capture The Flag topshiriqlari — amaliy kiber mashqlar.",
    href: "/ctf-challenge",
    image: "/ctf-challenge.jpg",
    icon: Flag,
    tone: "plasma",
    featured: true,
  },
  {
    title: "Services",
    blurb: "Hash, Base64, UUID, QR — tezkor xavfsizlik vositalari.",
    href: "/services",
    image: "/services.jpg",
    icon: Wrench,
    tone: "cyber",
  },
  {
    title: "Portfolio",
    blurb: "Loyihalar va bajarilgan ishlar to'plami.",
    href: "/portfolio",
    image: "/about.jpg",
    icon: Briefcase,
    tone: "signal",
  },
  {
    title: "News",
    blurb: "Kiberxavfsizlik sohasidagi so'nggi yangiliklar.",
    href: "/news",
    image: "/news.webp",
    icon: Newspaper,
    tone: "cyber",
  },
  {
    title: "Certificate",
    blurb: "CyberNexus sertifikatini yarating va yuklab oling.",
    href: "/cybernexus-certificate",
    image: "/welcome.jpg",
    icon: Award,
    tone: "signal",
  },
  {
    title: "About",
    blurb: "Platforma, jamoa va maqsadlar haqida.",
    href: "/about",
    image: "/about.jpg",
    icon: Info,
    tone: "cyber",
  },
  {
    title: "Contact",
    blurb: "Savol yoki taklif bo'lsa — bog'laning.",
    href: "/contact",
    image: "/contact.jpg",
    icon: Mail,
    tone: "signal",
  },
  {
    title: "Help",
    blurb: "Ko'p so'raladigan savollar va qo'llanma.",
    href: "/help",
    image: "/help.jpeg",
    icon: LifeBuoy,
    tone: "cyber",
  },
];

const FALLBACK_IMAGE =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">
       <rect width="600" height="400" fill="#060b18"/>
       <g fill="none" stroke="#00ff9d" stroke-opacity=".18">
         ${Array.from({ length: 13 }, (_, i) => `<line x1="${i * 48}" y1="0" x2="${i * 48}" y2="400"/>`).join("")}
         ${Array.from({ length: 9 }, (_, i) => `<line x1="0" y1="${i * 48}" x2="600" y2="${i * 48}"/>`).join("")}
       </g>
     </svg>`,
  );

function ModuleImage({ src, alt, className }) {
  const [failed, setFailed] = useState(false);
  return (
    <img
      src={failed ? FALLBACK_IMAGE : src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

/** Live platform stats, degrading quietly when the endpoint is unreachable. */
function useUserCount() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    let alive = true;
    apiFetch("/stats/users_count.php", { skipAuth: true })
      .then((res) => {
        if (alive && typeof res?.users_count === "number") setCount(res.users_count);
      })
      .catch(() => {
        /* a missing stat is not worth an error state on the landing page */
      });
    return () => {
      alive = false;
    };
  }, []);

  return count;
}

function ModuleCard({ module, large = false }) {
  const Icon = module.icon;

  return (
    <Link to={module.href} className="group block h-full focus:outline-none">
      <HoloCard
        glow={module.tone}
        padded={false}
        className={classNames(
          "h-full overflow-hidden",
          "group-focus-visible:ring-2 group-focus-visible:ring-signal-400/70",
        )}
      >
        <div className={classNames("relative overflow-hidden", large ? "h-56 sm:h-72" : "h-40")}>
          <ModuleImage
            src={module.image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-700 ease-spring group-hover:scale-105"
          />
          {/* Gradient keeps the title legible over any photo. */}
          <div className="absolute inset-0 bg-gradient-to-t from-void-900 via-void-900/55 to-transparent" />

          <div className="absolute left-4 top-4">
            <span
              className={classNames(
                "grid h-9 w-9 place-items-center rounded-xl border backdrop-blur-md",
                module.tone === "signal" && "border-signal-500/40 bg-signal-500/15 text-signal-300",
                module.tone === "cyber" && "border-cyber-500/40 bg-cyber-500/15 text-cyber-300",
                module.tone === "plasma" && "border-plasma/40 bg-plasma/15 text-plasma",
              )}
            >
              <Icon className="h-4 w-4" />
            </span>
          </div>

          {module.featured ? (
            <div className="absolute right-4 top-4">
              <Chip tone={module.tone}>Featured</Chip>
            </div>
          ) : null}
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <h3
              className={classNames(
                "font-display font-bold text-white",
                large ? "text-xl sm:text-2xl" : "text-base",
              )}
            >
              {module.title}
            </h3>
            <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal-400" />
          </div>
          <p
            className={classNames(
              "mt-2 leading-relaxed text-white/45",
              large ? "text-sm sm:text-base" : "text-xs",
            )}
          >
            {module.blurb}
          </p>
        </div>
      </HoloCard>
    </Link>
  );
}

export const Welcome = () => {
  const { user } = useContext(AuthContext);
  const userCount = useUserCount();

  const firstName = useMemo(() => {
    const name = (user?.full_name || "").trim();
    return name ? name.split(" ")[0] : null;
  }, [user]);

  const [featured, rest] = useMemo(
    () => [MODULES.filter((m) => m.featured), MODULES.filter((m) => !m.featured)],
    [],
  );

  return (
    <div className="pb-24 pt-14 sm:pt-20">
      {/* ---------------- Hero ---------------- */}
      <Section width="wide">
        <Reveal>
          <Eyebrow tone="cyber">CyberNexus Platform</Eyebrow>
        </Reveal>

        <Reveal delay={90}>
          <Display size="xl" className="mt-5">
            {firstName ? (
              <>
                Xush kelibsiz, <Accent>{firstName}</Accent>.
              </>
            ) : (
              <>
                Kiber xavfsizlikka <Accent>birinchi qadam.</Accent>
              </>
            )}
          </Display>
        </Reveal>

        <Reveal delay={170}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
            Amaliy mashqlar, tahlil vositalari va jamoa bilimlari — bitta
            platformada. Quyidagi modullardan birini tanlang.
          </p>
        </Reveal>

        {/* Stat strip */}
        <Reveal delay={250}>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <HoloCard glow="signal" className="flex items-center gap-4">
              <Users className="h-5 w-5 shrink-0 text-signal-400" />
              <div>
                <div className="font-display text-2xl font-bold tabular-nums text-white">
                  {userCount === null ? "—" : userCount.toLocaleString("en-US")}
                </div>
                <div className="text-[11px] font-bold uppercase tracking-[.18em] text-white/40">
                  Ro'yxatdan o'tganlar
                </div>
              </div>
            </HoloCard>

            <HoloCard glow="cyber" className="flex items-center gap-4">
              <Activity className="h-5 w-5 shrink-0 text-cyber-400" />
              <div>
                <div className="font-display text-2xl font-bold text-white">
                  {MODULES.length}
                </div>
                <div className="text-[11px] font-bold uppercase tracking-[.18em] text-white/40">
                  Faol modul
                </div>
              </div>
            </HoloCard>

            <HoloCard glow="signal" className="flex items-center gap-4">
              <ShieldCheck className="h-5 w-5 shrink-0 text-signal-400" />
              <div>
                <div className="font-display text-2xl font-bold text-white">
                  {user?.role === "admin" ? "Admin" : "Secure"}
                </div>
                <div className="text-[11px] font-bold uppercase tracking-[.18em] text-white/40">
                  Session holati
                </div>
              </div>
            </HoloCard>
          </div>
        </Reveal>
      </Section>

      {/* ---------------- Featured ---------------- */}
      <Section width="wide" className="mt-16 sm:mt-20">
        <Reveal>
          <Eyebrow tone="signal">Boshlang</Eyebrow>
        </Reveal>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {featured.map((m, i) => (
            <Reveal key={m.href} delay={i * 110}>
              <ModuleCard module={m} large />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------- All modules ---------------- */}
      <Section width="wide" className="mt-16 sm:mt-20">
        <Reveal>
          <Eyebrow tone="muted">Barcha modullar</Eyebrow>
        </Reveal>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((m, i) => (
            <Reveal key={m.href} delay={i * 70}>
              <ModuleCard module={m} />
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Welcome;
