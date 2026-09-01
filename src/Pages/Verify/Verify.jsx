// src/Pages/Verify/Verify.jsx
import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  ShieldX,
  Search,
  BadgeCheck,
  AlertTriangle,
  Award,
} from "lucide-react";

import { verifyCertificate } from "../../api/certificates";
import {
  HoloCard,
  Eyebrow,
  Display,
  Accent,
  Section,
  Reveal,
  NeonButton,
} from "../../design";

const REASONS = {
  format: "Bu ID CyberNexus formatiga mos emas (CNX- va 8 ta belgi).",
  not_found: "Bunday sertifikat topilmadi.",
  revoked: "Bu sertifikat bekor qilingan.",
  unavailable: "Tekshiruv xizmati vaqtincha ishlamayapti.",
};

function fmtDate(unix) {
  if (!unix) return "";
  return new Date(unix * 1000).toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Public certificate check.
 *
 * Deliberately outside the protected routes: the point of a certificate id is
 * that someone who does not have an account here can confirm it.
 */
export const Verify = () => {
  const { certId: routeId } = useParams();
  const navigate = useNavigate();

  const [value, setValue] = useState(routeId || "");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const check = useCallback(async (id) => {
    const trimmed = id.trim();
    if (!trimmed) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      setResult(await verifyCertificate(trimmed));
    } catch (e) {
      setError(e.message || "Tekshirib bo'lmadi.");
    } finally {
      setLoading(false);
    }
  }, []);

  // A shared link like /verify/CNX-XXXXXXXX should resolve without a click.
  useEffect(() => {
    if (routeId) check(routeId);
  }, [routeId, check]);

  const submit = (e) => {
    e.preventDefault();
    const id = value.trim().toUpperCase();
    if (!id) return;
    // Keep the URL shareable as the user checks.
    navigate(`/verify/${encodeURIComponent(id)}`, { replace: true });
    check(id);
  };

  const valid = result?.found && result?.valid;

  return (
    <div className="flex min-h-[80vh] items-center pb-24 pt-14 sm:pt-20">
      <Section width="default">
        <Reveal>
          <Eyebrow tone="cyber">Sertifikat tekshiruvi</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <Display size="lg" className="mt-5">
            Sertifikat <Accent>haqiqiyligini tekshiring.</Accent>
          </Display>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/55">
            Sertifikat raqamini kiriting — u haqiqatan berilganmi va kimga
            tegishli ekanini ko'rsatamiz. Hisob talab qilinmaydi.
          </p>
        </Reveal>

        <Reveal delay={210}>
          <form onSubmit={submit} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="CNX-XXXXXXXX"
                spellCheck={false}
                aria-label="Sertifikat raqami"
                className="w-full rounded-xl border border-white/12 bg-black/40 py-3 pl-10 pr-4 font-mono text-sm uppercase tracking-wider text-white placeholder:normal-case placeholder:tracking-normal placeholder:text-white/25 outline-none transition-all focus:border-signal-400/70 focus:bg-signal-500/5 focus:shadow-glow-sm"
              />
            </div>
            <NeonButton type="submit" disabled={loading || !value.trim()} size="lg">
              {loading ? "Tekshirilmoqda..." : "Tekshirish"}
            </NeonButton>
          </form>
        </Reveal>

        {error ? (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-plasma/40 bg-plasma/10 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-plasma" />
            <p className="text-sm text-white/70">{error}</p>
          </div>
        ) : null}

        {result ? (
          <div className="mt-8">
            {valid ? (
              <HoloCard glow="signal" interactive={false}>
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-signal-500/40 bg-signal-500/12">
                    <BadgeCheck className="h-6 w-6 text-signal-400" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-signal-300">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Haqiqiy sertifikat
                    </div>
                    <h2 className="mt-2 font-display text-2xl font-bold text-white">
                      {result.full_name}
                    </h2>
                    <p className="mt-1 font-mono text-xs text-white/40">{result.cert_id}</p>
                  </div>
                </div>

                <dl className="mt-6 grid gap-3 sm:grid-cols-3">
                  <Stat label="Natija" value={`${result.score} / ${result.total}`} />
                  <Stat label="Foiz" value={`${result.percent}%`} highlight />
                  <Stat label="Daraja" value={result.grade} />
                </dl>

                <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/8 bg-black/25 px-4 py-3">
                  <Award className="h-4 w-4 shrink-0 text-white/30" />
                  <span className="text-xs text-white/45">
                    Berilgan sana: <span className="text-white/70">{fmtDate(result.issued_at)}</span>
                  </span>
                </div>
              </HoloCard>
            ) : (
              <HoloCard glow="plasma" interactive={false}>
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-plasma/40 bg-plasma/12">
                    <ShieldX className="h-6 w-6 text-plasma" />
                  </span>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[.2em] text-plasma">
                      Tasdiqlanmadi
                    </div>
                    <h2 className="mt-2 font-display text-xl font-bold text-white">
                      {REASONS[result.reason] || "Sertifikat tasdiqlanmadi."}
                    </h2>
                    {result.cert_id ? (
                      <p className="mt-2 font-mono text-xs text-white/35">
                        Tekshirilgan: {result.cert_id}
                      </p>
                    ) : null}
                  </div>
                </div>
              </HoloCard>
            )}
          </div>
        ) : null}

        <Reveal delay={260}>
          <p className="mt-8 text-xs leading-relaxed text-white/30">
            Har bir sertifikat imtihon topshirilganda serverda qayd etiladi.
            Faqat sertifikatda chop etilgan ma'lumot ko'rsatiladi — egasining
            elektron pochtasi va hisob ma'lumotlari oshkor qilinmaydi.
          </p>
        </Reveal>
      </Section>
    </div>
  );
};

function Stat({ label, value, highlight }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-4">
      <dt className="text-[10px] font-bold uppercase tracking-[.18em] text-white/35">{label}</dt>
      <dd
        className={
          highlight
            ? "mt-1 font-display text-2xl font-bold tabular-nums text-signal-300"
            : "mt-1 font-display text-2xl font-bold tabular-nums text-white"
        }
      >
        {value}
      </dd>
    </div>
  );
}

export default Verify;
