// src/api/google.js
//
// Google Identity Services loader.
//
// The old flow called google.accounts.id.prompt() (One Tap) and nothing else.
// One Tap is suppressed in a lot of ordinary situations — the user dismissed it
// before and is in the cooldown period, no Google account is signed into the
// browser, an ad blocker got in the way, third-party cookies are off — and in
// every one of those cases the button just span forever with no error, because
// the notification callback was an empty function.
//
// renderButton is the reliable path: it is a real click target that always
// opens the account chooser. One Tap is kept as a convenience on top.

const GSI_SRC = "https://accounts.google.com/gsi/client";

let loaderPromise = null;

/** Load the GSI script once, resolving with window.google.accounts.id. */
export function loadGoogleIdentity({ timeoutMs = 12000 } = {}) {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google auth faqat brauzerda ishlaydi."));
  }

  if (window.google?.accounts?.id) {
    return Promise.resolve(window.google.accounts.id);
  }

  if (loaderPromise) return loaderPromise;

  loaderPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${GSI_SRC}"]`);
    const script = existing || document.createElement("script");

    const timer = setTimeout(() => {
      loaderPromise = null;
      reject(
        new Error(
          "Google skriptini yuklab bo'lmadi. Reklama bloklovchi yoki tarmoq to'sqinlik qilayotgan bo'lishi mumkin.",
        ),
      );
    }, timeoutMs);

    const onReady = () => {
      clearTimeout(timer);
      if (window.google?.accounts?.id) {
        resolve(window.google.accounts.id);
      } else {
        loaderPromise = null;
        reject(new Error("Google Identity Services yuklandi, lekin ishga tushmadi."));
      }
    };

    const onError = () => {
      clearTimeout(timer);
      loaderPromise = null;
      reject(new Error("Google skripti bloklandi (accounts.google.com)."));
    };

    if (existing && existing.dataset.loaded === "true") {
      onReady();
      return;
    }

    script.addEventListener("load", () => {
      script.dataset.loaded = "true";
      onReady();
    });
    script.addEventListener("error", onError);

    if (!existing) {
      script.src = GSI_SRC;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  });

  return loaderPromise;
}

/** True when running inside the Median-wrapped native app. */
export function isMedianEnv() {
  try {
    return (navigator.userAgent || "").toLowerCase().includes("median");
  } catch {
    return false;
  }
}

/** True when the Median native Google bridge is actually available. */
export function hasMedianGoogleBridge() {
  return typeof window?.median?.socialLogin?.google?.login === "function";
}

/**
 * Native Google sign-in inside the Median APK, where web GSI is usually blocked.
 * Resolves with an ID token.
 */
export function medianGoogleLogin({ timeoutMs = 30000 } = {}) {
  return new Promise((resolve, reject) => {
    if (!hasMedianGoogleBridge()) {
      reject(
        new Error(
          "Median Social Login bridge topilmadi. APK'ni Native Plugins → Social Login yoqilgan holda qayta build qiling.",
        ),
      );
      return;
    }

    let settled = false;
    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      reject(new Error("Google login vaqti tugadi. Qayta urinib ko'ring."));
    }, timeoutMs);

    window.median.socialLogin.google.login({
      callback: (resp) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);

        if (!resp) {
          reject(new Error("Google javobi bo'sh keldi."));
          return;
        }
        if (resp.error) {
          reject(new Error(String(resp.error)));
          return;
        }

        const idToken = resp.idToken || resp.id_token || resp.credential || "";
        if (!idToken) {
          reject(new Error("Google token topilmadi."));
          return;
        }
        resolve(idToken);
      },
    });
  });
}
