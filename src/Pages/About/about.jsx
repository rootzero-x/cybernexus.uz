import classNames from "classnames";
import { useState, useEffect, useRef } from "react";
import {
  FaTelegram,
  FaInstagram,
  FaGithub,
  FaShieldAlt,
  FaUsers,
  FaCheckCircle,
  FaTrophy,
  FaLock,
  FaCode,
  FaNetworkWired,
  FaRocket,
  FaFire,
  FaBolt,
  FaGraduationCap,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export const About = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const popoverRef = useRef(null);
  const joinUsRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isPopoverOpen &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        joinUsRef.current &&
        !joinUsRef.current.contains(event.target)
      ) {
        setIsPopoverOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isPopoverOpen]);

  const handleMouseLeave = (event) => {
    const relatedTarget = event.relatedTarget;
    if (
      popoverRef.current &&
      !popoverRef.current.contains(relatedTarget) &&
      joinUsRef.current &&
      !joinUsRef.current.contains(relatedTarget)
    ) {
      setIsPopoverOpen(false);
    }
  };

  const headingText = "CYBER NEXUS";
  const subHeading = "[ KIBERXAVFSIZLIK PLATFORMASI ]";

  const stats = [
    {
      icon: FaTrophy,
      value: "01",
      label: "TUMAN BOSQICHI",
      suffix: "",
      color: "from-yellow-400 to-orange-500",
      glow: "rgba(251, 191, 36, 0.4)",
    },
    {
      icon: FaUsers,
      value: "700",
      label: "FAOL FOYDALANUVCHI",
      suffix: "+",
      color: "from-neon-green to-emerald-400",
      glow: "rgba(0, 255, 170, 0.4)",
    },
    {
      icon: FaCheckCircle,
      value: "1500",
      label: "RO'YXATDAN O'TGAN",
      suffix: "+",
      color: "from-neon-blue to-cyan-400",
      glow: "rgba(0, 170, 255, 0.4)",
    },
  ];

  const features = [
    {
      icon: FaLock,
      title: "KIBERXAVFSIZLIK BILIMI",
      description:
        "Zamonaviy tahdidlardan himoyalanish texnikalari va amaliy bilimlar. Real vaqtda xavfsizlik strategiyalarini o'rganing.",
      gradient: "from-neon-green to-emerald-500",
    },
    {
      icon: FaCode,
      title: "CYBER AWARENESS",
      description:
        "Raqamli dunyoda xavfsiz qolish uchun muhim ko'nikmalar. Hujumlarni aniqlash va oldini olish usullari.",
      gradient: "from-neon-blue to-blue-500",
    },
    {
      icon: FaNetworkWired,
      title: "AMALIY DASTURLAR",
      description:
        "Professional kiberxavfsizlik vositalari va dasturlar. Penetration testing va vulnerability assessment.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: FaGraduationCap,
      title: "SAVOL-JAVOB",
      description:
        "Mutaxassislardan to'g'ridan-to'g'ri javoblar oling. Real case studylar va amaliy yechimlar.",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const glitchVariants = {
    initial: { x: 0 },
    animate: {
      x: [0, -2, 2, -2, 2, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 3,
      },
    },
  };

  return (
    <div className="w-full min-h-screen bg-black font-mono text-neon-green relative overflow-hidden">
      {/* Advanced Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(0, 255, 170, 0.1) 2px, transparent 2px),
            linear-gradient(90deg, rgba(0, 255, 170, 0.1) 2px, transparent 2px),
            linear-gradient(rgba(0, 255, 170, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 170, 0.05) 1px, transparent 1px)
          `,
            backgroundSize: "100px 100px, 100px 100px, 20px 20px, 20px 20px",
            backgroundPosition: "-2px -2px, -2px -2px, -1px -1px, -1px -1px",
          }}
        ></div>
      </div>

      {/* Animated Scanlines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="scanline-fast"></div>
        <div className="scanline-slow"></div>
      </div>

      {/* Cyber Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-green rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Mouse Glow Effect */}
      {!isMobile && (
        <motion.div
          className="absolute w-96 h-96 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 255, 170, 0.15) 0%, transparent 70%)",
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
          animate={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Title with Glitch */}
          <motion.div
            className="relative inline-block mb-4"
            variants={glitchVariants}
            initial="initial"
            animate="animate"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-wider text-neon-green glitch-text relative z-10">
              {headingText}
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-base sm:text-xl text-neon-blue font-semibold tracking-widest mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {subHeading}
          </motion.p>

          {/* Award Badge */}
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 border-2 border-yellow-400 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-lg backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <FaTrophy className="text-2xl sm:text-3xl text-yellow-400 animate-pulse" />
            <div className="text-left">
              <p className="text-xs sm:text-sm text-yellow-400 font-bold">
                YOSH IXTIROCHI
              </p>
              <p className="text-sm sm:text-base text-white font-black">
                VILOYAT BOSQICHI
              </p>
            </div>
            <FaFire className="text-2xl sm:text-3xl text-orange-500 animate-pulse" />
          </motion.div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          className="max-w-4xl mx-auto mb-12 sm:mb-16 p-6 sm:p-8 border-2 border-neon-green bg-black/60 backdrop-blur-md rounded-lg cyber-border"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <div className="flex items-start gap-4 mb-4">
            <FaShieldAlt className="text-3xl sm:text-4xl text-neon-green flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-neon-green mb-3 tracking-wide">
                &gt;_ MISSIYAMIZ
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-gray-300">
                Cyber Nexus — 2025-yilda ishga tushirilgan innovatsion
                kiberxavfsizlik platformasi. Biz tez o'zgarayotgan raqamli
                dunyoda foydalanuvchilarning xavfsizligini ta'minlash uchun
                professional bilimlar, yangiliklar va amaliy vositalarni taqdim
                etamiz. Kiberxavfsizlik — bu tizimlar va ma'lumotlarni
                hujumlardan himoya qilish, xavflarni aniqlash va tahdidlarni
                bartaraf etish ko'nikmalaridir. Bizning mutaxassis jamoamiz siz
                bilan eng so'nggi bilimlarni baham ko'rishga va global raqamli
                xavfsizlikni mustahkamlashga tayyor.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neon-blue tracking-wider mb-2">
              &gt; REAL NATIJALAR_
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-neon-blue to-transparent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="group relative p-6 sm:p-8 border-2 border-neon-green bg-black/80 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer cyber-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.15, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onHoverStart={() => setActiveCard(index)}
                onHoverEnd={() => setActiveCard(null)}
                style={{
                  boxShadow:
                    activeCard === index
                      ? `0 0 30px ${stat.glow}, 0 0 60px ${stat.glow}`
                      : "none",
                }}
              >
                {/* Animated Background */}
                <div
                  className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${stat.glow}, transparent)`,
                  }}
                ></div>

                {/* Corner Decorations */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-green"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-green"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-green"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-green"></div>

                <div className="relative z-10">
                  <stat.icon
                    className={`text-4xl sm:text-5xl mx-auto mb-4 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  />
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <span
                        className={`text-5xl sm:text-6xl md:text-7xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                      >
                        {stat.value}
                      </span>
                      <span className="text-3xl sm:text-4xl md:text-5xl font-black text-neon-blue ml-1">
                        {stat.suffix}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-gray-400 tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                </div>

                {/* Scan Line Effect */}
                <motion.div
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent"
                  animate={{
                    top: ["-10%", "110%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neon-green tracking-wider mb-2">
              &gt; PLATFORMANING IMKONIYATLARI_
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative p-6 border-2 border-neon-blue bg-black/70 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer hover-glow"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.7 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.03 }}
              >
                {/* Animated Gradient Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-br ${feature.gradient} bg-opacity-20 border border-neon-blue`}
                    >
                      <feature.icon className="text-2xl sm:text-3xl text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-white tracking-wide">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed pl-16">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Border Animation */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-blue to-transparent animate-border-flow"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Target Audience */}
        <motion.div
          className="max-w-4xl mx-auto mb-12 sm:mb-16 p-6 sm:p-8 border-2 border-neon-blue bg-black/60 backdrop-blur-md rounded-lg cyber-border"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <div className="flex items-start gap-4">
            <FaRocket className="text-3xl sm:text-4xl text-neon-blue flex-shrink-0 mt-1 animate-pulse" />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-neon-blue mb-4 tracking-wide">
                &gt;_ KIMLAR UCHUN?
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  "O'QUVCHILAR",
                  "TALABALAR",
                  "IT ENTHUSIASTS",
                  "BO'LAJAK HACKERLAR",
                ].map((audience, i) => (
                  <motion.div
                    key={i}
                    className="p-3 border border-neon-blue bg-neon-blue/5 rounded text-center"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(0, 170, 255, 0.1)",
                    }}
                  >
                    <FaBolt className="text-xl text-neon-blue mx-auto mb-2" />
                    <p className="text-xs font-bold text-gray-300">
                      {audience}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Social Connect */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3, duration: 0.8 }}
        >
          <div className="relative inline-block">
            <AnimatePresence>
              {isPopoverOpen && (
                <motion.div
                  ref={popoverRef}
                  className={classNames(
                    "absolute z-50 p-6 border-2 border-neon-blue bg-black/95 backdrop-blur-lg rounded-lg",
                    {
                      "left-1/2 -translate-x-1/2 -top-40 w-80": !isMobile,
                      "fixed bottom-0 left-0 right-0 w-full rounded-b-none":
                        isMobile,
                    }
                  )}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => setIsPopoverOpen(true)}
                  style={{
                    boxShadow:
                      "0 0 40px rgba(0, 170, 255, 0.4), 0 0 80px rgba(0, 170, 255, 0.2)",
                  }}
                >
                  <h3 className="text-xl font-black text-neon-green mb-6 text-center tracking-wider">
                    &gt; CONNECT WITH US_
                  </h3>
                  <div className="flex justify-around items-center">
                    {[
                      {
                        icon: FaTelegram,
                        href: "https://t.me/cyber_nexuss",
                        label: "TELEGRAM",
                        delay: 0.1,
                      },
                      {
                        icon: FaInstagram,
                        href: "https://instagram.com/cybernexus.uz",
                        label: "INSTAGRAM",
                        delay: 0.2,
                      },
                      {
                        icon: FaGithub,
                        href: "https://github.com/rootzero-x",
                        label: "GITHUB",
                        delay: 0.3,
                      },
                    ].map((social, i) => (
                      <motion.a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: social.delay }}
                        whileHover={{ scale: 1.15, y: -5 }}
                      >
                        <div className="p-3 border-2 border-neon-blue rounded-lg bg-neon-blue/10 group-hover:bg-neon-blue/20 transition-all duration-300">
                          <social.icon className="w-8 h-8 text-neon-blue group-hover:text-neon-green transition-colors duration-300" />
                        </div>
                        <span className="text-xs font-bold text-gray-400 group-hover:text-neon-green transition-colors duration-300">
                          {social.label}
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              ref={joinUsRef}
              className="px-8 py-4 text-xl sm:text-2xl font-black bg-gradient-to-r from-neon-green to-neon-blue text-black rounded-lg border-2 border-neon-green tracking-wider hover-pulse"
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              onMouseEnter={() => setIsPopoverOpen(true)}
              onMouseLeave={handleMouseLeave}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              &gt; BIZGA QO'SHILING! 🚀
            </motion.button>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="text-center pt-8 border-t-2 border-neon-green/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <p className="text-sm text-gray-500 mb-2 font-mono">
            © 2025 CYBER NEXUS — ALL RIGHTS RESERVED
          </p>
          <a
            href="https://cybernexus.uz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-blue hover:text-neon-green transition-colors duration-300 font-bold text-base tracking-wider"
          >
            &gt; cybernexus.uz_
          </a>
        </motion.footer>
      </div>

      <style jsx>{`
        .glitch-text {
          position: relative;
          text-shadow: 0 0 10px rgba(0, 255, 170, 0.8),
            0 0 20px rgba(0, 255, 170, 0.6), 0 0 30px rgba(0, 255, 170, 0.4);
        }

        .glitch-layer-1 {
          animation: glitch-1 2s infinite;
        }

        .glitch-layer-2 {
          animation: glitch-2 3s infinite;
        }

        @keyframes glitch-1 {
          0%,
          100% {
            transform: translate(0);
          }
          33% {
            transform: translate(-2px, 2px);
          }
          66% {
            transform: translate(2px, -2px);
          }
        }

        @keyframes glitch-2 {
          0%,
          100% {
            transform: translate(0);
          }
          33% {
            transform: translate(2px, -2px);
          }
          66% {
            transform: translate(-2px, 2px);
          }
        }

        .scanline-fast {
          position: absolute;
          width: 100%;
          height: 2px;
          background: linear-gradient(
            to right,
            transparent,
            rgba(0, 255, 170, 0.8),
            transparent
          );
          animation: scan-fast 4s linear infinite;
        }

        .scanline-slow {
          position: absolute;
          width: 100%;
          height: 100px;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(0, 170, 255, 0.1),
            transparent
          );
          animation: scan-slow 8s linear infinite;
        }

        @keyframes scan-fast {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }

        @keyframes scan-slow {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }

        .cyber-border::before {
          content: "";
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(
            45deg,
            transparent,
            rgba(0, 255, 170, 0.3),
            transparent
          );
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .cyber-border:hover::before {
          opacity: 1;
          animation: border-rotate 4s linear infinite;
        }

        .cyber-card {
          position: relative;
          transition: all 0.3s ease;
        }

        .cyber-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 255, 170, 0.2),
            transparent
          );
          transition: left 0.5s;
        }

        .cyber-card:hover::before {
          left: 100%;
        }

        .hover-glow:hover {
          box-shadow: 0 0 20px rgba(0, 170, 255, 0.4),
            0 0 40px rgba(0, 170, 255, 0.2),
            inset 0 0 20px rgba(0, 170, 255, 0.1);
        }

        .hover-pulse {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 10px rgba(0, 255, 170, 0.6),
              0 0 20px rgba(0, 255, 170, 0.4);
          }
          50% {
            box-shadow: 0 0 20px rgba(0, 255, 170, 0.8),
              0 0 40px rgba(0, 255, 170, 0.6);
          }
        }
        .animate-border-flow {
          animation: border-flow 2s linear infinite;
        }
        @keyframes border-flow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  );
};
