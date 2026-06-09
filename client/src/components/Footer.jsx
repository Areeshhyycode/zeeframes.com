import { Link } from "react-router-dom";

const company = ["Home", "About", "Work", "Contact", "Insights", "Terms & Conditions", "Privacy Policy"];
const servicesCol = [
  "UI UX Consultation",
  "UI UX Design",
  "Web Design",
  "MVP Design",
  "Product Revamp",
  "Brand Design",
  "NoCode Development",
  "Webflow Development",
  "Framer Development",
  "Figma Design",
];
const industries = ["AI/ML", "SaaS", "Web3", "Travel", "Fintech", "EdTech", "Logistics", "Real Estate", "Healthcare", "E-commerce"];
const socials = ["Dribbble", "LinkedIn", "Instagram", "Facebook", "Twitter/X"];

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] border-t border-white/10 pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-6 md:px-20">
        {/* Top CTA */}
        <div className="text-center pb-14 border-b border-white/10">
          <h2 className="text-3xl md:text-5xl font-bold text-white max-w-2xl mx-auto">
            Let's Build Something You'll Be Proud Of
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#CCFF00] hover:bg-yellow-300 text-black font-semibold px-7 py-3.5 rounded-full mt-8 transition"
          >
            Schedule Call 🤙
          </Link>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-14">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <span className="bg-[#CCFF00] text-black font-extrabold text-lg w-8 h-8 flex items-center justify-center rounded">
                Z
              </span>
              <span className="text-white font-bold text-xl">ZeeFrames</span>
            </Link>
            <p className="text-gray-500 text-sm mt-4">
              We craft stunning designs for businesses worldwide.
            </p>
            <a href="mailto:sales@zeeframes.com" className="text-[#CCFF00] text-sm mt-4 inline-block">
              sales@zeeframes.com
            </a>
          </div>

          <FooterCol title="Company" items={company} />
          <FooterCol title="Services" items={servicesCol} />
          <FooterCol title="Industries" items={industries} />
          <FooterCol title="Social" items={socials} />
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © ZeeFrames (Private) Limited. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }) {
  return (
    <div>
      <h4 className="text-white font-semibold mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item}>
            <span className="text-gray-500 hover:text-white text-sm cursor-pointer transition">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
