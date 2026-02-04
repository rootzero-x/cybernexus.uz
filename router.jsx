// src/router/router.jsx
import { Routes, Route } from "react-router-dom";

import { Layout } from "./src/Layout/layout";

import { Welcome } from "./src/Pages/Welcome/welcome";
import { App } from "./src/Pages/App/app";
import { News } from "./src/Pages/News/news";
import { About } from "./src/Pages/About/about";
import { Contact } from "./src/Pages/Contact/contact";
import { Help } from "./src/Pages/Help/help";
import { Error } from "./src/Pages/Error/error";
import { Terminal } from "./src/Pages/Terminale/terminal";
import CertificateGenerator from "./src/Pages/Certificate/certificate";
import Portfolio from "./src/Pages/Portfolio/portfolio";
import { Services } from "./src/Pages/Services/Services";
import { Privacy } from "./src/Pages/Privacy/Privacy";

import Auth from "./src/Pages/Auth/Auth";
import ProtectedRoute from "./src/components/ProtectedRoute";

export const Routers = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* ✅ Public: faqat Auth */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/policy" element={<Privacy />} />

        {/* ✅ Protected: qolgan hammasi */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Welcome />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />

          <Route path="/premium-app" element={<App />} />
          <Route path="/news" element={<News />} />
          <Route path="/ctf-challenge" element={<Terminal />} />
          <Route
            path="/cybernexus-certificate"
            element={<CertificateGenerator />}
          />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/services" element={<Services />} />
        </Route>
      </Route>

      <Route path="*" element={<Error />} />
    </Routes>
  );
};
