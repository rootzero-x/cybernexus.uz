import React, { useMemo, useState } from "react";
import { Network, AlertTriangle } from "lucide-react";

import ToolShell, { Field, inputClass } from "./ui/ToolShell";
import { calculateSubnet } from "./lib/net";
import { safeCopy } from "./ui/utils";

export default function SubnetTool({ notify }) {
  const [value, setValue] = useState("192.168.1.10/24");
  const result = useMemo(() => calculateSubnet(value), [value]);

  const summary =
    result && !result.error
      ? [
          `Tarmoq:      ${result.network}/${result.prefix}`,
          `Maska:       ${result.netmask}`,
          `Wildcard:    ${result.wildcard}`,
          `Broadcast:   ${result.broadcast}`,
          `Birinchi:    ${result.firstHost}`,
          `Oxirgi:      ${result.lastHost}`,
          `Xostlar:     ${result.usable.toLocaleString("uz-UZ")}`,
          `Turi:        ${result.kind}`,
        ].join("\n")
      : "";

  return (
    <ToolShell
      icon={Network}
      eyebrow="Subnet calculator"
      title="CIDR va tarmoq hisobi"
      description="IPv4 manzil va prefiksdan tarmoq chegaralari, maska va foydalanish mumkin bo'lgan xostlar sonini hisoblaydi."
      tone="cyber"
      emptyHint="CIDR kiriting — masalan 10.0.0.0/8"
      result={
        result ? (
          result.error ? (
            <div className="flex items-start gap-3 rounded-xl border border-plasma/40 bg-plasma/10 p-4">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-plasma" />
              <p className="text-sm text-white/70">{result.error}</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="rounded-xl border border-cyber-500/30 bg-cyber-500/[.07] p-4">
                <div className="text-[10px] font-bold uppercase tracking-[.2em] text-white/35">
                  Tarmoq
                </div>
                <div className="mt-1 font-mono text-lg font-bold text-cyber-300">
                  {result.network}/{result.prefix}
                </div>
                <div className="mt-1 text-xs text-white/40">{result.kind}</div>
              </div>

              <dl className="grid grid-cols-2 gap-2">
                <Cell label="Maska" value={result.netmask} />
                <Cell label="Wildcard" value={result.wildcard} />
                <Cell label="Birinchi xost" value={result.firstHost} />
                <Cell label="Oxirgi xost" value={result.lastHost} />
                <Cell label="Broadcast" value={result.broadcast} />
                <Cell
                  label="Xostlar"
                  value={result.usable.toLocaleString("uz-UZ")}
                  hint={`jami ${result.total.toLocaleString("uz-UZ")}`}
                />
              </dl>

              <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                <div className="text-[10px] font-bold uppercase tracking-[.2em] text-white/35">
                  Maska (binar)
                </div>
                <div className="mt-1 break-all font-mono text-[11px] text-signal-300">
                  {result.binaryMask}
                </div>
              </div>

              {result.prefix >= 31 ? (
                <p className="text-[11px] leading-relaxed text-white/30">
                  /31 va /32 da tarmoq va broadcast manzillari ajratilmaydi —
                  shuning uchun barcha manzillar foydalanishga yaroqli.
                </p>
              ) : null}
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
      <Field label="IP / CIDR" hint="Prefiks yozilmasa /24 deb olinadi.">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="192.168.1.10/24"
          spellCheck={false}
          className={inputClass + " font-mono"}
        />
      </Field>

      <div className="flex flex-wrap gap-1.5">
        {["10.0.0.0/8", "172.16.0.0/12", "192.168.1.0/24", "10.10.5.0/26", "203.0.113.7/31"].map(
          (preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setValue(preset)}
              className="rounded-lg border border-white/10 bg-white/[.02] px-2.5 py-1.5 font-mono text-[11px] text-white/45 transition-colors hover:border-cyber-400/50 hover:text-cyber-300"
            >
              {preset}
            </button>
          ),
        )}
      </div>
    </ToolShell>
  );
}

function Cell({ label, value, hint }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-3">
      <dt className="text-[10px] font-bold uppercase tracking-[.16em] text-white/35">{label}</dt>
      <dd className="mt-1 font-mono text-sm text-white/75">{value}</dd>
      {hint ? <dd className="mt-0.5 text-[10px] text-white/25">{hint}</dd> : null}
    </div>
  );
}
