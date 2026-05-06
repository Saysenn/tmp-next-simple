"use client";

import { useState, useEffect, useCallback } from "react";

// ─── Config ───────────────────────────────────────────────────────────────────
const c = {
  bg:        "var(--bg-base)",
  panelBg:   "var(--bg-soft)",
  border:    "var(--border)",
  accent:    "var(--accent)",
  accentLight: "var(--accent-light)",
  heading:   "var(--text-heading)",
  body:      "var(--text-body)",
  muted:     "var(--text-muted)",
  starColor: "var(--accent)",
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

const INTERVAL = 5000;

function initials(name: string) {
  return name.split(" ").map(n => n[0]).slice(0, 2).join("");
}

export default function ReviewsFocus() {
  const [active, setActive]     = useState(0);
  const [animKey, setAnimKey]   = useState(0);
  const [paused, setPaused]     = useState(false);

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
    <section style={{ background: c.bg }} className="py-20 lg:py-28">
      <style>{`
        @keyframes rf-fade-up {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .rf-quote { animation: rf-fade-up 0.45s ease both; }

        @keyframes rf-progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
        .rf-bar { animation: rf-progress ${INTERVAL}ms linear both; }

        .rf-name-btn {
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          width: 100%;
          padding: 12px 16px;
          border-radius: 10px;
          transition: background 0.15s;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .rf-name-btn:hover { background: var(--bg-subtle); }
        .rf-name-btn.active { background: var(--accent-light); }
      `}</style>

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
          <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: c.heading }}>
            In Their Own Words
          </h2>
        </div>

        {/* Main layout */}
        <div
          style={{ display: "flex", gap: 24, alignItems: "stretch" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          data-animate="fade-up"
        >

          {/* Left — featured review */}
          <div style={{
            flex: "1 1 0",
            backgroundColor: c.panelBg,
            border: `1px solid ${c.border}`,
            borderRadius: 20,
            padding: "48px 44px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: 360,
            overflow: "hidden",
            position: "relative",
          }}>
            {/* Progress bar */}
            {!paused && (
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: c.border }}>
                <div key={`bar-${animKey}`} className="rf-bar" style={{ height: "100%", backgroundColor: c.accent }} />
              </div>
            )}

            <div key={`quote-${animKey}`} className="rf-quote">
              {/* Large quote mark */}
              <div style={{ fontSize: "4rem", lineHeight: 1, color: c.accent, opacity: 0.2, fontFamily: "Georgia, serif", marginBottom: 8 }}>
                &ldquo;
              </div>
              {/* Stars */}
              <div style={{ display: "flex", gap: 2, marginBottom: 20 }}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="13" height="13" viewBox="0 0 20 20" fill={c.starColor}>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              {/* Quote body */}
              <p style={{ fontSize: "1.05rem", color: c.body, lineHeight: 1.8 }}>
                {r.body}
              </p>
            </div>

            {/* Author */}
            <div key={`author-${animKey}`} className="rf-quote" style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 36, paddingTop: 24, borderTop: `1px solid ${c.border}` }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%",
                backgroundColor: c.accent, color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.85rem", fontWeight: 700, flexShrink: 0,
              }}>
                {initials(r.name)}
              </div>
              <div>
                <p style={{ fontSize: "0.9rem", fontWeight: 700, color: c.heading, marginBottom: 3 }}>{r.name}</p>
                <p style={{ fontSize: "0.72rem", color: c.muted }}>{r.role}</p>
              </div>
            </div>
          </div>

          {/* Right — name list */}
          <div style={{
            flex: "0 0 260px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
          className="rf-sidebar"
          >
            <style>{`
              @media (max-width: 767px) { .rf-sidebar { display: none !important; } }
            `}</style>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: c.muted, fontWeight: 600, padding: "0 16px", marginBottom: 8 }}>
              All Reviews
            </p>
            {reviewsData.map((rev, i) => (
              <button
                key={i}
                className={`rf-name-btn${active === i ? " active" : ""}`}
                onClick={() => goTo(i)}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  backgroundColor: active === i ? c.accent : c.border,
                  color: active === i ? "#fff" : c.muted,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.6rem", fontWeight: 700, flexShrink: 0,
                  transition: "background 0.2s, color 0.2s",
                }}>
                  {initials(rev.name)}
                </div>
                <div style={{ overflow: "hidden" }}>
                  <p style={{
                    fontSize: "0.8rem", fontWeight: active === i ? 700 : 500,
                    color: active === i ? c.heading : c.body,
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    transition: "color 0.2s",
                  }}>
                    {rev.name}
                  </p>
                  <p style={{
                    fontSize: "0.65rem", color: c.muted,
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>
                    {rev.role.split(",")[0]}
                  </p>
                </div>
                {active === i && (
                  <div style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", backgroundColor: c.accent, flexShrink: 0 }} />
                )}
              </button>
            ))}

            {/* Mobile dots */}
            <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 16, padding: "0 16px" }} className="rf-dots">
              <style>{`.rf-dots { display: none !important; } @media (max-width: 767px) { .rf-dots { display: flex !important; } }`}</style>
              {reviewsData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  style={{
                    width: active === i ? 20 : 7,
                    height: 7,
                    borderRadius: 999,
                    backgroundColor: active === i ? c.accent : c.border,
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "width 0.25s, background 0.2s",
                  }}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
