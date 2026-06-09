import { useState } from "react";
import { Link } from "react-router-dom";

const ASSET = "https://zeeframes.com/frontend-assets/images";

const niches = ["All Niches", "FinTech", "Logistic", "Marketplace", "Real Estate"];

const caseStudies = [
  {
    name: "GigMarket",
    desc: "Discover top freelancers for AI, design and creative services",
    niche: "Marketplace",
    bg: "linear-gradient(135deg, #5a6470 0%, #2c333c 100%)",
  },
  {
    name: "TradeBack",
    desc: "Cashback tracking and weekly payout management for active traders",
    niche: "FinTech",
    bg: "linear-gradient(135deg, #1f2937 0%, #0d1117 100%)",
  },
  {
    name: "Gig Desk",
    desc: "All-in-one dashboard to manage gigs, tours, venues and payrolls",
    niche: "Marketplace",
    bg: "linear-gradient(135deg, #d9d9d9 0%, #f0f0f0 100%)",
  },
  {
    name: "ChinaSoko",
    desc: "Real-time shipment tracking and delivery management at your fingertips",
    niche: "Logistic",
    bg: "linear-gradient(135deg, #ff5b5b 0%, #ff8a8a 100%)",
  },
  {
    name: "Villa Vault",
    desc: "Find your perfect Ibiza luxury villa — for rent or purchase",
    niche: "Real Estate",
    bg: "linear-gradient(135deg, #c79a4b 0%, #e8c87f 100%)",
  },
  {
    name: "Swap Coin",
    desc: "Swap, send and grow your crypto in one secure mobile wallet",
    niche: "FinTech",
    bg: "linear-gradient(135deg, #c6f042 0%, #e3ff8a 100%)",
  },
];

const founders = [
  { name: "Mohammad Ali", role: "Director & Co-Founder", img: `${ASSET}/about-ali.webp` },
  { name: "Muhammad Babar", role: "Director & Co-Founder", img: `${ASSET}/about-babar.webp` },
];

const promises = [
  "You'll hear from us within one business day.",
  "We'll understand your goals and gather the right project details.",
  "You'll receive a clear proposal with timeline, scope, and pricing.",
];

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
    <circle cx="12" cy="12" r="10" stroke="#CCFF00" strokeWidth="1.5" />
    <path d="M8 12l2.5 2.5L16 9" stroke="#CCFF00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Work() {
  const [active, setActive] = useState("All Niches");

  const visible =
    active === "All Niches"
      ? caseStudies
      : caseStudies.filter((c) => c.niche === active);

  return (
    <main className="bg-black overflow-x-hidden">
      {/* ===== HERO ===== */}
      <section className="relative pt-36 md:pt-44 pb-20 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 md:px-20">
          <div className="relative max-w-[900px] mx-auto text-center">
            <img
              src={`${ASSET}/svgs/hero-star.svg`}
              alt="star"
              width="73"
              height="80"
              className="absolute -left-2 md:left-2 top-32 w-10 md:w-[56px] hidden md:block"
            />
            <h1 className="text-white text-4xl md:text-7xl font-extrabold uppercase leading-[1.05]">
              Our UI UX &amp; Branding
              <br />
              Case Studies
            </h1>
            <p className="text-white/70 text-base md:text-lg mt-6 max-w-[560px] mx-auto">
              No Matter The Industry You're In, Or The Asset You Need, We Can
              Design It For You
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 text-white font-semibold px-8 py-3.5 rounded-full mt-8 transition"
            >
              Schedule call
            </Link>
          </div>
        </div>
      </section>

      {/* ===== INDUSTRY FILTER + CASE STUDIES ===== */}
      <section className="pb-20 md:pb-28 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 md:px-20">
          <p className="text-xs text-white/70 uppercase tracking-wide font-semibold">
            Choose Your Industry
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            {niches.map((n) => {
              const isActive = n === active;
              return (
                <button
                  key={n}
                  onClick={() => setActive(n)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition border ${
                    isActive
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-white/80 border-white/15 hover:border-white/40"
                  }`}
                >
                  {n}
                </button>
              );
            })}
          </div>

          {/* Case study grid */}
          <div className="grid md:grid-cols-2 gap-8 mt-12 md:mt-16">
            {visible.map((p) => (
              <div key={p.name} className="group cursor-pointer">
                <div
                  className="rounded-2xl h-[340px] md:h-[420px] flex items-end p-8 overflow-hidden transition-transform group-hover:scale-[1.02]"
                  style={{ background: p.bg }}
                >
                  <span className="text-5xl md:text-7xl font-extrabold text-black/15 uppercase">
                    {p.name}
                  </span>
                </div>
                <div className="mt-5">
                  <p className="text-sm text-gray-400">{p.name}</p>
                  <h3 className="text-xl md:text-2xl font-bold text-white mt-1 max-w-md">
                    {p.desc}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="text-white/50 text-center mt-16">
              No case studies in this niche yet — check back soon.
            </p>
          )}
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="py-20 md:py-28 bg-[#0D0D0D] border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-20 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left */}
          <div>
            <p className="text-sm text-[#CCFF00] uppercase tracking-wide font-semibold">
              Contact Us
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 leading-tight">
              Let's Build Something You'll Be Proud Of
            </h2>
            <p className="text-white/60 mt-5 max-w-[480px]">
              Have a project in mind? Whether you need a full UI/UX redesign, a new
              digital product, or a stronger online presence, our team is ready to
              help turn your ideas into reality.
            </p>

            {/* Founders */}
            <div className="flex flex-wrap gap-8 mt-10">
              {founders.map((f) => (
                <div key={f.name} className="flex items-center gap-3">
                  <img
                    src={f.img}
                    alt={f.name}
                    className="w-12 h-12 rounded-full object-cover grayscale"
                  />
                  <div>
                    <p className="text-white font-semibold leading-tight">{f.name}</p>
                    <p className="text-white/50 text-sm">{f.role}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Promises */}
            <ul className="space-y-4 mt-10">
              {promises.map((p) => (
                <li key={p} className="flex items-center gap-3 text-white/80">
                  <CheckIcon />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form */}
          <div className="bg-black border border-white/10 rounded-2xl p-6 md:p-8">
            <form
              className="space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder="Full Name*"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/40 outline-none focus:border-[#CCFF00]/50 transition"
              />
              <input
                type="email"
                placeholder="Email Address*"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/40 outline-none focus:border-[#CCFF00]/50 transition"
              />
              <input
                type="tel"
                placeholder="Phone Number*"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/40 outline-none focus:border-[#CCFF00]/50 transition"
              />
              <input
                type="text"
                placeholder="Country (Optional)"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/40 outline-none focus:border-[#CCFF00]/50 transition"
              />
              <textarea
                rows="4"
                placeholder="Tell us about your project, goals, timeline, or requirements*"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/40 outline-none focus:border-[#CCFF00]/50 transition resize-none"
              />
              <button
                type="submit"
                className="w-full bg-[#CCFF00] hover:bg-yellow-300 text-black font-semibold py-3.5 rounded-full transition"
              >
                Submit Inquiry
              </button>
            </form>

            <p className="text-white/60 text-sm mt-6">
              Prefer email instead? Feel free to contact us directly.
            </p>
            <a
              href="mailto:sales@zeeframes.com"
              className="text-[#CCFF00] text-sm mt-1 inline-block"
            >
              sales@zeeframes.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
