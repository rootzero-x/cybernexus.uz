import React, { useMemo, useState } from "react";
import { Shuffle, AlertTriangle } from "lucide-react";

import ToolShell, { Field, textareaClass, SegmentedControl, CodeBlock } from "./ui/ToolShell";
import { safeCopy } from "./ui/utils";

const MODES = [
  { value: "caesar", label: "Caesar" },
  { value: "atbash", label: "Atbash" },
  { value: "xor", label: "XOR" },
  { value: "reverse", label: "Teskari" },
  { value: "morse", label: "Morze" },
];

const A = "abcdefghijklmnopqrstuvwxyz";

function caesar(text, shift) {
  const s = ((shift % 26) + 26) % 26;
  return text.replace(/[a-z]/gi, (ch) => {
    const lower = ch.toLowerCase();
    const idx = A.indexOf(lower);
    if (idx === -1) return ch;
    const out = A[(idx + s) % 26];
    return ch === lower ? out : out.toUpperCase();
  });
}

function atbash(text) {
  return text.replace(/[a-z]/gi, (ch) => {
    const lower = ch.toLowerCase();
    const idx = A.indexOf(lower);
    if (idx === -1) return ch;
    const out = A[25 - idx];
    return ch === lower ? out : out.toUpperCase();
  });
}

/** XOR every byte with the repeating key, returned as hex. */
function xorToHex(text, key) {
  if (!key) return "";
  const bytes = new TextEncoder().encode(text);
  const keyBytes = new TextEncoder().encode(key);
  return [...bytes]
    .map((b, i) => (b ^ keyBytes[i % keyBytes.length]).toString(16).padStart(2, "0"))
    .join("");
}

function xorFromHex(hex, key) {
  if (!key) return "";
  const clean = hex.replace(/\s+/g, "");
  if (clean.length % 2 !== 0 || /[^0-9a-f]/i.test(clean)) return null;

  const keyBytes = new TextEncoder().encode(key);
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) {
    const byte = parseInt(clean.substr(i * 2, 2), 16);
    out[i] = byte ^ keyBytes[i % keyBytes.length];
  }
  return new TextDecoder().decode(out);
}

const MORSE = {
  a: ".-", b: "-...", c: "-.-.", d: "-..", e: ".", f: "..-.", g: "--.", h: "....",
  i: "..", j: ".---", k: "-.-", l: ".-..", m: "--", n: "-.", o: "---", p: ".--.",
  q: "--.-", r: ".-.", s: "...", t: "-", u: "..-", v: "...-", w: ".--", x: "-..-",
  y: "-.--", z: "--..", 0: "-----", 1: ".----", 2: "..---", 3: "...--", 4: "....-",
  5: ".....", 6: "-....", 7: "--...", 8: "---..", 9: "----.",
};
const MORSE_REVERSE = Object.fromEntries(Object.entries(MORSE).map(([k, v]) => [v, k]));

function toMorse(text) {
  return text
    .toLowerCase()
    .split("")
    .map((c) => (c === " " ? "/" : MORSE[c] || ""))
    .filter(Boolean)
    .join(" ");
}

function fromMorse(code) {
  return code
    .trim()
    .split(/\s+/)
    .map((token) => (token === "/" ? " " : MORSE_REVERSE[token] || ""))
    .join("");
}

export default function CipherTool({ notify }) {
  const [mode, setMode] = useState("caesar");
  const [decode, setDecode] = useState(false);
  const [text, setText] = useState("");
  const [shift, setShift] = useState(13);
  const [key, setKey] = useState("cybernexus");

  const output = useMemo(() => {
    if (!text.trim()) return { value: "" };

    switch (mode) {
      case "caesar":
        return { value: caesar(text, decode ? -shift : shift) };
      case "atbash":
        // Atbash is its own inverse, so direction does not matter.
        return { value: atbash(text) };
      case "reverse":
        return { value: [...text].reverse().join("") };
      case "morse":
        return { value: decode ? fromMorse(text) : toMorse(text) };
      case "xor": {
        if (!key) return { error: "XOR uchun kalit kerak." };
        if (decode) {
          const out = xorFromHex(text, key);
          return out === null ? { error: "Kirish hex bo'lishi kerak (masalan 1a2b3c)." } : { value: out };
        }
        return { value: xorToHex(text, key) };
      }
      default:
        return { value: "" };
    }
  }, [mode, decode, text, shift, key]);

  const bruteForce = useMemo(() => {
    if (mode !== "caesar" || !text.trim()) return null;
    return Array.from({ length: 26 }, (_, i) => ({ shift: i, text: caesar(text, -i) }));
  }, [mode, text]);

  return (
    <ToolShell
      icon={Shuffle}
      eyebrow="Classic ciphers"
      title="Klassik shifrlar"
      description="O'quv maqsadidagi shifrlar. Hech biri zamonaviy himoya bermaydi — faqat CTF va tushunish uchun."
      tone="plasma"
      emptyHint="Matn kiriting."
      result={
        output.error ? (
          <div className="flex items-start gap-3 rounded-xl border border-plasma/40 bg-plasma/10 p-4">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-plasma" />
            <p className="text-sm text-white/70">{output.error}</p>
          </div>
        ) : output.value ? (
          <div className="space-y-3">
            <CodeBlock>{output.value}</CodeBlock>

            {bruteForce ? (
              <details className="rounded-xl border border-white/10 bg-black/30">
                <summary className="cursor-pointer px-4 py-3 text-xs font-bold uppercase tracking-[.16em] text-white/45 hover:text-white/75">
                  Barcha 26 siljish (brute force)
                </summary>
                <div className="max-h-56 overflow-auto border-t border-white/8 px-4 py-3">
                  {bruteForce.map((r) => (
                    <div key={r.shift} className="flex gap-3 py-0.5 font-mono text-[11px]">
                      <span className="w-6 shrink-0 tabular-nums text-white/25">{r.shift}</span>
                      <span className="break-all text-white/60">{r.text}</span>
                    </div>
                  ))}
                </div>
              </details>
            ) : null}

            <p className="text-[11px] leading-relaxed text-white/25">
              Bu shifrlar bir necha soniyada buziladi. Haqiqiy maxfiylik uchun
              AES yoki age/GPG kabi zamonaviy vositalardan foydalaning.
            </p>
          </div>
        ) : null
      }
      onCopy={
        output.value
          ? async () => {
              const ok = await safeCopy(output.value);
              notify?.(ok ? { type: "success", title: "Nusxalandi" } : { type: "error", title: "Nusxalab bo'lmadi" });
            }
          : undefined
      }
      onClear={() => setText("")}
    >
      <Field label="Algoritm">
        <SegmentedControl options={MODES} value={mode} onChange={setMode} ariaLabel="Shifr turi" />
      </Field>

      {mode !== "atbash" && mode !== "reverse" ? (
        <Field label="Yo'nalish">
          <SegmentedControl
            options={[
              { value: "encode", label: "Shifrlash" },
              { value: "decode", label: "Ochish" },
            ]}
            value={decode ? "decode" : "encode"}
            onChange={(v) => setDecode(v === "decode")}
            ariaLabel="Yo'nalish"
          />
        </Field>
      ) : null}

      {mode === "caesar" ? (
        <Field label={`Siljish — ${shift}`} hint="13 = ROT13.">
          <input
            type="range"
            min={1}
            max={25}
            value={shift}
            onChange={(e) => setShift(Number(e.target.value))}
            className="w-full accent-[#ff2d95]"
            aria-label="Caesar siljishi"
          />
        </Field>
      ) : null}

      {mode === "xor" ? (
        <Field label="Kalit" hint="Kalit takrorlanadi — uzunroq kalit yaxshiroq.">
          <input
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-full rounded-xl border border-white/12 bg-black/40 px-4 py-3 font-mono text-sm text-white outline-none focus:border-plasma/70"
          />
        </Field>
      ) : null}

      <Field label="Matn">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={mode === "morse" && decode ? ".... . .-.. .-.. ---" : "Matn..."}
          spellCheck={false}
          className={textareaClass}
        />
      </Field>
    </ToolShell>
  );
}
