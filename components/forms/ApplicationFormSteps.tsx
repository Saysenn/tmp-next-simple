// Batch 2 — ApplicationFormSteps
// Layout: single centered column, progress bar top, one step visible at a time
// Style: 12–16px radius, guided prompts, Next/Back navigation, review final step
// API: /api/v1/apply
"use client";

import { useState, useRef } from "react";
import { formsConfig } from "@/configs/forms";
import { useCaptcha } from "@/hooks/useCaptcha";
import CaptchaWidget from "./CaptchaWidget";

// ─── Config ──────────────────────────────────────────────────────────────────
const EXPERIENCE_OPTIONS = ["0–1 year", "1–3 years", "3–5 years", "5–10 years", "10+ years"];
const AVAILABILITY_OPTIONS = ["Full-time", "Part-time", "Contract", "Freelance", "Temporary"];
const STEPS = ["Personal", "Role", "Availability", "Your CV", "Review"];

type FormState = "idle" | "loading" | "success" | "error";

export default function ApplicationFormSteps() {
  const { requireCaptcha, maxFileSizeMb, allowedFileTypes } = formsConfig.applicationForm;
  const { isV3, setWidgetToken, getToken } = useCaptcha();

  const [step, setStep] = useState(0);
  const [appState, setAppState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [cvFile, setCvFile]   = useState<File | null>(null);
  const [cvError, setCvError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fields, setFields] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    position: "", experience: "",
    availability: [] as string[],
    coverLetter: "",
  });

  function set(field: keyof Omit<typeof fields, "availability">) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
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
    if (step === 1) return !!fields.position;
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
        fields.experience ? `Experience: ${fields.experience}` : "",
        fields.availability.length ? `Availability: ${fields.availability.join(", ")}` : "",
        fields.coverLetter,
      ].filter(Boolean).join("\n\n"));
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

  if (appState === "success") {
    return (
      <div className="form-success">
        <div className="form-success-icon">✓</div>
        <h3 className="text-xl font-semibold" style={{ color: "var(--section-heading, var(--text-heading))" }}>Application submitted</h3>
        <p style={{ color: "var(--section-muted, var(--text-muted))" }}>Thank you, {fields.firstName}. We review every application personally.</p>
      </div>
    );
  }

  const progress = ((step) / (STEPS.length - 1)) * 100;
  const acceptAttr = allowedFileTypes.map((t) => `.${t}`).join(",");

  const inputCls = "form-input";

  return (
    <div className="flex flex-col gap-6 w-full max-w-xl mx-auto">
      {/* Progress bar */}
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-xs font-medium" style={{ color: "var(--section-muted, var(--text-muted))" }}>
            {step + 1} of {STEPS.length} completed
          </span>
          <span className="text-xs font-medium" style={{ color: "var(--section-accent, var(--accent))" }}>
            {STEPS[step]}
          </span>
        </div>
        <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--section-border, var(--border))" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, backgroundColor: "var(--section-accent, var(--accent))" }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="flex flex-col gap-5 min-h-[260px]">

        {/* Step 0 — Personal */}
        {step === 0 && (
          <>
            <h3 className="text-lg font-semibold" style={{ color: "var(--section-heading, var(--text-heading))" }}>
              Let&apos;s start with you
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="form-label">First name <span className="text-red-500">*</span></label>
                <input type="text" required value={fields.firstName} onChange={set("firstName")} placeholder="Amelia" className={inputCls} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="form-label">Last name</label>
                <input type="text" value={fields.lastName} onChange={set("lastName")} placeholder="Turner" className={inputCls} />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="form-label">Email address <span className="text-red-500">*</span></label>
              <input type="email" required value={fields.email} onChange={set("email")} placeholder="amelia@email.co.uk" className={inputCls} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="form-label">Phone number</label>
              <input type="tel" value={fields.phone} onChange={set("phone")} placeholder="+44 7700 900000" className={inputCls} />
            </div>
          </>
        )}

        {/* Step 1 — Role */}
        {step === 1 && (
          <>
            <h3 className="text-lg font-semibold" style={{ color: "var(--section-heading, var(--text-heading))" }}>
              Tell us about the role
            </h3>
            <div className="flex flex-col gap-1.5">
              <label className="form-label">Desired role <span className="text-red-500">*</span></label>
              <input type="text" required value={fields.position} onChange={set("position")} placeholder="e.g. Payroll Administrator" className={inputCls} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="form-label">Years of experience</label>
              <select value={fields.experience} onChange={set("experience")} className={inputCls}>
                <option value="">Choose a range…</option>
                {EXPERIENCE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </>
        )}

        {/* Step 2 — Availability */}
        {step === 2 && (
          <>
            <h3 className="text-lg font-semibold" style={{ color: "var(--section-heading, var(--text-heading))" }}>
              What works best for you?
            </h3>
            <p className="text-sm" style={{ color: "var(--section-muted, var(--text-muted))" }}>Select all that apply.</p>
            <div className="flex flex-wrap gap-2">
              {AVAILABILITY_OPTIONS.map((option) => {
                const active = fields.availability.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleAvailability(option)}
                    className="px-4 py-2 text-sm font-medium rounded-xl transition-all"
                    style={{
                      backgroundColor: active ? "var(--section-accent, var(--accent))" : "transparent",
                      color: active ? "#ffffff" : "var(--section-body, var(--text-body))",
                      border: `1.5px solid ${active ? "var(--section-accent, var(--accent))" : "var(--section-border, var(--border))"}`,
                    }}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <div className="flex flex-col gap-1.5 mt-2">
              <label className="form-label">Anything else? (optional)</label>
              <textarea rows={3} value={fields.coverLetter} onChange={set("coverLetter")} placeholder="Tell us why you&apos;d be a great fit…" className="form-input resize-none" />
            </div>
          </>
        )}

        {/* Step 3 — CV Upload */}
        {step === 3 && (
          <>
            <h3 className="text-lg font-semibold" style={{ color: "var(--section-heading, var(--text-heading))" }}>
              Upload your CV
            </h3>
            <p className="text-sm" style={{ color: "var(--section-muted, var(--text-muted))" }}>
              Accepted: {allowedFileTypes.join(", ").toUpperCase()} · Max {maxFileSizeMb}MB
            </p>
            {!cvFile ? (
              <label className="form-upload-zone cursor-pointer">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--section-muted, var(--text-muted))" }}>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                </svg>
                <span className="text-sm" style={{ color: "var(--section-body, var(--text-body))" }}>
                  Drop file here or <span style={{ color: "var(--section-accent, var(--accent))" }} className="font-medium">browse</span>
                </span>
                <input ref={fileInputRef} type="file" accept={acceptAttr} onChange={handleFileChange} className="hidden" />
              </label>
            ) : (
              <div className="form-file-pill">
                <span className="text-sm font-medium truncate" style={{ color: "var(--section-heading, var(--text-heading))" }}>{cvFile.name}</span>
                <button type="button" onClick={() => { setCvFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }} className="text-xs shrink-0" style={{ color: "var(--section-muted, var(--text-muted))" }}>✕ Remove</button>
              </div>
            )}
            {cvError && <p className="text-xs text-red-500">{cvError}</p>}
          </>
        )}

        {/* Step 4 — Review */}
        {step === 4 && (
          <>
            <h3 className="text-lg font-semibold" style={{ color: "var(--section-heading, var(--text-heading))" }}>
              Review your application
            </h3>
            <div className="flex flex-col gap-3 text-sm">
              {[
                { label: "Name",         value: `${fields.firstName} ${fields.lastName}`.trim() },
                { label: "Email",        value: fields.email },
                { label: "Phone",        value: fields.phone || "—" },
                { label: "Role",         value: fields.position || "—" },
                { label: "Experience",   value: fields.experience || "—" },
                { label: "Availability", value: fields.availability.join(", ") || "—" },
                { label: "CV",           value: cvFile?.name || "Not uploaded" },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-3">
                  <span className="w-28 shrink-0 font-medium" style={{ color: "var(--section-muted, var(--text-muted))" }}>{label}</span>
                  <span style={{ color: "var(--section-heading, var(--text-heading))" }}>{value}</span>
                </div>
              ))}
            </div>

            {requireCaptcha && !isV3 && <CaptchaWidget onVerify={setWidgetToken} onExpire={() => setWidgetToken(null)} />}
            {appState === "error" && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{errorMsg}</p>}
          </>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3 pt-2" style={{ borderTop: "1px solid var(--section-border, var(--border))" }}>
        {step > 0 ? (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="px-5 py-2.5 text-sm font-medium rounded-xl transition-opacity hover:opacity-70" style={{ border: "1.5px solid var(--section-border, var(--border))", color: "var(--section-body, var(--text-body))", background: "transparent" }}>
            ← Back
          </button>
        ) : <div />}

        {step < STEPS.length - 1 ? (
          <button type="button" onClick={() => setStep((s) => s + 1)} disabled={!canAdvance()} className="form-btn disabled:opacity-40">
            Next →
          </button>
        ) : (
          <button type="button" onClick={handleSubmit} disabled={appState === "loading"} className="form-btn">
            {appState === "loading" ? "Submitting…" : "Submit application"}
          </button>
        )}
      </div>
    </div>
  );
}
