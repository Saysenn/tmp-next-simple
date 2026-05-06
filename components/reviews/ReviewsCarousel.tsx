"use client";

import { useRef } from "react";
import { Swiper as SwiperClass } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "@/lib/infra/swiper";

// ─── Config ───────────────────────────────────────────────────────────────────
const c = {
  bg:      "var(--bg-base)",
  cardBg:  "var(--bg-soft)",
  accent:  "var(--accent)",
  heading: "var(--text-heading)",
  body:    "var(--text-body)",
  muted:   "var(--text-muted)",
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
        .rc-swiper .swiper-pagination-bullet {
          background: ${c.accent}; opacity: 0.35;
          width: 8px; height: 8px; border-radius: 50%;
        }
        .rc-swiper .swiper-pagination-bullet-active {
          opacity: 1; width: 8px;
        }
      `}</style>

      <div className="section-inner">
        {/* Header */}
        <div className="mb-14" data-animate="fade-up">
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: c.accent, fontWeight: 600, marginBottom: 10 }}>
            Client Reviews
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: c.heading }}>
            Our Testimonials
          </h2>
          <div style={{ width: 48, height: 2, backgroundColor: c.accent, marginTop: 16 }} />
        </div>

        {/* Carousel */}
        <Swiper
          className="rc-swiper"
          style={{ paddingBottom: "16px", overflow: "visible" }}
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, el: ".rc-dots" }}
          loop
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 2, spaceBetween: 28 } }}
          onSwiper={(s) => { swiperRef.current = s; }}
        >
          {reviewsData.map((r, i) => (
            <SwiperSlide key={i} style={{ height: "auto" }}>
              <div style={{
                backgroundColor: c.cardBg,
                borderRadius: 0,
                overflow: "hidden",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: "4px 14px 0px rgba(0,0,0,0.4)",
              }}>
                {/* Card body */}
                <div style={{ padding: "32px 32px 24px", flex: 1 }}>
                  {/* Large accent quote mark */}
                  <div style={{
                    fontSize: "3.5rem",
                    lineHeight: 1,
                    color: c.accent,
                    fontFamily: "Georgia, serif",
                    marginBottom: 20,
                    display: "block",
                  }}>
                    &ldquo;
                  </div>
                  <p style={{ fontSize: "0.9rem", color: c.body, lineHeight: 1.8, fontStyle: "italic" }}>
                    {r.body}
                  </p>
                </div>

                {/* Accent footer bar */}
                <div style={{
                  backgroundColor: c.accent,
                  padding: "16px 32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  position: "relative",
                }}>
                  <div>
                    <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#fff", marginBottom: 3, letterSpacing: "0.03em" }}>
                      {r.name}
                    </p>
                    <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.75)", fontStyle: "italic" }}>
                      {r.role}
                    </p>
                  </div>
                  {/* Circular monogram */}
                  <div style={{
                    width: 52, height: 52,
                    borderRadius: "50%",
                    border: "3px solid rgba(255,255,255,0.3)",
                    backgroundColor: "rgba(0,0,0,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.78rem", fontWeight: 700, color: "#fff",
                    flexShrink: 0,
                    letterSpacing: "0.05em",
                  }}>
                    {initials(r.name)}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination dots */}
        <div className="rc-dots" style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 28 }} />
      </div>
    </section>
  );
}
