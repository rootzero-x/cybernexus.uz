// src/design/PageHero.jsx
import React from "react";
import classNames from "classnames";
import { Eyebrow, Display, Accent, Section } from "./primitives";
import Reveal from "./Reveal";
import HoloCard from "./HoloCard";

/**
 * The standard page opening: eyebrow, headline, lede, optional stat rail and
 * an optional side panel.
 *
 * Every page used to build its own header out of the same pieces at slightly
 * different sizes and spacings, so no two pages started the same way. This is
 * the single place that rhythm is defined.
 */
export default function PageHero({
  eyebrow,
  eyebrowTone = "cyber",
  title,
  accent,
  lede,
  stats,
  aside,
  actions,
  width = "wide",
  className,
}) {
  const hasSide = Boolean(aside);

  return (
    <Section width={width} className={classNames("pt-14 sm:pt-20", className)}>
      <div
        className={classNames(
          hasSide && "grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:gap-14",
        )}
      >
        <div>
          {eyebrow ? (
            <Reveal>
              <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>
            </Reveal>
          ) : null}

          <Reveal delay={80}>
            <Display size="lg" className="mt-5">
              {title}
              {accent ? (
                <>
                  {" "}
                  <Accent from={eyebrowTone === "signal" ? "cyber" : "signal"}>
                    {accent}
                  </Accent>
                </>
              ) : null}
            </Display>
          </Reveal>

          {lede ? (
            <Reveal delay={150}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
                {lede}
              </p>
            </Reveal>
          ) : null}

          {actions ? (
            <Reveal delay={210}>
              <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
            </Reveal>
          ) : null}

          {stats?.length ? (
            <Reveal delay={250}>
              <div
                className={classNames(
                  "mt-10 grid gap-3",
                  stats.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2",
                )}
              >
                {stats.map((s) => (
                  <HoloCard
                    key={s.label}
                    glow={s.tone || "signal"}
                    className="flex items-center gap-3.5"
                  >
                    {s.icon ? (
                      <s.icon
                        className={classNames(
                          "h-5 w-5 shrink-0",
                          s.tone === "cyber" ? "text-cyber-400" : "text-signal-400",
                        )}
                      />
                    ) : null}
                    <div className="min-w-0">
                      <div className="font-display text-2xl font-bold tabular-nums text-white">
                        {s.value}
                      </div>
                      <div className="truncate text-[11px] font-bold uppercase tracking-[.18em] text-white/40">
                        {s.label}
                      </div>
                    </div>
                  </HoloCard>
                ))}
              </div>
            </Reveal>
          ) : null}
        </div>

        {hasSide ? (
          <Reveal delay={200} y={26}>
            {aside}
          </Reveal>
        ) : null}
      </div>
    </Section>
  );
}
