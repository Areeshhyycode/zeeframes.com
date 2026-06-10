import { useState } from "react";
import { apiUrl } from "../lib/api";

const ASSET = "https://zeeframes.com/frontend-assets/images";

/* --------------------------- Contact data --------------------------- */
const contactCards = [
  {
    key: "email",
    label: "Email Us",
    value: "hello@zeeframes.com",
    href: "mailto:hello@zeeframes.com",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </>
    ),
  },
  {
    key: "phone",
    label: "Call Us",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
    icon: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z" />
    ),
  },
  {
    key: "location",
    label: "Visit Us",
    value: "Remote-first · Worldwide",
    href: null,
    icon: (
      <>
        <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
];

const services = [
  "AI Automation",
  "AI Agents & Support",
  "Custom AI Software",
  "API Integration",
  "AI Consulting",
  "Other",
];

const faqs = [
  {
    q: "How fast will I get a reply?",
    a: "We respond to every inquiry within one business day, usually much sooner. Urgent? Mention it in your message and we'll prioritize it.",
  },
  {
    q: "Do you work with startups?",
    a: "Absolutely. From early-stage founders to scaling teams, we tailor our engagement to fit your stage, budget, and timeline.",
  },
  {
    q: "What does the first call look like?",
    a: "A relaxed 30-minute discovery call where we understand your goals, answer questions, and map out a clear path forward, no pressure, no jargon.",
  },
  {
    q: "How is pricing structured?",
    a: "We offer both project-based and recurring partnership models with transparent invoices and no hidden fees. Cancel anytime.",
  },
];

/* ----------------------------- Icons ----------------------------- */
const Icon = ({ children }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
    <path d="M14.58 5.42L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.67 5H15v8.33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: services[0],
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Please enter a valid email.";
    }
    if (!form.message.trim()) next.message = "Tell us a little about your project.";
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    const next = validate();
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(apiUrl("/api/contacts"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setServerError(err.message || "Unable to send your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-black overflow-x-hidden">
      {/* ===== HERO ===== */}
      <section className="relative pt-36 md:pt-44 pb-12 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 md:px-20">
          <div className="relative max-w-[820px] mx-auto text-center">
            <img
              src={`${ASSET}/svgs/hero-star.svg`}
              alt="star"
              width="73"
              height="80"
              className="absolute -left-6 top-20 w-10 md:w-[60px] hidden md:block"
            />
            <span className="inline-block text-xs font-semibold text-[#CCFF00] uppercase tracking-[0.2em] mb-4">
              Get in touch
            </span>
            <h1 className="text-white text-4xl md:text-7xl font-extrabold uppercase leading-[1.05]">
              Let's Build
              <br />
              Something Great
            </h1>
            <p className="text-white/70 text-base md:text-lg mt-6 max-w-[620px] mx-auto">
              Have a project in mind or just want to say hello? Drop us a line and
              our team will get back to you within{" "}
              <span className="text-[#CCFF00]">one business day</span>.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CONTACT CARDS ===== */}
      <section className="bg-black pb-4">
        <div className="max-w-[1400px] mx-auto px-6 md:px-20">
          <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
            {contactCards.map((c) => {
              const inner = (
                <>
                  <div className="w-12 h-12 rounded-xl bg-[#CCFF00]/10 text-[#CCFF00] flex items-center justify-center mb-5 group-hover:bg-[#CCFF00] group-hover:text-black transition">
                    <Icon>{c.icon}</Icon>
                  </div>
                  <span className="block text-white/50 text-sm">{c.label}</span>
                  <span className="block text-white text-lg font-semibold mt-1 group-hover:text-[#CCFF00] transition">
                    {c.value}
                  </span>
                </>
              );
              return c.href ? (
                <a
                  key={c.key}
                  href={c.href}
                  className="group bg-[#0D0D0D] border border-white/10 rounded-2xl p-6 hover:border-[#CCFF00]/40 transition"
                >
                  {inner}
                </a>
              ) : (
                <div
                  key={c.key}
                  className="group bg-[#0D0D0D] border border-white/10 rounded-2xl p-6"
                >
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FORM + SIDE ===== */}
      <section className="py-16 md:py-24 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 md:px-20 grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-start">
          {/* Form */}
          <div className="bg-[#0D0D0D] border border-white/10 rounded-3xl p-6 md:p-10">
            {submitted ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[#CCFF00] flex items-center justify-center mx-auto mb-6">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12.5L10 17.5L19 7" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="text-white text-2xl md:text-3xl font-bold">
                  Message sent!
                </h2>
                <p className="text-white/60 mt-3 max-w-[400px] mx-auto">
                  Thanks for reaching out, {form.name.split(" ")[0] || "there"}. We've
                  got your message and will be in touch very soon.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setServerError("");
                    setForm({ name: "", email: "", company: "", service: services[0], message: "" });
                  }}
                  className="mt-8 text-[#CCFF00] font-semibold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
                >
                  Send another message
                  <ArrowIcon />
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-white text-2xl md:text-3xl font-bold">
                  Send us a message
                </h2>
                <p className="text-white/50 mt-2">
                  Fill in the form and we'll get back to you shortly.
                </p>

                <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field
                      label="Name"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={update("name")}
                      error={errors.name}
                    />
                    <Field
                      label="Email"
                      type="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={update("email")}
                      error={errors.email}
                    />
                  </div>

                  <Field
                    label="Company"
                    optional
                    placeholder="Your company (optional)"
                    value={form.company}
                    onChange={update("company")}
                  />

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      What can we help with?
                    </label>
                    <div className="relative">
                      <select
                        value={form.service}
                        onChange={update("service")}
                        className="w-full appearance-none bg-black border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#CCFF00]/50 transition"
                      >
                        {services.map((s) => (
                          <option key={s} value={s} className="bg-black">
                            {s}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={update("message")}
                      placeholder="Tell us about your project, goals, and timeline..."
                      className={`w-full bg-black border rounded-xl px-4 py-3 text-white placeholder-white/40 outline-none transition resize-none ${
                        errors.message ? "border-red-500/60" : "border-white/10 focus:border-[#CCFF00]/50"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-red-400 text-xs mt-1.5">{errors.message}</p>
                    )}
                  </div>

                  {serverError && (
                    <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                      {serverError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto bg-[#CCFF00] hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold px-8 py-3.5 rounded-full inline-flex items-center justify-center gap-2 transition"
                  >
                    {submitting ? "Sending..." : "Send Message"}
                    {!submitting && <ArrowIcon />}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Side panel */}
          <div className="space-y-6">
            <div className="bg-[#0D0D0D] border border-white/10 rounded-3xl p-8">
              <h3 className="text-white text-xl font-bold">Why work with us</h3>
              <ul className="mt-5 space-y-4">
                {[
                  "Reply within one business day",
                  "Transparent, no-hidden-fees pricing",
                  "A dedicated project manager",
                  "100% satisfaction commitment",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/70">
                    <span className="w-5 h-5 mt-0.5 rounded-full bg-[#CCFF00]/15 text-[#CCFF00] flex items-center justify-center shrink-0">
                      <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                        <path d="M5 10.5L8.5 14L15 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#CCFF00]/15 to-transparent border border-[#CCFF00]/20 rounded-3xl p-8">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {["umar", "nashra", "gohar"].map((n) => (
                    <img
                      key={n}
                      src={`${ASSET}/about-${n}.webp`}
                      alt={n}
                      className="w-10 h-10 rounded-full object-cover border-2 border-black grayscale"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-white font-semibold leading-tight">Our team is online</p>
                  <p className="text-white/50 text-sm">Usually replies in a few hours</p>
                </div>
              </div>
              <p className="text-white/70 mt-5 text-sm leading-relaxed">
                Prefer a quick chat? Reach out on WhatsApp using the button in the
                corner and talk to a real human, no bots.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="pb-24 md:pb-32 bg-black">
        <div className="max-w-[820px] mx-auto px-6 md:px-20">
          <div className="text-center">
            <p className="text-sm text-[#CCFF00] uppercase tracking-wide font-semibold">FAQ</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">
              Questions, answered
            </h2>
          </div>

          <div className="mt-12 space-y-3">
            {faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={f.q}
                  className="bg-[#0D0D0D] border border-white/10 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-white font-medium">{f.q}</span>
                    <span
                      className={`text-[#CCFF00] shrink-0 transition-transform ${isOpen ? "rotate-45" : ""}`}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-white/60 leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

/* --------------------------- Reusable field --------------------------- */
function Field({ label, optional, type = "text", placeholder, value, onChange, error }) {
  return (
    <div>
      <label className="block text-white/80 text-sm font-medium mb-2">
        {label}
        {optional && <span className="text-white/40 font-normal"> (optional)</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-black border rounded-xl px-4 py-3 text-white placeholder-white/40 outline-none transition ${
          error ? "border-red-500/60" : "border-white/10 focus:border-[#CCFF00]/50"
        }`}
      />
      {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
    </div>
  );
}
