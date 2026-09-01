// src/Pages/News/news.jsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import {
  Search,
  ExternalLink,
  RefreshCw,
  AlertTriangle,
  Rss,
  Globe,
  Newspaper,
  X,
} from "lucide-react";

import { fetchNews, timeAgo, formatDate } from "../../api/news";
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

const PAGE_SIZE = 18;

const LANGS = [
  { key: "all", label: "Barchasi" },
  { key: "en", label: "English" },
  { key: "uz", label: "O'zbekcha" },
];

/** Deterministic accent per source, so a source always looks the same. */
const SOURCE_TONE = {
  thehackernews: "signal",
  bleepingcomputer: "cyber",
  darkreading: "plasma",
  krebs: "signal",
  schneier: "cyber",
  securelist: "signal",
  unit42: "cyber",
  hibp: "plasma",
  netsec: "cyber",
  kunuz: "signal",
  gazetauz: "cyber",
};

/**
 * Feed images are third-party URLs. They are rendered with no referrer, and a
 * failure falls back to the generated cover rather than a broken-image icon.
 */
function ArticleImage({ src, tone, sourceName }) {
  const [failed, setFailed] = useState(false);

  // Dark Reading, HIBP, BleepingComputer and Schneier ship no images in their
  // RSS at all — about half the feed. Rather than half the grid being an empty
  // placeholder, those cards get a typographic cover in the source's own
  // accent, which reads as a designed choice instead of a missing asset.
  if (!src || failed) {
    const wash =
      tone === "plasma"
        ? "rgba(255,45,149,.20)"
        : tone === "cyber"
          ? "rgba(0,229,255,.18)"
          : "rgba(0,255,157,.18)";

    return (
      <div
        className="relative h-full w-full overflow-hidden"
        style={{
          background: `radial-gradient(ellipse 80% 90% at 25% 15%, ${wash}, transparent 62%), #070d1a`,
        }}
      >
        <div
          className="absolute inset-0 opacity-[.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
        <div className="absolute inset-0 flex items-end p-4">
          <span
            className={classNames(
              "font-display text-2xl font-bold leading-none tracking-tight",
              tone === "plasma"
                ? "text-plasma/35"
                : tone === "cyber"
                  ? "text-cyber-400/35"
                  : "text-signal-400/35",
            )}
          >
            {sourceName}
          </span>
        </div>
        <Newspaper className="absolute right-4 top-4 h-5 w-5 text-white/10" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition-transform duration-700 ease-spring group-hover:scale-105"
    />
  );
}

function ArticleCard({ item }) {
  const tone = SOURCE_TONE[item.source_key] || "signal";

  return (
    <a
      href={item.url}
      target="_blank"
      // noopener/noreferrer: these are third-party links and must not be able
      // to reach back into this window.
      rel="noopener noreferrer"
      className="group block h-full focus:outline-none"
    >
      <HoloCard glow={tone} padded={false} className="flex h-full flex-col overflow-hidden">
        <div className="relative h-40 shrink-0 overflow-hidden">
          <ArticleImage src={item.image_url} tone={tone} sourceName={item.source_name} />
          <div className="absolute inset-0 bg-gradient-to-t from-void-900 via-void-900/45 to-transparent" />

          <div className="absolute left-3 top-3">
            <Chip tone={tone}>{item.source_name}</Chip>
          </div>
          {item.lang === "uz" ? (
            <div className="absolute right-3 top-3">
              <span className="rounded-full border border-white/15 bg-black/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/70 backdrop-blur">
                UZ
              </span>
            </div>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-base font-bold leading-snug text-white transition-colors group-hover:text-signal-200">
            {item.title}
          </h3>

          {item.summary ? (
            <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-white/45">
              {item.summary}
            </p>
          ) : null}

          <div className="mt-auto flex items-center justify-between gap-2 pt-4">
            <time
              dateTime={new Date(item.published_at * 1000).toISOString()}
              title={formatDate(item.published_at)}
              className="text-[11px] font-bold uppercase tracking-[.14em] text-white/35"
            >
              {timeAgo(item.published_at)}
            </time>
            <ExternalLink className="h-3.5 w-3.5 text-white/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal-400" />
          </div>
        </div>
      </HoloCard>
    </a>
  );
}

function SkeletonCard() {
  return (
    <div className="h-full overflow-hidden rounded-2xl border border-white/8 bg-white/[.02]">
      <div className="h-40 animate-pulse bg-white/[.04]" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-4/5 animate-pulse rounded bg-white/[.06]" />
        <div className="h-3 w-full animate-pulse rounded bg-white/[.04]" />
        <div className="h-3 w-3/5 animate-pulse rounded bg-white/[.04]" />
      </div>
    </div>
  );
}

export const News = () => {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ total: 0, pages: 1, updated_at: 0 });
  const [categories, setCategories] = useState([]);

  const [category, setCategory] = useState("all");
  const [lang, setLang] = useState("all");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const abortRef = useRef(null);

  // Typing should not fire a request per keystroke.
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query), 350);
    return () => clearTimeout(id);
  }, [query]);

  // Any filter change restarts paging from the top.
  useEffect(() => {
    setPage(1);
  }, [category, lang, debouncedQuery]);

  const load = useCallback(
    async (targetPage, append) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      append ? setLoadingMore(true) : setLoading(true);
      setError("");

      try {
        const res = await fetchNews({
          page: targetPage,
          limit: PAGE_SIZE,
          category,
          lang,
          q: debouncedQuery,
          signal: controller.signal,
        });

        setItems((prev) => (append ? [...prev, ...(res.items || [])] : res.items || []));
        setMeta({
          total: res.total || 0,
          pages: res.pages || 1,
          updated_at: res.updated_at || 0,
        });
        if (res.categories?.length) setCategories(res.categories);
      } catch (e) {
        if (e.name !== "AbortError") {
          setError(e.message || "Yangiliklarni yuklab bo'lmadi.");
          if (!append) setItems([]);
        }
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [category, lang, debouncedQuery],
  );

  useEffect(() => {
    load(page, page > 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, category, lang, debouncedQuery]);

  const hasMore = page < meta.pages;
  const totalAll = useMemo(
    () => categories.reduce((n, c) => n + (c.count || 0), 0),
    [categories],
  );

  return (
    <div className="pb-24 pt-14 sm:pt-20">
      {/* ---------------- Hero ---------------- */}
      <Section width="wide">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <Eyebrow tone="cyber">Live feed · 10 ta manba</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <Display size="lg" className="mt-5">
                Kiberxavfsizlik <Accent>yangiliklari.</Accent>
              </Display>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/55">
                The Hacker News, BleepingComputer, Krebs, Dark Reading, Unit 42,
                Securelist va boshqalardan — Kun.uz hamda Gazeta.uz ning
                texnologiya yangiliklari bilan birga. Har soatda avtomatik
                yangilanadi.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <HoloCard glow="signal" className="min-w-[230px]">
              <div className="flex items-center gap-2 text-signal-400">
                <Rss className="h-4 w-4" />
                <span className="text-[11px] font-bold uppercase tracking-[.2em]">
                  Jamlanma
                </span>
              </div>
              <div className="mt-3 font-display text-3xl font-bold tabular-nums text-white">
                {totalAll || meta.total}
              </div>
              {meta.updated_at ? (
                <div className="mt-1 flex items-center gap-1.5 text-[11px] text-white/40">
                  <RefreshCw className="h-3 w-3" />
                  {timeAgo(meta.updated_at)} yangilandi
                </div>
              ) : null}
            </HoloCard>
          </Reveal>
        </div>
      </Section>

      {/* ---------------- Controls ---------------- */}
      <Section width="wide" className="mt-10">
        <div className="sticky top-16 z-30 rounded-2xl border border-white/10 bg-void-900/85 p-3 shadow-panel backdrop-blur-xl">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            {/* Search */}
            <div className="relative lg:w-72 lg:shrink-0">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Sarlavha bo'yicha qidirish..."
                aria-label="Yangiliklarni qidirish"
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

            {/* Category chips */}
            <div className="flex flex-1 gap-2 overflow-x-auto no-scrollbar">
              <FilterChip
                active={category === "all"}
                onClick={() => setCategory("all")}
                label="Hammasi"
                count={totalAll}
              />
              {categories.map((c) => (
                <FilterChip
                  key={c.key}
                  active={category === c.key}
                  onClick={() => setCategory(c.key)}
                  label={c.label}
                  count={c.count}
                />
              ))}
            </div>

            {/* Language */}
            <div className="flex shrink-0 gap-1 rounded-xl border border-white/10 bg-black/30 p-1">
              {LANGS.map((l) => (
                <button
                  key={l.key}
                  type="button"
                  onClick={() => setLang(l.key)}
                  className={classNames(
                    "rounded-lg px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.12em] transition-colors",
                    lang === l.key
                      ? "bg-signal-500/15 text-signal-300"
                      : "text-white/40 hover:text-white/75",
                  )}
                >
                  {l.key === "all" ? <Globe className="h-3.5 w-3.5" /> : l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------- Results ---------------- */}
      <Section width="wide" className="mt-8">
        {error ? (
          <div className="flex items-start gap-3 rounded-2xl border border-plasma/40 bg-plasma/10 p-5">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-plasma" />
            <div>
              <div className="text-xs font-bold uppercase tracking-[.18em] text-plasma">
                Xatolik
              </div>
              <p className="mt-1 text-sm text-white/65">{error}</p>
              <NeonButton
                variant="ghost"
                size="sm"
                className="mt-4"
                onClick={() => load(1, false)}
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Qayta urinish
              </NeonButton>
            </div>
          </div>
        ) : null}

        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : items.length === 0 && !error ? (
          <div className="rounded-2xl border border-white/10 bg-white/[.02] py-20 text-center">
            <Newspaper className="mx-auto h-10 w-10 text-white/15" />
            <div className="mt-4 font-display text-lg font-bold text-white/70">
              Hech narsa topilmadi
            </div>
            <p className="mx-auto mt-2 max-w-sm text-sm text-white/40">
              Filtrlarni o'zgartirib ko'ring yoki qidiruvni tozalang.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, i) => (
                <Reveal key={item.id} delay={Math.min(i, 8) * 45}>
                  <ArticleCard item={item} />
                </Reveal>
              ))}
            </div>

            {hasMore ? (
              <div className="mt-10 flex justify-center">
                <NeonButton
                  variant="ghost"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={loadingMore}
                >
                  {loadingMore ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Yuklanmoqda
                    </>
                  ) : (
                    <>Yana yuklash ({meta.total - items.length})</>
                  )}
                </NeonButton>
              </div>
            ) : null}
          </>
        )}
      </Section>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

function FilterChip({ active, onClick, label, count }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={classNames(
        "flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold tracking-wide transition-all duration-300",
        active
          ? "border-signal-400/60 bg-signal-500/12 text-signal-200 shadow-glow-sm"
          : "border-white/10 bg-white/[.02] text-white/45 hover:border-white/25 hover:text-white/80",
      )}
    >
      {label}
      {typeof count === "number" ? (
        <span
          className={classNames(
            "rounded-full px-1.5 py-0.5 text-[10px] tabular-nums",
            active ? "bg-signal-500/20 text-signal-200" : "bg-white/[.06] text-white/40",
          )}
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}

export default News;
