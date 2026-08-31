// src/context/AuthContext.jsx
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { authMe, authLogout } from "../api/auth";
import { clearToken, hasToken } from "../api/session";

export const AuthContext = createContext({
  user: null,
  loading: true,
  error: null,
  refresh: async () => {},
  setUser: () => {},
  logout: async () => {},
  logoutLocal: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Guards against a slow response from an earlier refresh overwriting a newer
  // one (sign in immediately after the initial check, for example).
  const requestId = useRef(0);

  const refresh = useCallback(async () => {
    const id = ++requestId.current;
    setLoading(true);

    // No token and no chance of a usable cookie: skip the round trip and show
    // the login screen straight away instead of a spinner that resolves to 401.
    if (!hasToken()) {
      try {
        const res = await authMe();
        if (id !== requestId.current) return;
        setUser(res?.user || null);
        setError(null);
      } catch (e) {
        if (id !== requestId.current) return;
        setUser(null);
        // A 401 is the normal "not signed in" answer, not a failure worth showing.
        setError(e?.status && e.status !== 401 ? e.message : null);
      } finally {
        if (id === requestId.current) setLoading(false);
      }
      return;
    }

    try {
      const res = await authMe();
      if (id !== requestId.current) return;
      setUser(res?.user || null);
      setError(null);
    } catch (e) {
      if (id !== requestId.current) return;
      setUser(null);
      if (e?.status === 401) clearToken();
      else setError(e?.message || null);
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Signing out in one tab should not leave another tab looking signed in.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "cn_session_token") refresh();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [refresh]);

  const logout = useCallback(async () => {
    try {
      await authLogout();
    } finally {
      setUser(null);
      setError(null);
    }
  }, []);

  const logoutLocal = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, error, refresh, setUser, logout, logoutLocal }),
    [user, loading, error, refresh, logout, logoutLocal],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
