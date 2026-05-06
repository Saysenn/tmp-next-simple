"use client";

// ─── Config ───────────────────────────────────────────────────────────────────
const c = {
  bg:        "var(--bg-soft)",
  cardBg:    "var(--bg-base)",
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

function Card({ r }: { r: typeof reviewsData[0] }) {
  return (
    <div
      style={{
        flex: "0 0 300px",
        backgroundColor: c.cardBg,
        border: `1px solid ${c.border}`,
        borderRadius: 14,
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div style={{ display: "flex", gap: 2 }}>
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="11" height="11" viewBox="0 0 20 20" fill={c.starColor}>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p style={{ fontSize: "0.8rem", color: c.body, lineHeight: 1.7, flex: 1 }}>
        &ldquo;{r.body}&rdquo;
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          backgroundColor: c.accent, color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.65rem", fontWeight: 700, flexShrink: 0,
        }}>
          {initials(r.name)}
        </div>
        <div>
          <p style={{ fontSize: "0.78rem", fontWeight: 700, color: c.heading, marginBottom: 1 }}>{r.name}</p>
          <p style={{ fontSize: "0.65rem", color: c.muted }}>{r.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsHorizontal() {
  const doubled = [...reviewsData, ...reviewsData];
  // Split into 2 rows — row 2 is reversed offset for visual rhythm
  const row1 = doubled;
  const row2 = [...reviewsData.slice(4), ...reviewsData.slice(0, 4), ...reviewsData.slice(4), ...reviewsData.slice(0, 4)];

  return (
    <section style={{ background: c.bg, overflow: "hidden" }} className="py-20 lg:py-28">
      <style>{`
        @keyframes scroll-left        { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes scroll-left-slow   { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .rh-row1 { animation: scroll-left      32s linear infinite; }
        .rh-row2 { animation: scroll-left-slow 48s linear infinite; }
        .rh-track:hover .rh-row1,
        .rh-track:hover .rh-row2 { animation-play-state: paused; }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }} className="mb-12" data-animate="fade-up">
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
          {[...Array(5)].map((_, i) => (
            <svg key={i} width="13" height="13" viewBox="0 0 20 20" fill={c.starColor}>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: c.accent, fontWeight: 600, marginLeft: 4 }}>
            5.0 · Client Reviews
          </span>
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: c.heading }}>
          What Our Clients Say
        </h2>
      </div>

      {/* Marquee tracks */}
      <div className="rh-track" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Row 1 — scrolls left */}
        <div style={{ overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: `linear-gradient(to right, ${c.bg}, transparent)`, zIndex: 2, pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: `linear-gradient(to left, ${c.bg}, transparent)`, zIndex: 2, pointerEvents: "none" }} />
          <div className="rh-row1" style={{ display: "flex", gap: 14, width: "max-content" }}>
            {row1.map((r, i) => <Card key={i} r={r} />)}
          </div>
        </div>

        {/* Row 2 — scrolls left slower */}
        <div style={{ overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: `linear-gradient(to right, ${c.bg}, transparent)`, zIndex: 2, pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: `linear-gradient(to left, ${c.bg}, transparent)`, zIndex: 2, pointerEvents: "none" }} />
          <div className="rh-row2" style={{ display: "flex", gap: 14, width: "max-content" }}>
            {row2.map((r, i) => <Card key={i} r={r} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
