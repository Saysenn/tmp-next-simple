"use client";

// ─── Config ───────────────────────────────────────────────────────────────────
const c = {
  bg:          "var(--bg-soft)",
  cardBg:      "var(--bg-base)",
  cardAlt:     "var(--bg-subtle)",
  border:      "var(--border)",
  accent:      "var(--accent)",
  accentLight: "var(--accent-light)",
  heading:     "var(--text-heading)",
  body:        "var(--text-body)",
  muted:       "var(--text-muted)",
  starColor:   "var(--accent)",
};

const reviewsData = [
  { name: "Sarah Mitchell",  role: "Head of People, Meridian Group",           body: "Acqua filled a critical senior vacancy within two weeks. The quality of candidates was exceptional and the process was effortless on our end." },
  { name: "James Holloway",  role: "Operations Director, Crestfield Solutions", body: "We have used Acqua for both permanent placements and temporary cover. Every time they deliver exactly what we need." },
  { name: "Priya Sharma",    role: "Finance Manager, Vantage Consulting",       body: "The payroll support has been outstanding. Accurate, timely, and they handle HMRC queries before we even know there is one." },
  { name: "Thomas Reid",     role: "MD, Northgate Property Group",              body: "Professional, responsive, and genuinely invested in finding the right people. Three senior hires — all still with us two years on." },
  { name: "Leanne Porter",   role: "HR Director, Solaris Networks",             body: "Switching our payroll to Acqua was the best administrative decision we made this year. Everything just runs, with zero stress." },
  { name: "David Okafor",    role: "CEO, Bluewave Technologies",                body: "Fast, honest, and thorough. Acqua matched us with a candidate we had been searching for independently for months." },
  { name: "Rachel Dunn",     role: "People Partner, Halcyon Healthcare",        body: "The team truly listened to what we needed. Their candidate shortlists are tight, well-prepared, and always on brief." },
];

function Stars() {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 20 20" fill={c.starColor}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function initials(name: string) {
  return name.split(" ").map(n => n[0]).slice(0, 2).join("");
}

function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      backgroundColor: c.accent, color: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.3 + "px", fontWeight: 700, flexShrink: 0,
    }}>
      {initials(name)}
    </div>
  );
}

export default function ReviewsBento() {
  const [featured, ...rest] = reviewsData;
  // Distribute rest into 3 columns of varying sizes
  const col1 = [rest[0], rest[3]];
  const col2 = [rest[1], rest[4]];
  const col3 = [rest[2], rest[5]];

  return (
    <section style={{ background: c.bg }} className="py-20 lg:py-28">
      <div className="section-inner">

        {/* Header */}
        <div className="mb-12" data-animate="fade-up">
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
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: 16, justifyContent: "space-between" }}>
            <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: c.heading }}>
              Trusted by Leaders<br />Across the UK
            </h2>
            <p style={{ fontSize: "0.875rem", color: c.muted, maxWidth: 260, lineHeight: 1.6 }}>
              Over 200 placements and counting — from temp cover to permanent senior hires.
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div
          data-animate="fade-up"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "auto",
            gap: 14,
          }}
          className="rb-grid"
        >
          <style>{`
            @media (max-width: 767px) {
              .rb-grid { grid-template-columns: 1fr !important; }
              .rb-featured { grid-column: 1 !important; grid-row: auto !important; }
            }
            @media (min-width: 768px) and (max-width: 1023px) {
              .rb-grid { grid-template-columns: 1fr 1fr !important; }
              .rb-featured { grid-column: 1 / -1 !important; grid-row: auto !important; }
            }
          `}</style>

          {/* Featured card — spans 1 col × 2 rows on desktop */}
          <div
            className="rb-featured"
            style={{
              gridColumn: "1",
              gridRow: "1 / 3",
              backgroundColor: c.accentLight,
              border: `1px solid transparent`,
              borderRadius: 20,
              padding: "36px 32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: 320,
            }}
          >
            <div>
              <div style={{ fontSize: "3.5rem", lineHeight: 1, color: c.accent, opacity: 0.35, fontFamily: "Georgia, serif", marginBottom: 16 }}>
                &ldquo;
              </div>
              <Stars />
              <p style={{ fontSize: "1rem", color: c.body, lineHeight: 1.8, marginTop: 16 }}>
                {featured.body}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 28, paddingTop: 20, borderTop: `1px solid ${c.border}` }}>
              <Avatar name={featured.name} size={42} />
              <div>
                <p style={{ fontSize: "0.875rem", fontWeight: 700, color: c.heading, marginBottom: 2 }}>{featured.name}</p>
                <p style={{ fontSize: "0.7rem", color: c.muted }}>{featured.role}</p>
              </div>
            </div>
          </div>

          {/* Column 2 — 2 stacked cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {col1.map((r, i) => (
              <div key={i} style={{
                backgroundColor: i === 0 ? c.cardAlt : c.cardBg,
                border: `1px solid ${c.border}`,
                borderRadius: i === 0 ? 20 : 12,
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                flex: i === 0 ? "0 0 auto" : 1,
              }}>
                <Stars />
                <p style={{ fontSize: "0.82rem", color: c.body, lineHeight: 1.7 }}>
                  &ldquo;{r.body}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar name={r.name} size={30} />
                  <div>
                    <p style={{ fontSize: "0.78rem", fontWeight: 700, color: c.heading, marginBottom: 1 }}>{r.name}</p>
                    <p style={{ fontSize: "0.65rem", color: c.muted }}>{r.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 3 — 2 stacked cards (reversed proportions) */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {col2.map((r, i) => (
              <div key={i} style={{
                backgroundColor: c.cardBg,
                border: `1px solid ${c.border}`,
                borderRadius: i === 1 ? 20 : 12,
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}>
                <Stars />
                <p style={{ fontSize: "0.82rem", color: c.body, lineHeight: 1.7 }}>
                  &ldquo;{r.body}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar name={r.name} size={30} />
                  <div>
                    <p style={{ fontSize: "0.78rem", fontWeight: 700, color: c.heading, marginBottom: 1 }}>{r.name}</p>
                    <p style={{ fontSize: "0.65rem", color: c.muted }}>{r.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom row — 3 small accent cards spanning cols 2–3 */}
          {col3.slice(0, 1).map((r, i) => (
            <div
              key={i}
              style={{
                gridColumn: "2 / 4",
                backgroundColor: c.cardAlt,
                border: `1px solid ${c.border}`,
                borderRadius: 16,
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
              className="rb-wide"
            >
              <style>{`.rb-wide { grid-column: 2 / 4 !important; } @media (max-width: 767px) { .rb-wide { grid-column: 1 !important; } } @media (min-width: 768px) and (max-width: 1023px) { .rb-wide { grid-column: 1 / -1 !important; } }`}</style>
              <Avatar name={r.name} size={44} />
              <div style={{ flex: 1 }}>
                <Stars />
                <p style={{ fontSize: "0.82rem", color: c.body, lineHeight: 1.6, marginTop: 8 }}>
                  &ldquo;{r.body}&rdquo;
                </p>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0, display: "none" }} className="rb-author-col">
                <p style={{ fontSize: "0.78rem", fontWeight: 700, color: c.heading }}>{r.name}</p>
                <p style={{ fontSize: "0.65rem", color: c.muted }}>{r.role}</p>
              </div>
              <div style={{ flexShrink: 0 }}>
                <p style={{ fontSize: "0.78rem", fontWeight: 700, color: c.heading, marginBottom: 2 }}>{r.name}</p>
                <p style={{ fontSize: "0.65rem", color: c.muted }}>{r.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats strip */}
        <div
          data-animate="fade-up"
          style={{
            display: "flex",
            gap: 0,
            marginTop: 14,
            backgroundColor: c.cardBg,
            border: `1px solid ${c.border}`,
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {[{ n: "200+", l: "Placements made" }, { n: "98%", l: "Client retention rate" }, { n: "24h", l: "Average response time" }, { n: "5★", l: "Average client rating" }].map(({ n, l }, i, arr) => (
            <div
              key={l}
              style={{
                flex: 1,
                padding: "20px 24px",
                borderRight: i < arr.length - 1 ? `1px solid ${c.border}` : "none",
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: "1.6rem", fontWeight: 800, color: c.accent, lineHeight: 1 }}>{n}</p>
              <p style={{ fontSize: "0.7rem", color: c.muted, marginTop: 6 }}>{l}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
