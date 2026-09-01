// src/api/news.js
import { apiFetch } from "./client";
import { formatDateUz, formatDateTimeUz } from "../lib/dateUz";

/**
 * Headlines aggregated on the server from ten security feeds plus Kun.uz and
 * Gazeta.uz, refreshed hourly by cron.
 *
 * Public endpoint — no session needed, so the page renders for a signed-out
 * visitor too.
 */
export function fetchNews({
  page = 1,
  limit = 18,
  category = "all",
  lang = "all",
  q = "",
  signal,
} = {}) {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));
  if (category && category !== "all") params.set("category", category);
  if (lang && lang !== "all") params.set("lang", lang);
  if (q.trim()) params.set("q", q.trim());

  return apiFetch(`/news/list.php?${params.toString()}`, {
    skipAuth: true,
    signal,
  });
}

/** "3 daqiqa oldin", "2 soat oldin", "5 kun oldin". */
export function timeAgo(unixSeconds) {
  if (!unixSeconds) return "";

  const diff = Math.floor(Date.now() / 1000) - Number(unixSeconds);
  if (diff < 0) return "hozir";
  if (diff < 60) return "hozirgina";

  const units = [
    [60, "daqiqa"],
    [3600, "soat"],
    [86400, "kun"],
    [604800, "hafta"],
    [2592000, "oy"],
  ];

  for (let i = 0; i < units.length; i++) {
    const [seconds, label] = units[i];
    const next = units[i + 1]?.[0];
    if (!next || diff < next) {
      return `${Math.max(1, Math.floor(diff / seconds))} ${label} oldin`;
    }
  }

  return formatDateUz(unixSeconds);
}

export function formatDate(unixSeconds) {
  return formatDateTimeUz(unixSeconds);
}
