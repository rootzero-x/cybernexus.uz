// src/Pages/Help/help.jsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import {
  Search,
  ChevronDown,
  LifeBuoy,
  X,
  ArrowUpRight,
  MessageCircleQuestion,
} from "lucide-react";

import { FAQ, TOPICS, QUICK_LINKS } from "./helpData";
import {
  HoloCard,
  Eyebrow,
  Display,
  Accent,
  Section,
  Reveal,
  NeonButton,
} from "../../design";

/** Wraps every occurrence of `needle` in a <mark>, case-insensitively. */
function highlight(text, needle) {
  if (!needle.trim()) return text;

  // Escape the query: a user typing "(" must not become a broken regex.
  const escaped = needle.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));

  return parts.map((part, i) =>
    part.toLowerCase() === needle.trim().toLowerCase() ? (
      <mark key={i} className="rounded bg-signal-500/25 px-0.5 text-signal-200">
        {part}
      </mark>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  );
}

function FaqItem({ item, query, open, onToggle }) {
  return (
    <HoloCard glow="signal" padded={false} interactive={false} className="overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-4 p-5 text-left transition-colors hover:bg-white/[.02]"
      >
        <span className="font-display text-base font-bold leading-snug text-white">
          {highlight(item.q, query)}
        </span>
        <ChevronDown
          className={classNames(
            "mt-0.5 h-4 w-4 shrink-0 text-white/30 transition-transform duration-300",
            open && "rotate-180 text-signal-400",
          )}
        />
      </button>

      {/* Grid-rows trick: animates height without measuring the content. */}
      <div
        className={classNames(
          "grid transition-all duration-300 ease-spring",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <p className="border-t border-white/8 px-5 py-4 text-sm leading-relaxed text-white/55">
            {highlight(item.a, query)}
          </p>
        </div>
      </div>
    </HoloCard>
  );
}

export const Help = () => {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("all");
  const [openIndex, setOpenIndex] = useState(null);

  const counts = useMemo(() => {
    const map = { all: FAQ.length };
    for (const f of FAQ) map[f.topic] = (map[f.topic] || 0) + 1;
    return map;
  }, []);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return FAQ.filter((f) => {
      if (topic !== "all" && f.topic !== topic) return false;
      if (!needle) return true;
      return f.q.toLowerCase().includes(needle) || f.a.toLowerCase().includes(needle);
    });
  }, [query, topic]);

  // A search that narrows to one answer should show it without another click.
  const effectiveOpen = results.length === 1 && query.trim() ? 0 : openIndex;

  return (
    <div className="pb-24 pt-14 sm:pt-20">
      {/* ---------------- Hero ---------------- */}
      <Section width="wide">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Reveal>
              <Eyebrow tone="cyber">Yordam markazi · {FAQ.length} ta savol</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <Display size="lg" className="mt-5">
                Savolingizga <Accent>javob bor.</Accent>
              </Display>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/55">
                Hisob, vositalar, xavfsizlik va CTF bo'yicha ko'p so'raladigan
                savollar. Javob topilmasa — to'g'ridan-to'g'ri yozing.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <HoloCard glow="signal" className="min-w-[200px]">
              <LifeBuoy className="h-5 w-5 text-signal-400" />
              <div className="mt-3 font-display text-2xl font-bold text-white">
                {FAQ.length}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[.16em] text-white/40">
                Savol-javob
              </div>
            </HoloCard>
          </Reveal>
        </div>
      </Section>

      {/* ---------------- Search & topics ---------------- */}
      <Section width="wide" className="mt-10">
        <div className="sticky top-16 z-30 rounded-2xl border border-white/10 bg-void-900/85 p-3 shadow-panel backdrop-blur-xl">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative lg:w-80 lg:shrink-0">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setOpenIndex(null);
                }}
                placeholder="Savol bo'yicha qidirish..."
                aria-label="Yordam bo'yicha qidirish"
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
              {TOPICS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => {
                    setTopic(t.key);
                    setOpenIndex(null);
                  }}
                  aria-pressed={topic === t.key}
                  className={classNames(
                    "flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold tracking-wide transition-all duration-300",
                    topic === t.key
                      ? "border-signal-400/60 bg-signal-500/12 text-signal-200 shadow-glow-sm"
                      : "border-white/10 bg-white/[.02] text-white/45 hover:border-white/25 hover:text-white/80",
                  )}
                >
                  {t.label}
                  <span
                    className={classNames(
                      "rounded-full px-1.5 py-0.5 text-[10px] tabular-nums",
                      topic === t.key
                        ? "bg-signal-500/20 text-signal-200"
                        : "bg-white/[.06] text-white/40",
                    )}
                  >
                    {counts[t.key] || 0}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------- Answers ---------------- */}
      <Section width="wide" className="mt-8">
        {results.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[.02] py-20 text-center">
            <MessageCircleQuestion className="mx-auto h-10 w-10 text-white/15" />
            <div className="mt-4 font-display text-lg font-bold text-white/70">
              Javob topilmadi
            </div>
            <p className="mx-auto mt-2 max-w-sm text-sm text-white/40">
              "{query}" bo'yicha hech narsa yo'q. To'g'ridan-to'g'ri so'rashingiz mumkin.
            </p>
            <NeonButton as={Link} to="/contact" className="mt-6" size="sm">
              Savol yuborish
            </NeonButton>
          </div>
        ) : (
          <div className="grid gap-3 lg:grid-cols-2">
            {results.map((item, i) => (
              <Reveal key={item.q} delay={Math.min(i, 8) * 45}>
                <FaqItem
                  item={item}
                  query={query}
                  open={effectiveOpen === i}
                  onToggle={() => setOpenIndex(effectiveOpen === i ? null : i)}
                />
              </Reveal>
            ))}
          </div>
        )}
      </Section>

      {/* ---------------- Quick links ---------------- */}
      <Section width="wide" className="mt-16">
        <Reveal>
          <Eyebrow tone="signal">Tezkor havolalar</Eyebrow>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_LINKS.map((l, i) => {
            const inner = (
              <HoloCard glow="cyber" className="flex h-full items-center gap-3">
                <div className="min-w-0">
                  <div className="font-display text-sm font-bold text-white">{l.label}</div>
                  <div className="mt-0.5 text-xs text-white/40">{l.note}</div>
                </div>
                <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-white/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyber-400" />
              </HoloCard>
            );

            return (
              <Reveal key={l.label} delay={i * 70}>
                {l.internal ? (
                  <Link to={l.href} className="group block h-full">
                    {inner}
                  </Link>
                ) : (
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block h-full"
                  >
                    {inner}
                  </a>
                )}
              </Reveal>
            );
          })}
        </div>
      </Section>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Help;
