import React, { useMemo, useState } from "react";
import { ScanSearch, AlertTriangle } from "lucide-react";

import ToolShell, { Field, inputClass } from "./ui/ToolShell";
import { safeCopy } from "./ui/utils";

/**
 * Hash formats keyed by what can actually be observed: length and alphabet,
 * plus a prefix where the format carries one.
 *
 * Length alone is ambiguous — MD5, NTLM and MD4 are all 32 hex characters —
 * so candidates are returned as a ranked list rather than a single answer.
 */
const SIGNATURES = [
  { name: "MD5", length: 32, charset: /^[a-f0-9]+$/i, confidence: "yuqori", note: "Eskirgan — to'qnashuvlar ma'lum." },
  { name: "NTLM", length: 32, charset: /^[a-f0-9]+$/i, confidence: "o'rtacha", note: "Windows parol hashi. MD5 bilan bir xil uzunlik." },
  { name: "MD4", length: 32, charset: /^[a-f0-9]+$/i, confidence: "past", note: "Juda eskirgan." },
  { name: "SHA-1", length: 40, charset: /^[a-f0-9]+$/i, confidence: "yuqori", note: "Eskirgan — 2017 dan beri buzilgan." },
  { name: "SHA-224", length: 56, charset: /^[a-f0-9]+$/i, confidence: "yuqori", note: null },
  { name: "SHA-256", length: 64, charset: /^[a-f0-9]+$/i, confidence: "yuqori", note: "Hozirgi standart." },
  { name: "SHA-384", length: 96, charset: /^[a-f0-9]+$/i, confidence: "yuqori", note: null },
  { name: "SHA-512", length: 128, charset: /^[a-f0-9]+$/i, confidence: "yuqori", note: null },
  { name: "CRC-32", length: 8, charset: /^[a-f0-9]+$/i, confidence: "past", note: "Hash emas — nazorat summasi." },
];

const PREFIXED = [
  { name: "bcrypt", test: /^\$2[abxy]?\$\d{2}\$[./A-Za-z0-9]{53}$/, confidence: "aniq", note: "Parollar uchun tavsiya etiladi. Cost omili ichida." },
  { name: "Argon2", test: /^\$argon2(id|i|d)\$/, confidence: "aniq", note: "Zamonaviy parol hashlash standarti." },
  { name: "scrypt", test: /^\$scrypt\$/, confidence: "aniq", note: null },
  { name: "SHA-512 crypt", test: /^\$6\$/, confidence: "aniq", note: "Linux /etc/shadow." },
  { name: "SHA-256 crypt", test: /^\$5\$/, confidence: "aniq", note: "Linux /etc/shadow." },
  { name: "MD5 crypt", test: /^\$1\$/, confidence: "aniq", note: "Eski Linux /etc/shadow." },
  { name: "PHPass", test: /^\$P\$|^\$H\$/, confidence: "aniq", note: "WordPress / phpBB." },
  { name: "Django PBKDF2", test: /^pbkdf2_sha256\$/, confidence: "aniq", note: null },
];

function identify(raw) {
  const value = raw.trim();
  if (!value) return null;

  for (const p of PREFIXED) {
    if (p.test.test(value)) {
      return { input: value, matches: [{ ...p, why: "Formatning o'z prefiksi bo'yicha aniqlandi." }] };
    }
  }

  const matches = SIGNATURES.filter(
    (s) => s.length === value.length && s.charset.test(value),
  ).map((s) => ({ ...s, why: `${s.length} ta hex belgi.` }));

  if (matches.length === 0) {
    if (/^[A-Za-z0-9+/]+={0,2}$/.test(value) && value.length % 4 === 0) {
      return {
        input: value,
        matches: [
          {
            name: "Base64",
            confidence: "o'rtacha",
            why: "Base64 alfaviti va to'ldirish mos keladi.",
            note: "Bu hash emas — kodlash. Base64 vositasi bilan oching.",
          },
        ],
      };
    }
    return { input: value, matches: [] };
  }

  return { input: value, matches };
}

const CONFIDENCE_TONE = {
  aniq: "text-signal-300 border-signal-500/35 bg-signal-500/10",
  yuqori: "text-cyber-300 border-cyber-500/35 bg-cyber-500/10",
  "o'rtacha": "text-ember border-ember/35 bg-ember/10",
  past: "text-white/45 border-white/12 bg-white/[.03]",
};

export default function HashIdTool({ notify }) {
  const [value, setValue] = useState("");
  const result = useMemo(() => identify(value), [value]);

  const summary = result?.matches?.length
    ? result.matches.map((m) => `${m.name} (${m.confidence})`).join(", ")
    : "";

  return (
    <ToolShell
      icon={ScanSearch}
      eyebrow="Hash identifier"
      title="Hash turini aniqlash"
      description="Uzunlik, alfavit va format prefiksi bo'yicha taxmin qiladi. Bir uzunlikda bir nechta algoritm bo'lishi mumkin — shuning uchun ro'yxat qaytariladi."
      tone="signal"
      emptyHint="Hash joylashtiring."
      result={
        result ? (
          result.matches.length === 0 ? (
            <div className="flex items-start gap-3 rounded-xl border border-white/12 bg-black/30 p-4">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-white/35" />
              <div>
                <p className="text-sm text-white/60">Mos format topilmadi.</p>
                <p className="mt-1 text-xs text-white/35">
                  Uzunlik: {result.input.length} belgi. Ma'lum hash formatlari
                  8, 32, 40, 56, 64, 96 yoki 128 ta hex belgidan iborat.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              {result.matches.map((m) => (
                <div key={m.name} className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-display text-base font-bold text-white">{m.name}</span>
                    <span
                      className={
                        "rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider " +
                        (CONFIDENCE_TONE[m.confidence] || CONFIDENCE_TONE.past)
                      }
                    >
                      {m.confidence}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-white/40">{m.why}</p>
                  {m.note ? (
                    <p className="mt-2 border-t border-white/8 pt-2 text-xs text-white/50">
                      {m.note}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          )
        ) : null
      }
      onCopy={
        summary
          ? async () => {
              const ok = await safeCopy(summary);
              notify?.(ok ? { type: "success", title: "Nusxalandi" } : { type: "error", title: "Nusxalab bo'lmadi" });
            }
          : undefined
      }
      onClear={() => setValue("")}
    >
      <Field label="Hash">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="5f4dcc3b5aa765d61d8327deb882cf99"
          spellCheck={false}
          className={inputClass + " font-mono text-xs"}
        />
      </Field>

      <div className="flex flex-wrap gap-1.5">
        {[
          ["MD5", "5f4dcc3b5aa765d61d8327deb882cf99"],
          ["SHA-1", "356a192b7913b04c54574d18c28d46e6395428ab"],
          ["SHA-256", "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"],
          ["bcrypt", "$2y$12$E47QMNnivIXJkJFpD.0BieQEG2QSIm8ExJmDF7zGsHG4DfdsPSNKS"],
        ].map(([label, sample]) => (
          <button
            key={label}
            type="button"
            onClick={() => setValue(sample)}
            className="rounded-lg border border-white/10 bg-white/[.02] px-2.5 py-1.5 text-[11px] text-white/45 transition-colors hover:border-signal-400/50 hover:text-signal-300"
          >
            {label}
          </button>
        ))}
      </div>
    </ToolShell>
  );
}
