import { Link } from "react-router-dom";

const ASSET = "https://zeeframes.com/frontend-assets/images";

const credibility = [
  {
    title: "4.9 Rating",
    icon: `${ASSET}/svgs/clutch.svg`,
    flags: [],
  },
  {
    title: "Best In",
    icon: `${ASSET}/svgs/clutch.svg`,
    flags: [`${ASSET}/svgs/usa-flag.svg`, `${ASSET}/svgs/uk-flag.svg`],
  },
  {
    title: "150 M Views",
    icon: `${ASSET}/svgs/dribbble.svg`,
    flags: [],
  },
  {
    title: "Verified",
    icon: `${ASSET}/svgs/webflow.svg`,
    flags: [],
    verified: true,
  },
];

const aboutCards = [
  {
    icon: `${ASSET}/svgs/team.svg`,
    title: "Our Team",
    desc: "Our team of expert UI UX designers has a proven track record of creating innovative design solutions that transform businesses across various industries and geographies.",
  },
  {
    icon: `${ASSET}/svgs/client-centeric.svg`,
    title: "Client-Centric Design",
    desc: "At ZeeFrames, our unique design approach focuses on understanding client needs and collaborating to create exceptional, goal-driven digital products.",
  },
  {
    icon: `${ASSET}/svgs/testimonial.svg`,
    title: "Testimonials Showcase",
    desc: "Don't just take our word for it—see what satisfied clients say. Explore testimonials and case studies showcasing how our design solutions help businesses achieve their goals.",
  },
];

const stats = [
  { value: "1200+", label: "Successful Projects", icon: `${ASSET}/svgs/flame.svg` },
  { value: "200+", label: "Repeated Clients", icon: `${ASSET}/svgs/repeated-clients.svg` },
  { value: "30+", label: "UX Experts", icon: `${ASSET}/svgs/user-circle.svg` },
  { value: "4.8+", label: "Stars On Google", icon: `${ASSET}/svgs/smile.svg` },
];

const culturePhotos = [
  `${ASSET}/about-member-1.webp`,
  `${ASSET}/about-member-2.webp`,
  `${ASSET}/about-member-3.webp`,
  `${ASSET}/about-member-4.webp`,
  `${ASSET}/about-member-5.webp`,
];

const values = [
  {
    no: "01",
    title: "Crafted, not copied",
    desc: "No two problems are exactly alike, that's why we believe every project deserves a specific tailored solution, including yours.",
  },
  {
    no: "02",
    title: "Seamless collaboration",
    desc: "We ensure all the deliverables are met timely because we love smooth-sailing projects. Our project managers are always ready to discuss and provide updates for you.",
  },
  {
    no: "03",
    title: "Stay flexible",
    desc: "Just like cats, we are flexible. We remain adaptable to any urgent needs or changes as your project evolves.",
  },
  {
    no: "04",
    title: "Transparent pricing",
    desc: "We provide a clear breakdown of invoices, so no hidden fees! Whether you do project-based or recurring partnership, you can cancel anytime.",
  },
];

const team = [
  { name: "Nasir Ali", role: "CEO & Founder", img: `${ASSET}/about-nasir.webp` },
  { name: "Mohammad Ali", role: "Sales Director", img: `${ASSET}/about-ali.webp` },
  { name: "Muhammad Babar", role: "Design Director", img: `${ASSET}/about-babar.webp` },
  { name: "Umar Islam", role: "UI UX Design Lead", img: `${ASSET}/about-umar.webp` },
  { name: "Nashra Maqsood", role: "UI UX Designer", img: `${ASSET}/about-nashra.webp` },
  { name: "Goher Ayub", role: "UI UX Designer", img: `${ASSET}/about-gohar.webp` },
  { name: "Rao Abdullah", role: "UI UX Designer", img: `${ASSET}/about-abdullah.webp` },
  { name: "Mariam Hashmi", role: "UI UX Designer", img: `${ASSET}/about-maryam.webp` },
  { name: "Rana Mubashir", role: "UI UX Designer", img: `${ASSET}/about-mubashir.webp` },
  { name: "Muhammad Yousaf", role: "UI UX Designer", img: `${ASSET}/about-yousaf.webp` },
  { name: "Mustafa Afridi", role: "UI UX Designer", img: `${ASSET}/about-mustafa.webp` },
  { name: "Bilal Younas", role: "UI UX Designer", img: `${ASSET}/about-bilal.webp` },
];

const reviews = [
  { logo: `${ASSET}/svgs/clutch-large.svg`, star: `${ASSET}/svgs/red-star.svg`, count: "41 Reviews" },
  { logo: `${ASSET}/svgs/goodfirms-large.svg`, star: `${ASSET}/svgs/blue-star.svg`, count: "41 Reviews" },
  { logo: `${ASSET}/svgs/upwork-large.svg`, star: `${ASSET}/svgs/green-star.svg`, count: "41 Reviews" },
];

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
    <path d="M14.58 5.42L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.67 5H15v8.33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function About() {
  return (
    <main className="bg-black overflow-x-hidden">
      {/* ===== HERO ===== */}
      <section className="relative pt-36 md:pt-44 pb-16 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 md:px-20">
          <div className="relative max-w-[820px] mx-auto text-center">
            <img
              src={`${ASSET}/svgs/hero-star.svg`}
              alt="star"
              width="73"
              height="80"
              className="absolute -left-6 top-24 w-10 md:w-[60px] hidden md:block"
            />
            <h1 className="text-white text-4xl md:text-7xl font-extrabold uppercase leading-[1.05]">
              A Strategic UI UX
              <br />
              Design Agency
            </h1>
            <p className="text-white/70 text-base md:text-lg mt-6 max-w-[640px] mx-auto">
              We Are The Best Product Design Agency For Startups. We Excel In UI UX
              Design, Branding, Web Development &amp; Committed To 100% Satisfaction
              With Every Project.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Link
                to="/contact"
                className="bg-white hover:bg-[#CCFF00] text-black font-semibold px-7 py-3.5 rounded-full transition"
              >
                Request a Proposal Today
              </Link>
            </div>
          </div>

          {/* Credibility cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 md:mt-16 max-w-[1000px] mx-auto">
            {credibility.map((c) => (
              <div
                key={c.title}
                className="bg-[#141414] border border-white/10 rounded-2xl p-4 flex flex-col gap-3"
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-white font-semibold">{c.title}</span>
                  {c.flags.map((f) => (
                    <img key={f} src={f} alt="flag" className="h-4 w-6 object-cover rounded-sm" />
                  ))}
                  {c.verified && (
                    <span className="w-5 h-5 rounded-full bg-[#22C55E] flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                        <path d="M5 10.5L8.5 14L15 6.5" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between bg-black/40 border border-white/10 rounded-full pl-1.5 pr-3 py-1.5">
                  <span className="flex items-center gap-2 text-white/70 text-xs">
                    <img src={c.icon} alt="platform" className="h-4 w-auto bg-white rounded-full p-0.5" />
                    Reviewed on
                  </span>
                  <span className="text-white/70">
                    <ArrowIcon />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GROUP IMAGE ===== */}
      <section className="bg-black">
        <img
          src={`${ASSET}/about-group-image.webp`}
          alt="ZeeFrames team"
          className="w-full object-cover grayscale"
        />
      </section>

      {/* ===== ABOUT ===== */}
      <section className="py-20 md:py-28 bg-[#0D0D0D]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-20 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Image with frame */}
          <div className="relative">
            <img
              src={`${ASSET}/svgs/hero-star.svg`}
              alt="star"
              className="absolute -top-8 right-10 w-10 hidden md:block"
            />
            <div className="absolute -top-6 -left-6 w-2/3 h-2/3 border border-[#CCFF00]/40 rounded-2xl hidden md:block" />
            <img
              src={`${ASSET}/about.webp`}
              alt="About ZeeFrames"
              className="relative w-2/3 ml-auto md:ml-0 rounded-2xl"
            />
          </div>

          <div>
            <p className="text-sm text-[#CCFF00] uppercase tracking-wide font-semibold">About</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">
              Who We Are as a Design Partner
            </h2>
            <p className="text-white/60 mt-5 max-w-[520px]">
              ZeeFrames is a specialized UI UX design agency with a focus on creating
              exceptional digital experiences. ZeeFrames is committed to delivering the
              best user experience possible for your business.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mt-10">
              {aboutCards.map((card) => (
                <div
                  key={card.title}
                  className="bg-black border border-white/10 rounded-2xl p-5"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5">
                    <img src={card.icon} alt={card.title} className="w-6 h-6" />
                  </div>
                  <h3 className="text-white text-lg font-semibold leading-snug">{card.title}</h3>
                  <p className="text-white/55 text-sm mt-3 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== MISSION ===== */}
      <section className="py-20 md:py-28 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 md:px-20">
          <p className="text-sm text-[#CCFF00] uppercase tracking-wide font-semibold">Our Mission</p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-snug mt-6 max-w-[1000px]">
            <span className="text-white">
              ZeeFrames strives to be a leading UI UX design agency known for innovative
              solutions that deliver exceptional user experiences and drive business growth.
              We blend creativity and user-centered design to craft intuitive, standout p
            </span>
            <span className="text-white/35">
              roducts and partner with clients to achieve lasting impact.
            </span>
          </h2>

          <p className="text-xs text-white uppercase tracking-wide font-bold mt-16">
            Since 2020, What We Get...
          </p>

          <div className="grid sm:grid-cols-2 gap-x-16 gap-y-12 mt-10 max-w-[760px] ml-auto">
            {stats.map((s) => (
              <div key={s.label} className="flex items-end justify-end gap-3">
                <div className="text-right">
                  <div className="text-[#CCFF00] text-5xl md:text-6xl font-extrabold leading-none">
                    {s.value}
                  </div>
                  <div className="text-white/70 mt-2">{s.label}</div>
                </div>
                <img src={s.icon} alt={s.label} className="w-16 h-16 md:w-20 md:h-20 opacity-70" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CULTURE ===== */}
      <section className="py-20 md:py-24 bg-[#0D0D0D]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-20 text-center">
          <p className="text-sm text-[#CCFF00] uppercase tracking-wide font-semibold">Our Culture</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 max-w-[760px] mx-auto leading-tight">
            How Our Team Blends UI UX, Branding, And No-Code
          </h2>
          <p className="text-white/50 mt-4 max-w-[520px] mx-auto">
            We Believe In Clear Communication, Proactive Problem Solving, And Full
            Transparency..
          </p>
        </div>

        <div className="mt-12 flex gap-2 md:gap-3 overflow-x-auto px-2 md:px-6">
          {culturePhotos.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Team culture ${i + 1}`}
              className="h-[280px] md:h-[420px] w-auto object-cover grayscale shrink-0"
            />
          ))}
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="py-20 md:py-28 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 md:px-20">
          <p className="text-sm text-[#CCFF00] uppercase tracking-wide font-semibold">Our Value</p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-snug mt-6 max-w-[1000px]">
            <span className="text-white">
              Together, we make perfect partners. We offer worry-free partnerships and
              deliver your vision into reality with our top-tier creat
            </span>
            <span className="text-white/35">ivity. No fluff, just the good stuff.</span>
          </h2>

          <div className="mt-14 border-t border-white/10">
            {values.map((v) => (
              <div
                key={v.no}
                className="grid md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 border-b border-white/10 items-start"
              >
                <div className="md:col-span-1 text-white/50 text-sm pt-1">{v.no}</div>
                <h3 className="md:col-span-5 text-white text-2xl md:text-3xl font-light">
                  {v.title}
                </h3>
                <p className="md:col-span-6 text-white/55 leading-relaxed max-w-[420px]">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className="py-20 md:py-28 bg-[#0D0D0D]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-20">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white max-w-[760px] mx-auto leading-tight">
              Principles that guide our design decisions
            </h2>
            <p className="text-white/50 mt-4">Rest assured. Your project is in good hands.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mt-14">
            {team.map((m) => (
              <div key={m.name} className="group">
                <div className="overflow-hidden rounded-2xl bg-white/5">
                  <img
                    src={m.img}
                    alt={m.name}
                    className="w-full aspect-[4/5] object-cover grayscale group-hover:grayscale-0 transition duration-500"
                  />
                </div>
                <h3 className="text-white font-semibold mt-4">{m.name}</h3>
                <p className="text-white/50 text-sm">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section className="py-20 md:py-28 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 md:px-20">
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div
                key={r.logo}
                className="bg-[#141414] border border-white/10 rounded-2xl p-8 flex flex-col items-center gap-5"
              >
                <img src={r.logo} alt="review platform" className="h-8 w-auto" />
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <img key={i} src={r.star} alt="star" className="w-5 h-5" />
                  ))}
                </div>
                <p className="text-white/60 text-sm">{r.count}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 mt-16">
            <div className="text-center">
              <div className="text-[#CCFF00] text-5xl md:text-6xl font-extrabold">224</div>
              <p className="text-white/60 mt-2">Reviews across 3 platforms</p>
            </div>
            <div className="text-center">
              <div className="text-[#CCFF00] text-5xl md:text-6xl font-extrabold">4.9</div>
              <p className="text-white/60 mt-2">Average Rating</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
