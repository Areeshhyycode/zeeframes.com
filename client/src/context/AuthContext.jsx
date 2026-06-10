import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { apiUrl } from "../lib/api";

const AuthContext = createContext(null);

const TOKEN_KEY = "zf_token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(true);

  // Restore the session on load by validating the stored token.
  useEffect(() => {
    let active = true;
    async function restore() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(apiUrl("/api/auth/me"), {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (active && res.ok && data.success) {
          setUser(data.user);
        } else if (active) {
          localStorage.removeItem(TOKEN_KEY);
          setToken(null);
        }
      } catch {
        // Network error — keep the token, just don't set the user yet.
      } finally {
        if (active) setLoading(false);
      }
    }
    restore();
    return () => {
      active = false;
    };
  }, [token]);

  const authenticate = useCallback(async (path, body) => {
    const res = await fetch(apiUrl(`/api/auth/${path}`), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || "Something went wrong. Please try again.");
    }
    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  }, []);

  const login = useCallback((email, password) => authenticate("login", { email, password }), [authenticate]);
  const signup = useCallback(
    (name, email, password) => authenticate("register", { name, email, password }),
    [authenticate]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
