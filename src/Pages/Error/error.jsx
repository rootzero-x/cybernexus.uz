// src/Pages/Error/error.jsx
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Home, ArrowLeft, Compass, Wrench, Flag, Newspaper } from "lucide-react";

import { HoloCard, Eyebrow, Display, Accent, NeonButton, Section, Reveal } from "../../design";

const SUGGESTIONS = [
  { to: "/", label: "Bosh sahifa", icon: Home },
  { to: "/services", label: "Services", icon: Wrench },
  { to: "/ctf-challenge", label: "CTF Challenge", icon: Flag },
  { to: "/news", label: "News", icon: Newspaper },
];

export const Error = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    // Only step back when there is somewhere in this app to step back to;
    // otherwise a direct hit on a bad URL would bounce the user off the site.
    if (window.history.length > 1) navigate(-1);
    else navigate("/", { replace: true });
  };

  return (
    <div className="flex min-h-[86vh] items-center pb-20 pt-14 sm:pt-20">
      <Section width="default">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_.9fr]">
          <div>
            <Reveal>
              <Eyebrow tone="cyber">Error · Route not found</Eyebrow>
            </Reveal>

            <Reveal delay={80}>
              <Display size="xl" className="mt-5">
                Bu manzil <Accent>mavjud emas.</Accent>
              </Display>
            </Reveal>

            <Reveal delay={150}>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-white/55">
                So'ralgan sahifa topilmadi. Havola eskirgan bo'lishi yoki
                manzilda xatolik bo'lishi mumkin.
              </p>
            </Reveal>

            {location.pathname ? (
              <Reveal delay={190}>
                <div className="mt-5 inline-flex max-w-full items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 font-mono text-xs">
                  <span className="shrink-0 text-plasma">404</span>
                  <span className="truncate text-white/45">{location.pathname}</span>
                </div>
              </Reveal>
            ) : null}

            <Reveal delay={240}>
              <div className="mt-9 flex flex-wrap gap-3">
                <NeonButton as={Link} to="/">
                  <Home className="h-4 w-4" />
                  Bosh sahifa
                </NeonButton>
                <NeonButton variant="ghost" onClick={goBack}>
                  <ArrowLeft className="h-4 w-4" />
                  Orqaga
                </NeonButton>
              </div>
            </Reveal>
          </div>

          <Reveal delay={220} y={26}>
            <HoloCard glow="cyber">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-cyber-500/35 bg-cyber-500/10">
                  <Compass className="h-4.5 w-4.5 text-cyber-400" />
                </span>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[.22em] text-white/40">
                    Balki shulardan biri
                  </div>
                  <div className="font-display text-lg font-bold text-white">
                    Mashhur bo'limlar
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-2">
                {SUGGESTIONS.map((s) => (
                  <Link
                    key={s.to}
                    to={s.to}
                    className="group flex items-center gap-3 rounded-xl border border-white/8 bg-black/25 px-4 py-3 transition-all duration-300 hover:border-signal-400/40 hover:bg-signal-500/5"
                  >
                    <s.icon className="h-4 w-4 text-white/35 transition-colors group-hover:text-signal-400" />
                    <span className="text-sm text-white/60 transition-colors group-hover:text-white">
                      {s.label}
                    </span>
                    <span className="ml-auto text-white/20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-signal-400">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </HoloCard>
          </Reveal>
        </div>
      </Section>
    </div>
  );
};

export default Error;
