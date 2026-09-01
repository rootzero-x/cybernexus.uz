// src/Pages/Contact/contact.jsx
import React, { useState } from "react";
import classNames from "classnames";
import {
  Send,
  Github,
  Instagram,
  Mail,
  MessageCircle,
  Globe,
  Copy,
  Check,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from "lucide-react";

import { apiFetch } from "../../api/client";
import { safeCopy } from "../Services/sections/ui/utils";
import {
  HoloCard,
  Eyebrow,
  Display,
  Accent,
  Section,
  Reveal,
  NeonButton,
} from "../../design";

const CHANNELS = [
  {
    key: "telegram",
    label: "Telegram",
    handle: "@rootzero_x",
    href: "https://t.me/rootzero_x",
    icon: Send,
    tone: "cyber",
    note: "Eng tez javob — odatda bir necha soat ichida.",
    primary: true,
  },
  {
    key: "email",
    label: "Email",
    handle: "rootzero.xz@gmail.com",
    href: "mailto:rootzero.xz@gmail.com",
    icon: Mail,
    tone: "signal",
    note: "Rasmiy takliflar va uzun xatlar uchun.",
    copyable: true,
  },
  {
    key: "github",
    label: "GitHub",
    handle: "rootzero-x",
    href: "https://github.com/rootzero-x",
    icon: Github,
    tone: "signal",
    note: "Kod, issue va pull request.",
  },
  {
    key: "instagram",
    label: "Instagram",
    handle: "@rootzero.x",
    href: "https://www.instagram.com/rootzero.x/",
    icon: Instagram,
    tone: "cyber",
    note: "Yangiliklar va kundalik yozuvlar.",
  },
  {
    key: "site",
    label: "Sayt",
    handle: "cybernexus.uz",
    href: "https://cybernexus.uz",
    icon: Globe,
    tone: "signal",
    note: "Platformaning o'zi.",
  },
];

const SUBJECTS = [
  "Umumiy savol",
  "Hamkorlik taklifi",
  "Xavfsizlik hisoboti",
  "Xatolik haqida xabar",
  "Boshqa",
];

function ChannelCard({ channel }) {
  const [copied, setCopied] = useState(false);
  const Icon = channel.icon;

  const copy = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const ok = await safeCopy(channel.handle);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  return (
    <a
      href={channel.href}
      target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="group block h-full focus:outline-none"
    >
      <HoloCard glow={channel.tone} className="flex h-full flex-col">
        <div className="flex items-start gap-3">
          <span
            className={classNames(
              "grid h-11 w-11 shrink-0 place-items-center rounded-xl border",
              channel.tone === "cyber"
                ? "border-cyber-500/35 bg-cyber-500/10 text-cyber-400"
                : "border-signal-500/35 bg-signal-500/10 text-signal-400",
            )}
          >
            <Icon className="h-5 w-5" />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-display text-base font-bold text-white">
                {channel.label}
              </span>
              {channel.primary ? (
                <span className="rounded-full border border-signal-500/35 bg-signal-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-signal-300">
                  Tavsiya
                </span>
              ) : null}
            </div>
            <div className="mt-0.5 truncate font-mono text-xs text-white/45">
              {channel.handle}
            </div>
          </div>

          {channel.copyable ? (
            <button
              type="button"
              onClick={copy}
              aria-label={`${channel.handle} nusxalash`}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 text-white/35 transition-colors hover:border-signal-400/50 hover:text-signal-300"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-signal-400" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          ) : null}
        </div>

        <p className="mt-3 text-xs leading-relaxed text-white/40">{channel.note}</p>
      </HoloCard>
    </a>
  );
}

export const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: SUBJECTS[0],
    message: "",
    website: "", // honeypot
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorText, setErrorText] = useState("");

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setErrors({});
    setErrorText("");

    try {
      await apiFetch("/contact/send.php", {
        method: "POST",
        body: form,
        skipAuth: true,
        timeoutMs: 25000,
      });
      setStatus("sent");
      setForm({ name: "", email: "", subject: SUBJECTS[0], message: "", website: "" });
    } catch (err) {
      // 422 carries per-field messages; anything else is a single banner.
      if (err.status === 422 && err.data?.errors) {
        setErrors(err.data.errors);
        setStatus("idle");
      } else {
        setErrorText(err.message || "Xabarni yuborib bo'lmadi.");
        setStatus("error");
      }
    }
  };

  const fieldClass = (key) =>
    classNames(
      "w-full rounded-xl border bg-black/40 px-4 py-3 text-sm text-white",
      "placeholder:text-white/25 outline-none transition-all duration-200",
      errors[key]
        ? "border-plasma/60 focus:border-plasma"
        : "border-white/12 focus:border-signal-400/70 focus:bg-signal-500/5 focus:shadow-glow-sm",
    );

  const charCount = form.message.length;

  return (
    <div className="pb-24 pt-14 sm:pt-20">
      {/* ---------------- Hero ---------------- */}
      <Section width="wide">
        <Reveal>
          <Eyebrow tone="cyber">Bog'lanish</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <Display size="lg" className="mt-5">
            Savol, taklif yoki <Accent>zaiflik hisoboti.</Accent>
          </Display>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/55">
            Quyidagi kanallardan birini tanlang yoki formani to'ldiring — xabar
            to'g'ridan-to'g'ri pochtaga tushadi.
          </p>
        </Reveal>
      </Section>

      {/* ---------------- Channels ---------------- */}
      <Section width="wide" className="mt-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHANNELS.map((c, i) => (
            <Reveal key={c.key} delay={i * 70}>
              <ChannelCard channel={c} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------- Form + policy ---------------- */}
      <Section width="wide" className="mt-16">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
          {/* Form */}
          <Reveal>
            <HoloCard glow="signal">
              <Eyebrow tone="signal">Xabar yuborish</Eyebrow>
              <h2 className="mt-3 font-display text-2xl font-bold text-white">
                To'g'ridan-to'g'ri yozing
              </h2>

              {status === "sent" ? (
                <div className="mt-6 rounded-2xl border border-signal-500/40 bg-signal-500/10 p-6 text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-signal-400" />
                  <div className="mt-4 font-display text-lg font-bold text-white">
                    Xabaringiz yuborildi
                  </div>
                  <p className="mx-auto mt-2 max-w-sm text-sm text-white/50">
                    Rahmat. Odatda bir kun ichida javob beriladi — tezroq kerak
                    bo'lsa Telegram orqali yozing.
                  </p>
                  <NeonButton
                    variant="ghost"
                    size="sm"
                    className="mt-5"
                    onClick={() => setStatus("idle")}
                  >
                    Yana xabar yuborish
                  </NeonButton>
                </div>
              ) : (
                <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
                  {status === "error" ? (
                    <div className="flex items-start gap-3 rounded-xl border border-plasma/40 bg-plasma/10 p-4">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-plasma" />
                      <p className="text-sm text-white/70">{errorText}</p>
                    </div>
                  ) : null}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="Ismingiz" error={errors.name}>
                      <input
                        value={form.name}
                        onChange={set("name")}
                        placeholder="Ism familiya"
                        autoComplete="name"
                        className={fieldClass("name")}
                      />
                    </FormField>

                    <FormField label="Email" error={errors.email}>
                      <input
                        type="email"
                        value={form.email}
                        onChange={set("email")}
                        placeholder="siz@example.com"
                        autoComplete="email"
                        className={fieldClass("email")}
                      />
                    </FormField>
                  </div>

                  <FormField label="Mavzu" error={errors.subject}>
                    <select
                      value={form.subject}
                      onChange={set("subject")}
                      className={fieldClass("subject")}
                    >
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s} className="bg-void-900">
                          {s}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  <FormField
                    label="Xabar"
                    error={errors.message}
                    hint={`${charCount} / 5000 belgi`}
                  >
                    <textarea
                      value={form.message}
                      onChange={set("message")}
                      placeholder="Nima haqida yozmoqchisiz?"
                      rows={6}
                      maxLength={5000}
                      className={classNames(fieldClass("message"), "resize-y")}
                    />
                  </FormField>

                  {/* Honeypot — hidden from people, tempting to bots. */}
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <label>
                      Website
                      <input
                        value={form.website}
                        onChange={set("website")}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </label>
                  </div>

                  <NeonButton
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full"
                    size="lg"
                  >
                    {status === "sending" ? (
                      <>
                        <Clock className="h-4 w-4 animate-spin" />
                        Yuborilmoqda
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Yuborish
                      </>
                    )}
                  </NeonButton>
                </form>
              )}
            </HoloCard>
          </Reveal>

          {/* Policy */}
          <Reveal delay={120} y={26}>
            <div className="space-y-4">
              <HoloCard glow="cyber">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-4.5 w-4.5 text-cyber-400" />
                  <h3 className="font-display text-base font-bold text-white">
                    Zaiflik topsangiz
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  Platformada xavfsizlik muammosini topsangiz, uni ommaga e'lon
                  qilishdan oldin yozing. Mavzuda{" "}
                  <span className="text-cyber-300">Xavfsizlik hisoboti</span> ni
                  tanlang.
                </p>
                <ul className="mt-4 space-y-2">
                  {[
                    "Qadamlarni takrorlash mumkin bo'lsin",
                    "Ta'sir doirasini tushuntiring",
                    "Boshqalarning ma'lumotiga tegmang",
                    "Tuzatilgunicha oshkor qilmang",
                  ].map((line) => (
                    <li key={line} className="flex gap-2 text-xs leading-relaxed text-white/45">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyber-400" />
                      {line}
                    </li>
                  ))}
                </ul>
              </HoloCard>

              <HoloCard glow="signal">
                <div className="flex items-center gap-2.5">
                  <MessageCircle className="h-4.5 w-4.5 text-signal-400" />
                  <h3 className="font-display text-base font-bold text-white">
                    Javob muddati
                  </h3>
                </div>
                <dl className="mt-4 space-y-2.5">
                  {[
                    ["Telegram", "Bir necha soat"],
                    ["Forma / Email", "1–2 kun"],
                    ["Xavfsizlik hisoboti", "Ustuvor"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between gap-3 text-xs">
                      <dt className="text-white/40">{k}</dt>
                      <dd className="font-bold text-white/70">{v}</dd>
                    </div>
                  ))}
                </dl>
              </HoloCard>
            </div>
          </Reveal>
        </div>
      </Section>
    </div>
  );
};

function FormField({ label, error, hint, children }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between gap-2">
        <span className="text-[11px] font-bold uppercase tracking-[.18em] text-white/40">
          {label}
        </span>
        {hint ? <span className="text-[11px] tabular-nums text-white/25">{hint}</span> : null}
      </span>
      {children}
      {error ? (
        <span className="mt-1.5 flex items-center gap-1.5 text-xs text-plasma">
          <AlertTriangle className="h-3 w-3" />
          {error}
        </span>
      ) : null}
    </label>
  );
}

export default Contact;
