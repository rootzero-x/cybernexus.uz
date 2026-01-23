// src/context/AuthContext.jsx
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { authMe } from "../api/auth";

export const AuthContext = createContext({
  user: null,
  loading: true,
  refresh: async () => {},
  setUser: () => {},
  logoutLocal: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await authMe();
      setUser(res?.user || null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const logoutLocal = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, refresh, setUser, logoutLocal }),
    [user, loading, refresh, logoutLocal],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
