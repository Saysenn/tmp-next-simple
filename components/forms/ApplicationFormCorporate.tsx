// Batch 2 — ApplicationFormCorporate
// Layout: 60/40 split — grouped input sections left, sticky company info panel right
// Style: sharp 2px borders, section dividers, formal HR tone
// API: /api/v1/apply
"use client";

import { useState, FormEvent, useRef } from "react";
import { formsConfig } from "@/configs/forms";
import { companyInfo } from "@/configs/footer";
import { useCaptcha } from "@/hooks/useCaptcha";
import CaptchaWidget from "./CaptchaWidget";

// ─── Config ──────────────────────────────────────────────────────────────────
const NOTICE_OPTIONS = ["Immediate", "1 week", "2 weeks", "1 month", "2 months", "3 months+"];

// ─── Colours — change any value here to retheme this form independently ──────
const c = {
  accent:  "var(--section-accent, var(--accent))",
  heading: "var(--section-heading, var(--text-heading))",
  body:    "var(--section-body, var(--text-body))",
  muted:   "var(--section-muted, var(--text-muted))",
  border:  "var(--section-border, var(--border))",
  radius:  "2px",   // sharp, corporate compliance
};

type FormState = "idle" | "loading" | "success" | "error";

function SectionHeading({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: c.muted }}>{label}</span>
      <div className="flex-1" style={{ height: 1, backgroundColor: c.border }} />
    </div>
  );
}

export default function ApplicationFormCorporate() {
  const { requireCaptcha, maxFileSizeMb, allowedFileTypes } = formsConfig.applicationForm;
  const { isV3, setWidgetToken, getToken } = useCaptcha();

  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [cvFile, setCvFile]   = useState<File | null>(null);
  const [cvError, setCvError] = useState("");
  const cvRef = useRef<HTMLInputElement>(null);

  const [fields, setFields] = useState({ firstName: "", lastName: "", email: "", phone: "", position: "", employer: "", notice: "" });

  function set(field: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setFields((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleCvChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setCvError("");
    if (!file) { setCvFile(null); return; }
    if (file.size > maxFileSizeMb * 1024 * 1024) { setCvError(`Max ${maxFileSizeMb}MB.`); setCvFile(null); return; }
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!allowedFileTypes.includes(ext as "pdf" | "doc" | "docx")) { setCvError(`Accepted: ${allowedFileTypes.join(", ").toUpperCase()}.`); setCvFile(null); return; }
    setCvFile(file);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (cvError) return;
    setState("loading"); setErrorMsg("");

    let captchaToken: string | null = null;
    if (requireCaptcha) {
      captchaToken = await getToken("apply_corporate");
      if (!captchaToken) { setErrorMsg("Please complete the CAPTCHA."); setState("error"); return; }
    }

    const context = [
      fields.employer ? `Current employer: ${fields.employer}` : "",
      fields.notice   ? `Notice period: ${fields.notice}` : "",
    ].filter(Boolean).join("\n");

    try {
      const body = new FormData();
      body.append("name", `${fields.firstName} ${fields.lastName}`.trim());
      body.append("email", fields.email);
      body.append("phone", fields.phone);
      body.append("position", fields.position);
      body.append("coverLetter", context);
      if (captchaToken) body.append("captchaToken", captchaToken);
      if (cvFile) body.append("cv", cvFile);
      body.append("website", "");

      const res = await fetch("/api/v1/apply", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) { setErrorMsg(data.error || "Something went wrong."); setState("error"); }
      else {
        setState("success");
        setFields({ firstName: "", lastName: "", email: "", phone: "", position: "", employer: "", notice: "" });
        setCvFile(null); if (cvRef.current) cvRef.current.value = "";
        setWidgetToken(null);
      }
    } catch {
      setErrorMsg("Network error. Please try again."); setState("error");
    }
  }

  // ── Success ──
  if (state === "success") {
    return (
      <div className="form-success">
        <div className="form-success-icon">✓</div>
        <h3 className="text-xl font-semibold" style={{ color: c.heading }}>Application submitted</h3>
        <p style={{ color: c.muted }}>We review every application personally and will be in touch shortly.</p>
        <button onClick={() => setState("idle")} className="mt-2 text-sm font-medium underline underline-offset-4" style={{ color: c.accent }}>Submit another</button>
      </div>
    );
  }

  const acceptAttr = allowedFileTypes.map((t) => `.${t}`).join(",");
  const r = { borderRadius: c.radius };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
      {/* Left — form */}
      <form onSubmit={handleSubmit} className="lg:col-span-3 flex flex-col gap-8" noValidate>
        <input type="text" name="website" className="hidden" aria-hidden="true" tabIndex={-1} />

        {/* A. Identity */}
        <div>
          <SectionHeading label="A — Identity" />
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="form-label">First name <span className="text-red-500">*</span></label>
              <input type="text" required value={fields.firstName} onChange={set("firstName")} placeholder="Oliver" className="form-input" style={r} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="form-label">Last name <span className="text-red-500">*</span></label>
              <input type="text" required value={fields.lastName} onChange={set("lastName")} placeholder="Smith" className="form-input" style={r} />
            </div>
          </div>
        </div>

        {/* B. Contact */}
        <div>
          <SectionHeading label="B — Contact" />
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="form-label">Email <span className="text-red-500">*</span></label>
              <input type="email" required value={fields.email} onChange={set("email")} placeholder="oliver.smith@gmail.com" className="form-input" style={r} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="form-label">Phone</label>
              <input type="tel" value={fields.phone} onChange={set("phone")} placeholder="+44 7700 900123" className="form-input" style={r} />
            </div>
          </div>
        </div>

        {/* C. Employment */}
        <div>
          <SectionHeading label="C — Employment" />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="form-label">Position applied for</label>
              <input type="text" value={fields.position} onChange={set("position")} placeholder="e.g. Payroll Administrator" className="form-input" style={r} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="form-label">Current employer</label>
                <input type="text" value={fields.employer} onChange={set("employer")} placeholder="Company name" className="form-input" style={r} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="form-label">Notice period</label>
                <select value={fields.notice} onChange={set("notice")} className="form-input" style={r}>
                  <option value="">Select…</option>
                  {NOTICE_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* D. CV */}
        <div>
          <SectionHeading label="D — CV" />
          {cvFile ? (
            <div className="form-file-pill">
              <span className="text-sm" style={{ color: c.heading }}>{cvFile.name}</span>
              <button type="button" onClick={() => { setCvFile(null); if (cvRef.current) cvRef.current.value = ""; }} className="text-xs" style={{ color: c.muted }}>✕ Remove</button>
            </div>
          ) : (
            <label className="form-upload-zone cursor-pointer" style={r}>
              <span className="text-sm" style={{ color: c.body }}>
                Drop CV here or <span style={{ color: c.accent }} className="font-medium">browse</span>
              </span>
              <span className="text-xs" style={{ color: c.muted }}>{allowedFileTypes.join(", ").toUpperCase()} · Max {maxFileSizeMb}MB</span>
              <input ref={cvRef} type="file" accept={acceptAttr} onChange={handleCvChange} className="hidden" />
            </label>
          )}
          {cvError && <p className="text-xs text-red-500 mt-2">{cvError}</p>}
        </div>

        {requireCaptcha && !isV3 && <CaptchaWidget onVerify={setWidgetToken} onExpire={() => setWidgetToken(null)} />}
        {state === "error" && <p className="px-4 py-3 text-sm text-red-600 bg-red-50" style={r}>{errorMsg}</p>}

        <button type="submit" disabled={state === "loading" || !!cvError} className="form-btn" style={r}>
          {state === "loading" ? "Submitting…" : "Submit application"}
        </button>
      </form>

      {/* Right — sticky panel */}
      <aside className="lg:col-span-2 lg:sticky lg:top-24 flex flex-col gap-6 p-6" style={{ border: `1px solid ${c.border}`, borderRadius: c.radius }}>
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: c.muted }}>Why join us</p>
          <p className="text-sm leading-relaxed" style={{ color: c.body }}>
            We review every application personally. Our team is committed to fair, transparent recruitment.
          </p>
        </div>
        <div style={{ height: 1, backgroundColor: c.border }} />
        <div className="flex flex-col gap-3">
          {companyInfo.phone && (
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: c.muted }}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.15a16 16 0 006.94 6.94l1.49-1.52a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              <span className="text-sm" style={{ color: c.body }}>{companyInfo.phone}</span>
            </div>
          )}
          {companyInfo.email && (
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: c.muted }}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
              <span className="text-sm" style={{ color: c.body }}>{companyInfo.email}</span>
            </div>
          )}
          {companyInfo.address && (
            <div className="flex items-start gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5" style={{ color: c.muted, flexShrink: 0 }}><path d="M12 21C12 21 5 13.5 5 8.5a7 7 0 0114 0c0 5-7 12.5-7 12.5z"/><circle cx="12" cy="8.5" r="2.5"/></svg>
              <span className="text-sm leading-snug" style={{ color: c.body }}>{companyInfo.address}</span>
            </div>
          )}
        </div>
        <div style={{ height: 1, backgroundColor: c.border }} />
        <p className="text-xs leading-relaxed" style={{ color: c.muted }}>All applications are treated in strict confidence.</p>
      </aside>
    </div>
  );
}
