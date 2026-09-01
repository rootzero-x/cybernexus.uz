import React, { useCallback, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { KeyRound, RefreshCw } from "lucide-react";

import ToolShell, { Field, CodeBlock } from "./ui/ToolShell";
import { safeCopy, downloadText } from "./ui/utils";
import {
  buildAlphabet,
  randomFrom,
  entropyBits,
  strengthOf,
  crackTime,
} from "./lib/passwords";

export default function PasswordTool({ notify }) {
  const [length, setLength] = useState(20);
  const [useUpper, setUseUpper] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [noAmbiguous, setNoAmbiguous] = useState(false);
  const [count, setCount] = useState(1);
  const [passwords, setPasswords] = useState([]);

  const alphabet = useMemo(
    () =>
      buildAlphabet({
        upper: useUpper,
        digits: useDigits,
        symbols: useSymbols,
        noAmbiguous,
      }),
    [useUpper, useDigits, useSymbols, noAmbiguous],
  );

  const bits = entropyBits(length, alphabet.length);
  const strength = strengthOf(bits);

  const generate = useCallback(() => {
    if (alphabet.length < 2) {
      notify?.({ type: "warn", title: "Alfavit bo'sh", message: "Kamida bitta to'plamni yoqing." });
      return;
    }
    setPasswords(Array.from({ length: count }, () => randomFrom(alphabet, length)));
  }, [alphabet, length, count, notify]);

  // Generate once on mount so the panel is never empty on arrival.
  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const text = passwords.join("\n");

  return (
    <ToolShell
      icon={KeyRound}
      eyebrow="Password generator"
      title="Xavfsiz parol yaratish"
      description="Parollar brauzeringizda crypto.getRandomValues bilan yaratiladi — hech qayerga yuborilmaydi va saqlanmaydi."
      tone="signal"
      result={
        passwords.length ? (
          <div className="space-y-3">
            <CodeBlock className="text-sm">{text}</CodeBlock>

            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-[.16em] text-white/40">
                  Entropiya
                </span>
                <span
                  className={classNames(
                    "font-bold",
                    strength.tone === "plasma"
                      ? "text-plasma"
                      : strength.tone === "ember"
                        ? "text-ember"
                        : strength.tone === "cyber"
                          ? "text-cyber-300"
                          : "text-signal-300",
                  )}
                >
                  {bits} bit · {strength.label}
                </span>
              </div>

              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/8">
                <div
                  className={classNames(
                    "h-full rounded-full transition-all duration-500",
                    strength.tone === "plasma"
                      ? "bg-plasma"
                      : strength.tone === "ember"
                        ? "bg-ember"
                        : strength.tone === "cyber"
                          ? "bg-cyber-400"
                          : "bg-gradient-to-r from-signal-400 to-cyber-400",
                  )}
                  style={{ width: `${strength.pct}%` }}
                />
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <dt className="text-white/35">Alfavit</dt>
                  <dd className="mt-0.5 tabular-nums text-white/70">{alphabet.length} belgi</dd>
                </div>
                <div>
                  <dt className="text-white/35">Taxminiy buzish vaqti</dt>
                  <dd className="mt-0.5 text-white/70">{crackTime(bits)}</dd>
                </div>
              </dl>
              <p className="mt-3 text-[11px] leading-relaxed text-white/25">
                Baholash sekundiga 10¹² urinish tezligidagi oflayn hujumga
                nisbatan — parol hashi sizib chiqqan holat uchun.
              </p>
            </div>
          </div>
        ) : null
      }
      onCopy={async () => {
        const ok = await safeCopy(text);
        notify?.(ok ? { type: "success", title: "Nusxalandi" } : { type: "error", title: "Nusxalab bo'lmadi" });
      }}
      onDownload={() => downloadText("passwords.txt", text)}
      onClear={() => setPasswords([])}
    >
      <Field label={`Uzunlik — ${length}`}>
        <input
          type="range"
          min={8}
          max={64}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full accent-[#00ff9d]"
          aria-label="Parol uzunligi"
        />
      </Field>

      <div className="grid grid-cols-2 gap-2">
        <Toggle checked={useUpper} onChange={setUseUpper} label="A–Z" />
        <Toggle checked={useDigits} onChange={setUseDigits} label="0–9" />
        <Toggle checked={useSymbols} onChange={setUseSymbols} label="!@#$" />
        <Toggle checked={noAmbiguous} onChange={setNoAmbiguous} label="il1Lo0O siz" />
      </div>

      <Field label="Nechta" hint="Bir vaqtda bir nechta parol yaratish mumkin.">
        <input
          type="number"
          min={1}
          max={50}
          value={count}
          onChange={(e) => setCount(Math.max(1, Math.min(50, Number(e.target.value) || 1)))}
          className="w-full rounded-xl border border-white/12 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-signal-400/70"
        />
      </Field>

      <button
        type="button"
        onClick={generate}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-transparent bg-gradient-to-r from-signal-400 to-cyber-400 px-5 py-3 text-sm font-bold uppercase tracking-[.14em] text-void-950 transition-all hover:shadow-glow-lg"
      >
        <RefreshCw className="h-4 w-4" />
        Yaratish
      </button>
    </ToolShell>
  );
}

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      className={classNames(
        "rounded-xl border px-3 py-2.5 text-xs font-bold tracking-wide transition-all",
        checked
          ? "border-signal-400/60 bg-signal-500/12 text-signal-200"
          : "border-white/10 bg-white/[.02] text-white/40 hover:border-white/25",
      )}
    >
      {label}
    </button>
  );
}
