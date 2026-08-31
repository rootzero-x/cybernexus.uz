// src/api/session.js
//
// Session token storage.
//
// cybernexus.uz and the API host (…myxvest1.ru) are different sites, so the
// backend's httpOnly session cookie is a third-party cookie. Chrome and Safari
// block those by default, which is why a successful Google sign-in was still
// followed by /auth/me.php returning 401 and the app bouncing back to /auth.
//
// The backend now also returns the session token in the response body, and we
// send it back as a bearer token. The cookie still gets set and still works
// where it is allowed — this is the transport that survives when it isn't.

const TOKEN_KEY = "cn_session_token";
const EXPIRES_KEY = "cn_session_expires";

// Private-mode Safari and "block all cookies" make localStorage throw on
// access, so every call is guarded and falls back to an in-memory value that
// at least survives the current page load.
let memoryToken = "";
let memoryExpires = 0;

function safeGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function safeRemove(key) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* nothing we can do */
  }
}

export function getToken() {
  const stored = safeGet(TOKEN_KEY);
  const token = stored || memoryToken;
  if (!token) return "";

  // Drop a token we already know is stale instead of spending a request on it.
  const expires = Number(safeGet(EXPIRES_KEY) || memoryExpires || 0);
  if (expires && Date.now() / 1000 > expires) {
    clearToken();
    return "";
  }

  return token;
}

export function setToken(token, expiresAt) {
  if (!token) return;
  memoryToken = token;
  memoryExpires = Number(expiresAt) || 0;
  safeSet(TOKEN_KEY, token);
  if (expiresAt) safeSet(EXPIRES_KEY, String(expiresAt));
}

export function clearToken() {
  memoryToken = "";
  memoryExpires = 0;
  safeRemove(TOKEN_KEY);
  safeRemove(EXPIRES_KEY);
}

export function hasToken() {
  return getToken() !== "";
}
