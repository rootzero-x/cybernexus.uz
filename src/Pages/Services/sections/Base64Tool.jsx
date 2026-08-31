import React, { useState } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";
import { FaCode, FaCopy, FaTrash } from "react-icons/fa";

import Glass from "./ui/Glass";
import { base64DecodeUtf8, base64EncodeUtf8, safeCopy } from "./ui/utils";

export default function Base64Tool({ notify }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const encode = () => {
    try {
      const out = base64EncodeUtf8(input);
      setResult(out);
      notify?.({ type: "success", title: "Encoded", message: "Base64 tayyor." });
    } catch (e) {
      setResult("Xatolik: UTF-8 encode bo‘lmadi.");
      notify?.({ type: "error", title: "Encode xatolik", message: String(e?.message || e) });
    }
  };

  const decode = () => {
    try {
      const out = base64DecodeUtf8(input.trim());
      setResult(out);
      notify?.({ type: "success", title: "Decoded", message: "Matn tiklandi." });
    } catch (e) {
      setResult("Xatolik: Yaroqli Base64 kiriting.");
      notify?.({ type: "error", title: "Decode xatolik", message: "Base64 format noto‘g‘ri." });
    }
  };

  const copy = async () => {
    if (!result) return;
    const ok = await safeCopy(result);
    notify?.(ok ? { type: "success", title: "Nusxalandi" } : { type: "error", title: "Copy ishlamadi" });
  };

  const reset = () => {
    setInput("");
    setResult("");
    notify?.({ type: "success", title: "Tozalandi" });
  };

  return (
    <Glass className="p-5 sm:p-6">
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Left */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-lg border border-cyber-500/40 bg-cyber-500/10 grid place-items-center shadow-glow-cyan">
              <FaCode className="text-cyber-300" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-black tracking-widest text-cyber-300/90">
                BASE64 TOOL
              </div>
              <h2 className="mt-1 text-xl sm:text-2xl font-black tracking-wider text-signal-300 truncate">
                Base64 encode / decode
              </h2>
            </div>
          </div>

          <p className="mt-3 text-sm text-white/55 leading-relaxed">
            UTF-8 bilan to‘g‘ri encode/decode qiladi. (Eslatma: Base64 shifrlash emas.)
          </p>

          <div className="mt-4">
            <div className="text-[11px] font-black tracking-widest text-white/45">INPUT</div>
            <textarea
              rows={6}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Matn yoki Base64 kiriting..."
              className={classNames(
                "mt-2 w-full rounded-2xl border bg-void-850/60 backdrop-blur px-4 py-3 text-sm",
                "border-signal-500/35 text-signal-300 placeholder:text-white/35",
                "focus:outline-none focus:border-cyber-500 focus:shadow-glow-cyan"
              )}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <motion.button
              type="button"
              onClick={encode}
              className={classNames(
                "rounded-2xl border border-signal-500 bg-gradient-to-r from-signal-400 to-cyber-400",
                "px-5 py-3 text-sm font-black tracking-widest text-black shadow-glow-sm hover:shadow-glow-cyan transition-all"
              )}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Encode
            </motion.button>

            <motion.button
              type="button"
              onClick={decode}
              className={classNames(
                "rounded-2xl border border-cyber-500/40 bg-cyber-500/10",
                "px-5 py-3 text-sm font-black tracking-widest text-cyber-300 hover:border-signal-500 hover:text-signal-300 transition-all"
              )}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Decode
            </motion.button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={copy}
              disabled={!result}
              className={classNames(
                "rounded-lg border px-3 py-2 text-xs font-black tracking-widest transition-all inline-flex items-center gap-2",
                result
                  ? "border-cyber-500/30 bg-cyber-500/10 text-cyber-300 hover:border-signal-500 hover:text-signal-300"
                  : "border-white/10 bg-white/[0.03] text-white/35 cursor-not-allowed"
              )}
            >
              <FaCopy /> Copy result
            </button>

            <button
              type="button"
              onClick={reset}
              className="rounded-lg border border-signal-500/30 bg-void-850/50 px-3 py-2 text-xs font-black tracking-widest text-gray-200 hover:border-signal-500 hover:text-signal-300 transition-all inline-flex items-center gap-2"
            >
              <FaTrash /> Reset
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="w-full lg:w-[520px]">
          <div className="rounded-2xl border border-signal-500/35 bg-void-850/60 backdrop-blur p-4">
            <div className="text-[11px] font-black tracking-widest text-white/45">RESULT</div>
            <div className="mt-3 max-h-[460px] overflow-y-auto no-scrollbar rounded-xl border border-signal-500/20 bg-void-850/50 p-3">
              <div className="text-sm text-gray-200 break-words">{result || "—"}</div>
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
