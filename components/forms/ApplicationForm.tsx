"use client";

import { useState, FormEvent, useRef } from "react";
import { formsConfig } from "@/configs/forms";
import { useCaptcha } from "@/hooks/useCaptcha";
import CaptchaWidget from "./CaptchaWidget";

type FormState = "idle" | "loading" | "success" | "error";

export default function ApplicationForm() {
  const { showPhone, showPosition, showCoverLetter, requireCaptcha, maxFileSizeMb, allowedFileTypes } =
    formsConfig.applicationForm;
  const { isV3, setWidgetToken, getToken } = useCaptcha();

  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fields, setFields] = useState({ name: "", email: "", phone: "", position: "", coverLetter: "" });

  function set(field: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setCvError("");
    if (!file) { setCvFile(null); return; }
    if (file.size > maxFileSizeMb * 1024 * 1024) {
      setCvError(`File must be under ${maxFileSizeMb}MB.`);
      setCvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!allowedFileTypes.includes(ext as "pdf" | "doc" | "docx")) {
      setCvError(`Accepted formats: ${allowedFileTypes.join(", ").toUpperCase()}.`);
      setCvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setCvFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0] ?? null;
    if (!file) return;
    setCvError("");
    if (file.size > maxFileSizeMb * 1024 * 1024) { setCvError(`File must be under ${maxFileSizeMb}MB.`); return; }
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!allowedFileTypes.includes(ext as "pdf" | "doc" | "docx")) { setCvError(`Accepted: ${allowedFileTypes.join(", ").toUpperCase()}.`); return; }
    setCvFile(file);
  }

  function removeFile() {
    setCvFile(null);
    setCvError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (cvError) return;
    setState("loading");
    setErrorMsg("");

    let captchaToken: string | null = null;
    if (requireCaptcha) {
      captchaToken = await getToken("application_form");
      if (!captchaToken) {
        setErrorMsg("Please complete the CAPTCHA before submitting.");
        setState("error");
        return;
      }
    }

    try {
      const body = new FormData();
      body.append("name", fields.name);
      body.append("email", fields.email);
      if (showPhone) body.append("phone", fields.phone);
      if (showPosition) body.append("position", fields.position);
      if (showCoverLetter) body.append("coverLetter", fields.coverLetter);
      if (captchaToken) body.append("captchaToken", captchaToken);
      if (cvFile) body.append("cv", cvFile);
      body.append("website", "");

      const res = await fetch("/api/v1/apply", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setState("error");
      } else {
        setState("success");
        setFields({ name: "", email: "", phone: "", position: "", coverLetter: "" });
        setCvFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        setWidgetToken(null);
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="form-success">
        <div className="form-success-icon">✓</div>
        <h3 className="text-xl font-semibold" style={{ color: "var(--section-heading, var(--text-heading))" }}>
          Application submitted
        </h3>
        <p style={{ color: "var(--section-muted, var(--text-muted))" }}>
          Thank you for applying. We&apos;ll be in touch shortly.
        </p>
        <button
          onClick={() => setState("idle")}
          className="mt-2 text-sm font-medium underline underline-offset-4"
          style={{ color: "var(--section-accent, var(--accent))" }}
        >
          Submit another application
        </button>
      </div>
    );
  }

  const acceptAttr = allowedFileTypes.map((t) => `.${t}`).join(",");

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <input type="text" name="website" className="hidden" aria-hidden="true" tabIndex={-1} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="af-name" className="form-label">Full name <span className="text-red-500">*</span></label>
          <input id="af-name" type="text" required value={fields.name} onChange={set("name")} placeholder="Jane Smith" className="form-input" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="af-email" className="form-label">Email address <span className="text-red-500">*</span></label>
          <input id="af-email" type="email" required value={fields.email} onChange={set("email")} placeholder="jane@company.com" className="form-input" />
        </div>
      </div>

      {(showPhone || showPosition) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {showPhone && (
            <div className="flex flex-col gap-1.5">
              <label htmlFor="af-phone" className="form-label">
                Phone <span className="font-normal" style={{ color: "var(--section-muted, var(--text-muted))" }}>(optional)</span>
              </label>
              <input id="af-phone" type="tel" value={fields.phone} onChange={set("phone")} placeholder="+44 7700 900000" className="form-input" />
            </div>
          )}
          {showPosition && (
            <div className="flex flex-col gap-1.5">
              <label htmlFor="af-position" className="form-label">
                Position <span className="font-normal" style={{ color: "var(--section-muted, var(--text-muted))" }}>(optional)</span>
              </label>
              <input id="af-position" type="text" value={fields.position} onChange={set("position")} placeholder="e.g. Senior Designer" className="form-input" />
            </div>
          )}
        </div>
      )}

      {/* CV upload */}
      <div className="flex flex-col gap-1.5">
        <label className="form-label">
          CV / Résumé{" "}
          <span className="font-normal" style={{ color: "var(--section-muted, var(--text-muted))" }}>
            (optional, {allowedFileTypes.join(", ").toUpperCase()}, max {maxFileSizeMb}MB)
          </span>
        </label>

        {!cvFile ? (
          <label
            htmlFor="af-cv"
            className={`form-upload-zone${isDragOver ? " drag-over" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--section-muted, var(--text-muted))" }}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <span className="text-sm" style={{ color: "var(--section-body, var(--text-body))" }}>
              Drag & drop or <span style={{ color: "var(--section-accent, var(--accent))" }} className="font-medium">browse</span>
            </span>
            <span className="text-xs" style={{ color: "var(--section-muted, var(--text-muted))" }}>
              {allowedFileTypes.join(", ").toUpperCase()} · Max {maxFileSizeMb}MB
            </span>
            <input id="af-cv" ref={fileInputRef} type="file" accept={acceptAttr} onChange={handleFileChange} className="hidden" />
          </label>
        ) : (
          <div className="form-file-pill">
            <div className="flex items-center gap-2 min-w-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--section-accent, var(--accent))", flexShrink: 0 }}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span className="text-sm font-medium truncate" style={{ color: "var(--section-heading, var(--text-heading))" }}>{cvFile.name}</span>
              <span className="text-xs shrink-0" style={{ color: "var(--section-muted, var(--text-muted))" }}>
                {(cvFile.size / 1024 / 1024).toFixed(1)}MB
              </span>
            </div>
            <button type="button" onClick={removeFile} className="shrink-0 text-xs transition hover:text-red-500" style={{ color: "var(--section-muted, var(--text-muted))" }} aria-label="Remove file">
              ✕ Remove
            </button>
          </div>
        )}
        {cvError && <p className="text-xs text-red-500 mt-1">{cvError}</p>}
      </div>

      {showCoverLetter && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="af-cover" className="form-label">
            Cover letter <span className="font-normal" style={{ color: "var(--section-muted, var(--text-muted))" }}>(optional)</span>
          </label>
          <textarea id="af-cover" rows={5} value={fields.coverLetter} onChange={set("coverLetter")} placeholder="Tell us why you'd be a great fit…" className="form-input resize-none" />
        </div>
      )}

      {requireCaptcha && !isV3 && (
        <CaptchaWidget onVerify={setWidgetToken} onExpire={() => setWidgetToken(null)} />
      )}

      {state === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{errorMsg}</p>
      )}

      <button type="submit" disabled={state === "loading" || !!cvError} className="form-btn mt-2">
        {state === "loading" ? "Submitting…" : "Submit application"}
      </button>
    </form>
  );
}
