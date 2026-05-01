// Batch 2 — ContactFormConversational
// Layout: single column, inputs embedded inline within sentence text
// Style: no labels, no boxes — inputs look like part of a typed sentence
// API: /api/v1/contact
"use client";

import { useState, FormEvent } from "react";
import { formsConfig } from "@/configs/forms";
import { useCaptcha } from "@/hooks/useCaptcha";
import CaptchaWidget from "./CaptchaWidget";

// ─── Config ──────────────────────────────────────────────────────────────────
const SERVICE_OPTIONS = ["Recruitment", "Payroll Services", "Compliance", "General Enquiry", "Partnership"];

type FormState = "idle" | "loading" | "success" | "error";

function InlineInput({
  value, onChange, placeholder, type = "text", width = "160px", focused, onFocus, onBlur,
}: {
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string; type?: string; width?: string;
  focused: boolean; onFocus: () => void; onBlur: () => void;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onFocus={onFocus}
      onBlur={onBlur}
      style={{
        display: "inline-block",
        width,
        background: "transparent",
        border: "none",
        borderBottom: `1.5px solid ${focused ? "var(--section-accent, var(--accent))" : "var(--section-border, var(--border))"}`,
        color: "var(--section-heading, var(--text-heading))",
        fontSize: "inherit",
        fontFamily: "inherit",
        outline: "none",
        padding: "2px 4px 4px",
        transition: "border-color 0.2s",
        minWidth: 60,
      }}
    />
  );
}

export default function ContactFormConversational() {
  const { requireCaptcha } = formsConfig.contactForm;
  const { isV3, setWidgetToken, getToken } = useCaptcha();

  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [focused, setFocused] = useState<string | null>(null);
  const [fields, setFields] = useState({ name: "", city: "", service: "", email: "", message: "" });

  function set(field: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setFields((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!fields.name || !fields.email) {
      setErrorMsg("Please fill in your name and email."); setState("error"); return;
    }
    setState("loading"); setErrorMsg("");

    let captchaToken: string | null = null;
    if (requireCaptcha) {
      captchaToken = await getToken("contact_conv");
      if (!captchaToken) { setErrorMsg("Please complete the CAPTCHA."); setState("error"); return; }
    }

    const combinedMessage = [
      fields.city ? `Location: ${fields.city}` : "",
      fields.service ? `Interested in: ${fields.service}` : "",
      fields.message ? `Message: ${fields.message}` : "",
    ].filter(Boolean).join("\n");

    try {
      const res = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fields.name, email: fields.email, phone: "", message: combinedMessage, captchaToken }),
      });
      const data = await res.json();
      if (!res.ok) { setErrorMsg(data.error || "Something went wrong."); setState("error"); }
      else { setState("success"); setFields({ name: "", city: "", service: "", email: "", message: "" }); setWidgetToken(null); }
    } catch {
      setErrorMsg("Network error. Please try again."); setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="form-success">
        <div className="form-success-icon">✓</div>
        <h3 className="text-xl font-semibold" style={{ color: "var(--section-heading, var(--text-heading))" }}>Got it — thanks!</h3>
        <p style={{ color: "var(--section-muted, var(--text-muted))" }}>We typically reply within 24 hours.</p>
        <button onClick={() => setState("idle")} className="mt-2 text-sm font-medium underline underline-offset-4" style={{ color: "var(--section-accent, var(--accent))" }}>Send another</button>
      </div>
    );
  }

  const sentenceStyle: React.CSSProperties = {
    fontSize: "1.125rem",
    lineHeight: 2.2,
    color: "var(--section-body, var(--text-body))",
    flexWrap: "wrap",
    display: "flex",
    alignItems: "baseline",
    gap: "6px",
  };

  const wordStyle: React.CSSProperties = {
    whiteSpace: "nowrap",
    color: "var(--section-muted, var(--text-muted))",
    fontSize: "1.125rem",
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
      <input type="text" name="website" className="hidden" aria-hidden="true" tabIndex={-1} />

      {/* Sentence block */}
      <div className="flex flex-col gap-6">
        <div style={sentenceStyle}>
          <span style={wordStyle}>Hi, I&apos;m</span>
          <InlineInput value={fields.name} onChange={set("name")} placeholder="your name" width="140px" focused={focused === "name"} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} />
          <span style={wordStyle}>from</span>
          <InlineInput value={fields.city} onChange={set("city")} placeholder="your city" width="120px" focused={focused === "city"} onFocus={() => setFocused("city")} onBlur={() => setFocused(null)} />
          <span style={wordStyle}>and I need help with</span>
          <span style={{ display: "inline-block" }}>
            <select
              value={fields.service}
              onChange={set("service")}
              onFocus={() => setFocused("service")}
              onBlur={() => setFocused(null)}
              style={{
                background: "transparent",
                border: "none",
                borderBottom: `1.5px solid ${focused === "service" ? "var(--section-accent, var(--accent))" : "var(--section-border, var(--border))"}`,
                color: fields.service ? "var(--section-heading, var(--text-heading))" : "var(--section-muted, var(--text-muted))",
                fontSize: "1.125rem",
                fontFamily: "inherit",
                outline: "none",
                padding: "2px 4px 4px",
                transition: "border-color 0.2s",
                minWidth: 180,
              }}
            >
              <option value="">a service…</option>
              {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </span>
          <span style={wordStyle}>. You can reach me at</span>
          <InlineInput type="email" value={fields.email} onChange={set("email")} placeholder="your email" width="200px" focused={focused === "email"} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
          <span style={wordStyle}>.</span>
        </div>

        {/* Optional message */}
        <div className="flex flex-col gap-2">
          <label className="text-xs tracking-widest uppercase" style={{ color: "var(--section-muted, var(--text-muted))" }}>
            Anything else to add? (optional)
          </label>
          <textarea
            rows={3}
            value={fields.message}
            onChange={set("message")}
            placeholder="A bit more context helps…"
            className="form-input resize-none"
          />
        </div>
      </div>

      {requireCaptcha && !isV3 && <CaptchaWidget onVerify={setWidgetToken} onExpire={() => setWidgetToken(null)} />}
      {state === "error" && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{errorMsg}</p>}

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-xs" style={{ color: "var(--section-muted, var(--text-muted))" }}>We typically reply within 24 hours.</p>
        <button type="submit" disabled={state === "loading"} className="form-btn">
          {state === "loading" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
