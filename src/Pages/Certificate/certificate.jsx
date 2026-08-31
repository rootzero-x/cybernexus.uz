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
      "rounded-2xl border bg-void-850/55 backdrop-blur-xl",
      "border-signal-500/40 shadow-glow-sm",
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
        ? "border-cyber-500 bg-cyber-500/10 text-cyber-300 shadow-glow-cyan"
        : "border-signal-500/30 bg-void-850/50 text-gray-200 hover:border-signal-500 hover:text-signal-300",
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
  // ✅ CyberNexus PRO Question Bank (105 questions)
// - Answers are not “too obvious” by length
// - Options are balanced and plausible
// - Difficulties: low+, medium+, hard+, expert+
// - correct = index (0..3)

const questionBank = [
  /* =========================
     LOW+ (1–35)
  ========================= */
  {
    id: 1,
    difficulty: "low+",
    question: "In cybersecurity, what does the CIA triad represent?",
    options: [
      "Control, Inspection, Authorization",
      "Confidentiality, Integrity, Availability",
      "Compute, Interconnect, Accelerate",
      "Certification, Identification, Audit",
    ],
    correct: 1,
  },
  {
    id: 2,
    difficulty: "low+",
    question: "Which protocol is commonly used for secure web browsing?",
    options: ["HTTP", "DNS", "HTTPS", "IMAP"],
    correct: 2,
  },
  {
    id: 3,
    difficulty: "low+",
    question: "What is the primary purpose of a firewall?",
    options: [
      "Encrypt user passwords",
      "Filter and control network traffic",
      "Accelerate internet speed",
      "Store backups securely",
    ],
    correct: 1,
  },
  {
    id: 4,
    difficulty: "low+",
    question: "Phishing is best described as:",
    options: [
      "A type of data compression",
      "A social engineering attack using deceptive messages",
      "A secure email protocol",
      "A network discovery method",
    ],
    correct: 1,
  },
  {
    id: 5,
    difficulty: "low+",
    question: "Which port is the default for SSH on most systems?",
    options: ["21", "22", "80", "3389"],
    correct: 1,
  },
  {
    id: 6,
    difficulty: "low+",
    question: "Malware is:",
    options: [
      "A device that routes packets",
      "Software designed to harm or abuse systems",
      "A tool for making backups",
      "A secure hardware module",
    ],
    correct: 1,
  },
  {
    id: 7,
    difficulty: "low+",
    question: "What does VPN typically stand for?",
    options: [
      "Virtual Private Network",
      "Verified Protected Network",
      "Visual Packet Node",
      "Variable Proxy Namespace",
    ],
    correct: 0,
  },
  {
    id: 8,
    difficulty: "low+",
    question: "Which is the strongest password practice?",
    options: [
      "Reusing a single password",
      "Using a short memorable word",
      "Using a mix of letters, numbers, and symbols",
      "Using your name and birth year",
    ],
    correct: 2,
  },
  {
    id: 9,
    difficulty: "low+",
    question: "Two-factor authentication (2FA) primarily adds:",
    options: [
      "A second browser tab",
      "An extra verification step beyond a password",
      "A faster login method",
      "A public encryption key",
    ],
    correct: 1,
  },
  {
    id: 10,
    difficulty: "low+",
    question: "Which of these is a common sign of a suspicious email?",
    options: [
      "Clear sender identity",
      "Unexpected attachment or urgent request",
      "Proper spelling and tone",
      "Matching known conversation context",
    ],
    correct: 1,
  },
  {
    id: 11,
    difficulty: "low+",
    question: "What does “patching” mean in security?",
    options: [
      "Replacing hardware cables",
      "Applying updates to fix bugs and vulnerabilities",
      "Encrypting files on disk",
      "Scanning Wi-Fi channels",
    ],
    correct: 1,
  },
  {
    id: 12,
    difficulty: "low+",
    question: "Which term describes keeping data secret from unauthorized people?",
    options: ["Availability", "Confidentiality", "Integrity", "Auditability"],
    correct: 1,
  },
  {
    id: 13,
    difficulty: "low+",
    question: "Which term describes preventing unauthorized changes to data?",
    options: ["Integrity", "Availability", "Latency", "Discovery"],
    correct: 0,
  },
  {
    id: 14,
    difficulty: "low+",
    question: "What is the purpose of backups in security?",
    options: [
      "Make passwords longer",
      "Recover data after loss or ransomware",
      "Increase CPU performance",
      "Hide network traffic",
    ],
    correct: 1,
  },
  {
    id: 15,
    difficulty: "low+",
    question: "Which is safer on public Wi-Fi?",
    options: [
      "Open Wi-Fi with no password",
      "Using HTTPS sites and a VPN",
      "Disabling device lock screen",
      "Sharing hotspot password publicly",
    ],
    correct: 1,
  },
  {
    id: 16,
    difficulty: "low+",
    question: "What is “encryption” used for?",
    options: [
      "Turning data into an unreadable form without a key",
      "Making files smaller",
      "Blocking all network ports",
      "Deleting system logs",
    ],
    correct: 0,
  },
  {
    id: 17,
    difficulty: "low+",
    question: "Which is the best definition of “authentication”?",
    options: [
      "Proving who you are",
      "Deciding what you can do",
      "Encrypting a message",
      "Saving login history",
    ],
    correct: 0,
  },
  {
    id: 18,
    difficulty: "low+",
    question: "Which is the best definition of “authorization”?",
    options: [
      "Proving identity",
      "Granting permissions after authentication",
      "Encrypting user sessions",
      "Syncing time across servers",
    ],
    correct: 1,
  },
  {
    id: 19,
    difficulty: "low+",
    question: "A software vulnerability is:",
    options: [
      "A feature request",
      "A weakness that can be exploited",
      "A type of firewall rule",
      "A network cable issue",
    ],
    correct: 1,
  },
  {
    id: 20,
    difficulty: "low+",
    question: "Which is a common endpoint security tool?",
    options: ["Antivirus/EDR", "DNS resolver", "Load balancer", "Proxy PAC file"],
    correct: 0,
  },
  {
    id: 21,
    difficulty: "low+",
    question: "What is “social engineering” mainly about?",
    options: [
      "Attacking physical routers",
      "Manipulating people to reveal information",
      "Building secure databases",
      "Optimizing encryption speed",
    ],
    correct: 1,
  },
  {
    id: 22,
    difficulty: "low+",
    question: "Which of these is a common secure email transport method?",
    options: ["SMTP over TLS", "Plain POP3", "HTTP GET", "Telnet"],
    correct: 0,
  },
  {
    id: 23,
    difficulty: "low+",
    question: "What is a “security policy” in an organization?",
    options: [
      "A list of CPU specifications",
      "Rules and guidelines for protecting systems and data",
      "A type of encryption algorithm",
      "A backup file format",
    ],
    correct: 1,
  },
  {
    id: 24,
    difficulty: "low+",
    question: "Which of these is a typical indicator of compromise (IOC)?",
    options: [
      "A random username",
      "A known malicious domain or hash",
      "A high screen brightness",
      "A long file name",
    ],
    correct: 1,
  },
  {
    id: 25,
    difficulty: "low+",
    question: "What does “least privilege” mean?",
    options: [
      "Users should have minimal permissions needed",
      "All users should be admins",
      "Permissions should never change",
      "Passwords should be shared in teams",
    ],
    correct: 0,
  },
  {
    id: 26,
    difficulty: "low+",
    question: "Which is a safe way to store passwords?",
    options: [
      "In plain text notes",
      "In a reputable password manager",
      "In a shared spreadsheet",
      "Inside email drafts",
    ],
    correct: 1,
  },
  {
    id: 27,
    difficulty: "low+",
    question: "A “data breach” usually means:",
    options: [
      "A network is upgraded",
      "Unauthorized access to sensitive data",
      "A server gets faster storage",
      "A password is reset successfully",
    ],
    correct: 1,
  },
  {
    id: 28,
    difficulty: "low+",
    question: "Which is a common way ransomware harms victims?",
    options: [
      "Makes internet faster",
      "Encrypts files and demands payment",
      "Improves system performance",
      "Adds multi-factor authentication",
    ],
    correct: 1,
  },
  {
    id: 29,
    difficulty: "low+",
    question: "What is a “security update” most often for?",
    options: [
      "Adding new fonts",
      "Fixing known vulnerabilities",
      "Changing keyboard layout",
      "Increasing battery life",
    ],
    correct: 1,
  },
  {
    id: 30,
    difficulty: "low+",
    question: "Which is the safest action if you receive an unexpected login code?",
    options: [
      "Forward it to a friend",
      "Ignore it and change password if suspicious",
      "Post it to confirm authenticity",
      "Use it to log in quickly",
    ],
    correct: 1,
  },
  {
    id: 31,
    difficulty: "low+",
    question: "What is “logging” used for in security?",
    options: [
      "Hiding activity from admins",
      "Recording events for troubleshooting and detection",
      "Compressing images",
      "Encrypting the hard drive",
    ],
    correct: 1,
  },
  {
    id: 32,
    difficulty: "low+",
    question: "Which is a good practice for software downloads?",
    options: [
      "Use random third-party mirrors",
      "Prefer official sources and verify signatures when possible",
      "Disable antivirus before installing",
      "Run as admin always",
    ],
    correct: 1,
  },
  {
    id: 33,
    difficulty: "low+",
    question: "A “threat” in cybersecurity is:",
    options: [
      "Anything that can cause harm if exploited",
      "A completed incident report",
      "A patch release note",
      "A network switch feature",
    ],
    correct: 0,
  },
  {
    id: 34,
    difficulty: "low+",
    question: "What is the role of a security incident response plan?",
    options: [
      "To schedule vacations",
      "To define steps for handling security incidents",
      "To choose a programming language",
      "To reduce monitor brightness",
    ],
    correct: 1,
  },
  {
    id: 35,
    difficulty: "low+",
    question: "Which is a common secure remote access tool/protocol?",
    options: ["SSH", "FTP", "Telnet", "HTTP"],
    correct: 0,
  },

  /* =========================
     MEDIUM+ (36–75)
  ========================= */
  {
    id: 36,
    difficulty: "medium+",
    question: "What best describes SQL injection?",
    options: [
      "A database backup routine",
      "Exploiting unsafe query handling to run unintended SQL",
      "A method for encrypting tables",
      "A network routing issue",
    ],
    correct: 1,
  },
  {
    id: 37,
    difficulty: "medium+",
    question: "The main goal of penetration testing is to:",
    options: [
      "Destroy production systems",
      "Identify security weaknesses in an authorized manner",
      "Replace all firewalls",
      "Generate random passwords",
    ],
    correct: 1,
  },
  {
    id: 38,
    difficulty: "medium+",
    question: "Which algorithm is asymmetric?",
    options: ["AES", "RSA", "ChaCha20", "Blowfish"],
    correct: 1,
  },
  {
    id: 39,
    difficulty: "medium+",
    question: "A “zero-day” vulnerability usually means:",
    options: [
      "A vulnerability that is already patched",
      "A publicly unknown vulnerability with no fix available yet",
      "A vulnerability that requires zero clicks always",
      "A vulnerability found in day-zero backups",
    ],
    correct: 1,
  },
  {
    id: 40,
    difficulty: "medium+",
    question: "SIEM stands for:",
    options: [
      "Secure Identity and Endpoint Monitoring",
      "Security Information and Event Management",
      "System Integrity and Error Metrics",
      "Session Inspection and Event Mapping",
    ],
    correct: 1,
  },
  {
    id: 41,
    difficulty: "medium+",
    question: "A Man-in-the-Middle (MitM) attack involves:",
    options: [
      "Intercepting and possibly altering communication between parties",
      "Changing DNS zones permanently",
      "Injecting SQL statements into a database",
      "Blocking all outbound traffic",
    ],
    correct: 0,
  },
  {
    id: 42,
    difficulty: "medium+",
    question: "XSS stands for:",
    options: [
      "Cross-Site Scripting",
      "eXtended Secure Session",
      "XML Session Standard",
      "Cross System Scanning",
    ],
    correct: 0,
  },
  {
    id: 43,
    difficulty: "medium+",
    question: "A honeypot is primarily used to:",
    options: [
      "Store secrets safely",
      "Attract attackers to observe tactics and indicators",
      "Speed up application performance",
      "Rotate encryption keys automatically",
    ],
    correct: 1,
  },
  {
    id: 44,
    difficulty: "medium+",
    question: "What does PGP mainly provide for email security?",
    options: [
      "End-to-end encryption and signing",
      "Server-side filtering only",
      "Faster mailbox syncing",
      "Automatic spam deletion",
    ],
    correct: 0,
  },
  {
    id: 45,
    difficulty: "medium+",
    question: "OWASP Top 10 is best described as:",
    options: [
      "A list of the most critical web application security risks",
      "A ranking of antivirus tools",
      "A set of DNS standards",
      "A programming language guide",
    ],
    correct: 0,
  },
  {
    id: 46,
    difficulty: "medium+",
    question: "A DDoS attack attempts to:",
    options: [
      "Steal database schemas silently",
      "Exhaust resources to make a service unavailable",
      "Encrypt user files for ransom",
      "Change file permissions locally",
    ],
    correct: 1,
  },
  {
    id: 47,
    difficulty: "medium+",
    question: "Which is a common control against brute force login attempts?",
    options: [
      "Disable logging",
      "Rate limiting and account lockout policies",
      "Use HTTP instead of HTTPS",
      "Store passwords in cookies",
    ],
    correct: 1,
  },
  {
    id: 48,
    difficulty: "medium+",
    question: "What is the best description of hashing?",
    options: [
      "Reversible encryption using a key",
      "One-way transformation to a fixed-length digest",
      "Compression that preserves all data",
      "Encoding for human readability",
    ],
    correct: 1,
  },
  {
    id: 49,
    difficulty: "medium+",
    question: "Why is salting important in password hashing?",
    options: [
      "It makes passwords shorter",
      "It reduces CPU usage for hashing",
      "It prevents efficient reuse of precomputed hash tables",
      "It ensures passwords are reversible",
    ],
    correct: 2,
  },
  {
    id: 50,
    difficulty: "medium+",
    question: "What is CSRF primarily about?",
    options: [
      "Stealing cookies via JavaScript",
      "Tricking a logged-in user’s browser into unwanted actions",
      "Breaking TLS certificates",
      "Scanning ports on a network",
    ],
    correct: 1,
  },
  {
    id: 51,
    difficulty: "medium+",
    question: "A WAF is designed to protect against:",
    options: [
      "Web application attacks like injection and XSS patterns",
      "Hard drive failures",
      "GPU overheating",
      "Email delivery delays",
    ],
    correct: 0,
  },
  {
    id: 52,
    difficulty: "medium+",
    question: "IDS vs IPS: the most accurate statement is:",
    options: [
      "IDS prevents; IPS detects",
      "IDS detects; IPS can block or prevent",
      "Both only encrypt traffic",
      "Both only store logs offline",
    ],
    correct: 1,
  },
  {
    id: 53,
    difficulty: "medium+",
    question: "What is the goal of “defense in depth”?",
    options: [
      "Rely on one perfect firewall",
      "Use multiple layered controls to reduce risk",
      "Turn off unused security tools",
      "Avoid updates to keep stability",
    ],
    correct: 1,
  },
  {
    id: 54,
    difficulty: "medium+",
    question: "Which is a secure way to handle user sessions on the web?",
    options: [
      "Store tokens in localStorage always",
      "Use HttpOnly cookies or secure token storage with rotation",
      "Put session IDs in URLs",
      "Disable SameSite protections",
    ],
    correct: 1,
  },
  {
    id: 55,
    difficulty: "medium+",
    question: "A common purpose of EDR is to:",
    options: [
      "Run DNS queries faster",
      "Detect and respond to endpoint threats",
      "Replace VPN connections",
      "Host web pages securely",
    ],
    correct: 1,
  },
  {
    id: 56,
    difficulty: "medium+",
    question: "Which practice helps reduce supply chain risk in dependencies?",
    options: [
      "Pin versions and verify integrity where possible",
      "Install packages from random sources",
      "Disable lockfiles",
      "Avoid updates forever",
    ],
    correct: 0,
  },
  {
    id: 57,
    difficulty: "medium+",
    question: "What is the main advantage of using TLS certificates?",
    options: [
      "They reduce image sizes",
      "They provide encryption and server authentication",
      "They store database passwords",
      "They speed up CPU scheduling",
    ],
    correct: 1,
  },
  {
    id: 58,
    difficulty: "medium+",
    question: "What is “key rotation” mainly used for?",
    options: [
      "Reduce CPU usage",
      "Limit damage if a key is compromised",
      "Make encryption reversible",
      "Increase packet size",
    ],
    correct: 1,
  },
  {
    id: 59,
    difficulty: "medium+",
    question: "What is the purpose of Content Security Policy (CSP)?",
    options: [
      "Force HTTP/2 upgrades",
      "Reduce XSS risk by controlling allowed content sources",
      "Compress JavaScript bundles",
      "Allow all inline scripts by default",
    ],
    correct: 1,
  },
  {
    id: 60,
    difficulty: "medium+",
    question: "What does “non-repudiation” mean in security context?",
    options: [
      "A user can deny actions without evidence",
      "Actions can be proven so parties cannot deny them later",
      "All data must be encrypted at rest",
      "Systems should run without logs",
    ],
    correct: 1,
  },
  {
    id: 61,
    difficulty: "medium+",
    question: "Which is a common secure practice for API authentication?",
    options: [
      "Hardcoding keys in frontend",
      "Using short-lived tokens and server-side validation",
      "Passing secrets in URL query params",
      "Using one shared admin token everywhere",
    ],
    correct: 1,
  },
  {
    id: 62,
    difficulty: "medium+",
    question: "What is “credential stuffing”?",
    options: [
      "Guessing random passwords slowly",
      "Using leaked username/password pairs at scale",
      "Creating long passwords by adding symbols",
      "Storing credentials in encrypted vaults",
    ],
    correct: 1,
  },
  {
    id: 63,
    difficulty: "medium+",
    question: "Why is disabling directory listing on a web server helpful?",
    options: [
      "It prevents the OS from booting slower",
      "It reduces unintended exposure of files and structure",
      "It increases TLS strength",
      "It prevents DNS poisoning",
    ],
    correct: 1,
  },
  {
    id: 64,
    difficulty: "medium+",
    question: "What is the primary risk of using outdated libraries?",
    options: [
      "They always break the UI",
      "Known vulnerabilities may be exploitable",
      "They increase monitor brightness",
      "They prevent backups from working",
    ],
    correct: 1,
  },
  {
    id: 65,
    difficulty: "medium+",
    question: "What is “data minimization” in privacy/security?",
    options: [
      "Collecting all possible user data",
      "Collecting only what’s necessary for a purpose",
      "Storing data without backups",
      "Encrypting data twice always",
    ],
    correct: 1,
  },
  {
    id: 66,
    difficulty: "medium+",
    question: "In access control, RBAC stands for:",
    options: [
      "Role-Based Access Control",
      "Remote Backup and Cache",
      "Rule-Bound Authorization Chain",
      "Registry Based Access Configuration",
    ],
    correct: 0,
  },
  {
    id: 67,
    difficulty: "medium+",
    question: "What is the most accurate meaning of “attack surface”?",
    options: [
      "Number of CPUs in a server",
      "All possible points where an attacker can interact with a system",
      "Total internet bandwidth",
      "Amount of encrypted storage",
    ],
    correct: 1,
  },
  {
    id: 68,
    difficulty: "medium+",
    question: "Why is input validation important?",
    options: [
      "It reduces CPU temperature",
      "It helps prevent injection and logic abuse",
      "It forces stronger Wi-Fi signals",
      "It improves screen resolution",
    ],
    correct: 1,
  },
  {
    id: 69,
    difficulty: "medium+",
    question: "What is the purpose of secure headers like X-Frame-Options?",
    options: [
      "Prevent clickjacking by controlling framing",
      "Enable third-party cookies by default",
      "Reduce database load",
      "Compress HTTP responses",
    ],
    correct: 0,
  },
  {
    id: 70,
    difficulty: "medium+",
    question: "What is a “threat model” used for?",
    options: [
      "Predicting stock prices",
      "Identifying likely threats and prioritizing mitigations",
      "Choosing UI colors",
      "Measuring internet speed",
    ],
    correct: 1,
  },
  {
    id: 71,
    difficulty: "medium+",
    question: "Which is a typical security benefit of segmentation?",
    options: [
      "It increases RAM",
      "It limits lateral movement after compromise",
      "It removes need for authentication",
      "It disables logging globally",
    ],
    correct: 1,
  },
  {
    id: 72,
    difficulty: "medium+",
    question: "Why is “secure by default” important?",
    options: [
      "Reduces user choice intentionally",
      "Minimizes risk when users don’t change settings",
      "Makes encryption reversible",
      "Removes need for monitoring",
    ],
    correct: 1,
  },
  {
    id: 73,
    difficulty: "medium+",
    question: "What is “token expiration” mainly used for?",
    options: [
      "Increase login failures",
      "Limit the window of misuse if a token leaks",
      "Make sessions permanent",
      "Reduce encryption strength",
    ],
    correct: 1,
  },
  {
    id: 74,
    difficulty: "medium+",
    question: "Which is a common best practice for storing API secrets?",
    options: [
      "Commit them to Git for convenience",
      "Keep them in server-side environment variables/secret manager",
      "Put them in public config files",
      "Embed them in client JavaScript",
    ],
    correct: 1,
  },
  {
    id: 75,
    difficulty: "medium+",
    question: "What is “sandboxing” used for?",
    options: [
      "Executing untrusted code in an isolated environment",
      "Encrypting DNS responses",
      "Replacing a firewall",
      "Disabling all system logs",
    ],
    correct: 0,
  },

  /* =========================
     HARD+ (76–95)
  ========================= */
  {
    id: 76,
    difficulty: "hard+",
    question: "In AES, the block size is:",
    options: ["64 bits", "96 bits", "128 bits", "256 bits"],
    correct: 2,
  },
  {
    id: 77,
    difficulty: "hard+",
    question: "What is the key difference between symmetric and asymmetric crypto?",
    options: [
      "Symmetric uses key pairs; asymmetric uses one shared key",
      "Symmetric uses a shared secret; asymmetric uses a public/private pair",
      "Symmetric cannot decrypt data",
      "Asymmetric is always faster than symmetric",
    ],
    correct: 1,
  },
  {
    id: 78,
    difficulty: "hard+",
    question: "Rainbow tables are primarily used for:",
    options: [
      "Cracking hashed passwords with precomputed tables",
      "Preventing phishing emails",
      "Speeding up TLS handshakes",
      "Blocking malware downloads",
    ],
    correct: 0,
  },
  {
    id: 79,
    difficulty: "hard+",
    question: "Which is NOT a standard HTTP security header?",
    options: [
      "Content-Security-Policy",
      "Strict-Transport-Security",
      "X-Frame-Options",
      "X-Auth-Validator",
    ],
    correct: 3,
  },
  {
    id: 80,
    difficulty: "hard+",
    question: "HSTS (Strict-Transport-Security) is used to:",
    options: [
      "Force browsers to prefer HTTPS for a domain",
      "Encrypt database rows automatically",
      "Disable JavaScript execution",
      "Prevent DNS caching",
    ],
    correct: 0,
  },
  {
    id: 81,
    difficulty: "hard+",
    question: "In a typical stack buffer overflow, attackers often overwrite:",
    options: [
      "File system permissions",
      "Return addresses/control flow data",
      "DNS records",
      "HTTP headers on the wire",
    ],
    correct: 1,
  },
  {
    id: 82,
    difficulty: "hard+",
    question: "DNSSEC primarily helps with:",
    options: [
      "Encrypting all DNS queries end-to-end",
      "Authenticating DNS responses to reduce spoofing",
      "Blocking ads at the resolver",
      "Increasing DNS TTL automatically",
    ],
    correct: 1,
  },
  {
    id: 83,
    difficulty: "hard+",
    question: "A strong mitigation for SQL injection is:",
    options: [
      "Prepared statements / parameterized queries",
      "Using longer database names",
      "Increasing server RAM",
      "Using HTTP instead of HTTPS",
    ],
    correct: 0,
  },
  {
    id: 84,
    difficulty: "hard+",
    question: "A side-channel attack generally extracts information from:",
    options: [
      "Public source code repositories",
      "Physical or behavioral leakage (time, power, cache)",
      "DNS over HTTPS logs",
      "Firewall rule ordering",
    ],
    correct: 1,
  },
  {
    id: 85,
    difficulty: "hard+",
    question: "What does “privilege escalation” refer to?",
    options: [
      "Reducing user permissions temporarily",
      "Gaining higher privileges than originally authorized",
      "Switching from VPN to proxy",
      "Rotating encryption keys daily",
    ],
    correct: 1,
  },
  {
    id: 86,
    difficulty: "hard+",
    question: "Perfect Forward Secrecy (PFS) means:",
    options: [
      "Old session keys remain safe even if long-term keys leak later",
      "A cipher cannot be broken by any method",
      "All traffic is stored in plaintext for auditing",
      "Passwords are never required for login",
    ],
    correct: 0,
  },
  {
    id: 87,
    difficulty: "hard+",
    question: "A timing attack exploits:",
    options: [
      "Incorrect timezones",
      "Time differences in operations to infer secrets",
      "Packet loss on Wi-Fi",
      "DNS TTL values",
    ],
    correct: 1,
  },
  {
    id: 88,
    difficulty: "hard+",
    question: "Digital signatures primarily provide:",
    options: [
      "Confidentiality only",
      "Integrity and authenticity (and non-repudiation properties)",
      "Compression and deduplication",
      "Availability under DDoS",
    ],
    correct: 1,
  },
  {
    id: 89,
    difficulty: "hard+",
    question: "A logic bomb is:",
    options: [
      "Malware that triggers on a specific condition",
      "A router misconfiguration",
      "A TLS certificate failure",
      "A type of phishing attachment",
    ],
    correct: 0,
  },
  {
    id: 90,
    difficulty: "hard+",
    question: "In web security, “same-origin policy” mainly restricts:",
    options: [
      "Server-side request routing",
      "How scripts access data across different origins",
      "CPU usage per tab",
      "TLS cipher selection",
    ],
    correct: 1,
  },
  {
    id: 91,
    difficulty: "hard+",
    question: "Which statement about OAuth is most accurate?",
    options: [
      "OAuth is primarily an authorization framework",
      "OAuth is a password hashing algorithm",
      "OAuth replaces TLS completely",
      "OAuth requires storing passwords in cookies",
    ],
    correct: 0,
  },
  {
    id: 92,
    difficulty: "hard+",
    question: "What is the most accurate definition of SSRF?",
    options: [
      "An attack that forces a server to make unintended requests",
      "A browser-based cookie theft technique",
      "A local privilege escalation method",
      "A TLS downgrade attack",
    ],
    correct: 0,
  },
  {
    id: 93,
    difficulty: "hard+",
    question: "What is the main idea of “secure token rotation”?",
    options: [
      "Tokens never change",
      "Tokens refresh periodically to reduce replay risk",
      "Tokens are stored in URLs for portability",
      "Tokens are shared across all users",
    ],
    correct: 1,
  },
  {
    id: 94,
    difficulty: "hard+",
    question: "A common defense against clickjacking is:",
    options: [
      "Allow all iframes",
      "X-Frame-Options or CSP frame-ancestors",
      "Disable cookies completely",
      "Use HTTP without redirects",
    ],
    correct: 1,
  },
  {
    id: 95,
    difficulty: "hard+",
    question: "Why is constant-time comparison useful in authentication?",
    options: [
      "It improves database indexing",
      "It helps reduce timing leak in secret comparisons",
      "It makes encryption reversible",
      "It increases network throughput",
    ],
    correct: 1,
  },

  /* =========================
     EXPERT+ (96–105)
  ========================= */
  {
    id: 96,
    difficulty: "expert+",
    question: "Which best describes “lateral movement” in an intrusion?",
    options: [
      "Changing encryption ciphers mid-session",
      "Moving across internal systems after initial access",
      "Switching from HTTP to HTTPS automatically",
      "Uploading files to cloud storage",
    ],
    correct: 1,
  },
  {
    id: 97,
    difficulty: "expert+",
    question: "What is a common purpose of a canary token?",
    options: [
      "Optimize caching behavior",
      "Provide an alert when accessed unexpectedly",
      "Increase password complexity",
      "Replace MFA in production",
    ],
    correct: 1,
  },
  {
    id: 98,
    difficulty: "expert+",
    question: "Which technique best reduces the impact of credential leaks for web apps?",
    options: [
      "Longer usernames",
      "MFA + strong password hashing + token/session controls",
      "Disable login history",
      "Use HTTP only on admin routes",
    ],
    correct: 1,
  },
  {
    id: 99,
    difficulty: "expert+",
    question: "Why is “principle of least privilege” critical in cloud IAM?",
    options: [
      "It reduces the need for encryption keys",
      "It limits blast radius when an identity is compromised",
      "It guarantees no vulnerabilities exist",
      "It automatically blocks DDoS attacks",
    ],
    correct: 1,
  },
  {
    id: 100,
    difficulty: "expert+",
    question: "A secure approach to storing refresh tokens in browsers is commonly:",
    options: [
      "LocalStorage without restrictions",
      "HttpOnly, Secure cookies with SameSite controls",
      "URL fragments for convenience",
      "Plain text in IndexedDB",
    ],
    correct: 1,
  },
  {
    id: 101,
    difficulty: "expert+",
    question: "What is a realistic risk of misconfigured CORS?",
    options: [
      "It breaks DNSSEC validation",
      "It can enable unauthorized cross-origin access to sensitive endpoints",
      "It disables TLS certificate checks",
      "It forces HTTP/3 on old clients",
    ],
    correct: 1,
  },
  {
    id: 102,
    difficulty: "expert+",
    question: "Which best describes “defense evasion” in the MITRE ATT&CK sense?",
    options: [
      "Reducing system RAM usage",
      "Techniques used to avoid detection and security controls",
      "Upgrading operating system versions",
      "Enabling verbose logging everywhere",
    ],
    correct: 1,
  },
  {
    id: 103,
    difficulty: "expert+",
    question: "What is the most accurate description of a secure SDLC?",
    options: [
      "Security testing only at the end",
      "Integrating security practices throughout design, build, test, deploy",
      "Using one security tool for everything",
      "Avoiding code reviews to save time",
    ],
    correct: 1,
  },
  {
    id: 104,
    difficulty: "expert+",
    question: "Why are allowlists generally safer than denylists for input validation?",
    options: [
      "They are shorter to type",
      "They explicitly permit known-good patterns and reduce bypasses",
      "They always improve UI performance",
      "They remove the need for logging",
    ],
    correct: 1,
  },
  {
    id: 105,
    difficulty: "expert+",
    question: "Which security control is most directly aimed at reducing “blast radius”?",
    options: [
      "Segmentation and scoped permissions",
      "Longer log retention",
      "Higher screen resolution",
      "Disabling caching everywhere",
    ],
    correct: 0,
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
      <div className="w-full min-h-screen font-mono text-signal-300 overflow-x-hidden">
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
                    <div className="h-12 w-12 rounded-lg border border-cyber-500/40 bg-cyber-500/10 grid place-items-center shadow-glow-cyan">
                      <Shield className="text-cyber-300" size={22} />
                    </div>
                    <div className="min-w-0">
                      <h1 className="text-2xl sm:text-3xl font-black tracking-wider text-signal-300 truncate">
                        CyberNexus Exam
                      </h1>
                      <p className="mt-1 text-xs sm:text-sm text-cyber-300/90 font-bold tracking-widest truncate">
                        CERTIFICATE • PRO LEVEL
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm sm:text-base text-white/55 leading-relaxed">
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
                  <div className="rounded-xl border border-signal-500/25 bg-void-850/70 backdrop-blur-xl px-4 py-3">
                    <div className="text-[11px] font-black tracking-widest text-white/45">PASSING SCORE</div>
                    <div className="mt-1 text-2xl font-black text-cyber-300">80%</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black tracking-widest text-cyber-300 mb-2">
                    FIRST NAME
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className={[
                      "w-full rounded-2xl border bg-void-850/60 backdrop-blur px-4 py-3 text-sm",
                      "border-signal-500/35 text-signal-300 placeholder:text-white/35",
                      "focus:outline-none focus:border-cyber-500 focus:shadow-glow-cyan",
                    ].join(" ")}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black tracking-widest text-cyber-300 mb-2">
                    LAST NAME
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    className={[
                      "w-full rounded-2xl border bg-void-850/60 backdrop-blur px-4 py-3 text-sm",
                      "border-signal-500/35 text-signal-300 placeholder:text-white/35",
                      "focus:outline-none focus:border-cyber-500 focus:shadow-glow-cyan",
                    ].join(" ")}
                  />
                </div>
              </div>
              <motion.button
                onClick={startExam}
                className={[
                  "mt-5 w-full rounded-2xl border border-signal-500",
                  "bg-gradient-to-r from-signal-400 to-cyber-400",
                  "px-5 py-4 text-sm sm:text-base font-black tracking-widest text-black shadow-glow-sm",
                  "hover:shadow-glow-cyan transition-all inline-flex items-center justify-center gap-2",
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
      <div className="min-h-screen text-[#00ff88] font-mono p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-[#0a0a12] border-2 border-[#00ff88] rounded-lg p-4 mb-6 shadow-[0_0_20px_rgba(0,255,136,0.3)]">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <Shield size={32} className="text-[#00ff88]" />
                <div>
                  <h2 className="text-xl md:text-2xl font-bold">Cybersecurity Exam</h2>
                  <p className="text-sm text-white/45">
                    {firstName} {lastName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#00ffcc]">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="text-xs text-white/45">Time Left</div>
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
                        : "border-gray-700 bg-gray-900 text-white/60 hover:border-[#00ff88] hover:bg-gray-800"
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
                      : "bg-gray-800 text-white/45 hover:bg-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <p className="text-xs text-white/45 mt-3">
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
      <div className="w-full min-h-screen font-mono text-signal-300 overflow-x-hidden">
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
                          ? "border-signal-500/40 bg-signal-500/10 shadow-glow-sm"
                          : "border-red-500/40 bg-red-500/10",
                      ].join(" ")}
                    >
                      {passed ? <CheckCircle className="text-signal-300" /> : <XCircle className="text-red-400" />}
                    </div>
                    <div className="min-w-0">
                      <h2
                        className={[
                          "text-2xl sm:text-3xl font-black tracking-wider truncate",
                          passed ? "text-cyber-300" : "text-red-300",
                        ].join(" ")}
                      >
                        {passed ? "CONGRATULATIONS" : "KEEP LEARNING"}
                      </h2>
                      <p className="mt-1 text-xs sm:text-sm text-white/45 font-bold tracking-widest truncate">
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
                  <div className="rounded-xl border border-signal-500/25 bg-void-850/70 backdrop-blur-xl px-4 py-3">
                    <div className="text-[11px] font-black tracking-widest text-white/45">RESULT</div>
                    <div className={["mt-1 text-2xl font-black", passed ? "text-signal-300" : "text-red-300"].join(" ")}>
                      {passed ? "PASS" : "FAIL"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-signal-500/25 bg-void-850/60 p-4">
                  <div className="text-[11px] font-black tracking-widest text-white/45">CORRECT</div>
                  <div className="mt-1 text-3xl font-black text-cyber-300">{correctAnswers}</div>
                </div>
                <div className="rounded-xl border border-signal-500/25 bg-void-850/60 p-4">
                  <div className="text-[11px] font-black tracking-widest text-white/45">INCORRECT</div>
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
                        "w-full rounded-2xl border border-signal-500",
                        "bg-gradient-to-r from-signal-400 to-cyber-400",
                        "px-5 py-4 text-sm sm:text-base font-black tracking-widest text-black shadow-glow-sm",
                        "hover:shadow-glow-cyan transition-all inline-flex items-center justify-center gap-2",
                      ].join(" ")}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Award size={18} />
                      DOWNLOAD CERTIFICATE
                    </motion.button>
                    <motion.button
                      onClick={() => setStage("certificate")}
                      className="w-full rounded-2xl border border-cyber-500 bg-cyber-500/10 px-5 py-3 text-xs sm:text-sm font-black tracking-widest text-cyber-300 hover:border-signal-500 hover:text-signal-300 transition-all inline-flex items-center justify-center gap-2"
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
                      "w-full rounded-2xl border border-signal-500",
                      "bg-gradient-to-r from-signal-400 to-cyber-400",
                      "px-5 py-4 text-sm sm:text-base font-black tracking-widest text-black shadow-glow-sm",
                      "hover:shadow-glow-cyan transition-all inline-flex items-center justify-center gap-2",
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
      <div className="w-full min-h-screen font-mono text-signal-300 overflow-x-hidden">
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
                        "border-signal-500/40 bg-signal-500/10 shadow-glow-sm",
                      ].join(" ")}
                    >
                      <Award className="text-signal-300" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-2xl sm:text-3xl font-black tracking-wider truncate text-cyber-300">
                        YOUR CERTIFICATE
                      </h2>
                      <p className="mt-1 text-xs sm:text-sm text-white/45 font-bold tracking-widest truncate">
                        {firstName} {lastName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-col items-center">
                <canvas ref={canvasRef} className="w-full max-w-3xl border-4 border-signal-500 rounded-lg shadow-glow-sm" />
                <motion.button
                  onClick={downloadCertificate}
                  className={[
                    "mt-6 w-full max-w-xs rounded-2xl border border-signal-500",
                    "bg-gradient-to-r from-signal-400 to-cyber-400",
                    "px-5 py-4 text-sm sm:text-base font-black tracking-widest text-black shadow-glow-sm",
                    "hover:shadow-glow-cyan transition-all inline-flex items-center justify-center gap-2",
                  ].join(" ")}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download size={18} />
                  DOWNLOAD CERTIFICATE
                </motion.button>
                <motion.button
                  onClick={retryExam}
                  className="mt-4 w-full max-w-xs rounded-2xl border border-cyber-500 bg-cyber-500/10 px-5 py-3 text-xs sm:text-sm font-black tracking-widest text-cyber-300 hover:border-signal-500 hover:text-signal-300 transition-all inline-flex items-center justify-center gap-2"
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