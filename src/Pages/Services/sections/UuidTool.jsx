import React, { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import classNames from "classnames";
import { FaCopy, FaDownload, FaKey, FaTrash } from "react-icons/fa";

import Glass from "./ui/Glass";
import { clamp, downloadText, safeCopy } from "./ui/utils";

export default function UuidTool({ notify }) {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState([]);
  const [error, setError] = useState("");

  const total = uuids.length;

  const preview = useMemo(() => {
    // UI performance: preview first 300, but copy/download uses all
    return uuids.slice(0, 300);
  }, [uuids]);

  const generate = () => {
    const n = Number(count);
    if (!Number.isFinite(n) || n < 1 || n > 10000) {
      setError("Son 1 dan 10,000 gacha bo‘lishi kerak.");
      notify?.({ type: "error", title: "Noto‘g‘ri son", message: "1..10,000 oralig‘ini tanlang." });
      return;
    }
    setError("");
    const list = Array.from({ length: n }, () => uuidv4());
    setUuids(list);
    notify?.({ type: "success", title: "UUID yaratildi", message: `${n} ta UUID tayyor.` });
  };

  const copyOne = async (t) => {
    const ok = await safeCopy(t);
    notify?.(
      ok
        ? { type: "success", title: "Nusxalandi", message: "UUID clipboard’ga ko‘chirildi." }
        : { type: "error", title: "Copy ishlamadi", message: "Brauzer clipboard’ni bloklagan bo‘lishi mumkin." }
    );
  };

  const copyAll = async () => {
    if (!uuids.length) return;
    const ok = await safeCopy(uuids.join("\n"));
    notify?.(
      ok
        ? { type: "success", title: "Barchasi nusxalandi", message: `${uuids.length} ta UUID.` }
        : { type: "error", title: "Copy ishlamadi", message: "Clipboard ruxsatini tekshiring." }
    );
  };

  const downloadAll = () => {
    if (!uuids.length) return;
    downloadText("uuids.txt", uuids.join("\n"));
    notify?.({ type: "success", title: "Yuklab olindi", message: "uuids.txt fayl tayyor." });
  };

  const clear = () => {
    setUuids([]);
    setError("");
    notify?.({ type: "success", title: "Tozalandi" });
  };

  return (
    <Glass className="p-5 sm:p-6">
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Left */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-lg border border-cyber-500/40 bg-cyber-500/10 grid place-items-center shadow-glow-cyan">
              <FaKey className="text-cyber-300" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-black tracking-widest text-cyber-300/90">
                UUID GENERATOR
              </div>
              <h2 className="mt-1 text-xl sm:text-2xl font-black tracking-wider text-signal-300 truncate">
                UUID yaratish
              </h2>
            </div>
          </div>

          <p className="mt-3 text-sm text-white/55 leading-relaxed">
            1 dan 10,000 gacha UUID generatsiya qiling. Natijani 1-click nusxalash yoki txt
            ko‘rinishida yuklab olish mumkin.
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-3 items-end">
            <div>
              <div className="text-[11px] font-black tracking-widest text-white/45">
                COUNT (1..10000)
              </div>
              <input
                type="number"
                value={count}
                min={1}
                max={10000}
                onChange={(e) => setCount(clamp(parseInt(e.target.value || "1", 10) || 1, 1, 10000))}
                className={classNames(
                  "mt-2 w-full rounded-2xl border bg-void-850/60 backdrop-blur px-4 py-3 text-sm",
                  "border-signal-500/35 text-signal-300 placeholder:text-white/35",
                  "focus:outline-none focus:border-cyber-500 focus:shadow-glow-cyan"
                )}
              />
              {error ? <div className="mt-2 text-xs text-red-400 font-bold">{error}</div> : null}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                type="button"
                onClick={generate}
                className={classNames(
                  "flex-1 rounded-2xl border border-signal-500 bg-gradient-to-r from-signal-400 to-cyber-400",
                  "px-5 py-3 text-sm font-black tracking-widest text-black shadow-glow-sm hover:shadow-glow-cyan transition-all",
                  "inline-flex items-center justify-center gap-2"
                )}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Generate <FaKey className="text-[14px]" />
              </motion.button>

              <button
                type="button"
                onClick={clear}
                className="rounded-2xl border border-cyber-500/40 bg-cyber-500/10 px-5 py-3 text-sm font-black tracking-widest text-cyber-300 hover:border-signal-500 hover:text-signal-300 transition-all inline-flex items-center justify-center gap-2"
              >
                Clear <FaTrash className="text-[14px]" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={copyAll}
              disabled={!uuids.length}
              className={classNames(
                "rounded-lg border px-3 py-2 text-xs font-black tracking-widest transition-all inline-flex items-center gap-2",
                uuids.length
                  ? "border-signal-500/30 bg-void-850/50 text-gray-200 hover:border-signal-500 hover:text-signal-300"
                  : "border-white/10 bg-white/[0.03] text-white/35 cursor-not-allowed"
              )}
            >
              <FaCopy /> Copy All
            </button>

            <button
              type="button"
              onClick={downloadAll}
              disabled={!uuids.length}
              className={classNames(
                "rounded-lg border px-3 py-2 text-xs font-black tracking-widest transition-all inline-flex items-center gap-2",
                uuids.length
                  ? "border-cyber-500/30 bg-cyber-500/10 text-cyber-300 hover:border-signal-500 hover:text-signal-300"
                  : "border-white/10 bg-white/[0.03] text-white/35 cursor-not-allowed"
              )}
            >
              <FaDownload /> Download .txt
            </button>
          </div>
        </div>

        {/* Right (Results) */}
        <div className="w-full lg:w-[520px]">
          <div className="rounded-2xl border border-signal-500/35 bg-void-850/60 backdrop-blur p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[11px] font-black tracking-widest text-white/45">
                  RESULTS
                </div>
                <div className="mt-1 text-sm font-black tracking-wider text-signal-300 truncate">
                  {total ? `${total} ta UUID` : "Hali natija yo‘q"}
                </div>
                {total > preview.length ? (
                  <div className="mt-1 text-[11px] text-white/35">
                    Preview: {preview.length} ta ko‘rsatilmoqda (copy/download hammasini oladi)
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-3 max-h-[420px] overflow-y-auto no-scrollbar rounded-xl border border-signal-500/20 bg-void-850/50">
              {total ? (
                <ul className="p-3 space-y-2">
                  {preview.map((id) => (
                    <li
                      key={id}
                      className="flex items-start justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3"
                    >
                      <span className="text-sm text-gray-200 break-all">{id}</span>
                      <button
                        type="button"
                        onClick={() => copyOne(id)}
                        className="shrink-0 rounded-lg border border-cyber-500/30 bg-cyber-500/10 px-3 py-2 text-xs font-black tracking-widest text-cyber-300 hover:border-signal-500 hover:text-signal-300 transition-all inline-flex items-center gap-2"
                      >
                        <FaCopy /> Copy
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-6 text-center">
                  <div className="text-cyber-300 font-black tracking-widest">NO DATA</div>
                  <div className="mt-2 text-sm text-white/45">
                    Count tanlang va Generate bosing.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </Glass>
  );
}
