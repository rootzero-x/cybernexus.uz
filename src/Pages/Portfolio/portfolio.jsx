// src/Pages/Portfolio/portfolio.jsx
import React, { useMemo, useState } from "react";
import classNames from "classnames";
import {
  Github,
  Send,
  Instagram,
  ExternalLink,
  MapPin,
  Circle,
  ArrowUpRight,
  Sparkles,
  Code2,
  ShieldCheck,
} from "lucide-react";

import { PROFILE, LINKS, SKILLS, PROJECTS, TIMELINE } from "./portfolioData";
import {
  HoloCard,
  Eyebrow,
  Display,
  Accent,
  Chip,
  Section,
  Reveal,
  NeonButton,
  Rule,
} from "../../design";

const LINK_ICON = {
  github: Github,
  telegram: Send,
  instagram: Instagram,
};

function ProfilePhoto({ src, name }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    const initials = name
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() || "")
      .join("");
    return (
      <div className="grid h-full w-full place-items-center bg-void-850">
        <span className="font-display text-5xl font-bold text-signal-400/40">{initials}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setFailed(true)}
      className="h-full w-full object-cover"
    />
  );
}

function ProjectCover({ src }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="grid h-full w-full place-items-center bg-void-850">
        <Code2 className="h-8 w-8 text-white/12" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition-transform duration-700 ease-spring group-hover:scale-105"
    />
  );
}

function ProjectCard({ project, large = false }) {
  const body = (
    <HoloCard
      glow={project.tone}
      padded={false}
      className="flex h-full flex-col overflow-hidden"
    >
      <div className={classNames("relative shrink-0 overflow-hidden", large ? "h-56" : "h-40")}>
        <ProjectCover src={project.cover} />
        <div className="absolute inset-0 bg-gradient-to-t from-void-900 via-void-900/40 to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          <Chip tone={project.tone}>{project.kind}</Chip>
        </div>
        <div className="absolute right-4 top-4">
          <span className="rounded-full border border-white/12 bg-black/45 px-2.5 py-0.5 text-[11px] font-bold tabular-nums text-white/60 backdrop-blur">
            {project.year}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3
            className={classNames(
              "font-display font-bold text-white",
              large ? "text-xl sm:text-2xl" : "text-lg",
            )}
          >
            {project.title}
          </h3>
          {project.link ? (
            <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-white/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal-400" />
          ) : null}
        </div>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-white/50">
          {project.description}
        </p>

        {project.metrics?.length ? (
          <div className="mt-5 flex flex-wrap gap-4">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <div className="font-display text-xl font-bold tabular-nums text-signal-300">
                  {m.value}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[.16em] text-white/35">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-lg border border-white/8 bg-white/[.03] px-2 py-1 text-[11px] text-white/45"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </HoloCard>
  );

  if (!project.link) return <div className="group h-full">{body}</div>;

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full focus:outline-none"
    >
      {body}
    </a>
  );
}

export const Portfolio = () => {
  const [featured, rest] = useMemo(
    () => [PROJECTS.filter((p) => p.featured), PROJECTS.filter((p) => !p.featured)],
    [],
  );

  const totalSkills = useMemo(
    () => SKILLS.reduce((n, g) => n + g.items.length, 0),
    [],
  );

  return (
    <div className="pb-24 pt-14 sm:pt-20">
      {/* ---------------- Hero ---------------- */}
      <Section width="wide">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow tone="cyber">{PROFILE.role}</Eyebrow>
            </Reveal>

            <Reveal delay={80}>
              <Display size="xl" className="mt-5">
                {PROFILE.name}
                <span className="text-signal-400">.</span>
              </Display>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-5 max-w-xl font-display text-lg leading-snug text-signal-200/80">
                {PROFILE.tagline}
              </p>
            </Reveal>

            <Reveal delay={190}>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/50">
                {PROFILE.bio}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-7 flex flex-wrap items-center gap-4 text-xs text-white/40">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {PROFILE.location}
                </span>
                {PROFILE.available ? (
                  <span className="inline-flex items-center gap-1.5 text-signal-300">
                    <Circle className="h-2 w-2 fill-current" />
                    Loyihalar uchun ochiq
                  </span>
                ) : null}
              </div>
            </Reveal>

            <Reveal delay={290}>
              <div className="mt-8 flex flex-wrap gap-3">
                {LINKS.map((l) => {
                  const Icon = LINK_ICON[l.key] || ExternalLink;
                  return (
                    <NeonButton
                      key={l.key}
                      as="a"
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="ghost"
                      size="sm"
                    >
                      <Icon className="h-4 w-4" />
                      {l.label}
                    </NeonButton>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* Profile card */}
          <Reveal delay={200} y={26}>
            <HoloCard glow="signal" padded={false} className="overflow-hidden">
              <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[3/3.2]">
                <ProfilePhoto src={PROFILE.photo} name={PROFILE.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-void-900 via-void-900/20 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <div className="font-display text-xl font-bold text-white">
                        @{PROFILE.handle}
                      </div>
                      <div className="mt-0.5 text-xs text-white/50">{PROFILE.role}</div>
                    </div>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-signal-500/35 bg-signal-500/12 backdrop-blur">
                      <ShieldCheck className="h-4.5 w-4.5 text-signal-400" />
                    </span>
                  </div>
                </div>
              </div>
            </HoloCard>
          </Reveal>
        </div>
      </Section>

      {/* ---------------- Featured work ---------------- */}
      <Section width="wide" className="mt-20">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <Eyebrow tone="signal">Asosiy loyihalar</Eyebrow>
              <Display size="md" className="mt-4">
                Ishlab turgan <Accent>mahsulotlar.</Accent>
              </Display>
            </div>
            <span className="hidden text-sm tabular-nums text-white/30 sm:block">
              {PROJECTS.length} ta loyiha
            </span>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100}>
              <ProjectCard project={p} large />
            </Reveal>
          ))}
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------- Capabilities ---------------- */}
      <Section width="wide" className="mt-20">
        <Reveal>
          <Eyebrow tone="cyber">Ko'nikmalar · {totalSkills} ta</Eyebrow>
          <Display size="md" className="mt-4">
            Nima bilan <Accent from="cyber">ishlayman.</Accent>
          </Display>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((group, i) => (
            <Reveal key={group.group} delay={i * 80}>
              <HoloCard glow={group.tone} className="h-full">
                <div className="flex items-center gap-2.5">
                  <span
                    className={classNames(
                      "grid h-9 w-9 place-items-center rounded-xl border",
                      group.tone === "cyber"
                        ? "border-cyber-500/30 bg-cyber-500/10 text-cyber-400"
                        : "border-signal-500/30 bg-signal-500/10 text-signal-400",
                    )}
                  >
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <h3 className="font-display text-base font-bold text-white">
                    {group.group}
                  </h3>
                </div>

                <Rule className="my-4" />

                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/55">
                      <span
                        className={classNames(
                          "mt-1.5 h-1 w-1 shrink-0 rounded-full",
                          group.tone === "cyber" ? "bg-cyber-400" : "bg-signal-400",
                        )}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </HoloCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------- Timeline ---------------- */}
      <Section width="default" className="mt-20">
        <Reveal>
          <Eyebrow tone="signal">Yo'l</Eyebrow>
          <Display size="md" className="mt-4">
            Bosib o'tilgan <Accent>bosqichlar.</Accent>
          </Display>
        </Reveal>

        <div className="relative mt-10 pl-8">
          {/* Spine */}
          <span className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-signal-500/50 via-cyber-500/25 to-transparent" />

          <div className="space-y-8">
            {TIMELINE.map((entry, i) => (
              <Reveal key={`${entry.year}-${entry.title}`} delay={i * 90}>
                <div className="relative">
                  <span className="absolute -left-8 top-1.5 grid h-4 w-4 place-items-center rounded-full border-2 border-signal-400/70 bg-void-900">
                    <span className="h-1.5 w-1.5 rounded-full bg-signal-400" />
                  </span>

                  <div className="text-[11px] font-bold uppercase tracking-[.2em] text-cyber-400">
                    {entry.year}
                  </div>
                  <h3 className="mt-1.5 font-display text-lg font-bold text-white">
                    {entry.title}
                  </h3>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-white/50">
                    {entry.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------------- Contact ---------------- */}
      <Section width="default" className="mt-20">
        <Reveal>
          <HoloCard glow="cyber" className="relative overflow-hidden text-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-32 -z-10 animate-spin-slow opacity-30"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent, rgba(0,255,157,.22), transparent 32%, rgba(0,229,255,.20), transparent 64%)",
              }}
            />
            <Eyebrow tone="cyber" className="justify-center">
              Bog'lanish
            </Eyebrow>
            <Display size="md" className="mt-4">
              Loyihangiz bormi? <Accent>Yozing.</Accent>
            </Display>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/50">
              Xavfsizlik auditi, platforma ishlab chiqish yoki maslahat — eng
              tez javob Telegram orqali keladi.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <NeonButton
                as="a"
                href={LINKS.find((l) => l.key === "telegram")?.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Send className="h-4 w-4" />
                Telegram
              </NeonButton>
              <NeonButton
                as="a"
                href={LINKS.find((l) => l.key === "github")?.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
              >
                <Github className="h-4 w-4" />
                GitHub
              </NeonButton>
            </div>
          </HoloCard>
        </Reveal>
      </Section>
    </div>
  );
};

export default Portfolio;
