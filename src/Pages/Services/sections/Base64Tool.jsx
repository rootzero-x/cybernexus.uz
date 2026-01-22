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
            <div className="h-11 w-11 rounded-lg border border-neon-blue/40 bg-neon-blue/10 grid place-items-center shadow-neon-blue">
              <FaCode className="text-neon-blue" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-black tracking-widest text-neon-blue/90">
                BASE64 TOOL
              </div>
              <h2 className="mt-1 text-xl sm:text-2xl font-black tracking-wider text-neon-green truncate">
                Base64 encode / decode
              </h2>
            </div>
          </div>

          <p className="mt-3 text-sm text-gray-300/90 leading-relaxed">
            UTF-8 bilan to‘g‘ri encode/decode qiladi. (Eslatma: Base64 shifrlash emas.)
          </p>

          <div className="mt-4">
            <div className="text-[11px] font-black tracking-widest text-gray-400">INPUT</div>
            <textarea
              rows={6}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Matn yoki Base64 kiriting..."
              className={classNames(
                "mt-2 w-full rounded-xl border-2 bg-black/60 backdrop-blur px-4 py-3 text-sm",
                "border-neon-green/35 text-neon-green placeholder:text-gray-500",
                "focus:outline-none focus:border-neon-blue focus:shadow-neon-blue"
              )}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <motion.button
              type="button"
              onClick={encode}
              className={classNames(
                "rounded-xl border-2 border-neon-green bg-gradient-to-r from-neon-green to-neon-blue",
                "px-5 py-3 text-sm font-black tracking-widest text-black shadow-neon hover:shadow-neon-blue transition-all"
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
                "rounded-xl border-2 border-neon-blue/40 bg-neon-blue/10",
                "px-5 py-3 text-sm font-black tracking-widest text-neon-blue hover:border-neon-green hover:text-neon-green transition-all"
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
                  ? "border-neon-blue/30 bg-neon-blue/10 text-neon-blue hover:border-neon-green hover:text-neon-green"
                  : "border-white/10 bg-white/[0.03] text-gray-500 cursor-not-allowed"
              )}
            >
              <FaCopy /> Copy result
            </button>

            <button
              type="button"
              onClick={reset}
              className="rounded-lg border border-neon-green/30 bg-black/50 px-3 py-2 text-xs font-black tracking-widest text-gray-200 hover:border-neon-green hover:text-neon-green transition-all inline-flex items-center gap-2"
            >
              <FaTrash /> Reset
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="w-full lg:w-[520px]">
          <div className="rounded-xl border-2 border-neon-green/35 bg-black/60 backdrop-blur p-4">
            <div className="text-[11px] font-black tracking-widest text-gray-400">RESULT</div>
            <div className="mt-3 max-h-[460px] overflow-y-auto no-scrollbar rounded-xl border border-neon-green/20 bg-black/50 p-3">
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
