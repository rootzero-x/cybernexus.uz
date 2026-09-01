// src/Pages/Services/sections/lib/passwords.js
//
// Password generation and strength maths. Kept out of the component so the
// unbiased-draw and entropy logic can be tested directly.

export const CHARSETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.?/",
};

/** Characters that are easy to confuse when read from a screen or dictated. */
export const AMBIGUOUS = "il1Lo0O";

export function buildAlphabet({ upper, digits, symbols, noAmbiguous }) {
  let a = CHARSETS.lower;
  if (upper) a += CHARSETS.upper;
  if (digits) a += CHARSETS.digits;
  if (symbols) a += CHARSETS.symbols;
  if (noAmbiguous) a = [...a].filter((c) => !AMBIGUOUS.includes(c)).join("");
  return a;
}

/**
 * Draw `count` characters uniformly from `alphabet`.
 *
 * Math.random() is not a CSPRNG and must never generate a password. The naive
 * `byte % length` is also biased toward the start of the alphabet, so bytes
 * landing in the final incomplete block are rejected and redrawn.
 *
 * `rng` is injectable so the rejection logic can be tested deterministically.
 */
export function randomFrom(alphabet, count, rng) {
  const n = alphabet.length;
  if (n === 0 || count <= 0) return "";

  const fill =
    rng || ((buf) => (globalThis.crypto || globalThis.msCrypto).getRandomValues(buf));

  const max = Math.floor(256 / n) * n; // largest unbiased multiple of n
  const out = [];
  const buf = new Uint8Array(Math.max(16, count * 2));

  while (out.length < count) {
    fill(buf);
    for (let i = 0; i < buf.length && out.length < count; i++) {
      if (buf[i] < max) out.push(alphabet[buf[i] % n]);
    }
  }

  return out.join("");
}

/** Shannon entropy for a uniform draw: length × log2(alphabet size). */
export function entropyBits(length, alphabetSize) {
  if (!length || alphabetSize < 2) return 0;
  return Math.round(length * Math.log2(alphabetSize));
}

export function strengthOf(bits) {
  if (bits < 45) return { label: "Zaif", tone: "plasma", pct: 25 };
  if (bits < 65) return { label: "O'rtacha", tone: "ember", pct: 50 };
  if (bits < 90) return { label: "Kuchli", tone: "cyber", pct: 75 };
  return { label: "Juda kuchli", tone: "signal", pct: 100 };
}

/**
 * Rough offline crack time at 10^12 guesses/second, expressed in Uzbek.
 * Halved because the expected number of guesses is half the keyspace.
 */
export function crackTime(bits) {
  const seconds = Math.pow(2, bits - 1) / 1e12;
  if (seconds < 1) return "bir soniyadan kam";

  const scale = [
    [1, "soniya"],
    [60, "daqiqa"],
    [3600, "soat"],
    [86400, "kun"],
    [31557600, "yil"],
  ];

  let unit = scale[0];
  for (const step of scale) {
    if (seconds >= step[0]) unit = step;
  }

  const value = seconds / unit[0];
  if (value > 1e9) return `${(value / 1e9).toExponential(1)} mlrd ${unit[1]}`;
  return `${value < 10 ? value.toFixed(1) : Math.round(value).toLocaleString("uz-UZ")} ${unit[1]}`;
}
