import { Link } from "react-router-dom";
import classNames from "classnames";
import { useContext, useState, useEffect, useRef } from "react";
import { GlobalContext } from "../../GlobalState/globalstate";
import { useLocation } from "react-router-dom";
import { FaTerminal } from "react-icons/fa";
import { motion } from "framer-motion";

export const WelcomeHeader = () => {
  const [open, setOpen] = useState(false);
  const { mode, setMode } = useContext(GlobalContext);
  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);
  const location = useLocation();

  const handleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const toggleSidebar = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close sidebar on mobile when navigating
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div
      style={{ display: location.pathname === "/faq" ? "none" : "block" }}
      className="fixed top-0 right-0 h-full z-50 font-mono"
    >
      <motion.div
        ref={menuButtonRef}
        className="fixed top-4 right-4 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-lg bg-black border-2 border-neon-green shadow-[0_0_15px_rgba(0,255,0,0.5)] cursor-pointer transition-all duration-300"
        onClick={toggleSidebar}
        onMouseEnter={() => window.innerWidth >= 640 && setOpen(true)}
        whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(0,255,0,0.7)" }}
        whileTap={{ scale: 0.95 }}
      >
        <FaTerminal className="text-neon-green text-xl sm:text-2xl" />
      </motion.div>

      <motion.div
        ref={sidebarRef}
        className={classNames(
          "fixed top-0 right-0 h-full w-64 sm:w-80 bg-black bg-opacity-95 border-l-2 border-neon-green shadow-[0_0_20px_rgba(0,255,0,0.3)] transform transition-transform duration-500 ease-in-out flex flex-col pt-16 px-4 sm:px-6 overflow-y-auto",
          {
            "translate-x-0": open,
            "translate-x-full": !open,
          }
        )}
        onMouseLeave={() => window.innerWidth >= 640 && setOpen(false)}
        initial={{ x: "100%" }}
        animate={{ x: open ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <Link to={"/"} className="mb-8">
          <motion.p
            className="text-2xl sm:text-3xl font-bold text-neon-green text-center tracking-wider"
            style={{ textShadow: "0 0 10px rgba(0,255,0,0.7)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            CyberNexus
          </motion.p>
        </Link>

        <div className="flex flex-col gap-3 sm:gap-4 text-base sm:text-lg text-neon-green">
          {[
            "premium-app",
            "news",
            "about",
            "contact",
            "help",
            "cyberflow",
            "nasa-gallery",
            "qr-code-generator",
            "base64-code",
            "uuid-generator",
            "hash-service",
            "ctf-challenge",
            "cybernexus-certificate",
            "portfolio",
          ].map((path, index) => (
            <motion.div
              key={path}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
            >
              <Link to={`/${path}`}>
                <p className="cursor-pointer hover:text-neon-blue transition-colors duration-200 tracking-wide">
                  {path.charAt(0).toUpperCase() + path.slice(1)}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.label
          htmlFor="mode"
          className="mt-8 mx-auto"
          onClick={handleMode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        ></motion.label>
      </motion.div>
    </div>
  );
};
