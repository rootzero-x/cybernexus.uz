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

export function authHealth() {
  return apiFetch("/health.php", { skipAuth: true });
}
