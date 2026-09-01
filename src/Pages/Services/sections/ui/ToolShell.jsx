import React from "react";
import classNames from "classnames";
import { Copy, Download, Trash2 } from "lucide-react";

import { HoloCard, Eyebrow } from "../../../../design";

/**
 * Common frame for every tool: a titled left pane for the inputs and a right
 * pane for the result, with the copy/download/clear actions in one place.
 *
 * Each tool used to lay out its own header, its own result panel and its own
 * action buttons, so no two behaved quite the same.
 */
export default function ToolShell({
  icon: Icon,
  eyebrow,
  title,
  description,
  tone = "signal",
  children,
  result,
  resultLabel = "Natija",
  emptyHint = "Natija shu yerda chiqadi.",
  onCopy,
  onDownload,
  onClear,
  extra,
}) {
  const hasResult = Boolean(result);

  return (
    <div className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
      {/* ---- Input ---- */}
      <HoloCard glow={tone}>
        <div className="flex items-center gap-3">
          <span
            className={classNames(
              "grid h-11 w-11 shrink-0 place-items-center rounded-xl border",
              tone === "cyber"
                ? "border-cyber-500/35 bg-cyber-500/10 text-cyber-400"
                : tone === "plasma"
                  ? "border-plasma/35 bg-plasma/10 text-plasma"
                  : "border-signal-500/35 bg-signal-500/10 text-signal-400",
            )}
          >
            <Icon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <Eyebrow tone={tone === "plasma" ? "signal" : tone}>{eyebrow}</Eyebrow>
            <h2 className="mt-1 font-display text-xl font-bold text-white">{title}</h2>
          </div>
        </div>

        {description ? (
          <p className="mt-4 text-sm leading-relaxed text-white/50">{description}</p>
        ) : null}

        <div className="mt-6 space-y-4">{children}</div>
      </HoloCard>

      {/* ---- Result ---- */}
      <HoloCard glow={tone} className="flex flex-col">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-bold uppercase tracking-[.2em] text-white/35">
            {resultLabel}
          </span>

          <div className="flex gap-1.5">
            {onCopy ? (
              <IconButton onClick={onCopy} disabled={!hasResult} label="Nusxalash">
                <Copy className="h-3.5 w-3.5" />
              </IconButton>
            ) : null}
            {onDownload ? (
              <IconButton onClick={onDownload} disabled={!hasResult} label="Yuklab olish">
                <Download className="h-3.5 w-3.5" />
              </IconButton>
            ) : null}
            {onClear ? (
              <IconButton onClick={onClear} disabled={!hasResult} label="Tozalash" danger>
                <Trash2 className="h-3.5 w-3.5" />
              </IconButton>
            ) : null}
          </div>
        </div>

        <div className="mt-4 flex-1">
          {hasResult ? (
            result
          ) : (
            <div className="grid h-full min-h-[180px] place-items-center rounded-xl border border-dashed border-white/10 bg-black/20 p-6 text-center">
              <p className="max-w-[22ch] text-sm text-white/30">{emptyHint}</p>
            </div>
          )}
        </div>

        {extra ? <div className="mt-4">{extra}</div> : null}
      </HoloCard>
    </div>
  );
}

function IconButton({ children, onClick, disabled, label, danger }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={classNames(
        "grid h-8 w-8 place-items-center rounded-lg border transition-all",
        "disabled:cursor-not-allowed disabled:opacity-30",
        danger
          ? "border-white/10 text-white/40 hover:border-plasma/50 hover:text-plasma"
          : "border-white/10 text-white/40 hover:border-signal-400/50 hover:text-signal-300",
      )}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ *
 *  Shared field primitives
 * ------------------------------------------------------------------ */

export function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-bold uppercase tracking-[.18em] text-white/40">
        {label}
      </span>
      {children}
      {hint ? <span className="mt-1.5 block text-xs text-white/30">{hint}</span> : null}
    </label>
  );
}

export const inputClass =
  "w-full rounded-xl border border-white/12 bg-black/40 px-4 py-3 text-sm text-white " +
  "placeholder:text-white/25 outline-none transition-all duration-200 " +
  "focus:border-signal-400/70 focus:bg-signal-500/5 focus:shadow-glow-sm";

export const textareaClass = inputClass + " min-h-[140px] resize-y font-mono text-xs leading-relaxed";

export function SegmentedControl({ options, value, onChange, ariaLabel }) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="flex flex-wrap gap-1.5 rounded-xl border border-white/10 bg-black/30 p-1.5"
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
          className={classNames(
            "rounded-lg px-3 py-1.5 text-xs font-bold tracking-wide transition-colors",
            value === o.value
              ? "bg-signal-500/15 text-signal-300"
              : "text-white/40 hover:text-white/75",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Monospace result block that wraps long output instead of overflowing. */
export function CodeBlock({ children, className }) {
  return (
    <pre
      className={classNames(
        "max-h-[320px] overflow-auto rounded-xl border border-white/10 bg-black/45 p-4",
        "whitespace-pre-wrap break-all font-mono text-xs leading-relaxed text-signal-200",
        className,
      )}
    >
      {children}
    </pre>
  );
}
