// src/api/auth.js
import { apiFetch } from "./client";
import { setToken, clearToken } from "./session";

export function authMe() {
  return apiFetch("/auth/me.php");
}

export async function authGoogleLogin(credential) {
  const res = await apiFetch("/auth/google.php", {
    method: "POST",
    body: { credential },
    skipAuth: true, // a stale token must not interfere with a fresh sign-in
  });

  // The session cookie is third-party here and often dropped by the browser,
  // so the token from the body is what actually keeps the user signed in.
  if (res?.token) setToken(res.token, res.expires_at);

  return res;
}

export async function authLogout() {
  try {
    return await apiFetch("/auth/logout.php", { method: "POST" });
  } finally {
    // Local state is cleared even if the server call fails, so the user is
    // never left looking logged in after asking to leave.
    clearToken();
  }
}

/**
 * Mint a single-use code that hands this signed-in session across to the
 * Cyber Nexus mobile app.
 *
 * The app has no Google credential of its own — it opens this site in a
 * browser, the user signs in here exactly as they would on a laptop, and only
 * this code crosses back. One login system, one user table, both devices.
 */
export function authAppHandoff() {
  return apiFetch("/auth/app_handoff.php", { method: "POST" });
}

export function authHealth() {
  return apiFetch("/health.php", { skipAuth: true });
}
