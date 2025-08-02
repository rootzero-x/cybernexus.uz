import { FaGithub, FaTelegram, FaInstagram } from "react-icons/fa";
import { SiHackthebox } from "react-icons/si";

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Glowing background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-900 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-blue-900 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute top-2/3 right-1/4 w-56 h-56 bg-green-900 rounded-full filter blur-3xl opacity-20"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-20">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <SiHackthebox className="text-green-400 text-3xl" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                CYBERNEXUS
              </span>
            </div>
            <div className="hidden md:flex space-x-6">
              <a
                href="#about"
                className="hover:text-green-400 transition-colors"
              >
                ABOUT
              </a>
              <a
                href="#projects"
                className="hover:text-green-400 transition-colors"
              >
                PROJECTS
              </a>
              <a
                href="#contact"
                className="hover:text-green-400 transition-colors"
              >
                CONTACT
              </a>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                  Oyatullokh
                </span>
                {/* <span className="text-gray-400">.DEV</span> */}
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-lg">
                Ethical Hacker • Security Researcher • Full Stack Developer
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/oyatullo2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-900 rounded-full hover:bg-gray-800 transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub className="text-2xl" />
                </a>
                <a
                  href="https://t.me/snovden_01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-900 rounded-full hover:bg-gray-800 transition-colors"
                  aria-label="Telegram"
                >
                  <FaTelegram className="text-2xl" />
                </a>
                <a
                  href="https://www.instagram.com/snowden.701/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-900 rounded-full hover:bg-gray-800 transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-2xl" />
                </a>
              </div>
            </div>
            <div className="relative">
              {/* Profile image container */}
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 border-2 border-green-400 rounded-lg transform rotate-3"></div>
                <div className="absolute inset-0 bg-gray-900 rounded-lg overflow-hidden">
                  {/* Replace with your actual image */}
                  <img src="/snowden.jpg" alt="" />
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <span className="text-gray-500 text-lg">PROFILE IMAGE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="mb-32">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <span className="w-8 h-0.5 bg-green-400 mr-4"></span>
            ABOUT ME
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-gray-300 mb-6">
                I'm a security enthusiast with a passion for ethical hacking and
                secure software development. My journey in cybersecurity began
                when I was 15, and since then I've been obsessed with
                understanding how systems work and how to make them more secure.
              </p>
              <p className="text-gray-300 mb-6">
                When I'm not breaking things (ethically), I'm building secure
                applications and contributing to open-source security projects.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-gray-900 rounded-full text-sm">
                  Penetration Testing
                </span>
                <span className="px-4 py-2 bg-gray-900 rounded-full text-sm">
                  Web Security
                </span>
                <span className="px-4 py-2 bg-gray-900 rounded-full text-sm">
                  React
                </span>
                <span className="px-4 py-2 bg-gray-900 rounded-full text-sm">
                  Node.js
                </span>
                <span className="px-4 py-2 bg-gray-900 rounded-full text-sm">
                  Python
                </span>
                <span className="px-4 py-2 bg-gray-900 rounded-full text-sm">
                  Cryptography
                </span>
              </div>
            </div>
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              <h3 className="text-xl font-bold mb-4 text-green-400">
                CURRENTLY
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">➜</span>
                  <span>Security Researcher at CyberNexus</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">➜</span>
                  <span>Developing secure applications</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">➜</span>
                  <span>Contributing to open-source security tools</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-32">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <span className="w-8 h-0.5 bg-green-400 mr-4"></span>
            FEATURED PROJECTS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-green-400 transition-colors"
              >
                <div className="h-48 bg-gradient-to-r from-gray-800 to-gray-700 flex items-center justify-center">
                  {/* <span className="text-gray-500">PROJECT IMAGE</span> */}
                  <img src="/cyber.jpg" alt="" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 bg-gray-800 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-20">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <span className="w-8 h-0.5 bg-green-400 mr-4"></span>
            GET IN TOUCH
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-gray-300 mb-8">
                Interested in working together or have a security question? Feel
                free to reach out through any of my social channels.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaGithub className="text-green-400 text-xl mr-4" />
                  <a
                    href="https://github.com/oyatullo2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-400 transition-colors"
                  >
                    github.com/oyatullo2
                  </a>
                </div>
                <div className="flex items-center">
                  <FaTelegram className="text-green-400 text-xl mr-4" />
                  <a
                    href="https://t.me/snovden_01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-400 transition-colors"
                  >
                    t.me/snovden_01
                  </a>
                </div>
                <div className="flex items-center">
                  <FaInstagram className="text-green-400 text-xl mr-4" />
                  <a
                    href="https://www.instagram.com/snowden.701/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-400 transition-colors"
                  >
                    instagram.com/snowden.701
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              <h3 className="text-xl font-bold mb-6 text-green-400">
                SEND A MESSAGE
              </h3>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-12 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-lg font-bold">CYBERNEXUS</span>
            </div>
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Snowden. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

const projects = [
  {
    title: "CyberFlow",
    description:
      "A network security monitoring tool with real-time threat detection.",
    tags: ["Python", "Security", "Networking"],
  },
  {
    title: "SecurePass",
    description:
      "End-to-end encrypted password manager with zero-knowledge architecture.",
    tags: ["React", "Node.js", "Cryptography"],
  },
  {
    title: "VulnScan",
    description: "Automated vulnerability scanner for web applications.",
    tags: ["Python", "Security", "Automation"],
  },
];

export default Portfolio;
