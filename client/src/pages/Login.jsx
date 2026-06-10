import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/chat";

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const user = await login(form.email, form.password);
      navigate(user.role === "admin" ? "/admin" : from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-black min-h-screen flex items-center justify-center px-4 pt-28 pb-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="bg-[#CCFF00] text-black font-extrabold text-lg w-9 h-9 flex items-center justify-center rounded">
              Z
            </span>
          </div>
          <h1 className="text-white text-2xl font-bold">Welcome back</h1>
          <p className="text-white/50 text-sm mt-1">Log in to chat with ZeeBot</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 md:p-8 space-y-5"
        >
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <div>
            <label className="block text-white/70 text-sm mb-2">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm outline-none focus:border-[#CCFF00]/50 transition"
            />
          </div>

          <div>
            <label className="block text-white/70 text-sm mb-2">Password</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm outline-none focus:border-[#CCFF00]/50 transition"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#CCFF00] hover:bg-yellow-300 disabled:opacity-50 text-black font-semibold rounded-lg py-3 transition"
          >
            {submitting ? "Logging in…" : "Log in"}
          </button>

          <p className="text-white/50 text-sm text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#CCFF00] hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
