// src/Pages/Auth/Auth.jsx
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShieldCheck, Lock, UserPlus, Fingerprint, AlertTriangle } from "lucide-react";

import { AuthContext } from "../../context/AuthContext";
import { authGoogleLogin } from "../../api/auth";
import { isMedianEnv, hasMedianGoogleBridge, medianGoogleLogin } from "../../api/google";
import GoogleSignInButton from "../../components/GoogleSignInButton";
import {
  HoloCard,
  Eyebrow,
  Display,
  Accent,
  NeonButton,
  Section,
  Reveal,
  CharacterPanel,
} from "../../design";

// Only allow same-origin paths back, so a crafted link cannot bounce a
// freshly-authenticated user off to another site.
function safeRedirect(from) {
  if (typeof from !== "string") return "/";
  if (!from.startsWith("/") || from.startsWith("//")) return "/";
  if (from === "/auth") return "/";
  return from;
}

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Secure Session",
    text: "Token SHA-256 bilan hashlanadi, faqat hash serverda saqlanadi.",
  },
  {
    icon: Lock,
    title: "Protected Routes",
    text: "Ruxsatsiz kirish urinishlari /auth ga qaytariladi.",
  },
  {
    icon: UserPlus,
    title: "Auto Register",
    text: "Birinchi marta kirsangiz, hisob avtomatik yaratiladi.",
  },
];

export const Auth = () => {
  const { user, loading, refresh } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = useMemo(() => safeRedirect(location.state?.from), [location.state]);

  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!loading && user) navigate(from, { replace: true });
  }, [loading, user, navigate, from]);

  const finishLogin = useCallback(
    async (idToken) => {
      if (!idToken) throw new Error("Google token topilmadi.");
      await authGoogleLogin(idToken);
      await refresh();
      if (mounted.current) navigate(from, { replace: true });
    },
    [refresh, navigate, from],
  );

  const handleCredential = useCallback(
    async (credential) => {
      if (!mounted.current) return;
      setErr("");
      setBusy(true);
      try {
        await finishLogin(credential);
      } catch (e) {
        if (mounted.current) {
          setErr(e?.message || "Google login muvaffaqiyatsiz.");
          setBusy(false);
        }
      }
    },
    [finishLogin],
  );

  const handleGoogleError = useCallback((message) => {
    if (mounted.current) setErr(message);
  }, []);

  const startMedianLogin = useCallback(async () => {
    setErr("");
    setBusy(true);
    try {
      const idToken = await medianGoogleLogin();
      await finishLogin(idToken);
    } catch (e) {
      if (mounted.current) {
        setErr(e?.message || "Google login muvaffaqiyatsiz.");
        setBusy(false);
      }
    }
  }, [finishLogin]);

  const inMedian = isMedianEnv();

  return (
    <div className="relative flex min-h-screen items-center py-16 sm:py-20">
      <Section width="wide">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
          {/* ---------------- Left: identity ---------------- */}
          <div>
            <Reveal>
              <Eyebrow tone="cyber">Secure Access · Google Identity</Eyebrow>
            </Reveal>

            <Reveal delay={80}>
              <Display size="xl" className="mt-5">
                Kirish nuqtasi{" "}
                <Accent>himoyalangan.</Accent>
              </Display>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
                CyberNexus platformasiga Google hisobingiz orqali kiring. Avval
                kirgan bo'lsangiz — session tiklanadi, birinchi marta bo'lsa —
                hisob avtomatik ochiladi.
              </p>
            </Reveal>

            {err ? (
              <div
                role="alert"
                className="mt-8 flex gap-3 rounded-2xl border border-plasma/40 bg-plasma/10 p-4 backdrop-blur-xl"
              >
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-plasma" />
                <div className="min-w-0">
                  <div className="text-xs font-bold uppercase tracking-[.18em] text-plasma">
                    Xatolik
                  </div>
                  <p className="mt-1 break-words text-sm text-white/70">{err}</p>
                </div>
              </div>
            ) : null}

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {FEATURES.map((f, i) => (
                <Reveal key={f.title} delay={240 + i * 90}>
                  <HoloCard
                    glow={i === 1 ? "cyber" : "signal"}
                    className="h-full"
                    padded={false}
                  >
                    <div className="p-4">
                      <f.icon
                        className={
                          i === 1
                            ? "h-5 w-5 text-cyber-400"
                            : "h-5 w-5 text-signal-400"
                        }
                      />
                      <div className="mt-3 text-sm font-bold text-white">
                        {f.title}
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-white/45">
                        {f.text}
                      </p>
                    </div>
                  </HoloCard>
                </Reveal>
              ))}
            </div>
          </div>

          {/* ---------------- Right: character + sign-in panel ---------------- */}
          <div className="relative flex flex-col">
            {/* The rigged operative sits above the panel in normal flow, so it
                reserves its own space instead of shifting the layout. It is
                decorative and lazily mounted — the sign-in button never waits
                on it. */}
            <CharacterPanel
              className="pointer-events-none mx-auto hidden h-[400px] w-full max-w-[460px] lg:block"
              scale={1.22}
            />

            <Reveal delay={200} y={28}>
              <HoloCard
                glow="cyber"
                intensity={1.4}
                className="relative overflow-hidden lg:-mt-10"
              >
              {/* Rotating aura behind the panel */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-24 -z-10 animate-spin-slow opacity-40"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent, rgba(0,255,157,.22), transparent 30%, rgba(0,229,255,.20), transparent 60%)",
                }}
              />

              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-signal-500/30 bg-signal-500/10">
                  <Fingerprint className="h-5 w-5 text-signal-400" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold uppercase tracking-[.22em] text-cyber-400">
                    Sign in
                  </div>
                  <div className="font-display text-lg font-bold text-white">
                    Google orqali davom eting
                  </div>
                </div>
              </div>

              <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

              <div className="min-h-[60px]">
                {inMedian ? (
                  <NeonButton
                    onClick={startMedianLogin}
                    disabled={busy || loading}
                    className="w-full"
                    size="lg"
                  >
                    {busy ? "Tekshirilmoqda..." : "Continue with Google"}
                  </NeonButton>
                ) : (
                  <div
                    className={
                      busy
                        ? "pointer-events-none flex justify-center opacity-50"
                        : "flex justify-center"
                    }
                  >
                    <GoogleSignInButton
                      onCredential={handleCredential}
                      onError={handleGoogleError}
                    />
                  </div>
                )}
              </div>

              {busy ? (
                <div className="mt-4 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[.22em] text-cyber-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyber-400" />
                  Session ochilmoqda
                </div>
              ) : null}

              <div className="mt-6 rounded-xl border border-white/8 bg-black/30 p-4">
                <div className="text-[10px] font-bold uppercase tracking-[.22em] text-white/35">
                  Environment
                </div>
                <p className="mt-2 text-xs leading-relaxed text-white/45">
                  {inMedian
                    ? hasMedianGoogleBridge()
                      ? "Median APK — native social login faol."
                      : "Median APK aniqlandi, lekin Social Login bridge yoqilmagan."
                    : "Browser — Google Identity Services (rasmiy tugma)."}
                </p>
                </div>
              </HoloCard>
            </Reveal>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Auth;
