import { Link } from "react-router-dom";

const servicesList = [
  { tag: "For Digital Experiences", title: "UI UX Design", path: "/services/ui-ux-design" },
  { tag: "For Startups & Existing Companies", title: "Product Revamp", path: "/services/product-revamp" },
  { tag: "For Visual Storytellers", title: "Brand Design", path: "/services/brand-design" },
  { tag: "For Rapid App Builders", title: "No Code Development", path: "/services/no-code-development" },
  { tag: "For Startups & Founders", title: "MVP Design", path: "/services/mvp-design" },
  { tag: "Dedicated UX UI Team", title: "Team Extension", path: "/services/team-extension" },
];

export default function ServicesSection() {
  return (
    <section className="py-20 md:py-24 relative bg-[#0D0D0D]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-20">
        {/* Heading */}
        <div className="text-center">
          <p className="text-sm text-[#CCFF00] uppercase tracking-wide">We are great at</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">
            UI UX Design and Product Experience Services
          </h2>
          <p className="text-sm text-gray-400 mt-3">
            Designs with Exceptional User Experiences
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-x-12 mt-12 md:mt-16">
          {servicesList.map((s) => (
            <Link
              key={s.path}
              to={s.path}
              className="group relative py-8 border-b border-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm md:text-base text-white/90 uppercase">{s.tag}</p>
                  <h3 className="text-2xl md:text-3xl text-white mt-1">{s.title}</h3>
                </div>
                <div className="shrink-0 w-12 h-12 rounded-full bg-white/5 group-hover:bg-[#CCFF00] flex items-center justify-center transition">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path className="group-hover:[stroke:#000]" d="M14.58 5.42L5 15" stroke="#9D9D9D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path className="group-hover:[stroke:#000]" d="M6.67 5H15v8.33" stroke="#9D9D9D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
