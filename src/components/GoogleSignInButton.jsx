// src/components/GoogleSignInButton.jsx
import React, { memo, useEffect, useRef, useState } from "react";
import { loadGoogleIdentity } from "../api/google";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

/**
 * Renders the official Google Identity Services button.
 *
 * The GSI button is injected into the DOM by Google's script, not by React.
 * When the host component re-rendered, React reconciled the container it was
 * injected into and wiped the button back out — leaving a blank space where the
 * sign-in button should be, with no error anywhere to explain it.
 *
 * Isolating it in a memoised component with a static className means React has
 * no reason to touch the container after the first paint, so what Google puts
 * inside it stays there.
 */
function GoogleSignInButtonBase({ onCredential, onError, width = 320 }) {
  const holderRef = useRef(null);
  const rendered = useRef(false);

  // Keep the latest callbacks without re-running the effect (and thus without
  // re-rendering the button).
  const onCredentialRef = useRef(onCredential);
  const onErrorRef = useRef(onError);
  onCredentialRef.current = onCredential;
  onErrorRef.current = onError;

  const [status, setStatus] = useState("loading"); // loading | ready | failed

  useEffect(() => {
    if (rendered.current) return;

    if (!CLIENT_ID) {
      setStatus("failed");
      onErrorRef.current?.("VITE_GOOGLE_CLIENT_ID sozlanmagan (.env).");
      return;
    }

    let cancelled = false;

    loadGoogleIdentity()
      .then((googleId) => {
        if (cancelled || !holderRef.current || rendered.current) return;
        rendered.current = true;

        googleId.initialize({
          client_id: CLIENT_ID,
          use_fedcm_for_prompt: true,
          auto_select: false,
          cancel_on_tap_outside: true,
          callback: (resp) => {
            const credential = resp?.credential;
            if (!credential) {
              onErrorRef.current?.("Google credential topilmadi.");
              return;
            }
            onCredentialRef.current?.(credential);
          },
        });

        // "outline" is the white variant — a dark button would be invisible on
        // this page's black card.
        googleId.renderButton(holderRef.current, {
          type: "standard",
          theme: "outline",
          size: "large",
          shape: "pill",
          text: "continue_with",
          logo_alignment: "left",
          width,
        });

        setStatus("ready");

        // One Tap is a bonus on top of the button; it is allowed to fail.
        try {
          googleId.prompt();
        } catch {
          /* suppressed by the browser — the button still works */
        }
      })
      .catch((e) => {
        if (cancelled) return;
        setStatus("failed");
        onErrorRef.current?.(e?.message || "Google yuklanmadi.");
      });

    return () => {
      cancelled = true;
    };
  }, [width]);

  return (
    <div className="w-full">
      {/* Static className: React must have no reason to patch this node. */}
      <div ref={holderRef} className="cn-gsi-holder" />

      {status === "loading" ? (
        <div className="text-center text-xs text-neon-green/60 tracking-widest py-3">
          GOOGLE YUKLANMOQDA...
        </div>
      ) : null}
    </div>
  );
}

export const GoogleSignInButton = memo(GoogleSignInButtonBase);
export default GoogleSignInButton;
