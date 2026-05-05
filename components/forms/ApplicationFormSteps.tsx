// Batch 2 — ApplicationFormSteps
// Layout: single centered column, progress bar top, 3 steps (simplified)
// Step 1: Personal  Step 2: Role + Availability  Step 3: CV + Submit
// Style: 10px radius, placeholder-only inputs (step headings provide context), Next/Back nav
// API: /api/v1/apply
"use client";

import { useState, useRef } from "react";
import { formsConfig } from "@/configs/forms";
import { useCaptcha } from "@/hooks/useCaptcha";
import CaptchaWidget from "./CaptchaWidget";

// ─── Config ──────────────────────────────────────────────────────────────────
const EXPERIENCE_OPTIONS  = ["0–1 year", "1–3 years", "3–5 years", "5–10 years", "10+ years"];
const AVAILABILITY_OPTIONS = ["Full-time", "Part-time", "Contract", "Freelance", "Temporary"];
const STEPS = ["Personal", "Role & Availability", "Your CV"];

// ─── Colours — change any value here to retheme this form independently ──────
const c = {
  accent:      "var(--section-accent, var(--accent))",
  accentLight: "var(--section-accent-light, var(--accent-light))",
  heading:     "var(--section-heading, var(--text-heading))",
  body:        "var(--section-body, var(--text-body))",
  muted:       "var(--section-muted, var(--text-muted))",
  border:      "var(--section-border, var(--border))",
  radius:      "10px",   // standard rounded
};

type FormState = "idle" | "loading" | "success" | "error";

export default function ApplicationFormSteps() {
  const { requireCaptcha, maxFileSizeMb, allowedFileTypes } = formsConfig.applicationForm;
  const { isV3, setWidgetToken, getToken } = useCaptcha();

  const [step, setStep]         = useState(0);
  const [appState, setAppState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [cvFile, setCvFile]     = useState<File | null>(null);
  const [cvError, setCvError]   = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fields, setFields] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    position: "", experience: "",
    availability: [] as string[],
  });

  function set(field: keyof Omit<typeof fields, "availability">) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setFields((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function toggleAvailability(option: string) {
    setFields((prev) => ({
      ...prev,
      availability: prev.availability.includes(option)
        ? prev.availability.filter((a) => a !== option)
        : [...prev.availability, option],
    }));
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

  function canAdvance(): boolean {
    if (step === 0) return !!fields.firstName && !!fields.email;
    return true;
  }

  async function handleSubmit() {
    setAppState("loading"); setErrorMsg("");

    let captchaToken: string | null = null;
    if (requireCaptcha) {
      captchaToken = await getToken("apply_steps");
      if (!captchaToken) { setErrorMsg("Please complete the CAPTCHA."); setAppState("error"); return; }
    }

    try {
      const body = new FormData();
      body.append("name", `${fields.firstName} ${fields.lastName}`.trim());
      body.append("email", fields.email);
      body.append("phone", fields.phone);
      body.append("position", fields.position);
      body.append("coverLetter", [
        fields.experience    ? `Experience: ${fields.experience}` : "",
        fields.availability.length ? `Availability: ${fields.availability.join(", ")}` : "",
      ].filter(Boolean).join("\n"));
      if (captchaToken) body.append("captchaToken", captchaToken);
      if (cvFile) body.append("cv", cvFile);
      body.append("website", "");

      const res = await fetch("/api/v1/apply", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) { setErrorMsg(data.error || "Something went wrong."); setAppState("error"); }
      else { setAppState("success"); }
    } catch {
      setErrorMsg("Network error. Please try again."); setAppState("error");
    }
  }

  // ── Success — completed step pills ──
  if (appState === "success") {
    return (
      <div className="flex flex-col items-center gap-6 py-8 w-full max-w-xl mx-auto text-center">
        <div className="flex flex-wrap gap-2 justify-center">
          {STEPS.map((s) => (
            <span key={s} className="px-3 py-1.5 text-xs font-semibold rounded-full" style={{ backgroundColor: c.accentLight, color: c.accent }}>
              ✓ {s}
            </span>
          ))}
        </div>
        <div>
          <p className="text-lg font-semibold mb-1" style={{ color: c.heading }}>Application submitted</p>
          <p className="text-sm" style={{ color: c.muted }}>Thank you, {fields.firstName}. We&apos;ll be in touch shortly.</p>
        </div>
      </div>
    );
  }

  const progress = (step / (STEPS.length - 1)) * 100;
  const acceptAttr = allowedFileTypes.map((t) => `.${t}`).join(",");
  const r = { borderRadius: c.radius };

  return (
    <div className="flex flex-col gap-6 w-full max-w-xl mx-auto">
      {/* Progress bar */}
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-xs font-medium" style={{ color: c.muted }}>Step {step + 1} of {STEPS.length}</span>
          <span className="text-xs font-medium" style={{ color: c.accent }}>{STEPS[step]}</span>
        </div>
        <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: c.border }}>
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, backgroundColor: c.accent }} />
        </div>
      </div>

      <div className="flex flex-col gap-4 min-h-[220px]">

        {/* Step 0 — Personal — placeholder-only, no field labels */}
        {step === 0 && (
          <>
            <h3 className="text-lg font-semibold" style={{ color: c.heading }}>Let&apos;s start with you</h3>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" required value={fields.firstName} onChange={set("firstName")} placeholder="First name *" className="form-input" style={r} />
              <input type="text" value={fields.lastName} onChange={set("lastName")} placeholder="Last name" className="form-input" style={r} />
            </div>
            <input type="email" required value={fields.email} onChange={set("email")} placeholder="Email address *" className="form-input" style={r} />
            <input type="tel" value={fields.phone} onChange={set("phone")} placeholder="Phone (optional)" className="form-input" style={r} />
          </>
        )}

        {/* Step 1 — Role + Availability — placeholder-only */}
        {step === 1 && (
          <>
            <h3 className="text-lg font-semibold" style={{ color: c.heading }}>Role &amp; availability</h3>
            <input type="text" value={fields.position} onChange={set("position")} placeholder="Position applying for (e.g. Payroll Administrator)" className="form-input" style={r} />
            <select value={fields.experience} onChange={set("experience")} className="form-input" style={r}>
              <option value="">Years of experience…</option>
              {EXPERIENCE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: c.muted }}>Availability</p>
              <div className="flex flex-wrap gap-2">
                {AVAILABILITY_OPTIONS.map((option) => {
                  const active = fields.availability.includes(option);
                  return (
                    <button key={option} type="button" onClick={() => toggleAvailability(option)}
                      className="px-4 py-2 text-sm font-medium transition-all"
                      style={{
                        borderRadius: c.radius,
                        backgroundColor: active ? c.accent : "transparent",
                        color: active ? "#ffffff" : c.body,
                        border: `1.5px solid ${active ? c.accent : c.border}`,
                      }}>
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* Step 2 — CV */}
        {step === 2 && (
          <>
            <h3 className="text-lg font-semibold" style={{ color: c.heading }}>Upload your CV</h3>
            <p className="text-sm" style={{ color: c.muted }}>
              {allowedFileTypes.join(", ").toUpperCase()} · Max {maxFileSizeMb}MB · Optional
            </p>
            {!cvFile ? (
              <label className="form-upload-zone cursor-pointer" style={r}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: c.muted }}>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                </svg>
                <span className="text-sm" style={{ color: c.body }}>
                  Drop file here or <span style={{ color: c.accent }} className="font-medium">browse</span>
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
            {appState === "error" && <p className="px-4 py-3 text-sm text-red-600 bg-red-50" style={r}>{errorMsg}</p>}
          </>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3 pt-2" style={{ borderTop: `1px solid ${c.border}` }}>
        {step > 0 ? (
          <button type="button" onClick={() => setStep((s) => s - 1)}
            className="px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ border: `1.5px solid ${c.border}`, color: c.body, background: "transparent", borderRadius: c.radius }}>
            ← Back
          </button>
        ) : <div />}

        {step < STEPS.length - 1 ? (
          <button type="button" onClick={() => setStep((s) => s + 1)} disabled={!canAdvance()} className="form-btn disabled:opacity-40" style={r}>
            Next →
          </button>
        ) : (
          <button type="button" onClick={handleSubmit} disabled={appState === "loading"} className="form-btn" style={r}>
            {appState === "loading" ? "Submitting…" : "Submit application"}
          </button>
        )}
      </div>
    </div>
  );
}
