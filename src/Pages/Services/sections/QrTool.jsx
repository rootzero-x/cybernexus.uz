import React, { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";
import { FaQrcode, FaDownload, FaShieldAlt } from "react-icons/fa";

import Glass from "./ui/Glass";

function isSafeInput(text) {
  const s = String(text ?? "").trim();
  if (!s) return false;

  // Block dangerous prefixes (case-insensitive)
  const lower = s.toLowerCase();
  if (lower.startsWith("javascript:") || lower.startsWith("data:")) return false;

  // Allow:
  // - http/https URLs
  // - normal text (length limited)
  const isUrl = /^https?:\/\/\S+$/i.test(s);
  const okLen = s.length <= 2000;
  return okLen && (isUrl || true);
}

export default function QrTool({ notify }) {
  const [input, setInput] = useState("");
  const [value, setValue] = useState("");
  const canvasRef = useRef(null);

  const status = useMemo(() => {
    if (!value) return "Kuting: matn yoki URL kiriting.";
    const isUrl = /^https?:\/\/\S+$/i.test(value);
    return isUrl ? "URL QR yaratildi." : "Text QR yaratildi.";
  }, [value]);

  const generate = () => {
    const s = input.trim();
    if (!s) {
      notify?.({ type: "warn", title: "Bo‘sh", message: "Matn yoki URL kiriting." });
      return;
    }
    if (!isSafeInput(s)) {
      notify?.({
        type: "error",
        title: "Xavfli input bloklandi",
        message: "“javascript:” yoki “data:” kabi xavfli prefixlar ruxsat etilmaydi.",
      });
      return;
    }
    setValue(s);
    notify?.({ type: "success", title: "QR tayyor", message: "Canvas’ga chizildi." });
  };

  useEffect(() => {
    const el = canvasRef.current;
    if (!value || !el) return;

    QRCode.toCanvas(
      el,
      value,
      {
        width: 220,
        margin: 2,
        color: { dark: "#000000", light: "#ffffff" },
      },
      (err) => {
        if (err) {
          notify?.({ type: "error", title: "QR xatolik", message: String(err?.message || err) });
        }
      }
    );
  }, [value, notify]);

  const download = () => {
    const el = canvasRef.current;
    if (!el) return;
    const link = document.createElement("a");
    link.href = el.toDataURL("image/png");
    link.download = "qrcode.png";
    link.click();
    notify?.({ type: "success", title: "Yuklab olindi", message: "qrcode.png tayyor." });
  };

  return (
    <Glass className="p-5 sm:p-6">
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Left */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-lg border border-cyber-500/40 bg-cyber-500/10 grid place-items-center shadow-glow-cyan">
              <FaQrcode className="text-cyber-300" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-black tracking-widest text-cyber-300/90">
                QR CODE GENERATOR
              </div>
              <h2 className="mt-1 text-xl sm:text-2xl font-black tracking-wider text-signal-300 truncate">
                QR kod yaratish
              </h2>
            </div>
          </div>

          <p className="mt-3 text-sm text-white/55 leading-relaxed">
            URL yoki matn kiriting. Xavfsizlik uchun “javascript:” va “data:” kabi xavfli
            prefixlar bloklanadi.
          </p>

          <div className="mt-4">
            <div className="text-[11px] font-black tracking-widest text-white/45">
              INPUT (URL yoki text)
            </div>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="https://cybernexus.uz yoki matn..."
              className={classNames(
                "mt-2 w-full rounded-2xl border bg-void-850/60 backdrop-blur px-4 py-3 text-sm",
                "border-signal-500/35 text-signal-300 placeholder:text-white/35",
                "focus:outline-none focus:border-cyber-500 focus:shadow-glow-cyan"
              )}
            />
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
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
              Generate QR
            </motion.button>

            <button
              type="button"
              onClick={() => {
                setInput("");
                setValue("");
              }}
              className="rounded-2xl border border-cyber-500/40 bg-cyber-500/10 px-5 py-3 text-sm font-black tracking-widest text-cyber-300 hover:border-signal-500 hover:text-signal-300 transition-all"
            >
              Reset
            </button>
          </div>

          <div className="mt-4 rounded-xl border border-signal-500/20 bg-void-850/50 p-4">
            <div className="flex items-center gap-2 text-xs font-black tracking-widest text-white/45">
              <FaShieldAlt className="text-cyber-300/80" /> STATUS
            </div>
            <div className="mt-2 text-sm text-signal-300/80">{status}</div>
          </div>
        </div>

        {/* Right */}
        <div className="w-full lg:w-[420px]">
          <div className="rounded-2xl border border-signal-500/35 bg-void-850/60 backdrop-blur p-4">
            <div className="text-[11px] font-black tracking-widest text-white/45">PREVIEW</div>

            <div className="mt-3 flex justify-center">
              <AnimatePresence>
                {value ? (
                  <motion.div
                    className="rounded-2xl border border-signal-500 bg-white p-4 shadow-glow-sm"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <canvas ref={canvasRef} />
                  </motion.div>
                ) : (
                  <motion.div
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-10 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-cyber-300 font-black tracking-widest">NO QR</div>
                    <div className="mt-2 text-sm text-white/45">Input kiriting va Generate bosing.</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={download}
              disabled={!value}
              className={classNames(
                "mt-4 w-full rounded-2xl border px-5 py-3 text-sm font-black tracking-widest transition-all inline-flex items-center justify-center gap-2",
                value
                  ? "border-signal-500 bg-gradient-to-r from-signal-400 to-cyber-400 text-black shadow-glow-sm hover:shadow-glow-cyan"
                  : "border-white/10 bg-white/[0.03] text-white/35 cursor-not-allowed"
              )}
            >
              <FaDownload /> Download PNG
            </button>

            <div className="mt-3 text-[11px] text-white/35 text-center">
              Ogohlantirish: noma’lum QR’larni skan qilmang.
            </div>
          </div>
        </div>
      </div>
    </Glass>
  );
}
