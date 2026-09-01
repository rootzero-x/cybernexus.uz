// src/Pages/Help/helpData.js

export const TOPICS = [
  { key: "all", label: "Hammasi" },
  { key: "account", label: "Hisob va kirish" },
  { key: "platform", label: "Platforma" },
  { key: "tools", label: "Vositalar" },
  { key: "security", label: "Xavfsizlik" },
  { key: "ctf", label: "CTF" },
];

export const FAQ = [
  /* ---------------- Account ---------------- */
  {
    topic: "account",
    q: "Ro'yxatdan o'tish uchun nima kerak?",
    a: "Faqat Google hisobi. \"Continue with Google\" tugmasini bosasiz — birinchi marta kirsangiz hisob avtomatik yaratiladi, keyingi safar shu hisobga kiradi. Alohida parol o'ylab topish shart emas.",
  },
  {
    topic: "account",
    q: "Parolim saqlanadimi?",
    a: "Yo'q. Kirish Google orqali amalga oshadi va biz sizning Google parolingizni ko'rmaymiz ham, saqlamaymiz ham. Bazada faqat email, ism, avatar havolasi va Google bergan barqaror identifikator turadi.",
  },
  {
    topic: "account",
    q: "Kirdim, lekin sahifa meni qaytarib yubordi.",
    a: "Odatda bu brauzer uchinchi tomon cookie'larini bloklaganidan bo'ladi. Platforma buni hisobga olgan — session tokeni cookie'ga emas, brauzeringiz xotirasiga yoziladi. Baribir muammo bo'lsa, sahifani yangilang yoki inkognito rejimni sinab ko'ring.",
  },
  {
    topic: "account",
    q: "Session qancha vaqt amal qiladi?",
    a: "3 soat. Muddat tugagach qayta kirish so'raladi. Bir hisobda bir vaqtda 8 tagacha faol session bo'lishi mumkin — undan oshsa, eng eskisi avtomatik o'chadi.",
  },
  {
    topic: "account",
    q: "Hisobimni o'chirishim mumkinmi?",
    a: "Ha. Contact sahifasidan yozing — hisob va unga bog'liq barcha sessionlar o'chiriladi.",
  },

  /* ---------------- Platform ---------------- */
  {
    topic: "platform",
    q: "CyberNexus nima?",
    a: "Kiberxavfsizlikni amaliy o'rganish uchun platforma: CTF mashqlari, kundalik ishda kerak bo'ladigan vositalar, tekshirilgan dasturlar katalogi, sertifikat generatori va o'nta manbadan avtomatik yig'iladigan yangiliklar.",
  },
  {
    topic: "platform",
    q: "Yangiliklar qayerdan olinadi va qachon yangilanadi?",
    a: "The Hacker News, BleepingComputer, Dark Reading, Krebs on Security, Schneier, Securelist, Unit 42, Have I Been Pwned va r/netsec — hamda Kun.uz bilan Gazeta.uz ning texnologiya yangiliklari. Server har soatda avtomatik yig'ib turadi.",
  },
  {
    topic: "platform",
    q: "Foydalanish pullikmi?",
    a: "Yo'q. Platformadagi barcha modullar bepul.",
  },
  {
    topic: "platform",
    q: "Mobil ilova bormi?",
    a: "Ha — sahifaning o'ng pastki burchagidagi \"Download APK\" tugmasidan Android versiyasini yuklab olishingiz mumkin.",
  },

  /* ---------------- Tools ---------------- */
  {
    topic: "tools",
    q: "Vositalarga kiritgan ma'lumotim serverga yuboriladimi?",
    a: "Yo'q. Services bo'limidagi barcha vositalar — parol generatori, hash, Base64, JWT decoder, subnet kalkulyatori va shifrlar — to'liq brauzeringizda ishlaydi. Kiritgan matningiz sahifadan chiqmaydi.",
  },
  {
    topic: "tools",
    q: "Parol generatori qanchalik ishonchli?",
    a: "Parollar crypto.getRandomValues bilan yaratiladi — bu brauzerning kriptografik tasodifiy sonlar manbai. Math.random() ishlatilmaydi, chunki u bashorat qilinadi. Har bir belgi alfavitdan bir tekis tanlanadi.",
  },
  {
    topic: "tools",
    q: "JWT decoder tokenni tekshiradimi?",
    a: "Yo'q — faqat ochib ko'rsatadi. Imzoni tasdiqlash uchun maxfiy kalit kerak, u bizda yo'q. Shuning uchun boshqa birovning amaldagi tokenini hech qanday saytga joylashtirmang.",
  },
  {
    topic: "tools",
    q: "Nega MD5 va SHA-1 \"eskirgan\" deb belgilangan?",
    a: "Ikkalasida ham amaliy to'qnashuv hujumlari mavjud — turli kirish uchun bir xil hash yasash mumkin. Yangi loyihada SHA-256 yoki undan yuqorisini ishlating; parollar uchun esa bcrypt yoki Argon2.",
  },

  /* ---------------- Security ---------------- */
  {
    topic: "security",
    q: "Zaiflik topsam nima qilay?",
    a: "Contact sahifasidan \"Xavfsizlik hisoboti\" mavzusi bilan yozing. Takrorlash qadamlarini va ta'sir doirasini yozib bering. Tuzatilgunicha ommaga e'lon qilmang va boshqa foydalanuvchilarning ma'lumotiga tegmang.",
  },
  {
    topic: "security",
    q: "Ma'lumotlarim qanday himoyalangan?",
    a: "Session tokeni bazada ochiq holda emas, SHA-256 hash ko'rinishida saqlanadi. Barcha sirlar (baza paroli, kalitlar) veb-papkadan tashqarida turadi. Autentifikatsiya endpointlarida so'rovlar cheklangan, admin panelda esa bcrypt parol va TOTP ikkinchi omil ishlatiladi.",
  },
  {
    topic: "security",
    q: "Vositalardagi bilimni qayerda ishlatsam bo'ladi?",
    a: "Faqat o'zingizga tegishli yoki yozma ruxsat berilgan tizimlarda. Begona tizimni ruxsatsiz tekshirish ko'p mamlakatlarda, jumladan O'zbekistonda, jinoiy javobgarlikka tortiladi. Mashq uchun CTF bo'limi va maxsus poligonlar bor.",
  },

  /* ---------------- CTF ---------------- */
  {
    topic: "ctf",
    q: "CTF Challenge qanday ishlaydi?",
    a: "Terminal ko'rinishidagi muhitda buyruqlar yozasiz. Boshlash uchun `help` deb yozing — mavjud buyruqlar ro'yxati chiqadi.",
  },
  {
    topic: "ctf",
    q: "Flag topsam nima qilay?",
    a: "Topilgan flagni Telegram orqali @snowden_01 ga yuboring.",
  },
  {
    topic: "ctf",
    q: "Sertifikat qanday olinadi?",
    a: "Certificate bo'limiga o'ting, ma'lumotlarni to'ldiring va sertifikatni yuklab oling.",
  },
];

export const QUICK_LINKS = [
  { label: "Telegram", href: "https://t.me/rootzero_x", note: "Eng tez javob" },
  { label: "Xavfsizlik hisoboti", href: "/contact", note: "Zaiflik haqida xabar", internal: true },
  { label: "Services", href: "/services", note: "Vositalar", internal: true },
  { label: "CTF Challenge", href: "/ctf-challenge", note: "Amaliy mashq", internal: true },
];
