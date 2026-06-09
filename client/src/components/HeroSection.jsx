import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="hero-section relative pt-32 pb-20 overflow-hidden bg-black">
      {/* Background glow image (saved at client/public/hero-bg.png) */}
      <div
        className="absolute inset-0 z-0 opacity-40 bg-no-repeat bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      />

      <div className="container relative z-10 max-w-[1400px] mx-auto px-6 md:px-20">
        <div className="content-wraper flex items-center justify-center min-h-[calc(100vh-370px)]">
          <div className="content mx-auto max-w-[978px] relative">
            {/* Star */}
            <div className="star-wrapper absolute -top-12 left-0">
              <img
                width="73"
                height="80"
                src="https://zeeframes.com/frontend-assets/images/svgs/hero-star.svg"
                alt="star"
                className="w-12 md:w-[73px]"
              />
            </div>

            {/* Bubble Desktop (saved at client/public/hero-bubble.png) */}
            <div
              className="bubble-img hidden md:block absolute -top-24 right-0 w-[435px] h-[429px] bg-no-repeat bg-contain bg-center opacity-90 pointer-events-none"
              style={{ backgroundImage: "url('/hero-bubble.png')" }}
            />

            {/* Trusted Badge */}
            <div className="trusted-craft flex flex-wrap items-center justify-center gap-3 bg-black/80 backdrop-blur-sm border border-white/10 rounded-lg p-2 mx-auto w-fit relative">
              <div className="flex items-center gap-3">
                <div className="power-icon w-7 h-7 rounded-lg bg-[#CCFF00] flex items-center justify-center">
                  <img width="20" height="20" src="https://zeeframes.com/frontend-assets/images/svgs/sheild.svg" alt="shield" />
                </div>
                <p className="text-white text-sm font-inter">
                  Trusted by startups to craft $100M+ designs with
                </p>
              </div>
              <div className="flex icon-box-wraper">
                <div className="icon-box w-8 h-8 rounded-full bg-[#303030] border border-[#0D0D0C] flex items-center justify-center">
                  <img width="12" height="16" src="https://zeeframes.com/frontend-assets/images/svgs/figma.svg" alt="figma" />
                </div>
                <div className="icon-box w-8 h-8 rounded-full bg-[#303030] border border-[#0D0D0C] flex items-center justify-center">
                  <img width="16" height="16" src="https://zeeframes.com/frontend-assets/images/svgs/sketch.svg" alt="sketch" />
                </div>
                <div className="icon-box w-8 h-8 rounded-full bg-[#303030] border border-[#0D0D0C] flex items-center justify-center">
                  <img width="18" height="16" src="https://zeeframes.com/frontend-assets/images/svgs/adobe-xd.svg" alt="adobe-xd" />
                </div>
                <div className="icon-box w-8 h-8 rounded-full bg-[#303030] border border-[#0D0D0C] flex items-center justify-center">
                  <img width="12" height="16" src="https://zeeframes.com/frontend-assets/images/svgs/framer.svg" alt="framer" />
                </div>
                <div className="icon-box w-8 h-8 rounded-full bg-[#303030] border border-[#0D0D0C] flex items-center justify-center">
                  <img width="16" height="10" src="https://zeeframes.com/frontend-assets/images/svgs/framer2.svg" alt="framer2" />
                </div>
                <div className="icon-box w-8 h-8 rounded-full bg-[#303030] border border-[#0D0D0C] flex items-center justify-center">
                  <img width="16" height="16" src="https://zeeframes.com/frontend-assets/images/svgs/b.svg" alt="b" />
                </div>
              </div>
            </div>

            {/* Main Heading */}
            <div className="relative w-fit mx-auto mt-12 md:mt-24">
              <h1 className="main-heading text-white text-center text-4xl md:text-7xl font-bold uppercase leading-tight">
                CREATIVE INTELLIGENCE
                <br />
                IN EVERY PIXEL
              </h1>
              <sup className="no-code absolute -right-8 -top-4 bg-[#CCFF00] text-black text-xs font-bold px-2 py-1 rounded rotate-12 hidden md:inline-block">
                No Code
              </sup>
            </div>

            {/* Subheading */}
            <p className="text-white text-center text-base md:text-xl font-inter mt-4 md:mt-12">
              We craft <span className="text-[#CCFF00]">stunning</span> designs for
              businesses worldwide.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 md:gap-5 justify-center mt-8 md:mt-12">
              <Link
                to="/contact"
                className="btn-component bg-[#CCFF00] hover:bg-yellow-300 text-black font-semibold px-6 md:px-8 py-3 rounded-full transition text-sm md:text-base"
              >
                Schedule Call 🤙
              </Link>
              <Link
                to="/work"
                className="btn-component border border-white/20 hover:border-white/50 text-white font-semibold px-6 md:px-8 py-3 rounded-full transition text-sm md:text-base group"
              >
                © 2025 Work
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted Partners Section */}
      <div className="trusted-partners-wraper overflow-hidden mt-16 md:mt-24">
        <div className="container overflow-hidden max-w-[1400px] mx-auto px-6 md:px-20">
          <p className="text-center text-gray-400 text-sm uppercase font-inter mb-6">
            Trusted by Industry Leaders & Fast-Growing Startups
          </p>
          <div className="main-animate">
            <div className="slider relative w-full overflow-hidden">
              <div className="slide-track flex animate-marquee whitespace-nowrap gap-8 md:gap-12">
                {/* Logo set 1 */}
                <div className="slide flex items-center shrink-0">
                  <img width="138" height="32" src="https://zeeframes.com/frontend-assets/images/svgs/trafilea.svg" alt="trafilea" />
                </div>
                <div className="slide flex items-center shrink-0">
                  <img width="152" height="32" src="https://zeeframes.com/frontend-assets/images/svgs/yallaMotor.svg" alt="yallaMotor" />
                </div>
                <div className="slide flex items-center shrink-0">
                  <img width="198" height="32" src="https://zeeframes.com/frontend-assets/images/svgs/repurpose.svg" alt="repurpose" />
                </div>
                <div className="slide flex items-center shrink-0">
                  <img width="56" height="40" src="https://zeeframes.com/frontend-assets/images/svgs/adiqat.svg" alt="adiqat" />
                </div>
                {/* Duplicate for seamless loop */}
                <div className="slide flex items-center shrink-0">
                  <img width="138" height="32" src="https://zeeframes.com/frontend-assets/images/svgs/trafilea.svg" alt="trafilea" />
                </div>
                <div className="slide flex items-center shrink-0">
                  <img width="152" height="32" src="https://zeeframes.com/frontend-assets/images/svgs/yallaMotor.svg" alt="yallaMotor" />
                </div>
                <div className="slide flex items-center shrink-0">
                  <img width="198" height="32" src="https://zeeframes.com/frontend-assets/images/svgs/repurpose.svg" alt="repurpose" />
                </div>
                <div className="slide flex items-center shrink-0">
                  <img width="56" height="40" src="https://zeeframes.com/frontend-assets/images/svgs/adiqat.svg" alt="adiqat" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}