// src/Pages/DeleteAccount/DeleteAccount.jsx
//
// The account-deletion page Google Play links to from the store listing.
//
// It is deliberately public. A reviewer — and anyone who has already
// uninstalled the app — has to be able to read what gets deleted without
// signing in first, so the explanation renders for everyone and only the
// button itself depends on a session.

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import {
  AlertTriangle,
  Award,
  Check,
  Loader2,
  Mail,
  MonitorSmartphone,
  Trash2,
  User,
} from "lucide-react";

import { AuthContext } from "../../context/AuthContext";
import { deleteMyAccount } from "../../api/profile";
import { HoloCard, Section, Reveal, Eyebrow, NeonButton } from "../../design";

/** What the server actually removes, in the order it removes it. */
const REMOVED = [
  {
    icon: User,
    title: "Hisob ma'lumotlari",
    body: "Ism, email manzil, Google profil rasmi va hisob yaratilgan sana.",
  },
  {
    icon: MonitorSmartphone,
    title: "Barcha seanslar",
    body: "Kirgan qurilmalaringiz — brauzer va mobil ilova — darhol chiqariladi.",
  },
  {
    icon: Award,
    title: "Sertifikatlar",
    body: "Olingan sertifikatlar o'chiriladi va ularning ID raqamlari tekshiruvda topilmay qoladi.",
  },
  {
    icon: Mail,
    title: "Yuborilgan xabarlar",
    body: "Aloqa formasi orqali yuborgan xabarlaringiz.",
  },
];

export const DeleteAccount = () => {
  const { user, logoutLocal } = useContext(AuthContext);

  const [typed, setTyped] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const armed = typed.trim().toUpperCase() === "DELETE";

  const onDelete = async () => {
    if (!armed || busy) return;
    setBusy(true);
    setError("");
    try {
      await deleteMyAccount();
      // The session died with the row, so the local token is now a dead key —
      // drop it here rather than letting the next request 401.
      logoutLocal?.();
      setDone(true);
    } catch (e) {
      setError(e?.message || "O'chirishda xatolik yuz berdi");
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <Section width="narrow" className="py-20">
        <HoloCard padded={false} className="p-8 text-center sm:p-12">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-cyber-500/30 bg-cyber-500/10">
            <Check className="h-7 w-7 text-cyber-300" />
          </div>
          <h1 className="mt-6 font-display text-2xl font-bold text-white">
            Hisobingiz o'chirildi
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/60">
            Hisobingiz va unga bog'langan barcha shaxsiy ma'lumotlar serverdan
            butunlay o'chirildi. Xohlasangiz, istalgan vaqtda Google orqali
            qaytadan ro'yxatdan o'tishingiz mumkin.
          </p>
          <NeonButton as={Link} to="/auth" variant="ghost" className="mt-8">
            Bosh sahifa
          </NeonButton>
        </HoloCard>
      </Section>
    );
  }

  return (
    <Section width="narrow" className="py-16 sm:py-20">
      <Reveal>
        <Eyebrow tone="muted">Cyber Nexus</Eyebrow>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Hisobni o'chirish
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60">
          Cyber Nexus hisobingizni — veb-sayt va Android ilovasi bitta hisobdan
          foydalanadi — o'zingiz o'chirishingiz mumkin. Ariza yozish yoki javob
          kutish shart emas: quyidagi tugma ma'lumotlarni darhol o'chiradi.
        </p>
      </Reveal>

      {/* What goes */}
      <Reveal delay={80}>
        <HoloCard padded={false} className="mt-10 p-6 sm:p-8">
          <h2 className="text-[11px] font-bold uppercase tracking-[.22em] text-white/45">
            O'chiriladigan ma'lumotlar
          </h2>

          <ul className="mt-6 grid gap-5 sm:grid-cols-2">
            {REMOVED.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-3">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-plasma/25 bg-plasma/10">
                  <Icon className="h-4 w-4 text-plasma" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/50">{body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[.03] p-5">
            <h3 className="text-[11px] font-bold uppercase tracking-[.22em] text-white/45">
              Saqlanib qoladigan ma'lumotlar
            </h3>
            <p className="mt-3 text-xs leading-relaxed text-white/55">
              Saytning umumiy tashrif hisoblagichi saqlanadi, lekin yozuvlar
              hisobingizdan uziladi — ular shundan keyin hech kimni ko'rsatmaydi.
              Qonun talab qilgan holatlarda server jurnallari 90 kungacha
              saqlanishi mumkin, keyin avtomatik o'chadi.
            </p>
          </div>

          <p className="mt-6 text-xs leading-relaxed text-white/40">
            Batafsil:{" "}
            <Link to="/policy" className="text-signal-300 underline-offset-4 hover:underline">
              Maxfiylik siyosati
            </Link>
            . Savol bo'lsa —{" "}
            <a
              href="mailto:cybernexus.uz@gmail.com"
              className="text-signal-300 underline-offset-4 hover:underline"
            >
              cybernexus.uz@gmail.com
            </a>
            .
          </p>
        </HoloCard>
      </Reveal>

      {/* The action */}
      <Reveal delay={160}>
        <HoloCard padded={false} glow="plasma" className="mt-8 border-plasma/25 p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-plasma" />
            <div className="min-w-0">
              <h2 className="font-display text-lg font-bold text-white">
                Bu amalni qaytarib bo'lmaydi
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                O'chirilgan sertifikatlarni tiklab bo'lmaydi va ularning
                tekshiruv havolalari ishlamay qoladi.
              </p>
            </div>
          </div>

          {user ? (
            <>
              <p className="mt-6 text-xs text-white/45">
                Hisob: <span className="font-semibold text-white/75">{user.email}</span>
              </p>

              <label className="mt-5 block">
                <span className="text-[11px] font-bold uppercase tracking-[.18em] text-white/45">
                  Tasdiqlash uchun <span className="text-plasma">DELETE</span> deb yozing
                </span>
                <input
                  value={typed}
                  onChange={(e) => setTyped(e.target.value)}
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="DELETE"
                  className={classNames(
                    "mt-2 w-full rounded-xl border bg-void-950/60 px-4 py-3",
                    "font-mono text-sm tracking-[.2em] text-white placeholder:text-white/20",
                    "outline-none transition-colors",
                    armed
                      ? "border-plasma/50 focus:border-plasma"
                      : "border-white/12 focus:border-white/30",
                  )}
                />
              </label>

              {error ? (
                <p className="mt-4 rounded-xl border border-plasma/30 bg-plasma/10 px-4 py-3 text-xs text-plasma">
                  {error}
                </p>
              ) : null}

              <NeonButton
                variant="danger"
                className="mt-6 w-full sm:w-auto"
                disabled={!armed || busy}
                onClick={onDelete}
              >
                {busy ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                {busy ? "O'chirilmoqda" : "Hisobni butunlay o'chirish"}
              </NeonButton>
            </>
          ) : (
            <>
              <p className="mt-6 text-sm leading-relaxed text-white/55">
                O'chirish uchun avval o'sha hisob bilan kiring — tizim faqat
                kirgan foydalanuvchining o'z hisobini o'chira oladi.
              </p>
              <NeonButton as={Link} to="/auth" variant="ghost" className="mt-6">
                Kirish
              </NeonButton>
            </>
          )}
        </HoloCard>
      </Reveal>
    </Section>
  );
};

export default DeleteAccount;
