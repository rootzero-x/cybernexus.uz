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
    <div className="relative w-full min-h-screen bg-black font-mono text-neon-green overflow-x-hidden">
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
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-neon-blue/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-neon-green/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* top mini bar like Help */}
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-xl border border-neon-green/25 bg-black/60 backdrop-blur px-3 py-2">
            <span className="text-[11px] font-black tracking-widest text-neon-blue">
              SYSTEM
            </span>
            <span className="text-[11px] font-bold tracking-widest text-gray-400">
              ROUTE NOT FOUND
            </span>
          </div>

          <a
            href="https://cybernexus.uz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-neon-blue/30 bg-neon-blue/10 px-3 py-2 text-[11px] font-black tracking-widest text-neon-blue hover:border-neon-green hover:text-neon-green transition-all"
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
          <div className="rounded-2xl border-2 border-neon-green/40 bg-black/55 backdrop-blur-xl shadow-neon overflow-hidden">
            {/* header strip */}
            <div className="border-b border-neon-green/15 bg-black/50 px-5 sm:px-7 py-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-[11px] font-black tracking-widest text-neon-blue">
                    ERROR STATUS
                  </div>
                  <div className="mt-1 flex items-baseline gap-3">
                    <div className="text-3xl sm:text-4xl font-black tracking-wider text-neon-green">
                      404
                    </div>
                    <div className="text-sm sm:text-base font-bold tracking-widest text-gray-400">
                      Sahifa topilmadi
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 rounded-xl border border-neon-blue/30 bg-neon-blue/10 px-3 py-2">
                  <FaSearch className="text-neon-blue/80 text-[12px]" />
                  <span className="text-[11px] font-bold tracking-widest text-neon-blue/90">
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
                    <div className="h-12 w-12 rounded-xl border border-neon-blue/40 bg-neon-blue/10 grid place-items-center shadow-neon-blue">
                      <span className="text-2xl">⚠️</span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xl sm:text-2xl font-black tracking-wider text-neon-green truncate">
                        Marshrut topilmadi
                      </div>
                      <div className="mt-1 text-[11px] font-bold tracking-widest text-neon-blue/80">
                        NOT FOUND • TRY AGAIN
                      </div>
                    </div>
                  </motion.div>

                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-gray-300/90">
                    Kechirasiz, siz qidirgan manzil mavjud emas yoki noto‘g‘ri
                    kiritilgan. Agar havola sizga yuborilgan bo‘lsa — qayta
                    tekshirib ko‘ring yoki bosh sahifaga qayting.
                  </p>

                  {/* actions */}
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={goBack}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-neon-green/60 bg-black/60 px-5 py-3 text-sm font-black tracking-widest text-neon-green shadow-neon hover:border-neon-blue hover:text-neon-blue hover:shadow-neon-blue transition-all"
                    >
                      <FaArrowLeft className="text-[13px]" />
                      ORQAGA
                    </button>

                    <a
                      href="https://cybernexus.uz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-neon-green bg-gradient-to-r from-neon-green to-neon-blue px-5 py-3 text-sm font-black tracking-widest text-black shadow-neon hover:shadow-neon-blue transition-all"
                    >
                      <FaHome className="text-[13px]" />
                      BOSH SAHIFA
                    </a>
                  </div>

                  {/* hint box */}
                  <div className="mt-6 rounded-xl border border-neon-green/20 bg-black/50 p-4">
                    <div className="text-[11px] font-black tracking-widest text-gray-400">
                      TIP
                    </div>
                    <p className="mt-2 text-sm text-neon-green/80 leading-relaxed">
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
                  className="rounded-2xl border-2 border-neon-blue/35 bg-black/60 backdrop-blur p-5 shadow-neon-blue"
                >
                  <div className="text-[11px] font-black tracking-widest text-neon-blue">
                    DIAGNOSTIC PANEL
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="rounded-xl border border-neon-green/20 bg-black/50 p-4">
                      <div className="text-[11px] font-bold tracking-widest text-gray-400">
                        REQUESTED PATH
                      </div>
                      <div className="mt-2 text-sm font-black tracking-wider text-neon-green break-all">
                        {typeof window !== "undefined"
                          ? window.location.pathname
                          : "/"}
                      </div>
                    </div>

                    <div className="rounded-xl border border-neon-green/20 bg-black/50 p-4">
                      <div className="text-[11px] font-bold tracking-widest text-gray-400">
                        POSSIBLE REASONS
                      </div>
                      <ul className="mt-2 text-sm text-neon-green/80 leading-relaxed list-disc pl-5 space-y-1">
                        <li>Route hali qo‘shilmagan yoki o‘chirilgan</li>
                        <li>Deploy base path/rewrite noto‘g‘ri</li>
                        <li>Havola xato yoki eskirgan</li>
                      </ul>
                    </div>

                    <a
                      href="https://cybernexus.uz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-xl border-2 border-neon-green/40 bg-black/50 p-4 hover:border-neon-blue hover:shadow-neon-blue transition-all"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-sm font-black tracking-wider text-neon-green truncate">
                            Go to CyberNexus
                          </div>
                          <div className="mt-1 text-[11px] font-bold tracking-widest text-neon-blue/80 truncate">
                            OPEN IN NEW TAB →
                          </div>
                        </div>
                        <div className="h-10 w-10 rounded-xl border border-neon-blue/40 bg-neon-blue/10 grid place-items-center">
                          <FaHome className="text-neon-blue" />
                        </div>
                      </div>
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* footer strip */}
            <div className="border-t border-neon-green/15 bg-black/50 px-5 sm:px-7 py-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="text-[11px] text-gray-500">
                  CyberNexus • Premium UI • Glass + Neon
                </div>
                <div className="text-[11px] font-bold tracking-widest text-neon-blue/80">
                  STATUS: NOT_FOUND
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* small utilities */}
        <style>{`
          /* optional: if you already have these in globals, remove this block */
          .shadow-neon { box-shadow: 0 0 18px rgba(0,255,170,.18); }
          .shadow-neon-blue { box-shadow: 0 0 18px rgba(0,170,255,.18); }
        `}</style>
      </div>
    </div>
  );
};

export default Error;
