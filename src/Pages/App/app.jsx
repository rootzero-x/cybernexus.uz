// src/Pages/App/app.jsx
import React, { useMemo, useState } from "react";
import classNames from "classnames";
import {
  Search,
  ExternalLink,
  Star,
  ShieldCheck,
  Package,
  Info,
  X,
  Filter,
} from "lucide-react";

import { APPS, CATEGORIES, CATEGORY_TONE } from "./appsData";
import {
  HoloCard,
  Eyebrow,
  Display,
  Accent,
  Chip,
  Section,
  Reveal,
  NeonButton,
} from "../../design";

const FAV_KEY = "cn_app_favourites";

function loadFavourites() {
  try {
    const raw = window.localStorage.getItem(FAV_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveFavourites(list) {
  try {
    window.localStorage.setItem(FAV_KEY, JSON.stringify(list));
  } catch {
    /* private mode — favourites just do not persist */
  }
}

/** Monogram cover. Logos are not hotlinked: vendor URLs rot and the licensing
 *  on third-party marks is not ours to assume. */
function AppMark({ name, tone, large = false }) {
  const initials = name
    .replace(/[^\p{L}\p{N} ]/gu, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  const wash =
    tone === "plasma"
      ? "rgba(255,45,149,.20)"
      : tone === "cyber"
        ? "rgba(0,229,255,.18)"
        : "rgba(0,255,157,.18)";

  return (
    <span
      className={classNames(
        "relative grid shrink-0 place-items-center overflow-hidden rounded-xl border",
        large ? "h-14 w-14" : "h-11 w-11",
        tone === "plasma"
          ? "border-plasma/30"
          : tone === "cyber"
            ? "border-cyber-500/30"
            : "border-signal-500/30",
      )}
      style={{ background: `radial-gradient(circle at 30% 25%, ${wash}, transparent 70%), #08111f` }}
    >
      <span
        className={classNames(
          "font-display font-bold tracking-tight",
          large ? "text-lg" : "text-sm",
          tone === "plasma"
            ? "text-plasma"
            : tone === "cyber"
              ? "text-cyber-300"
              : "text-signal-300",
        )}
      >
        {initials}
      </span>
    </span>
  );
}

function AppCard({ app, isFav, onToggleFav, onOpen }) {
  const tone = CATEGORY_TONE[app.category] || "signal";

  return (
    <HoloCard glow={tone} className="flex h-full flex-col">
      <div className="flex items-start gap-3">
        <AppMark name={app.name} tone={tone} />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-base font-bold leading-tight text-white">
              {app.name}
            </h3>

            <button
              type="button"
              onClick={() => onToggleFav(app.name)}
              aria-pressed={isFav}
              aria-label={
                isFav ? `${app.name} — sevimlilardan olib tashlash` : `${app.name} — sevimlilarga qo'shish`
              }
              className={classNames(
                "shrink-0 rounded-lg border p-1.5 transition-all duration-300",
                isFav
                  ? "border-signal-400/50 bg-signal-500/12 text-signal-300"
                  : "border-white/10 text-white/25 hover:border-white/30 hover:text-white/60",
              )}
            >
              <Star className={classNames("h-3.5 w-3.5", isFav && "fill-current")} />
            </button>
          </div>

          <div className="mt-1 text-[11px] font-bold uppercase tracking-[.14em] text-white/35">
            {app.kind}
          </div>
        </div>
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-white/50">{app.description}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <Chip tone={app.license === "Ochiq kod" ? "signal" : "muted"}>{app.license}</Chip>
        <Chip tone="muted">{app.pricing}</Chip>
      </div>

      <div className="mt-5 flex items-center gap-2 border-t border-white/8 pt-4">
        <NeonButton
          as="a"
          href={app.link}
          target="_blank"
          rel="noopener noreferrer"
          variant="ghost"
          size="sm"
          className="flex-1"
        >
          Yuklab olish
          <ExternalLink className="h-3.5 w-3.5" />
        </NeonButton>

        <button
          type="button"
          onClick={() => onOpen(app)}
          aria-label={`${app.name} haqida batafsil`}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 text-white/40 transition-colors hover:border-white/30 hover:text-white"
        >
          <Info className="h-4 w-4" />
        </button>
      </div>
    </HoloCard>
  );
}

function DetailModal({ app, onClose }) {
  if (!app) return null;
  const tone = CATEGORY_TONE[app.category] || "signal";
  const categoryLabel =
    CATEGORIES.find((c) => c.key === app.category)?.label || app.category;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={app.name}
    >
      <div className="absolute inset-0 bg-void-950/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg">
        <HoloCard glow={tone} interactive={false}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <AppMark name={app.name} tone={tone} large />
              <div>
                <Eyebrow tone={tone === "plasma" ? "signal" : tone}>{categoryLabel}</Eyebrow>
                <h2 className="mt-1.5 font-display text-2xl font-bold text-white">{app.name}</h2>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Yopish"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 text-white/50 hover:border-white/30 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-white/60">{app.description}</p>

          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            <Detail label="Ishlab chiquvchi" value={app.vendor} />
            <Detail label="Litsenziya" value={app.license} />
            <Detail label="Narx" value={app.pricing} />
            <Detail label="Tekshirilgan" value={app.verified} />
          </dl>

          <div className="mt-5">
            <div className="text-[11px] font-bold uppercase tracking-[.18em] text-white/35">
              Platformalar
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {app.platforms.map((p) => (
                <Chip key={p} tone="muted">
                  {p}
                </Chip>
              ))}
            </div>
          </div>

          <NeonButton
            as="a"
            href={app.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 w-full"
          >
            Rasmiy saytga o'tish
            <ExternalLink className="h-4 w-4" />
          </NeonButton>

          <p className="mt-3 text-center text-[11px] leading-relaxed text-white/30">
            Havola ishlab chiquvchining o'z saytiga olib boradi — oynadan yoki
            yig'uvchi saytlardan yuklab olmang.
          </p>
        </HoloCard>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="rounded-xl border border-white/8 bg-black/25 p-3">
      <dt className="text-[10px] font-bold uppercase tracking-[.18em] text-white/35">{label}</dt>
      <dd className="mt-1 text-sm text-white/70">{value}</dd>
    </div>
  );
}

export const App = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [favOnly, setFavOnly] = useState(false);
  const [favourites, setFavourites] = useState(loadFavourites);
  const [detail, setDetail] = useState(null);

  const toggleFav = (name) => {
    setFavourites((prev) => {
      const next = prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name];
      saveFavourites(next);
      return next;
    });
  };

  const counts = useMemo(() => {
    const map = { all: APPS.length };
    for (const app of APPS) map[app.category] = (map[app.category] || 0) + 1;
    return map;
  }, []);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return APPS.filter((app) => {
      if (category !== "all" && app.category !== category) return false;
      if (favOnly && !favourites.includes(app.name)) return false;
      if (!needle) return true;

      return (
        app.name.toLowerCase().includes(needle) ||
        app.kind.toLowerCase().includes(needle) ||
        app.vendor.toLowerCase().includes(needle) ||
        app.description.toLowerCase().includes(needle)
      );
    });
  }, [query, category, favOnly, favourites]);

  const featured = useMemo(() => APPS.filter((a) => a.featured), []);
  const openSourceCount = useMemo(
    () => APPS.filter((a) => a.license.startsWith("Ochiq")).length,
    [],
  );

  return (
    <div className="pb-24 pt-14 sm:pt-20">
      {/* ---------------- Hero ---------------- */}
      <Section width="wide">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Reveal>
              <Eyebrow tone="cyber">Premium katalog · {APPS.length} ta vosita</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <Display size="lg" className="mt-5">
                Tekshirilgan <Accent>xavfsizlik vositalari.</Accent>
              </Display>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/55">
                Har bir havola ishlab chiquvchining o'z saytiga olib boradi —
                oyna yoki yig'uvchi saytlarga emas. Xavfsizlik dasturida yuklab
                olish manbasi dasturning o'zi qadar muhim.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="flex gap-3">
              <HoloCard glow="signal" className="min-w-[130px]">
                <Package className="h-4 w-4 text-signal-400" />
                <div className="mt-2 font-display text-2xl font-bold text-white">
                  {APPS.length}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[.16em] text-white/40">
                  Vosita
                </div>
              </HoloCard>
              <HoloCard glow="cyber" className="min-w-[130px]">
                <ShieldCheck className="h-4 w-4 text-cyber-400" />
                <div className="mt-2 font-display text-2xl font-bold text-white">
                  {openSourceCount}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[.16em] text-white/40">
                  Ochiq kod
                </div>
              </HoloCard>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------------- Featured ---------------- */}
      {category === "all" && !query && !favOnly ? (
        <Section width="wide" className="mt-14">
          <Reveal>
            <Eyebrow tone="signal">Tavsiya etamiz</Eyebrow>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.slice(0, 8).map((app, i) => {
              const tone = CATEGORY_TONE[app.category] || "signal";
              return (
                <Reveal key={app.name} delay={i * 60}>
                  <a
                    href={app.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block h-full"
                  >
                    <HoloCard glow={tone} className="flex h-full items-center gap-3">
                      <AppMark name={app.name} tone={tone} />
                      <div className="min-w-0">
                        <div className="truncate font-display text-sm font-bold text-white">
                          {app.name}
                        </div>
                        <div className="truncate text-[11px] text-white/40">{app.kind}</div>
                      </div>
                      <ExternalLink className="ml-auto h-3.5 w-3.5 shrink-0 text-white/20 transition-colors group-hover:text-signal-400" />
                    </HoloCard>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </Section>
      ) : null}

      {/* ---------------- Controls ---------------- */}
      <Section width="wide" className="mt-14">
        <div className="sticky top-16 z-30 rounded-2xl border border-white/10 bg-void-900/85 p-3 shadow-panel backdrop-blur-xl">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative lg:w-72 lg:shrink-0">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Nom yoki vazifa bo'yicha..."
                aria-label="Vositalarni qidirish"
                className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 pl-10 pr-9 text-sm text-white placeholder:text-white/25 outline-none transition-all focus:border-signal-400/60 focus:bg-signal-500/5"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Qidiruvni tozalash"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-white/30 hover:text-white/70"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              ) : null}
            </div>

            <div className="flex flex-1 gap-2 overflow-x-auto no-scrollbar">
              {CATEGORIES.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setCategory(c.key)}
                  aria-pressed={category === c.key}
                  className={classNames(
                    "flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold tracking-wide transition-all duration-300",
                    category === c.key
                      ? "border-signal-400/60 bg-signal-500/12 text-signal-200 shadow-glow-sm"
                      : "border-white/10 bg-white/[.02] text-white/45 hover:border-white/25 hover:text-white/80",
                  )}
                >
                  {c.label}
                  <span
                    className={classNames(
                      "rounded-full px-1.5 py-0.5 text-[10px] tabular-nums",
                      category === c.key
                        ? "bg-signal-500/20 text-signal-200"
                        : "bg-white/[.06] text-white/40",
                    )}
                  >
                    {counts[c.key] || 0}
                  </span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setFavOnly((v) => !v)}
              aria-pressed={favOnly}
              className={classNames(
                "flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-bold uppercase tracking-[.12em] transition-all",
                favOnly
                  ? "border-signal-400/60 bg-signal-500/12 text-signal-200"
                  : "border-white/10 text-white/40 hover:border-white/25 hover:text-white/75",
              )}
            >
              <Star className={classNames("h-3.5 w-3.5", favOnly && "fill-current")} />
              {favourites.length || ""}
            </button>
          </div>
        </div>
      </Section>

      {/* ---------------- Grid ---------------- */}
      <Section width="wide" className="mt-8">
        {visible.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[.02] py-20 text-center">
            <Filter className="mx-auto h-10 w-10 text-white/15" />
            <div className="mt-4 font-display text-lg font-bold text-white/70">
              Hech narsa topilmadi
            </div>
            <p className="mx-auto mt-2 max-w-sm text-sm text-white/40">
              {favOnly
                ? "Sevimlilar ro'yxati bo'sh — kartadagi yulduzchani bosing."
                : "Qidiruv yoki filtrni o'zgartirib ko'ring."}
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((app, i) => (
              <Reveal key={app.name} delay={Math.min(i, 9) * 45}>
                <AppCard
                  app={app}
                  isFav={favourites.includes(app.name)}
                  onToggleFav={toggleFav}
                  onOpen={setDetail}
                />
              </Reveal>
            ))}
          </div>
        )}
      </Section>

      {detail ? <DetailModal app={detail} onClose={() => setDetail(null)} /> : null}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default App;
