import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setSubmitting(true);
    try {
      const user = await signup(form.name, form.email, form.password);
      navigate(user.role === "admin" ? "/admin" : "/chat", { replace: true });
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
          <h1 className="text-white text-2xl font-bold">Create your account</h1>
          <p className="text-white/50 text-sm mt-1">Sign up to start chatting with ZeeBot</p>
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
            <label className="block text-white/70 text-sm mb-2">Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Jane Doe"
              className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm outline-none focus:border-[#CCFF00]/50 transition"
            />
          </div>

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
              placeholder="At least 6 characters"
              className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm outline-none focus:border-[#CCFF00]/50 transition"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#CCFF00] hover:bg-yellow-300 disabled:opacity-50 text-black font-semibold rounded-lg py-3 transition"
          >
            {submitting ? "Creating account…" : "Sign up"}
          </button>

          <p className="text-white/50 text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-[#CCFF00] hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
