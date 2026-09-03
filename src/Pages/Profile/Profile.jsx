// src/Pages/Profile/Profile.jsx
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import {
  Award,
  BadgeCheck,
  Calendar,
  Check,
  Copy,
  ExternalLink,
  Eye,
  Laptop,
  Mail,
  MonitorSmartphone,
  Pencil,
  RefreshCw,
  ShieldCheck,
  ShieldX,
  Smartphone,
  Sparkles,
  TrendingUp,
  Trash2,
  X,
} from "lucide-react";

import { AuthContext } from "../../context/AuthContext";
import {
  fetchProfile,
  fetchMySessions,
  revokeMySession,
  updateProfile,
} from "../../api/profile";
import { formatDateUz, formatDateTimeUz } from "../../lib/dateUz";
import { HoloCard, Section, Reveal, Chip, NeonButton, Eyebrow } from "../../design";

/* ------------------------------------------------------------------ *
 *  Small helpers
 * ------------------------------------------------------------------ */

/** "3 kun oldin" — relative where it reads better than a date. */
function since(unixSeconds) {
  if (!unixSeconds) return "—";

  const diff = Math.floor(Date.now() / 1000) - Number(unixSeconds);
  if (diff < 60) return "hozirgina";
  if (diff < 3600) return `${Math.floor(diff / 60)} daqiqa oldin`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} soat oldin`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} kun oldin`;

  return formatDateUz(unixSeconds);
}

/**
 * A readable device name out of a user agent string.
 *
 * Deliberately coarse. The point is for the account owner to recognise their
 * own devices in a list, not to fingerprint anything — "Chrome · Windows" is
 * enough to spot the one that is not yours.
 */
function describeDevice(ua = "") {
  const browser =
    /\bEdg\//.test(ua) ? "Edge" :
    /\bOPR\/|\bOpera/.test(ua) ? "Opera" :
    /\bChrome\//.test(ua) && !/\bChromium/.test(ua) ? "Chrome" :
    /\bFirefox\//.test(ua) ? "Firefox" :
    /\bSafari\//.test(ua) ? "Safari" :
    "Brauzer";

  const os =
    /Windows NT/.test(ua) ? "Windows" :
    /Android/.test(ua) ? "Android" :
    /iPhone|iPad|iPod/.test(ua) ? "iOS" :
    /Mac OS X/.test(ua) ? "macOS" :
    /Linux/.test(ua) ? "Linux" :
    "";

  const mobile = /Android|iPhone|iPad|iPod|Mobile/.test(ua);

  return { label: os ? `${browser} · ${os}` : browser, mobile };
}

/** Copy-to-clipboard button that confirms itself and resets. */
function CopyButton({ value, label = "Nusxalash" }) {
  const [done, setDone] = useState(false);
  const timer = useRef(0);

  // A pending timeout that fires after unmount would set state on a dead
  // component; clear it on the way out.
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setDone(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setDone(false), 1600);
    } catch {
      /* clipboard blocked (insecure context, denied permission) — no-op */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      className="inline-flex items-center gap-1.5 rounded-lg border border-white/12 bg-black/30 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white/55 transition-colors hover:border-white/25 hover:text-white"
    >
      {done ? <Check className="h-3.5 w-3.5 text-signal-400" /> : <Copy className="h-3.5 w-3.5" />}
      {done ? "Nusxalandi" : label}
    </button>
  );
}

function Avatar({ url, initials, size = "h-20 w-20", text = "text-xl" }) {
  const [broken, setBroken] = useState(false);

  if (url && !broken) {
    return (
      <img
        src={url}
        alt=""
        referrerPolicy="no-referrer"
        onError={() => setBroken(true)}
        className={classNames(size, "rounded-2xl border border-white/12 object-cover")}
      />
    );
  }

  return (
    <span
      className={classNames(
        size,
        text,
        "grid place-items-center rounded-2xl border border-signal-500/30 bg-signal-500/10 font-display font-bold text-signal-300",
      )}
    >
      {initials}
    </span>
  );
}

function StatTile({ icon: Icon, label, value, hint, tone = "signal" }) {
  return (
    <HoloCard glow={tone} className="flex items-start gap-3.5">
      <span
        className={classNames(
          "grid h-10 w-10 shrink-0 place-items-center rounded-xl border",
          tone === "cyber"
            ? "border-cyber-500/30 bg-cyber-500/10"
            : "border-signal-500/30 bg-signal-500/10",
        )}
      >
        <Icon className={classNames("h-4.5 w-4.5", tone === "cyber" ? "text-cyber-400" : "text-signal-400")} />
      </span>
      <div className="min-w-0">
        <div className="font-display text-2xl font-bold tabular-nums text-white">{value}</div>
        <div className="truncate text-[11px] font-bold uppercase tracking-[.16em] text-white/40">
          {label}
        </div>
        {hint ? <div className="mt-0.5 truncate text-[11px] text-white/30">{hint}</div> : null}
      </div>
    </HoloCard>
  );
}

function EmptyState({ icon: Icon, title, body, action }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-white/10 px-6 py-12 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/[.03]">
        <Icon className="h-5 w-5 text-white/25" />
      </span>
      <h3 className="mt-4 font-display text-base font-bold text-white/70">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/40">{body}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Name editor
 * ------------------------------------------------------------------ */

function NameEditor({ value, onSaved }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value || "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  // Re-sync when the profile reloads underneath.
  useEffect(() => {
    if (!editing) setDraft(value || "");
  }, [value, editing]);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const cancel = () => {
    setEditing(false);
    setDraft(value || "");
    setError("");
  };

  const save = async () => {
    const name = draft.trim();
    if (!name || name === (value || "").trim()) return cancel();

    setBusy(true);
    setError("");
    try {
      const res = await updateProfile({ fullName: name });
      onSaved(res.full_name);
      setEditing(false);
    } catch (e) {
      setError(e.message || "Saqlab bo'lmadi");
    } finally {
      setBusy(false);
    }
  };

  if (!editing) {
    return (
      <div className="flex items-center gap-2.5">
        <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {value || "Ism kiritilmagan"}
        </h1>
        <button
          type="button"
          onClick={() => setEditing(true)}
          aria-label="Ismni tahrirlash"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 text-white/35 transition-colors hover:border-white/25 hover:text-white"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") cancel();
          }}
          maxLength={80}
          aria-label="To'liq ism"
          className="min-w-0 flex-1 rounded-xl border border-signal-500/40 bg-black/40 px-3 py-2 font-display text-xl font-bold text-white outline-none transition-colors focus:border-signal-400 focus:shadow-glow-sm"
        />
        <button
          type="button"
          onClick={save}
          disabled={busy}
          aria-label="Saqlash"
          className="grid h-9 w-9 place-items-center rounded-lg border border-signal-500/40 bg-signal-500/10 text-signal-300 transition-colors hover:bg-signal-500/20 disabled:opacity-50"
        >
          <Check className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={cancel}
          disabled={busy}
          aria-label="Bekor qilish"
          className="grid h-9 w-9 place-items-center rounded-lg border border-white/12 text-white/50 transition-colors hover:text-white disabled:opacity-50"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      {error ? <p className="mt-2 text-xs text-plasma">{error}</p> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Certificates
 * ------------------------------------------------------------------ */

function CertificateCard({ cert }) {
  const url = `${window.location.origin}/verify/${cert.cert_id}`;

  return (
    <HoloCard glow={cert.revoked ? "plasma" : "signal"} className="flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <span
          className={classNames(
            "grid h-11 w-11 shrink-0 place-items-center rounded-xl border",
            cert.revoked
              ? "border-plasma/40 bg-plasma/10"
              : "border-signal-500/40 bg-signal-500/10",
          )}
        >
          {cert.revoked ? (
            <ShieldX className="h-5 w-5 text-plasma" />
          ) : (
            <BadgeCheck className="h-5 w-5 text-signal-400" />
          )}
        </span>
        <Chip tone={cert.revoked ? "plasma" : cert.percent >= 90 ? "signal" : "cyber"}>
          {cert.revoked ? "Bekor qilingan" : cert.grade}
        </Chip>
      </div>

      <div className="mt-4 min-w-0">
        <div className="truncate font-display text-lg font-bold text-white">
          {cert.full_name}
        </div>
        <code className="mt-1 block font-mono text-xs tracking-wider text-white/40">
          {cert.cert_id}
        </code>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-lg border border-white/8 bg-black/25 px-3 py-2">
          <div className="text-[10px] font-bold uppercase tracking-[.14em] text-white/30">Ball</div>
          <div className="mt-0.5 font-display text-sm font-bold tabular-nums text-white">
            {cert.score}/{cert.total}
          </div>
        </div>
        <div className="rounded-lg border border-white/8 bg-black/25 px-3 py-2">
          <div className="text-[10px] font-bold uppercase tracking-[.14em] text-white/30">Foiz</div>
          <div className="mt-0.5 font-display text-sm font-bold tabular-nums text-signal-300">
            {cert.percent}%
          </div>
        </div>
        <div className="rounded-lg border border-white/8 bg-black/25 px-3 py-2">
          <div className="text-[10px] font-bold uppercase tracking-[.14em] text-white/30">Sana</div>
          <div className="mt-0.5 truncate text-[11px] text-white/60">
            {formatDateUz(cert.issued_at)}
          </div>
        </div>
      </div>

      {cert.revoked ? (
        <p className="mt-4 rounded-lg border border-plasma/25 bg-plasma/[.06] px-3 py-2.5 text-xs leading-relaxed text-white/50">
          Bu sertifikat bekor qilingan va tekshiruvdan o'tmaydi.
        </p>
      ) : (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Link
            to={`/verify/${cert.cert_id}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-cyber-500/35 bg-cyber-500/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-cyber-300 transition-colors hover:border-cyber-400"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Tekshirish
          </Link>
          <CopyButton value={url} label="Havola" />
        </div>
      )}
    </HoloCard>
  );
}

/* ------------------------------------------------------------------ *
 *  Devices
 * ------------------------------------------------------------------ */

function DeviceRow({ session, onRevoke, busy }) {
  const { label, mobile } = describeDevice(session.ua);
  const Icon = mobile ? Smartphone : Laptop;

  return (
    <div className="flex items-start gap-3.5 rounded-xl border border-white/8 bg-black/20 p-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[.03]">
        <Icon className="h-4.5 w-4.5 text-white/45" />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="truncate text-sm font-semibold text-white">{label}</span>
          {session.current ? (
            <span className="rounded-full border border-signal-500/30 bg-signal-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-signal-300">
              Shu qurilma
            </span>
          ) : null}
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-white/35">
          <span className="font-mono">{session.ip}</span>
          <span>Kirdi: {since(session.created_at)}</span>
          <span>Tugaydi: {formatDateUz(session.expires_at)}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onRevoke(session)}
        disabled={busy}
        className="shrink-0 rounded-lg border border-plasma/30 bg-plasma/[.07] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-plasma transition-colors hover:bg-plasma/15 disabled:opacity-40"
      >
        {session.current ? "Chiqish" : "O'chirish"}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Page
 * ------------------------------------------------------------------ */

const TABS = [
  { key: "certificates", label: "Sertifikatlar", icon: Award },
  { key: "devices", label: "Qurilmalar", icon: MonitorSmartphone },
  { key: "activity", label: "Faoliyat", icon: TrendingUp },
  { key: "messages", label: "Murojaatlar", icon: Mail },
];

export default function Profile() {
  const { user, setUser, logoutLocal } = useContext(AuthContext);

  const [data, setData] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("certificates");
  const [revoking, setRevoking] = useState(0);

  const load = useCallback(async (signal) => {
    setLoading(true);
    setError("");
    try {
      // Both are independent; firing them together halves the wait.
      const [profile, sess] = await Promise.all([
        fetchProfile({ signal }),
        fetchMySessions({ signal }),
      ]);
      setData(profile);
      setSessions(sess.items || []);
    } catch (e) {
      if (e.name === "AbortError") return;
      setError(e.message || "Profilni yuklab bo'lmadi");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const ctrl = new AbortController();
    load(ctrl.signal);
    return () => ctrl.abort();
  }, [load]);

  const account = data?.account;
  const stats = data?.stats;

  const initials = useMemo(() => {
    const name = (account?.full_name || user?.full_name || "U").trim();
    const parts = name.split(" ").filter(Boolean);
    return ((parts[0]?.[0] || "U") + (parts[1]?.[0] || "")).toUpperCase().slice(0, 2);
  }, [account, user]);

  const handleRevoke = async (session) => {
    setRevoking(session.id);
    try {
      const res = await revokeMySession(session.id);

      if (res.was_current) {
        // The token that just made this request is gone. Clearing it locally
        // and letting the guard redirect is the honest outcome — anything
        // else leaves the page looking signed in with a dead session.
        logoutLocal();
        return;
      }

      setSessions((prev) => prev.filter((s) => s.id !== session.id));
      setData((prev) =>
        prev
          ? { ...prev, stats: { ...prev.stats, active_sessions: prev.stats.active_sessions - 1 } }
          : prev,
      );
    } catch (e) {
      setError(e.message || "Sessiyani o'chirib bo'lmadi");
    } finally {
      setRevoking(0);
    }
  };

  const handleNameSaved = (fullName) => {
    setData((prev) => (prev ? { ...prev, account: { ...prev.account, full_name: fullName } } : prev));
    // Keep the header avatar/menu in step without a full refetch.
    setUser((prev) => (prev ? { ...prev, full_name: fullName } : prev));
  };

  /* ---------------- Loading ---------------- */

  if (loading && !data) {
    return (
      <div className="grid min-h-[70vh] place-items-center">
        <div className="flex flex-col items-center gap-4">
          <span className="relative h-12 w-12">
            <span className="absolute inset-0 rounded-full border border-signal-500/20" />
            <span className="absolute inset-0 animate-spin-slow rounded-full border-2 border-transparent border-t-signal-400" />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[.22em] text-white/35">
            Profil yuklanmoqda
          </span>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <Section width="narrow" className="py-24">
        <HoloCard glow="plasma" interactive={false}>
          <h1 className="font-display text-xl font-bold text-white">Profilni ochib bo'lmadi</h1>
          <p className="mt-2 text-sm text-white/50">{error}</p>
          <NeonButton variant="ghost" size="sm" className="mt-5" onClick={() => load()}>
            <RefreshCw className="h-4 w-4" />
            Qayta urinish
          </NeonButton>
        </HoloCard>
      </Section>
    );
  }

  const certificates = data?.certificates || [];
  const validCertificates = certificates.filter((c) => !c.revoked);
  const best = data?.best;

  return (
    <div className="pb-24">
      {/* ---------------- Identity ---------------- */}
      <Section width="wide" className="pt-14 sm:pt-20">
        <Reveal>
          <Eyebrow tone="cyber">Profil</Eyebrow>
        </Reveal>

        <Reveal delay={80}>
          <HoloCard glow="signal" interactive={false} className="mt-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <Avatar url={account?.avatar_url} initials={initials} />

              <div className="min-w-0 flex-1">
                <NameEditor value={account?.full_name} onSaved={handleNameSaved} />

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-white/45">
                  <span className="inline-flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" />
                    {account?.email}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    A'zo: {formatDateUz(account?.created_at)}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Chip tone="cyber">{account?.role || "user"}</Chip>
                  {account?.provider ? <Chip tone="muted">{account.provider}</Chip> : null}
                  {account?.is_active ? (
                    <Chip tone="signal">Faol</Chip>
                  ) : (
                    <Chip tone="plasma">O'chirilgan</Chip>
                  )}
                  {best && !best.revoked ? (
                    <Chip tone="signal">
                      <Sparkles className="h-3 w-3" />
                      Eng yaxshi natija {best.percent}%
                    </Chip>
                  ) : null}
                </div>
              </div>

              <div className="shrink-0 text-left sm:text-right">
                <div className="text-[11px] font-bold uppercase tracking-[.16em] text-white/35">
                  Oxirgi kirish
                </div>
                <div className="mt-1 text-sm text-white/70">
                  {account?.last_login_at ? since(account.last_login_at) : "—"}
                </div>
              </div>
            </div>
          </HoloCard>
        </Reveal>

        {/* ---------------- Stats ---------------- */}
        <Reveal delay={140}>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile
              icon={Award}
              label="Sertifikatlar"
              value={stats?.certificates ?? 0}
              hint={best && !best.revoked ? `Eng yaxshisi: ${best.grade}` : "Imtihon topshiring"}
            />
            <StatTile
              icon={MonitorSmartphone}
              label="Faol qurilmalar"
              value={stats?.active_sessions ?? 0}
              hint="Hozir kirgan"
              tone="cyber"
            />
            <StatTile
              icon={Eye}
              label="Ko'rishlar (30 kun)"
              value={stats?.views_30d ?? 0}
              hint="Sizning faoliyatingiz"
            />
            <StatTile
              icon={Calendar}
              label="Kun bizda"
              value={stats?.member_days ?? 0}
              hint={formatDateUz(account?.created_at)}
              tone="cyber"
            />
          </div>
        </Reveal>

        {/* ---------------- Tabs ---------------- */}
        <Reveal delay={190}>
          <div className="mt-10 flex flex-wrap gap-2 border-b border-white/8 pb-3">
            {TABS.map((t) => {
              const active = tab === t.key;
              const count =
                t.key === "certificates" ? certificates.length :
                t.key === "devices" ? sessions.length :
                t.key === "messages" ? (data?.messages || []).length :
                null;

              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  aria-current={active ? "page" : undefined}
                  className={classNames(
                    "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200",
                    active
                      ? "border-signal-500/40 bg-signal-500/10 text-signal-300 shadow-glow-sm"
                      : "border-white/10 bg-white/[.02] text-white/50 hover:border-white/20 hover:text-white/80",
                  )}
                >
                  <t.icon className="h-4 w-4" />
                  {t.label}
                  {count !== null && count > 0 ? (
                    <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] font-bold tabular-nums text-white/60">
                      {count}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </Reveal>

        {error ? (
          <div className="mt-4 rounded-xl border border-plasma/30 bg-plasma/[.07] px-4 py-3 text-sm text-white/70">
            {error}
          </div>
        ) : null}

        {/* ---------------- Certificates ---------------- */}
        {tab === "certificates" ? (
          <div className="mt-6">
            {certificates.length === 0 ? (
              <EmptyState
                icon={Award}
                title="Hali sertifikat yo'q"
                body="CyberNexus imtihonini topshiring — 15 savol, 30 daqiqa. O'tsangiz, serverda qayd etiladigan va istalgan odam tekshira oladigan sertifikat olasiz."
                action={
                  <NeonButton as={Link} to="/cybernexus-certificate" size="sm">
                    <Award className="h-4 w-4" />
                    Imtihonni boshlash
                  </NeonButton>
                }
              />
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {certificates.map((c) => (
                    <CertificateCard key={c.cert_id} cert={c} />
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/8 bg-black/20 px-5 py-4">
                  <p className="text-sm text-white/45">
                    {validCertificates.length} ta amaldagi sertifikat. Har biri ommaviy
                    havola orqali tekshiriladi.
                  </p>
                  <NeonButton as={Link} to="/cybernexus-certificate" variant="ghost" size="sm">
                    <RefreshCw className="h-4 w-4" />
                    Qayta topshirish
                  </NeonButton>
                </div>
              </>
            )}
          </div>
        ) : null}

        {/* ---------------- Devices ---------------- */}
        {tab === "devices" ? (
          <div className="mt-6">
            <div className="mb-4 flex items-start gap-3 rounded-xl border border-cyber-500/25 bg-cyber-500/[.06] px-4 py-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyber-400" />
              <p className="text-xs leading-relaxed text-white/55">
                Tanimagan qurilmangizni ko'rsangiz, uni darhol o'chiring — o'sha
                qurilma hisobingizdan chiqariladi. Shu qurilmani o'chirsangiz,
                o'zingiz ham tizimdan chiqasiz.
              </p>
            </div>

            {sessions.length === 0 ? (
              <EmptyState
                icon={MonitorSmartphone}
                title="Faol qurilma yo'q"
                body="Hozircha hech qanday qurilma bu hisobga kirmagan."
              />
            ) : (
              <div className="grid gap-3">
                {sessions.map((s) => (
                  <DeviceRow
                    key={s.id}
                    session={s}
                    onRevoke={handleRevoke}
                    busy={revoking === s.id}
                  />
                ))}
              </div>
            )}

            {/* Signing every device out is not the same as leaving, so the way
                out of the platform lives here rather than behind support. */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-plasma/20 bg-plasma/[.05] px-4 py-4">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">Hisobni o'chirish</p>
                <p className="mt-1 text-xs leading-relaxed text-white/45">
                  Hisob va unga bog'langan barcha ma'lumotlar butunlay o'chadi.
                </p>
              </div>
              <NeonButton as={Link} to="/delete-account" variant="danger" size="sm">
                <Trash2 className="h-4 w-4" />
                O'chirish
              </NeonButton>
            </div>
          </div>
        ) : null}

        {/* ---------------- Activity ---------------- */}
        {tab === "activity" ? (
          <div className="mt-6">
            {(data?.top_pages || []).length === 0 ? (
              <EmptyState
                icon={TrendingUp}
                title="Faoliyat hali yozilmagan"
                body="Saytda yurganingizda eng ko'p ochgan sahifalaringiz shu yerda ko'rinadi. Bu ma'lumot faqat sizga va administratorga ko'rinadi."
              />
            ) : (
              <div className="grid gap-3">
                {data.top_pages.map((p) => {
                  const max = data.top_pages[0]?.hits || 1;
                  return (
                    <div
                      key={p.path}
                      className="rounded-xl border border-white/8 bg-black/20 p-4"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <Link
                          to={p.path}
                          className="truncate font-mono text-sm text-white/75 transition-colors hover:text-signal-300"
                        >
                          {p.path}
                        </Link>
                        <span className="shrink-0 font-display text-sm font-bold tabular-nums text-signal-300">
                          {p.hits}
                        </span>
                      </div>
                      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/[.06]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-signal-400 to-cyber-400"
                          style={{ width: `${Math.max(6, (p.hits / max) * 100)}%` }}
                        />
                      </div>
                      <div className="mt-2 text-[11px] text-white/30">
                        Oxirgi: {since(p.last_at)}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : null}

        {/* ---------------- Messages ---------------- */}
        {tab === "messages" ? (
          <div className="mt-6">
            {(data?.messages || []).length === 0 ? (
              <EmptyState
                icon={Mail}
                title="Murojaat yuborilmagan"
                body="Aloqa sahifasi orqali yuborgan xabarlaringiz va ularning holati shu yerda ko'rinadi."
                action={
                  <NeonButton as={Link} to="/contact" variant="ghost" size="sm">
                    <Mail className="h-4 w-4" />
                    Bog'lanish
                  </NeonButton>
                }
              />
            ) : (
              <div className="grid gap-3">
                {data.messages.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-start justify-between gap-4 rounded-xl border border-white/8 bg-black/20 p-4"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-white">{m.subject}</div>
                      <div className="mt-1 text-xs text-white/35">{formatDateTimeUz(m.created_at)}</div>
                    </div>
                    <Chip
                      tone={
                        m.status === "replied" ? "signal" :
                        m.status === "archived" ? "muted" :
                        m.status === "read" ? "cyber" : "muted"
                      }
                    >
                      {m.status === "new" ? "Yangi" :
                       m.status === "read" ? "O'qilgan" :
                       m.status === "replied" ? "Javob berilgan" : "Arxiv"}
                    </Chip>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}

        {/* ---------------- Quick links ---------------- */}
        <Reveal delay={120}>
          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            {[
              { to: "/verify", icon: ShieldCheck, title: "Sertifikat tekshirish", body: "Istalgan CNX- raqamini tekshiring" },
              { to: "/services", icon: Sparkles, title: "Xavfsizlik vositalari", body: "10 ta brauzerda ishlaydigan asbob" },
              { to: "/news", icon: ExternalLink, title: "Yangiliklar", body: "Har soatda yangilanadi" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="group">
                <HoloCard glow="cyber" className="h-full">
                  <l.icon className="h-5 w-5 text-cyber-400" />
                  <div className="mt-3 font-display text-sm font-bold text-white">{l.title}</div>
                  <div className="mt-1 text-xs text-white/40">{l.body}</div>
                </HoloCard>
              </Link>
            ))}
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
