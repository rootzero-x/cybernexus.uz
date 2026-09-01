// src/api/certificates.js
import { apiFetch } from "./client";

/**
 * Record a passed exam and get back the certificate id.
 *
 * The id comes from the server rather than the browser: an id minted in the
 * page can be invented by anyone, and one built from Math.random is guessable
 * besides. Only a recorded id means anything to /verify.
 */
export function issueCertificate({ fullName, score, total }) {
  return apiFetch("/certificates/issue.php", {
    method: "POST",
    body: { full_name: fullName, score, total },
  });
}

/** Public lookup — no session needed, so an employer can check a claim. */
export function verifyCertificate(certId) {
  return apiFetch(
    `/certificates/verify.php?id=${encodeURIComponent(certId.trim())}`,
    { skipAuth: true },
  );
}
