// src/Pages/Auth/Auth.jsx
import React, { useContext, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { authGoogleLogin } from "../../api/auth";
import {
  FaGoogle,
  FaShieldAlt,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";
import { GlobalContext } from "../../GlobalState/globalstate";

export const Auth = () => {
  const { mode } = useContext(GlobalContext);
  const { user, loading, refresh } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  // ✅ Agar session bo‘lsa /auth’da ushlab turmaymiz
  useEffect(() => {
    if (!loading && user) navigate(from, { replace: true });
  }, [loading, user, navigate, from]);

  const Glass = ({ className, children }) => (
    <div
      className={classNames(
        "rounded-xl border-2 bg-black/55 backdrop-blur-xl",
        "border-neon-green/40 shadow-neon",
        className,
      )}
    >
      {children}
    </div>
  );

  const FEATURES = useMemo(
    () => [
      {
        icon: FaShieldAlt,
        title: "Secure Session",
        text: "Cookie-based session (httpOnly) orqali xavfsiz autentifikatsiya.",
      },
      {
        icon: FaLock,
        title: "Protected Routes",
        text: "Ruxsatsiz kirishlar /auth ga qaytariladi (path traversal bo‘lsa ham).",
      },
      {
        icon: FaCheckCircle,
        title: "Auto Register/Login",
        text: "Google tanlansa: bor bo‘lsa login, yo‘q bo‘lsa avtomatik register.",
      },
    ],
    [],
  );

  // ====== ENV DETECTORS ======
  const isMedianEnv = () => {
    try {
      const ua = (navigator.userAgent || "").toLowerCase();
      // Median docs misoli: navigator.userAgent ichida "median" bo‘ladi
      return ua.includes("median");
    } catch {
      return false;
    }
  };

  const hasMedianSocialGoogle = () => {
    // Median JavaScript Bridge: median.socialLogin.google.login(...)
    // (lowercase `median` injected in native env)
    return (
      typeof window !== "undefined" &&
      window.median &&
      window.median.socialLogin &&
      window.median.socialLogin.google &&
      typeof window.median.socialLogin.google.login === "function"
    );
  };

  // Browser GSI (web) detect
  const hasWebGsi = () =>
    typeof window !== "undefined" &&
    window.google &&
    window.google.accounts &&
    window.google.accounts.id;

  // ====== CORE LOGIN ======
  const finishLoginWithIdToken = async (idToken) => {
    if (!idToken) throw new Error("Google token topilmadi (idToken).");
    await authGoogleLogin(idToken); // ✅ backend cn_session cookie set qiladi
    await refresh(); // ✅ me.php orqali user olib keladi
    navigate(from, { replace: true });
  };

  /**
   * ✅ Preferred in Median APK:
   *   median.socialLogin.google.login({ callback })
   * Docs: JavaScript Callbacks & Server-side Redirects
   */
  const startGoogleMedianNative = async () => {
    setErr("");
    setBusy(true);

    try {
      if (!isMedianEnv() || !hasMedianSocialGoogle()) {
        throw new Error(
          "Median Social Login bridge topilmadi. APK’ni qayta build qiling (Native Plugins → Social Login yoqilgan bo‘lishi shart).",
        );
      }

      // timeout guard (native UI ochilmay qolsa)
      let done = false;
      const t = setTimeout(() => {
        if (done) return;
        done = true;
        setBusy(false);
        setErr("Google login timeout. Qayta urinib ko‘ring.");
      }, 25000);

      // Median callback format providerga qarab farq qiladi.
      // Google redirect docs’da: idToken=... type=google (server-side)
      // JS callbackda ham odatda { idToken, type: "google", userDetails... } keladi.
      window.median.socialLogin.google.login({
        callback: async (resp) => {
          try {
            if (done) return;
            done = true;
            clearTimeout(t);

            if (!resp) throw new Error("Google javobi bo‘sh keldi.");
            if (resp.error) throw new Error(resp.error);

            const idToken =
              resp.idToken ||
              resp.id_token ||
              resp.credential || // ba’zi implementlarda shunday kelishi mumkin
              "";

            await finishLoginWithIdToken(idToken);
          } catch (e) {
            setErr(e?.message || "Google login failed");
            setBusy(false);
          }
        },
      });
    } catch (e) {
      setErr(e?.message || "Median Google login failed");
      setBusy(false);
    }
  };

  /**
   * ✅ Browser (normal site) GSI flow
   */
  const startGoogleBrowserGsi = async () => {
    setErr("");
    setBusy(true);

    try {
      if (!hasWebGsi()) {
        throw new Error(
          "Google script yuklanmadi. (Browser) index.html ga GSI script qo‘shilganini tekshiring.",
        );
      }

      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      if (!clientId) throw new Error("VITE_GOOGLE_CLIENT_ID yo‘q (.env).");

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async (resp) => {
          try {
            const credential = resp?.credential;
            if (!credential) throw new Error("Google credential topilmadi.");
            await finishLoginWithIdToken(credential);
          } catch (e) {
            setErr(e?.message || "Google login failed");
            setBusy(false);
          }
        },
      });

      // One Tap
      window.google.accounts.id.prompt(() => {});
    } catch (e) {
      setErr(e?.message || "Google init failed");
      setBusy(false);
    }
  };

  // ✅ Single entry: decide by environment
  const startGoogle = async () => {
    // Median APK ichida web GSI ko‘pincha blok bo‘ladi.
    // Shuning uchun native bridge birinchi.
    if (isMedianEnv()) return startGoogleMedianNative();
    return startGoogleBrowserGsi();
  };

  return (
    <div
      className="w-full min-h-screen bg-black font-mono text-neon-green overflow-x-hidden"
      data-mode={mode}
    >
      {/* soft grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,170,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,170,.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-14">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <Glass className="p-5 sm:p-7">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-lg border border-neon-blue/40 bg-neon-blue/10 grid place-items-center shadow-neon-blue">
                    <FaShieldAlt className="text-neon-blue" />
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-black tracking-wider text-neon-green truncate">
                      CyberNexus Auth
                    </h1>
                    <p className="mt-1 text-xs sm:text-sm text-neon-blue/90 font-bold tracking-widest truncate">
                      GOOGLE • SECURE SESSION • PROTECTED ROUTES
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm sm:text-base text-gray-300/90 leading-relaxed">
                  Platformaga kirish uchun Google orqali davom etasiz. Agar
                  oldin kirgan bo‘lsangiz — login, bo‘lmasa — avtomatik
                  ro‘yxatdan o‘tadi.
                </p>

                {err ? (
                  <div className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    <div className="font-black tracking-wider">Xatolik</div>
                    <div className="mt-1 text-red-200/90">{err}</div>
                  </div>
                ) : null}
              </div>

              {/* RIGHT: Login Card */}
              <div className="w-full lg:w-[420px]">
                <div className="rounded-xl border-2 border-neon-blue/40 bg-black/70 backdrop-blur p-5 shadow-neon-blue">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg border border-neon-green/35 bg-neon-green/10 grid place-items-center">
                      <FaGoogle className="text-neon-green" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-black tracking-widest text-neon-blue">
                        SIGN IN
                      </div>
                      <div className="text-lg font-black tracking-wider text-neon-green truncate">
                        Google orqali kirish
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={busy || loading}
                    onClick={startGoogle}
                    className={classNames(
                      "mt-4 w-full rounded-xl border-2 border-neon-green",
                      "bg-gradient-to-r from-neon-green to-neon-blue",
                      "px-5 py-3 text-sm font-black tracking-widest text-black shadow-neon",
                      "hover:shadow-neon-blue transition-all",
                      (busy || loading) && "opacity-70 cursor-not-allowed",
                    )}
                  >
                    {busy || loading
                      ? "Tekshirilmoqda..."
                      : "Continue with Google →"}
                  </button>

                  <div className="mt-4 rounded-xl border border-neon-green/20 bg-black/60 p-4">
                    <div className="text-[11px] font-black tracking-widest text-gray-400">
                      NOTE
                    </div>
                    <p className="mt-2 text-sm text-neon-green/80 leading-relaxed">
                      Cookie session httpOnly bo‘lgani uchun frontend token
                      saqlamaydi — xavfsizroq.
                    </p>
                    <p className="mt-2 text-xs text-gray-400/80 leading-relaxed">
                      {isMedianEnv()
                        ? "Median APK: Native Social Login ishlaydi (web GSI shart emas)."
                        : "Browser: Google GSI (web) ishlaydi."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Glass>
        </motion.div>

        {/* FEATURES */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className={classNames(
                  "rounded-xl border-2 bg-black/70 backdrop-blur p-4 text-left",
                  "border-neon-green/40 shadow-neon",
                  "hover:border-neon-blue hover:shadow-neon-blue transition-all",
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-lg border border-neon-blue/40 bg-neon-blue/10 grid place-items-center shadow-neon-blue">
                    <f.icon className="text-neon-blue" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-black tracking-wider text-neon-green truncate">
                      {f.title}
                    </div>
                    <div className="mt-1 text-[11px] font-bold tracking-widest text-neon-blue/80 truncate">
                      CYBERNEXUS SECURITY
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-300/90 leading-relaxed">
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Auth;
