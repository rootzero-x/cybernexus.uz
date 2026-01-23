// src/api/auth.js
import { apiFetch } from "./client";

export function authMe() {
  return apiFetch("/auth/me.php");
}

export function authGoogleLogin(credential) {
  return apiFetch("/auth/google.php", {
    method: "POST",
    body: { credential },
  });
}

export function authLogout() {
  return apiFetch("/auth/logout.php", { method: "POST" });
}
