// Batch 2 — ApplicationFormProgressive
// Layout: centered, starts with "Start applying" CTA, 3 guided steps
// Step 1: name + email + phone  Step 2: experience tiles + availability chips  Step 3: CV + submit
// Style: progress dots, large experience tiles, chip toggles, back/next nav
// API: /api/v1/apply
"use client";

import { useState, useRef } from "react";
import { formsConfig } from "@/configs/forms";
import { useCaptcha } from "@/hooks/useCaptcha";
import CaptchaWidget from "./CaptchaWidget";

// ─── Config ──────────────────────────────────────────────────────────────────
const EXPERIENCE_TILES = [
  { id: "0–1 year",  label: "0–1 year",  desc: "Just starting out" },
  { id: "1–3 years", label: "1–3 years", desc: "Building experience" },
  { id: "3–5 years", label: "3–5 years", desc: "Mid-level professional" },
  { id: "5+ years",  label: "5+ years",  desc: "Seasoned professional" },
];
const AVAILABILITY_CHIPS = ["Full-time", "Part-time", "Contract", "Temporary"];

// ─── Colours — change any value here to retheme this form independently ──────
const c = {
  accent:      "var(--section-accent, var(--accent))",
  accentLight: "var(--section-accent-light, var(--accent-light))",
  heading:     "var(--section-heading, var(--text-heading))",
  body:        "var(--section-body, var(--text-body))",
  muted:       "var(--section-muted, var(--text-muted))",
  border:      "var(--section-border, var(--border))",
  radius:      "12px",   // friendly, rounded steps
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

export default function ApplicationFormProgressive() {
  const { requireCaptcha, maxFileSizeMb, allowedFileTypes } = formsConfig.applicationForm;
  const { isV3, setWidgetToken, getToken } = useCaptcha();

  const [stage, setStage]           = useState<Stage>("start");
  const [formState, setFormState]   = useState<FormState>("idle");
  const [errorMsg, setErrorMsg]     = useState("");
  const [experience, setExperience] = useState("");
  const [availability, setAvailability] = useState<string[]>([]);
  const [cvFile, setCvFile]         = useState<File | null>(null);
  const [cvError, setCvError]       = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fields, setFields]         = useState({ name: "", email: "", phone: "", position: "" });

  function set(field: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement>) => setFields((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function toggleAvailability(opt: string) {
    setAvailability((prev) => prev.includes(opt) ? prev.filter((a) => a !== opt) : [...prev, opt]);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setCvError("");
    if (!file) { setCvFile(null); return; }
    if (file.size > maxFileSizeMb * 1024 * 1024) { setCvError(`Max ${maxFileSizeMb}MB.`); setCvFile(null); return; }
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!allowedFileTypes.includes(ext as "pdf" | "doc" | "docx")) { setCvError(`Accepted: ${allowedFileTypes.join(", ").toUpperCase()}.`); setCvFile(null); return; }
    setCvFile(file);
  }

  const stepIndex = stage === "step1" ? 0 : stage === "step2" ? 1 : stage === "step3" ? 2 : 0;

  async function handleSubmit() {
    setFormState("loading"); setErrorMsg("");

    let captchaToken: string | null = null;
    if (requireCaptcha) {
      captchaToken = await getToken("apply_progressive");
      if (!captchaToken) { setErrorMsg("Please complete the CAPTCHA."); setFormState("error"); return; }
    }

    try {
      const body = new FormData();
      body.append("name", fields.name);
      body.append("email", fields.email);
      body.append("phone", fields.phone);
      body.append("position", fields.position);
      body.append("coverLetter", [
        experience          ? `Experience: ${experience}` : "",
        availability.length ? `Availability: ${availability.join(", ")}` : "",
      ].filter(Boolean).join("\n"));
      if (captchaToken) body.append("captchaToken", captchaToken);
      if (cvFile) body.append("cv", cvFile);
      body.append("website", "");

      const res = await fetch("/api/v1/apply", { method: "POST", body });
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
  const acceptAttr = allowedFileTypes.map((t) => `.${t}`).join(",");

  // ── Success ──
  if (stage === "success") {
    return (
      <div className={centerCls} style={{ gap: 12, paddingTop: 24 }}>
        <div className="form-success-icon" style={{ marginBottom: 12 }}>✓</div>
        <h3 style={{ ...headingStyle, fontSize: "1.75rem" }}>Application received.</h3>
        <p style={subStyle}>We review every application personally and will be in touch.</p>
      </div>
    );
  }

  // ── Start ──
  if (stage === "start") {
    return (
      <div className={centerCls} style={{ gap: 16, paddingTop: 8, paddingBottom: 8 }}>
        <h2 style={{ ...headingStyle, fontSize: "2rem" }}>Join our team.</h2>
        <p style={subStyle}>Three quick steps. No account needed.</p>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <div className="flex flex-col gap-1.5 text-left">
            <label className="form-label">Role you&apos;re applying for (optional)</label>
            <input type="text" value={fields.position} onChange={set("position")} placeholder="e.g. Payroll Administrator" className="form-input" style={{ borderRadius: c.radius }} />
          </div>
          <button onClick={() => setStage("step1")} className="form-btn py-4 text-base mt-2" style={{ borderRadius: c.radius }}>
            Start applying →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={centerCls}>
      <ProgressDots total={3} current={stepIndex} />

      {/* ── Step 1 — Personal ── */}
      {stage === "step1" && (
        <div className="w-full flex flex-col gap-5">
          <div>
            <h3 style={headingStyle}>Let&apos;s start with you</h3>
            <p style={subStyle}>Just your basic details.</p>
          </div>
          <div className="flex flex-col gap-4 text-left">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="form-label">Full name <span className="text-red-500">*</span></label>
                <input type="text" required value={fields.name} onChange={set("name")} placeholder="Amelia Turner" className="form-input" style={{ borderRadius: c.radius }} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="form-label">Phone</label>
                <input type="tel" value={fields.phone} onChange={set("phone")} placeholder="+44 7700 900000" className="form-input" style={{ borderRadius: c.radius }} />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="form-label">Email address <span className="text-red-500">*</span></label>
              <input type="email" required value={fields.email} onChange={set("email")} placeholder="email@company.co.uk" className="form-input" style={{ borderRadius: c.radius }} />
            </div>
          </div>
          <button type="button" disabled={!fields.name || !fields.email} onClick={() => setStage("step2")} className="form-btn disabled:opacity-40" style={{ borderRadius: c.radius }}>
            Continue →
          </button>
        </div>
      )}

      {/* ── Step 2 — Experience + Availability ── */}
      {stage === "step2" && (
        <div className="w-full flex flex-col gap-6">
          <button style={backStyle} onClick={() => setStage("step1")}>← Back</button>
          <div>
            <h3 style={headingStyle}>Your experience</h3>
            <p style={subStyle}>Pick what best describes you.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full">
            {EXPERIENCE_TILES.map((t) => (
              <button key={t.id} type="button" onClick={() => setExperience(t.id)}
                className="text-left flex flex-col gap-1 p-4 transition-all"
                style={{
                  border: `1.5px solid ${experience === t.id ? c.accent : c.border}`,
                  borderRadius: c.radius,
                  background: experience === t.id ? c.accentLight : "transparent",
                  cursor: "pointer",
                }}>
                <span className="text-sm font-semibold" style={{ color: c.heading }}>{t.label}</span>
                <span className="text-xs" style={{ color: c.muted }}>{t.desc}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3 text-left">
            <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: c.muted }}>Availability</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {AVAILABILITY_CHIPS.map((opt) => {
                const active = availability.includes(opt);
                return (
                  <button key={opt} type="button" onClick={() => toggleAvailability(opt)}
                    className="px-4 py-2 text-sm font-medium rounded-full transition-all"
                    style={{
                      backgroundColor: active ? c.accent : "transparent",
                      color: active ? "#ffffff" : c.body,
                      border: `1.5px solid ${active ? c.accent : c.border}`,
                    }}>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
          <button type="button" onClick={() => setStage("step3")} className="form-btn" style={{ borderRadius: c.radius }}>
            Continue →
          </button>
        </div>
      )}

      {/* ── Step 3 — CV + Submit ── */}
      {stage === "step3" && (
        <div className="w-full flex flex-col gap-6">
          <button style={backStyle} onClick={() => setStage("step2")}>← Back</button>
          <div>
            <h3 style={headingStyle}>Almost done.</h3>
            <p style={subStyle}>Drop your CV and you&apos;re all set.</p>
          </div>
          {!cvFile ? (
            <label className="form-upload-zone cursor-pointer" style={{ borderRadius: c.radius }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: c.muted }}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
              </svg>
              <span className="text-sm" style={{ color: c.body }}>
                Drop your CV here or <span style={{ color: c.accent }} className="font-medium">browse</span>
              </span>
              <span className="text-xs" style={{ color: c.muted }}>
                {allowedFileTypes.join(", ").toUpperCase()} · Max {maxFileSizeMb}MB · Optional
              </span>
              <input ref={fileInputRef} type="file" accept={acceptAttr} onChange={handleFileChange} className="hidden" />
            </label>
          ) : (
            <div className="form-file-pill">
              <span className="text-sm font-medium truncate" style={{ color: c.heading }}>{cvFile.name}</span>
              <button type="button" onClick={() => { setCvFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }} className="text-xs shrink-0" style={{ color: c.muted }}>✕ Remove</button>
            </div>
          )}
          {cvError && <p className="text-xs text-red-500">{cvError}</p>}
          {requireCaptcha && !isV3 && <CaptchaWidget onVerify={setWidgetToken} onExpire={() => setWidgetToken(null)} />}
          {formState === "error" && <p className="text-sm text-red-500 text-left">{errorMsg}</p>}
          <button type="button" onClick={handleSubmit} disabled={formState === "loading"} className="form-btn" style={{ borderRadius: c.radius }}>
            {formState === "loading" ? "Submitting…" : "Submit application"}
          </button>
        </div>
      )}
    </div>
  );
}
