import React, { useMemo, useState } from "react";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import {
  KeyRound,
  QrCode,
  Fingerprint,
  Code2,
  ShieldCheck,
  X,
  ExternalLink,
  Lock,
  FileKey,
  Network,
  Shuffle,
  ScanSearch,
  Link2,
} from "lucide-react";

import Toast from "./sections/ui/Toast";
import UuidTool from "./sections/UuidTool";
import QrTool from "./sections/QrTool";
import HashTool from "./sections/HashTool";
import Base64Tool from "./sections/Base64Tool";
import PasswordTool from "./sections/PasswordTool";
import JwtTool from "./sections/JwtTool";
import SubnetTool from "./sections/SubnetTool";
import CipherTool from "./sections/CipherTool";
import HashIdTool from "./sections/HashIdTool";
import UrlTool from "./sections/UrlTool";

import {
  HoloCard,
  Eyebrow,
  Display,
  Accent,
  NeonButton,
  Section,
  Reveal,
} from "../../design";

const TOOLS = [
  {
    key: "password",
    label: "Parol",
    icon: Lock,
    tone: "signal",
    blurb: "Kriptografik xavfsiz parol va entropiya hisobi.",
  },
  {
    key: "uuid",
    label: "UUID",
    icon: KeyRound,
    tone: "signal",
    blurb: "1 dan 10 000 gacha UUID v4 generatsiya qiling.",
  },
  {
    key: "qr",
    label: "QR Code",
    icon: QrCode,
    tone: "cyber",
    blurb: "Matn yoki URL dan QR kod — xavfli prefikslar bloklanadi.",
  },
  {
    key: "hash",
    label: "Hash",
    icon: Fingerprint,
    tone: "signal",
    blurb: "MD5, SHA-1, SHA-256 va SHA-512 hash hisoblash.",
  },
  {
    key: "hashid",
    label: "Hash ID",
    icon: ScanSearch,
    tone: "signal",
    blurb: "Hash turini uzunlik va format bo'yicha aniqlash.",
  },
  {
    key: "base64",
    label: "Base64",
    icon: Code2,
    tone: "cyber",
    blurb: "Base64 kodlash va dekodlash, unicode qo'llab-quvvatlanadi.",
  },
  {
    key: "url",
    label: "URL",
    icon: Link2,
    tone: "cyber",
    blurb: "URL kodlash, ochish va shubhali havolalarni tahlil qilish.",
  },
  {
    key: "jwt",
    label: "JWT",
    icon: FileKey,
    tone: "cyber",
    blurb: "JSON Web Token'ni ochib, muddatini tekshirish.",
  },
  {
    key: "subnet",
    label: "Subnet",
    icon: Network,
    tone: "cyber",
    blurb: "CIDR bo'yicha tarmoq, maska va xostlar hisobi.",
  },
  {
    key: "cipher",
    label: "Shifrlar",
    icon: Shuffle,
    tone: "plasma",
    blurb: "Caesar, Atbash, XOR, Morze — CTF va o'quv uchun.",
  },
];

const TIPS = [
  {
    title: "QR kodlar",
    body: "Faqat ishonchli URL'lardan foydalaning. http/https bo'lmagan javascript: yoki data: kabi prefikslar bloklanadi.",
  },
  {
    title: "Hash algoritmlari",
    body: "MD5 va SHA-1 eskirgan (legacy). Xavfsizlik muhim bo'lgan joyda SHA-256 yoki undan yuqorisini ishlating.",
  },
  {
    title: "Base64 — shifrlash emas",
    body: "Bu faqat kodlash. Sirni yashirish uchun mutlaqo mos emas — istalgan odam bir soniyada ochadi.",
  },
  {
    title: "Katta hajmlar",
    body: "Ko'p UUID generatsiya qilganda natijani ekranda emas, copy yoki download orqali oling.",
  },
];

function ToolTab({ tool, active, onClick }) {
  const Icon = tool.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={classNames(
        "group relative flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5",
        "text-xs font-bold uppercase tracking-[.14em] transition-all duration-300 ease-spring",
        active
          ? tool.tone === "signal"
            ? "border-signal-400/60 bg-signal-500/12 text-signal-200 shadow-glow-sm"
            : "border-cyber-400/60 bg-cyber-500/12 text-cyber-200 shadow-glow-cyan"
          : "border-white/10 bg-white/[.02] text-white/45 hover:border-white/25 hover:text-white/80",
      )}
    >
      <Icon className="h-4 w-4" />
      {tool.label}
      {active ? (
        <span className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-transparent via-current to-transparent" />
      ) : null}
    </button>
  );
}

export const Services = () => {
  const [tab, setTab] = useState("password");
  const [tipsOpen, setTipsOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const notify = (t) => setToast({ id: Date.now(), ...t });

  const active = useMemo(() => TOOLS.find((t) => t.key === tab) || TOOLS[0], [tab]);

  const renderTool = () => {
    switch (tab) {
      case "password":
        return <PasswordTool notify={notify} />;
      case "qr":
        return <QrTool notify={notify} />;
      case "hash":
        return <HashTool notify={notify} />;
      case "hashid":
        return <HashIdTool notify={notify} />;
      case "base64":
        return <Base64Tool notify={notify} />;
      case "url":
        return <UrlTool notify={notify} />;
      case "jwt":
        return <JwtTool notify={notify} />;
      case "subnet":
        return <SubnetTool notify={notify} />;
      case "cipher":
        return <CipherTool notify={notify} />;
      default:
        return <UuidTool notify={notify} />;
    }
  };

  return (
    <div className="pb-24 pt-14 sm:pt-20">
      {/* ---------------- Hero ---------------- */}
      <Section width="wide">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div>
            <Reveal>
              <Eyebrow tone="cyber">Tools · 10 ta vosita</Eyebrow>
            </Reveal>

            <Reveal delay={80}>
              <Display size="lg" className="mt-5">
                Kundalik <Accent>xavfsizlik vositalari.</Accent>
              </Display>
            </Reveal>

            <Reveal delay={150}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/55">
                Parol generatoridan CIDR kalkulyatorigacha — hammasi brauzeringizda
                ishlaydi. Hech qanday ma'lumot serverga yuborilmaydi.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <HoloCard glow={active.tone}>
              <div className="flex items-center gap-3">
                <span
                  className={classNames(
                    "grid h-10 w-10 place-items-center rounded-xl border",
                    active.tone === "signal"
                      ? "border-signal-500/35 bg-signal-500/10 text-signal-400"
                      : "border-cyber-500/35 bg-cyber-500/10 text-cyber-400",
                  )}
                >
                  <active.icon className="h-4.5 w-4.5" />
                </span>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[.22em] text-white/40">
                    Tanlangan vosita
                  </div>
                  <div className="font-display text-lg font-bold text-white">
                    {active.label}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/50">
                {active.blurb}
              </p>
            </HoloCard>
          </Reveal>
        </div>
      </Section>

      {/* ---------------- Sticky tool bar ---------------- */}
      <Section width="wide" className="mt-10">
        <div className="sticky top-16 z-30">
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-void-900/80 p-2.5 backdrop-blur-xl shadow-panel">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {TOOLS.map((t) => (
                <ToolTab
                  key={t.key}
                  tool={t}
                  active={tab === t.key}
                  onClick={() => setTab(t.key)}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setTipsOpen(true)}
              className="hidden shrink-0 items-center gap-2 rounded-xl border border-white/10 px-3.5 py-2.5 text-xs font-bold uppercase tracking-[.14em] text-white/50 transition-colors hover:border-signal-400/50 hover:text-signal-300 sm:inline-flex"
            >
              <ShieldCheck className="h-4 w-4" />
              Tips
            </button>
          </div>
        </div>
      </Section>

      {/* ---------------- Tool surface ---------------- */}
      <Section width="wide" className="mt-6">
        {/* No mode="wait": that holds the incoming tool until the outgoing
            one finishes exiting, and in a tab the browser is not painting
            that exit never completes — the panel would stay on the previous
            tool forever. A plain keyed fade cannot get stuck. */}
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          {renderTool()}
        </motion.div>
      </Section>

      {/* ---------------- Tips modal ---------------- */}
      <AnimatePresence>
        {tipsOpen ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Security tips"
          >
            <div
              className="absolute inset-0 bg-void-950/80 backdrop-blur-sm"
              onClick={() => setTipsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl"
            >
              <HoloCard glow="cyber" interactive={false}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-signal-500/35 bg-signal-500/10">
                      <ShieldCheck className="h-5 w-5 text-signal-400" />
                    </span>
                    <div>
                      <Eyebrow tone="cyber">Responsible use</Eyebrow>
                      <div className="mt-1.5 font-display text-xl font-bold text-white">
                        Xavfsizlik bo'yicha eslatmalar
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setTipsOpen(false)}
                    aria-label="Yopish"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 text-white/50 transition-colors hover:border-white/30 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {TIPS.map((t) => (
                    <div
                      key={t.title}
                      className="rounded-xl border border-white/8 bg-black/30 p-4"
                    >
                      <div className="text-sm font-bold text-signal-300">{t.title}</div>
                      <p className="mt-1.5 text-xs leading-relaxed text-white/45">
                        {t.body}
                      </p>
                    </div>
                  ))}
                </div>

                <NeonButton
                  as="a"
                  href="https://cybernexus.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full"
                >
                  Open CyberNexus
                  <ExternalLink className="h-4 w-4" />
                </NeonButton>
              </HoloCard>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Toast toast={toast} onClose={() => setToast(null)} />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Services;
