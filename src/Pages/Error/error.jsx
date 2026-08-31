// src/pages/Error/Error.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaHome, FaArrowLeft, FaSearch } from "react-icons/fa";

/**
 * ✅ CyberNexus 404 — Help design language
 * - Glass card + neon borders/shadows
 * - Soft grid background (no heavy matrix spam)
 * - Framer Motion premium entrance
 */

export const Error = () => {
  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.href = "https://cybernexus.uz";
  };

  return (
    <div className="relative w-full min-h-screen font-mono text-signal-300 overflow-x-hidden">
      {/* soft grid background (same spirit as Help) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,170,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,170,.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* subtle glow blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-signal-500/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* top mini bar like Help */}
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-xl border border-signal-500/25 bg-void-850/60 backdrop-blur px-3 py-2">
            <span className="text-[11px] font-black tracking-widest text-cyber-300">
              SYSTEM
            </span>
            <span className="text-[11px] font-bold tracking-widest text-white/45">
              ROUTE NOT FOUND
            </span>
          </div>

          <a
            href="https://cybernexus.uz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-cyber-500/30 bg-cyber-500/10 px-3 py-2 text-[11px] font-black tracking-widest text-cyber-300 hover:border-signal-500 hover:text-signal-300 transition-all"
          >
            <FaHome className="text-[12px]" />
            CYBERNEXUS.UZ
          </a>
        </div>

        {/* main glass card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mt-6"
        >
          <div className="rounded-2xl border-2 border-signal-500/40 bg-void-850/55 backdrop-blur-xl shadow-glow-sm overflow-hidden">
            {/* header strip */}
            <div className="border-b border-signal-500/15 bg-void-850/50 px-5 sm:px-7 py-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-[11px] font-black tracking-widest text-cyber-300">
                    ERROR STATUS
                  </div>
                  <div className="mt-1 flex items-baseline gap-3">
                    <div className="text-3xl sm:text-4xl font-black tracking-wider text-signal-300">
                      404
                    </div>
                    <div className="text-sm sm:text-base font-bold tracking-widest text-white/45">
                      Sahifa topilmadi
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 rounded-xl border border-cyber-500/30 bg-cyber-500/10 px-3 py-2">
                  <FaSearch className="text-cyber-300/80 text-[12px]" />
                  <span className="text-[11px] font-bold tracking-widest text-cyber-300/90">
                    URL / ROUTE CHECK
                  </span>
                </div>
              </div>
            </div>

            {/* body */}
            <div className="px-5 sm:px-7 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_.8fr] gap-6 lg:gap-8 items-center">
                {/* left: message */}
                <div className="min-w-0">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
                    className="inline-flex items-center gap-3"
                  >
                    <div className="h-12 w-12 rounded-xl border border-cyber-500/40 bg-cyber-500/10 grid place-items-center shadow-glow-cyan">
                      <span className="text-2xl">⚠️</span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xl sm:text-2xl font-black tracking-wider text-signal-300 truncate">
                        Marshrut topilmadi
                      </div>
                      <div className="mt-1 text-[11px] font-bold tracking-widest text-cyber-300/80">
                        NOT FOUND • TRY AGAIN
                      </div>
                    </div>
                  </motion.div>

                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/55">
                    Kechirasiz, siz qidirgan manzil mavjud emas yoki noto‘g‘ri
                    kiritilgan. Agar havola sizga yuborilgan bo‘lsa — qayta
                    tekshirib ko‘ring yoki bosh sahifaga qayting.
                  </p>

                  {/* actions */}
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={goBack}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-signal-500/60 bg-void-850/60 px-5 py-3 text-sm font-black tracking-widest text-signal-300 shadow-glow-sm hover:border-cyber-500 hover:text-cyber-300 hover:shadow-glow-cyan transition-all"
                    >
                      <FaArrowLeft className="text-[13px]" />
                      ORQAGA
                    </button>

                    <a
                      href="https://cybernexus.uz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-signal-500 bg-gradient-to-r from-signal-400 to-cyber-400 px-5 py-3 text-sm font-black tracking-widest text-black shadow-glow-sm hover:shadow-glow-cyan transition-all"
                    >
                      <FaHome className="text-[13px]" />
                      BOSH SAHIFA
                    </a>
                  </div>

                  {/* hint box */}
                  <div className="mt-6 rounded-xl border border-signal-500/20 bg-void-850/50 p-4">
                    <div className="text-[11px] font-black tracking-widest text-white/45">
                      TIP
                    </div>
                    <p className="mt-2 text-sm text-signal-300/80 leading-relaxed">
                      Agar bu xato doimiy chiqsa: route nomlari, deploy base
                      path va hosting rewrite sozlamalarini tekshiring.
                    </p>
                  </div>
                </div>

                {/* right: status panel */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
                  className="rounded-2xl border-2 border-cyber-500/35 bg-void-850/60 backdrop-blur p-5 shadow-glow-cyan"
                >
                  <div className="text-[11px] font-black tracking-widest text-cyber-300">
                    DIAGNOSTIC PANEL
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="rounded-xl border border-signal-500/20 bg-void-850/50 p-4">
                      <div className="text-[11px] font-bold tracking-widest text-white/45">
                        REQUESTED PATH
                      </div>
                      <div className="mt-2 text-sm font-black tracking-wider text-signal-300 break-all">
                        {typeof window !== "undefined"
                          ? window.location.pathname
                          : "/"}
                      </div>
                    </div>

                    <div className="rounded-xl border border-signal-500/20 bg-void-850/50 p-4">
                      <div className="text-[11px] font-bold tracking-widest text-white/45">
                        POSSIBLE REASONS
                      </div>
                      <ul className="mt-2 text-sm text-signal-300/80 leading-relaxed list-disc pl-5 space-y-1">
                        <li>Route hali qo‘shilmagan yoki o‘chirilgan</li>
                        <li>Deploy base path/rewrite noto‘g‘ri</li>
                        <li>Havola xato yoki eskirgan</li>
                      </ul>
                    </div>

                    <a
                      href="https://cybernexus.uz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-2xl border border-signal-500/40 bg-void-850/50 p-4 hover:border-cyber-500 hover:shadow-glow-cyan transition-all"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-sm font-black tracking-wider text-signal-300 truncate">
                            Go to CyberNexus
                          </div>
                          <div className="mt-1 text-[11px] font-bold tracking-widest text-cyber-300/80 truncate">
                            OPEN IN NEW TAB →
                          </div>
                        </div>
                        <div className="h-10 w-10 rounded-xl border border-cyber-500/40 bg-cyber-500/10 grid place-items-center">
                          <FaHome className="text-cyber-300" />
                        </div>
                      </div>
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* footer strip */}
            <div className="border-t border-signal-500/15 bg-void-850/50 px-5 sm:px-7 py-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="text-[11px] text-white/35">
                  CyberNexus • Premium UI • Glass + Neon
                </div>
                <div className="text-[11px] font-bold tracking-widest text-cyber-300/80">
                  STATUS: NOT_FOUND
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* small utilities */}
        <style>{`
          /* optional: if you already have these in globals, remove this block */
          .shadow-glow-sm { box-shadow: 0 0 18px rgba(0,255,170,.18); }
          .shadow-glow-cyan { box-shadow: 0 0 18px rgba(0,170,255,.18); }
        `}</style>
      </div>
    </div>
  );
};

export default Error;
