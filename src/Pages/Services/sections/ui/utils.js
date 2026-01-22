export async function safeCopy(text) {
  const t = String(text ?? "");
  if (!t) return false;

  // Modern clipboard
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(t);
    return true;
  }

  // Fallback
  const ta = document.createElement("textarea");
  ta.value = t;
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  ta.style.top = "-9999px";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(ta);
  return ok;
}

export function downloadText(filename, text) {
  const blob = new Blob([String(text ?? "")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename || "download.txt";
  a.click();
  URL.revokeObjectURL(url);
}

// UTF-8 safe Base64
export function base64EncodeUtf8(str) {
  const s = String(str ?? "");
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin);
}

export function base64DecodeUtf8(b64) {
  const bin = atob(String(b64 ?? ""));
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function clamp(n, a, b) {
  return Math.min(b, Math.max(a, n));
}
