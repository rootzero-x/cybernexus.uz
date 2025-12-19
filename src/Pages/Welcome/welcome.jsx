import { Link } from "react-router-dom";
import classNames from "classnames";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Function to shuffle array (Fisher-Yates algorithm) excluding the first item
const shuffleArrayExcludingFirst = (array) => {
  const [first, ...rest] = array;
  const shuffledRest = [...rest];
  for (let i = shuffledRest.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledRest[i], shuffledRest[j]] = [shuffledRest[j], shuffledRest[i]];
  }
  return [first, ...shuffledRest];
};

export const Welcome = () => {
  const initialSections = [
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
      title: "QR Code Generator",
      description: "Generate QR codes for your links",
      image: "/qr-code-generator.webp",
      link: "/qr-code-generator",
      reverse: false,
    },
    {
      title: "Base64 Code",
      description: "Encode and decode Base64 data",
      image: "/base54-code.jpg",
      link: "/base64-code",
      reverse: true,
    },
    {
      title: "UUID Generator",
      description: "Generate unique UUIDs",
      image: "/uuid-generator.png",
      link: "/uuid-generator",
      reverse: false,
    },
    {
      title: "Hash Service",
      description: "Generate hashes like MD5 for your data",
      image: "/hash-service.jpg",
      link: "/hash-service",
      reverse: true,
    },
    {
      title: "CTF Challenge",
      description: "Participate in Capture The Flag challenges",
      image: "/ctf-challenge.jpg",
      link: "/ctf-challenge",
      reverse: false,
    },
  ];

  const [sections, setSections] = useState([]);

  // Shuffle sections on mount, keeping "Welcome" first
  useEffect(() => {
    setSections(shuffleArrayExcludingFirst(initialSections));
  }, []);

  // Variants for the scattering and assembling animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      x: () => Math.random() * 1000 - 500, // Random scatter within -500 to 500
      y: () => Math.random() * 1000 - 500,
      rotate: () => Math.random() * 360 - 180, // Random rotation
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotate: 0,
      transition: {
        duration: 1.5,
        type: "spring",
        stiffness: 50,
        damping: 10,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.8, delay: 0.3 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, delay: 0.5 },
    },
  };

  return (
    <div className="w-full min-h-screen bg-black font-mono text-neon-green px-4 sm:px-6 pt-6 pb-10">
      <motion.div
        className="w-full max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {sections.map((section, index) => (
          <Link key={index} to={section.link} className="w-full block">
            <motion.div
              className={classNames(
                "mb-6 sm:mb-8 border-2 border-neon-green bg-black bg-opacity-80 shadow-neon rounded-lg p-4 sm:p-5",
                "flex flex-col md:flex-row items-center",
                { "md:flex-row-reverse": section.reverse }
              )}
              variants={cardVariants}
              whileHover={{
                boxShadow: "0 0 30px rgba(0, 255, 255, 0.7)",
                borderColor: "#00f0ff",
                transition: { duration: 0.3 },
              }}
            >
              <motion.div
                className="w-full md:w-1/2 mb-4 md:mb-0 md:pr-4"
                variants={imageVariants}
              >
                <img
                  src={section.image}
                  className="rounded-lg max-h-[250px] sm:max-h-[300px] w-full object-cover border border-neon-blue shadow-neon-blue "
                  alt={section.title}
                />
              </motion.div>
              <div className="w-full md:w-1/2 flex flex-col items-center text-center">
                <motion.h1
                  className="text-xl sm:text-2xl font-bold mb-2 tracking-wide text-neon-green"
                  variants={textVariants}
                >
                  {section.title}
                </motion.h1>
                <motion.p
                  className="text-sm sm:text-base font-medium text-neon-green opacity-80"
                  variants={textVariants}
                >
                  {section.description}
                </motion.p>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
};
