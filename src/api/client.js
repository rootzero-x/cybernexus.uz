// src/api/client.js
import { getToken, clearToken } from "./session";

const API_BASE = (
  import.meta.env.VITE_API_BASE ||
  "https://694fc8f1e1918.myxvest1.ru/cybernexus/api"
).replace(/\/+$/, "");

const DEFAULT_TIMEOUT_MS = 20000;

async function parseJsonSafe(res) {
  const text = await res.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    // A PHP fatal or an HTML error page lands here. Surface a hint of it
    // rather than the useless "Unexpected token < in JSON".
    return { ok: false, message: "Server noto'g'ri javob qaytardi", raw: text.slice(0, 300) };
  }
}

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export async function apiFetch(path, options = {}) {
  const url = `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;

  const headers = {
    Accept: "application/json",
    ...(options.headers || {}),
  };

  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  // Bearer is the transport that works cross-site; the cookie rides along via
  // credentials: "include" for the cases where it is still accepted.
  const token = getToken();
  if (token && !options.skipAuth) {
    headers.Authorization = `Bearer ${token}`;
    // Some proxies strip Authorization outright — the backend reads this too.
    headers["X-Auth-Token"] = token;
  }

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    options.timeoutMs || DEFAULT_TIMEOUT_MS,
  );

  // Let a caller cancel too — a filter change should drop the request already
  // in flight rather than letting a slow earlier response overwrite a newer one.
  if (options.signal) {
    if (options.signal.aborted) controller.abort();
    else options.signal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  let res;
  try {
    res = await fetch(url, {
      method: options.method || "GET",
      headers,
      credentials: "include",
      signal: controller.signal,
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    });
  } catch (e) {
    clearTimeout(timeout);

    if (e.name === "AbortError") {
      // A cancellation the caller asked for is not a failure — let it stay an
      // AbortError so callers can ignore it, and only report the timeout case.
      if (options.signal?.aborted) throw e;
      throw new ApiError("So'rov vaqti tugadi. Internetni tekshiring.", 0, {});
    }

    throw new ApiError("Serverga ulanib bo'lmadi.", 0, {});
  }
  clearTimeout(timeout);

  const data = await parseJsonSafe(res);

  if (!res.ok || data?.ok === false) {
    // A dead session should not keep being replayed on every later request.
    if (res.status === 401) clearToken();

    throw new ApiError(data?.message || `Request failed (${res.status})`, res.status, data);
  }

  return data;
}

export { API_BASE };
