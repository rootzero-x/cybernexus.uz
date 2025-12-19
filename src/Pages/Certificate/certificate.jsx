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
} from "lucide-react";

const CyberNexusCertificateExam = () => {
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
  const canvasRef = useRef(null);

  // Comprehensive question bank with difficulty levels
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

  // Disable copy, screenshot, and right-click
  useEffect(() => {
    if (stage === "exam") {
      const preventCopy = (e) => e.preventDefault();
      const preventScreenshot = (e) => {
        if (
          e.key === "PrintScreen" ||
          (e.ctrlKey && e.shiftKey && (e.key === "S" || e.key === "s")) ||
          (e.metaKey &&
            e.shiftKey &&
            (e.key === "3" || e.key === "4" || e.key === "5"))
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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
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
    selectRandomQuestions();
    setStage("exam");
    setExamStarted(true);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(1800);
  };

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
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
      if (answers[index] === question.correct) {
        correctCount++;
      }
    });
    const percentage = (correctCount / examQuestions.length) * 100;
    setScore(percentage);
    setStage("results");
    setExamStarted(false);
  };

  const generateCertificate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 1600;
    canvas.height = 1200;

    // Background
    ctx.fillStyle = "#0a0a12";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Circuit pattern
    ctx.strokeStyle = "rgba(0, 255, 100, 0.1)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 200; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // Binary rain
    ctx.fillStyle = "rgba(0, 255, 100, 0.05)";
    ctx.font = "16px Monospace";
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.fillText(Math.random().toString(2).substring(2, 10), x, y);
    }

    // Border
    ctx.strokeStyle = "#00ff88";
    ctx.shadowColor = "#00ff88";
    ctx.shadowBlur = 20;
    ctx.lineWidth = 15;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);
    ctx.shadowBlur = 0;

    // Logo
    ctx.font = "bold 80px 'Courier New', monospace";
    ctx.fillStyle = "rgba(0, 255, 150, 0.8)";
    ctx.textAlign = "left";
    ctx.fillText(">_", 100, 150);

    // Header with glitch
    ctx.font = "bold 90px 'Orbitron', sans-serif";
    ctx.fillStyle = "#00ffaa";
    ctx.textAlign = "center";
    ctx.fillText("CYBER NEXUS", canvas.width / 2 + 3, 180);
    ctx.fillStyle = "#ff00aa";
    ctx.fillText("CYBER NEXUS", canvas.width / 2 - 3, 180);
    ctx.fillStyle = "#00ffaa";
    ctx.fillText("CYBER NEXUS", canvas.width / 2, 180);

    // Certificate title
    ctx.font = "italic 40px 'Rajdhani', sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(
      "CERTIFICATE OF CYBERSECURITY EXCELLENCE",
      canvas.width / 2,
      250
    );

    // Badge
    const centerX = canvas.width / 2;
    const centerY = 400;
    const gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      120
    );
    gradient.addColorStop(0, "#00ff88");
    gradient.addColorStop(1, "#005533");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 120, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#0a0a12";
    ctx.beginPath();
    ctx.arc(centerX, centerY, 100, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = "bold 60px 'Orbitron', sans-serif";
    ctx.fillStyle = "#00ff88";
    ctx.fillText("CNX", centerX, centerY + 20);

    // Recipient
    ctx.font = "bold 72px 'Rajdhani', sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("THIS CERTIFIES THAT", centerX, 550);

    // Name with dynamic sizing
    const fullName = `${firstName.toUpperCase()} ${lastName.toUpperCase()}`;
    let fontSize = 96;
    ctx.font = `bold ${fontSize}px 'Orbitron', sans-serif`;
    let textWidth = ctx.measureText(fullName).width;
    const maxWidth = canvas.width - 200;

    while (textWidth > maxWidth && fontSize > 40) {
      fontSize -= 2;
      ctx.font = `bold ${fontSize}px 'Orbitron', sans-serif`;
      textWidth = ctx.measureText(fullName).width;
    }

    ctx.shadowColor = "#00ff88";
    ctx.shadowBlur = 15;
    ctx.fillStyle = "#00ffcc";
    ctx.fillText(fullName, centerX, 650);
    ctx.shadowBlur = 0;

    // Achievement
    ctx.font = "italic 54px 'Rajdhani', sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("HAS SUCCESSFULLY COMPLETED THE", centerX, 750);

    ctx.font = "bold 64px 'Orbitron', sans-serif";
    ctx.fillStyle = "#00ff88";
    ctx.fillText("CYBERSECURITY PROFESSIONAL EXAM", centerX, 830);

    // Score
    ctx.font = "bold 48px 'Orbitron', sans-serif";
    ctx.fillStyle = "#00ffcc";
    ctx.fillText(`SCORE: ${score.toFixed(1)}%`, centerX, 900);

    // Quote
    ctx.font = "italic 36px 'Rajdhani', sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fillText("CERTIFIED CYBERSECURITY EXCELLENCE", centerX, 970);

    // Validation
    ctx.font = "24px 'Courier New', monospace";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "right";
    ctx.fillText(
      "CERT ID: CNX-" +
        Math.random().toString(36).substring(2, 10).toUpperCase(),
      canvas.width - 100,
      1050
    );

    const today = new Date();
    ctx.fillText(
      "DATE: " +
        today.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      canvas.width - 100,
      1080
    );

    // Seal
    ctx.beginPath();
    ctx.arc(canvas.width - 200, 1150, 60, 0, Math.PI * 2);
    ctx.strokeStyle = "#00ff88";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.font = "bold 24px 'Courier New', monospace";
    ctx.fillStyle = "#00ff88";
    ctx.textAlign = "center";
    ctx.fillText("CYBER", canvas.width - 200, 1140);
    ctx.fillText("NEXUS", canvas.width - 200, 1165);
  };

  const downloadCertificate = () => {
    generateCertificate();
    const canvas = canvasRef.current;
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
  };

  // Intro Stage
  if (stage === "intro") {
    return (
      <div className="min-h-screen bg-black text-[#00ff88] font-mono flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-2xl bg-black bg-opacity-90 border-2 border-[#00ff88] rounded-lg p-8 shadow-[0_0_30px_rgba(0,255,136,0.3)]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <motion.div
              className="text-6xl mb-4"
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Shield className="inline-block text-[#00ff88]" size={80} />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#00ffcc]">
              CYBER NEXUS
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#00ff88] mb-2">
              Cybersecurity Professional Exam
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              Test Your Knowledge • Earn Your Certificate
            </p>
          </div>

          <div className="bg-[#0a0a12] border border-[#00ff88] rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <AlertTriangle size={24} />
              Exam Requirements
            </h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li className="flex items-start gap-2">
                <CheckCircle size={20} className="mt-1 flex-shrink-0" />
                <span>
                  15 questions covering cybersecurity fundamentals to advanced
                  topics
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={20} className="mt-1 flex-shrink-0" />
                <span>30 minutes time limit</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={20} className="mt-1 flex-shrink-0" />
                <span>80% passing score required for certification</span>
              </li>
              <li className="flex items-start gap-2">
                <Lock size={20} className="mt-1 flex-shrink-0" />
                <span>Copy/paste and screenshots are disabled</span>
              </li>
              <li className="flex items-start gap-2">
                <RefreshCw size={20} className="mt-1 flex-shrink-0" />
                <span>New questions on each attempt</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-[#00ff88] mb-2 font-semibold">
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 bg-[#0a0a12] text-[#00ff88] rounded-md border border-[#00ff88] focus:outline-none focus:ring-2 focus:ring-[#00ff88] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-[#00ff88] mb-2 font-semibold">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 bg-[#0a0a12] text-[#00ff88] rounded-md border border-[#00ff88] focus:outline-none focus:ring-2 focus:ring-[#00ff88] focus:border-transparent"
              />
            </div>
          </div>

          <motion.button
            onClick={startExam}
            className="w-full py-4 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] text-black rounded-md font-bold text-lg shadow-[0_0_20px_rgba(0,255,136,0.5)] hover:shadow-[0_0_30px_rgba(0,255,136,0.8)] transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            START EXAM
          </motion.button>

          <p className="text-center text-gray-500 text-sm mt-4">
            Make sure you're in a quiet environment and ready to focus
          </p>
        </motion.div>

        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Rajdhani:wght@300;500;700&display=swap");
          body {
            background: radial-gradient(
              ellipse at center,
              #0a0a12 0%,
              #000000 100%
            );
          }
        `}</style>
      </div>
    );
  }

  // Exam Stage
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
                  <h2 className="text-xl md:text-2xl font-bold">
                    Cybersecurity Exam
                  </h2>
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
                          answers[currentQuestion] === index
                            ? "border-[#00ff88] bg-[#00ff88]"
                            : "border-gray-600"
                        }`}
                      >
                        {answers[currentQuestion] === index && (
                          <CheckCircle size={16} className="text-black" />
                        )}
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
            background: radial-gradient(
              ellipse at center,
              #0a0a12 0%,
              #000000 100%
            );
          }
        `}</style>
      </div>
    );
  }

  // Results Stage
  if (stage === "results") {
    const passed = score >= 80;
    const correctAnswers = Math.round((score / 100) * examQuestions.length);

    return (
      <div className="min-h-screen bg-black text-[#00ff88] font-mono flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-2xl bg-[#0a0a12] border-2 border-[#00ff88] rounded-lg p-8 shadow-[0_0_30px_rgba(0,255,136,0.3)]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="inline-block mb-4"
            >
              {passed ? (
                <CheckCircle size={100} className="text-[#00ff88]" />
              ) : (
                <XCircle size={100} className="text-red-500" />
              )}
            </motion.div>

            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 ${
                passed ? "text-[#00ffcc]" : "text-red-400"
              }`}
            >
              {passed ? "CONGRATULATIONS!" : "KEEP LEARNING!"}
            </h2>
            <p className="text-xl text-gray-300">
              {firstName} {lastName}
            </p>
          </div>

          {/* Score Display */}
          <div className="bg-black border-2 border-[#00ff88] rounded-lg p-6 mb-6">
            <div className="text-center mb-4">
              <div
                className={`text-6xl md:text-7xl font-bold mb-2 ${
                  passed ? "text-[#00ff88]" : "text-red-400"
                }`}
              >
                {score.toFixed(1)}%
              </div>
              <p className="text-gray-400">Your Score</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-[#00ffcc]">
                  {correctAnswers}
                </div>
                <div className="text-sm text-gray-400">Correct</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-400">
                  {examQuestions.length - correctAnswers}
                </div>
                <div className="text-sm text-gray-400">Incorrect</div>
              </div>
            </div>
          </div>

          {/* Result Message */}
          {passed ? (
            <div className="bg-green-900 bg-opacity-30 border border-green-700 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-3">
                <Award
                  size={24}
                  className="text-green-400 flex-shrink-0 mt-1"
                />
                <div>
                  <h3 className="text-xl font-bold text-green-300 mb-2">
                    You've Passed the Exam!
                  </h3>
                  <p className="text-green-200 text-sm mb-3">
                    Excellent work! You've demonstrated strong cybersecurity
                    knowledge and earned your certification. Your certificate is
                    ready to download.
                  </p>
                  <ul className="text-xs text-green-300 space-y-1">
                    <li>✓ Cybersecurity fundamentals mastered</li>
                    <li>✓ Advanced concepts understood</li>
                    <li>✓ Ready for real-world challenges</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-red-900 bg-opacity-30 border border-red-700 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle
                  size={24}
                  className="text-red-400 flex-shrink-0 mt-1"
                />
                <div>
                  <h3 className="text-xl font-bold text-red-300 mb-2">
                    Score Below 80%
                  </h3>
                  <p className="text-red-200 text-sm mb-3">
                    You need at least 80% to earn your certificate. Don't worry!
                    Review the material and try again. Each attempt will have
                    different questions to help you learn.
                  </p>
                  <ul className="text-xs text-red-300 space-y-1">
                    <li>• Study cybersecurity fundamentals</li>
                    <li>• Practice with online resources</li>
                    <li>• Review common attack vectors</li>
                    <li>• Understand defense mechanisms</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            {passed ? (
              <>
                <motion.button
                  onClick={downloadCertificate}
                  className="w-full py-4 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] text-black rounded-lg font-bold text-lg shadow-[0_0_20px_rgba(0,255,136,0.5)] hover:shadow-[0_0_30px_rgba(0,255,136,0.8)] transition-all flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Award size={24} />
                  Download Certificate
                </motion.button>
                <motion.button
                  onClick={() => setStage("certificate")}
                  className="w-full py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Certificate
                </motion.button>
              </>
            ) : (
              <motion.button
                onClick={retryExam}
                className="w-full py-4 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] text-black rounded-lg font-bold text-lg shadow-[0_0_20px_rgba(0,255,136,0.5)] hover:shadow-[0_0_30px_rgba(0,255,136,0.8)] transition-all flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RefreshCw size={24} />
                Try Again
              </motion.button>
            )}

            <motion.button
              onClick={retryExam}
              className="w-full py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Back to Home
            </motion.button>
          </div>
        </motion.div>

        <canvas ref={canvasRef} className="hidden" />

        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Rajdhani:wght@300;500;700&display=swap");
          body {
            background: radial-gradient(
              ellipse at center,
              #0a0a12 0%,
              #000000 100%
            );
          }
        `}</style>
      </div>
    );
  }

  // Certificate Preview Stage
  if (stage === "certificate") {
    return (
      <div className="min-h-screen bg-black text-[#00ff88] font-mono flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#00ffcc] mb-2">
              Your Certificate
            </h2>
            <p className="text-gray-400">
              Congratulations on your achievement!
            </p>
          </div>

          <div className="bg-[#0a0a12] border-2 border-[#00ff88] rounded-lg p-4 mb-6 shadow-[0_0_30px_rgba(0,255,136,0.3)]">
            <canvas
              ref={canvasRef}
              className="w-full h-auto rounded"
              style={{ display: "block" }}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <motion.button
              onClick={downloadCertificate}
              className="flex-1 py-3 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] text-black rounded-lg font-bold flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Award size={20} />
              Download Certificate
            </motion.button>
            <motion.button
              onClick={retryExam}
              className="flex-1 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Back to Home
            </motion.button>
          </div>
        </motion.div>

        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Rajdhani:wght@300;500;700&display=swap");
          body {
            background: radial-gradient(
              ellipse at center,
              #0a0a12 0%,
              #000000 100%
            );
          }
        `}</style>
      </div>
    );
  }

  return null;
};

export default CyberNexusCertificateExam;
