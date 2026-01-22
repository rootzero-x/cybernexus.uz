// src/pages/Portfolio/Portfolio.jsx
import React, { useMemo, useState, useEffect } from "react";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaTelegram,
  FaInstagram,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { SiHackthebox } from "react-icons/si";

/**
 * ✅ CyberNexus Portfolio — Help page design language
 * - Neon green/blue glass cards + soft grid background
 * - Sticky nav chips
 * - Smooth framer-motion animations
 * - Premium sections: Hero / About / Projects / Contact / Footer
 *
 * Notes:
 * - Uses your existing Tailwind tokens: neon-green, neon-blue, shadow-neon, shadow-neon-blue
 * - Image paths: /snowden.jpg, /cyber.jpg (keep in public/)
 */

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay: 0.04 * i },
  }),
};

const springy = {
  hidden: { opacity: 0, scale: 0.98, y: 10 },
  show: (i = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 140,
      damping: 18,
      delay: 0.04 * i,
    },
  }),
};

const Portfolio = () => {
  // ====== LINKS ======
  const LINKS = useMemo(
    () => ({
      github: "https://github.com/rootzero-x",
      telegram: "https://t.me/rootzero_x",
      instagram: "https://www.instagram.com/rootzero.x/",
    }),
    [],
  );

  const projects = useMemo(
    () => [
      {
        title: "UzStudents",
        description:
          "Distance learning platform for university requirements with AI integration.",
        tags: ["React", "Tailwind CSS", "PHP", "MySQL", "AI"],
        image: "/uzstudents.png",
      },
      {
        title: "SecurePass",
        description:
          "End-to-end encrypted password manager with zero-knowledge architecture.",
        tags: ["React", "Node.js", "Cryptography"],
        image: "/cyber.jpg",
      },
      {
        title: "VulnScan",
        description: "Automated vulnerability scanner for web applications.",
        tags: ["Python", "Security", "Automation"],
        image: "/vulnscan.webp",
      },
    ],
    [],
  );

  // ====== UI STATE ======
  const [active, setActive] = useState(null); // project modal
  const [navOpen, setNavOpen] = useState(false);

  // close modal on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const open = (url) => window.open(url, "_blank", "noopener,noreferrer");

  // ====== UI ATOMS (Help-like) ======
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

  const Chip = ({ active, onClick, icon: Icon, children, className }) => (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-black tracking-wider transition-all",
        active
          ? "border-neon-blue bg-neon-blue/10 text-neon-blue shadow-neon-blue"
          : "border-neon-green/30 bg-black/50 text-gray-200 hover:border-neon-green hover:text-neon-green",
        className,
      )}
    >
      {Icon ? <Icon className="text-[12px]" /> : null}
      {children}
    </button>
  );

  const Tag = ({ children }) => (
    <span className="text-[10px] font-black tracking-widest rounded-full border border-neon-green/25 bg-black/60 px-2 py-1 text-neon-green/80">
      {children}
    </span>
  );

  const SocialBtn = ({ icon: Icon, label, href }) => (
    <button
      type="button"
      onClick={() => open(href)}
      className={classNames(
        "rounded-xl border-2 bg-black/70 backdrop-blur p-3",
        "border-neon-green/35 shadow-neon",
        "hover:border-neon-blue hover:shadow-neon-blue transition-all",
        "inline-flex items-center justify-center",
      )}
      aria-label={label}
      title={label}
    >
      <Icon className="text-neon-blue text-xl" />
    </button>
  );

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setNavOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-black font-mono text-neon-green overflow-x-hidden">
      {/* soft grid background (Help-style) */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,170,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,170,.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* glow blobs (subtle) */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-neon-blue/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-neon-green/20 rounded-full blur-3xl opacity-25" />
        <div className="absolute top-2/3 right-1/4 w-64 h-64 bg-neon-blue/10 rounded-full blur-3xl opacity-25" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-16">
        {/* ====== TOP BAR ====== */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="sticky top-0 z-30 pt-2"
        >
          <div className="rounded-xl border border-neon-green/25 bg-black/70 backdrop-blur-xl px-3 py-3">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => scrollToId("top")}
                className="flex items-center gap-2"
                aria-label="Go to top"
              >
                <div className="h-10 w-10 rounded-lg border border-neon-blue/40 bg-neon-blue/10 grid place-items-center shadow-neon-blue">
                  <SiHackthebox className="text-neon-blue text-xl" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm sm:text-base font-black tracking-wider text-neon-green leading-tight">
                    CYBERNEXUS
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-bold tracking-widest text-neon-blue/80 truncate">
                    PORTFOLIO • SECURITY • DEV
                  </div>
                </div>
              </button>

              {/* Desktop chips */}
              <div className="hidden md:flex items-center gap-2">
                <Chip active={false} onClick={() => scrollToId("about")}>
                  ABOUT
                </Chip>
                <Chip active={false} onClick={() => scrollToId("projects")}>
                  PROJECTS
                </Chip>
                <Chip active={false} onClick={() => scrollToId("contact")}>
                  CONTACT
                </Chip>
              </div>

              {/* Mobile */}
              <div className="md:hidden flex items-center gap-2">
                <Chip
                  active={navOpen}
                  onClick={() => setNavOpen((v) => !v)}
                  className="px-3"
                >
                  MENU
                </Chip>
              </div>
            </div>

            <AnimatePresence>
              {navOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="md:hidden overflow-hidden"
                >
                  <div className="pt-3 flex flex-wrap gap-2">
                    <Chip active={false} onClick={() => scrollToId("about")}>
                      ABOUT
                    </Chip>
                    <Chip active={false} onClick={() => scrollToId("projects")}>
                      PROJECTS
                    </Chip>
                    <Chip active={false} onClick={() => scrollToId("contact")}>
                      CONTACT
                    </Chip>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ====== HERO ====== */}
        <section id="top" className="pt-6 sm:pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="min-w-0"
            >
              <Glass className="p-5 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold tracking-widest text-neon-blue/90">
                      ETHICAL HACKER • SECURITY RESEARCHER • FULL STACK
                    </div>
                    <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black tracking-wider text-neon-green leading-tight">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-green to-neon-blue">
                        Oyatullokh
                      </span>
                    </h1>
                    <p className="mt-3 text-sm sm:text-base text-gray-300/90 leading-relaxed max-w-xl">
                      I build secure systems, research vulnerabilities
                      responsibly, and ship premium web products with strong
                      security foundations.
                    </p>

                    <div className="mt-5 flex items-center gap-3">
                      <SocialBtn
                        icon={FaGithub}
                        label="GitHub"
                        href={LINKS.github}
                      />
                      <SocialBtn
                        icon={FaTelegram}
                        label="Telegram"
                        href={LINKS.telegram}
                      />
                      <SocialBtn
                        icon={FaInstagram}
                        label="Instagram"
                        href={LINKS.instagram}
                      />
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {[
                        "Pentest",
                        "Web Security",
                        "React",
                        "Tailwind CSS",
                        "PHP",
                        "MySQL",
                        "Docker",
                        "React Native",
                        "AWS",
                        "Node.js",
                        "Python",
                        "Crypto",
                      ].map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={() => scrollToId("projects")}
                        className={classNames(
                          "flex-1 rounded-xl border-2 border-neon-green",
                          "bg-gradient-to-r from-neon-green to-neon-blue",
                          "px-5 py-3 text-sm font-black tracking-widest text-black shadow-neon",
                          "hover:shadow-neon-blue transition-all",
                        )}
                      >
                        VIEW PROJECTS
                      </button>

                      <button
                        type="button"
                        onClick={() => scrollToId("contact")}
                        className={classNames(
                          "flex-1 rounded-xl border-2 px-5 py-3 text-sm font-black tracking-widest transition-all",
                          "border-neon-blue bg-neon-blue/10 text-neon-blue shadow-neon-blue",
                          "hover:border-neon-green hover:text-neon-green",
                        )}
                      >
                        CONTACT
                      </button>
                    </div>
                  </div>

                  <div className="hidden sm:block shrink-0">
                    <div className="h-12 w-12 rounded-lg border border-neon-blue/40 bg-neon-blue/10 grid place-items-center shadow-neon-blue">
                      <SiHackthebox className="text-neon-blue text-2xl" />
                    </div>
                  </div>
                </div>
              </Glass>
            </motion.div>

            {/* Profile card */}
            <motion.div
              variants={springy}
              initial="hidden"
              animate="show"
              custom={1}
              className="relative"
            >
              <Glass className="p-5 sm:p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold tracking-widest text-neon-blue/90">
                      PROFILE PREVIEW
                    </div>
                    <div className="mt-1 text-xl sm:text-2xl font-black tracking-wider text-neon-green">
                      Premium Card
                    </div>
                  </div>
                  <div className="text-[11px] text-gray-500 font-bold tracking-widest">
                    GLASS • NEON
                  </div>
                </div>

                <div className="mt-5 relative w-full max-w-md mx-auto">
                  <div className="absolute inset-0 border-2 border-neon-green/60 rounded-xl rotate-2" />
                  <div className="relative rounded-xl overflow-hidden border border-neon-blue/25 bg-black/60">
                    <div className="aspect-square w-full">
                      <img
                        src="/snowden.jpg"
                        alt="Profile"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          // fallback if image missing
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    { k: "Focus", v: "Security" },
                    { k: "Stack", v: "Full-Stack" },
                    { k: "Style", v: "Premium" },
                  ].map((x) => (
                    <div
                      key={x.k}
                      className="rounded-xl border border-neon-green/25 bg-black/60 p-3"
                    >
                      <div className="text-[10px] text-gray-500 font-black tracking-widest">
                        {x.k}
                      </div>
                      <div className="mt-1 text-sm font-black tracking-wider text-neon-green truncate">
                        {x.v}
                      </div>
                    </div>
                  ))}
                </div>
              </Glass>
            </motion.div>
          </div>
        </section>

        {/* ====== ABOUT ====== */}
        <section id="about" className="mt-10 sm:mt-14">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm sm:text-base font-black tracking-widest text-neon-blue">
                ABOUT
              </h2>
              <span className="text-[11px] text-gray-500">who am i →</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <Glass className="p-5 sm:p-7">
                <div className="text-xl sm:text-2xl font-black tracking-wider text-neon-green">
                  About me
                </div>
                <p className="mt-3 text-sm sm:text-base text-gray-300/90 leading-relaxed">
                  I’m a security enthusiast focused on ethical hacking and
                  secure software development. I research vulnerabilities
                  responsibly, build hardened apps, and love clean, premium UI.
                </p>
                <p className="mt-3 text-sm sm:text-base text-gray-300/90 leading-relaxed">
                  When I’m not breaking things (ethically), I’m building secure
                  products and contributing to security tooling.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    "Penetration Testing",
                    "Web Security",
                    "App Security",
                    "DevSecOps",
                    "AWS",
                    "PHP",
                    "MySQL",
                    "Tailwind CSS",
                    "Docker",
                    "React",
                    "Node.js",
                    "Python",
                    "Cryptography",
                  ].map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </Glass>

              <Glass className="p-5 sm:p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold tracking-widest text-neon-blue/90">
                      CURRENTLY
                    </div>
                    <div className="mt-1 text-xl sm:text-2xl font-black tracking-wider text-neon-green">
                      Doing now
                    </div>
                  </div>
                  <div className="h-10 w-10 rounded-lg border border-neon-blue/40 bg-neon-blue/10 grid place-items-center shadow-neon-blue">
                    <SiHackthebox className="text-neon-blue text-xl" />
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    "Security Researcher at CyberNexus",
                    "Developing secure applications",
                    "Contributing to open-source security tools",
                  ].map((line, i) => (
                    <motion.div
                      key={line}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      custom={i}
                      className="rounded-xl border border-neon-green/20 bg-black/60 p-4"
                    >
                      <div className="text-sm font-black tracking-wider text-neon-green">
                        <span className="text-neon-blue/90">➜</span> {line}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Glass>
            </div>
          </motion.div>
        </section>

        {/* ====== PROJECTS ====== */}
        <section id="projects" className="mt-10 sm:mt-14">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm sm:text-base font-black tracking-widest text-neon-blue">
                FEATURED PROJECTS
              </h2>
              <span className="text-[11px] text-gray-500">click card →</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((p, idx) => (
                <motion.button
                  key={p.title}
                  type="button"
                  onClick={() => setActive(p)}
                  className={classNames(
                    "rounded-xl border-2 bg-black/70 backdrop-blur text-left overflow-hidden",
                    "border-neon-green/45 shadow-neon",
                    "hover:border-neon-blue hover:shadow-neon-blue transition-all",
                  )}
                  variants={springy}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={idx}
                  whileHover={{ y: -3 }}
                >
                  <div className="h-44 w-full bg-black/50 border-b border-neon-green/15 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover opacity-90"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <div className="h-full w-full grid place-items-center bg-gradient-to-br from-black/30 to-black">
                      <span className="text-gray-500 text-xs font-bold tracking-widest">
                        /public/cyber.jpg
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="text-base font-black tracking-wider text-neon-green">
                      {p.title}
                    </div>
                    <p className="mt-2 text-sm text-gray-300/90 leading-relaxed line-clamp-3">
                      {p.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-black tracking-widest rounded-full border border-neon-blue/25 bg-neon-blue/10 px-2 py-1 text-neon-blue/90"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-[11px] font-bold tracking-widest text-gray-400">
                        DETAILS
                      </span>
                      <span className="text-xs font-black tracking-widest text-neon-blue">
                        OPEN →
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ====== CONTACT ====== */}
        <section id="contact" className="mt-10 sm:mt-14">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm sm:text-base font-black tracking-widest text-neon-blue">
                CONTACT
              </h2>
              <span className="text-[11px] text-gray-500">reach out →</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <Glass className="p-5 sm:p-7">
                <div className="text-xl sm:text-2xl font-black tracking-wider text-neon-green">
                  Get in touch
                </div>
                <p className="mt-3 text-sm sm:text-base text-gray-300/90 leading-relaxed">
                  Working together or security question? Reach me via social
                  channels.
                </p>

                <div className="mt-5 grid gap-3">
                  {[
                    {
                      icon: FaGithub,
                      label: "github.com/rootzero-x",
                      href: LINKS.github,
                    },
                    {
                      icon: FaTelegram,
                      label: "t.me/rootzero_x",
                      href: LINKS.telegram,
                    },
                    {
                      icon: FaInstagram,
                      label: "instagram.com/rootzero.x",
                      href: LINKS.instagram,
                    },
                  ].map((x) => (
                    <button
                      key={x.label}
                      type="button"
                      onClick={() => open(x.href)}
                      className={classNames(
                        "rounded-xl border-2 bg-black/70 backdrop-blur p-4 text-left",
                        "border-neon-green/35 shadow-neon",
                        "hover:border-neon-blue hover:shadow-neon-blue transition-all",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg border border-neon-blue/40 bg-neon-blue/10 grid place-items-center shadow-neon-blue">
                          <x.icon className="text-neon-blue" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-black tracking-wider text-neon-green truncate">
                            {x.label}
                          </div>
                          <div className="mt-1 text-[11px] font-bold tracking-widest text-neon-blue/80 truncate">
                            OPEN →
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </Glass>

              {/* Message box (simple, safe; opens mail client) */}
              <Glass className="p-5 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-bold tracking-widest text-neon-blue/90">
                      SEND A MESSAGE
                    </div>
                    <div className="mt-1 text-xl sm:text-2xl font-black tracking-wider text-neon-green">
                      Email quick send
                    </div>
                  </div>
                  <div className="hidden sm:flex gap-2">
                    <Chip
                      active={false}
                      onClick={() => open(LINKS.telegram)}
                      icon={FaTelegram}
                    >
                      Telegram
                    </Chip>
                    <Chip
                      active={false}
                      onClick={() => open(LINKS.github)}
                      icon={FaGithub}
                    >
                      GitHub
                    </Chip>
                  </div>
                </div>

                <p className="mt-3 text-sm text-gray-300/90 leading-relaxed">
                  Form submit qilmaydi — “Open Email” bosilganda mail client
                  ochiladi.
                </p>

                <div className="mt-5 grid gap-3">
                  <input
                    className={classNames(
                      "w-full rounded-xl border-2 bg-black/60 backdrop-blur px-4 py-3 text-sm",
                      "border-neon-green/35 text-neon-green placeholder:text-gray-500",
                      "focus:outline-none focus:border-neon-blue focus:shadow-neon-blue",
                    )}
                    placeholder="Subject (masalan: Collaboration / Security question)"
                    defaultValue="CyberNexus — Portfolio contact"
                    id="cnx-subject"
                  />

                  <textarea
                    className={classNames(
                      "w-full min-h-[140px] rounded-xl border-2 bg-black/60 backdrop-blur px-4 py-3 text-sm",
                      "border-neon-green/35 text-neon-green placeholder:text-gray-500",
                      "focus:outline-none focus:border-neon-blue focus:shadow-neon-blue",
                    )}
                    placeholder="Message..."
                    id="cnx-body"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      const subject = encodeURIComponent(
                        document.getElementById("cnx-subject")?.value ||
                          "CyberNexus — Portfolio contact",
                      );
                      const body = encodeURIComponent(
                        document.getElementById("cnx-body")?.value || "",
                      );
                      // You can replace email if you want:
                      const email = "izzatullayev008@gmail.com";
                      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
                    }}
                    className={classNames(
                      "rounded-xl border-2 border-neon-green bg-gradient-to-r from-neon-green to-neon-blue",
                      "px-5 py-3 text-sm font-black tracking-widest text-black shadow-neon",
                      "hover:shadow-neon-blue transition-all inline-flex items-center justify-center gap-2",
                    )}
                  >
                    Open Email <FaExternalLinkAlt className="text-[14px]" />
                  </button>

                  <div className="text-[11px] text-gray-500 text-center">
                    External email app opens (no data stored).
                  </div>
                </div>
              </Glass>
            </div>
          </motion.div>
        </section>

        {/* ====== FOOTER ====== */}
        <motion.footer
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={0}
          className="mt-12 pt-8 border-t border-neon-green/15"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <SiHackthebox className="text-neon-blue text-xl" />
              <span className="text-sm font-black tracking-wider text-neon-green">
                CYBERNEXUS
              </span>
            </div>
            <div className="text-gray-500 text-xs font-bold tracking-widest">
              © {new Date().getFullYear()} Oyatullokh. All rights reserved.
            </div>
          </div>
        </motion.footer>
      </div>

      {/* ====== PROJECT MODAL ====== */}
      <AnimatePresence>
        {active && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={() => setActive(null)}
            >
              <div
                className="w-full max-w-2xl rounded-xl border-2 border-neon-blue bg-black/90 backdrop-blur p-5 shadow-neon-blue"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold tracking-widest text-neon-blue/90">
                      PROJECT
                    </div>
                    <div className="mt-1 text-lg sm:text-xl font-black tracking-wider text-neon-green line-clamp-2">
                      {active.title}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    className="rounded-lg border border-neon-blue/40 bg-neon-blue/10 px-3 py-2 text-xs font-black tracking-widest text-neon-blue hover:border-neon-green hover:text-neon-green transition-all"
                  >
                    CLOSE
                  </button>
                </div>

                <div className="mt-4 rounded-xl border border-neon-green/20 bg-black/60 p-4">
                  <div className="text-[11px] font-black tracking-widest text-gray-400">
                    DESCRIPTION
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-neon-green/85">
                    {active.description}
                  </p>
                </div>

                <div className="mt-3 rounded-xl border border-neon-green/15 bg-black/50 p-4">
                  <div className="text-[11px] font-black tracking-widest text-gray-400">
                    TECH
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(active.tags || []).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-black tracking-widest rounded-full border border-neon-blue/25 bg-neon-blue/10 px-2 py-1 text-neon-blue/90"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => open("https://uzstudents.uz")}
                    className="flex-1 rounded-xl border-2 border-neon-green bg-gradient-to-r from-neon-green to-neon-blue px-4 py-3 text-sm font-black tracking-wider text-black shadow-neon hover:shadow-neon-blue transition-all inline-flex items-center justify-center gap-2"
                  >
                    Open Platform <FaExternalLinkAlt className="text-[14px]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    className={classNames(
                      "flex-1 rounded-xl border-2 px-4 py-3 text-sm font-black tracking-wider transition-all",
                      "border-neon-blue bg-neon-blue/10 text-neon-blue shadow-neon-blue",
                      "hover:border-neon-green hover:text-neon-green",
                    )}
                  >
                    Back
                  </button>
                </div>

                <div className="mt-3 text-center text-[11px] text-gray-500">
                  ESC to close • Click outside to close
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* utilities */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Portfolio;