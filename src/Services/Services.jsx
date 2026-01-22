import React, { useContext, useMemo, useState } from "react";
import classNames from "classnames";
import { GlobalContext } from "../GlobalState/globalstate";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLayerGroup,
  FaQrcode,
  FaKey,
  FaFingerprint,
  FaCode,
  FaTimes,
  FaExternalLinkAlt,
  FaShieldAlt,
} from "react-icons/fa";

import Glass from "./sections/ui/Glass";
import Chip from "./sections/ui/Chip";
import Toast from "./sections/ui/Toast";

import UuidTool from "./sections/UuidTool";
import QrTool from "./sections/QrTool";
import HashTool from "./sections/HashTool";
import Base64Tool from "./sections/Base64Tool";

export const Services = () => {
  const { mode } = useContext(GlobalContext);

  const tabs = useMemo(
    () => [
      { key: "uuid", label: "UUID", icon: FaKey },
      { key: "qr", label: "QR Code", icon: FaQrcode },
      { key: "hash", label: "Hash", icon: FaFingerprint },
      { key: "base64", label: "Base64", icon: FaCode },
    ],
    [],
  );

  const [tab, setTab] = useState("uuid");
  const [about, setAbout] = useState(false);

  // toast queue
  const [toast, setToast] = useState(null);
  const notify = (t) => setToast({ id: Date.now(), ...t });

  const renderTool = () => {
    switch (tab) {
      case "uuid":
        return <UuidTool notify={notify} />;
      case "qr":
        return <QrTool notify={notify} />;
      case "hash":
        return <HashTool notify={notify} />;
      case "base64":
        return <Base64Tool notify={notify} />;
      default:
        return <UuidTool notify={notify} />;
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-black font-mono text-neon-green overflow-x-hidden"
      data-mode={mode}
    >
      {/* soft grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,170,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,170,.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-12">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <Glass className="p-5 sm:p-7">
            <div className="flex flex-col lg:flex-row lg:items-center gap-5">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-lg border border-neon-blue/40 bg-neon-blue/10 grid place-items-center shadow-neon-blue">
                    <FaLayerGroup className="text-neon-blue" />
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-black tracking-wider text-neon-green truncate">
                      Services
                    </h1>
                    <p className="mt-1 text-xs sm:text-sm text-neon-blue/90 font-bold tracking-widest truncate">
                      TOOLS • UTILITIES • SECURITY-FRIENDLY
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm sm:text-base text-gray-300/90 leading-relaxed">
                  CyberNexus’ning foydali utilitalari: UUID generator, QR code
                  generator, Hash generator va Base64 encoder/decoder. Hammasi
                  bir xil premium dizaynda.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Chip
                    active={tab === "uuid"}
                    onClick={() => setTab("uuid")}
                    icon={FaKey}
                  >
                    UUID
                  </Chip>
                  <Chip
                    active={tab === "qr"}
                    onClick={() => setTab("qr")}
                    icon={FaQrcode}
                  >
                    QR Code
                  </Chip>
                  <Chip
                    active={tab === "hash"}
                    onClick={() => setTab("hash")}
                    icon={FaFingerprint}
                  >
                    Hash
                  </Chip>
                  <Chip
                    active={tab === "base64"}
                    onClick={() => setTab("base64")}
                    icon={FaCode}
                  >
                    Base64
                  </Chip>

                  <Chip
                    active={about}
                    onClick={() => setAbout(true)}
                    icon={FaShieldAlt}
                  >
                    Security tips
                  </Chip>
                </div>
              </div>

              {/* Right info card */}
              <div className="w-full lg:w-[440px]">
                <div className="rounded-xl border-2 border-neon-green/40 bg-black/60 backdrop-blur p-4 shadow-neon">
                  <div className="text-xs font-black tracking-widest text-neon-blue">
                    CURRENT TOOL
                  </div>
                  <div className="mt-2 text-lg font-black tracking-wider text-neon-green">
                    {tabs.find((t) => t.key === tab)?.label || "UUID"}
                  </div>
                  <div className="mt-2 text-sm text-gray-300/90 leading-relaxed">
                    Sticky tabs orqali tez almashing. Natijalarni 1-click
                    nusxalash, download va xavfsiz input tekshiruvlari bor.
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-[10px] font-black tracking-widest rounded-full border border-neon-green/25 bg-black/60 px-2 py-1 text-neon-green/80">
                      NO ADS
                    </span>
                    <span className="text-[10px] font-black tracking-widest rounded-full border border-neon-blue/25 bg-neon-blue/10 px-2 py-1 text-neon-blue/90">
                      PREMIUM UI
                    </span>
                    <span className="text-[10px] font-black tracking-widest rounded-full border border-neon-green/25 bg-black/60 px-2 py-1 text-neon-green/80">
                      COPY / DOWNLOAD
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Glass>
        </motion.div>

        {/* STICKY TABS */}
        <div className="sticky top-0 z-30 pt-4">
          <div className="rounded-xl border border-neon-green/25 bg-black/70 backdrop-blur-xl px-3 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                {tabs.map((t) => (
                  <Chip
                    key={t.key}
                    active={tab === t.key}
                    onClick={() => setTab(t.key)}
                    icon={t.icon}
                  >
                    {t.label}
                  </Chip>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setAbout(true)}
                className="hidden sm:inline-flex rounded-lg border border-neon-blue/30 bg-neon-blue/10 px-3 py-2 text-xs font-black tracking-widest text-neon-blue hover:border-neon-green hover:text-neon-green transition-all"
              >
                Tips
              </button>
            </div>
          </div>
        </div>

        {/* TOOL AREA */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.06 }}
        >
          {renderTool()}
        </motion.div>
      </div>

      {/* SECURITY TIPS MODAL */}
      <AnimatePresence>
        {about && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAbout(false)}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={() => setAbout(false)}
            >
              <div
                className="w-full max-w-2xl rounded-xl border-2 border-neon-blue bg-black/90 backdrop-blur p-5 shadow-neon-blue"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg border border-neon-green/35 bg-neon-green/10 grid place-items-center">
                      <FaShieldAlt className="text-neon-green text-xl" />
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl font-black tracking-wider text-neon-green">
                        Security tips (Services)
                      </div>
                      <div className="mt-1 text-xs font-bold tracking-widest text-neon-blue/90">
                        SAFE INPUT • RESPONSIBLE USE
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setAbout(false)}
                    className="rounded-lg border border-neon-blue/40 bg-neon-blue/10 p-2 text-neon-blue hover:border-neon-green hover:text-neon-green transition-all"
                    aria-label="close"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="mt-4 rounded-xl border border-neon-green/25 bg-black/60 p-4">
                  <div className="text-[11px] font-black tracking-widest text-gray-400">
                    RECOMMENDATIONS
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-neon-green/80 leading-relaxed list-disc pl-5">
                    <li>
                      QR: faqat ishonchli URL’lardan foydalaning.{" "}
                      <span className="text-neon-blue/90 font-bold">
                        http/https
                      </span>
                      bo‘lmagan “javascript:” yoki “data:” kabi xavfli prefixlar
                      bloklanadi.
                    </li>
                    <li>
                      Hash: MD5/SHA1 eski algoritmlar (legacy). Muhim xavfsizlik
                      ishlarida odatda
                      <span className="text-neon-blue/90 font-bold">
                        {" "}
                        SHA-256
                      </span>{" "}
                      tavsiya qilinadi.
                    </li>
                    <li>
                      Base64 bu shifrlash emas — faqat kodlash. Sirni yashirish
                      uchun mos emas.
                    </li>
                    <li>
                      UUID’larni ko‘p generatsiya qilsangiz ham, UI performance
                      uchun list “copy/download” orqali ishlatiladi.
                    </li>
                  </ul>

                  <button
                    type="button"
                    onClick={() =>
                      window.open(
                        "https://cybernexus.uz",
                        "_blank",
                        "noopener,noreferrer",
                      )
                    }
                    className={classNames(
                      "mt-4 w-full rounded-xl border-2 border-neon-green bg-gradient-to-r from-neon-green to-neon-blue",
                      "px-4 py-3 text-sm font-black tracking-wider text-black shadow-neon hover:shadow-neon-blue transition-all inline-flex items-center justify-center gap-2",
                    )}
                  >
                    Open CyberNexus{" "}
                    <FaExternalLinkAlt className="text-[14px]" />
                  </button>
                </div>

                <div className="mt-3 text-center text-[11px] text-gray-500">
                  Tips oynasi — faqat tavsiya. Loyihada security doim birinchi
                  o‘rinda.
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* TOAST */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* small utilities */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Services;
