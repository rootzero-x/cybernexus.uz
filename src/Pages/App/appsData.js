// src/Pages/App/appsData.js
//
// Curated security and privacy tooling.
//
// Every entry links to the vendor's own site, never a mirror or a download
// aggregator — for security software the distribution channel matters as much
// as the software. `verified` is the date the link and licensing were last
// checked by hand.

export const CATEGORIES = [
  { key: "all", label: "Hammasi" },
  { key: "vpn", label: "VPN & Anonimlik" },
  { key: "passwords", label: "Parol & 2FA" },
  { key: "os", label: "OS & Distributiv" },
  { key: "network", label: "Tarmoq tahlili" },
  { key: "pentest", label: "Pentest" },
  { key: "forensics", label: "Reverse & Forensics" },
  { key: "comms", label: "Aloqa & Pochta" },
  { key: "defense", label: "Himoya" },
  { key: "osint", label: "OSINT" },
];

/** Accent per category, so the grid stays legible as you scan it. */
export const CATEGORY_TONE = {
  vpn: "cyber",
  passwords: "signal",
  os: "signal",
  network: "cyber",
  pentest: "plasma",
  forensics: "cyber",
  comms: "signal",
  defense: "plasma",
  osint: "cyber",
};

const VERIFIED = "2026-09-01";

export const APPS = [
  /* ---------------- VPN & anonymity ---------------- */
  {
    name: "Tor Browser",
    category: "vpn",
    kind: "Anonim brauzer",
    description:
      "Trafikni Tor tarmog'idagi uch tugun orqali yo'naltiradi. Kuzatuvdan himoya va senzurani chetlab o'tish uchun standart vosita.",
    link: "https://www.torproject.org/download/",
    platforms: ["Windows", "macOS", "Linux", "Android"],
    license: "Ochiq kod",
    pricing: "Bepul",
    vendor: "The Tor Project",
    verified: VERIFIED,
    featured: true,
  },
  {
    name: "Mullvad VPN",
    category: "vpn",
    kind: "VPN",
    description:
      "Hisob raqami o'rniga tasodifiy raqam beradi — email ham, ism ham so'ramaydi. Mustaqil audit natijalari ochiq e'lon qilinadi.",
    link: "https://mullvad.net/en/download",
    platforms: ["Windows", "macOS", "Linux", "Android", "iOS"],
    license: "Ochiq kod (mijoz)",
    pricing: "Oylik €5",
    vendor: "Mullvad",
    verified: VERIFIED,
    featured: true,
  },
  {
    name: "Proton VPN",
    category: "vpn",
    kind: "VPN",
    description:
      "Shveytsariya yurisdiksiyasi, cheksiz bepul tarif va Secure Core marshrutlash. Mijoz kodi ochiq va audit qilingan.",
    link: "https://protonvpn.com/download",
    platforms: ["Windows", "macOS", "Linux", "Android", "iOS"],
    license: "Ochiq kod (mijoz)",
    pricing: "Bepul / Pullik",
    vendor: "Proton AG",
    verified: VERIFIED,
  },
  {
    name: "IVPN",
    category: "vpn",
    kind: "VPN",
    description:
      "Anonim hisob, WireGuard va ko'p tarmoqli marshrut. Reklama tarmoqlarini DNS darajasida bloklaydi.",
    link: "https://www.ivpn.net/apps/",
    platforms: ["Windows", "macOS", "Linux", "Android", "iOS"],
    license: "Ochiq kod (mijoz)",
    pricing: "Pullik",
    vendor: "IVPN",
    verified: VERIFIED,
  },
  {
    name: "Orbot",
    category: "vpn",
    kind: "Mobil Tor proxy",
    description:
      "Android'dagi istalgan ilovaning trafigini Tor orqali o'tkazadi. Guardian Project loyihasi.",
    link: "https://guardianproject.info/apps/org.torproject.android/",
    platforms: ["Android"],
    license: "Ochiq kod",
    pricing: "Bepul",
    vendor: "Guardian Project",
    verified: VERIFIED,
  },

  /* ---------------- Passwords & 2FA ---------------- */
  {
    name: "Bitwarden",
    category: "passwords",
    kind: "Parol menejeri",
    description:
      "Ochiq kodli, o'z serveringizda ham joylashtirish mumkin. Bepul tarifda cheksiz parol va qurilmalar.",
    link: "https://bitwarden.com/download/",
    platforms: ["Windows", "macOS", "Linux", "Android", "iOS", "Brauzer"],
    license: "Ochiq kod",
    pricing: "Bepul / $10 yil",
    vendor: "Bitwarden Inc.",
    verified: VERIFIED,
    featured: true,
  },
  {
    name: "KeePassXC",
    category: "passwords",
    kind: "Oflayn parol bazasi",
    description:
      "Bulutsiz ishlaydi — baza sizning diskingizda shifrlangan fayl bo'lib qoladi. Hech qanday hisob talab qilinmaydi.",
    link: "https://keepassxc.org/download/",
    platforms: ["Windows", "macOS", "Linux"],
    license: "Ochiq kod",
    pricing: "Bepul",
    vendor: "KeePassXC Team",
    verified: VERIFIED,
  },
  {
    name: "1Password",
    category: "passwords",
    kind: "Parol menejeri",
    description:
      "Secret Key qo'shimcha qatlami: parolingiz o'g'irlansa ham, kalitsiz baza ochilmaydi. Oilaviy va jamoaviy tariflar.",
    link: "https://1password.com/downloads/",
    platforms: ["Windows", "macOS", "Linux", "Android", "iOS", "Brauzer"],
    license: "Yopiq kod",
    pricing: "Pullik",
    vendor: "AgileBits",
    verified: VERIFIED,
  },
  {
    name: "Aegis Authenticator",
    category: "passwords",
    kind: "TOTP ilovasi",
    description:
      "Android uchun ochiq kodli 2FA. Bazani shifrlangan holda eksport qilish mumkin — telefon yo'qolsa kodlar yo'qolmaydi.",
    link: "https://getaegis.app/",
    platforms: ["Android"],
    license: "Ochiq kod",
    pricing: "Bepul",
    vendor: "Beem Development",
    verified: VERIFIED,
  },
  {
    name: "YubiKey",
    category: "passwords",
    kind: "Apparat kaliti",
    description:
      "Jismoniy FIDO2/WebAuthn kaliti. Fishing hujumlariga qarshi eng ishonchli himoya — kod o'g'irlab bo'lmaydi.",
    link: "https://www.yubico.com/products/",
    platforms: ["USB-A", "USB-C", "NFC", "Lightning"],
    license: "Apparat",
    pricing: "$29 dan",
    vendor: "Yubico",
    verified: VERIFIED,
  },

  /* ---------------- Operating systems ---------------- */
  {
    name: "Kali Linux",
    category: "os",
    kind: "Pentest distributivi",
    description:
      "600 dan ortiq oldindan sozlangan xavfsizlik vositasi. Sinov muhitlari va sertifikatlarga tayyorgarlik uchun standart.",
    link: "https://www.kali.org/get-kali/",
    platforms: ["Live USB", "VM", "WSL", "ARM"],
    license: "Ochiq kod",
    pricing: "Bepul",
    vendor: "OffSec",
    verified: VERIFIED,
    featured: true,
  },
  {
    name: "Tails",
    category: "os",
    kind: "Amneziyali Live OS",
    description:
      "USB'dan yuklanadi, o'chirilganda hech qanday iz qoldirmaydi. Butun trafik majburan Tor orqali o'tadi.",
    link: "https://tails.net/install/",
    platforms: ["Live USB", "DVD"],
    license: "Ochiq kod",
    pricing: "Bepul",
    vendor: "Tails Project",
    verified: VERIFIED,
  },
  {
    name: "Qubes OS",
    category: "os",
    kind: "Izolyatsiya OS",
    description:
      "Har bir vazifa alohida virtual mashinada ishlaydi. Bitta qubes buzilsa, qolganlariga o'tolmaydi.",
    link: "https://www.qubes-os.org/downloads/",
    platforms: ["x86_64"],
    license: "Ochiq kod",
    pricing: "Bepul",
    vendor: "Invisible Things Lab",
    verified: VERIFIED,
  },
  {
    name: "Parrot Security OS",
    category: "os",
    kind: "Pentest distributivi",
    description:
      "Kali'ga muqobil — yengilroq va maxfiylik vositalari kengroq. AnonSurf bilan tizim trafigini anonimlashtiradi.",
    link: "https://parrotsec.org/download/",
    platforms: ["Live USB", "VM", "Docker"],
    license: "Ochiq kod",
    pricing: "Bepul",
    vendor: "Parrot Team",
    verified: VERIFIED,
  },
  {
    name: "Whonix",
    category: "os",
    kind: "Ikki qatlamli anonim OS",
    description:
      "Gateway va Workstation ajratilgan: ilova buzilsa ham haqiqiy IP manzil oshkor bo'lmaydi.",
    link: "https://www.whonix.org/wiki/Download",
    platforms: ["VirtualBox", "KVM", "Qubes"],
    license: "Ochiq kod",
    pricing: "Bepul",
    vendor: "Whonix Project",
    verified: VERIFIED,
  },

  /* ---------------- Network analysis ---------------- */
  {
    name: "Wireshark",
    category: "network",
    kind: "Trafik tahlilchisi",
    description:
      "Paketlarni protokol darajasida ochib beradi. Tarmoq muammolarini topish va hujumni tahlil qilishda asosiy vosita.",
    link: "https://www.wireshark.org/download.html",
    platforms: ["Windows", "macOS", "Linux"],
    license: "Ochiq kod",
    pricing: "Bepul",
    vendor: "Wireshark Foundation",
    verified: VERIFIED,
    featured: true,
  },
  {
    name: "Nmap",
    category: "network",
    kind: "Port skaneri",
    description:
      "Tarmoqdagi xostlar, ochiq portlar va xizmat versiyalarini aniqlaydi. NSE skriptlari bilan kengaytiriladi.",
    link: "https://nmap.org/download.html",
    platforms: ["Windows", "macOS", "Linux"],
    license: "Ochiq kod",
    pricing: "Bepul",
    vendor: "Nmap Project",
    verified: VERIFIED,
  },
  {
    name: "Wazuh",
    category: "network",
    kind: "SIEM / XDR",
    description:
      "Xostlardan log yig'adi, hujum belgilarini aniqlaydi va muvofiqlik hisobotlarini tayyorlaydi. To'liq ochiq kod.",
    link: "https://wazuh.com/install/",
    platforms: ["Linux", "Docker", "Cloud"],
    license: "Ochiq kod",
    pricing: "Bepul",
    vendor: "Wazuh Inc.",
    verified: VERIFIED,
  },
  {
    name: "Suricata",
    category: "network",
    kind: "IDS / IPS",
    description:
      "Real vaqtda tarmoq hujumlarini aniqlaydi va bloklaydi. Yuqori tezlikda ko'p oqimli ishlaydi.",
    link: "https://suricata.io/download/",
    platforms: ["Linux", "Windows", "FreeBSD"],
    license: "Ochiq kod",
    pricing: "Bepul",
    vendor: "OISF",
    verified: VERIFIED,
  },

  /* ---------------- Pentest ---------------- */
  {
    name: "Burp Suite",
    category: "pentest",
    kind: "Web proxy",
    description:
      "Veb-ilovalardagi zaifliklarni topish uchun sanoat standarti. Community versiyasi bepul.",
    link: "https://portswigger.net/burp/communitydownload",
    platforms: ["Windows", "macOS", "Linux"],
    license: "Yopiq kod",
    pricing: "Bepul / Pro",
    vendor: "PortSwigger",
    verified: VERIFIED,
    featured: true,
  },
  {
    name: "OWASP ZAP",
    category: "pentest",
    kind: "Web skaner",
    description:
      "Burp'ga to'liq bepul muqobil. CI/CD quvuriga qo'shib, har bir deploy oldidan avtomatik tekshirish mumkin.",
    link: "https://www.zaproxy.org/download/",
    platforms: ["Windows", "macOS", "Linux", "Docker"],
    license: "Ochiq kod",
    pricing: "Bepul",
    vendor: "OWASP",
    verified: VERIFIED,
  },
  {
    name: "Metasploit Framework",
    category: "pentest",
    kind: "Ekspluatatsiya freymvorki",
    description:
      "Ma'lum zaifliklarni nazorat ostida sinash uchun modullar to'plami. Faqat ruxsat berilgan tizimlarda ishlating.",
    link: "https://www.metasploit.com/download",
    platforms: ["Windows", "macOS", "Linux"],
    license: "Ochiq kod",
    pricing: "Bepul / Pro",
    vendor: "Rapid7",
    verified: VERIFIED,
  },
  {
    name: "Nuclei",
    category: "pentest",
    kind: "Shablonli skaner",
    description:
      "YAML shablonlari asosida minglab zaiflikni tez tekshiradi. Hamjamiyat shablonlar bazasi doim yangilanadi.",
    link: "https://github.com/projectdiscovery/nuclei/releases",
    platforms: ["Windows", "macOS", "Linux", "Docker"],
    license: "Ochiq kod",
    pricing: "Bepul",
    vendor: "ProjectDiscovery",
    verified: VERIFIED,
  },
  {
    name: "Aircrack-ng",
    category: "pentest",
    kind: "Wi-Fi audit",
    description:
      "Simsiz tarmoq xavfsizligini baholash to'plami: monitoring, ushlab olish va kalit tahlili.",
    link: "https://www.aircrack-ng.org/downloads.html",
    platforms: ["Linux", "Windows", "macOS"],
    license: "Ochiq kod",
    pricing: "Bepul",
    vendor: "Aircrack-ng",
    verified: VERIFIED,
  },

  /* ---------------- Reverse engineering & forensics ---------------- */
  {
    name: "Ghidra",
    category: "forensics",
    kind: "Teskari muhandislik",
    description:
      "NSA tomonidan ochiq kodga chiqarilgan dekompilyator. IDA Pro'ga jiddiy va butunlay bepul muqobil.",
    link: "https://ghidra-sre.org/",
    platforms: ["Windows", "macOS", "Linux"],
    license: "Ochiq kod",
    pricing: "Bepul",
    vendor: "NSA",
    verified: VERIFIED,
    featured: true,
  },
  {
    name: "Autopsy",
    category: "forensics",
    kind: "Raqamli ekspertiza",
    description:
      "Disk obrazlarini tahlil qiladi, o'chirilgan fayllarni tiklaydi va vaqt jadvalini tuzadi.",
    link: "https://www.autopsy.com/download/",
    platforms: ["Windows", "macOS", "Linux"],
    license: "Ochiq kod",
    pricing: "Bepul",
    vendor: "Basis Technology",
    verified: VERIFIED,
  },
  {
    name: "CyberChef",
    category: "forensics",
    kind: "Ma'lumot konveyeri",
    description:
      "Kodlash, shifrlash, hash va formatlarni brauzerda zanjir qilib qayta ishlaydi. Hech narsa serverga ketmaydi.",
    link: "https://gchq.github.io/CyberChef/",
    platforms: ["Brauzer"],
    license: "Ochiq kod",
    pricing: "Bepul",
    vendor: "GCHQ",
    verified: VERIFIED,
  },
  {
    name: "VeraCrypt",
    category: "forensics",
    kind: "Disk shifrlash",
    description:
      "Butun diskni yoki yashirin konteynerni shifrlaydi. TrueCrypt'ning audit qilingan davomchisi.",
    link: "https://www.veracrypt.fr/en/Downloads.html",
    platforms: ["Windows", "macOS", "Linux"],
    license: "Ochiq kod",
    pricing: "Bepul",
    vendor: "IDRIX",
    verified: VERIFIED,
  },

  /* ---------------- Communication ---------------- */
  {
    name: "Signal",
    category: "comms",
    kind: "Shifrlangan messenjer",
    description:
      "Uchdan-uchgacha shifrlash standarti. Protokoli WhatsApp va boshqalarda ham ishlatiladi, lekin metama'lumot yig'maydi.",
    link: "https://signal.org/download/",
    platforms: ["Windows", "macOS", "Linux", "Android", "iOS"],
    license: "Ochiq kod",
    pricing: "Bepul",
    vendor: "Signal Foundation",
    verified: VERIFIED,
    featured: true,
  },
  {
    name: "Proton Mail",
    category: "comms",
    kind: "Shifrlangan pochta",
    description:
      "Xatlar serverda ham shifrlangan holda saqlanadi — provayder o'qiy olmaydi. Shveytsariya qonunchiligi ostida.",
    link: "https://proton.me/mail/download",
    platforms: ["Brauzer", "Android", "iOS", "Desktop"],
    license: "Ochiq kod (mijoz)",
    pricing: "Bepul / Pullik",
    vendor: "Proton AG",
    verified: VERIFIED,
  },
  {
    name: "Element (Matrix)",
    category: "comms",
    kind: "Markazlashmagan chat",
    description:
      "O'z serveringizda joylashtirsangiz, yozishmalar butunlay sizning nazoratingizda qoladi.",
    link: "https://element.io/download",
    platforms: ["Windows", "macOS", "Linux", "Android", "iOS"],
    license: "Ochiq kod",
    pricing: "Bepul",
    vendor: "Element",
    verified: VERIFIED,
  },

  /* ---------------- Defense ---------------- */
  {
    name: "Malwarebytes",
    category: "defense",
    kind: "Zararli dastur skaneri",
    description:
      "Antivirus o'tkazib yuborgan reklama dasturlari va PUP'larni topishda kuchli. Boshqa AV bilan birga ishlaydi.",
    link: "https://www.malwarebytes.com/",
    platforms: ["Windows", "macOS", "Android", "iOS"],
    license: "Yopiq kod",
    pricing: "Bepul / Premium",
    vendor: "Malwarebytes",
    verified: VERIFIED,
  },
  {
    name: "Bitdefender",
    category: "defense",
    kind: "Antivirus",
    description:
      "Mustaqil AV-TEST sinovlarida yillar davomida yuqori aniqlash ko'rsatkichini saqlab kelmoqda.",
    link: "https://www.bitdefender.com/solutions/",
    platforms: ["Windows", "macOS", "Android", "iOS"],
    license: "Yopiq kod",
    pricing: "Bepul / Pullik",
    vendor: "Bitdefender",
    verified: VERIFIED,
  },
  {
    name: "uBlock Origin",
    category: "defense",
    kind: "Kontent bloklovchi",
    description:
      "Reklama va kuzatuvchi skriptlarni bloklaydi — bu bilan zararli reklama orqali yuqish yo'lini ham yopadi.",
    link: "https://github.com/gorhill/uBlock#installation",
    platforms: ["Firefox", "Chrome", "Edge"],
    license: "Ochiq kod",
    pricing: "Bepul",
    vendor: "Raymond Hill",
    verified: VERIFIED,
  },

  /* ---------------- OSINT ---------------- */
  {
    name: "Have I Been Pwned",
    category: "osint",
    kind: "Sizish tekshiruvi",
    description:
      "Email yoki parolingiz ma'lum sizishlarda uchraganini tekshiradi. Domen bo'yicha kuzatuv ham bor.",
    link: "https://haveibeenpwned.com/",
    platforms: ["Brauzer", "API"],
    license: "Xizmat",
    pricing: "Bepul",
    vendor: "Troy Hunt",
    verified: VERIFIED,
    featured: true,
  },
  {
    name: "Shodan",
    category: "osint",
    kind: "Qurilma qidiruvi",
    description:
      "Internetga ulangan qurilmalarni indekslaydi. O'z infratuzilmangiz nima ochib qo'yganini ko'rish uchun ishlating.",
    link: "https://www.shodan.io/",
    platforms: ["Brauzer", "CLI", "API"],
    license: "Xizmat",
    pricing: "Bepul / Pullik",
    vendor: "Shodan",
    verified: VERIFIED,
  },
  {
    name: "Maltego",
    category: "osint",
    kind: "Bog'lanishlar tahlili",
    description:
      "Domen, IP, shaxs va tashkilotlar orasidagi aloqalarni grafik ko'rinishda chizadi.",
    link: "https://www.maltego.com/downloads/",
    platforms: ["Windows", "macOS", "Linux"],
    license: "Yopiq kod",
    pricing: "Bepul / Pullik",
    vendor: "Maltego Technologies",
    verified: VERIFIED,
  },
];
