import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Lock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Award,
  RefreshCw,
  Eye,
  EyeOff,
  Download,
} from "lucide-react";

// Move sub-components outside to prevent remounting on re-renders
const Glass = ({ className, children }) => (
  <div
    className={[
      "rounded-xl border-2 bg-black/55 backdrop-blur-xl",
      "border-neon-green/40 shadow-neon",
      className || "",
    ].join(" ")}
  >
    {children}
  </div>
);

const Chip = ({ active, onClick, icon: Icon, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={[
      "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-black tracking-wider transition-all",
      active
        ? "border-neon-blue bg-neon-blue/10 text-neon-blue shadow-neon-blue"
        : "border-neon-green/30 bg-black/50 text-gray-200 hover:border-neon-green hover:text-neon-green",
    ].join(" ")}
  >
    {Icon ? <Icon className="text-[12px]" /> : null}
    {children}
  </button>
);

const CertificateGenerator = () => {
  const [stage, setStage] = useState("intro"); // intro, exam, results, certificate
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [examQuestions, setExamQuestions] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  // certificate meta
  const [certId, setCertId] = useState("");
  const [issuedAt, setIssuedAt] = useState(""); // formatted string
  const canvasRef = useRef(null);
  // =========================
  // ✅ QUESTION BANK (EMPTY PLACEHOLDER)
  // Siz o‘zingiz ko‘chirib qo‘yasiz.
  // Strukturasi shunday bo‘lsin:
  // { id: 1, difficulty: "low+"|"medium+"|"hard+", question: "...", options: ["..."], correct: 0 }
  // =========================
  const questionBank = [
    // LOW+ Questions
    {
      id: 1,
      difficulty: "low+",
      question: "What does CIA stand for in cybersecurity?",
      options: [
        "Central Intelligence Agency",
        "Confidentiality, Integrity, Availability",
        "Cyber Information Analysis",
        "Computer Internet Access",
      ],
      correct: 1,
    },
    {
      id: 2,
      difficulty: "low+",
      question: "Which protocol is used for secure web browsing?",
      options: ["HTTP", "FTP", "HTTPS", "SMTP"],
      correct: 2,
    },
    {
      id: 3,
      difficulty: "low+",
      question: "What is the primary purpose of a firewall?",
      options: [
        "Speed up internet connection",
        "Filter and control network traffic",
        "Encrypt all data",
        "Store passwords",
      ],
      correct: 1,
    },
    {
      id: 4,
      difficulty: "low+",
      question: "What is phishing?",
      options: [
        "A type of firewall",
        "Social engineering attack using fraudulent emails",
        "A programming language",
        "A network protocol",
      ],
      correct: 1,
    },
    {
      id: 5,
      difficulty: "low+",
      question: "Which port does SSH typically use?",
      options: ["21", "22", "80", "443"],
      correct: 1,
    },
    {
      id: 6,
      difficulty: "low+",
      question: "What is malware?",
      options: [
        "A type of hardware",
        "Malicious software designed to harm systems",
        "A programming language",
        "A network device",
      ],
      correct: 1,
    },
    {
      id: 7,
      difficulty: "low+",
      question: "What does VPN stand for?",
      options: [
        "Virtual Private Network",
        "Very Private Network",
        "Verified Public Network",
        "Virtual Public Node",
      ],
      correct: 0,
    },
    {
      id: 8,
      difficulty: "low+",
      question: "Which of these is a strong password practice?",
      options: [
        "Using the same password everywhere",
        "Using your birthdate",
        "Using a mix of letters, numbers, and symbols",
        "Writing passwords on paper",
      ],
      correct: 2,
    },
    // MEDIUM+ Questions
    {
      id: 9,
      difficulty: "medium+",
      question: "What is SQL injection?",
      options: [
        "A type of database",
        "An attack that exploits vulnerabilities in SQL queries",
        "A programming language",
        "A network protocol",
      ],
      correct: 1,
    },
    {
      id: 10,
      difficulty: "medium+",
      question: "What is the purpose of penetration testing?",
      options: [
        "To damage systems",
        "To identify and exploit vulnerabilities ethically",
        "To install antivirus",
        "To backup data",
      ],
      correct: 1,
    },
    {
      id: 11,
      difficulty: "medium+",
      question: "Which cryptographic algorithm is asymmetric?",
      options: ["AES", "DES", "RSA", "3DES"],
      correct: 2,
    },
    {
      id: 12,
      difficulty: "medium+",
      question: "What is a zero-day vulnerability?",
      options: [
        "A vulnerability that takes zero days to exploit",
        "An unknown vulnerability with no patch available",
        "A vulnerability that lasts zero days",
        "A false positive in security scanning",
      ],
      correct: 1,
    },
    {
      id: 13,
      difficulty: "medium+",
      question: "What is the primary purpose of SIEM?",
      options: [
        "Email security",
        "Security Information and Event Management",
        "Software Installation and Environment Management",
        "System Integration and Error Monitoring",
      ],
      correct: 1,
    },
    {
      id: 14,
      difficulty: "medium+",
      question: "What is a Man-in-the-Middle (MitM) attack?",
      options: [
        "An attack on database servers",
        "Intercepting communication between two parties",
        "A physical security breach",
        "A type of malware",
      ],
      correct: 1,
    },
    {
      id: 15,
      difficulty: "medium+",
      question: "What does XSS stand for in web security?",
      options: [
        "Extra Security System",
        "Cross-Site Scripting",
        "Extended Security Service",
        "XML Security Standard",
      ],
      correct: 1,
    },
    {
      id: 16,
      difficulty: "medium+",
      question: "What is the purpose of a honeypot in cybersecurity?",
      options: [
        "To store sensitive data",
        "To attract and monitor attackers",
        "To encrypt communications",
        "To backup systems",
      ],
      correct: 1,
    },
    {
      id: 17,
      difficulty: "medium+",
      question: "Which protocol provides end-to-end encryption for emails?",
      options: ["SMTP", "POP3", "PGP", "IMAP"],
      correct: 2,
    },
    {
      id: 18,
      difficulty: "medium+",
      question: "What is the OWASP Top 10?",
      options: [
        "Top 10 hackers list",
        "List of most critical web application security risks",
        "Top 10 antivirus programs",
        "Top 10 programming languages",
      ],
      correct: 1,
    },
    {
      id: 19,
      difficulty: "medium+",
      question: "What is the purpose of two-factor authentication?",
      options: [
        "To make login slower",
        "To add an extra layer of security beyond passwords",
        "To encrypt data",
        "To monitor network traffic",
      ],
      correct: 1,
    },
    {
      id: 20,
      difficulty: "medium+",
      question: "What is a DDoS attack?",
      options: [
        "A type of encryption",
        "Distributed Denial of Service attack",
        "A database query",
        "A network protocol",
      ],
      correct: 1,
    },
    // HARD+ Questions
    {
      id: 21,
      difficulty: "hard+",
      question: "In AES encryption, what is the block size?",
      options: ["64 bits", "128 bits", "256 bits", "512 bits"],
      correct: 1,
    },
    {
      id: 22,
      difficulty: "hard+",
      question:
        "What is the primary difference between symmetric and asymmetric encryption?",
      options: [
        "Speed of encryption",
        "Symmetric uses one key, asymmetric uses key pairs",
        "Symmetric is more secure",
        "Asymmetric cannot be decrypted",
      ],
      correct: 1,
    },
    {
      id: 23,
      difficulty: "hard+",
      question: "What is a rainbow table attack used for?",
      options: [
        "Network scanning",
        "Cracking password hashes",
        "SQL injection",
        "XSS attacks",
      ],
      correct: 1,
    },
    {
      id: 24,
      difficulty: "hard+",
      question: "Which of the following is NOT a valid HTTP security header?",
      options: [
        "X-Frame-Options",
        "Content-Security-Policy",
        "X-Auth-Validator",
        "Strict-Transport-Security",
      ],
      correct: 2,
    },
    {
      id: 25,
      difficulty: "hard+",
      question: "What is the purpose of HSTS (HTTP Strict Transport Security)?",
      options: [
        "To compress web traffic",
        "To force browsers to use HTTPS connections",
        "To scan for malware",
        "To authenticate users",
      ],
      correct: 1,
    },
    {
      id: 26,
      difficulty: "hard+",
      question: "In a buffer overflow attack, what is typically overwritten?",
      options: [
        "Database records",
        "Memory addresses and return pointers",
        "Configuration files",
        "Network packets",
      ],
      correct: 1,
    },
    {
      id: 27,
      difficulty: "hard+",
      question: "What is the primary purpose of DNSSEC?",
      options: [
        "Speed up DNS queries",
        "Authenticate DNS responses and prevent DNS spoofing",
        "Encrypt all internet traffic",
        "Block malicious websites",
      ],
      correct: 1,
    },
    {
      id: 28,
      difficulty: "hard+",
      question: "Which technique is used to prevent SQL injection?",
      options: [
        "Using strong passwords",
        "Parameterized queries and prepared statements",
        "Encrypting the database",
        "Using HTTPS",
      ],
      correct: 1,
    },
    {
      id: 29,
      difficulty: "hard+",
      question: "What is a side-channel attack?",
      options: [
        "An attack through social media",
        "Extracting information from physical implementation of a system",
        "A type of phishing",
        "A network protocol vulnerability",
      ],
      correct: 1,
    },
    {
      id: 30,
      difficulty: "hard+",
      question: "What is the purpose of salt in password hashing?",
      options: [
        "To make passwords taste better",
        "To add random data to prevent rainbow table attacks",
        "To encrypt the password",
        "To compress the hash",
      ],
      correct: 1,
    },
    {
      id: 31,
      difficulty: "hard+",
      question: "What is privilege escalation?",
      options: [
        "Gaining higher access levels than authorized",
        "Increasing network speed",
        "Upgrading software",
        "Adding more users",
      ],
      correct: 0,
    },
    {
      id: 32,
      difficulty: "hard+",
      question: "What is the primary function of an IDS?",
      options: [
        "Intrusion Detection System - monitors for suspicious activities",
        "Internet Download System",
        "Integrated Database System",
        "Internal Deployment Service",
      ],
      correct: 0,
    },
    {
      id: 33,
      difficulty: "medium+",
      question: "What is the difference between IDS and IPS?",
      options: [
        "No difference",
        "IDS detects, IPS prevents",
        "IPS is slower",
        "IDS is more expensive",
      ],
      correct: 1,
    },
    {
      id: 34,
      difficulty: "hard+",
      question: "What is a WAF?",
      options: [
        "Wide Area Firewall",
        "Web Application Firewall",
        "Wireless Authentication Framework",
        "Windows Access Filter",
      ],
      correct: 1,
    },
    {
      id: 35,
      difficulty: "hard+",
      question: "In cryptography, what is perfect forward secrecy?",
      options: [
        "Encryption that never breaks",
        "Session keys are not compromised if long-term keys are",
        "Encryption without keys",
        "Fastest encryption method",
      ],
      correct: 1,
    },
    {
      id: 36,
      difficulty: "medium+",
      question: "What is the purpose of sandboxing?",
      options: [
        "Playing games",
        "Isolating and testing suspicious programs safely",
        "Data backup",
        "Network monitoring",
      ],
      correct: 1,
    },
    {
      id: 37,
      difficulty: "hard+",
      question: "What is a timing attack?",
      options: [
        "Attacking at specific times",
        "Exploiting time differences in cryptographic operations",
        "DDoS attack",
        "Brute force attack",
      ],
      correct: 1,
    },
    {
      id: 38,
      difficulty: "medium+",
      question: "What is the principle of least privilege?",
      options: [
        "Give everyone admin rights",
        "Users should have minimum access needed for their role",
        "Deny all access",
        "Share passwords",
      ],
      correct: 1,
    },
    {
      id: 39,
      difficulty: "hard+",
      question: "What is a logic bomb?",
      options: [
        "A physical explosive",
        "Malicious code triggered by specific conditions",
        "A network device",
        "An encryption algorithm",
      ],
      correct: 1,
    },
    {
      id: 40,
      difficulty: "medium+",
      question: "What is the purpose of digital signatures?",
      options: [
        "To make documents look pretty",
        "To verify authenticity and integrity of digital messages",
        "To encrypt files",
        "To compress data",
      ],
      correct: 1,
    },
  ];
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  // Disable copy, screenshot, and right-click (as you had)
  useEffect(() => {
    if (stage === "exam") {
      const preventCopy = (e) => e.preventDefault();
      const preventScreenshot = (e) => {
        if (
          e.key === "PrintScreen" ||
          (e.ctrlKey && e.shiftKey && (e.key === "S" || e.key === "s")) ||
          (e.metaKey && e.shiftKey && (e.key === "3" || e.key === "4" || e.key === "5"))
        ) {
          e.preventDefault();
          alert("🚫 Screenshots are disabled during the exam!");
          return false;
        }
      };
      const preventRightClick = (e) => {
        e.preventDefault();
        alert("🚫 Right-click is disabled during the exam!");
      };
      document.addEventListener("copy", preventCopy);
      document.addEventListener("cut", preventCopy);
      document.addEventListener("contextmenu", preventRightClick);
      document.addEventListener("keyup", preventScreenshot);
      document.addEventListener("keydown", preventScreenshot);
      return () => {
        document.removeEventListener("copy", preventCopy);
        document.removeEventListener("cut", preventCopy);
        document.removeEventListener("contextmenu", preventRightClick);
        document.removeEventListener("keyup", preventScreenshot);
        document.removeEventListener("keydown", preventScreenshot);
      };
    }
  }, [stage]);
  // Timer
  useEffect(() => {
    if (stage === "exam" && examStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [stage, examStarted, timeLeft]);
  // Build cert meta when passed
  const buildCertMeta = () => {
    const id = `CNX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    const today = new Date();
    const issued = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCertId(id);
    setIssuedAt(issued);
    return { id, issued };
  };
  const selectRandomQuestions = () => {
    const available = questionBank.filter((q) => !usedQuestions.includes(q.id));
    if (available.length < 15) {
      setUsedQuestions([]);
      return selectRandomQuestions();
    }
    // Mix difficulties: 4 low+, 7 medium+, 4 hard+
    const low = available.filter((q) => q.difficulty === "low+");
    const medium = available.filter((q) => q.difficulty === "medium+");
    const hard = available.filter((q) => q.difficulty === "hard+");
    const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);
    const selected = [
      ...shuffleArray(low).slice(0, 4),
      ...shuffleArray(medium).slice(0, 7),
      ...shuffleArray(hard).slice(0, 4),
    ];
    const finalQuestions = shuffleArray(selected);
    setExamQuestions(finalQuestions);
    setUsedQuestions((prev) => [...prev, ...finalQuestions.map((q) => q.id)]);
  };
  const startExam = () => {
    if (!firstName.trim() || !lastName.trim()) {
      alert("⚠️ Please enter your full name!");
      return;
    }
    if (!questionBank.length) {
      alert("⚠️ Savollar (questionBank) hali qo‘shilmagan!");
      return;
    }
    selectRandomQuestions();
    setStage("exam");
    setExamStarted(true);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(1800);
  };
  const handleAnswerSelect = (questionIndex, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
    setShowAnswer(false);
  };
  const handleNext = () => {
    if (currentQuestion < examQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowAnswer(false);
    }
  };
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setShowAnswer(false);
    }
  };
  const handleSubmitExam = () => {
    let correctCount = 0;
    examQuestions.forEach((question, index) => {
      if (answers[index] === question.correct) correctCount++;
    });
    const percentage = (correctCount / examQuestions.length) * 100;
    setScore(percentage);
    setStage("results");
    setExamStarted(false);
    // if pass, pre-generate meta now
    if (percentage >= 80) buildCertMeta();
  };
  const generateCertificate = (meta) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = 1600;
    canvas.height = 1200;
    // Background
    ctx.fillStyle = "#05070b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Soft grid
    ctx.strokeStyle = "rgba(0, 255, 170, 0.08)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= canvas.width; x += 56) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += 56) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    // Circuit strokes
    ctx.strokeStyle = "rgba(0, 255, 136, 0.12)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 160; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }
    // Border glow
    ctx.strokeStyle = "#00ff88";
    ctx.shadowColor = "#00ff88";
    ctx.shadowBlur = 18;
    ctx.lineWidth = 14;
    ctx.strokeRect(52, 52, canvas.width - 104, canvas.height - 104);
    ctx.shadowBlur = 0;
    // Top left mark
    ctx.font = "bold 86px 'Courier New', monospace";
    ctx.fillStyle = "rgba(0, 255, 170, 0.85)";
    ctx.textAlign = "left";
    ctx.fillText(">_", 98, 150);
    // Title (glitch-ish)
    ctx.textAlign = "center";
    ctx.font = "bold 92px 'Orbitron', sans-serif";
    ctx.fillStyle = "#00ffaa";
    ctx.fillText("CYBER NEXUS", canvas.width / 2 + 3, 182);
    ctx.fillStyle = "#2ad3ff";
    ctx.fillText("CYBER NEXUS", canvas.width / 2 - 3, 182);
    ctx.fillStyle = "#00ffaa";
    ctx.fillText("CYBER NEXUS", canvas.width / 2, 182);
    // Subtitle
    ctx.font = "800 36px 'Rajdhani', sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.fillText("CERTIFICATE OF CYBERSECURITY EXCELLENCE", canvas.width / 2, 248);
    // Badge
    const cx = canvas.width / 2;
    const cy = 410;
    const rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 130);
    rg.addColorStop(0, "#00ff88");
    rg.addColorStop(1, "#003322");
    ctx.fillStyle = rg;
    ctx.beginPath();
    ctx.arc(cx, cy, 130, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#05070b";
    ctx.beginPath();
    ctx.arc(cx, cy, 106, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = "bold 62px 'Orbitron', sans-serif";
    ctx.fillStyle = "#00ff88";
    ctx.fillText("CNX", cx, cy + 22);
    // Recipient labels
    ctx.font = "700 34px 'Rajdhani', sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.fillText("THIS CERTIFIES THAT", cx, 552);
    // Name dynamic
    const fullName = `${firstName.toUpperCase()} ${lastName.toUpperCase()}`;
    let fontSize = 98;
    ctx.font = `900 ${fontSize}px 'Orbitron', sans-serif`;
    const maxWidth = canvas.width - 220;
    while (ctx.measureText(fullName).width > maxWidth && fontSize > 44) {
      fontSize -= 2;
      ctx.font = `900 ${fontSize}px 'Orbitron', sans-serif`;
    }
    ctx.shadowColor = "#00ff88";
    ctx.shadowBlur = 14;
    ctx.fillStyle = "#00ffcc";
    ctx.fillText(fullName, cx, 655);
    ctx.shadowBlur = 0;
    // Achievement
    ctx.font = "700 38px 'Rajdhani', sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.fillText("HAS SUCCESSFULLY COMPLETED THE", cx, 748);
    ctx.font = "bold 62px 'Orbitron', sans-serif";
    ctx.fillStyle = "#00ff88";
    ctx.fillText("CYBERSECURITY PROFESSIONAL EXAM", cx, 828);
    // Score
    ctx.font = "bold 46px 'Orbitron', sans-serif";
    ctx.fillStyle = "#2ad3ff";
    ctx.fillText(`SCORE: ${score.toFixed(1)}%`, cx, 905);
    // Footer motto
    ctx.font = "italic 34px 'Rajdhani', sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.68)";
    ctx.fillText("SECURE • VERIFY • BUILD", cx, 970);
    // Meta right
    const cert = meta?.id || certId || `CNX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    const dateStr =
      meta?.issued ||
      issuedAt ||
      new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    ctx.textAlign = "right";
    ctx.font = "700 24px 'Courier New', monospace";
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.fillText(`CERT ID: ${cert}`, canvas.width - 100, 1050);
    ctx.fillText(`DATE: ${dateStr}`, canvas.width - 100, 1082);
    // Seal (bottom-right)
    ctx.beginPath();
    ctx.arc(canvas.width - 205, 1146, 62, 0, Math.PI * 2);
    ctx.strokeStyle = "#2ad3ff";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.textAlign = "center";
    ctx.font = "bold 22px 'Courier New', monospace";
    ctx.fillStyle = "#2ad3ff";
    ctx.fillText("CYBER", canvas.width - 205, 1137);
    ctx.fillText("NEXUS", canvas.width - 205, 1164);
  };
  const downloadCertificate = async () => {
    const meta = { id: certId || buildCertMeta().id, issued: issuedAt || buildCertMeta().issued };
    // ensure fonts ready (best-effort)
    try {
      if (document?.fonts?.ready) await document.fonts.ready;
    } catch {}
    generateCertificate(meta);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `CyberNexus_Certificate_${firstName}_${lastName}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };
  const retryExam = () => {
    setStage("intro");
    setCurrentQuestion(0);
    setAnswers({});
    setScore(0);
    setTimeLeft(1800);
    setExamQuestions([]);
    setShowAnswer(false);
    setExamStarted(false);
    // keep usedQuestions (as you had) OR reset? keep as is
  };
  // Auto-render canvas when opening certificate preview
  useEffect(() => {
    if (stage !== "certificate") return;
    const meta = {
      id: certId || buildCertMeta().id,
      issued:
        issuedAt ||
        new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    };
    let alive = true;
    (async () => {
      try {
        if (document?.fonts?.ready) await document.fonts.ready;
      } catch {}
      // next tick for canvas mount
      requestAnimationFrame(() => {
        if (!alive) return;
        generateCertificate(meta);
      });
    })();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);
  // =========================================
  // INTRO STAGE (unchanged core, small class unification)
  // =========================================
  if (stage === "intro") {
    return (
      <div className="w-full min-h-screen bg-black font-mono text-neon-green overflow-x-hidden">
        {/* soft grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,255,170,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,170,.08) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="relative w-full max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <Glass className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg border border-neon-blue/40 bg-neon-blue/10 grid place-items-center shadow-neon-blue">
                      <Shield className="text-neon-blue" size={22} />
                    </div>
                    <div className="min-w-0">
                      <h1 className="text-2xl sm:text-3xl font-black tracking-wider text-neon-green truncate">
                        CyberNexus Exam
                      </h1>
                      <p className="mt-1 text-xs sm:text-sm text-neon-blue/90 font-bold tracking-widest truncate">
                        CERTIFICATE • PRO LEVEL
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm sm:text-base text-gray-300/90 leading-relaxed">
                    Testni yakunlang va sertifikat oling. 15 ta savol, 30 daqiqa, 80% passing.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Chip active icon={Lock}>
                      Anti-copy
                    </Chip>
                    <Chip active icon={RefreshCw}>
                      Random set
                    </Chip>
                    <Chip active icon={Award}>
                      Certificate
                    </Chip>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <div className="rounded-xl border border-neon-green/25 bg-black/70 backdrop-blur-xl px-4 py-3">
                    <div className="text-[11px] font-black tracking-widest text-gray-400">PASSING SCORE</div>
                    <div className="mt-1 text-2xl font-black text-neon-blue">80%</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black tracking-widest text-neon-blue mb-2">
                    FIRST NAME
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className={[
                      "w-full rounded-xl border-2 bg-black/60 backdrop-blur px-4 py-3 text-sm",
                      "border-neon-green/35 text-neon-green placeholder:text-gray-500",
                      "focus:outline-none focus:border-neon-blue focus:shadow-neon-blue",
                    ].join(" ")}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black tracking-widest text-neon-blue mb-2">
                    LAST NAME
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    className={[
                      "w-full rounded-xl border-2 bg-black/60 backdrop-blur px-4 py-3 text-sm",
                      "border-neon-green/35 text-neon-green placeholder:text-gray-500",
                      "focus:outline-none focus:border-neon-blue focus:shadow-neon-blue",
                    ].join(" ")}
                  />
                </div>
              </div>
              <motion.button
                onClick={startExam}
                className={[
                  "mt-5 w-full rounded-xl border-2 border-neon-green",
                  "bg-gradient-to-r from-neon-green to-neon-blue",
                  "px-5 py-4 text-sm sm:text-base font-black tracking-widest text-black shadow-neon",
                  "hover:shadow-neon-blue transition-all inline-flex items-center justify-center gap-2",
                ].join(" ")}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <Shield size={18} />
                START EXAM
              </motion.button>
            </Glass>
          </motion.div>
        </div>
        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Rajdhani:wght@300;500;700&display=swap");
        `}</style>
      </div>
    );
  }
  // =========================================
  // EXAM STAGE (your original layout kept)
  // =========================================
  if (stage === "exam") {
    const currentQ = examQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / examQuestions.length) * 100;
    return (
      <div className="min-h-screen bg-black text-[#00ff88] font-mono p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-[#0a0a12] border-2 border-[#00ff88] rounded-lg p-4 mb-6 shadow-[0_0_20px_rgba(0,255,136,0.3)]">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <Shield size={32} className="text-[#00ff88]" />
                <div>
                  <h2 className="text-xl md:text-2xl font-bold">Cybersecurity Exam</h2>
                  <p className="text-sm text-gray-400">
                    {firstName} {lastName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#00ffcc]">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="text-xs text-gray-400">Time Left</div>
                </div>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-2">
                <span>
                  Question {currentQuestion + 1} of {examQuestions.length}
                </span>
                <span>{progress.toFixed(0)}% Complete</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00ff88] to-[#00ffcc]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>
          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0a0a12] border-2 border-[#00ff88] rounded-lg p-6 md:p-8 mb-6 shadow-[0_0_20px_rgba(0,255,136,0.3)]"
            >
              {/* Difficulty Badge */}
              <div className="mb-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    currentQ.difficulty === "low+"
                      ? "bg-green-900 text-green-300"
                      : currentQ.difficulty === "medium+"
                      ? "bg-yellow-900 text-yellow-300"
                      : "bg-red-900 text-red-300"
                  }`}
                >
                  {currentQ.difficulty.toUpperCase()}
                </span>
              </div>
              {/* Question */}
              <h3 className="text-xl md:text-2xl font-bold mb-6 text-white leading-relaxed">
                {currentQ.question}
              </h3>
              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(currentQuestion, index)}
                    className={`w-full p-4 rounded-lg text-left transition-all border-2 ${
                      answers[currentQuestion] === index
                        ? "border-[#00ff88] bg-[#00ff88] bg-opacity-20 text-white"
                        : "border-gray-700 bg-gray-900 text-gray-300 hover:border-[#00ff88] hover:bg-gray-800"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          answers[currentQuestion] === index ? "border-[#00ff88] bg-[#00ff88]" : "border-gray-600"
                        }`}
                      >
                        {answers[currentQuestion] === index && <CheckCircle size={16} className="text-black" />}
                      </div>
                      <span className="text-sm md:text-base">{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
              {/* Answer Status */}
              {answers[currentQuestion] !== undefined && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-green-900 bg-opacity-30 border border-green-700 rounded-lg"
                >
                  <p className="text-green-300 text-sm flex items-center gap-2">
                    <CheckCircle size={16} />
                    Answer selected
                  </p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
          {/* Navigation */}
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <motion.button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex-1 py-3 bg-gray-800 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-all"
              whileHover={{ scale: currentQuestion === 0 ? 1 : 1.02 }}
              whileTap={{ scale: currentQuestion === 0 ? 1 : 0.98 }}
            >
              ← Previous
            </motion.button>
            {currentQuestion < examQuestions.length - 1 ? (
              <motion.button
                onClick={handleNext}
                className="flex-1 py-3 bg-[#00ff88] text-black rounded-lg font-semibold hover:bg-[#00ffcc] transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Next →
              </motion.button>
            ) : (
              <motion.button
                onClick={handleSubmitExam}
                className="flex-1 py-3 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] text-black rounded-lg font-bold text-lg shadow-[0_0_20px_rgba(0,255,136,0.5)] hover:shadow-[0_0_30px_rgba(0,255,136,0.8)] transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit Exam
              </motion.button>
            )}
          </div>
          {/* Question Navigator */}
          <div className="bg-[#0a0a12] border-2 border-[#00ff88] rounded-lg p-4 shadow-[0_0_20px_rgba(0,255,136,0.3)]">
            <h4 className="text-sm font-bold mb-3">Quick Navigation</h4>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {examQuestions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`aspect-square rounded-lg text-sm font-bold transition-all ${
                    answers[index] !== undefined
                      ? "bg-[#00ff88] text-black"
                      : currentQuestion === index
                      ? "bg-gray-700 text-white border-2 border-[#00ff88]"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Answered: {Object.keys(answers).length} / {examQuestions.length}
            </p>
          </div>
        </div>
        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Rajdhani:wght@300;500;700&display=swap");
          body {
            background: radial-gradient(ellipse at center, #0a0a12 0%, #000000 100%);
          }
        `}</style>
      </div>
    );
  }
  // =========================================
  // RESULTS STAGE (small “View Certificate” -> new premium certificate stage)
  // =========================================
  if (stage === "results") {
    const passed = score >= 80;
    const correctAnswers = examQuestions.length ? Math.round((score / 100) * examQuestions.length) : 0;
    return (
      <div className="w-full min-h-screen bg-black font-mono text-neon-green overflow-x-hidden">
        {/* soft grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,255,170,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,170,.08) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="relative w-full max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Glass className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <div
                      className={[
                        "h-12 w-12 rounded-lg border grid place-items-center",
                        passed
                          ? "border-neon-green/40 bg-neon-green/10 shadow-neon"
                          : "border-red-500/40 bg-red-500/10",
                      ].join(" ")}
                    >
                      {passed ? <CheckCircle className="text-neon-green" /> : <XCircle className="text-red-400" />}
                    </div>
                    <div className="min-w-0">
                      <h2
                        className={[
                          "text-2xl sm:text-3xl font-black tracking-wider truncate",
                          passed ? "text-neon-blue" : "text-red-300",
                        ].join(" ")}
                      >
                        {passed ? "CONGRATULATIONS" : "KEEP LEARNING"}
                      </h2>
                      <p className="mt-1 text-xs sm:text-sm text-gray-400 font-bold tracking-widest truncate">
                        {firstName} {lastName}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Chip active={passed} icon={Award}>
                      {passed ? "CERTIFIED" : "NOT CERTIFIED"}
                    </Chip>
                    <Chip active icon={Shield}>
                      SCORE: {score.toFixed(1)}%
                    </Chip>
                    {passed ? (
                      <Chip active icon={CheckCircle}>
                        CERT ID READY
                      </Chip>
                    ) : (
                      <Chip active={false} icon={AlertTriangle}>
                        PASS: 80%
                      </Chip>
                    )}
                  </div>
                </div>
                <div className="hidden sm:block">
                  <div className="rounded-xl border border-neon-green/25 bg-black/70 backdrop-blur-xl px-4 py-3">
                    <div className="text-[11px] font-black tracking-widest text-gray-400">RESULT</div>
                    <div className={["mt-1 text-2xl font-black", passed ? "text-neon-green" : "text-red-300"].join(" ")}>
                      {passed ? "PASS" : "FAIL"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-neon-green/25 bg-black/60 p-4">
                  <div className="text-[11px] font-black tracking-widest text-gray-400">CORRECT</div>
                  <div className="mt-1 text-3xl font-black text-neon-blue">{correctAnswers}</div>
                </div>
                <div className="rounded-xl border border-neon-green/25 bg-black/60 p-4">
                  <div className="text-[11px] font-black tracking-widest text-gray-400">INCORRECT</div>
                  <div className="mt-1 text-3xl font-black text-red-300">
                    {Math.max(0, examQuestions.length - correctAnswers)}
                  </div>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {passed ? (
                  <>
                    <motion.button
                      onClick={downloadCertificate}
                      className={[
                        "w-full rounded-xl border-2 border-neon-green",
                        "bg-gradient-to-r from-neon-green to-neon-blue",
                        "px-5 py-4 text-sm sm:text-base font-black tracking-widest text-black shadow-neon",
                        "hover:shadow-neon-blue transition-all inline-flex items-center justify-center gap-2",
                      ].join(" ")}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Award size={18} />
                      DOWNLOAD CERTIFICATE
                    </motion.button>
                    <motion.button
                      onClick={() => setStage("certificate")}
                      className="w-full rounded-xl border-2 border-neon-blue bg-neon-blue/10 px-5 py-3 text-xs sm:text-sm font-black tracking-widest text-neon-blue hover:border-neon-green hover:text-neon-green transition-all inline-flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Eye size={16} />
                      VIEW CERTIFICATE
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    onClick={retryExam}
                    className={[
                      "w-full rounded-xl border-2 border-neon-green",
                      "bg-gradient-to-r from-neon-green to-neon-blue",
                      "px-5 py-4 text-sm sm:text-base font-black tracking-widest text-black shadow-neon",
                      "hover:shadow-neon-blue transition-all inline-flex items-center justify-center gap-2",
                    ].join(" ")}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <RefreshCw size={18} />
                    RETAKE EXAM
                  </motion.button>
                )}
              </div>
            </Glass>
          </motion.div>
        </div>
        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Rajdhani:wght@300;500;700&display=swap");
        `}</style>
      </div>
    );
  }
  // =========================================
  // CERTIFICATE STAGE (new premium stage)
  // =========================================
  if (stage === "certificate") {
    return (
      <div className="w-full min-h-screen bg-black font-mono text-neon-green overflow-x-hidden">
        {/* soft grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,255,170,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,170,.08) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Glass className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <div
                      className={[
                        "h-12 w-12 rounded-lg border grid place-items-center",
                        "border-neon-green/40 bg-neon-green/10 shadow-neon",
                      ].join(" ")}
                    >
                      <Award className="text-neon-green" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-2xl sm:text-3xl font-black tracking-wider truncate text-neon-blue">
                        YOUR CERTIFICATE
                      </h2>
                      <p className="mt-1 text-xs sm:text-sm text-gray-400 font-bold tracking-widest truncate">
                        {firstName} {lastName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-col items-center">
                <canvas ref={canvasRef} className="w-full max-w-3xl border-4 border-neon-green rounded-lg shadow-neon" />
                <motion.button
                  onClick={downloadCertificate}
                  className={[
                    "mt-6 w-full max-w-xs rounded-xl border-2 border-neon-green",
                    "bg-gradient-to-r from-neon-green to-neon-blue",
                    "px-5 py-4 text-sm sm:text-base font-black tracking-widest text-black shadow-neon",
                    "hover:shadow-neon-blue transition-all inline-flex items-center justify-center gap-2",
                  ].join(" ")}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download size={18} />
                  DOWNLOAD CERTIFICATE
                </motion.button>
                <motion.button
                  onClick={retryExam}
                  className="mt-4 w-full max-w-xs rounded-xl border-2 border-neon-blue bg-neon-blue/10 px-5 py-3 text-xs sm:text-sm font-black tracking-widest text-neon-blue hover:border-neon-green hover:text-neon-green transition-all inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <RefreshCw size={16} />
                  RETAKE EXAM
                </motion.button>
              </div>
            </Glass>
          </motion.div>
        </div>
        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Rajdhani:wght@300;500;700&display=swap");
        `}</style>
      </div>
    );
  }
  // =========================================
  // FALLBACK (should not reach here)
  // =========================================
  return null;
}
export default CertificateGenerator;