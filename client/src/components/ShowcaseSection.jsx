const projects = [
  {
    name: "Gig Desk",
    desc: "All-in-one dashboard to manage gigs, tours, venues, and payrolls.",
    bg: "linear-gradient(135deg, #d9d9d9 0%, #f0f0f0 100%)",
  },
  {
    name: "Ship Track",
    desc: "Real-time shipment tracking and delivery management at your fingertips",
    bg: "linear-gradient(135deg, #ff5b5b 0%, #ff8a8a 100%)",
  },
  {
    name: "Villa Vault",
    desc: "Discover and book the world's finest luxury villas with ease",
    bg: "linear-gradient(135deg, #c79a4b 0%, #e8c87f 100%)",
  },
  {
    name: "Bloom Money",
    desc: "Empowering communities with financial solutions.",
    bg: "linear-gradient(135deg, #c6f042 0%, #e3ff8a 100%)",
  },
];

export default function ShowcaseSection() {
  return (
    <section className="py-20 md:py-24 bg-black">
      <div className="max-w-[1400px] mx-auto px-6 md:px-20">
        {/* Heading */}
        <div className="text-center">
          <p className="text-sm text-[#CCFF00] uppercase tracking-wide">
            How we helped others succeed
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">
            Our Creative Showcase
          </h2>
          <p className="text-sm text-gray-400 mt-4 max-w-xl mx-auto">
            We have become experts in creating top-notch digital products. We design
            beautifully and develop excellently. And we care deeply about what we do.
          </p>
        </div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 gap-8 mt-12 md:mt-16">
          {projects.map((p) => (
            <div key={p.name} className="group cursor-pointer">
              <div
                className="rounded-2xl h-[360px] md:h-[420px] flex items-end p-8 overflow-hidden transition-transform group-hover:scale-[1.02]"
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
      </div>
    </section>
  );
}
