// Batch 2 — ContactFormProgressive
// Layout: centered, starts with "Let's talk" CTA, 3 guided steps
// Step 1: large service tiles  Step 2: name + email  Step 3: message + submit
// Style: progress dots, tile selection, back/next nav, no traditional form layout
// API: /api/v1/contact
"use client";

import { useState } from "react";
import { formsConfig } from "@/configs/forms";
import { useCaptcha } from "@/hooks/useCaptcha";
import CaptchaWidget from "./CaptchaWidget";

// ─── Config ──────────────────────────────────────────────────────────────────
const SERVICES = [
  { id: "Recruitment",    label: "Recruitment",     desc: "Find the right talent for your team" },
  { id: "Payroll",        label: "Payroll Services", desc: "Streamline and simplify your payroll" },
  { id: "Compliance",     label: "Compliance",       desc: "Stay on the right side of the rules" },
  { id: "General",        label: "General Enquiry",  desc: "Something else? We're happy to help" },
];

// ─── Colours — change any value here to retheme this form independently ──────
const c = {
  accent:      "var(--section-accent, var(--accent))",
  accentLight: "var(--section-accent-light, var(--accent-light))",
  heading:     "var(--section-heading, var(--text-heading))",
  body:        "var(--section-body, var(--text-body))",
  muted:       "var(--section-muted, var(--text-muted))",
  border:      "var(--section-border, var(--border))",
  radius:      "14px",   // friendly, rounded
};

type Stage = "start" | "step1" | "step2" | "step3" | "success";
type FormState = "idle" | "loading" | "error";

function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center gap-2 justify-center mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          width: i === current ? 28 : 8, height: 8, borderRadius: 4,
          backgroundColor: i <= current ? c.accent : c.border,
          transition: "all 0.3s ease",
        }} />
      ))}
    </div>
  );
}

export default function ContactFormProgressive() {
  const { requireCaptcha } = formsConfig.contactForm;
  const { isV3, setWidgetToken, getToken } = useCaptcha();

  const [stage, setStage]       = useState<Stage>("start");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [service, setService]   = useState("");
  const [fields, setFields]     = useState({ name: "", email: "", message: "" });

  function set(field: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((prev) => ({ ...prev, [field]: e.target.value }));
  }

  const stepIndex = stage === "step1" ? 0 : stage === "step2" ? 1 : stage === "step3" ? 2 : 0;

  async function handleSubmit() {
    setFormState("loading"); setErrorMsg("");

    let captchaToken: string | null = null;
    if (requireCaptcha) {
      captchaToken = await getToken("contact_progressive");
      if (!captchaToken) { setErrorMsg("Please complete the CAPTCHA."); setFormState("error"); return; }
    }

    const message = [service ? `Enquiry type: ${service}` : "", fields.message].filter(Boolean).join("\n\n") || "No message provided";

    try {
      const res = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fields.name, email: fields.email, phone: "", message, captchaToken }),
      });
      const data = await res.json();
      if (!res.ok) { setErrorMsg(data.error || "Something went wrong."); setFormState("error"); }
      else { setStage("success"); }
    } catch {
      setErrorMsg("Network error. Please try again."); setFormState("error");
    }
  }

  const centerCls = "flex flex-col items-center text-center w-full max-w-lg mx-auto";
  const headingStyle: React.CSSProperties = { color: c.heading, fontWeight: 700, fontSize: "1.5rem", marginBottom: 8 };
  const subStyle: React.CSSProperties    = { color: c.muted, fontSize: "0.9375rem", marginBottom: 32 };
  const backStyle: React.CSSProperties   = { background: "none", border: "none", cursor: "pointer", fontSize: "0.8125rem", color: c.muted, padding: 0, marginBottom: 24 };

  // ── Success ──
  if (stage === "success") {
    return (
      <div className={centerCls} style={{ gap: 12, paddingTop: 24 }}>
        <div className="form-success-icon" style={{ marginBottom: 12 }}>✓</div>
        <h3 style={{ ...headingStyle, fontSize: "1.75rem" }}>We&apos;ll be in touch.</h3>
        <p style={subStyle}>Expect a reply within one business day.</p>
      </div>
    );
  }

  // ── Start ──
  if (stage === "start") {
    return (
      <div className={centerCls} style={{ gap: 16, paddingTop: 8, paddingBottom: 8 }}>
        <h2 style={{ ...headingStyle, fontSize: "2rem" }}>Ready to connect?</h2>
        <p style={subStyle}>It only takes a minute. Tell us what you need.</p>
        <button onClick={() => setStage("step1")} className="form-btn px-10 py-4 text-base" style={{ borderRadius: c.radius }}>
          Let&apos;s talk →
        </button>
      </div>
    );
  }

  return (
    <div className={centerCls}>
      <ProgressDots total={3} current={stepIndex} />

      {/* ── Step 1 — Service selection ── */}
      {stage === "step1" && (
        <div className="w-full flex flex-col items-center gap-6">
          <div>
            <h3 style={headingStyle}>What can we help with?</h3>
            <p style={subStyle}>Pick the option that best fits your need.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            {SERVICES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => { setService(s.id); setStage("step2"); }}
                className="text-left flex flex-col gap-1 p-5 transition-all"
                style={{ border: `1.5px solid ${c.border}`, borderRadius: c.radius, cursor: "pointer", background: "transparent" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = c.accent)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = c.border)}
              >
                <span className="text-sm font-semibold" style={{ color: c.heading }}>{s.label}</span>
                <span className="text-xs" style={{ color: c.muted }}>{s.desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Step 2 — Name + email ── */}
      {stage === "step2" && (
        <div className="w-full flex flex-col gap-5">
          <button style={backStyle} onClick={() => setStage("step1")}>← Back</button>
          <div>
            <h3 style={headingStyle}>Who are you?</h3>
            <p style={subStyle}>Just the basics — we&apos;ll handle the rest.</p>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1.5">
              <label className="form-label">Full name <span className="text-red-500">*</span></label>
              <input type="text" required value={fields.name} onChange={set("name")} placeholder="Jane Smith" className="form-input" style={{ borderRadius: c.radius }} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="form-label">Email address <span className="text-red-500">*</span></label>
              <input type="email" required value={fields.email} onChange={set("email")} placeholder="jane@company.co.uk" className="form-input" style={{ borderRadius: c.radius }} />
            </div>
          </div>
          <button
            type="button"
            disabled={!fields.name || !fields.email}
            onClick={() => setStage("step3")}
            className="form-btn disabled:opacity-40"
            style={{ borderRadius: c.radius }}
          >
            Continue →
          </button>
        </div>
      )}

      {/* ── Step 3 — Message + submit ── */}
      {stage === "step3" && (
        <div className="w-full flex flex-col gap-5">
          <button style={backStyle} onClick={() => setStage("step2")}>← Back</button>
          <div>
            <h3 style={headingStyle}>Anything to add?</h3>
            <p style={subStyle}>Optional — but helpful if you have specifics.</p>
          </div>
          <textarea
            rows={5}
            value={fields.message}
            onChange={set("message")}
            placeholder="Tell us a bit more about what you need…"
            className="form-input resize-none w-full"
            style={{ borderRadius: c.radius }}
          />
          {requireCaptcha && !isV3 && <CaptchaWidget onVerify={setWidgetToken} onExpire={() => setWidgetToken(null)} />}
          {formState === "error" && <p className="text-sm text-red-500 text-left">{errorMsg}</p>}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={formState === "loading"}
            className="form-btn"
            style={{ borderRadius: c.radius }}
          >
            {formState === "loading" ? "Sending…" : "Send message"}
          </button>
        </div>
      )}
    </div>
  );
}
