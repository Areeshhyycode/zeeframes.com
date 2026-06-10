import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/* ----------------------------- Icons ----------------------------- */
const Icon = ({ path }) => (
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
    {path}
  </svg>
);

const icons = {
  bolt: <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />,
  flow: (
    <>
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="15" y="15" width="6" height="6" rx="1" />
      <path d="M9 6h6a3 3 0 0 1 3 3v6" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M16 6a3 3 0 0 1 0 6" />
      <path d="M18 14a6 6 0 0 1 3 6" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
    </>
  ),
  chat: <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" />,
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  bulb: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-4 10.5c.5.5 1 1.5 1 2.5h6c0-1 .5-2 1-2.5A6 6 0 0 0 12 3z" />
    </>
  ),
  plug: (
    <>
      <path d="M9 2v6M15 2v6" />
      <path d="M7 8h10v3a5 5 0 0 1-10 0V8z" />
      <path d="M12 16v6" />
    </>
  ),
  code: <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" />,
  rocket: (
    <>
      <path d="M5 15c-1 1-1 4-1 4s3 0 4-1l9-9a3 3 0 0 0-3-3z" />
      <path d="M15 6l3 3" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </>
  ),
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z" />
  ),
  node: (
    <>
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <path d="M6 8v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8M12 14v2" />
    </>
  ),
};

/* --------------------------- Services data --------------------------- */
const categories = [
  {
    id: "automation",
    label: "AI Automation",
    icon: icons.bolt,
    services: [
      { name: "Workflow Automation", icon: icons.flow, desc: "Automate repetitive tasks and connect your tools into seamless workflows.", path: "/services/workflow-automation" },
      { name: "CRM Automation", icon: icons.users, desc: "Streamline your sales pipeline and customer data with smart automations.", path: "/services/crm-automation" },
      { name: "Business Process Automation", icon: icons.gear, desc: "Optimize operations end-to-end and remove manual bottlenecks.", path: "/services/business-process-automation" },
      { name: "Lead Generation Automation", icon: icons.target, desc: "Capture, qualify, and nurture leads automatically around the clock.", path: "/services/lead-generation-automation" },
      { name: "n8n Automation", icon: icons.node, desc: "Build powerful custom automations with self-hosted n8n workflows.", path: "/services/n8n-automation" },
    ],
  },
  {
    id: "agents",
    label: "AI Agents & Support",
    icon: icons.chat,
    services: [
      { name: "AI Agent Development", icon: icons.bolt, desc: "Custom AI agents that reason, act, and get real work done for you.", path: "/services/ai-agent-development" },
      { name: "AI Customer Support Automation", icon: icons.chat, desc: "Resolve customer queries instantly with always-on AI support.", path: "/services/ai-customer-support" },
      { name: "AI Voice Agents", icon: icons.mic, desc: "Natural-sounding voice agents that handle calls and conversations.", path: "/services/ai-voice-agents" },
      { name: "AI Receptionist", icon: icons.phone, desc: "Greet, book, and route callers 24/7 with a smart AI receptionist.", path: "/services/ai-receptionist" },
    ],
  },
  {
    id: "development",
    label: "Development & Strategy",
    icon: icons.code,
    services: [
      { name: "Custom AI Software Development", icon: icons.rocket, desc: "Tailored AI-powered software built around your business needs.", path: "/services/custom-ai-software" },
      { name: "API Integration & Tool Automation", icon: icons.plug, desc: "Connect any app or service with reliable API integrations.", path: "/services/api-integration" },
      { name: "AI Consulting & Strategy", icon: icons.bulb, desc: "Map out the right AI roadmap with expert guidance and strategy.", path: "/services/ai-consulting" },
      { name: "GoHighLevel (GHL)", icon: icons.gear, desc: "Set up and automate your GHL CRM, funnels, and campaigns.", path: "/services/gohighlevel" },
    ],
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeCat, setActiveCat] = useState(categories[0].id);
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();

  const active = categories.find((c) => c.id === activeCat) || categories[0];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4 px-6 md:px-10 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="bg-[#CCFF00] text-black font-extrabold text-lg w-8 h-8 flex items-center justify-center rounded">
            Z
          </span>
          <span className="text-white font-bold text-xl">ZeeFrames</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-[#CCFF00] hover:text-[#CCFF00] transition">
            Home
          </Link>
          <Link to="/about" className="text-white/80 hover:text-white transition">
            About
          </Link>

          {/* Services Dropdown (mega menu) */}
          <div
            className="static md:relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button className="flex items-center gap-1 text-white/80 hover:text-white transition">
              Services
              <svg
                width="14"
                height="14"
                viewBox="0 0 20 20"
                fill="none"
                className={`transition-transform ${open ? "rotate-180" : ""}`}
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {open && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[min(1100px,calc(100vw-2rem))]">
                <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-5 shadow-2xl grid grid-cols-[260px_1fr] gap-5">
                  {/* Left: categories */}
                  <div className="flex flex-col gap-1.5 border-r border-white/10 pr-4">
                    {categories.map((cat) => {
                      const isActive = cat.id === activeCat;
                      return (
                        <button
                          key={cat.id}
                          onMouseEnter={() => setActiveCat(cat.id)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition ${
                            isActive
                              ? "bg-[#CCFF00]/10 text-[#CCFF00] ring-1 ring-[#CCFF00]/30"
                              : "text-white/70 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          <span className={isActive ? "text-[#CCFF00]" : "text-white/60"}>
                            <Icon path={cat.icon} />
                          </span>
                          <span className="font-medium text-sm">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Right: service cards */}
                  <div className="grid grid-cols-2 gap-3">
                    {active.services.map((s) => (
                      <Link
                        key={s.path}
                        to={s.path}
                        className="group flex gap-3 p-4 rounded-xl bg-white/2 hover:bg-white/5 border border-transparent hover:border-[#CCFF00]/30 transition"
                      >
                        <span className="text-white/60 group-hover:text-[#CCFF00] transition shrink-0 mt-0.5">
                          <Icon path={s.icon} />
                        </span>
                        <span>
                          <span className="block text-white font-semibold text-sm group-hover:text-[#CCFF00] transition">
                            {s.name}
                          </span>
                          <span className="block text-white/50 text-xs leading-relaxed mt-1">
                            {s.desc}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link to="/work" className="text-white/80 hover:text-white transition">
            Work
          </Link>
          <Link to="/insights" className="text-white/80 hover:text-white transition">
            Insights
          </Link>
          <Link to="/chat" className="text-white/80 hover:text-white transition">
            Chat
          </Link>
          {isAdmin && (
            <Link to="/admin" className="text-white/80 hover:text-white transition">
              Admin
            </Link>
          )}
        </div>

        {/* CTA + auth */}
        <div className="flex items-center gap-3 shrink-0">
          {isAuthenticated ? (
            <>
              <span className="hidden lg:inline text-white/60 text-sm">
                Hi, {user?.name?.split(" ")[0]}
              </span>
              <button
                onClick={handleLogout}
                className="text-white/80 hover:text-white text-sm border border-white/15 hover:border-white/40 rounded-full px-4 py-2 transition"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden sm:inline text-white/80 hover:text-white text-sm transition"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="text-white/80 hover:text-white text-sm border border-white/15 hover:border-white/40 rounded-full px-4 py-2 transition"
              >
                Sign up
              </Link>
            </>
          )}

          <Link
            to="/contact"
            className="hidden md:flex bg-[#CCFF00] hover:bg-yellow-300 text-black font-semibold px-5 py-2.5 rounded-full items-center gap-1 transition"
          >
            Work with us
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M14.58 5.42L5 15" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6.67 5H15v8.33" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}
