// router.jsx
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import { Layout } from "./src/Layout/layout";
import ProtectedRoute from "./src/components/ProtectedRoute";
import Auth from "./src/Pages/Auth/Auth";

/**
 * Every page below the auth screen is code-split.
 *
 * The whole app used to ship as one ~825 KB bundle, so a visitor waited for the
 * certificate generator and the CTF terminal before the login button could
 * render. Auth and Layout stay eager because they are on the critical path.
 */
const Welcome = lazy(() => import("./src/Pages/Welcome/welcome"));
const App = lazy(() => import("./src/Pages/App/app"));
const News = lazy(() => import("./src/Pages/News/news"));
const About = lazy(() => import("./src/Pages/About/about"));
const Contact = lazy(() => import("./src/Pages/Contact/contact"));
const Help = lazy(() => import("./src/Pages/Help/help"));
const ErrorPage = lazy(() => import("./src/Pages/Error/error"));
const Terminal = lazy(() => import("./src/Pages/Terminale/terminal"));
const CertificateGenerator = lazy(() => import("./src/Pages/Certificate/certificate"));
const Portfolio = lazy(() => import("./src/Pages/Portfolio/portfolio"));
const Services = lazy(() => import("./src/Pages/Services/Services"));
const Privacy = lazy(() => import("./src/Pages/Privacy/Privacy"));
const TermsOfService = lazy(() => import("./src/Pages/Terms Of Service/termsofservice"));
const Verify = lazy(() => import("./src/Pages/Verify/Verify"));

function RouteFallback() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="flex flex-col items-center gap-4">
        <span className="relative h-12 w-12">
          <span className="absolute inset-0 rounded-full border border-signal-500/20" />
          <span className="absolute inset-0 animate-spin-slow rounded-full border-2 border-transparent border-t-signal-400" />
        </span>
        <span className="text-[11px] font-bold uppercase tracking-[.22em] text-white/35">
          Yuklanmoqda
        </span>
      </div>
    </div>
  );
}

export const Routers = () => {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<Layout />}>
          {/* Public */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/policy" element={<Privacy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          {/* Public on purpose: a certificate id is checked by people who
              do not have an account here. */}
          <Route path="/verify" element={<Verify />} />
          <Route path="/verify/:certId" element={<Verify />} />

          {/* Protected */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Welcome />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/help" element={<Help />} />
            <Route path="/premium-app" element={<App />} />
            <Route path="/news" element={<News />} />
            <Route path="/ctf-challenge" element={<Terminal />} />
            <Route path="/cybernexus-certificate" element={<CertificateGenerator />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/services" element={<Services />} />
          </Route>
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
};

export default Routers;
