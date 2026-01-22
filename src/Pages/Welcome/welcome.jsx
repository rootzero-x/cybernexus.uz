// src/pages/Welcome/Welcome.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { motion } from "framer-motion";

/**
 * CyberNexus Welcome — Premium glass + neon design (Help sahifasi uslubida)
 * - Shuffle sections, lekin 2 ta ketma-ket bir xil tarafga (reverse) tushmasligi kerak
 * - Birinchi kartani har doim o'zgarmas holda qoldirish
 * - Smooth stagger + hover effektlari
 */

// Fisher-Yates shuffle
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/**
 * Birinchi elementni o'zgartirmaydi,
 * qolganlarini shuffle qiladi va ketma-ket ikkita bir xil reverse bo'lmasligini ta'minlaydi
 */
const shuffleKeepFirstNoDoubleSide = (items) => {
  if (!Array.isArray(items) || items.length <= 2) return items || [];

  const [first, ...rest0] = items;
  let rest = shuffle(rest0);

  const out = [first];

  while (rest.length > 0) {
    const prevReverse = out[out.length - 1].reverse;

    // oldingisidan farqli reverse ga ega elementni topish
    const idx = rest.findIndex((x) => x.reverse !== prevReverse);

    if (idx !== -1) {
      out.push(rest.splice(idx, 1)[0]);
      continue;
    }

    // agar topilmagan bo'lsa — oxirgi ikkitasini almashtirib ko'ramiz (agar imkon bo'lsa)
    if (out.length >= 2 && rest.length > 0) {
      const last = out[out.length - 1];
      const beforeLast = out[out.length - 2];

      if (rest[0].reverse !== beforeLast.reverse) {
        out.pop(); // oxirgisini olib tashlaymiz
        out.push(rest.shift()); // yangisini qo'yamiz
        rest.push(last); // eski oxirgini qaytarib qo'yamiz
        continue;
      }
    }

    // eng oxirgi chora: majburiy alternating qilamiz
    const rebuilt = [first, ...rest];
    return rebuilt.map((item, i) =>
      i === 0 ? item : { ...item, reverse: i % 2 === 1 },
    );
  }

  return out;
};

export const Welcome = () => {
  const initialSections = useMemo(
    () => [
      {
        title: "Welcome to Cyber Nexus",
        description: "Cyber Nexus - Your Ultimate Cybersecurity Solution",
        image: "/welcome.jpg",
        link: "/",
        reverse: false,
      },
      {
        title: "Go to Premium App",
        description: "Premium App - Your access to premium features",
        image: "/premium-app.avif",
        link: "/premium-app",
        reverse: true,
      },
      {
        title: "Go to News",
        description: "News - Stay updated with the latest cybersecurity news",
        image: "/news.webp",
        link: "/news",
        reverse: false,
      },
      {
        title: "Go to About",
        description: "About - Learn more about Cyber Nexus",
        image: "/about.jpg",
        link: "/about",
        reverse: true,
      },
      {
        title: "Go to Contact",
        description: "Contact - Get in touch with us",
        image: "/contact.jpg",
        link: "/contact",
        reverse: false,
      },
      {
        title: "Go to Help",
        description: "Help - Need help?",
        image: "/help.jpeg",
        link: "/help",
        reverse: true,
      },
      {
        title: "Services",
        description: "Explore our cybersecurity services",
        image: "services.jpg",
        link: "/services",
        reverse: false,
      },
      {
        title: "CTF Challenge",
        description: "Participate in Capture The Flag challenges",
        image: "/ctf-challenge.jpg",
        link: "/ctf-challenge",
        reverse: true,
      },
    ],
    [],
  );

  const [sections, setSections] = useState([]);

  useEffect(() => {
    setSections(shuffleKeepFirstNoDoubleSide(initialSections));
  }, [initialSections]);

  // Animatsiya variantlari
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.13,
        delayChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, filter: "blur(12px)", scale: 1.03 },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.1 },
    },
  };

  const Glass = ({ className, children }) => (
    <div
      className={classNames(
        "rounded-xl border-2 bg-black/60 backdrop-blur-xl",
        "border-neon-green/35 shadow-neon",
        className,
      )}
    >
      {children}
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-black font-mono text-neon-green overflow-x-hidden relative">
      {/* Soft grid background */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.09]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,170,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,170,.07) 1px, transparent 1px)",
          backgroundSize: "54px 54px",
        }}
      />

      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Glass className="p-6 sm:p-8 mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div>
                <div className="text-xs font-black tracking-widest text-neon-blue/90 uppercase">
                  CyberNexus Platform
                </div>
                <h1 className="mt-1 text-3xl sm:text-4xl font-black tracking-wider text-neon-green">
                  Welcome
                </h1>
                <p className="mt-3 text-base text-gray-300/90 max-w-2xl">
                  Tez navigatsiya: quyidagi modullardan birini tanlang va
                  bosing.
                </p>
              </div>
            </div>
          </Glass>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {sections.map((section, idx) => (
            <Link
              key={`${section.link}-${idx}`}
              to={section.link}
              className="block"
            >
              <motion.div
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.99 }}
              >
                <Glass
                  className={classNames(
                    "p-5 sm:p-6 transition-all duration-300",
                    "hover:border-neon-blue/60 hover:shadow-neon-blue",
                    "flex flex-col lg:flex-row items-center gap-6 lg:gap-8",
                    { "lg:flex-row-reverse": section.reverse },
                  )}
                >
                  {/* Image container */}
                  <motion.div
                    variants={imageVariants}
                    className={classNames(
                      "w-full lg:w-5/12 rounded-xl overflow-hidden",
                      "border border-neon-blue/30 bg-black/70 shadow-neon-blue",
                    )}
                  >
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-56 sm:h-64 lg:h-72 object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/600x400/0f1f0f/00ff9d?text=Image+Not+Found";
                        e.target.className += " object-contain p-8";
                      }}
                    />
                  </motion.div>

                  {/* Text */}
                  <div className="w-full lg:w-7/12 text-center lg:text-left space-y-4">
                    <motion.h2 className="text-2xl sm:text-3xl font-black tracking-wide text-neon-green">
                      {section.title}
                    </motion.h2>

                    <motion.p className="text-base sm:text-lg text-gray-300/90 leading-relaxed">
                      {section.description}
                    </motion.p>

                    <motion.div className="inline-flex items-center gap-3 mt-4 px-5 py-2 rounded-lg border border-neon-blue/40 bg-neon-blue/5 text-neon-blue text-sm font-bold tracking-widest">
                      OPEN MODULE →
                    </motion.div>
                  </div>
                </Glass>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Welcome;
