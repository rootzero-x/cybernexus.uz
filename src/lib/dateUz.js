// src/lib/dateUz.js
//
// Uzbek date formatting.
//
// Intl does not carry a complete uz-UZ calendar in most browsers: asking for
// { month: "long" } falls back to a generic pattern and renders "2026 M09 1"
// instead of a month name. The names are therefore spelled out here.

const MONTHS = [
  "yanvar",
  "fevral",
  "mart",
  "aprel",
  "may",
  "iyun",
  "iyul",
  "avgust",
  "sentabr",
  "oktabr",
  "noyabr",
  "dekabr",
];

function toDate(value) {
  if (value instanceof Date) return value;
  // Unix seconds are the shape everything on this site stores.
  if (typeof value === "number") return new Date(value * 1000);
  return new Date(value);
}

/** "1-sentabr, 2026" */
export function formatDateUz(value) {
  const d = toDate(value);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getDate()}-${MONTHS[d.getMonth()]}, ${d.getFullYear()}`;
}

/** "1-sentabr, 2026 · 14:30" */
export function formatDateTimeUz(value) {
  const d = toDate(value);
  if (Number.isNaN(d.getTime())) return "";
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${formatDateUz(d)} · ${hh}:${mm}`;
}

/** "1 September 2026" — for the certificate image, which is in English. */
export function formatDateEn(value) {
  const d = toDate(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
