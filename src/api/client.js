// src/api/client.js
const API_BASE =
  import.meta.env.VITE_API_BASE ||
  "https://694fc8f1e1918.myxvest1.ru/cybernexus/api";

async function parseJsonSafe(res) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return {};
  }
}

export async function apiFetch(path, options = {}) {
  const url = `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;

  const res = await fetch(url, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include", // ✅ cookie session uchun shart
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await parseJsonSafe(res);

  if (!res.ok || data?.ok === false) {
    const message = data?.message || "Request failed";
    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

export { API_BASE };
