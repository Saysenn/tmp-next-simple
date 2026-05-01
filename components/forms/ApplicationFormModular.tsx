// Batch 2 — ApplicationFormModular
// Layout: card grid — each card = one independent section, free-order completion
// Style: 18–24px radius cards with elevation, completion badge per card, tech/modern tone
// API: /api/v1/apply
"use client";

import { useState, useRef } from "react";
import { formsConfig } from "@/configs/forms";
import { useCaptcha } from "@/hooks/useCaptcha";
import CaptchaWidget from "./CaptchaWidget";

// ─── Config ──────────────────────────────────────────────────────────────────
const SKILL_CHIPS    = ["Payroll", "HR Admin", "Compliance", "Recruitment", "Data Entry", "Customer Service", "Excel", "Sage", "Xero", "HMRC", "IR35"];
const SALARY_STEPS   = ["£20k–£25k", "£25k–£30k", "£30k–£40k", "£40k–£50k", "£50k–£65k", "£65k+"];

type FormState = "idle" | "loading" | "success" | "error";

function ModuleCard({
  title, icon, complete, children,
}: { title: string; icon: React.ReactNode; complete: boolean; children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col gap-4 p-6 transition-shadow"
      style={{
        borderRadius: 20,
        border: `1.5px solid ${complete ? "var(--section-accent, var(--accent))" : "var(--section-border, var(--border))"}`,
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        backgroundColor: "var(--section-bg, #ffffff)",
        position: "relative",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span style={{ color: "var(--section-accent, var(--accent))" }}>{icon}</span>
          <span className="text-sm font-semibold" style={{ color: "var(--section-heading, var(--text-heading))" }}>{title}</span>
        </div>
        {complete && (
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: "var(--section-accent-light, var(--accent-light))", color: "var(--section-accent, var(--accent))" }}
          >
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
  const [salary, setSalary]   = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fields, setFields] = useState({ name: "", email: "", portfolio: "", github: "", position: "" });

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

  const profileComplete  = !!fields.name && !!fields.email;
  const skillsComplete   = selectedSkills.length > 0;
  const linksComplete    = !!fields.portfolio || !!fields.github;
  const salaryComplete   = !!salary;
  const cvComplete       = !!cvFile;
  const completedCount   = [profileComplete, skillsComplete, linksComplete, salaryComplete, cvComplete].filter(Boolean).length;

  async function handleSubmit() {
    if (!profileComplete) { setErrorMsg("Please complete your profile — name and email are required."); setAppState("error"); return; }
    setAppState("loading"); setErrorMsg("");

    let captchaToken: string | null = null;
    if (requireCaptcha) {
      captchaToken = await getToken("apply_modular");
      if (!captchaToken) { setErrorMsg("Please complete the CAPTCHA."); setAppState("error"); return; }
    }

    const coverLetter = [
      selectedSkills.length ? `Skills: ${selectedSkills.join(", ")}` : "",
      fields.portfolio ? `Portfolio: ${fields.portfolio}` : "",
      fields.github    ? `GitHub: ${fields.github}` : "",
      salary           ? `Salary expectation: ${salary}` : "",
    ].filter(Boolean).join("\n");

    try {
      const body = new FormData();
      body.append("name", fields.name);
      body.append("email", fields.email);
      body.append("phone", "");
      body.append("position", fields.position);
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

  if (appState === "success") {
    return (
      <div className="form-success">
        <div className="form-success-icon">✓</div>
        <h3 className="text-xl font-semibold" style={{ color: "var(--section-heading, var(--text-heading))" }}>Application sent!</h3>
        <p style={{ color: "var(--section-muted, var(--text-muted))" }}>Thanks {fields.name.split(" ")[0]}. We&apos;ll be in touch.</p>
      </div>
    );
  }

  const inputCls = "form-input";
  const acceptAttr = allowedFileTypes.map((t) => `.${t}`).join(",");

  const PersonIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
  );
  const StarIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  );
  const LinkIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
  );
  const PoundIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  );
  const FileIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Progress summary */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-sm font-medium" style={{ color: "var(--section-heading, var(--text-heading))" }}>
          {completedCount} of 5 sections complete
        </p>
        <div className="flex gap-1.5">
          {[profileComplete, skillsComplete, linksComplete, salaryComplete, cvComplete].map((done, i) => (
            <div key={i} className="w-6 h-1.5 rounded-full transition-colors" style={{ backgroundColor: done ? "var(--section-accent, var(--accent))" : "var(--section-border, var(--border))" }} />
          ))}
        </div>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Card 1 — Profile */}
        <ModuleCard title="Profile" icon={<PersonIcon />} complete={profileComplete}>
          <input type="text" required value={fields.name} onChange={set("name")} placeholder="Jane Smith" className={inputCls} style={{ borderRadius: 12 }} />
          <input type="email" required value={fields.email} onChange={set("email")} placeholder="jane@company.co.uk" className={inputCls} style={{ borderRadius: 12 }} />
          <input type="text" value={fields.position} onChange={set("position")} placeholder="Role applying for (optional)" className={inputCls} style={{ borderRadius: 12 }} />
        </ModuleCard>

        {/* Card 2 — Skills */}
        <ModuleCard title="Skills" icon={<StarIcon />} complete={skillsComplete}>
          <p className="text-xs" style={{ color: "var(--section-muted, var(--text-muted))" }}>Select all that apply</p>
          <div className="flex flex-wrap gap-2">
            {SKILL_CHIPS.map((skill) => {
              const active = selectedSkills.includes(skill);
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className="px-3 py-1 text-xs font-medium rounded-full transition-all"
                  style={{
                    backgroundColor: active ? "var(--section-accent, var(--accent))" : "transparent",
                    color: active ? "#ffffff" : "var(--section-body, var(--text-body))",
                    border: `1px solid ${active ? "var(--section-accent, var(--accent))" : "var(--section-border, var(--border))"}`,
                  }}
                >
                  {skill}
                </button>
              );
            })}
          </div>
        </ModuleCard>

        {/* Card 3 — Work links */}
        <ModuleCard title="Work links" icon={<LinkIcon />} complete={linksComplete}>
          <input type="url" value={fields.portfolio} onChange={set("portfolio")} placeholder="e.g. yourportfolio.co.uk" className={inputCls} style={{ borderRadius: 12 }} />
          <input type="url" value={fields.github} onChange={set("github")} placeholder="e.g. github.com/username" className={inputCls} style={{ borderRadius: 12 }} />
        </ModuleCard>

        {/* Card 4 — Compensation */}
        <ModuleCard title="Salary expectation" icon={<PoundIcon />} complete={salaryComplete}>
          <p className="text-xs" style={{ color: "var(--section-muted, var(--text-muted))" }}>Select a range</p>
          <div className="flex flex-col gap-2">
            {SALARY_STEPS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSalary(s)}
                className="text-left px-3 py-2 text-sm rounded-xl transition-all"
                style={{
                  backgroundColor: salary === s ? "var(--section-accent, var(--accent))" : "transparent",
                  color: salary === s ? "#ffffff" : "var(--section-body, var(--text-body))",
                  border: `1px solid ${salary === s ? "var(--section-accent, var(--accent))" : "var(--section-border, var(--border))"}`,
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </ModuleCard>
      </div>

      {/* Full-width CV card */}
      <ModuleCard title="CV / Résumé" icon={<FileIcon />} complete={cvComplete}>
        {cvFile ? (
          <div className="form-file-pill">
            <span className="text-sm font-medium truncate" style={{ color: "var(--section-heading, var(--text-heading))" }}>{cvFile.name}</span>
            <button type="button" onClick={() => { setCvFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }} className="text-xs shrink-0" style={{ color: "var(--section-muted, var(--text-muted))" }}>✕ Remove</button>
          </div>
        ) : (
          <label className="form-upload-zone cursor-pointer" style={{ borderRadius: 16 }}>
            <span className="text-sm" style={{ color: "var(--section-body, var(--text-body))" }}>
              Drop your CV here or <span style={{ color: "var(--section-accent, var(--accent))" }} className="font-medium">browse</span>
            </span>
            <span className="text-xs" style={{ color: "var(--section-muted, var(--text-muted))" }}>
              {allowedFileTypes.join(", ").toUpperCase()} · Max {maxFileSizeMb}MB
            </span>
            <input ref={fileInputRef} type="file" accept={acceptAttr} onChange={handleFileChange} className="hidden" />
          </label>
        )}
        {cvError && <p className="text-xs text-red-500">{cvError}</p>}
      </ModuleCard>

      {requireCaptcha && !isV3 && <CaptchaWidget onVerify={setWidgetToken} onExpire={() => setWidgetToken(null)} />}
      {appState === "error" && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{errorMsg}</p>}

      {/* Submit */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={appState === "loading" || !profileComplete}
        className="form-btn disabled:opacity-40"
        style={{ borderRadius: 14 }}
      >
        {appState === "loading" ? "Submitting…" : `Submit application${completedCount < 5 ? ` (${completedCount}/5 sections)` : ""}`}
      </button>
    </div>
  );
}
