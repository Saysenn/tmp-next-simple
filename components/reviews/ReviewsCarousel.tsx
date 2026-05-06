"use client";

import { useRef } from "react";
import { Swiper as SwiperClass } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "@/lib/infra/swiper";

// ─── Config ───────────────────────────────────────────────────────────────────
const c = {
  bg:        "var(--bg-base)",
  cardBg:    "var(--bg-soft)",
  border:    "var(--border)",
  accent:    "var(--accent)",
  heading:   "var(--text-heading)",
  body:      "var(--text-body)",
  muted:     "var(--text-muted)",
  starColor: "var(--accent)",
};

const reviewsData = [
  { name: "Sarah Mitchell",  role: "Head of People, Meridian Group",           body: "Acqua filled a critical senior vacancy within two weeks. The quality of candidates was exceptional and the process was effortless." },
  { name: "James Holloway",  role: "Operations Director, Crestfield Solutions", body: "We have used Acqua for both permanent placements and temporary cover. Every time they deliver exactly what we need." },
  { name: "Priya Sharma",    role: "Finance Manager, Vantage Consulting",       body: "The payroll support has been outstanding. Accurate, timely, and they handle HMRC queries before we even know there is one." },
  { name: "Thomas Reid",     role: "MD, Northgate Property Group",              body: "Professional, responsive, and genuinely invested in finding the right people. Three senior hires — all still with us two years on." },
  { name: "Leanne Porter",   role: "HR Director, Solaris Networks",             body: "Switching our payroll to Acqua was the best administrative decision we made this year. Everything just runs, with zero stress." },
  { name: "David Okafor",    role: "CEO, Bluewave Technologies",                body: "Fast, honest, and thorough. Acqua matched us with a candidate we had been searching for independently for months." },
  { name: "Rachel Dunn",     role: "People Partner, Halcyon Healthcare",        body: "The team truly listened to what we needed. Their candidate shortlists are tight, well-prepared, and always on brief." },
  { name: "Marcus Webb",     role: "General Manager, Fairview Logistics",       body: "We needed temporary staff at short notice. Acqua had vetted candidates to us within 24 hours. Exactly the kind of partner you want." },
];

function initials(name: string) {
  return name.split(" ").map(n => n[0]).slice(0, 2).join("");
}

export default function ReviewsCarousel() {
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <section style={{ background: c.bg }} className="py-20 lg:py-28">
      <style>{`
        .rc-swiper .swiper-pagination-bullet { background: ${c.accent}; opacity: 0.3; width: 6px; height: 6px; }
        .rc-swiper .swiper-pagination-bullet-active { opacity: 1; width: 24px; border-radius: 3px; }
      `}</style>

      <div className="section-inner">
        {/* Header */}
        <div className="text-center mb-14" data-animate="fade-up">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill={c.starColor}>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: c.accent, fontWeight: 600 }}>
              5.0 · Client Reviews
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: c.heading }}>
            What Our Clients Say
          </h2>
        </div>

        {/* Carousel */}
        <Swiper
          className="rc-swiper"
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, el: ".rc-dots" }}
          loop
          centeredSlides
          slidesPerView={1}
          breakpoints={{ 768: { slidesPerView: 1.4, spaceBetween: 24 }, 1024: { slidesPerView: 1.6, spaceBetween: 32 } }}
          onSwiper={(s) => { swiperRef.current = s; }}
        >
          {reviewsData.map((r, i) => (
            <SwiperSlide key={i} style={{ height: "auto" }}>
              {({ isActive }) => (
                <div
                  style={{
                    backgroundColor: c.cardBg,
                    border: `1px solid ${c.border}`,
                    borderRadius: 20,
                    padding: "40px 44px",
                    transition: "opacity 0.4s, transform 0.4s",
                    opacity: isActive ? 1 : 0.45,
                    transform: isActive ? "scale(1)" : "scale(0.94)",
                    height: "100%",
                  }}
                >
                  {/* Large quote mark */}
                  <div style={{ fontSize: "4rem", lineHeight: 1, color: c.accent, opacity: 0.25, marginBottom: 12, fontFamily: "Georgia, serif" }}>
                    &ldquo;
                  </div>
                  <p style={{ fontSize: "1rem", color: c.body, lineHeight: 1.75, marginBottom: 32 }}>
                    {r.body}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    {/* Initials avatar */}
                    <div style={{
                      width: 44, height: 44, borderRadius: "50%",
                      backgroundColor: c.accent, color: "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.8rem", fontWeight: 700, flexShrink: 0,
                    }}>
                      {initials(r.name)}
                    </div>
                    <div>
                      <p style={{ fontSize: "0.875rem", fontWeight: 700, color: c.heading, marginBottom: 2 }}>{r.name}</p>
                      <p style={{ fontSize: "0.75rem", color: c.muted }}>{r.role}</p>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination dots */}
        <div className="rc-dots" style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 32 }} />

        {/* Prev / Next */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 16 }}>
          {[{ label: "←", fn: () => swiperRef.current?.slidePrev() }, { label: "→", fn: () => swiperRef.current?.slideNext() }].map(({ label, fn }) => (
            <button
              key={label}
              onClick={fn}
              style={{
                width: 40, height: 40, borderRadius: "50%",
                border: `1px solid ${c.border}`,
                background: "transparent",
                color: c.heading, fontSize: "1rem", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
