import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";
import { FaTimes } from "react-icons/fa";

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => onClose?.(), toast.duration ?? 2200);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          className="fixed z-[60] right-4 bottom-4 w-[min(420px,calc(100vw-2rem))]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <div
            className={classNames(
              "rounded-2xl border bg-black/85 backdrop-blur p-4 shadow-glow-sm",
              toast.type === "error"
                ? "border-red-500/50"
                : toast.type === "warn"
                ? "border-yellow-400/40"
                : "border-signal-500/40"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-xs font-black tracking-widest text-cyber-300/90">
                  {toast.type === "error"
                    ? "ERROR"
                    : toast.type === "warn"
                    ? "WARNING"
                    : "DONE"}
                </div>
                <div className="mt-1 text-sm font-black tracking-wider text-signal-300 break-words">
                  {toast.title || "OK"}
                </div>
                {toast.message ? (
                  <div className="mt-1 text-xs text-white/55 leading-relaxed break-words">
                    {toast.message}
                  </div>
                ) : null}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="shrink-0 rounded-lg border border-cyber-500/40 bg-cyber-500/10 p-2 text-cyber-300 hover:border-signal-500 hover:text-signal-300 transition-all"
                aria-label="close toast"
              >
                <FaTimes />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
