"use client";

import { useState, useEffect, useCallback } from "react";

// ─── Config ───────────────────────────────────────────────────────────────────
const c = {
  bg:      "var(--bg-base)",
  divider: "var(--border)",
  accent:  "var(--accent)",
  heading: "var(--text-heading)",
  body:    "var(--text-body)",
  muted:   "var(--text-muted)",
  soft:    "var(--bg-soft)",
  star:    "var(--accent)",
};

const reviewsData = [
  { name: "Sarah Mitchell",  role: "Head of People, Meridian Group",           body: "Acqua filled a critical senior vacancy within two weeks. The quality of candidates was exceptional and the process was effortless on our end — no chasing, no guesswork." },
  { name: "James Holloway",  role: "Operations Director, Crestfield Solutions", body: "We have used Acqua for both permanent placements and temporary cover. Every time they deliver exactly what we need, without us having to over-specify." },
  { name: "Priya Sharma",    role: "Finance Manager, Vantage Consulting",       body: "The payroll support has been outstanding. Accurate, timely, and they handle HMRC queries before we even know there is one. Genuinely takes the stress out of payroll." },
  { name: "Thomas Reid",     role: "MD, Northgate Property Group",              body: "Professional, responsive, and genuinely invested in finding the right people. Three senior hires — all still with us two years on. That says everything." },
  { name: "Leanne Porter",   role: "HR Director, Solaris Networks",             body: "Switching our payroll to Acqua was the best administrative decision we made this year. Everything just runs, with zero stress on our side." },
  { name: "David Okafor",    role: "CEO, Bluewave Technologies",                body: "Fast, honest, and thorough. Acqua matched us with a candidate we had been searching for independently for months. I wish we had come to them sooner." },
  { name: "Rachel Dunn",     role: "People Partner, Halcyon Healthcare",        body: "The team truly listened to what we needed. Their candidate shortlists are tight, well-prepared, and always on brief. No padding, no wasted time." },
  { name: "Marcus Webb",     role: "General Manager, Fairview Logistics",       body: "We needed temporary staff at short notice. Acqua had vetted candidates to us within 24 hours. Exactly the kind of partner you want when things get urgent." },
];

const INTERVAL = 5500;

function initials(name: string) {
  return name.split(" ").map(n => n[0]).slice(0, 2).join("");
}

export default function ReviewsFocus() {
  const [active, setActive]   = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [paused, setPaused]   = useState(false);

  const goTo = useCallback((i: number) => {
    setActive(i);
    setAnimKey(k => k + 1);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive(i => {
        const next = (i + 1) % reviewsData.length;
        setAnimKey(k => k + 1);
        return next;
      });
    }, INTERVAL);
    return () => clearInterval(id);
  }, [paused]);

  const r = reviewsData[active];

  return (
    <section style={{ background: c.bg, borderTop: `1px solid ${c.divider}`, borderBottom: `1px solid ${c.divider}` }} className="py-20 lg:py-28">
      <style>{`
        @keyframes rf-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .rf-animate { animation: rf-in 0.4s ease both; }

        @keyframes rf-prog { from { width: 0 } to { width: 100% } }
        .rf-prog { animation: rf-prog ${INTERVAL}ms linear both; }

        .rf-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 0;
          border-bottom: 1px solid var(--border);
          cursor: pointer;
          background: none;
          border-left: none;
          border-right: none;
          border-top: none;
          width: 100%;
          text-align: left;
          transition: background 0.15s;
        }
        .rf-row:first-of-type { border-top: 1px solid var(--border); }
        .rf-row:hover { background: var(--bg-soft); }
        .rf-row.rf-active { background: var(--bg-soft); }
      `}</style>

      <div className="section-inner">

        {/* Section label */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 48 }} data-animate="fade-up">
          <div style={{ display: "flex", gap: 3 }}>
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="12" height="12" viewBox="0 0 20 20" fill={c.star}>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: c.accent, fontWeight: 600 }}>
            5.0 · Client Reviews
          </span>
          <span style={{ flex: 1 }} />
          <h2 className="text-2xl lg:text-3xl font-bold" style={{ color: c.heading }}>
            In Their Own Words
          </h2>
        </div>

        {/* Main split */}
        <div
          style={{ display: "flex", gap: 0, alignItems: "stretch", borderTop: `1px solid ${c.divider}` }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          data-animate="fade-up"
        >

          {/* Left — featured quote */}
          <div style={{ flex: "1 1 0", padding: "48px 48px 48px 0", borderRight: `1px solid ${c.divider}`, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 380, position: "relative", overflow: "hidden" }}>
            {/* Progress line */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: c.divider }}>
              {!paused && <div key={`prog-${animKey}`} className="rf-prog" style={{ height: "100%", backgroundColor: c.accent }} />}
            </div>

            {/* Quote */}
            <div key={`body-${animKey}`} className="rf-animate">
              <p style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)", color: c.body, lineHeight: 1.85, fontStyle: "italic" }}>
                &ldquo;{r.body}&rdquo;
              </p>
            </div>

            {/* Author */}
            <div key={`auth-${animKey}`} className="rf-animate" style={{ display: "flex", alignItems: "center", gap: 16, paddingTop: 32, marginTop: 32, borderTop: `1px solid ${c.divider}` }}>
              <div style={{
                width: 40, height: 40,
                backgroundColor: c.accent, color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.72rem", fontWeight: 700, flexShrink: 0,
                borderRadius: 0,
              }}>
                {initials(r.name)}
              </div>
              <div>
                <p style={{ fontSize: "0.875rem", fontWeight: 700, color: c.heading, marginBottom: 3 }}>{r.name}</p>
                <p style={{ fontSize: "0.72rem", color: c.muted }}>{r.role}</p>
              </div>
              {/* Index */}
              <span style={{ marginLeft: "auto", fontSize: "0.7rem", color: c.muted, fontVariantNumeric: "tabular-nums" }}>
                {String(active + 1).padStart(2, "0")} / {String(reviewsData.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Right — reviewer list */}
          <div style={{ flex: "0 0 300px", padding: "0 0 0 48px", display: "flex", flexDirection: "column", justifyContent: "center" }} className="rf-sidebar">
            <style>{`@media (max-width: 767px) { .rf-sidebar { display: none !important; } }`}</style>

            {reviewsData.map((rev, i) => (
              <button
                key={i}
                className={`rf-row${active === i ? " rf-active" : ""}`}
                onClick={() => goTo(i)}
                style={{ padding: "14px 12px" }}
              >
                <div style={{
                  width: 28, height: 28,
                  backgroundColor: active === i ? c.accent : "transparent",
                  border: `1px solid ${active === i ? c.accent : c.divider}`,
                  color: active === i ? "#fff" : c.muted,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.58rem", fontWeight: 700, flexShrink: 0,
                  borderRadius: 0,
                  transition: "background 0.2s, border-color 0.2s, color 0.2s",
                }}>
                  {initials(rev.name)}
                </div>
                <div style={{ overflow: "hidden", flex: 1 }}>
                  <p style={{
                    fontSize: "0.8rem",
                    fontWeight: active === i ? 700 : 400,
                    color: active === i ? c.heading : c.body,
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    transition: "color 0.2s, font-weight 0.2s",
                  }}>
                    {rev.name}
                  </p>
                  <p style={{ fontSize: "0.64rem", color: c.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {rev.role.split(",")[0]}
                  </p>
                </div>
                {active === i && (
                  <div style={{ width: 4, height: 4, backgroundColor: c.accent, flexShrink: 0, borderRadius: 0 }} />
                )}
              </button>
            ))}
          </div>

          {/* Mobile dots */}
          <div style={{ display: "none" }} className="rf-mob-dots">
            <style>{`.rf-mob-dots { display: none !important; } @media (max-width: 767px) { .rf-mob-dots { display: flex !important; gap: 6px; padding-top: 24px; } }`}</style>
            {reviewsData.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: active === i ? 20 : 6, height: 6,
                  backgroundColor: active === i ? c.accent : c.divider,
                  border: "none", cursor: "pointer", padding: 0,
                  transition: "width 0.25s, background 0.2s",
                  borderRadius: 0,
                }}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
