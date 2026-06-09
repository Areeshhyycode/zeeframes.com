import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const ASSET = "https://zeeframes.com/frontend-assets/images";

/* --------------------------- Insights data --------------------------- */
const insights = [
  {
    id: "ux-laws-2025",
    category: "UX Design",
    title: "10 UX Laws Every Designer Should Know in 2025",
    excerpt:
      "From Hick's Law to Fitts's Law, these timeless principles help you design interfaces that feel effortless and intuitive.",
    author: "Umar Islam",
    date: "Jun 02, 2025",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "design-systems",
    category: "UI Design",
    title: "Building a Scalable Design System from Scratch",
    excerpt:
      "A practical guide to tokens, components, and documentation that keeps your product consistent as your team grows.",
    author: "Nashra Maqsood",
    date: "May 24, 2025",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "color-psychology",
    category: "Branding",
    title: "The Psychology of Color in Product Design",
    excerpt:
      "Why the right palette can boost conversions and how to choose colors that match your brand's personality.",
    author: "Goher Ayub",
    date: "May 12, 2025",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1502691876148-a84978e59af8?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "micro-interactions",
    category: "UX Design",
    title: "Micro-interactions: The Tiny Details That Delight Users",
    excerpt:
      "Small animations and feedback loops that make your interface feel alive, responsive, and genuinely human.",
    author: "Mariam Hashmi",
    date: "Apr 30, 2025",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "ai-design-tools",
    category: "AI & Design",
    title: "How AI Is Reshaping the UI UX Workflow",
    excerpt:
      "From rapid prototyping to smart handoffs, here's how AI tools are changing the way modern design teams ship.",
    author: "Rao Abdullah",
    date: "Apr 18, 2025",
    readTime: "9 min read",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "accessibility",
    category: "UX Design",
    title: "Designing for Accessibility Without Sacrificing Beauty",
    excerpt:
      "Inclusive design isn't a constraint, it's an opportunity. Learn how to build interfaces everyone can use.",
    author: "Bilal Younas",
    date: "Apr 05, 2025",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
  },
];

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
    <path d="M14.58 5.42L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.67 5H15v8.33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Insights() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return insights;
    return insights.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.excerpt.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <main className="bg-black overflow-x-hidden">
      {/* ===== HERO ===== */}
      <section className="relative pt-36 md:pt-44 pb-16 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 md:px-20">
          <div className="relative max-w-[900px] mx-auto text-center">
            <img
              src={`${ASSET}/svgs/hero-star.svg`}
              alt="star"
              width="73"
              height="80"
              className="absolute -left-2 md:-left-10 top-24 w-10 md:w-[60px] hidden md:block"
            />
            <h1 className="text-white text-3xl sm:text-5xl md:text-7xl font-extrabold uppercase leading-[1.05]">
              Stay Updated With
              <br />
              Our Insights
            </h1>
            <p className="text-white/70 text-sm sm:text-base md:text-xl mt-4 sm:mt-6 px-2">
              Read Our Thoughts And Insights On{" "}
              <span className="text-[#CCFF00]">UI UX Design</span>
            </p>

            {/* Search */}
            <div className="mt-8 sm:mt-10 max-w-[560px] mx-auto">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full pl-4 sm:pl-6 pr-2 py-1.5 sm:py-2 focus-within:border-[#CCFF00]/50 transition">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search Any Insights"
                  className="flex-1 min-w-0 bg-transparent text-white placeholder-white/40 outline-none py-2 text-sm sm:text-base"
                />
                <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#CCFF00] flex items-center justify-center text-black shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                    <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INSIGHTS GRID ===== */}
      <section className="pb-24 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 md:px-20">
          {filtered.length === 0 ? (
            <p className="text-center text-white/50 py-20">
              No insights found for “{query}”. Try a different search.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post) => (
                <Link
                  key={post.id}
                  to={`/insights/${post.id}`}
                  className="group bg-[#0D0D0D] border border-white/10 rounded-2xl overflow-hidden hover:border-[#CCFF00]/40 transition flex flex-col"
                >
                  <div className="overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-xs font-semibold text-[#CCFF00] uppercase tracking-wide">
                      {post.category}
                    </span>
                    <h3 className="text-white text-lg font-semibold mt-3 leading-snug group-hover:text-[#CCFF00] transition">
                      {post.title}
                    </h3>
                    <p className="text-white/55 text-sm mt-3 leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                      <div className="text-xs text-white/50">
                        <span className="text-white/70">{post.author}</span>
                        <span className="mx-1.5">·</span>
                        {post.readTime}
                      </div>
                      <span className="text-white/60 group-hover:text-[#CCFF00] transition">
                        <ArrowIcon />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
