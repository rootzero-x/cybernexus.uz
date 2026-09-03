// src/api/profile.js
import { apiFetch } from "./client";

/**
 * The signed-in user's own profile.
 *
 * There is no id parameter anywhere in this module by design: every endpoint
 * resolves the account from the session, so a profile can only ever read and
 * write itself.
 */
export function fetchProfile({ signal } = {}) {
  return apiFetch("/profile/overview.php", { signal });
}

/** Devices currently signed in to this account. */
export function fetchMySessions({ signal } = {}) {
  return apiFetch("/profile/sessions.php", { signal });
}

/** Sign one device out. Returns { was_current } — true means this browser. */
export function revokeMySession(id) {
  return apiFetch("/profile/session_revoke.php", {
    method: "POST",
    body: { id },
  });
}

/** The display name is the only field the user owns; email comes from Google. */
export function updateProfile({ fullName }) {
  return apiFetch("/profile/update.php", {
    method: "POST",
    body: { full_name: fullName },
  });
}

/**
 * Delete this account and everything personal attached to it.
 *
 * `confirm` must be the literal string "DELETE" — the server rejects anything
 * else, so a stray POST cannot wipe a row on its own.
 */
export function deleteMyAccount() {
  return apiFetch("/profile/delete_account.php", {
    method: "POST",
    body: { confirm: "DELETE" },
  });
}
