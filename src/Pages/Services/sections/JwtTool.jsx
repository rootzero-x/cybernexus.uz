import React, { useMemo, useState } from "react";
import { FileKey, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

import ToolShell, { Field, textareaClass, CodeBlock } from "./ui/ToolShell";
import { safeCopy } from "./ui/utils";

function b64urlDecode(part) {
  let s = part.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  const bin = atob(s);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

/**
 * Decode a JWT locally.
 *
 * Decoding is not verification: without the signing key this can only read
 * what the token claims, and the UI says so plainly. Pasting a token into a
 * site that verified server-side would mean handing over a live credential.
 */
function decodeJwt(raw) {
  const token = raw.trim();
  if (!token) return null;

  const parts = token.split(".");
  if (parts.length !== 3) {
    return { error: "JWT uch qismdan iborat bo'lishi kerak (header.payload.signature)." };
  }

  try {
    const header = JSON.parse(b64urlDecode(parts[0]));
    const payload = JSON.parse(b64urlDecode(parts[1]));
    return { header, payload, signature: parts[2] };
  } catch {
    return { error: "Qismlarni dekodlab bo'lmadi — base64url yoki JSON buzuq." };
  }
}

const TIME_CLAIMS = { exp: "Muddati tugaydi", iat: "Berilgan", nbf: "Amal qila boshlaydi" };

function fmtClaimTime(seconds) {
  if (typeof seconds !== "number") return null;
  return new Date(seconds * 1000).toLocaleString("uz-UZ");
}

export default function JwtTool({ notify }) {
  const [raw, setRaw] = useState("");
  const decoded = useMemo(() => decodeJwt(raw), [raw]);

  const status = useMemo(() => {
    if (!decoded || decoded.error) return null;
    const exp = decoded.payload?.exp;
    if (typeof exp !== "number") return { kind: "unknown", text: "exp da'vosi yo'q — muddati noma'lum" };

    const now = Math.floor(Date.now() / 1000);
    if (exp < now) {
      const ago = Math.floor((now - exp) / 60);
      return { kind: "expired", text: `Muddati tugagan (${ago} daqiqa oldin)` };
    }
    const left = Math.floor((exp - now) / 60);
    return { kind: "valid", text: `Yaroqli — ${left} daqiqa qoldi` };
  }, [decoded]);

  const pretty = decoded && !decoded.error ? JSON.stringify(decoded.payload, null, 2) : "";

  return (
    <ToolShell
      icon={FileKey}
      eyebrow="JWT decoder"
      title="JSON Web Token o'qish"
      description="Token brauzeringizda dekodlanadi — hech qayerga yuborilmaydi."
      tone="cyber"
      emptyHint="JWT joylashtiring — header va payload shu yerda ochiladi."
      result={
        decoded ? (
          decoded.error ? (
            <div className="flex items-start gap-3 rounded-xl border border-plasma/40 bg-plasma/10 p-4">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-plasma" />
              <p className="text-sm text-white/70">{decoded.error}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {status ? (
                <div
                  className={
                    status.kind === "expired"
                      ? "flex items-center gap-2 rounded-xl border border-plasma/40 bg-plasma/10 p-3 text-sm text-plasma"
                      : status.kind === "valid"
                        ? "flex items-center gap-2 rounded-xl border border-signal-500/35 bg-signal-500/10 p-3 text-sm text-signal-300"
                        : "flex items-center gap-2 rounded-xl border border-white/12 bg-black/30 p-3 text-sm text-white/50"
                  }
                >
                  {status.kind === "valid" ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                  ) : (
                    <Clock className="h-4 w-4 shrink-0" />
                  )}
                  {status.text}
                </div>
              ) : null}

              <Block label="Header">
                <CodeBlock>{JSON.stringify(decoded.header, null, 2)}</CodeBlock>
              </Block>

              <Block label="Payload">
                <CodeBlock>{pretty}</CodeBlock>
              </Block>

              {Object.keys(TIME_CLAIMS).some((k) => typeof decoded.payload?.[k] === "number") ? (
                <Block label="Vaqt da'volari">
                  <dl className="space-y-1.5 rounded-xl border border-white/10 bg-black/30 p-3 text-xs">
                    {Object.entries(TIME_CLAIMS).map(([claim, label]) => {
                      const value = fmtClaimTime(decoded.payload?.[claim]);
                      if (!value) return null;
                      return (
                        <div key={claim} className="flex justify-between gap-3">
                          <dt className="text-white/35">
                            {label} <span className="font-mono">({claim})</span>
                          </dt>
                          <dd className="text-right text-white/70">{value}</dd>
                        </div>
                      );
                    })}
                  </dl>
                </Block>
              ) : null}

              <div className="flex items-start gap-2 rounded-xl border border-ember/30 bg-ember/[.07] p-3">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ember" />
                <p className="text-[11px] leading-relaxed text-white/50">
                  Bu faqat <strong className="text-white/70">dekodlash</strong>, tekshirish emas.
                  Imzo kalitsiz tasdiqlanmaydi — token o'zi haqida nima deyayotganini
                  ko'rsatadi, xolos. Boshqa birovning amaldagi tokenini hech qayerga
                  joylashtirmang.
                </p>
              </div>
            </div>
          )
        ) : null
      }
      onCopy={
        pretty
          ? async () => {
              const ok = await safeCopy(pretty);
              notify?.(ok ? { type: "success", title: "Payload nusxalandi" } : { type: "error", title: "Nusxalab bo'lmadi" });
            }
          : undefined
      }
      onClear={() => setRaw("")}
    >
      <Field label="JWT" hint="eyJhbGciOi... ko'rinishidagi uch qismli token.">
        <textarea
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.signature"
          spellCheck={false}
          className={textareaClass}
        />
      </Field>
    </ToolShell>
  );
}

function Block({ label, children }) {
  return (
    <div>
      <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[.2em] text-white/35">
        {label}
      </div>
      {children}
    </div>
  );
}
