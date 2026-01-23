import { Outlet, useLocation } from "react-router-dom";
import classNames from "classnames";
import { WelcomeHeader } from "./Header";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const Layout = () => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);

  const isAuthPage = location.pathname === "/auth";

  /**
   * ✅ Qoidalar:
   * - /auth page: Header + Download button ko‘rinmaydi
   * - Login bo'lmagan payt: Header + Download button ko‘rinmaydi
   * - Loading payt: flash bo‘lmasligi uchun Header/Download ko‘rsatmaymiz (faqat loader)
   */
  const canShowChrome = !!user && !isAuthPage;

  // ✅ Loading payti (session tekshiruvi) — hech narsa “flash” bo‘lmasin
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-neon-green font-mono grid place-items-center">
        <div className="rounded-xl border-2 border-neon-green/35 bg-black/70 backdrop-blur px-5 py-4 shadow-neon">
          <div className="text-neon-blue font-black tracking-widest text-sm">
            AUTH CHECK
          </div>
          <div className="mt-1 text-neon-green/90 text-sm">
            Session tekshirilmoqda...
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full flex flex-col min-h-screen bg-black overflow-x-hidden">
        {/* ✅ Header faqat login bo‘lsa */}
        {canShowChrome ? <WelcomeHeader /> : null}

        <div
          className={classNames(
            "w-full h-full overflow-y-auto",
            // ✅ Header bo‘lsa padding qoldir
            canShowChrome ? "pr-14 sm:pr-16" : "pr-0",
            {
              "animate-[fade-in_1s_ease-in-out]":
                location.pathname !== "/cyberflow",
            }
          )}
        >
          <Outlet />
        </div>

        {/* ✅ Download tugma faqat login bo‘lsa */}
        {canShowChrome ? (
          <a
            href="/app-release.apk"
            download
            className={classNames(
              "fixed bottom-2 right-2 z-50 flex items-center gap-1 rounded-md bg-gradient-to-r from-green-500 to-cyan-500 text-black font-mono shadow-[0_0_10px_#0ff] transition-all duration-300",
              "sm:bottom-4 sm:right-4 sm:gap-2",
              "px-3 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm",
              "active:shadow-[0_0_20px_#0ff] active:animate-glitch"
            )}
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
            <span className="hidden sm:inline">Download CyberNexus</span>
            <span className="inline sm:hidden">Download</span>
          </a>
        ) : null}
      </div>

      {/* Glitch animatsiyasi uchun CSS */}
      <style>
        {`
          @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
          }
          .animate-glitch {
            animation: glitch 0.3s ease;
          }
        `}
      </style>
    </>
  );
};
