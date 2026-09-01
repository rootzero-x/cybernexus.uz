// src/api/track.js
import { API_BASE } from "./client";
import { getToken } from "./session";

/**
 * First-party page-view ping.
 *
 * Deliberately not routed through apiFetch: analytics must never be able to
 * fail a page. This swallows every error, never throws, and never surfaces a
 * message — if the beacon does not land, nothing about the visit changes.
 *
 * Only the in-app path is sent. The full URL is not, because a path plus a
 * query string can carry things that belong to the visitor.
 */
export function trackPageView(path) {
  if (typeof window === "undefined") return;
  if (!path || typeof path !== "string" || path[0] !== "/") return;

  const body = JSON.stringify({
    path,
    // document.referrer is the previous page; the server reduces it to an
    // origin before storing, so an internal referrer just reads as our own.
    referrer: document.referrer || "",
  });

  const headers = { "Content-Type": "application/json" };

  // Attributing a view to the signed-in account is what makes the admin's
  // per-user activity view possible; signed-out views are still recorded,
  // just without an account attached.
  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
    headers["X-Auth-Token"] = token;
  }

  try {
    fetch(`${API_BASE}/track/view.php`, {
      method: "POST",
      credentials: "include",
      headers,
      body,
      // The ping must not hold the page open or delay anything else.
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* offline, blocked by an extension, CSP — all fine, drop it */
  }
}
