// Batch 2 — ApplicationFormEditorial
// Layout: full-width single column, luxury vertical rhythm, inputs far apart
// Style: 0px radius, underline-only inputs, serif headline, minimal UI, submit-only validation
// API: /api/v1/apply
"use client";

import { useState, FormEvent, useRef } from "react";
import { formsConfig } from "@/configs/forms";
import { useCaptcha } from "@/hooks/useCaptcha";
import CaptchaWidget from "./CaptchaWidget";

// ─── Config ──────────────────────────────────────────────────────────────────
const ROLE_HINTS = ["What role are you applying for?", "e.g. Senior Payroll Specialist"];

type FormState = "idle" | "loading" | "success" | "error";

function EditorialInput({
  label, value, onChange, placeholder, type = "text", focused, onFocus, onBlur, multiline,
}: {
  label?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string; type?: string;
  focused: boolean; onFocus: () => void; onBlur: () => void;
  multiline?: boolean;
}) {
  const base: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focused ? "var(--section-accent, var(--accent))" : "var(--section-border, var(--border))"}`,
    color: "var(--section-heading, var(--text-heading))",
    fontSize: "1.0625rem",
    fontFamily: "inherit",
    outline: "none",
    padding: "8px 0 12px",
    transition: "border-color 0.25s",
    display: "block",
    resize: "none",
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <span style={{ fontSize: "0.6875rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--section-muted, var(--text-muted))" }}>
          {label}
        </span>
      )}
      {multiline ? (
        <textarea rows={5} value={value} onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>} placeholder={placeholder} onFocus={onFocus} onBlur={onBlur} style={base} />
      ) : (
        <input type={type} value={value} onChange={onChange as React.ChangeEventHandler<HTMLInputElement>} placeholder={placeholder} onFocus={onFocus} onBlur={onBlur} style={base} />
      )}
    </div>
  );
}

export default function ApplicationFormEditorial() {
  const { requireCaptcha, maxFileSizeMb, allowedFileTypes } = formsConfig.applicationForm;
  const { isV3, setWidgetToken, getToken } = useCaptcha();

  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [focused, setFocused] = useState<string | null>(null);
  const [cvFile, setCvFile]   = useState<File | null>(null);
  const [cvError, setCvError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fields, setFields] = useState({ name: "", email: "", phone: "", linkedin: "", position: "", statement: "" });

  function set(field: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((prev) => ({ ...prev, [field]: e.target.value }));
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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setState("loading"); setErrorMsg("");

    let captchaToken: string | null = null;
    if (requireCaptcha) {
      captchaToken = await getToken("apply_editorial");
      if (!captchaToken) { setErrorMsg("Please complete the CAPTCHA."); setState("error"); return; }
    }

    try {
      const body = new FormData();
      body.append("name", fields.name);
      body.append("email", fields.email);
      body.append("phone", fields.phone);
      body.append("position", fields.position);
      body.append("coverLetter", [
        fields.linkedin ? `LinkedIn: ${fields.linkedin}` : "",
        fields.statement,
      ].filter(Boolean).join("\n\n"));
      if (captchaToken) body.append("captchaToken", captchaToken);
      if (cvFile) body.append("cv", cvFile);
      body.append("website", "");

      const res = await fetch("/api/v1/apply", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) { setErrorMsg(data.error || "Something went wrong."); setState("error"); }
      else { setState("success"); setFields({ name: "", email: "", phone: "", linkedin: "", position: "", statement: "" }); setCvFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; setWidgetToken(null); }
    } catch {
      setErrorMsg("Network error. Please try again."); setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="py-20 text-center">
        <p className="text-5xl font-light mb-6" style={{ color: "var(--section-accent, var(--accent))", fontFamily: "var(--font-cormorant, Georgia, serif)" }}>Thank you.</p>
        <p className="text-base" style={{ color: "var(--section-muted, var(--text-muted))" }}>We review every application personally.</p>
      </div>
    );
  }

  const f = (key: string) => ({
    focused: focused === key,
    onFocus: () => setFocused(key),
    onBlur:  () => setFocused(null),
  });

  const acceptAttr = allowedFileTypes.map((t) => `.${t}`).join(",");

  return (
    <form onSubmit={handleSubmit} noValidate>
      <input type="text" name="website" className="hidden" aria-hidden="true" tabIndex={-1} />

      {/* Headline */}
      <div className="mb-16">
        <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--section-muted, var(--text-muted))" }}>Join us</p>
        <h2
          className="text-5xl sm:text-6xl font-light leading-[1.05]"
          style={{ color: "var(--section-heading, var(--text-heading))", fontFamily: "var(--font-cormorant, Georgia, serif)" }}
        >
          We&apos;re looking for<br />exceptional people.
        </h2>
        <p className="mt-6 text-sm leading-relaxed" style={{ color: "var(--section-muted, var(--text-muted))", maxWidth: 440 }}>
          We review every application personally. If you&apos;re the right fit, you&apos;ll hear from us.
        </p>
      </div>

      {/* Fields — widely spaced */}
      <div className="flex flex-col gap-12">
        <EditorialInput label="Full name" value={fields.name} onChange={set("name")} placeholder="Charlotte Bennett" {...f("name")} />
        <EditorialInput label="Email" type="email" value={fields.email} onChange={set("email")} placeholder="charlotte@email.co.uk" {...f("email")} />
        <EditorialInput label="Phone (optional)" type="tel" value={fields.phone} onChange={set("phone")} placeholder="+44 7700 900000" {...f("phone")} />
        <EditorialInput label="LinkedIn (optional)" value={fields.linkedin} onChange={set("linkedin")} placeholder="linkedin.com/in/charlottebennett" {...f("linkedin")} />
        <div>
          <EditorialInput label={ROLE_HINTS[0]} value={fields.position} onChange={set("position")} placeholder={ROLE_HINTS[1]} {...f("position")} />
        </div>
        <EditorialInput label="Personal statement (optional)" value={fields.statement} onChange={set("statement")} placeholder="Tell us what drives you and why you want to join…" {...f("statement")} multiline />

        {/* CV upload — editorial minimal style */}
        <div className="flex flex-col gap-3">
          <span style={{ fontSize: "0.6875rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--section-muted, var(--text-muted))" }}>
            CV ({allowedFileTypes.join(", ").toUpperCase()}, max {maxFileSizeMb}MB)
          </span>
          {cvFile ? (
            <div className="flex items-center justify-between" style={{ borderBottom: "1px solid var(--section-border, var(--border))", paddingBottom: 12 }}>
              <span className="text-sm" style={{ color: "var(--section-heading, var(--text-heading))" }}>{cvFile.name}</span>
              <button type="button" onClick={() => { setCvFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }} className="text-xs" style={{ color: "var(--section-muted, var(--text-muted))" }}>Remove</button>
            </div>
          ) : (
            <label className="cursor-pointer flex items-center gap-3 py-3" style={{ borderBottom: "1px solid var(--section-border, var(--border))" }}>
              <span className="text-sm" style={{ color: "var(--section-body, var(--text-body))" }}>Attach your CV</span>
              <span className="text-xs" style={{ color: "var(--section-accent, var(--accent))" }}>Browse →</span>
              <input ref={fileInputRef} type="file" accept={acceptAttr} onChange={handleFileChange} className="hidden" />
            </label>
          )}
          {cvError && <p className="text-xs text-red-500">{cvError}</p>}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 flex flex-col gap-6">
        {requireCaptcha && !isV3 && <CaptchaWidget onVerify={setWidgetToken} onExpire={() => setWidgetToken(null)} />}
        {state === "error" && <p className="text-sm text-red-500">{errorMsg}</p>}

        <div className="flex items-center justify-between gap-6 flex-wrap">
          <p className="text-xs" style={{ color: "var(--section-muted, var(--text-muted))" }}>
            We review every application personally.
          </p>
          <button
            type="submit"
            disabled={state === "loading"}
            className="px-10 py-4 text-sm font-semibold tracking-[0.15em] uppercase transition-opacity hover:opacity-75"
            style={{
              backgroundColor: "var(--section-accent, var(--accent))",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
            }}
          >
            {state === "loading" ? "Sending…" : "Apply now"}
          </button>
        </div>
      </div>
    </form>
  );
}
