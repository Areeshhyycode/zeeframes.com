import { Link } from "react-router-dom";

const steps = [
  {
    no: "01",
    title: "Discovery",
    sub: "Research & Domain Analysis",
    desc: "Don't ignore the crucial step of Research & Development in the UX Design Process! Discover and solve user problems to launch a successful product. Gather data on the target audience and analyze customer feedback to improve user experience.",
  },
  {
    no: "02",
    title: "Flows",
    sub: "User Journey Map & Sitemap",
    desc: "Create successful user flows for your product by mapping user journeys and interactions. Define product ideas and goals, tailored to user needs, behavior, and expectations. Test with real users for optimization.",
  },
  {
    no: "03",
    title: "Wireframes",
    sub: "Low-Fidelity Design",
    desc: "Define the content and functionality of your product with wireframes. Brainstorm multiple ideas, get feedback, and refine for high fidelity wireframes. Enhance the user interface for a natural and intuitive look.",
  },
  {
    no: "04",
    title: "Mockups",
    sub: "High-Fidelity Design",
    desc: "Visualize your product's appearance with mockups. Detailed design for every screen gets reviewed by stakeholders and the design team. Get it tested with users for improved design based on their needs.",
  },
  {
    no: "05",
    title: "Prototyping",
    sub: "Interaction Design",
    desc: "UX Designers create clickable prototypes for your product to assess functionality. Gather user feedback and collaborate with the development team to create an improved version of the design for implementation.",
  },
  {
    no: "06",
    title: "Testing",
    sub: "Usability Testing",
    desc: "UX designers focus on improving product usability by testing with real users. Define the testing goals and scenarios and recruit a target audience. Conduct usability tests, analyze results, and make changes.",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="max-w-[1400px] mx-auto px-6 md:px-20">
        {/* CTA Box */}
        <div className="border border-white/10 rounded-2xl py-12 px-6 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-white">Your project here</h3>
          <p className="text-gray-400 mt-3 max-w-md mx-auto">
            The proof is in our work. Check out{" "}
            <span className="text-[#CCFF00] underline">our case studies</span> to learn how
            our product development services can transform your business.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#CCFF00] hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-full mt-6 transition"
          >
            Book a discovery call
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M14.58 5.42L5 15" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6.67 5H15v8.33" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Process Heading */}
        <div className="text-center mt-20 md:mt-28">
          <p className="text-sm text-[#CCFF00] uppercase tracking-wide">
            Our Process, Your Advantage
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">
            From Idea To Execution
          </h2>
          <p className="text-sm text-gray-400 mt-4 max-w-xl mx-auto">
            We have become experts in creating top-notch digital products. We design
            beautifully and develop excellently. And we care deeply about what we do.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 md:mt-16">
          {steps.map((s) => (
            <div
              key={s.no}
              className="border-l-2 border-white/10 hover:border-[#CCFF00] pl-6 py-4 transition"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-[#CCFF00] text-2xl font-bold">{s.no}</span>
                <h3 className="text-xl font-bold text-white">{s.title}</h3>
              </div>
              <p className="text-gray-300 mt-1">{s.sub}</p>
              <p className="text-sm text-gray-500 mt-3 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
