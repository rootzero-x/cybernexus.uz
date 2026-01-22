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
            <div className="h-11 w-11 rounded-lg border border-neon-blue/40 bg-neon-blue/10 grid place-items-center shadow-neon-blue">
              <FaFingerprint className="text-neon-blue" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-black tracking-widest text-neon-blue/90">
                HASH GENERATOR
              </div>
              <h2 className="mt-1 text-xl sm:text-2xl font-black tracking-wider text-neon-green truncate">
                Hash yaratish
              </h2>
            </div>
          </div>

          <p className="mt-3 text-sm text-gray-300/90 leading-relaxed">
            MD5 / SHA1 / SHA256. (Eslatma: MD5/SHA1 legacy, ko‘p hollarda SHA-256 tavsiya qilinadi.)
          </p>

          <div className="mt-4">
            <div className="text-[11px] font-black tracking-widest text-gray-400">INPUT</div>
            <textarea
              rows={5}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Matn kiriting..."
              className={classNames(
                "mt-2 w-full rounded-xl border-2 bg-black/60 backdrop-blur px-4 py-3 text-sm",
                "border-neon-green/35 text-neon-green placeholder:text-gray-500",
                "focus:outline-none focus:border-neon-blue focus:shadow-neon-blue"
              )}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-3">
            <div>
              <div className="text-[11px] font-black tracking-widest text-gray-400">ALGORITHM</div>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={classNames(
                  "mt-2 w-full rounded-xl border-2 bg-black/60 backdrop-blur px-4 py-3 text-sm",
                  "border-neon-green/35 text-neon-green",
                  "focus:outline-none focus:border-neon-blue focus:shadow-neon-blue"
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
                  "flex-1 rounded-xl border-2 border-neon-green bg-gradient-to-r from-neon-green to-neon-blue",
                  "px-5 py-3 text-sm font-black tracking-widest text-black shadow-neon hover:shadow-neon-blue transition-all"
                )}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Generate
              </motion.button>

              <button
                type="button"
                onClick={reset}
                className="rounded-xl border-2 border-neon-blue/40 bg-neon-blue/10 px-5 py-3 text-sm font-black tracking-widest text-neon-blue hover:border-neon-green hover:text-neon-green transition-all inline-flex items-center justify-center gap-2"
              >
                <FaTrash className="text-[14px]" /> Reset
              </button>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="w-full lg:w-[520px]">
          <div className="rounded-xl border-2 border-neon-green/35 bg-black/60 backdrop-blur p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[11px] font-black tracking-widest text-gray-400">RESULT</div>
                <div className="mt-1 text-sm font-black tracking-wider text-neon-green truncate">
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
                    ? "border-neon-blue/30 bg-neon-blue/10 text-neon-blue hover:border-neon-green hover:text-neon-green"
                    : "border-white/10 bg-white/[0.03] text-gray-500 cursor-not-allowed"
                )}
              >
                <FaCopy /> Copy
              </button>
            </div>

            <div className="mt-3 max-h-[420px] overflow-y-auto no-scrollbar rounded-xl border border-neon-green/20 bg-black/50 p-3">
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
