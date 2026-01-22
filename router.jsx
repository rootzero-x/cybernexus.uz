import { Routes, Route } from "react-router-dom";
import { Welcome } from "./src/Pages/Welcome/welcome";
import { App } from "./src/Pages/App/app";
import { Layout } from "./src/Layout/layout";
import { News } from "./src/Pages/News/news";
import { About } from "./src/Pages/About/about";
import { Contact } from "./src/Pages/Contact/contact";
import { Help } from "./src/Pages/Help/help";
import { Error } from "./src/Pages/Error/error";
import { Terminal } from "./src/Pages/Terminale/terminal";
import CertificateGenerator from "./src/Pages/Certificate/certificate";
import Portfolio from "./src/Pages/Portfolio/portfolio";
import { Services } from "./src/Services/services";

export const Routers = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Welcome />} />
        <Route path="premium-app" element={<App />} />
        <Route path="/news" element={<News />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help" element={<Help />} />
        <Route path="/ctf-challenge" element={<Terminal />} />
        <Route
          path="/cybernexus-certificate"
          element={<CertificateGenerator />}
        />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/services" element={<Services />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
};
