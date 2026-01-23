// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-neon-green grid place-items-center font-mono">
        <div className="rounded-xl border-2 border-neon-green/35 bg-black/70 backdrop-blur px-5 py-4 shadow-neon">
          <div className="text-neon-blue font-black tracking-widest text-sm">AUTH CHECK</div>
          <div className="mt-1 text-neon-green/90 text-sm">Session tekshirilmoqda...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
