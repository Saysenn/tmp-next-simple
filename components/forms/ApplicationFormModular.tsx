// Batch 2 — ApplicationFormModular
// Layout: card grid — 3 cards (Profile, Skills, CV), free-order completion
// Style: 20px radius cards with elevation, completion badge per card, tech/modern tone
// API: /api/v1/apply
"use client";

import { useState, useRef } from "react";
import { formsConfig } from "@/configs/forms";
import { useCaptcha } from "@/hooks/useCaptcha";
import CaptchaWidget from "./CaptchaWidget";

// ─── Config ──────────────────────────────────────────────────────────────────
const SKILL_CHIPS = ["Payroll", "HR Admin", "Compliance", "Recruitment", "Data Entry", "Customer Service", "Excel", "Sage", "Xero", "HMRC", "IR35"];

// ─── Colours — change any value here to retheme this form independently ──────
const c = {
  accent:      "var(--section-accent, var(--accent))",
  accentLight: "var(--section-accent-light, var(--accent-light))",
  heading:     "var(--section-heading, var(--text-heading))",
  body:        "var(--section-body, var(--text-body))",
  muted:       "var(--section-muted, var(--text-muted))",
  border:      "var(--section-border, var(--border))",
  cardBg:      "var(--section-bg, var(--bg-base))",
  radius:      "20px",   // very rounded — modern card feel
};

type FormState = "idle" | "loading" | "success" | "error";

function ModuleCard({
  title, icon, complete, children,
}: { title: string; icon: React.ReactNode; complete: boolean; children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col gap-4 p-6 transition-shadow"
      style={{
        borderRadius: c.radius,
        border: `1.5px solid ${complete ? c.accent : c.border}`,
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        backgroundColor: c.cardBg,
        position: "relative",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span style={{ color: c.accent }}>{icon}</span>
          <span className="text-sm font-semibold" style={{ color: c.heading }}>{title}</span>
        </div>
        {complete && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: c.accentLight, color: c.accent }}>
            ✓ Done
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

export default function ApplicationFormModular() {
  const { requireCaptcha, maxFileSizeMb, allowedFileTypes } = formsConfig.applicationForm;
  const { isV3, setWidgetToken, getToken } = useCaptcha();

  const [appState, setAppState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [cvFile, setCvFile]   = useState<File | null>(null);
  const [cvError, setCvError] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fields, setFields] = useState({ name: "", email: "", position: "" });

  function set(field: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement>) => setFields((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function toggleSkill(skill: string) {
    setSelectedSkills((prev) => prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]);
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

  const profileComplete = !!fields.name && !!fields.email;
  const skillsComplete  = selectedSkills.length > 0;
  const cvComplete      = !!cvFile;
  const completedCount  = [profileComplete, skillsComplete, cvComplete].filter(Boolean).length;

  async function handleSubmit() {
    if (!profileComplete) { setErrorMsg("Please complete your profile — name and email are required."); setAppState("error"); return; }
    setAppState("loading"); setErrorMsg("");

    let captchaToken: string | null = null;
    if (requireCaptcha) {
      captchaToken = await getToken("apply_modular");
      if (!captchaToken) { setErrorMsg("Please complete the CAPTCHA."); setAppState("error"); return; }
    }

    const coverLetter = selectedSkills.length ? `Skills: ${selectedSkills.join(", ")}` : "";

    try {
      const body = new FormData();
      body.append("name", fields.name);
      body.append("email", fields.email);
      body.append("phone", "");
      body.append("position", fields.position || "");
      body.append("coverLetter", coverLetter);
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

  // ── Success — completion badge row ──
  if (appState === "success") {
    return (
      <div className="flex flex-col items-center gap-6 py-10 text-center">
        <div className="flex flex-wrap gap-3 justify-center">
          {["Profile", "Skills", "CV"].map((label) => (
            <div key={label} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold" style={{ borderRadius: c.radius, backgroundColor: c.accentLight, color: c.accent, border: `1.5px solid ${c.accent}` }}>
              ✓ {label}
            </div>
          ))}
        </div>
        <p className="text-lg font-semibold" style={{ color: c.heading }}>Application sent</p>
        <p className="text-sm" style={{ color: c.muted }}>Thanks {fields.name.split(" ")[0]}. We&apos;ll be in touch.</p>
      </div>
    );
  }

  const inputCls = "form-input";
  const acceptAttr = allowedFileTypes.map((t) => `.${t}`).join(",");
  const cardRadius = { borderRadius: "12px" };

  const PersonIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>;
  const StarIcon   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
  const FileIcon   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;

  return (
    <div className="flex flex-col gap-6">
      {/* Progress summary */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-sm font-medium" style={{ color: c.heading }}>{completedCount} of 3 sections complete</p>
        <div className="flex gap-1.5">
          {[profileComplete, skillsComplete, cvComplete].map((done, i) => (
            <div key={i} className="w-6 h-1.5 rounded-full transition-colors" style={{ backgroundColor: done ? c.accent : c.border }} />
          ))}
        </div>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ModuleCard title="Profile" icon={<PersonIcon />} complete={profileComplete}>
          <input type="text" required value={fields.name} onChange={set("name")} placeholder="Jane Smith" className={inputCls} style={cardRadius} />
          <input type="email" required value={fields.email} onChange={set("email")} placeholder="jane@company.co.uk" className={inputCls} style={cardRadius} />
          <input type="text" value={fields.position} onChange={set("position")} placeholder="Role applying for (optional)" className={inputCls} style={cardRadius} />
        </ModuleCard>

        <ModuleCard title="Skills" icon={<StarIcon />} complete={skillsComplete}>
          <p className="text-xs" style={{ color: c.muted }}>Select all that apply</p>
          <div className="flex flex-wrap gap-2">
            {SKILL_CHIPS.map((skill) => {
              const active = selectedSkills.includes(skill);
              return (
                <button key={skill} type="button" onClick={() => toggleSkill(skill)}
                  className="px-3 py-1 text-xs font-medium rounded-full transition-all"
                  style={{
                    backgroundColor: active ? c.accent : "transparent",
                    color: active ? "#ffffff" : c.body,
                    border: `1px solid ${active ? c.accent : c.border}`,
                  }}>
                  {skill}
                </button>
              );
            })}
          </div>
        </ModuleCard>
      </div>

      {/* Full-width CV card */}
      <ModuleCard title="CV / Résumé" icon={<FileIcon />} complete={cvComplete}>
        {cvFile ? (
          <div className="form-file-pill">
            <span className="text-sm font-medium truncate" style={{ color: c.heading }}>{cvFile.name}</span>
            <button type="button" onClick={() => { setCvFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }} className="text-xs shrink-0" style={{ color: c.muted }}>✕ Remove</button>
          </div>
        ) : (
          <label className="form-upload-zone cursor-pointer" style={{ borderRadius: 16 }}>
            <span className="text-sm" style={{ color: c.body }}>
              Drop your CV here or <span style={{ color: c.accent }} className="font-medium">browse</span>
            </span>
            <span className="text-xs" style={{ color: c.muted }}>{allowedFileTypes.join(", ").toUpperCase()} · Max {maxFileSizeMb}MB</span>
            <input ref={fileInputRef} type="file" accept={acceptAttr} onChange={handleFileChange} className="hidden" />
          </label>
        )}
        {cvError && <p className="text-xs text-red-500">{cvError}</p>}
      </ModuleCard>

      {requireCaptcha && !isV3 && <CaptchaWidget onVerify={setWidgetToken} onExpire={() => setWidgetToken(null)} />}
      {appState === "error" && <p className="px-4 py-3 text-sm text-red-600 bg-red-50" style={{ borderRadius: c.radius }}>{errorMsg}</p>}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={appState === "loading" || !profileComplete}
        className="form-btn disabled:opacity-40"
        style={{ borderRadius: c.radius }}
      >
        {appState === "loading" ? "Submitting…" : `Submit application${completedCount < 3 ? ` (${completedCount}/3 sections)` : ""}`}
      </button>
    </div>
  );
}
