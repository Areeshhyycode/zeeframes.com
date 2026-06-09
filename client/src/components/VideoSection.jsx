import { Link } from "react-router-dom";

export default function VideoSection() {
  return (
    <section className="relative overflow-hidden bg-black">
      <video
        className="object-cover w-full h-auto"
        width="1440"
        height="766"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source
          src="https://zeeframes.com/frontend-assets/media/zeeframes-process.mp4"
          type="video/mp4"
        />
      </video>

      <Link
        to="/work"
        className="absolute top-1/2 right-6 md:right-24 -translate-y-1/2 bg-white text-black font-semibold px-6 py-3.5 rounded-full flex items-center gap-2 hover:scale-105 transition"
      >
        All Works
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M14.58 5.42L5 15" stroke="#0D0D0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6.67 5H15v8.33" stroke="#0D0D0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </section>
  );
}
