"use client";

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

function Card({ r }: { r: typeof reviewsData[0] }) {
  return (
    <div style={{ backgroundColor: c.cardBg, border: `1px solid ${c.border}`, borderRadius: 0, padding: "20px" }}>
      <p style={{ fontSize: "0.75rem", color: c.body, lineHeight: 1.65, marginBottom: "0.75rem" }}>
        &ldquo;{r.body}&rdquo;
      </p>
      <p style={{ fontSize: "0.85rem", color: c.heading, fontWeight: 600, marginBottom: 2 }}>{r.name}</p>
      <p style={{ fontSize: "0.65rem", color: c.muted }}>{r.role}</p>
    </div>
  );
}

export default function ReviewsMirrorDiagonal() {
  return (
    <section style={{ background: c.bg, overflow: "hidden", position: "relative", minHeight: 480 }}>
      <style>{`
        @keyframes marquee-down      { from { transform: translateY(-50%); } to { transform: translateY(0); } }
        @keyframes marquee-down-slow { from { transform: translateY(-50%); } to { transform: translateY(0); } }
        .rmd-col1 { animation: marquee-down      30s linear infinite; }
        .rmd-col2 { animation: marquee-down-slow 42s linear infinite; }

        /* Mobile: columns become blurred background */
        @media (max-width: 1023px) {
          .rmd-columns {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            opacity: 0.22 !important;
            pointer-events: none !important;
            filter: none !important;
          }
          .rmd-content {
            position: relative;
            z-index: 10;
            justify-content: flex-start !important;
          }
        }
      `}</style>

      {/* Diagonal columns — LEFT side (mirrored from ReviewsMarquee) */}
      <div
        className="rmd-columns"
        style={{ position: "absolute", top: "-20%", left: "-2%", width: "62%", height: "140%", overflow: "hidden", pointerEvents: "none" }}
      >
        {/* Fade edges */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 140, background: `linear-gradient(to bottom, ${c.bg}, transparent)`, zIndex: 5 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 140, background: `linear-gradient(to top, ${c.bg}, transparent)`, zIndex: 5 }} />
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 160, background: `linear-gradient(to left, ${c.bg}, transparent)`, zIndex: 5 }} />

        {/* Reverse diagonal: +16deg, columns scroll DOWN */}
        <div style={{ display: "flex", gap: 14, transform: "rotate(16deg) translateX(35%)", transformOrigin: "top center", height: "100%" }}>
          <div style={{ flex: "0 0 260px" }}>
            <div className="rmd-col1" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[...reviewsData, ...reviewsData].map((r, i) => <Card key={i} r={r} />)}
            </div>
          </div>
          <div style={{ flex: "0 0 260px", marginTop: 80 }}>
            <div className="rmd-col2" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[...reviewsData, ...reviewsData].map((r, i) => <Card key={i} r={r} />)}
            </div>
          </div>
        </div>
      </div>

      {/* Editorial content — RIGHT side */}
      <div className="rmd-content section-inner py-20 lg:py-28 relative z-10 flex justify-end">
        <div style={{ maxWidth: 380 }} data-animate="fade-up">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <div style={{ display: "flex", gap: 2 }}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="12" height="12" viewBox="0 0 20 20" fill={c.starColor}>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: c.accent, fontWeight: 600 }}>
              5.0 · Client Reviews
            </span>
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: c.heading, fontWeight: 700, lineHeight: 1.15, marginBottom: 20 }}>
            Real Results.<br />Real People.
          </h2>
        </div>
      </div>
    </section>
  );
}
