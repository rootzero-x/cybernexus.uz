import React, { useMemo, useState } from "react";
import { Link2, AlertTriangle, ShieldAlert } from "lucide-react";

import ToolShell, { Field, textareaClass, SegmentedControl, CodeBlock } from "./ui/ToolShell";
import { safeCopy } from "./ui/utils";

/** Schemes that can execute rather than navigate. */
const DANGEROUS = ["javascript", "data", "vbscript", "file", "blob"];

function analyse(raw) {
  const value = raw.trim();
  if (!value) return null;

  let url;
  try {
    url = new URL(value);
  } catch {
    return { error: "To'liq URL kiriting (sxema bilan, masalan https://…)." };
  }

  const scheme = url.protocol.replace(":", "").toLowerCase();
  const params = [...url.searchParams.entries()];

  const warnings = [];
  if (DANGEROUS.includes(scheme)) {
    warnings.push(`"${scheme}:" sxemasi kod ijro etishi mumkin — havolani ochmang.`);
  }
  if (url.username || url.password) {
    warnings.push("URL ichida login/parol bor — bu fishingda tez-tez ishlatiladi.");
  }
  // Punycode: a host starting xn-- may be a homograph of a familiar domain.
  if (url.hostname.split(".").some((part) => part.startsWith("xn--"))) {
    warnings.push("Hostda punycode (xn--) bor — boshqa domenga o'xshatilgan bo'lishi mumkin.");
  }
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(url.hostname)) {
    warnings.push("Domen o'rniga to'g'ridan-to'g'ri IP manzil ishlatilgan.");
  }
  if (url.hostname.length > 60) {
    warnings.push("Juda uzun host nomi — chalg'itish uchun ishlatilishi mumkin.");
  }

  return {
    href: url.href,
    scheme,
    host: url.hostname,
    port: url.port || (scheme === "https" ? "443" : scheme === "http" ? "80" : "—"),
    path: url.pathname || "/",
    hash: url.hash || "—",
    params,
    warnings,
  };
}

export default function UrlTool({ notify }) {
  const [mode, setMode] = useState("encode");
  const [text, setText] = useState("");

  const encoded = useMemo(() => {
    if (!text.trim()) return { value: "" };
    try {
      return {
        value: mode === "encode" ? encodeURIComponent(text) : decodeURIComponent(text),
      };
    } catch {
      return { error: "Dekodlab bo'lmadi — noto'g'ri % ketma-ketligi." };
    }
  }, [mode, text]);

  const parsed = useMemo(() => (mode === "parse" ? analyse(text) : null), [mode, text]);

  const output =
    mode === "parse"
      ? parsed && !parsed.error
        ? [
            `Sxema:  ${parsed.scheme}`,
            `Host:   ${parsed.host}`,
            `Port:   ${parsed.port}`,
            `Yo'l:   ${parsed.path}`,
            ...parsed.params.map(([k, v]) => `  ?${k} = ${v}`),
          ].join("\n")
        : ""
      : encoded.value;

  return (
    <ToolShell
      icon={Link2}
      eyebrow="URL tools"
      title="URL kodlash va tahlil"
      description="Percent-encoding va URL tarkibini ochib ko'rish. Tahlil rejimi shubhali havolalarni belgilaydi."
      tone="cyber"
      emptyHint="Matn yoki URL kiriting."
      result={
        mode === "parse" ? (
          parsed ? (
            parsed.error ? (
              <div className="flex items-start gap-3 rounded-xl border border-plasma/40 bg-plasma/10 p-4">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-plasma" />
                <p className="text-sm text-white/70">{parsed.error}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {parsed.warnings.length ? (
                  <div className="rounded-xl border border-plasma/40 bg-plasma/10 p-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-plasma">
                      <ShieldAlert className="h-4 w-4" />
                      Ogohlantirish
                    </div>
                    <ul className="mt-2 space-y-1.5">
                      {parsed.warnings.map((w) => (
                        <li key={w} className="flex gap-2 text-xs leading-relaxed text-white/65">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-plasma" />
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="rounded-xl border border-signal-500/30 bg-signal-500/[.07] p-3 text-xs text-signal-300">
                    Ochiq shubhali belgilar topilmadi. Bu havola xavfsiz degani
                    emas — faqat tuzilishida g'ayrioddiylik yo'q.
                  </div>
                )}

                <dl className="grid grid-cols-2 gap-2">
                  <Cell label="Sxema" value={parsed.scheme} />
                  <Cell label="Port" value={parsed.port} />
                  <Cell label="Host" value={parsed.host} span />
                  <Cell label="Yo'l" value={parsed.path} span />
                </dl>

                {parsed.params.length ? (
                  <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                    <div className="text-[10px] font-bold uppercase tracking-[.18em] text-white/35">
                      Query parametrlar ({parsed.params.length})
                    </div>
                    <div className="mt-2 space-y-1">
                      {parsed.params.map(([k, v], i) => (
                        <div key={`${k}-${i}`} className="flex gap-2 font-mono text-[11px]">
                          <span className="shrink-0 text-cyber-300">{k}</span>
                          <span className="text-white/25">=</span>
                          <span className="break-all text-white/60">{v || "(bo'sh)"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            )
          ) : null
        ) : encoded.error ? (
          <div className="flex items-start gap-3 rounded-xl border border-plasma/40 bg-plasma/10 p-4">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-plasma" />
            <p className="text-sm text-white/70">{encoded.error}</p>
          </div>
        ) : encoded.value ? (
          <CodeBlock>{encoded.value}</CodeBlock>
        ) : null
      }
      onCopy={
        output
          ? async () => {
              const ok = await safeCopy(output);
              notify?.(ok ? { type: "success", title: "Nusxalandi" } : { type: "error", title: "Nusxalab bo'lmadi" });
            }
          : undefined
      }
      onClear={() => setText("")}
    >
      <Field label="Rejim">
        <SegmentedControl
          options={[
            { value: "encode", label: "Kodlash" },
            { value: "decode", label: "Ochish" },
            { value: "parse", label: "Tahlil" },
          ]}
          value={mode}
          onChange={setMode}
          ariaLabel="URL rejimi"
        />
      </Field>

      <Field
        label={mode === "parse" ? "URL" : "Matn"}
        hint={mode === "parse" ? "Sxema bilan to'liq URL kiriting." : null}
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={
            mode === "parse"
              ? "https://example.com/path?a=1&b=2"
              : "salom dunyo & boshqa belgilar"
          }
          spellCheck={false}
          className={textareaClass}
        />
      </Field>

      {mode === "parse" ? (
        <div className="flex flex-wrap gap-1.5">
          {[
            ["Oddiy", "https://cybernexus.uz/services?tool=url"],
            ["Fishing", "https://user:pass@xn--gogle-8va.com/login?next=%2Fadmin"],
          ].map(([label, sample]) => (
            <button
              key={label}
              type="button"
              onClick={() => setText(sample)}
              className="rounded-lg border border-white/10 bg-white/[.02] px-2.5 py-1.5 text-[11px] text-white/45 transition-colors hover:border-cyber-400/50 hover:text-cyber-300"
            >
              {label} misol
            </button>
          ))}
        </div>
      ) : null}
    </ToolShell>
  );
}

function Cell({ label, value, span }) {
  return (
    <div className={span ? "col-span-2 rounded-xl border border-white/10 bg-black/30 p-3" : "rounded-xl border border-white/10 bg-black/30 p-3"}>
      <dt className="text-[10px] font-bold uppercase tracking-[.16em] text-white/35">{label}</dt>
      <dd className="mt-1 break-all font-mono text-sm text-white/75">{value}</dd>
    </div>
  );
}
