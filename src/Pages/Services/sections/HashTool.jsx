import React, { useState } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";
import * as CryptoJS from "crypto-js";
import { FaFingerprint, FaCopy, FaTrash } from "react-icons/fa";

import Glass from "./ui/Glass";
import { safeCopy } from "./ui/utils";

export default function HashTool({ notify }) {
  const [input, setInput] = useState("");
  const [type, setType] = useState("SHA256");
  const [hash, setHash] = useState("");

  const generate = () => {
    const s = input.trim();
    if (!s) {
      notify?.({ type: "warn", title: "Bo‘sh", message: "Matn kiriting." });
      return;
    }
    let out = "";
    switch (type) {
      case "MD5":
        out = CryptoJS.MD5(s).toString();
        break;
      case "SHA1":
        out = CryptoJS.SHA1(s).toString();
        break;
      case "SHA256":
      default:
        out = CryptoJS.SHA256(s).toString();
        break;
    }
    setHash(out);
    notify?.({ type: "success", title: "Hash yaratildi", message: type });
  };

  const copy = async () => {
    if (!hash) return;
    const ok = await safeCopy(hash);
    notify?.(
      ok ? { type: "success", title: "Nusxalandi" } : { type: "error", title: "Copy ishlamadi" }
    );
  };

  const reset = () => {
    setInput("");
    setHash("");
    notify?.({ type: "success", title: "Tozalandi" });
  };

  return (
    <Glass className="p-5 sm:p-6">
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Left */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-lg border border-cyber-500/40 bg-cyber-500/10 grid place-items-center shadow-glow-cyan">
              <FaFingerprint className="text-cyber-300" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-black tracking-widest text-cyber-300/90">
                HASH GENERATOR
              </div>
              <h2 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-white truncate">
                Hash yaratish
              </h2>
            </div>
          </div>

          <p className="mt-3 text-sm text-white/55 leading-relaxed">
            MD5 / SHA1 / SHA256. (Eslatma: MD5/SHA1 legacy, ko‘p hollarda SHA-256 tavsiya qilinadi.)
          </p>

          <div className="mt-4">
            <div className="text-[11px] font-black tracking-widest text-white/45">INPUT</div>
            <textarea
              rows={5}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Matn kiriting..."
              className={classNames(
                "mt-2 w-full rounded-2xl border bg-void-850/60 backdrop-blur px-4 py-3 text-sm",
                "border-signal-500/35 text-signal-300 placeholder:text-white/35",
                "focus:outline-none focus:border-cyber-500 focus:shadow-glow-cyan"
              )}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-3">
            <div>
              <div className="text-[11px] font-black tracking-widest text-white/45">ALGORITHM</div>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={classNames(
                  "mt-2 w-full rounded-2xl border bg-void-850/60 backdrop-blur px-4 py-3 text-sm",
                  "border-signal-500/35 text-signal-300",
                  "focus:outline-none focus:border-cyber-500 focus:shadow-glow-cyan"
                )}
              >
                <option value="MD5">MD5</option>
                <option value="SHA1">SHA1</option>
                <option value="SHA256">SHA256</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-end">
              <motion.button
                type="button"
                onClick={generate}
                className={classNames(
                  "flex-1 rounded-2xl border border-signal-500 bg-gradient-to-r from-signal-400 to-cyber-400",
                  "px-5 py-3 text-sm font-black tracking-widest text-black shadow-glow-sm hover:shadow-glow-cyan transition-all"
                )}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Generate
              </motion.button>

              <button
                type="button"
                onClick={reset}
                className="rounded-2xl border border-cyber-500/40 bg-cyber-500/10 px-5 py-3 text-sm font-black tracking-widest text-cyber-300 hover:border-signal-500 hover:text-signal-300 transition-all inline-flex items-center justify-center gap-2"
              >
                <FaTrash className="text-[14px]" /> Reset
              </button>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="w-full lg:w-[520px]">
          <div className="rounded-2xl border border-white/10 bg-white/[.035] backdrop-blur-xl p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[11px] font-black tracking-widest text-white/45">RESULT</div>
                <div className="mt-1 text-sm font-bold tracking-tight text-white truncate">
                  {hash ? `${type} hash` : "Hali natija yo‘q"}
                </div>
              </div>

              <button
                type="button"
                onClick={copy}
                disabled={!hash}
                className={classNames(
                  "rounded-lg border px-3 py-2 text-xs font-black tracking-widest transition-all inline-flex items-center gap-2",
                  hash
                    ? "border-cyber-500/30 bg-cyber-500/10 text-cyber-300 hover:border-signal-500 hover:text-signal-300"
                    : "border-white/10 bg-white/[0.03] text-white/35 cursor-not-allowed"
                )}
              >
                <FaCopy /> Copy
              </button>
            </div>

            <div className="mt-3 max-h-[420px] overflow-y-auto no-scrollbar rounded-xl border border-signal-500/20 bg-void-850/50 p-3">
              <div className="text-sm text-gray-200 break-all">{hash || "—"}</div>
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
